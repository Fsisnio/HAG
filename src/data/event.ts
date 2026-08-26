export const EVENT_YEAR = 2026;
export const EVENT_NAME = 'Hospitality Awards Guinée';
export const EVENT_EDITION = `HAG ${EVENT_YEAR}`;
export const SLOGAN =
  "Célébrer l'excellence • Valoriser les talents • Promouvoir l'hospitalité guinéenne";

export const APPLICATION_START = '2026-08-25';
export const APPLICATION_END = '2026-09-20';
export const APPLICATION_PERIOD_LABEL = 'Inscriptions du 25 août au 20 septembre 2026';
export const VOTES_START = '2026-09-25';
export const VOTES_END = '2026-12-04';
export const CARNAVAL_DATE = '2026-12-09';
export const PANELS_DATE = '2026-12-10';
export const GALA_DATE = '2026-12-11';
export const GALA_TIME = '17:00';
export const GALA_VENUE = 'Hôtel Kaloum, Conakry – Guinée';
export const GALA_ISO = '2026-12-11T17:00:00+00:00';

export const VOTE_AMOUNT_GNF = 5000;
export const FEDAPAY_PAYMENT_URL = 'https://me.fedapay.com/HAG-Award';
export const FEDAPAY_RETURN_PATH = '/voter';

export const CONTACT = {
  email: 'groupelmcontact@gmail.com',
  phones: [
    { display: '+224 626 93 04 83', tel: '+224626930483', label: 'Téléphone' },
    { display: '+224 666 63 76 62', tel: '+224666637662', label: 'Contact' },
    { display: '+224 622 58 62 53', tel: '+224622586253', label: 'Contact' }
  ]
};

export const TICKETS = [
  { name: 'Standard', price: 500000, description: 'Accès à la cérémonie' },
  { name: 'VIP', price: 1000000, description: 'Meilleure visibilité + espace VIP' },
  { name: 'VVIP', price: 2000000, description: 'Espace premium + traitement privilégié' },
  { name: 'Table entreprise', price: 10000000, description: 'Table de 10 personnes' },
  { name: 'Table Prestige', price: 20000000, description: 'Table premium de 10 personnes' }
];

export const CALENDAR = [
  { label: 'Ouverture des inscriptions', date: '25 août 2026' },
  { label: 'Clôture des inscriptions', date: '20 septembre 2026' },
  { label: 'Ouverture des votes', date: '25 septembre 2026' },
  { label: 'Clôture des votes', date: '4 décembre 2026' },
  { label: 'Carnaval', date: '9 décembre 2026' },
  { label: 'Panels', date: '10 décembre 2026' },
  { label: 'Remise des prix & dîner gala', date: '11 décembre 2026 • 17h00' }
];

export const formatGnf = (amount: number): string =>
  `${amount.toLocaleString('fr-FR')} GNF`;

export const buildFedaPayCheckoutUrl = (voter: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  callbackUrl?: string;
}): string => {
  const url = new URL(FEDAPAY_PAYMENT_URL);
  url.searchParams.set('firstname', voter.firstName);
  url.searchParams.set('lastname', voter.lastName);
  url.searchParams.set('email', voter.email);
  url.searchParams.set('phone', voter.phone);
  url.searchParams.set('amount', String(VOTE_AMOUNT_GNF));
  if (voter.callbackUrl) {
    url.searchParams.set('callback_url', voter.callbackUrl);
    url.searchParams.set('return_url', voter.callbackUrl);
  }
  return url.toString();
};

const startOfDay = (isoDate: string) => new Date(`${isoDate}T00:00:00+00:00`);
const endOfDay = (isoDate: string) => new Date(`${isoDate}T23:59:59+00:00`);

export const isApplicationOpen = (now: Date = new Date()): boolean =>
  now >= startOfDay(APPLICATION_START) && now <= endOfDay(APPLICATION_END);

export const isVotingOpen = (now: Date = new Date()): boolean =>
  now >= startOfDay(VOTES_START) && now <= endOfDay(VOTES_END);
