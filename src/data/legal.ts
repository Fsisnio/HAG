export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  closing?: string[];
}

export interface LegalDocument {
  slug: 'cgu' | 'cgv' | 'confidentialite';
  path: string;
  shortTitle: string;
  title: string;
  updatedAt: string;
  intro: string[];
  sections: LegalSection[];
}

export const LEGAL_UPDATED_AT = '30 août 2026';

export const legalDocuments: LegalDocument[] = [
  {
    slug: 'cgu',
    path: '/cgu',
    shortTitle: 'CGU',
    title: 'Conditions générales d’utilisation',
    updatedAt: LEGAL_UPDATED_AT,
    intro: [
      'Les présentes Conditions générales d’utilisation (CGU) régissent l’accès et l’utilisation de la plateforme numérique des Hospitality Awards Guinée (HAG), organisés par le Groupe LM.',
      'Toute navigation, candidature, vote, achat de ticket ou prise de contact implique l’acceptation des présentes CGU.'
    ],
    sections: [
      {
        id: 'editeur',
        title: 'Éditeur de la plateforme',
        paragraphs: [
          'La plateforme est éditée pour le compte des Hospitality Awards Guinée, organisés par le Groupe LM, Conakry, République de Guinée.',
          'Contact : groupelmcontact@gmail.com — +224 626 93 04 83.'
        ]
      },
      {
        id: 'objet',
        title: 'Objet',
        paragraphs: [
          'Le site permet notamment de consulter l’événement, de déposer une candidature, de voter pour les nominés, d’acheter des tickets pour la cérémonie, et de contacter l’organisation.'
        ]
      },
      {
        id: 'acces',
        title: 'Accès au site',
        paragraphs: [
          'L’accès aux pages publiques est libre. Certaines fonctionnalités (candidature, vote, billetterie) nécessitent la communication d’informations exactes.',
          'L’organisation peut suspendre, modifier ou interrompre tout ou partie du site pour maintenance, sécurité ou impératif d’organisation.'
        ]
      },
      {
        id: 'usage',
        title: 'Règles d’usage',
        paragraphs: ['L’utilisateur s’engage à :'],
        bullets: [
          'fournir des informations sincères et à jour ;',
          'ne pas usurper l’identité d’un tiers ;',
          'ne pas perturber le fonctionnement du site, des votes ou des paiements ;',
          'ne pas utiliser de moyens automatisés, scripts ou procédés frauduleux ;',
          'respecter le règlement officiel des HAG 2026, les CGV et la Politique de confidentialité.'
        ]
      },
      {
        id: 'contenus',
        title: 'Contenus transmis',
        paragraphs: [
          'Les textes, logos, photographies et documents déposés par un candidat restent sous sa responsabilité. Il garantit disposer des droits nécessaires et autorise leur usage dans le cadre de la communication des HAG, conformément au règlement et à l’autorisation donnée lors de l’inscription.'
        ]
      },
      {
        id: 'propriete',
        title: 'Propriété intellectuelle',
        paragraphs: [
          'Le nom Hospitality Awards Guinée, le sigle HAG, les logos, visuels, textes et éléments graphiques de la plateforme sont protégés. Toute reproduction non autorisée est interdite, sous réserve des usages expressément accordés aux lauréats.'
        ]
      },
      {
        id: 'responsabilite',
        title: 'Responsabilité',
        paragraphs: [
          'L’organisation met en œuvre des moyens raisonnables pour assurer la disponibilité du site. Elle ne saurait être tenue responsable des interruptions de réseau, des défaillances d’un prestataire de paiement ou d’un usage non conforme par un utilisateur.',
          'Les liens vers des sites tiers (réseaux sociaux, prestataire de paiement) relèvent de la responsabilité de leurs éditeurs.'
        ]
      },
      {
        id: 'droit',
        title: 'Droit applicable',
        paragraphs: [
          'Les présentes CGU sont soumises au droit guinéen. Tout litige non résolu à l’amiable relève des juridictions compétentes de Conakry.',
          'Pour le déroulement des prix, le Règlement officiel des Hospitality Awards Guinée 2026 prévaut sur les présentes CGU en cas de contradiction relative au processus de sélection.'
        ]
      }
    ]
  },
  {
    slug: 'cgv',
    path: '/cgv',
    shortTitle: 'CGV',
    title: 'Conditions générales de vente — vote et paiements',
    updatedAt: LEGAL_UPDATED_AT,
    intro: [
      'Les présentes Conditions générales de vente (CGV) s’appliquent aux prestations payantes proposées sur la plateforme des Hospitality Awards Guinée : votes du public et billetterie de la cérémonie.',
      'Elles constituent les conditions du vote et des paiements. En validant un paiement, l’utilisateur les accepte sans réserve.'
    ],
    sections: [
      {
        id: 'vote-paiements',
        title: 'Vote du public',
        paragraphs: [
          'Le vote du public, lorsqu’il est ouvert, est un service payant. Le prix unitaire officiel est de 5 000 GNF par vote.',
          'L’utilisateur peut acheter plusieurs votes en une seule opération. Le montant débité est égal à 5 000 GNF multiplié par le nombre de votes choisi.',
          'Un vote n’est validé et comptabilisé qu’après confirmation du paiement par le prestataire. Un paiement non abouti, annulé ou échoué ne donne lieu à aucun vote.'
        ]
      },
      {
        id: 'billets',
        title: 'Billetterie',
        paragraphs: [
          'Les tarifs officiels de la cérémonie sont ceux affichés sur la page Tickets au moment de la commande, notamment :'
        ],
        bullets: [
          'Standard : 500 000 GNF ;',
          'VIP : 1 000 000 GNF ;',
          'VVIP : 2 000 000 GNF ;',
          'Table entreprise : 10 000 000 GNF ;',
          'Table Prestige : 20 000 000 GNF.'
        ],
        closing: [
          'Le montant facturé est le tarif officiel multiplié par la quantité. Un reçu de paiement Chap Chap Pay confirme la réservation. Pour une facture entreprise, l’acheteur écrit à groupelmcontact@gmail.com.'
        ]
      },
      {
        id: 'paiement',
        title: 'Paiement',
        paragraphs: [
          'Les paiements sont réalisés via Chap Chap Pay, prestataire agréé. L’utilisateur est redirigé vers l’interface de paiement pour régler par les moyens proposés (notamment mobile money et cartes, selon disponibilité).',
          'L’organisation ne collecte pas les données de carte ou de compte mobile : elles sont traitées par Chap Chap Pay selon ses propres conditions.',
          'Les prix sont exprimés en francs guinéens (GNF). Le montant envoyé au prestataire est déterminé côté serveur selon le catalogue officiel ; un montant saisi par le client n’est pas pris en compte.'
        ]
      },
      {
        id: 'remboursement',
        title: 'Annulation et remboursement',
        paragraphs: [
          'Les votes payés et validés ne sont pas remboursables, le service étant consommé dès l’enregistrement de la voix.',
          'Les tickets confirmés ne sont remboursés que si la cérémonie est annulée par l’organisation, ou dans les cas expressément admis par celle-ci. Toute demande se fait par écrit à groupelmcontact@gmail.com.',
          'Un paiement échoué, refusé ou abandonné n’entraîne aucun débit définitif au profit des HAG. En cas de double débit apparent, l’utilisateur contacte d’abord Chap Chap Pay puis l’organisation avec la preuve de transaction.'
        ]
      },
      {
        id: 'fraude',
        title: 'Fraude et irrégularités',
        paragraphs: [
          'Tout procédé automatisé, achat massif irrégulier, usurpation ou tentative de manipulation des votes est interdit. Les votes identifiés comme frauduleux peuvent être annulés sans remboursement.',
          'L’organisation peut refuser ou annuler une commande de tickets en cas d’information inexacte, de paiement litigieux ou de comportement contraire au règlement.'
        ]
      },
      {
        id: 'preuve',
        title: 'Preuve',
        paragraphs: [
          'Les enregistrements du site, du prestataire de paiement et des confirmations de transaction font foi entre les parties, sauf preuve contraire.'
        ]
      },
      {
        id: 'droit-cgv',
        title: 'Droit applicable',
        paragraphs: [
          'Les présentes CGV sont régies par le droit guinéen. Le règlement officiel des HAG 2026 s’applique en complément pour le déroulement du vote et de la compétition.'
        ]
      }
    ]
  },
  {
    slug: 'confidentialite',
    path: '/confidentialite',
    shortTitle: 'Confidentialité',
    title: 'Politique de confidentialité',
    updatedAt: LEGAL_UPDATED_AT,
    intro: [
      'La présente Politique de confidentialité décrit les conditions dans lesquelles Hospitality Awards Guinée (HAG), organisé par le Groupe LM, collecte, utilise, conserve et protège les données à caractère personnel des utilisateurs de sa plateforme numérique.',
      'Elle s’applique notamment aux candidats, votants, membres du jury, partenaires, invités, prestataires et visiteurs du site.',
      'Hospitality Awards Guinée s’engage à assurer la confidentialité, l’intégrité et la sécurité des données qui lui sont confiées, conformément à la législation applicable en République de Guinée, notamment la Loi L/2016/037/AN relative à la cybersécurité et à la protection des données à caractère personnel.'
    ],
    sections: [
      {
        id: 'responsable',
        title: 'Responsable du traitement',
        paragraphs: [
          'Le responsable du traitement est Hospitality Awards Guinée, organisé par le Groupe LM, Conakry, République de Guinée.',
          'Pour toute question relative aux données personnelles : groupelmcontact@gmail.com.'
        ]
      },
      {
        id: 'donnees',
        title: 'Données collectées',
        paragraphs: ['Selon l’usage de la plateforme, peuvent être collectées :'],
        bullets: [
          'données d’identité et de contact (nom, prénom, e-mail, téléphone, adresse) ;',
          'données de candidature (établissement, catégorie, textes, documents, déclarations) ;',
          'données de vote et d’achat (candidat choisi, quantité, montant, identifiants de commande) ;',
          'données techniques de navigation (journal de connexion, type de navigateur), dans la mesure nécessaire au fonctionnement du site ;',
          'le choix d’accepter ou de refuser les communications d’actualité des HAG.'
        ],
        closing: [
          'Les données de paiement sensibles (numéro de carte, code secret mobile money) ne sont pas stockées par HAG ; elles sont traitées par Chap Chap Pay.'
        ]
      },
      {
        id: 'finalites',
        title: 'Finalités',
        paragraphs: ['Les données sont utilisées pour :'],
        bullets: [
          'instruire et gérer les candidatures ;',
          'organiser le vote du public et la billetterie ;',
          'confirmer les paiements et prévenir la fraude ;',
          'communiquer sur l’événement, les nominés et les lauréats, dans le cadre de l’autorisation donnée ;',
          'répondre aux messages de contact ;',
          'envoyer des actualités HAG uniquement si l’utilisateur a coché la case facultative prévue à cet effet ;',
          'respecter les obligations légales et le règlement officiel.'
        ]
      },
      {
        id: 'base',
        title: 'Base du traitement',
        paragraphs: [
          'Le traitement repose sur l’exécution des services demandés (candidature, vote, ticket, contact), sur l’intérêt légitime de l’organisation à conduire l’événement, sur les obligations légales applicables, et sur le consentement lorsque celui-ci est requis, notamment pour les communications d’actualité.'
        ]
      },
      {
        id: 'destinataires',
        title: 'Destinataires',
        paragraphs: [
          'Les données sont accessibles aux personnes habilitées de l’organisation. Elles peuvent être transmises, dans la stricte mesure nécessaire :'
        ],
        bullets: [
          'au prestataire de paiement Chap Chap Pay, pour l’encaissement et la confirmation des opérations ;',
          'à l’hébergeur et aux outils techniques de la plateforme ;',
          'aux autorités compétentes lorsque la loi l’exige.'
        ],
        closing: ['HAG ne vend pas les données personnelles à des tiers à des fins commerciales.']
      },
      {
        id: 'duree',
        title: 'Durée de conservation',
        paragraphs: [
          'Les données de candidature, de vote et de billetterie sont conservées le temps nécessaire à l’édition concernée, au suivi administratif et aux obligations légales, puis archivées ou supprimées.',
          'Les données utilisées pour les actualités sont conservées jusqu’au retrait du consentement, ou jusqu’à une demande de suppression.'
        ]
      },
      {
        id: 'securite',
        title: 'Sécurité',
        paragraphs: [
          'HAG met en œuvre des mesures organisationnelles et techniques raisonnables pour protéger les données contre l’accès non autorisé, la perte ou l’altération. Aucun système n’étant infaillible, l’utilisateur est invité à signaler tout incident à groupelmcontact@gmail.com.'
        ]
      },
      {
        id: 'droits',
        title: 'Droits des personnes',
        paragraphs: [
          'Sous réserve de la loi applicable, toute personne peut demander l’accès, la rectification, la mise à jour ou la suppression de ses données, ainsi que s’opposer à un traitement non indispensable ou retirer son consentement aux communications d’actualité.',
          'Les demandes s’adressent à groupelmcontact@gmail.com. Une pièce d’identité peut être demandée pour éviter une divulgation à un tiers.'
        ]
      },
      {
        id: 'cookies',
        title: 'Cookies et stockage local',
        paragraphs: [
          'Le site peut utiliser un stockage local (par exemple pour mémoriser une commande de vote ou de ticket en cours) et des cookies techniques nécessaires au fonctionnement. Ces éléments ne se substituent pas au consentement exigé pour les communications marketing.'
        ]
      },
      {
        id: 'mineurs',
        title: 'Mineurs',
        paragraphs: [
          'La plateforme s’adresse à un public professionnel et au grand public majeur. Un mineur ne doit pas transmettre de données sans l’accord de son représentant légal.'
        ]
      },
      {
        id: 'modifications',
        title: 'Modifications',
        paragraphs: [
          'La présente politique peut être mise à jour. La date de mise à jour figure en tête du document. La poursuite de l’utilisation du site après publication vaut prise de connaissance de la version en vigueur, sans préjudice des consentements déjà recueillis pour les traitements qui en dépendent.'
        ]
      }
    ]
  }
];

export const getLegalDocument = (slug: LegalDocument['slug']): LegalDocument => {
  const document = legalDocuments.find((item) => item.slug === slug);
  if (!document) {
    throw new Error(`Document légal introuvable : ${slug}`);
  }
  return document;
};
