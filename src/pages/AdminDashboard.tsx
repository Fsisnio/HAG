import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, 
  Tag, 
  Users, 
  Vote, 
  BarChart3, 
  CheckCircle,
  XCircle,
  Star,
  Download,
  RefreshCw,
  FileText,
  FileSpreadsheet,
  RotateCcw,
  Clock,
  Inbox,
  ChevronDown
} from 'lucide-react';
import { officialCategories, categoryGroups } from '../data/categories';
import { getAllOfficialCandidates, getCandidatesByCategory, getCategoriesWithCandidates } from '../data/officialCandidates';
import VoteResetModal from '../components/VoteResetModal';
import { ResetResult } from '../services/voteResetService';
import {
  fetchAdminApplications,
  fetchAdminPaidVotes,
  fetchVoteTotals,
  setApplicationStatus,
  AdminApplication,
  AdminPaidVote,
  VoteTotal
} from '../services/adminData';

const formatRelativeTime = (iso: string) => {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 1) return 'À l’instant';
  if (mins < 60) return `Il y a ${mins} min`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `Il y a ${hours} h`;
  const days = Math.round(hours / 24);
  return `Il y a ${days} j`;
};

const buildAnalytics = (
  apps: AdminApplication[],
  paidVotes: AdminPaidVote[],
  totals: VoteTotal[]
) => {
  const votesByCandidate = new Map(totals.map((row) => [row.candidate_id, row.votes]));
  const official = getAllOfficialCandidates();

  const groupStats = categoryGroups.map((group) => {
    const prizes = officialCategories.filter((cat) => cat.group === group);
    const titles = prizes.map((prize) => prize.title);
    return {
      name: group,
      prizes: prizes.length,
      candidates: apps.filter((app) => app.category === group || titles.includes(app.prize || '')).length,
      votes: paidVotes.filter((vote) => titles.includes(vote.category) || vote.category === group).length
    };
  });

  const topPerformers = official
    .map((candidate) => ({
      name: candidate.name,
      category: candidate.category,
      votes: votesByCandidate.get(candidate.id) || 0
    }))
    .filter((candidate) => candidate.votes > 0)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 8);

  const monthlyData = [7, 8, 9, 10, 11].map((month) => {
    const monthApps = apps.filter((app) => new Date(app.submittedAt).getMonth() === month);
    const monthVotes = paidVotes.filter((vote) => new Date(vote.submittedAt).getMonth() === month);
    return {
      month: new Date(2026, month, 1).toLocaleDateString('fr-FR', { month: 'long' }),
      candidates: monthApps.length,
      votes: monthVotes.length
    };
  });

  return { monthlyData, categoryStats: groupStats, topPerformers };
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [votes, setVotes] = useState<AdminPaidVote[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>({});
  const [approvedCandidates, setApprovedCandidates] = useState<AdminApplication[]>([]);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetMessage, setResetMessage] = useState<string>('');
  const [resetMessageType, setResetMessageType] = useState<'success' | 'error' | ''>('');
  const [loadError, setLoadError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState('');

  const [applicationFilter, setApplicationFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalVotes: 0,
    totalCategories: categoryGroups.length,
    officialNominees: getAllOfficialCandidates().length,
    pendingApplications: 0,
    approvedApplications: 0
  });

  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const [appsResult, paidVotes, totals] = await Promise.all([
        fetchAdminApplications().then(
          (apps) => ({ apps, error: '' }),
          (error) => ({
            apps: [] as AdminApplication[],
            error: error instanceof Error ? error.message : 'Impossible de charger les candidatures.'
          })
        ),
        fetchAdminPaidVotes(),
        fetchVoteTotals()
      ]);

      const apps = appsResult.apps;
      if (appsResult.error) setLoadError(appsResult.error);

      const pending = apps.filter((app) => app.status === 'pending').length;
      const approved = apps.filter((app) => app.status === 'approved');
      const totalVotes = totals.reduce((sum, row) => sum + (row.votes || 0), 0);

      setApplications(apps);
      setVotes(paidVotes);
      setApprovedCandidates(approved);
      setStats({
        totalCandidates: apps.length,
        totalVotes,
        totalCategories: categoryGroups.length,
        officialNominees: getAllOfficialCandidates().length,
        pendingApplications: pending,
        approvedApplications: approved.length
      });
      setAnalyticsData(buildAnalytics(apps, paidVotes, totals));

      const activities = [
        ...apps.slice(0, 6).map((app) => ({
          id: `app-${app.id}`,
          action: `Candidature ${app.status === 'approved' ? 'approuvée' : app.status === 'rejected' ? 'rejetée' : 'reçue'} — ${app.organizationName}`,
          time: formatRelativeTime(app.submittedAt),
          type: app.status === 'approved' ? 'approval' : 'candidate',
          at: app.submittedAt
        })),
        ...paidVotes.slice(0, 6).map((vote) => ({
          id: `vote-${vote.id}`,
          action: `Vote payé pour ${vote.candidate}`,
          time: formatRelativeTime(vote.submittedAt),
          type: 'vote',
          at: vote.submittedAt
        }))
      ]
        .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
        .slice(0, 8);

      setRecentActivities(activities);
      setLastUpdate(new Date());
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Impossible de charger le tableau de bord.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);


  // Filtrer les votes
  const filteredVotes = votes.filter(vote => {
    const candidateName = vote.candidate || '';
    const categoryName = vote.category || '';
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = candidateName.toLowerCase().includes(searchLower) ||
                         categoryName.toLowerCase().includes(searchLower);
    const matchesCategory = selectedCategory === 'all' || categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const visibleApplications = applications.filter((app) =>
    applicationFilter === 'all' ? true : app.status === applicationFilter
  );

  // Filtrer les catégories
  const filteredCategories = officialCategories.filter(cat => {
    if (selectedCategory !== 'all' && selectedCategory !== cat.title) return false;
    const categoryTitle = cat.title || '';
    const searchLower = searchTerm.toLowerCase();
    return categoryTitle.toLowerCase().includes(searchLower);
  });

  const flattenRows = (rows: any[]) =>
    (rows || []).map((row) => {
      const out: Record<string, string | number> = {};
      Object.entries(row || {}).forEach(([key, value]) => {
        if (typeof value === 'function' || key === 'icon') return;
        if (value == null) out[key] = '';
        else if (Array.isArray(value)) out[key] = value.join(' | ');
        else if (typeof value === 'object') out[key] = JSON.stringify(value);
        else out[key] = value as string | number;
      });
      return out;
    });

  const overviewRows = () => [
    { indicateur: 'Candidatures reçues', valeur: stats.totalCandidates },
    { indicateur: 'Candidatures en attente', valeur: stats.pendingApplications },
    { indicateur: 'Candidatures approuvées', valeur: stats.approvedApplications },
    { indicateur: 'Votes payés', valeur: stats.totalVotes },
    { indicateur: 'Nominés officiels', valeur: stats.officialNominees },
    { indicateur: 'Catégories', valeur: stats.totalCategories }
  ];

  const exportData = (type: string, format: 'csv' | 'excel' | 'pdf' = 'csv') => {
    let data: any[] = [];
    let filename = 'hag_export';

    switch (type) {
      case 'votes':
        data = flattenRows(filteredVotes);
        filename = 'hag_votes';
        break;
      case 'candidates':
        data = flattenRows(applications);
        filename = 'hag_candidatures';
        break;
      case 'analytics':
        data = flattenRows(analyticsData.categoryStats || []);
        filename = 'hag_analytics';
        break;
      case 'categories':
        data = flattenRows(officialCategories);
        filename = 'hag_categories';
        break;
      case 'official-candidates':
        data = flattenRows(getAllOfficialCandidates());
        filename = 'hag_nomines';
        break;
      default:
        data = overviewRows();
        filename = 'hag_vue_ensemble';
        break;
    }

    if (!data.length) {
      data = overviewRows();
      filename = 'hag_vue_ensemble';
      setExportNotice('Aucune ligne dans cette vue : export de la synthèse.');
      setTimeout(() => setExportNotice(''), 4000);
    } else {
      setExportNotice(`Fichier téléchargé : ${filename}.${format === 'excel' ? 'tsv' : format === 'pdf' ? 'html' : 'csv'}`);
      setTimeout(() => setExportNotice(''), 4000);
    }

    setExportMenuOpen(false);

    if (format === 'excel') exportToExcelSimple(data, `${filename}.xlsx`);
    else if (format === 'pdf') exportToPDFSimple(data, `${filename}.pdf`);
    else exportToCSV(data, `${filename}.csv`);
  };

  // Exporter en CSV
  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  // Export Excel simplifié (format TSV pour compatibilité Excel)
  const exportToExcelSimple = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]);
    const tsvContent = [
      headers.join('\t'),
      ...data.map(row => headers.map(header => row[header]).join('\t'))
    ].join('\n');

    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.replace('.xlsx', '.tsv');
    link.click();
  };

  // Export PDF simplifié (format HTML pour impression)
  const exportToPDFSimple = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]);
    
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Export Dashboard</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .header { text-align: center; margin-bottom: 20px; }
          .date { color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Hospitality Awards Guinée - Dashboard</h1>
          <p class="date">Exporté le ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        <table>
          <thead>
            <tr>
              ${headers.map(header => `<th>${header}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => 
              `<tr>${headers.map(header => `<td>${row[header]}</td>`).join('')}</tr>`
            ).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.replace('.pdf', '.html');
    link.click();
    
    // Ouvrir dans un nouvel onglet pour impression
    window.open(url, '_blank');
  };



  const updateApplicationStatus = async (applicationId: string, status: 'approved' | 'rejected') => {
    setUpdatingId(applicationId);
    setLoadError('');
    try {
      await setApplicationStatus(applicationId, status);
      await loadDashboardData();
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Impossible de mettre à jour la candidature.');
    } finally {
      setUpdatingId(null);
    }
  };

  const refreshData = () => {
    loadDashboardData();
  };

  // Gérer la réinitialisation des votes
  const handleResetComplete = (result: ResetResult) => {
    setResetMessage(result.message);
    setResetMessageType(result.success ? 'success' : 'error');
    
    if (result.success) {
      // Actualiser les statistiques après reset
      refreshData();
    }

    // Masquer le message après 5 secondes
    setTimeout(() => {
      setResetMessage('');
      setResetMessageType('');
    }, 5000);
  };

  return (
    <div className="hag-admin-page min-h-[calc(100vh-56px)] bg-gray-50 p-4 lg:p-6 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto min-w-0">
        {loadError && (
          <div className="mb-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm">
            {loadError}
          </div>
        )}

        {resetMessage && (
            <div className={`mb-4 p-4 rounded-lg ${
              resetMessageType === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <div className="flex items-center space-x-2">
                {resetMessageType === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span>{resetMessage}</span>
              </div>
            </div>
          )}

          {exportNotice && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
              {exportNotice}
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-blue-dark">Tableau de bord</h1>
              <p className="text-gray-600 text-sm mt-1">
                Candidatures, nominés et votes payés · mis à jour {lastUpdate.toLocaleTimeString('fr-FR')}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setExportMenuOpen((open) => !open)}
                  className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {exportMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg z-30 py-1">
                    <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => exportData('overview', 'csv')}>
                      Vue d’ensemble
                    </button>
                    <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => exportData('official-candidates', 'csv')}>
                      Nominés officiels
                    </button>
                    <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => exportData('categories', 'csv')}>
                      Catégories
                    </button>
                    <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => exportData('candidates', 'csv')}>
                      Candidatures
                    </button>
                    <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => exportData('votes', 'csv')}>
                      Votes payés
                    </button>
                    <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => exportData('analytics', 'csv')}>
                      Analytics
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowResetModal(true)}
                className="bg-white border border-red-200 text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset votes</span>
              </button>
            </div>
          </div>
            
        <div className="flex flex-col lg:flex-row gap-6 min-w-0">
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 lg:sticky lg:top-20">
              <nav className="flex lg:flex-col gap-1 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Vue d\'ensemble', icon: Home, count: null as number | null },
                  { id: 'categories', label: 'Catégories', icon: Tag, count: stats.totalCategories },
                  { id: 'candidates', label: 'Candidatures', icon: Users, count: stats.totalCandidates },
                  { id: 'official-candidates', label: 'Nominés', icon: Star, count: stats.officialNominees },
                  { id: 'votes', label: 'Votes', icon: Vote, count: stats.totalVotes },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3, count: null }
                ].map(({ id, label, icon: Icon, count }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-colors whitespace-nowrap ${
                      activeTab === id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium text-sm flex-1">{label}</span>
                    {count !== null && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeTab === id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
              </div>
              </div>
              
          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            {/* Vue d'ensemble */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-600">Candidatures</p>
                    <p className="text-3xl font-bold text-blue-dark mt-1">{stats.totalCandidates}</p>
                    <p className="text-xs text-gray-500 mt-1">Formulaires reçus</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-600">En attente</p>
                    <p className="text-3xl font-bold text-orange-600 mt-1">{stats.pendingApplications}</p>
                    <p className="text-xs text-gray-500 mt-1">{stats.approvedApplications} approuvée(s)</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-600">Votes payés</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">{stats.totalVotes}</p>
                    <p className="text-xs text-gray-500 mt-1">Après paiement Chap Chap Pay</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-600">Nominés officiels</p>
                    <p className="text-3xl font-bold text-purple-600 mt-1">{stats.officialNominees}</p>
                    <p className="text-xs text-gray-500 mt-1">{stats.totalCategories} catégories</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-blue-dark">Activité récente</h2>
                    <button onClick={() => setActiveTab('candidates')} className="text-sm text-blue-600 hover:underline">
                      Voir les candidatures
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentActivities.length === 0 ? (
                      <div className="text-center py-10">
                        <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">Pas encore d’activité</p>
                        <p className="text-xs text-gray-500 mt-1">Les inscriptions et votes payés apparaîtront ici.</p>
                      </div>
                    ) : recentActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                          activity.type === 'candidate' ? 'bg-blue-500' :
                          activity.type === 'vote' ? 'bg-green-500' :
                          activity.type === 'approval' ? 'bg-purple-500' :
                          'bg-gray-400'
                        }`}></div>
                        <span className="text-sm text-gray-700 flex-1">{activity.action}</span>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-blue-dark">Candidatures à traiter</h2>
                    <span className="text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded-full inline-flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{stats.pendingApplications} en attente</span>
                    </span>
                  </div>
                  {applications.filter((app) => app.status === 'pending').length === 0 ? (
                    <p className="text-sm text-gray-500 py-8 text-center">Aucune candidature en attente.</p>
                  ) : (
                    <div className="space-y-3">
                      {applications.filter((app) => app.status === 'pending').slice(0, 5).map((app) => (
                        <div key={app.id} className="flex items-center justify-between gap-3 p-3 border border-gray-100 rounded-xl">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{app.organizationName}</p>
                            <p className="text-xs text-gray-500 truncate">{app.prize || app.category}</p>
                          </div>
                          <div className="flex space-x-1 flex-shrink-0">
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'approved')}
                              className="text-green-600 hover:bg-green-50 p-1.5 rounded-lg"
                              title="Approuver"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'rejected')}
                              className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg"
                              title="Rejeter"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                </div>
                  </div>
            )}
            {/* Catégories */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold text-blue-dark">Gestion des Catégories</h2>
                      <p className="text-gray-600">19 prix en 9 catégories officielles HAG 2026</p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button
                        onClick={() => exportData('categories', 'csv')}
                        className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                        title="Exporter en CSV"
                      >
                        <Download className="w-4 h-4" />
                        <span>CSV</span>
                      </button>
                      <button
                        onClick={() => exportData('categories', 'excel')}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        title="Exporter en Excel"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Excel</span>
                      </button>
                      <button
                        onClick={() => exportData('categories', 'pdf')}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                        title="Exporter en PDF"
                      >
                        <FileText className="w-4 h-4" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>

                  <div className="mb-6 flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        placeholder="Rechercher une catégorie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Toutes les catégories</option>
                      {officialCategories.map((cat) => (
                        <option key={cat.id} value={cat.title}>{cat.title}</option>
                      ))}
                    </select>
                  </div>

                  {filteredCategories.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Aucune catégorie trouvée</p>
                  ) : (
                    <div className="overflow-x-auto -mx-4 sm:-mx-6">
                      <table className="w-full min-w-[720px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icône</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Critères</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredCategories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <cat.icon className="w-5 h-5 text-blue-600" />
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{cat.title}</div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">{cat.description}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{cat.criteria.length} critères</td>
                              <td className="px-6 py-4 text-sm text-gray-700">{cat.prize}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Candidats */}
            {activeTab === 'candidates' && (
              <div className="space-y-6">
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold text-blue-dark">Candidatures reçues</h2>
                      <p className="text-gray-600">{visibleApplications.length} affichée(s) · {applications.length} au total</p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button
                        onClick={() => exportData('candidates', 'csv')}
                        className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                        title="Exporter en CSV"
                      >
                        <Download className="w-4 h-4" />
                        <span>CSV</span>
                      </button>
                      <button
                        onClick={() => exportData('candidates', 'excel')}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        title="Exporter en Excel"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Excel</span>
                      </button>
                      <button
                        onClick={() => exportData('candidates', 'pdf')}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                        title="Exporter en PDF"
                      >
                        <FileText className="w-4 h-4" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setApplicationFilter(status)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          applicationFilter === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status === 'all' ? 'Toutes' : status === 'pending' ? 'En attente' : status === 'approved' ? 'Approuvées' : 'Rejetées'}
                      </button>
                    ))}
                  </div>

                  {visibleApplications.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        {applications.length === 0 ? 'Aucune candidature pour l’instant' : 'Aucun résultat pour ce filtre'}
                      </h3>
                      <p className="text-gray-500">
                        {applications.length === 0
                          ? 'Les candidatures envoyées via le formulaire apparaîtront automatiquement ici.'
                          : 'Changez de filtre pour revoir les autres dossiers.'}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto -mx-4 sm:-mx-6">
                      <table className="w-full min-w-[920px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Résumé</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            <th className="sticky right-0 bg-gray-50 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider shadow-[-8px_0_8px_-8px_rgba(0,0,0,0.12)]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {visibleApplications.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50">
                              <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
                                {new Date(app.submittedAt).toLocaleDateString('fr-FR')}
                              </td>
                              <td className="px-3 py-3 max-w-[10rem]">
                                <div className="text-sm font-medium text-gray-900 truncate" title={app.organizationName}>{app.organizationName}</div>
                                <div className="text-xs text-gray-500 truncate">{app.website || '—'}</div>
                              </td>
                              <td className="px-3 py-3 max-w-[12rem]">
                                <div className="text-sm text-gray-900 truncate">{app.contactPerson}</div>
                                <div className="text-xs text-gray-500 truncate">{app.email}</div>
                                <div className="text-xs text-gray-500">{app.phone}</div>
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-900 max-w-[11rem]">
                                <div className="truncate">{app.category}</div>
                                {app.prize && <div className="text-xs text-gray-500 line-clamp-2">{app.prize}</div>}
                              </td>
                              <td className="px-3 py-3 text-sm text-gray-700 max-w-[14rem]">
                                <span className="line-clamp-2" title={app.description}>{app.description}</span>
                              </td>
                              <td className="px-3 py-3 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {app.status === 'approved' ? 'Approuvé' :
                                   app.status === 'rejected' ? 'Rejeté' : 'En attente'}
                                </span>
                              </td>
                              <td className="sticky right-0 bg-white px-3 py-3 shadow-[-8px_0_8px_-8px_rgba(0,0,0,0.12)]">
                                {app.status === 'pending' ? (
                                  <div className="flex space-x-1">
                                    <button
                                      onClick={() => updateApplicationStatus(app.id, 'approved')}
                                      disabled={updatingId === app.id}
                                      className="text-green-600 hover:text-green-800 p-1 disabled:opacity-50"
                                      title="Approuver"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => updateApplicationStatus(app.id, 'rejected')}
                                      disabled={updatingId === app.id}
                                      className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
                                      title="Rejeter"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-500">
                                    {app.status === 'approved' ? '✓ Approuvé' : '✗ Rejeté'}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Candidats Officiels */}
            {activeTab === 'official-candidates' && (
              <div className="space-y-6">
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold text-blue-dark">Candidats Officiels</h2>
                      <p className="text-gray-600">{getAllOfficialCandidates().length} candidat(s) officiel(s) • {getCategoriesWithCandidates().length} catégorie(s)</p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button
                        onClick={() => exportData('official-candidates', 'csv')}
                        className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                        title="Exporter en CSV"
                      >
                        <Download className="w-4 h-4" />
                        <span>CSV</span>
                      </button>
                      <button
                        onClick={() => exportData('official-candidates', 'excel')}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        title="Exporter en Excel"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Excel</span>
                      </button>
                      <button
                        onClick={() => exportData('official-candidates', 'pdf')}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                        title="Exporter en PDF"
                      >
                        <FileText className="w-4 h-4" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Filtres */}
                  <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Rechercher un candidat..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="min-w-[200px]">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">Toutes les catégories</option>
                        {getCategoriesWithCandidates().map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Liste des candidats officiels par catégorie */}
                  <div className="space-y-6">
                    {getCategoriesWithCandidates()
                      .filter(category => selectedCategory === 'all' || category === selectedCategory)
                      .map(category => {
                        const categoryCandidates = getCandidatesByCategory(category)
                          .filter(candidate => {
                            if (searchTerm === '') return true;
                            
                            const candidateName = candidate.name || '';
                            const candidateDescription = candidate.description || '';
                            const searchLower = searchTerm.toLowerCase();
                            
                            return candidateName.toLowerCase().includes(searchLower) ||
                                   candidateDescription.toLowerCase().includes(searchLower);
                          });

                        if (categoryCandidates.length === 0) return null;

                        return (
                          <div key={category} className="border border-gray-200 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-blue-dark mb-4 flex items-center">
                              <Star className="w-5 h-5 text-yellow-500 mr-2" />
                              {category}
                              <span className="ml-2 text-sm font-normal text-gray-500">
                                ({categoryCandidates.length} candidat{categoryCandidates.length > 1 ? 's' : ''})
                              </span>
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {categoryCandidates.map(candidate => (
                                <div key={candidate.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="text-sm text-gray-600">{candidate.rating?.toFixed(1) || '4.0'}</span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">{candidate.description}</p>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{candidate.totalRatings || 0} avis</span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                      Candidat officiel
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {getAllOfficialCandidates().length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Star className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun candidat officiel</h3>
                      <p className="text-gray-500">Les candidats officiels seront affichés ici.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Votes */}
            {activeTab === 'votes' && (
              <div className="space-y-6">
                  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-6">
                     <div className="min-w-0">
                       <h2 className="text-xl font-bold text-blue-dark">Gestion des Votes</h2>
                       <p className="text-gray-600">{filteredVotes.length} vote(s) payé(s) • {approvedCandidates.length} candidature(s) approuvée(s)</p>
                     </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button
                        onClick={refreshData}
                        disabled={isLoading}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>Actualiser</span>
                      </button>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => exportData('votes', 'csv')}
                          className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                          title="Exporter en CSV"
                        >
                          <Download className="w-4 h-4" />
                          <span>CSV</span>
                        </button>
                        <button
                          onClick={() => exportData('votes', 'excel')}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                          title="Exporter en Excel"
                        >
                          <FileSpreadsheet className="w-4 h-4" />
                          <span>Excel</span>
                        </button>
                        <button
                          onClick={() => exportData('votes', 'pdf')}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                          title="Exporter en PDF"
                        >
                          <FileText className="w-4 h-4" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>

                                     <div className="mb-6 flex flex-col sm:flex-row gap-3">
                     <div className="flex-1 min-w-0">
                       <input
                         type="text"
                         placeholder="Rechercher un candidat ou une catégorie..."
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <select
                       value={selectedCategory}
                       onChange={(e) => setSelectedCategory(e.target.value)}
                       className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     >
                       <option value="all">Toutes les catégories</option>
                       {officialCategories.map((cat) => (
                         <option key={cat.id} value={cat.title}>{cat.title}</option>
                       ))}
                     </select>
                   </div>

                   {/* Liste des candidats approuvés */}
                   <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                     <h4 className="text-sm font-medium text-blue-800 mb-3">Candidats Approuvés ({approvedCandidates.length})</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                       {approvedCandidates.map((candidate) => (
                         <div key={candidate.id} className="bg-white p-3 rounded-lg border border-blue-200">
                           <div className="flex items-center justify-between mb-2">
                             <h5 className="text-sm font-medium text-blue-900">{candidate.organizationName}</h5>
                             <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                               {candidate.category}
                             </span>
                           </div>
                           <p className="text-xs text-blue-700 mb-2">{candidate.contactPerson}</p>
                           <div className="text-xs text-blue-600">
                             {candidate.email}
                           </div>
                         </div>
                       ))}
                       {approvedCandidates.length === 0 && (
                         <p className="text-sm text-blue-600 col-span-full text-center py-2">
                           Aucun candidat approuvé pour l'instant
                         </p>
                       )}
                     </div>
                   </div>

                  {filteredVotes.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Aucun vote payé pour l’instant</p>
                  ) : (
                    <div className="overflow-x-auto -mx-4 sm:-mx-6">
                      <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidat</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredVotes.map((vote) => (
                            <tr key={vote.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {new Date(vote.submittedAt).toLocaleDateString('fr-FR')}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{vote.candidate}</td>
                              <td className="px-6 py-4 text-sm text-gray-700">{vote.category}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{vote.voter}</td>
                              <td className="px-6 py-4 text-sm text-gray-900">{vote.amount} GNF</td>
                              <td className="px-6 py-4 text-sm text-gray-500">{vote.transactionId || '—'}</td>
                              <td className="px-6 py-4">
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  Payé
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                      </div>
            )}

            {/* Analytics */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-semibold text-blue-dark">Performance par catégorie</h3>
                      <button
                        onClick={() => exportData('analytics', 'csv')}
                        className="text-xs text-gray-600 border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-50"
                      >
                        Export CSV
                      </button>
                    </div>
                    <div className="space-y-5">
                      {(analyticsData.categoryStats || []).map((cat: any) => {
                        const maxVotes = Math.max(1, ...((analyticsData.categoryStats || []).map((c: any) => c.votes || 0)));
                        return (
                          <div key={cat.name}>
                            <p className="text-sm font-medium text-gray-900 leading-snug">{cat.name}</p>
                            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{ width: `${cat.votes === 0 ? 0 : Math.max(8, (cat.votes / maxVotes) * 100)}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1.5">
                              {cat.prizes} prix · {cat.candidates} candidature{cat.candidates > 1 ? 's' : ''} · {cat.votes} vote{cat.votes > 1 ? 's' : ''} payé{cat.votes > 1 ? 's' : ''}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-blue-dark mb-5">Classement des nominés</h3>
                    {(!analyticsData.topPerformers || analyticsData.topPerformers.length === 0) ? (
                      <div className="text-center py-12">
                        <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm font-medium text-gray-600">Aucun vote payé pour l’instant</p>
                        <p className="text-xs text-gray-500 mt-1">Le classement apparaîtra dès le premier paiement Chap Chap Pay validé.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {analyticsData.topPerformers.map((performer: any, index: number) => (
                          <div key={performer.name} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700 flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                              <p className="text-xs text-gray-500 leading-snug">{performer.category}</p>
                            </div>
                            <span className="ml-auto text-sm font-semibold text-blue-700 whitespace-nowrap">{performer.votes}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-dark mb-4">Calendrier 2026</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {analyticsData.monthlyData?.map((month: any) => (
                      <div key={month.month} className="border border-gray-100 rounded-xl p-4 text-center">
                        <p className="text-sm font-medium text-gray-700 capitalize">{month.month}</p>
                        <p className="text-xl font-bold text-blue-dark mt-2">{month.candidates}</p>
                        <p className="text-xs text-gray-500">candidatures</p>
                        <p className="text-sm font-semibold text-green-700 mt-2">{month.votes} votes</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
                </div>
              </div>

        {/* Footer avec dernière mise à jour */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Dernière mise à jour : {lastUpdate.toLocaleString('fr-FR')}
        </div>

        {/* Modal de réinitialisation */}
        <VoteResetModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          onResetComplete={handleResetComplete}
        />
      </div>
    </div>
  );
};

export default AdminDashboard; 