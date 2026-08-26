import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, 
  Tag, 
  Users, 
  Vote, 
  BarChart3, 
  TrendingUp, 
  CheckCircle,
  XCircle,
  Star,
  Download,
  RefreshCw,
  FileText,
  FileSpreadsheet,
  RotateCcw
} from 'lucide-react';
import { officialCategories } from '../data/categories';
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

  const categoryStats = officialCategories.map((cat) => {
    const categoryApps = apps.filter((app) => app.prize === cat.title || app.category === cat.title);
    const categoryVotes = paidVotes.filter((vote) => vote.category === cat.title).length;
    return {
      name: cat.title,
      candidates: categoryApps.length,
      votes: categoryVotes,
      averageRating: 0
    };
  });

  const topPerformers = official
    .map((candidate) => ({
      name: candidate.name,
      votes: votesByCandidate.get(candidate.id) || 0,
      rating: 0
    }))
    .filter((candidate) => candidate.votes > 0)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  const monthlyData = Array.from({ length: 12 }, (_, month) => {
    const monthApps = apps.filter((app) => new Date(app.submittedAt).getMonth() === month);
    const monthVotes = paidVotes.filter((vote) => new Date(vote.submittedAt).getMonth() === month);
    return {
      month: new Date(2026, month, 1).toLocaleDateString('fr-FR', { month: 'short' }),
      candidates: monthApps.length,
      votes: monthVotes.length,
      rating: 0
    };
  });

  return { monthlyData, categoryStats, topPerformers };
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

  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalVotes: 0,
    totalCategories: 9,
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
        totalCategories: officialCategories.length,
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

  // Filtrer les catégories
  const filteredCategories = officialCategories.filter(cat => {
    if (selectedCategory !== 'all' && selectedCategory !== cat.title) return false;
    const categoryTitle = cat.title || '';
    const searchLower = searchTerm.toLowerCase();
    return categoryTitle.toLowerCase().includes(searchLower);
  });

  // Exporter les données
  const exportData = (type: string, format: 'csv' | 'excel' | 'pdf' = 'csv') => {
    let data: any[] = [];
    let filename = '';

    switch (type) {
      case 'votes':
        data = filteredVotes;
        filename = 'votes_export';
        break;
      case 'candidates':
        data = applications;
        filename = 'candidates_export';
        break;
      case 'analytics':
        data = analyticsData.categoryStats;
        filename = 'analytics_export';
        break;
      case 'categories':
        data = officialCategories;
        filename = 'categories_export';
        break;
      case 'official-candidates':
        data = getAllOfficialCandidates();
        filename = 'official_candidates_export';
        break;
      case 'overview':
        data = [
          { metric: 'Candidatures reçues', value: stats.totalCandidates },
          { metric: 'Candidatures en attente', value: stats.pendingApplications },
          { metric: 'Candidatures approuvées', value: stats.approvedApplications },
          { metric: 'Votes payés', value: stats.totalVotes },
          { metric: 'Catégories', value: stats.totalCategories }
        ];
        filename = 'overview_export';
        break;
    }

    if (data.length === 0) return;

    switch (format) {
      case 'csv':
        exportToCSV(data, `${filename}.csv`);
        break;
      case 'excel':
        exportToExcelSimple(data, `${filename}.xlsx`);
        break;
      case 'pdf':
        exportToPDFSimple(data, `${filename}.pdf`);
        break;
    }
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
                {/* En-tête */}
        <div className="mb-8">
          {loadError && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
              <p className="font-medium">{loadError}</p>
            </div>
          )}

          {/* Message de réinitialisation */}
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

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-dark mb-2">Tableau de Bord Administratif</h1>
              <p className="text-gray-600">Gestion des Hospitality Awards Guinée</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Système actif</span>
              </div>
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
              <div className="text-right">
                <p className="text-xs text-gray-500">Dernière mise à jour</p>
                <p className="text-sm font-medium text-gray-700">{lastUpdate.toLocaleTimeString('fr-FR')}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowResetModal(true)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  title="Réinitialiser tous les votes"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Votes</span>
                </button>
                <button
                  onClick={() => exportData('overview', 'excel')}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  title="Exporter la vue d'ensemble en Excel"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Excel</span>
                </button>
                <button
                  onClick={() => exportData('overview', 'pdf')}
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                  title="Exporter la vue d'ensemble en PDF"
                >
                  <FileText className="w-4 h-4" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
            
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Vue d\'ensemble', icon: Home },
                  { id: 'categories', label: 'Catégories', icon: Tag },
                  { id: 'candidates', label: 'Candidats', icon: Users },
                  { id: 'official-candidates', label: 'Candidats Officiels', icon: Star },
                  { id: 'votes', label: 'Votes', icon: Vote },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </nav>
              </div>
              </div>
              
          {/* Contenu principal */}
          <div className="flex-1">
            {/* Vue d'ensemble */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Candidatures reçues</p>
                        <p className="text-3xl font-bold text-blue-dark">{stats.totalCandidates}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          Données Supabase
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center animate-bounce">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Votes payés</p>
                        <p className="text-3xl font-bold text-green-600">{stats.totalVotes}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          Statut FedaPay approved
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center animate-pulse">
                        <Vote className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Catégories principales</p>
                        <p className="text-3xl font-bold text-purple-600">{stats.totalCategories}</p>
                        <p className="text-xs text-purple-600 flex items-center mt-1">
                          <Tag className="w-3 h-3 mr-1" />
                          Toutes actives
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Tag className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">En attente</p>
                        <p className="text-3xl font-bold text-orange-600">{stats.pendingApplications}</p>
                        <p className="text-xs text-orange-600 flex items-center mt-1">
                          <Star className="w-3 h-3 mr-1" />
                          {stats.approvedApplications} approuvée(s)
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center animate-spin">
                        <Star className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </div>
                                </div>

                {/* Métriques en temps réel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-100">Candidatures en attente</p>
                        <p className="text-2xl font-bold">{stats.pendingApplications}</p>
                      </div>
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-100">Candidatures approuvées</p>
                        <p className="text-2xl font-bold">{stats.approvedApplications}</p>
                      </div>
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <Vote className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-100">Votes payés</p>
                        <p className="text-2xl font-bold">{stats.totalVotes}</p>
                      </div>
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activités récentes */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-blue-dark">Activités Récentes</h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">En temps réel</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => exportData('overview', 'excel')}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center space-x-1"
                          title="Exporter en Excel"
                        >
                          <FileSpreadsheet className="w-3 h-3" />
                          <span>Excel</span>
                        </button>
                        <button
                          onClick={() => exportData('overview', 'pdf')}
                          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center space-x-1"
                          title="Exporter en PDF"
                        >
                          <FileText className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {recentActivities.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">Aucune activité récente pour l’instant</p>
                    ) : recentActivities.map((activity, index) => (
                      <div 
                        key={activity.id} 
                        className={`flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105 ${
                          index === 0 ? 'border-l-4 border-blue-500 bg-blue-50' : ''
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'candidate' ? 'bg-blue-500' :
                          activity.type === 'vote' ? 'bg-green-500' :
                          activity.type === 'approval' ? 'bg-purple-500' :
                          activity.type === 'comment' ? 'bg-orange-500' :
                          'bg-gray-500'
                        } animate-pulse`}></div>
                        <span className="text-sm text-gray-700">{activity.action}</span>
                        <span className="text-xs text-gray-500 ml-auto">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Données chargées depuis Supabase</p>
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse"></div>
                    </div>
                  </div>
                </div>
                  </div>
            )}

            {/* Catégories */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-dark">Gestion des Catégories</h2>
                      <p className="text-gray-600">19 prix en 9 catégories officielles HAG 2026</p>
                    </div>
                    <div className="flex space-x-2">
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

                  <div className="mb-6 flex gap-4">
                    <div className="flex-1">
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
                    <div className="overflow-x-auto">
                      <table className="w-full">
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
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-dark">Candidatures reçues</h2>
                      <p className="text-gray-600">{applications.length} candidature(s) dans Supabase</p>
                    </div>
                    <div className="flex space-x-2">
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

                  {applications.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune candidature pour l'instant</h3>
                      <p className="text-gray-500">Les candidatures envoyées via le formulaire apparaîtront automatiquement ici.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Résumé</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                           </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                           {applications.map((app) => (
                             <tr key={app.id} className="hover:bg-gray-50">
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                 {new Date(app.submittedAt).toLocaleString('fr-FR')}
                               </td>
                               <td className="px-6 py-4">
                                 <div className="text-sm font-medium text-gray-900">{app.organizationName}</div>
                                 <div className="text-xs text-gray-500">{app.website || '—'}</div>
                               </td>
                               <td className="px-6 py-4">
                                 <div className="text-sm text-gray-900">{app.contactPerson}</div>
                                 <div className="text-xs text-gray-500">{app.email} • {app.phone}</div>
                               </td>
                               <td className="px-6 py-4 text-sm text-gray-900">
                                 <div>{app.category}</div>
                                 {app.prize && <div className="text-xs text-gray-500">{app.prize}</div>}
                               </td>
                               <td className="px-6 py-4 text-sm text-gray-700 max-w-md truncate">
                                 {app.description}
                               </td>
                               <td className="px-6 py-4">
                                 <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                   app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                   app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                   'bg-yellow-100 text-yellow-800'
                                 }`}>
                                   {app.status === 'approved' ? 'Approuvé' :
                                    app.status === 'rejected' ? 'Rejeté' : 'En attente'}
                                 </span>
                               </td>
                               <td className="px-6 py-4">
                                 {app.status === 'pending' ? (
                                   <div className="flex space-x-2">
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
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-dark">Candidats Officiels</h2>
                      <p className="text-gray-600">{getAllOfficialCandidates().length} candidat(s) officiel(s) • {getCategoriesWithCandidates().length} catégorie(s)</p>
                    </div>
                    <div className="flex space-x-2">
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
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                                     <div className="flex items-center justify-between mb-6">
                     <div>
                       <h2 className="text-2xl font-bold text-blue-dark">Gestion des Votes</h2>
                       <p className="text-gray-600">{filteredVotes.length} vote(s) payé(s) • {approvedCandidates.length} candidature(s) approuvée(s)</p>
                     </div>
                    <div className="flex gap-3">
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

                                     <div className="mb-6 flex gap-4">
                     <div className="flex-1">
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
                    <div className="overflow-x-auto">
                      <table className="w-full">
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
                {/* Statistiques générales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Candidatures</p>
                        <p className="text-2xl font-bold text-blue-dark">{stats.totalCandidates}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          Reçues dans Supabase
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Votes payés</p>
                        <p className="text-2xl font-bold text-green-600">{stats.totalVotes}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          Comptés après paiement
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Vote className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">En attente</p>
                        <p className="text-2xl font-bold text-orange-600">{stats.pendingApplications}</p>
                        <p className="text-xs text-orange-600 flex items-center">
                          À traiter
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Star className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Graphiques et données détaillées */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance par catégorie */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                                         <div className="flex items-center justify-between mb-6">
                       <h3 className="text-lg font-semibold text-blue-dark">Performance par Catégorie</h3>
                       <div className="flex space-x-2">
                         <button
                           onClick={() => exportData('analytics', 'csv')}
                           className="bg-gray-600 text-white px-2 py-1 rounded-lg hover:bg-gray-700 transition-colors text-xs flex items-center space-x-1"
                           title="Exporter en CSV"
                         >
                           <Download className="w-3 h-3" />
                           <span>CSV</span>
                         </button>
                         <button
                           onClick={() => exportData('analytics', 'excel')}
                           className="bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700 transition-colors text-xs flex items-center space-x-1"
                           title="Exporter en Excel"
                         >
                           <FileSpreadsheet className="w-3 h-3" />
                           <span>Excel</span>
                         </button>
                         <button
                           onClick={() => exportData('analytics', 'pdf')}
                           className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition-colors text-xs flex items-center space-x-1"
                           title="Exporter en PDF"
                         >
                           <FileText className="w-3 h-3" />
                           <span>PDF</span>
                         </button>
                       </div>
                     </div>
                    <div className="space-y-4">
                      {analyticsData.categoryStats?.slice(0, 8).map((cat: any, index: number) => {
                        const maxVotes = Math.max(1, ...((analyticsData.categoryStats || []).map((c: any) => c.votes || 0)));
                        return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 truncate">{cat.name}</span>
                              <span className="text-sm text-gray-500">{cat.votes} votes</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(cat.votes / maxVotes) * 100}%` }}
                              ></div>
                          </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>{cat.candidates} candidatures</span>
                              <span>{cat.votes} votes payés</span>
                            </div>
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Top performers */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold text-blue-dark mb-6">Top Performers</h3>
                    <div className="space-y-4">
                      {(!analyticsData.topPerformers || analyticsData.topPerformers.length === 0) ? (
                        <p className="text-sm text-gray-500">Aucun vote payé pour l’instant</p>
                      ) : analyticsData.topPerformers.map((performer: any, index: number) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                            <span className="text-xs text-gray-500">{performer.votes} votes payés</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Données mensuelles */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-dark mb-6">Évolution Mensuelle</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mois</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidatures</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votes payés</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {analyticsData.monthlyData?.map((month: any, index: number) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{month.candidates}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{month.votes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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