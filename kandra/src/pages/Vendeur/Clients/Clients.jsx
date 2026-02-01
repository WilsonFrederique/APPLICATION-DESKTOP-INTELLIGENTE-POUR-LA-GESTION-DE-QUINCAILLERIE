import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Clients.module.css';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import InputSelect from '../../../components/Input/InputSelect';
import Table from '../../../components/Table/Table';
import { 
  IoPersonOutline,
  IoSearchOutline,
  IoAddOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoFilterOutline,
  IoPrintOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoTrashOutline,
  IoPencilOutline,
  IoWalletOutline,
  IoReceiptOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoTimeOutline
} from "react-icons/io5";
import { 
  FaUserTie,
  FaBuilding,
  FaStore,
  FaChartLine,
  FaTags,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaMoneyBillWave
} from "react-icons/fa";
import { 
  TbBuildingStore,
  TbCategory,
  TbCurrencyDollar,
  TbTrendingUp,
  TbListDetails
} from "react-icons/tb";
import { 
  MdOutlineStorefront,
  MdOutlineCategory,
  MdOutlineLocalShipping,
  MdOutlinePayment,
  MdOutlineDateRange,
  MdOutlineGroup
} from "react-icons/md";

// Données mock pour les clients
const mockClients = [
  {
    id: 1,
    nom: 'SARL Batiment Plus',
    type: 'Entreprise',
    contact: 'Mr. Rakoto Jean',
    telephone: '+261 34 00 123 45',
    email: 'contact@batimentplus.mg',
    adresse: 'Analakely, Antananarivo 101',
    categorie: 'Client Premium',
    credit_autorise: 5000000,
    credit_utilise: 1500000,
    total_achats: 8500000,
    dernier_achat: '2024-03-15',
    statut: 'actif'
  },
  {
    id: 2,
    nom: 'Entreprise Construction Pro',
    type: 'Entreprise',
    contact: 'Mr. Rabe Andriana',
    telephone: '+261 32 00 987 65',
    email: 'info@constructionpro.mg',
    adresse: 'Ivandry, Antananarivo',
    categorie: 'Client Gold',
    credit_autorise: 3000000,
    credit_utilise: 0,
    total_achats: 4200000,
    dernier_achat: '2024-03-14',
    statut: 'actif'
  },
  {
    id: 3,
    nom: 'Mr. Randria Jean-Pierre',
    type: 'Particulier',
    contact: 'Mr. Randria Jean-Pierre',
    telephone: '+261 33 00 456 78',
    email: 'randria.jp@gmail.com',
    adresse: 'Ambohibao, Antananarivo',
    categorie: 'Client Standard',
    credit_autorise: 1000000,
    credit_utilise: 250000,
    total_achats: 1800000,
    dernier_achat: '2024-03-10',
    statut: 'actif'
  },
  {
    id: 4,
    nom: 'Groupe Immobilier Pro',
    type: 'Entreprise',
    contact: 'Mme. Rasoa',
    telephone: '+261 34 11 223 34',
    email: 'direction@groupepro.mg',
    adresse: 'Ankorondrano, Antananarivo',
    categorie: 'Client Premium',
    credit_autorise: 10000000,
    credit_utilise: 3200000,
    total_achats: 12500000,
    dernier_achat: '2024-03-12',
    statut: 'actif'
  },
  {
    id: 5,
    nom: 'SARL Materiaux Pro',
    type: 'Entreprise',
    contact: 'Mr. Rajaona',
    telephone: '+261 32 11 334 45',
    email: 'rajaona@materiauxpro.mg',
    adresse: 'Andraharo, Antananarivo',
    categorie: 'Client Silver',
    credit_autorise: 2000000,
    credit_utilise: 800000,
    total_achats: 3100000,
    dernier_achat: '2024-03-08',
    statut: 'inactif'
  },
  {
    id: 6,
    nom: 'Mr. Andriamora',
    type: 'Particulier',
    contact: 'Mr. Andriamora',
    telephone: '+261 33 12 445 56',
    email: 'andriamora@yahoo.fr',
    adresse: 'Anosy, Antananarivo',
    categorie: 'Client Standard',
    credit_autorise: 500000,
    credit_utilise: 0,
    total_achats: 750000,
    dernier_achat: '2024-02-28',
    statut: 'actif'
  },
  {
    id: 7,
    nom: 'Société Travaux Public',
    type: 'Entreprise',
    contact: 'Mr. Ravalison',
    telephone: '+261 34 22 556 67',
    email: 'travauxpublic@stp.mg',
    adresse: 'Ambodivona, Antananarivo',
    categorie: 'Client Gold',
    credit_autorise: 8000000,
    credit_utilise: 4200000,
    total_achats: 9500000,
    dernier_achat: '2024-03-13',
    statut: 'actif'
  },
  {
    id: 8,
    nom: 'Mme. Rakotomalala',
    type: 'Particulier',
    contact: 'Mme. Rakotomalala',
    telephone: '+261 32 33 667 78',
    email: 'rakotomalala@outlook.com',
    adresse: 'Mahamasina, Antananarivo',
    categorie: 'Client Standard',
    credit_autorise: 300000,
    credit_utilise: 0,
    total_achats: 450000,
    dernier_achat: '2024-03-05',
    statut: 'actif'
  }
];

