import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  Edit, 
  X, 
  Shield, 
  Key,
  Bell,
  Globe,
  Calendar,
  Award,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  BarChart3,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Users
} from 'lucide-react';

interface AdminProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: string;
  lastLogin: string;
  permissions: string[];
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginAttempts: number;
    accountLocked: boolean;
  };
  activity: {
    totalLogins: number;
    lastActivity: string;
    sessionsActive: number;
    devicesCount: number;
  };
}

const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [profile, setProfile] = useState<AdminProfile>({
    id: 'admin-001',
    firstName: 'Faya Maurice',
    lastName: 'MILLIMOUNO',
    email: 'admin@hag-guinee.com',
    phone: '+224 622 586 253',
    role: 'Commissaire Général',
    avatar: '/admin-avatar.jpg',
    bio: 'Commissaire Général des Hospitality Awards Guinée avec plus de 15 ans d\'expérience dans le secteur du tourisme et de l\'hospitalité. Expert en organisation d\'événements et en gestion de projets culturels.',
    location: 'Conakry, Guinée',
    joinDate: '2020-01-15',
    lastLogin: '2024-11-20T10:30:00',
    permissions: ['admin', 'candidates', 'votes', 'payments', 'users', 'reports', 'settings', 'analytics'],
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: '2024-10-15T14:30:00',
      loginAttempts: 0,
      accountLocked: false
    },
    activity: {
      totalLogins: 1247,
      lastActivity: '2024-11-20T10:30:00',
      sessionsActive: 2,
      devicesCount: 3
    }
  });

  const [editForm, setEditForm] = useState<Partial<AdminProfile>>({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditForm({});
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile({ ...profile, ...editForm });
    setIsEditing(false);
    setEditForm({});
  };

  const handleInputChange = (field: keyof AdminProfile, value: string | boolean) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      // Simuler le changement de mot de passe
      setProfile(prev => ({
        ...prev,
        security: {
          ...prev.security,
          lastPasswordChange: new Date().toISOString()
        }
      }));
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'admin': return <Shield className="w-4 h-4 text-red-600" />;
      case 'candidates': return <User className="w-4 h-4 text-blue-600" />;
      case 'votes': return <BarChart3 className="w-4 h-4 text-green-600" />;
      case 'payments': return <Key className="w-4 h-4 text-gold" />;
      case 'users': return <Users className="w-4 h-4 text-purple-600" />;
      case 'reports': return <BarChart3 className="w-4 h-4 text-indigo-600" />;
      case 'settings': return <Settings className="w-4 h-4 text-gray-600" />;
      case 'analytics': return <Activity className="w-4 h-4 text-teal-600" />;
      default: return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="AdminProfile min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-blue-dark" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-dark rounded-full flex items-center justify-center hover:bg-blue-deep transition-colors shadow-lg">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-dark mb-2">Profil Administrateur</h1>
                <p className="text-gray-600 text-lg">Gérez vos informations personnelles et paramètres de sécurité</p>
                <div className="flex items-center space-x-4 mt-3">
                  <span className="px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm font-medium">
                    {profile.role}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Actif
                  </span>
                </div>
              </div>
            </div>
            
            {!isEditing && (
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-dark text-white rounded-xl hover:bg-blue-deep transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  <span>Changer mot de passe</span>
                </button>
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-gold text-blue-dark rounded-xl hover:bg-yellow-500 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-1 lg:grid-3 gap-8">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations de base */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-blue-dark mb-6 flex items-center space-x-2">
                <User className="w-5 h-5 text-gold" />
                <span>Informations personnelles</span>
              </h3>
              
              <div className="grid grid-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.firstName || profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900">{profile.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.lastName || profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900">{profile.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email || profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone || profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900">{profile.phone}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editForm.bio || profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700 text-lg leading-relaxed">{profile.bio}</p>
                )}
              </div>
            </div>

            {/* Informations détaillées */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-blue-dark mb-6 flex items-center space-x-2">
                <Award className="w-5 h-5 text-gold" />
                <span>Informations professionnelles</span>
              </h3>
              
              <div className="grid grid-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                  <p className="text-lg font-medium text-gray-900">{profile.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.location || profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900">{profile.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date d'adhésion</label>
                  <p className="text-lg font-medium text-gray-900">{formatDate(profile.joinDate)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dernière connexion</label>
                  <p className="text-lg font-medium text-gray-900">{formatDateTime(profile.lastLogin)}</p>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-blue-dark mb-6 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-gold" />
                <span>Permissions et accès</span>
              </h3>
              
              <div className="grid grid-2 lg:grid-4 gap-4">
                {profile.permissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    {getPermissionIcon(permission)}
                    <span className="text-sm font-medium text-gray-900 capitalize">{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            {isEditing && (
              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                  <span>Annuler</span>
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Paramètres de notification */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-blue-dark mb-6 flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gold" />
                <span>Notifications</span>
              </h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={profile.notifications.email}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: e.target.checked }
                    }))}
                    className="w-5 h-5 text-gold focus:ring-gold border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Notifications par email</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={profile.notifications.sms}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, sms: e.target.checked }
                    }))}
                    className="w-5 h-5 text-gold focus:ring-gold border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Notifications par SMS</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={profile.notifications.push}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, push: e.target.checked }
                    }))}
                    className="w-5 h-5 text-gold focus:ring-gold border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Notifications push</span>
                </label>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-blue-dark mb-6 flex items-center space-x-2">
                <Lock className="w-5 h-5 text-gold" />
                <span>Sécurité</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Authentification 2FA</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    profile.security.twoFactorEnabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {profile.security.twoFactorEnabled ? 'Activée' : 'Désactivée'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Dernier changement</span>
                  <span className="text-xs text-gray-500">{formatDate(profile.security.lastPasswordChange)}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Tentatives de connexion</span>
                  <span className="text-xs text-gray-500">{profile.security.loginAttempts}</span>
                </div>
              </div>
            </div>

            {/* Activité */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-blue-dark mb-6 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-gold" />
                <span>Activité</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Connexions totales</span>
                  <span className="text-sm font-medium text-blue-dark">{profile.activity.totalLogins}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Sessions actives</span>
                  <span className="text-sm font-medium text-green-600">{profile.activity.sessionsActive}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Appareils connectés</span>
                  <span className="text-sm font-medium text-purple-600">{profile.activity.devicesCount}</span>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-blue-dark mb-6">Actions rapides</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                  <Key className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Changer mot de passe</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Paramètres de langue</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-gold-50 hover:bg-gold-100 rounded-xl transition-colors">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span className="text-sm font-medium text-gold">Préférences de temps</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">Se déconnecter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de changement de mot de passe */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-blue-dark mb-6">Changer le mot de passe</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Entrez votre mot de passe actuel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Entrez le nouveau mot de passe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Confirmez le nouveau mot de passe"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handlePasswordChange}
                className="flex-1 px-4 py-2 bg-blue-dark text-white rounded-lg hover:bg-blue-deep transition-colors"
              >
                Changer le mot de passe
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile; 