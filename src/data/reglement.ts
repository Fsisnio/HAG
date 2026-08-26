export const REGLEMENT_TITLE = 'Règlement des Hospitality Awards Guinée';
export const REGLEMENT_PLACE = 'Fait à Conakry, République de Guinée';
export const REGLEMENT_PUBLISHED_AT = '25 août 2026';

export const APPLICATION_FORM_ACCEPTANCE =
  'En soumettant ma candidature aux Hospitality Awards Guinée 2026, je reconnais avoir pris connaissance du Règlement officiel des HAG 2026 et j’accepte l’ensemble des conditions qui y sont définies.';

export interface ReglementSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  closing?: string[];
}

export const reglementSections: ReglementSection[] = [
  {
    id: 'participation',
    title: 'Conditions de participation',
    paragraphs: ['Peuvent participer, selon les catégories :'],
    bullets: [
      'les établissements légalement établis en Guinée ;',
      'les entreprises et organisations intervenant dans les secteurs concernés ;',
      'les professionnels exerçant en Guinée ;',
      'les initiatives, projets ou personnalités répondant aux conditions propres à leur catégorie.'
    ],
    closing: [
      'Un candidat peut être proposé par lui-même ou par un tiers lorsque cette possibilité est prévue par l’organisation.',
      'Toute candidature doit être accompagnée des informations et justificatifs demandés.'
    ]
  },
  {
    id: 'eligibilite',
    title: 'Conditions d’éligibilité',
    paragraphs: ['Pour être éligible, le candidat doit :'],
    bullets: [
      'appartenir au secteur correspondant à la catégorie concernée ;',
      'satisfaire aux conditions spécifiques de cette catégorie ;',
      'fournir des informations exactes et vérifiables ;',
      'respecter les délais officiels de candidature ;',
      'fournir, lorsque cela est demandé, les pièces justificatives nécessaires.'
    ],
    closing: [
      'L’organisation se réserve le droit de vérifier les informations fournies.',
      'Toute fausse déclaration, falsification de document ou tentative de manipulation du processus peut entraîner l’exclusion du candidat.'
    ]
  },
  {
    id: 'candidature',
    title: 'Procédure de candidature',
    paragraphs: [
      'Les candidatures sont soumises par le moyen officiellement indiqué par les Hospitality Awards Guinée.',
      'La période officielle des inscriptions pour l’édition 2026 est fixée du 25 août au 20 septembre 2026.',
      'Le candidat doit fournir l’ensemble des informations demandées dans le formulaire de candidature.',
      'Une candidature incomplète peut être déclarée irrecevable.',
      'Après réception, l’organisation procède à une vérification administrative avant transmission aux instances compétentes.'
    ]
  },
  {
    id: 'preselection',
    title: 'Présélection des candidats',
    paragraphs: [
      'Après clôture des candidatures, l’organisation peut procéder à une phase de vérification et de présélection.',
      'Cette étape vise notamment à :'
    ],
    bullets: [
      'vérifier l’éligibilité des candidats ;',
      'vérifier l’exactitude des informations fournies ;',
      'vérifier la conformité des candidatures aux catégories ;',
      'identifier les candidatures répondant aux critères minimums requis.'
    ],
    closing: ['La présélection ne constitue pas une garantie de victoire.']
  },
  {
    id: 'criteres',
    title: 'Critères de sélection',
    paragraphs: [
      'Les critères d’évaluation peuvent varier selon les catégories.',
      'Ils peuvent notamment porter sur :'
    ],
    bullets: [
      'la qualité du service ;',
      'l’expérience client ;',
      'le professionnalisme ;',
      'l’innovation ;',
      'la créativité ;',
      'la performance ;',
      'l’impact économique et social ;',
      'la contribution au développement touristique ;',
      'l’engagement environnemental ;',
      'la qualité des réalisations ;',
      'la réputation professionnelle ;',
      'la régularité et la constance des performances.'
    ],
    closing: [
      'Les critères applicables à chaque catégorie peuvent être précisés dans une grille d’évaluation spécifique.'
    ]
  },
  {
    id: 'jury',
    title: 'Le jury',
    paragraphs: [
      'Le jury des Hospitality Awards Guinée est composé de professionnels et personnalités disposant, selon les besoins des catégories, d’une expérience ou d’une expertise pertinente.',
      'Le jury a notamment pour mission :'
    ],
    bullets: [
      'd’examiner les candidatures ;',
      'd’évaluer les candidats selon les critères définis ;',
      'de procéder aux notations ;',
      'de contribuer à la sélection des finalistes ;',
      'de participer à la validation des résultats selon le mécanisme prévu par l’organisation.'
    ],
    closing: [
      'Les membres du jury sont tenus à un devoir d’impartialité, de confidentialité et de professionnalisme.'
    ]
  },
  {
    id: 'conflits',
    title: 'Conflits d’intérêts',
    paragraphs: [
      'Tout membre du jury ou toute personne participant au processus de sélection doit déclarer tout conflit d’intérêts réel, potentiel ou apparent.',
      'Un membre du jury ayant un intérêt direct ou indirect dans une candidature peut être exclu de l’évaluation de cette candidature.',
      'Sont notamment considérés comme conflits d’intérêts :'
    ],
    bullets: [
      'une relation professionnelle directe avec le candidat ;',
      'un lien familial proche ;',
      'un intérêt financier ;',
      'une relation commerciale susceptible d’influencer le jugement ;',
      'toute situation susceptible de compromettre l’impartialité.'
    ],
    closing: [
      'L’organisation peut prendre toute mesure nécessaire afin de préserver l’intégrité du processus.'
    ]
  },
  {
    id: 'notation',
    title: 'Système de notation',
    paragraphs: [
      'Les candidats sont évalués selon une grille de notation établie par l’organisation et/ou le jury.',
      'Lorsque plusieurs critères sont utilisés, chaque critère peut être affecté d’une pondération.',
      'Le système de notation doit permettre de comparer les candidats de manière aussi objective que possible.',
      'Les modalités précises de pondération peuvent être adaptées à la nature de chaque catégorie.',
      'En cas d’égalité, l’organisation peut prévoir une procédure de départage fondée notamment sur les critères les plus importants de la catégorie concernée.'
    ]
  },
  {
    id: 'vote-public',
    title: 'Vote du public',
    paragraphs: [
      'Pour les catégories ouvertes au vote du public, celui-ci constitue un élément du processus de désignation du lauréat.',
      'La période officielle de vote pour l’édition 2026 est fixée du 25 septembre au 4 décembre 2026.',
      'Les modalités pratiques du vote, notamment le coût éventuel du vote, le nombre de votes autorisés, les moyens de paiement et les règles de validation seront communiqués officiellement par l’organisation.',
      'Tout système automatisé, frauduleux ou destiné à manipuler artificiellement le nombre de votes est interdit.',
      'L’organisation se réserve le droit d’annuler les votes identifiés comme frauduleux ou irréguliers.'
    ]
  },
  {
    id: 'ponderation',
    title: 'Pondération jury / vote du public',
    paragraphs: [
      'Lorsqu’un prix combine l’évaluation du jury et le vote du public, la pondération applicable est communiquée avant l’ouverture du vote.',
      'À titre de principe, l’organisation peut retenir un système combinant :'
    ],
    bullets: ['Évaluation du jury : 70 %', 'Vote du public : 30 %'],
    closing: [
      'Cette pondération peut être adaptée selon les catégories lorsque la nature du prix le justifie.',
      'Toute modification éventuelle doit être communiquée avant la clôture du processus de vote.'
    ]
  },
  {
    id: 'controle',
    title: 'Contrôle et validation des résultats',
    paragraphs: [
      'Les résultats issus du jury et du vote du public font l’objet d’un processus de consolidation et de vérification.',
      'L’organisation peut procéder à des contrôles techniques ou administratifs afin de détecter :'
    ],
    bullets: [
      'les votes multiples irréguliers ;',
      'les systèmes automatisés ;',
      'les tentatives de fraude ;',
      'les manipulations techniques ;',
      'les informations falsifiées.'
    ],
    closing: [
      'Après vérification, les résultats sont soumis à la validation finale de l’instance compétente des Hospitality Awards Guinée.'
    ]
  },
  {
    id: 'laureats',
    title: 'Désignation des lauréats',
    paragraphs: [
      'Le lauréat de chaque catégorie est désigné conformément au mécanisme officiellement établi pour cette catégorie.',
      'La décision finale est communiquée lors de la cérémonie officielle de remise des prix, sauf communication contraire de l’organisation.',
      'Le jury et l’organisation disposent d’une marge d’appréciation dans le respect du présent règlement.'
    ]
  },
  {
    id: 'reclamations',
    title: 'Réclamations et contestations',
    paragraphs: [
      'Toute réclamation doit être formulée par écrit auprès de l’organisation dans un délai raisonnable après la publication ou la communication des résultats.',
      'Les réclamations doivent être motivées et accompagnées, lorsque cela est nécessaire, des éléments permettant leur examen.',
      'Les contestations manifestement infondées, diffamatoires ou destinées à perturber le processus peuvent être écartées.',
      'La décision finale relative à l’interprétation et à l’application du présent règlement relève de l’organisation des Hospitality Awards Guinée.'
    ]
  },
  {
    id: 'titre',
    title: 'Utilisation du titre « Lauréat HAG »',
    paragraphs: [
      'Les candidats ayant remporté officiellement un prix peuvent utiliser le titre : « Lauréat des Hospitality Awards Guinée — HAG 2026 ».',
      'Le titre doit être utilisé exclusivement pour le prix effectivement remporté.',
      'Toute utilisation mensongère ou trompeuse du titre est interdite.',
      'Le titre ne peut être utilisé pour laisser croire qu’un établissement ou une personne a remporté une autre catégorie que celle effectivement obtenue.'
    ]
  },
  {
    id: 'logo',
    title: 'Utilisation du logo HAG',
    paragraphs: [
      'Le logo et les éléments graphiques des Hospitality Awards Guinée sont protégés.',
      'Les lauréats peuvent utiliser le logo « Lauréat HAG 2026 » selon les conditions et règles graphiques communiquées par l’organisation.',
      'Toute modification substantielle du logo, utilisation commerciale abusive, association à un contenu portant atteinte à l’image des Hospitality Awards Guinée ou utilisation par une personne non lauréate peut entraîner le retrait de l’autorisation d’utilisation.'
    ]
  },
  {
    id: 'image',
    title: 'Communication et droit à l’image',
    paragraphs: [
      'En participant aux Hospitality Awards Guinée, les candidats autorisent l’organisation, dans le cadre de la promotion de l’événement, à utiliser les informations, photographies, vidéos et éléments de communication fournis dans le cadre de leur candidature, sous réserve des droits applicables.',
      'L’organisation peut notamment communiquer sur :'
    ],
    bullets: [
      'les candidats ;',
      'les finalistes ;',
      'les lauréats ;',
      'les résultats ;',
      'les activités liées aux HAG ;',
      'les images de la cérémonie.'
    ],
    closing: ['Toute utilisation contraire aux droits légalement protégés demeure exclue.']
  },
  {
    id: 'exclusion',
    title: 'Exclusion',
    paragraphs: ['L’organisation peut exclure un candidat notamment en cas :'],
    bullets: [
      'de fausse déclaration ;',
      'de fraude ;',
      'de tentative de manipulation des votes ;',
      'de fourniture de documents falsifiés ;',
      'de comportement portant gravement atteinte à l’intégrité des HAG ;',
      'de non-respect du présent règlement.'
    ],
    closing: [
      'L’exclusion peut intervenir avant ou après la désignation d’un lauréat lorsqu’une irrégularité grave est découverte.'
    ]
  },
  {
    id: 'modification',
    title: 'Modification du règlement',
    paragraphs: [
      'L’organisation peut apporter des modifications au présent règlement lorsque cela est nécessaire au bon déroulement de l’événement.',
      'Toute modification substantielle sera communiquée officiellement aux parties concernées.',
      'Les modifications ne doivent pas avoir pour objectif de favoriser arbitrairement un candidat.'
    ]
  },
  {
    id: 'acceptation',
    title: 'Acceptation du règlement',
    paragraphs: [
      'Toute participation aux Hospitality Awards Guinée implique l’acceptation sans réserve du présent règlement.',
      'Le candidat reconnaît avoir pris connaissance des conditions de participation, des critères d’évaluation et des règles applicables au processus de sélection et de vote.'
    ]
  },
  {
    id: 'entree-en-vigueur',
    title: 'Entrée en vigueur',
    paragraphs: [
      'Le présent règlement entre en vigueur à compter de sa date de publication officielle.',
      'Il s’applique à l’ensemble des candidatures, évaluations, votes et opérations relatives à l’édition 2026 des Hospitality Awards Guinée.'
    ]
  }
];