// Historique des paiements mock
const mockHistoriquePaiements = [
  {
    id: 1,
    client: 'SARL Batiment Plus',
    date: '2024-03-15',
    montant: 500000,
    mode: 'Virement',
    facture: 'FAC-2024-00158',
    statut: 'payé'
  },
  {
    id: 2,
    client: 'Entreprise Construction Pro',
    date: '2024-03-14',
    montant: 300000,
    mode: 'Espèces',
    facture: 'FAC-2024-00157',
    statut: 'payé'
  },
  {
    id: 3,
    client: 'Mr. Randria Jean-Pierre',
    date: '2024-03-10',
    montant: 150000,
    mode: 'MVola',
    facture: 'FAC-2024-00152',
    statut: 'payé'
  },
  {
    id: 4,
    client: 'Groupe Immobilier Pro',
    date: '2024-03-12',
    montant: 750000,
    mode: 'Virement',
    facture: 'FAC-2024-00155',
    statut: 'payé'
  },
  {
    id: 5,
    client: 'SARL Materiaux Pro',
    date: '2024-03-08',
    montant: 200000,
    mode: 'Crédit',
    facture: 'FAC-2024-00150',
    statut: 'en attente'
  }
];

// Composant de carte client
const ClientCard = ({ client, onView, onEdit, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className={styles.clientCard}>
      <div className={styles.cardHeader}>
        <div className={styles.clientType}>
          {client.type === 'Entreprise' ? <FaBuilding /> : <IoPersonOutline />}
          <span>{client.type}</span>
        </div>
        <div className={`${styles.statusBadge} ${styles[client.statut]}`}>
          {client.statut === 'actif' && <IoCheckmarkCircleOutline />}
          {client.statut === 'inactif' && <IoAlertCircleOutline />}
          <span>{client.statut}</span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.clientMainInfo}>
          <div className={styles.clientAvatar}>
            <FaUserTie />
          </div>
          <div>
            <h4 className={styles.clientName}>{client.nom}</h4>
            <p className={styles.clientContact}>{client.contact}</p>
            <div className={styles.clientCategory}>
              <FaTags />
              <span>{client.categorie}</span>
            </div>
          </div>
        </div>

        <div className={styles.clientDetails}>
          <div className={styles.detailItem}>
            <IoCallOutline />
            <span>{client.telephone}</span>
          </div>
          {client.email && (
            <div className={styles.detailItem}>
              <IoMailOutline />
              <span>{client.email}</span>
            </div>
          )}
          <div className={styles.detailItem}>
            <IoLocationOutline />
            <span className={styles.truncate}>{client.adresse}</span>
          </div>
        </div>

        <div className={styles.clientStats}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Total achats</div>
            <div className={styles.statValue}>{formatCurrency(client.total_achats)}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Dernier achat</div>
            <div className={styles.statValue}>{formatDate(client.dernier_achat)}</div>
          </div>
        </div>

        <div className={styles.creditInfo}>
          <div className={styles.creditProgress}>
            <div className={styles.progressLabel}>
              <span>Crédit utilisé</span>
              <span>{formatCurrency(client.credit_utilise)} / {formatCurrency(client.credit_autorise)}</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ 
                  width: `${(client.credit_utilise / client.credit_autorise) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardActions}>
        <Button
          variant="outline"
          size="small"
          icon="eye"
          onClick={() => onView(client)}
          className={styles.actionBtn}
          fullWidth
        >
          Voir
        </Button>
        <Button
          variant="outline"
          size="small"
          icon="edit"
          onClick={() => onEdit(client)}
          className={styles.actionBtn}
          fullWidth
        >
          Modifier
        </Button>
        <Button
          variant="outline"
          size="small"
          icon="trash"
          onClick={() => onDelete(client)}
          className={styles.actionBtn}
          fullWidth
        >
          Supprimer
        </Button>
      </div>
    </div>
  );
};

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState(mockClients);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('clients'); // 'clients' ou 'payments'

  // Filtrer les clients
  const filteredClients = useMemo(() => {
    let filtered = [...clients];

    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.telephone.includes(searchTerm)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(client => client.categorie === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(client => client.statut === selectedStatus);
    }

    return filtered;
  }, [clients, searchTerm, selectedCategory, selectedStatus]);

  // Calculer les statistiques
  const stats = useMemo(() => {
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.statut === 'actif').length;
    const premiumClients = clients.filter(c => c.categorie === 'Client Premium').length;
    const totalCredit = clients.reduce((sum, c) => sum + c.credit_utilise, 0);
    const totalSales = clients.reduce((sum, c) => sum + c.total_achats, 0);

    return {
      totalClients,
      activeClients,
      premiumClients,
      totalCredit,
      totalSales
    };
  }, [clients]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAddClient = () => {
    navigate('/frmClients');
  };

  const handleEditClient = (client) => {
    navigate(`/frmClients/${client.id}`, { state: { clientData: client } });
  };

  const handleDeleteClient = (client) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le client "${client.nom}" ?`)) {
      setClients(prev => prev.filter(c => c.id !== client.id));
    }
  };

  const handleViewClient = (client) => {
    navigate(`/detailClients/${client.id}`, { state: { clientData: client } });
  };

  // Catégories uniques pour le filtre
  const categories = ['all', ...new Set(clients.map(c => c.categorie))];
  const statuses = ['all', 'actif', 'inactif'];

  // Colonnes pour le tableau
  const columns = [
    {
      key: 'nom',
      label: 'Client',
      accessor: 'nom',
      render: (row) => (
        <div className={styles.tableClientCell}>
          <div className={styles.tableClientAvatar}>
            {row.type === 'Entreprise' ? <FaBuilding /> : <IoPersonOutline />}
          </div>
          <div>
            <div className={styles.tableClientName}>{row.nom}</div>
            <div className={styles.tableClientContact}>{row.contact}</div>
          </div>
        </div>
      )
    },
    {
      key: 'telephone',
      label: 'Téléphone',
      accessor: 'telephone'
    },
    {
      key: 'categorie',
      label: 'Catégorie',
      accessor: 'categorie'
    },
    {
      key: 'credit',
      label: 'Crédit utilisé',
      accessor: 'credit_utilise',
      render: (row) => (
        <div>
          <div>{formatCurrency(row.credit_utilise)}</div>
          <div className={styles.creditLimit}>
            / {formatCurrency(row.credit_autorise)}
          </div>
        </div>
      )
    },
    {
      key: 'statut',
      label: 'Statut',
      accessor: 'statut',
      render: (row) => (
        <span className={`${styles.statusBadgeTable} ${styles[row.statut]}`}>
          {row.statut === 'actif' ? 'Actif' : 'Inactif'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className={styles.tableActions}>
          <Button
            variant="ghost"
            size="small"
            icon="eye"
            onClick={() => handleViewClient(row)}
            className={styles.tableActionBtn}
          />
          <Button
            variant="ghost"
            size="small"
            icon="edit"
            onClick={() => handleEditClient(row)}
            className={styles.tableActionBtn}
          />
          <Button
            variant="ghost"
            size="small"
            icon="trash"
            onClick={() => handleDeleteClient(row)}
            className={styles.tableActionBtn}
          />
        </div>
      )
    }
  ];

  return (
    <div className={styles.containers}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitleSection}>
            <MdOutlineGroup className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Gestion des Clients</h1>
              <p className={styles.subtitle}>
                Gérez vos clients, crédits et historiques de paiement
              </p>
            </div>
          </div>

          <div className={styles.headerActions}>
            <Button
              variant="primary"
              size="medium"
              icon="plus"
              onClick={handleAddClient}
              className={styles.addButton}
            >
              Nouveau Client
            </Button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className={styles.quickStats}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.primary}`}>
              <IoPersonOutline />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stats.totalClients}</span>
              <span className={styles.statLabel}>Clients</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.success}`}>
              <IoCheckmarkCircleOutline />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stats.activeClients}</span>
              <span className={styles.statLabel}>Actifs</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.premium}`}>
              <FaTags />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stats.premiumClients}</span>
              <span className={styles.statLabel}>Premium</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.warning}`}>
              <IoWalletOutline />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{formatCurrency(stats.totalCredit)}</span>
              <span className={styles.statLabel}>Crédit total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className={styles.navigationTabs}>
        <Button
          variant={activeTab === 'clients' ? 'primary' : 'ghost'}
          size="medium"
          icon="person"
          onClick={() => setActiveTab('clients')}
          className={`${styles.tabBtn} ${activeTab === 'clients' ? styles.active : ''}`}
          fullWidth
        >
          Liste des Clients
        </Button>
        <Button
          variant={activeTab === 'payments' ? 'primary' : 'ghost'}
          size="medium"
          icon="receipt"
          onClick={() => setActiveTab('payments')}
          className={`${styles.tabBtn} ${activeTab === 'payments' ? styles.active : ''}`}
          fullWidth
        >
          Historique Paiements
        </Button>
        <Button
          variant={activeTab === 'reports' ? 'primary' : 'ghost'}
          size="medium"
          icon="chart"
          onClick={() => setActiveTab('reports')}
          className={`${styles.tabBtn} ${activeTab === 'reports' ? styles.active : ''}`}
          fullWidth
        >
          Rapports
        </Button>
      </div>

      {/* Contenu principal */}
      <div className={styles.mainContent}>
        {activeTab === 'clients' && (
          <>
            {/* Barre de recherche et filtres */}
            <div className={styles.controlsBar}>
              <div className={styles.searchSection}>
                <Input
                  type="text"
                  placeholder="Rechercher client, téléphone, contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  icon={<IoSearchOutline />}
                  fullWidth
                />
              </div>

              <div className={styles.filtersSection}>
                <div className={styles.filterGroup}>
                  <InputSelect
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categories.map(cat => ({
                      value: cat,
                      label: cat === 'all' ? 'Toutes catégories' : cat
                    }))}
                    placeholder="Catégorie"
                    size="small"
                    variant="outline"
                    icon={<FaTags />}
                    fullWidth
                  />
                </div>

                <div className={styles.filterGroup}>
                  <InputSelect
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    options={statuses.map(status => ({
                      value: status,
                      label: status === 'all' ? 'Tous statuts' : 
                            status === 'actif' ? 'Actifs seulement' : 'Inactifs seulement'
                    }))}
                    placeholder="Statut"
                    size="small"
                    variant="outline"
                    icon={
                      selectedStatus === 'actif' ? <IoCheckmarkCircleOutline /> : 
                      selectedStatus === 'inactif' ? <IoAlertCircleOutline /> : <IoFilterOutline />
                    }
                    fullWidth
                  />
                </div>
              </div>

              <div className={styles.exportButtons}>
                <div className={styles.viewToggle}>
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                    size="small"
                    icon="grid"
                    onClick={() => setViewMode('grid')}
                    className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                    aria-label="Vue grille"
                  />
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'ghost'}
                    size="small"
                    icon="list"
                    onClick={() => setViewMode('list')}
                    className={`${styles.viewToggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
                    aria-label="Vue liste"
                  />
                </div>
                
                <Button
                  variant="outline"
                  size="medium"
                  icon="print"
                  className={styles.exportBtn}
                  onClick={() => window.print()}
                >
                  Imprimer
                </Button>
                <Button
                  variant="outline"
                  size="medium"
                  icon="download"
                  className={styles.exportBtn}
                  onClick={() => {
                    const content = clients.map(c => 
                      `${c.nom}|${c.telephone}|${c.email}|${c.adresse}|${c.categorie}|${c.statut}`
                    ).join('\n');
                    const blob = new Blob([content], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'clients.csv';
                    a.click();
                  }}
                >
                  Exporter
                </Button>
              </div>
            </div>

            {/* Vue des clients */}
            <div className={styles.clientsContainer}>
              {filteredClients.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className={styles.clientsGrid}>
                    {filteredClients.map((client) => (
                      <ClientCard
                        key={client.id}
                        client={client}
                        onView={handleViewClient}
                        onEdit={handleEditClient}
                        onDelete={handleDeleteClient}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={styles.clientsTable}>
                    <Table
                      columns={columns}
                      data={filteredClients}
                      selectable={true}
                      sortable={true}
                      pagination={true}
                      itemsPerPage={10}
                      hoverEffect={true}
                      striped={true}
                      onRowClick={handleViewClient}
                    />
                  </div>
                )
              ) : (
                <div className={styles.noClients}>
                  <div className={styles.noClientsIcon}>
                    <IoPersonOutline />
                  </div>
                  <h3>Aucun client trouvé</h3>
                  <p>Aucun client ne correspond à vos critères de recherche.</p>
                  <Button
                    variant="primary"
                    size="medium"
                    icon="plus"
                    onClick={handleAddClient}
                  >
                    Ajouter un client
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'payments' && (
          <div className={styles.paymentsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <IoReceiptOutline /> Historique des Paiements
              </h2>
              <div className={styles.paymentStats}>
                <div className={styles.paymentStat}>
                  <span className={styles.paymentStatLabel}>Total ce mois:</span>
                  <span className={styles.paymentStatValue}>1,850,000 MGA</span>
                </div>
                <div className={styles.paymentStat}>
                  <span className={styles.paymentStatLabel}>En attente:</span>
                  <span className={styles.paymentStatValue}>200,000 MGA</span>
                </div>
              </div>
            </div>

            <div className={styles.paymentsTable}>
              <Table
                columns={[
                  { key: 'date', label: 'Date', accessor: 'date' },
                  { key: 'client', label: 'Client', accessor: 'client' },
                  { key: 'montant', label: 'Montant', accessor: 'montant', render: (row) => formatCurrency(row.montant) },
                  { key: 'mode', label: 'Mode', accessor: 'mode' },
                  { key: 'facture', label: 'Facture', accessor: 'facture' },
                  { 
                    key: 'statut', 
                    label: 'Statut', 
                    accessor: 'statut',
                    render: (row) => (
                      <span className={`${styles.paymentStatus} ${styles[row.statut]}`}>
                        {row.statut === 'payé' ? <IoCheckmarkCircleOutline /> : <IoTimeOutline />}
                        {row.statut}
                      </span>
                    )
                  }
                ]}
                data={mockHistoriquePaiements}
                pagination={true}
                itemsPerPage={5}
                sortable={true}
              />
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className={styles.reportsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <FaChartLine /> Rapports Clients
              </h2>
              <div className={styles.reportActions}>
                <Button
                  variant="outline"
                  size="medium"
                  icon="download"
                  className={styles.reportBtn}
                  onClick={() => {
                    const content = `Rapport Clients ${new Date().toLocaleDateString()}\n\n` +
                      `Total Clients: ${stats.totalClients}\n` +
                      `Clients Actifs: ${stats.activeClients}\n` +
                      `Clients Premium: ${stats.premiumClients}\n` +
                      `Crédit Total Utilisé: ${formatCurrency(stats.totalCredit)}\n` +
                      `Chiffre d'Affaires Total: ${formatCurrency(stats.totalSales)}`;
                    
                    const blob = new Blob([content], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `rapport-clients-${new Date().toISOString().split('T')[0]}.txt`;
                    a.click();
                  }}
                >
                  Exporter PDF
                </Button>
                <Button
                  variant="outline"
                  size="medium"
                  icon="print"
                  className={styles.reportBtn}
                  onClick={() => window.print()}
                >
                  Imprimer
                </Button>
              </div>
            </div>

            <div className={styles.reportsGrid}>
              <div className={styles.reportCard}>
                <div className={styles.reportHeader}>
                  <h4>Répartition par catégorie</h4>
                </div>
                <div className={styles.reportContent}>
                  <div className={styles.chartPlaceholder}>
                    <div className={styles.chartStats}>
                      {['Client Premium', 'Client Gold', 'Client Silver', 'Client Standard'].map(cat => {
                        const count = clients.filter(c => c.categorie === cat).length;
                        const percent = (count / clients.length) * 100;
                        return (
                          <div key={cat} className={styles.chartStat}>
                            <div className={styles.chartStatLabel}>{cat}</div>
                            <div className={styles.chartStatBar}>
                              <div 
                                className={styles.chartStatFill}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                            <div className={styles.chartStatValue}>{count} ({percent.toFixed(1)}%)</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.reportCard}>
                <div className={styles.reportHeader}>
                  <h4>Top 5 clients</h4>
                </div>
                <div className={styles.reportContent}>
                  <ul className={styles.topClientsList}>
                    {clients
                      .sort((a, b) => b.total_achats - a.total_achats)
                      .slice(0, 5)
                      .map((client, index) => (
                        <li key={client.id} className={styles.topClientItem}>
                          <span className={styles.rank}>{index + 1}</span>
                          <span className={styles.clientName}>{client.nom}</span>
                          <span className={styles.clientAmount}>{formatCurrency(client.total_achats)}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;