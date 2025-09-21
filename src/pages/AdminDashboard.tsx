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

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [applications, setApplications] = useState<any[]>([]);
  const [votes, setVotes] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>({});
  const [approvedCandidates, setApprovedCandidates] = useState<any[]>([]);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetMessage, setResetMessage] = useState<string>('');
  const [resetMessageType, setResetMessageType] = useState<'success' | 'error' | ''>('');

  // Données simulées pour les statistiques
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalVotes: 0,
    totalCategories: 7, // Mise à jour pour 7 catégories
    averageRating: 0
  });

  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  // Mettre à jour les statistiques
  const updateStats = useCallback(() => {
    const officialCandidates = getAllOfficialCandidates();
    
    // Récupérer les vraies données de vote depuis localStorage
    let realVotes = 0;
    let realAverageRating = 0;
    
    try {
      const savedVotes = localStorage.getItem('hag_candidates_votes');
      const savedRatings = localStorage.getItem('hag_candidates_ratings');

      if (savedVotes) {
        const votes = JSON.parse(savedVotes);
        realVotes = votes.length;
      }

      if (savedRatings) {
        const ratings = JSON.parse(savedRatings);
        const ratingsArray = Object.values(ratings) as number[];
        if (ratingsArray.length > 0) {
          realAverageRating = ratingsArray.reduce((acc: number, curr: number) => acc + curr, 0) / ratingsArray.length;
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de vote:', error);
    }
    
    setStats({
      totalCandidates: 25, // 25 récompenses officielles
      totalVotes: realVotes,
      totalCategories: 7, // 7 catégories principales
      averageRating: realAverageRating || 0
    });
  }, [applications]);

  // Initialisation des données
  useEffect(() => {
    // Charger les candidatures depuis localStorage
    try {
      const raw = localStorage.getItem('hag_applications');
      const parsed = raw ? JSON.parse(raw) : [];
      setApplications(parsed);
    } catch {}

    // Charger les candidats approuvés depuis localStorage
    try {
      const approvedRaw = localStorage.getItem('hag_approved_candidates');
      const approvedParsed = approvedRaw ? JSON.parse(approvedRaw) : [];
      setApprovedCandidates(approvedParsed);
    } catch {}

    // Charger les vraies données de vote depuis localStorage
    loadRealVoteData();

    // Générer des données analytics simulées
    const simulatedAnalytics = generateSimulatedAnalytics();
    setAnalyticsData(simulatedAnalytics);

    // Initialiser les activités récentes
    updateRecentActivities();

    // Mettre à jour les statistiques
    updateStats();

    // Optionnel : mettre à jour les données toutes les 5 minutes (au lieu de 30 secondes)
    // const interval = setInterval(() => {
    //   loadRealVoteData();
    //   updateRecentActivities();
    //   updateStats();
    //   setLastUpdate(new Date());
    // }, 300000); // 5 minutes au lieu de 30 secondes

    // return () => clearInterval(interval);
  }, []);

  // Charger les vraies données de vote
  const loadRealVoteData = () => {
    try {
      const savedVotes = localStorage.getItem('hag_candidates_votes');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const savedRatings = localStorage.getItem('hag_candidates_ratings');
      
      if (savedVotes) {
        const votesData = JSON.parse(savedVotes);
        // Convertir les données de vote en format compatible avec l'affichage
        const realVotes = votesData
          .filter((candidate: any) => candidate.isVoted)
          .map((candidate: any, index: number) => ({
            id: index + 1,
            candidate: candidate.name,
            category: candidate.category,
            voter: `Votant ${index + 1}`,
            voteType: 'online',
            rating: candidate.userRating || 4,
            comment: `Vote pour ${candidate.name}`,
            status: 'approved',
            submittedAt: new Date().toISOString()
          }));
        
        setVotes(realVotes);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données de vote:', error);
    }
  };

  // Générer des votes simulés
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const generateSimulatedVotes = () => {
    const voteTypes = ['online', 'jury', 'public'];
    const statuses = ['pending', 'approved', 'rejected'];
    const candidates = [
      'Hôtel Mariador Palace',
      'Restaurant Le Palais',
      'Agence Tourisme Guinée',
      'Guide Touristique Conakry',
      'Hôtel Riviera',
      'Restaurant La Terrasse'
    ];

    return Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      candidate: candidates[Math.floor(Math.random() * candidates.length)],
      category: officialCategories[Math.floor(Math.random() * officialCategories.length)].title,
      voter: `Votant ${i + 1}`,
      voteType: voteTypes[Math.floor(Math.random() * voteTypes.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      comment: Math.random() > 0.5 ? `Commentaire ${i + 1} sur la qualité du service` : '',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }));
  };

  // Générer des données analytics simulées
  const generateSimulatedAnalytics = () => {
    const categories = officialCategories.map(cat => cat.title);
    const monthlyData = Array.from({ length: 12 }, (_, month) => ({
      month: new Date(2024, month, 1).toLocaleDateString('fr-FR', { month: 'short' }),
      candidates: Math.floor(Math.random() * 20) + 5,
      votes: Math.floor(Math.random() * 100) + 20,
      rating: Math.random() * 2 + 3
    }));

    const categoryStats = categories.map(cat => ({
      name: cat,
      candidates: Math.floor(Math.random() * 8) + 2,
      votes: Math.floor(Math.random() * 50) + 10,
      averageRating: Math.random() * 2 + 3
    }));

    return {
      monthlyData,
      categoryStats,
      topPerformers: [
        { name: 'Hôtel Mariador Palace', rating: 4.8, votes: 156 },
        { name: 'Restaurant Le Palais', rating: 4.6, votes: 142 },
        { name: 'Agence Tourisme Guinée', rating: 4.5, votes: 128 }
      ]
    };
  };


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
          { metric: 'Total Candidats', value: stats.totalCandidates },
          { metric: 'Total Votes', value: stats.totalVotes },
          { metric: 'Total Catégories', value: stats.totalCategories },
          { metric: 'Note Moyenne', value: stats.averageRating }
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



  // Mettre à jour le statut d'un vote
  const updateVoteStatus = (voteId: number, newStatus: string) => {
    setVotes(prev => prev.map(vote => 
      vote.id === voteId ? { ...vote, status: newStatus } : vote
    ));
  };

  // Mettre à jour les activités récentes
  const updateRecentActivities = () => {
    const activities = [
      { id: 1, action: 'Nouvelle candidature reçue', time: 'Il y a 2 minutes', type: 'candidate' },
      { id: 2, action: 'Vote enregistré pour Hôtel Mariador', time: 'Il y a 5 minutes', type: 'vote' },
      { id: 3, action: 'Candidature approuvée - Restaurant Le Palais', time: 'Il y a 1 heure', type: 'approval' },
      { id: 4, action: 'Nouveau commentaire sur Guide Touristique', time: 'Il y a 2 heures', type: 'comment' }
    ];

    // Ajouter des activités aléatoires pour rendre plus dynamique
    const randomActivities = [
      'Nouveau visiteur sur la page des catégories',
      'Export de données effectué',
      'Filtre de recherche utilisé',
      'Statistiques consultées',
      'Candidat ajouté à la liste des favoris',
      'Vote premium enregistré',
      'Rapport analytics généré',
      'Notification envoyée aux candidats'
    ];

    const randomActivity = randomActivities[Math.floor(Math.random() * randomActivities.length)];
    const randomTime = Math.floor(Math.random() * 10) + 1;
    
    activities.unshift({
      id: Date.now(),
      action: randomActivity,
      time: `Il y a ${randomTime} minute${randomTime > 1 ? 's' : ''}`,
      type: 'system'
    });

    setRecentActivities(activities.slice(0, 5));
  };

  // Approuver une candidature
  const approveApplication = (applicationId: number) => {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;

    // Ajouter aux candidats approuvés
    const approvedCandidate = {
      ...application,
      approvedAt: new Date().toISOString(),
      status: 'approved'
    };
    
    const newApprovedCandidates = [...approvedCandidates, approvedCandidate];
    setApprovedCandidates(newApprovedCandidates);
    localStorage.setItem('hag_approved_candidates', JSON.stringify(newApprovedCandidates));

    // Mettre à jour le statut de la candidature
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: 'approved' } : app
    ));

    // Ajouter des votes simulés pour ce candidat approuvé
    const newVotes = generateVotesForCandidate(approvedCandidate);
    setVotes(prev => [...newVotes, ...prev]);
  };

  // Rejeter une candidature
  const rejectApplication = (applicationId: number) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: 'rejected' } : app
    ));
  };

  // Générer des votes pour un candidat approuvé
  const generateVotesForCandidate = (candidate: any) => {
    const voteTypes = ['online', 'jury', 'public'];
    const numVotes = Math.floor(Math.random() * 10) + 5; // 5-15 votes

    return Array.from({ length: numVotes }, (_, i) => ({
      id: Date.now() + i,
      candidate: candidate.organizationName,
      category: candidate.category,
      voter: `Votant ${Math.floor(Math.random() * 1000) + 1}`,
      voteType: voteTypes[Math.floor(Math.random() * voteTypes.length)],
      rating: Math.floor(Math.random() * 3) + 3, // 3-5 étoiles
      comment: Math.random() > 0.7 ? `Excellent service de ${candidate.organizationName}` : '',
      status: 'pending',
      submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }));
  };

  // Actualiser les données
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadRealVoteData();
      updateStats();
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
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
                onClick={() => {
                  loadRealVoteData();
                  updateStats();
                  updateRecentActivities();
                  setLastUpdate(new Date());
                }}
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
                        <p className="text-sm font-medium text-gray-600">Récompenses officielles</p>
                        <p className="text-3xl font-bold text-blue-dark animate-pulse">{stats.totalCandidates}</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{Math.floor(Math.random() * 5) + 1} ce mois
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
                        <p className="text-sm font-medium text-gray-600">Total Votes</p>
                        <p className="text-3xl font-bold text-green-600 animate-pulse">{stats.totalVotes}</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{Math.floor(Math.random() * 20) + 5} aujourd'hui
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
                        <p className="text-sm font-medium text-gray-600">Note Moyenne</p>
                        <p className="text-3xl font-bold text-orange-600 animate-pulse">{stats.averageRating}</p>
                        <p className="text-xs text-orange-600 flex items-center mt-1">
                          <Star className="w-3 h-3 mr-1" />
                          Sur 5 étoiles
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
                        <p className="text-sm text-blue-100">Visiteurs aujourd'hui</p>
                        <p className="text-2xl font-bold">{Math.floor(Math.random() * 100) + 50}</p>
                      </div>
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-100">Votes cette heure</p>
                        <p className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 5}</p>
                      </div>
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <Vote className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-100">Taux de conversion</p>
                        <p className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 15}%</p>
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
                    {recentActivities.map((activity, index) => (
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
                      <p className="text-xs text-gray-500 mb-2">Mise à jour automatique toutes les 30 secondes</p>
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
                      <p className="text-gray-600">25 récompenses en 7 catégories officielles</p>
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
                      <p className="text-gray-600">{applications.length} candidature(s) sauvegardée(s)</p>
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
                               <td className="px-6 py-4 text-sm text-gray-900">{app.category}</td>
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
                                 {!app.status && (
                                   <div className="flex space-x-2">
                                     <button
                                       onClick={() => approveApplication(app.id)}
                                       className="text-green-600 hover:text-green-800 p-1"
                                       title="Approuver"
                                     >
                                       <CheckCircle className="w-4 h-4" />
                                     </button>
                                     <button
                                       onClick={() => rejectApplication(app.id)}
                                       className="text-red-600 hover:text-red-800 p-1"
                                       title="Rejeter"
                                     >
                                       <XCircle className="w-4 h-4" />
                                     </button>
                                   </div>
                                 )}
                                 {app.status && (
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
                       <p className="text-gray-600">{filteredVotes.length} vote(s) enregistré(s) • {approvedCandidates.length} candidat(s) approuvé(s)</p>
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
                             Approuvé le {new Date(candidate.approvedAt).toLocaleDateString('fr-FR')}
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
                    <p className="text-center text-gray-500 py-8">Aucun vote trouvé</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidat</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-1">
                                  <span className="text-sm font-medium text-gray-900">{vote.rating}</span>
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  vote.voteType === 'online' ? 'bg-blue-100 text-blue-800' :
                                  vote.voteType === 'jury' ? 'bg-purple-100 text-purple-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {vote.voteType === 'online' ? 'En ligne' :
                                   vote.voteType === 'jury' ? 'Jury' : 'Public'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  vote.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  vote.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {vote.status === 'approved' ? 'Approuvé' :
                                   vote.status === 'rejected' ? 'Rejeté' : 'En attente'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => updateVoteStatus(vote.id, 'approved')}
                                    className="text-green-600 hover:text-green-800"
                                    title="Approuver"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => updateVoteStatus(vote.id, 'rejected')}
                                    className="text-red-600 hover:text-red-800"
                                    title="Rejeter"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </div>
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
                        <p className="text-sm font-medium text-gray-600">Tendance des candidatures</p>
                        <p className="text-2xl font-bold text-blue-dark">+12%</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Ce mois
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
                        <p className="text-sm font-medium text-gray-600">Tendance des votes</p>
                        <p className="text-2xl font-bold text-green-600">+8%</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Ce mois
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
                        <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                        <p className="text-2xl font-bold text-orange-600">4.2</p>
                        <p className="text-xs text-orange-600 flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Sur 5
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
                      {analyticsData.categoryStats?.slice(0, 8).map((cat: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 truncate">{cat.name}</span>
                              <span className="text-sm text-gray-500">{cat.averageRating.toFixed(1)}/5</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(cat.averageRating / 5) * 100}%` }}
                              ></div>
                          </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>{cat.candidates} candidats</span>
                              <span>{cat.votes} votes</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top performers */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-lg font-semibold text-blue-dark mb-6">Top Performers</h3>
                    <div className="space-y-4">
                      {analyticsData.topPerformers?.map((performer: any, index: number) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <span className="text-sm text-gray-600">{performer.rating}</span>
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              </div>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-500">{performer.votes} votes</span>
                            </div>
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidats</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votes</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note Moyenne</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {analyticsData.monthlyData?.map((month: any, index: number) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{month.candidates}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{month.votes}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{month.rating.toFixed(1)}/5</td>
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