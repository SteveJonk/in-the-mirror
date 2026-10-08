/**
 * The site's content, as it goes into Sanity — the copy from the approved
 * designs. Pure data: no client, no network, so `npm run check:form` can read
 * the forms from here too.
 *
 * A few markers stand in for things the seed resolves when it writes:
 *   asset('x.svg')        a file in scripts/seed/assets, uploaded as an image
 *   remote(url, name)     a photo downloaded and uploaded as an image
 *   audioFile('x.m4a')    a file in scripts/seed/assets, uploaded as a file
 *   page('slug')          an internal link to that page
 * Every array item gets a stable `_key` on the way in.
 */

export const asset = (file: string, alt = '') => ({ __asset: file, alt });
export const remote = (url: string, filename: string, alt = '') => ({ __remote: url, filename, alt });
export const audioFile = (file: string) => ({ __file: file });
export const page = (slug: string) => ({ __page: slug });

type Target = string | ReturnType<typeof page>;

export const pageId = (slug: string) => `page-${slug}`;
const ref = (_ref: string) => ({ _type: 'reference' as const, _ref });

function link(target: Target) {
  return typeof target === 'string'
    ? { linkType: 'external' as const, href: target }
    : { linkType: 'internal' as const, internalLink: ref(pageId(target.__page)) };
}

const cta = (label: string, target: Target) => ({ _type: 'cta' as const, label, ...link(target) });

// --- Portable text -------------------------------------------------------

type Span = string | { bold: string };
const b = (bold: string) => ({ bold });

function block(style: string, content: Span[], listItem?: 'bullet') {
  return {
    _type: 'block' as const,
    style,
    markDefs: [],
    children: content.map((span) =>
      typeof span === 'string'
        ? { _type: 'span' as const, text: span, marks: [] }
        : { _type: 'span' as const, text: span.bold, marks: ['strong'] },
    ),
    ...(listItem ? { listItem, level: 1 } : {}),
  };
}

const p = (...content: Span[]) => block('normal', content);
const intro = (...content: Span[]) => block('intro', content);
const signature = (...content: Span[]) => block('signature', content);
const h3 = (...content: Span[]) => block('h3', content);
const h4 = (...content: Span[]) => block('h4', content);
const bullet = (...content: Span[]) => block('normal', content, 'bullet');

// --- Shared media --------------------------------------------------------

const UNSPLASH = (id: string, size: string) =>
  `https://images.unsplash.com/photo-${id}?fm=jpg&fit=crop&q=80&${size}`;

const artwork = asset(
  'artwork.webp',
  'Mixed-media kunstwerk: een vrouw met krullend haar in een bloemenjurk voor een roze achtergrond, omlijst door een sierlijke blauwgroene rand.',
);
const portrait = asset(
  'andere-manier-van-kijken.jpg',
  'Close-up van het gezicht van een vrouw in warm zonlicht, die je aankijkt. In beeld staat de tekst: Er is een andere manier van kijken.',
);
const moon = remote(
  UNSPLASH('1634286415662-cdba58523598', 'w=1200'),
  'maansikkel.jpg',
  'Een smalle maansikkel in een nachtelijke hemel boven donkere boomtoppen',
);
const rumi = asset(
  'rumi-quote.jpg',
  'Een geel, hartvormig blad tussen donkere boomstammen. In beeld staat de tekst: Er is een plek, voorbij goed en kwaad, daar wil ik je ontmoeten. Rumi.',
);

// --- Documents -----------------------------------------------------------

export const CONTACT_FORM_ID = 'form-contact';
export const WORKSHOP_FORM_ID = 'form-workshop';
export const EPISODE_ID = 'episode-eerste-audiofragment';

/** A hidden field that records which page the form was sent from. */
const pageField = { label: 'Pagina', name: 'pagina', type: 'hidden', defaultValue: '{{path}}' };

export const CONTACT_FORM_FIELDS = [
  { label: 'Naam', name: 'naam', type: 'text', isRequired: true, errorMessage: 'Vul je naam in.' },
  {
    label: 'E-mailadres',
    name: 'email',
    type: 'email',
    isRequired: true,
    errorMessage: 'Vul je e-mailadres in.',
  },
  { label: 'Telefoonnummer (optioneel)', name: 'telefoon', type: 'tel' },
  { label: 'Bericht', name: 'bericht', type: 'textarea', isRequired: true, errorMessage: 'Schrijf een bericht.' },
  pageField,
] as const;

export const WORKSHOP_FORM_FIELDS = [
  { label: 'Voornaam', name: 'voornaam', type: 'text', isRequired: true, errorMessage: 'Vul je voornaam in.' },
  {
    label: 'E-mailadres',
    name: 'email',
    type: 'email',
    isRequired: true,
    errorMessage: 'Vul je e-mailadres in.',
  },
  {
    label: 'Ik meld mij aan voor',
    name: 'aanmelding',
    type: 'radio',
    isRequired: true,
    errorMessage: 'Kies waarvoor je je aanmeldt.',
    radioOptions: ['Alleen de dagworkshop — € 275', 'Het complete Combipakket — € 415'],
  },
  {
    label: 'Mijn voorkeursregio',
    name: 'regio',
    type: 'radio',
    isRequired: true,
    errorMessage: 'Kies je voorkeursregio.',
    radioOptions: ['Noord-Holland', 'Utrecht'],
  },
  {
    label: 'Geboortedatum',
    name: 'geboortedatum',
    type: 'date',
    width: 'half',
    isRequired: true,
    errorMessage: 'Vul je geboortedatum in.',
  },
  {
    label: 'Exacte geboortetijd',
    name: 'geboortetijd',
    type: 'time',
    width: 'half',
    isRequired: true,
    errorMessage: 'Vul je geboortetijd in, bijvoorbeeld 14:35.',
    helpText:
      'Bijvoorbeeld 14:35 uur. Weet je dit niet precies? Je kunt je geboortetijd ook opvragen bij het geboorteregister van de gemeente waar je geboren bent.',
  },
  {
    label: 'Geboorteplaats',
    name: 'geboorteplaats',
    type: 'text',
    isRequired: true,
    errorMessage: 'Vul je geboorteplaats in.',
  },
  { label: 'Wat hoop je te ervaren of te ontdekken?', name: 'hoop', type: 'textarea' },
  {
    label: 'Akkoord',
    name: 'akkoord',
    type: 'checkbox',
    isRequired: true,
    errorMessage: 'Vink aan dat je dit begrijpt om je aan te melden.',
    checkboxOptions: [
      'Ik begrijp dat deze workshop voor persoonlijke ontwikkeling is en geen vervanging is voor therapeutische zorg.',
    ],
  },
  pageField,
] as const;

const field = (definition: Record<string, unknown>) => ({
  _type: 'formField',
  width: 'full',
  isRequired: false,
  ...definition,
});

export const FORMS = [
  {
    _id: CONTACT_FORM_ID,
    _type: 'form',
    title: 'Contact',
    showTitle: false,
    mode: 'simple',
    fields: CONTACT_FORM_FIELDS.map(field),
    submitButtonText: 'Verstuur bericht',
    successTitle: 'Bedankt voor je bericht.',
    successBody: 'Ik neem contact met je op.',
    redirectAfterSubmit: false,
    mailSubject: 'Nieuw bericht via de website',
    sendCopyToSubmitter: false,
  },
  {
    _id: WORKSHOP_FORM_ID,
    _type: 'form',
    title: 'Workshop: interesse',
    showTitle: false,
    mode: 'simple',
    fields: WORKSHOP_FORM_FIELDS.map(field),
    submitButtonText: 'Verstuur mijn interesse',
    successTitle: 'Bedankt voor je interesse.',
    successBody: 'Ik neem contact met je op.',
    redirectAfterSubmit: false,
    mailSubject: 'Nieuwe interesse voor de workshop In the Mirror',
    sendCopyToSubmitter: false,
  },
];

export const FORM_SETTINGS = {
  _id: 'formGeneralSettings',
  _type: 'formGeneralSettings',
  // The recipient comes from the environment when it is set; otherwise it is
  // left for the editor to fill in (the studio flags it as required).
  ...(process.env.CONTACT_ADMIN_EMAIL ? { adminEmail: process.env.CONTACT_ADMIN_EMAIL } : {}),
  fromName: 'In the Mirror',
  confirmationSubject: 'Nieuw bericht via de website',
  confirmationMessage: 'Er is een nieuw bericht binnengekomen via de website.',
  primaryColor: '#1F3A42',
  textColor: '#1F3A42',
  recaptchaEnabled: false,
};

export const EPISODES = [
  {
    _id: EPISODE_ID,
    _type: 'episode',
    title: 'Eerste audiofragment',
    description: 'Korte beschrijving volgt.',
    audio: audioFile('podcast-fragment.m4a'),
  },
];

export const SITE_INFORMATION = {
  _id: 'siteInformation',
  _type: 'siteInformation',
  name: 'In the Mirror',
  owner: 'Camilla Amba',
  description:
    'Open, menselijke gesprekken en workshops vanuit psychologische astrologie (Jungiaanse basis). Zonder oordeel, met alle ruimte voor jouw verhaal.',
  logo: asset('logo.svg', 'In the Mirror'),
  language: 'nl',
  addressCountry: 'NL',
  interfaceTexts: {
    skipToContent: 'Ga naar de inhoud',
    mainMenu: 'Hoofdmenu',
    footerMenu: 'Voetmenu',
    menu: 'Menu',
    openMenu: 'Menu openen',
    closeMenu: 'Menu sluiten',
    audioPlayer: 'Audiospeler',
    play: 'Afspelen',
    pause: 'Pauzeren',
    duration: 'Duur',
    progress: 'Voortgang van het fragment',
    of: 'van',
    back: '15 seconden terug',
    forward: '15 seconden vooruit',
    required: 'Vul dit veld in.',
    invalidEmail: 'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.',
    checkFields: 'Controleer de gemarkeerde velden.',
    sending: 'Versturen…',
    sendFailed: 'Het versturen is niet gelukt. Probeer het later nog eens.',
    recaptcha: 'Bevestig dat je geen robot bent.',
    stepCounter: 'Stap {current} van {total}',
    notFoundTitle: 'Deze pagina bestaat niet',
    notFoundText:
      'De link is verlopen, verplaatst of heeft nooit bestaan. Ga terug naar de homepage, of neem contact op als je iets specifieks zocht.',
    notFoundButton: 'Terug naar de homepage',
  },
};

export const NAVIGATION = {
  _id: 'navigation',
  _type: 'navigation',
  links: [
    { _type: 'navLink', label: 'Over mij', ...link(page('over-mij')) },
    { _type: 'navLink', label: 'Workshop', ...link(page('workshop')) },
    { _type: 'navLink', label: 'Podcast', ...link(page('podcast')) },
    { _type: 'navLink', label: 'Persoonlijk gesprek', ...link(page('persoonlijk-gesprek')) },
    { _type: 'navLink', label: 'Contact', ...link(page('contact')) },
  ],
};

export const FOOTER = {
  _id: 'footer',
  _type: 'footer',
  text: 'Aangesloten bij de AVN (Astrologische Vakvereniging Nederland).',
  smallPrint: 'Mijn aanbod is geen therapie of crisisopvang en geen vervanging voor reguliere zorg.',
  copyright: '© 2026 Camilla Amba.',
};

// --- Pages ---------------------------------------------------------------

type PageInput = {
  slug: string;
  title: string;
  seo: { title?: string; description: string };
  photoCredit?: string;
  content: Array<Record<string, unknown>>;
};

const HOME: PageInput = {
  slug: 'home',
  title: 'Home',
  seo: {
    description:
      'Open, menselijke gesprekken en workshops vanuit psychologische astrologie (Jungiaanse basis). Zonder oordeel, met alle ruimte voor jouw verhaal.',
  },
  photoCredit: 'Foto van Alirad Zare via Unsplash.',
  content: [
    {
      _type: 'homeHero',
      title: 'Soms heb je gewoon een goed gesprek nodig. Over jóú.',
      lead: 'Loop je vast in vaste patronen? Twijfel je over de koers van je leven, heb je het gevoel dat je jezelf een beetje bent kwijtgeraakt, of ben je gewoon nieuwsgierig en vind je het tijd om ook eens aandacht aan jezelf te geven? Schuif dan aan voor een open, menselijk gesprek waarin jij centraal staat. Zonder oordeel, met alle ruimte voor jouw verhaal. Wat je reden ook is, je bent welkom!',
      cta: cta('Lees hoe ik werk', page('over-mij')),
      image: artwork,
    },
    {
      _type: 'tiles',
      items: [
        {
          _type: 'tile',
          label: 'Over mij',
          ...link(page('over-mij')),
          illustration: asset('trap.svg', 'Illustratie: iemand loopt een trap op naar een deur, een beeld van persoonlijke groei'),
        },
        {
          _type: 'tile',
          label: 'Workshop',
          ...link(page('workshop')),
          illustration: asset('groep.svg', 'Illustratie: een kleine groep mensen die samen staat'),
        },
        {
          _type: 'tile',
          label: 'Podcast',
          ...link(page('podcast')),
          illustration: asset('podcast.svg', 'Illustratie: iemand neemt een podcast op achter een microfoon'),
        },
        {
          _type: 'tile',
          label: 'Persoonlijk gesprek',
          ...link(page('persoonlijk-gesprek')),
          illustration: asset('gesprek.svg', 'Illustratie: twee mensen zitten tegenover elkaar in een rustig gesprek'),
        },
        {
          _type: 'tile',
          label: 'Contact',
          ...link(page('contact')),
          illustration: asset('contact.svg', 'Illustratie: een locatiepin, envelop en telefoon als contactmogelijkheden'),
        },
      ],
    },
    {
      _type: 'mediaText',
      anchor: 'over-mij',
      spacing: 'large',
      title: 'Geen vastgelopen protocollen, maar wat jij nú nodig hebt',
      body: [
        p('Ieder mens is anders, en elk levensvraagstuk vraagt om een eigen benadering. Daarom geloof ik niet in praten volgens een vast stappenplan.'),
        p('In mijn rugzak zit een brede mix van scholing en ervaring: onderwijs en groepsdynamica (Attitudinal Healing), energetische coaching en astrologie vanuit een psychologisch perspectief, gebaseerd op het werk van Carl Jung. En mijn eigen levenservaring, want ik praat niet alleen vanuit theorie, maar ook vanuit het geleefde leven.'),
      ],
      textLink: cta('Lees meer over mijn werkwijze', page('over-mij')),
      media: 'image',
      image: portrait,
      mediaLeft: true,
    },
    {
      _type: 'mediaText',
      anchor: 'workshop',
      background: 'stone',
      spacing: 'large',
      title: 'In the Mirror: ruimte voor je ongetemde zelf',
      body: [
        p('In de psychologische astrologie staat Lilith, de Zwarte Maan, symbool voor dat deel van ons dat zich niet laat aanpassen. Onze diepste oerkracht en autonomie, maar vaak ook de plek waar we afwijzing en overgedragen familiepatronen met ons meedragen.'),
        p('In een kleine, besloten groep gebruiken we dit eeuwenoude instrument niet om de toekomst te voorspellen, maar als psychologische spiegel. De workshop is open voor vrouwen én mannen.'),
      ],
      facts: [
        { _type: 'fact', label: 'Programma', value: 'Eén dag, 09:30 tot 16:30' },
        { _type: 'fact', label: 'Investering', value: '€ 275, of € 415 met een persoonlijk gesprek' },
        { _type: 'fact', label: 'Regio', value: 'Noord-Holland en Utrecht' },
      ],
      cta: cta('Bekijk de workshop', page('workshop')),
      ctaStyle: 'outline',
      media: 'mirror',
      image: moon,
    },
    {
      _type: 'mediaText',
      anchor: 'podcast',
      spacing: 'large',
      title: 'Een gesprek om naar te luisteren',
      body: [p('Op je eigen moment, in je eigen tempo. Zet het fragment aan en neem er de tijd voor.')],
      episode: ref(EPISODE_ID),
      textLink: cta('Naar de podcastpagina', page('podcast')),
      media: 'illustration',
      image: asset('luisteren.svg', 'Illustratie: iemand luistert met een koptelefoon naar een gesprek'),
      mediaLeft: true,
    },
    {
      _type: 'mediaText',
      anchor: 'gesprek',
      background: 'stone',
      spacing: 'large',
      title: 'Liever een persoonlijk gesprek?',
      body: [
        p('Een gesprek van één op één, online of op een rustige locatie. Je kunt me vooraf je vragen voorleggen en aangeven waar je het specifiek over wilt hebben.'),
        p('Je hoeft niets van astrologie te weten en er niet eens in te geloven. Zie het als een nuchtere, inzichtelijke spiegel op basis van het werk van Carl Jung, zodat jij het overzicht terugkrijgt en met een frisse blik verder kunt.'),
      ],
      facts: [
        { _type: 'fact', label: 'Eerste gesprek, 1,5 uur', value: '€ 240' },
        { _type: 'fact', label: 'Vervolggesprek, 1 uur', value: '€ 115' },
      ],
      factsNote: 'Vrijgesteld van btw via de KOR. Online via Zoom of op een rustige fysieke locatie.',
      cta: cta('Plan een gesprek', page('persoonlijk-gesprek')),
      media: 'illustrationCard',
      image: asset('samen-in-gesprek.svg', 'Illustratie: twee mensen zitten ontspannen met elkaar in gesprek'),
    },
    { _type: 'featureImage', image: rumi },
    {
      _type: 'contactForm',
      anchor: 'contact',
      illustration: asset('bericht-verstuurd.svg', 'Illustratie: een envelop met een vinkje, een bericht is verstuurd'),
      title: 'Neem contact op',
      lead: 'Een vraag, of eerst even kennismaken? Laat een bericht achter en ik neem contact met je op.',
      form: ref(CONTACT_FORM_ID),
      showRequiredMarks: false,
    },
  ],
};

const ABOUT: PageInput = {
  slug: 'over-mij',
  title: 'Over mij',
  seo: {
    title: 'Over mij en mijn werkwijze',
    description:
      'Geen vastgelopen protocollen, maar wat jij nú nodig hebt: gesprekken vanuit onderwijs, groepsdynamica, energetische coaching en psychologische astrologie.',
  },
  photoCredit: 'Foto van Franziska via Unsplash.',
  content: [
    {
      _type: 'pageHero',
      title: 'Geen vastgelopen protocollen, maar wat jij nú nodig hebt',
      intro: 'Ieder mens is anders, en elk levensvraagstuk vraagt om een eigen benadering. Daarom geloof ik niet in praten volgens een vast stappenplan.',
      media: 'image',
      image: portrait,
      alignBottom: true,
    },
    {
      _type: 'mediaText',
      body: [
        p('In onze snelle, prestatiegerichte wereld leren we al vroeg om ons aan te passen. We stoppen bepaalde kanten van onszelf die we als ‘te veel’, ‘te intens’ of ‘onhandig’ ervaren weg in een niet-geleefd deel van onze psyche. Maar die onderdrukte delen verdwijnen niet. Ze uiten zich vaak in frustratie, twijfel en het knagende gevoel dat je niet jouw volledige leven leidt.'),
        p('Waar ik nu sta, is het resultaat van een intensief innerlijk proces. Ik heb zelf diep in de spiegel gekeken door middel van therapie, schaduwwerk en familieopstellingen.'),
      ],
      media: 'image',
      image: remote(
        UNSPLASH('1759511027330-3ba37a231934', 'w=1200&h=1600'),
        'bos-zonlicht.jpg',
        'Zonlicht valt door het bladerdak van een bos',
      ),
      mediaSmall: true,
      indent: true,
      alignTop: true,
    },
    { _type: 'quote', text: 'Ik praat dus niet alleen vanuit theorie, maar ook vanuit het geleefde leven.' },
    {
      _type: 'mediaText',
      body: [
        p('Vanuit die doorleefde basis werk ik met verschillende instrumenten en invalshoeken. Mijn ervaring als bevoegd vrijeschoolleerkracht en vakdocent HVO (Humanistisch Vormingsonderwijs) heeft mij een scherp oog gegeven voor menselijke dynamieken. Daarnaast ben ik geschoold als Energetisch coach en opgeleid om attitudinele-groepen te leiden. Ook mijn 5-jarige opleiding astrologie vanuit een psychologisch perspectief, gebaseerd op het werk van Carl Jung, heeft mij diepe inzichten gegeven die ik tot op de dag van vandaag met me meedraag.'),
        p('Al deze methodieken vormen nu de brede basis van waaruit ik werk. In mijn gesprekken stem ik volledig af op jou en combineer ik deze verschillende invalshoeken – waaronder astrologie – om jou te begeleiden op een manier die écht bij jou past. Omdat ik het pad zelf heb bewandeld én de juiste tools in handen heb, loop ik nu met alle liefde en zonder oordeel een stukje met jou mee.'),
      ],
      media: 'illustration',
      image: asset('mediteren.svg', 'Illustratie: een vrouw mediteert in kleermakerszit, een beeld van innerlijke rust en zelfreflectie'),
      mediaLeft: true,
    },
    {
      _type: 'mediaText',
      media: 'none',
      body: [
        h3('Geloof je niet in astrologie? Wacht nog even voor je de pagina sluit!'),
        p('Ik snap heel goed dat niet iedereen gelooft in astrologie als een krachtig, inzichtgevend instrument dat werkt als een spiegel voor zelfreflectie en het verkennen van de eigen identiteit. Toch kun je de horoscoop zien als een symbolische kaart die ons helpt om patronen in ons leven bespreekbaar en inzichtelijk te maken. Een creatieve lens waarmee we met een frisse blik naar onze persoonlijke ontwikkeling kunnen kijken.'),
        p('Ook functioneert de horoscoop als een laagdrempelige ijsbreker om betekenisvolle gesprekken over onze binnenwereld te voeren. De rijke symboliek helpt om complexe menselijke emoties en gedragingen woorden te geven. Ik krijg in mijn praktijk vrijwel altijd terug dat het gesprek, mede door gebruik van de horoscoop, mijn gesprekspartner een narratief kader heeft geboden. Dat werkt helend, want als we vastlopen, zijn we vaak de draad van ons eigen leven kwijt.'),
        p('Wat ik eigenlijk wil zeggen, is dat het voor de psychologische waarde helemaal niet uitmaakt of de planeten daadwerkelijk invloed op ons hebben. Waar het om gaat, is dat astrologie ons een kant-en-klaar palet aan archetypen en verhaallijnen biedt. Het feit dat wij door deze symbolen kunnen reflecteren op ons leven, zorgt voor betekenisgeving. Het helpt ons om met afstand naar onze eigen uitdagingen te kijken, en transformeert een reeks willekeurige gebeurtenissen in een waardevol en betekenisvol levensverhaal.'),
        h3('Doel'),
        p('Of je nu wel of niet in astrologie gelooft, mijn doel is voor iedereen gelijk: volledig oordeelloos naar jezelf leren kijken. Ontdekken dat er nooit iets mis met je was, maar dat jouw grootste innerlijke worstelingen juist de toegangspoort zijn naar jouw diepste, authentieke kracht.'),
        p('Ik begeleid dit proces op twee manieren: in persoonlijke, 1-op-1 gesprekken, of in de workshop ‘In the Mirror – een nieuwe kijk op jezelf!’, die ik hiervoor heb ontwikkeld – samen met andere deelnemers die precies hetzelfde bij zichzelf herkennen.'),
      ],
    },
    {
      _type: 'mediaText',
      body: [
        intro('Ben je klaar voor een nieuwe kijk op jezelf? Plan dan een gesprek, dan zien we samen hoe ver we komen. Voel je vrij!'),
        signature('Camilla Amba'),
      ],
      cta: cta('Plan een gesprek', page('persoonlijk-gesprek')),
      textLink: cta('Bekijk de workshop', page('workshop')),
      media: 'image',
      image: artwork,
      indent: true,
    },
    {
      _type: 'columns',
      background: 'stone',
      title: 'Mijn achtergrond & Kwaliteitsgarantie',
      intro: 'Om jou de beste begeleiding te bieden, combineer ik mijn levenservaring met een stevige basis aan erkende opleidingen en registraties:',
      items: [
        {
          _type: 'column',
          icon: asset('icoon-onderwijs.svg'),
          title: 'Onderwijs',
          body: 'Afgeronde HBO-opleiding Vrijeschool Pabo (ervaring met holistisch onderwijs, mensontwikkeling en groepsdynamica).',
        },
        {
          _type: 'column',
          icon: asset('icoon-groep.svg'),
          title: 'Groepsbegeleiding',
          body: 'Gecertificeerd facilitator in Attitudinal Healing.',
        },
        { _type: 'column', icon: asset('icoon-coaching.svg'), title: 'Coaching', body: 'Gediplomeerd Energetisch Coach.' },
        {
          _type: 'column',
          icon: asset('icoon-astrologie.svg'),
          title: 'Psychologische Astrologie',
          body: 'Op hbo-niveau erkend diploma consultent astroloog (Jungiaanse basis).',
        },
      ],
      footnote:
        'Aangesloten bij de AVN (Astrologische Vakvereniging Nederland), wat staat voor getoetste kwaliteit en professionele ethiek.',
    },
  ],
};

const WORKSHOP: PageInput = {
  slug: 'workshop',
  title: 'Workshop',
  seo: {
    title: 'Workshop In the Mirror',
    description:
      'Workshop In the Mirror: een dag in een kleine, besloten groep met psychologische astrologie als spiegel. Laat je interesse achter.',
  },
  photoCredit: 'Foto van Alirad Zare via Unsplash.',
  content: [
    {
      _type: 'pageHero',
      title: 'In the Mirror',
      intro: '“There are two kinds of mirrors: One looks at the face, the other looks at the soul. The one who looks at the soul, sees their own true essence.”',
      italic: true,
      attribution: '— Rumi',
      facts: [
        { _type: 'fact', label: 'Programma', value: 'Eén dag, 09:30 tot 16:30' },
        { _type: 'fact', label: 'Investering', value: '€ 275' },
        { _type: 'fact', label: 'Regio', value: 'Noord-Holland en Utrecht' },
      ],
      primaryCta: cta('Meld je interesse aan', '#inschrijven'),
      secondaryLink: cta('Bekijk het dagprogramma', '#dagprogramma'),
      media: 'mirror',
      image: moon,
    },
    {
      _type: 'mediaText',
      background: 'stone',
      title: 'Workshop In the Mirror, voor een nieuwe kijk op jezelf!',
      body: [
        p('Voor Rumi is de spiegel een krachtig symbool voor het menselijk hart dat de ziel en de goddelijke werkelijkheid weerspiegelt.'),
        p('Loop je vast in patronen binnen relaties, merk je dat je het lastig vindt om écht je eigen ruimte in te nemen, of wil je simpelweg krachtiger en autonomer in het leven staan? In deze kleinschalige workshop kijken we samen in de spiegel — niet met oordeel, maar met een milde, open blik.'),
        p('We gebruiken hierin krachtige psychologische instrumenten en universele verhaallijnen. Een belangrijk onderdeel hiervan is het werken met het archetype Lilith.'),
        p('Iedereen heeft een ‘Lilith’ in zich; zij belichaamt de energie van autonomie, soevereiniteit en gezonde grenzen. Lilith herinnert ons eraan wie we zijn als we alle maskers en verwachtingen van anderen afwerpen. Zij helpt je helder te krijgen waar jij jezelf onbewust nog inhoudt, hoe je de regie over je eigen leven terugneemt, en hoe je jouw meest authentieke, pure kracht weer de ruimte geeft.'),
        h3('Wat kun je verwachten?'),
        bullet(b('Herkenning en bedding:'), ' je volgt dit proces samen met andere deelnemers die precies hetzelfde bij zichzelf herkennen. Je bent niet alleen.'),
        bullet(b('Inzicht in jouw maskers:'), ' we ontrafelen de verwachtingen van buitenaf waar jij je (onbewust) aan hebt aangepast.'),
        bullet(b('Concrete handvatten:'), ' je leert hoe je jouw grenzen bewaakt en dichter bij je eigen soevereiniteit blijft in het dagelijks leven.'),
        p('De workshop is uiteraard onvoorwaardelijk open voor iedereen, ongeacht gender of identiteit. Lilith kent geen genderverschillen; ze is een universele menselijke kracht. Juist de balans tussen de vrouwelijke, mannelijke en non-binaire dynamieken in de cirkel brengt een enorme rijkdom aan herkenning en nieuwe perspectieven.'),
      ],
      cta: cta('Meld je interesse aan', '#inschrijven'),
      media: 'illustration',
      image: asset('drie-silhouetten.svg', 'Illustratie: drie silhouetten naast elkaar, een beeld van een kleine, verbonden groep'),
    },
    {
      _type: 'textColumns',
      columns: [
        {
          _type: 'textColumn',
          title: 'Voor wie is deze workshop?',
          body: [
            p('Voor jou als je:'),
            bullet('steeds vastloopt in dezelfde dynamiek binnen relaties of verbindingen.'),
            bullet('voelt dat je pijn of overlevingsmechanismen meedraagt die eigenlijk niet van jou zijn, maar van generaties voor jou.'),
            bullet('moeite hebt met het stellen van gezonde grenzen en de neiging hebt jezelf aan te passen om erbij te horen.'),
            bullet('ruimte zoekt voor je schaduwkanten: die delen van jezelf die je lang hebt weggestopt, maar die eigenlijk gehoord willen worden.'),
          ],
        },
        {
          _type: 'textColumn',
          title: 'Wat kun je verwachten?',
          body: [
            h4('Kleinschalig en veilig'),
            p('We werken in een besloten, intieme groep onder deskundige, holistische begeleiding.'),
            h4('Inzicht in jouw blauwdruk'),
            p('We kijken heel gericht naar jouw persoonlijke spiegel om blinde vlekken helder te krijgen.'),
            h4('Ervaringsgericht en helend'),
            p('Geen droge theorie, maar een organisch samenspel van gesprek, energetische reflectie (met unieke reflectiekaarten) en innerlijke rust.'),
          ],
          illustration: asset('keuze.svg', 'Illustratie: een figuur dat een keuze overweegt tussen twee opties'),
        },
      ],
      cta: cta('Meld je interesse aan', '#inschrijven'),
    },
    {
      _type: 'schedule',
      anchor: 'dagprogramma',
      background: 'stone',
      title: 'Dagprogramma',
      lead: 'Een dag in vaste stappen, inclusief lunch en twee korte pauzes.',
      cta: cta('Meld je interesse aan', '#inschrijven'),
      slots: [
        { _type: 'slot', time: '09:30 – 10:00', title: 'Welkom & Landen', description: 'Koffie, thee, rustig je plek vinden' },
        { _type: 'slot', time: '10:00 – 11:15', title: 'De spiegel van Lilith', description: 'Kennismaking en introductie van het archetype' },
        { _type: 'slot', time: '11:15 – 11:30', title: 'Korte pauze' },
        {
          _type: 'slot',
          time: '11:30 – 12:45',
          title: 'Kijken in jouw eigen spiegel',
          description: 'Praktische en diepgaande 1-op-1 uitwisseling op basis van jouw unieke blauwdruk',
        },
        { _type: 'slot', time: '12:45 – 14:00', title: 'Warme, verzorgde lunch' },
        {
          _type: 'slot',
          time: '14:00 – 15:15',
          title: 'Achter de spiegel',
          description: 'Energetische verdieping en werk met intuïtieve reflectiekaarten',
        },
        { _type: 'slot', time: '15:15 – 15:30', title: 'Korte pauze' },
        {
          _type: 'slot',
          time: '15:30 – 16:30',
          title: 'De nieuwe blik in de spiegel',
          description: 'Gezamenlijke integratie en afronding in de cirkel',
        },
      ],
    },
    {
      _type: 'columns',
      background: 'ink',
      title: 'Veiligheid en jouw privacy staan voorop',
      intro: 'Een workshop rondom je patronen kan spannend zijn, maar bij In the Mirror creëren we een nuchtere, respectvolle en vooral rustige omgeving. Je behoudt altijd zelf de regie over wat je wel of niet deelt in de groep.',
      items: [
        {
          _type: 'column',
          title: 'Wat het wel is',
          body: 'Een inzichtgevende, psychologische ontdekkingstocht. Een veilige plek om te reflecteren op de verborgen en verdrongen delen van je karakter en je patronen hierin te ontvouwen, zodat je met een nieuwe kijk op jezelf verder kunt.',
        },
        {
          _type: 'column',
          title: 'Wat het niet is',
          body: 'Dit is geen therapiesessie of crisisopvang. Mijn workshops en gesprekken zijn bedoeld voor mensen die stevig genoeg in hun schoenen staan om naar hun eigen patronen te kijken. Loop je op dit moment diepgaand psychisch vast of heb je behoefte aan therapeutische of psychiatrische behandeling? Dan verwijs ik je graag door naar de reguliere zorg; mijn aanbod is daar geen vervanging voor.',
        },
      ],
    },
    {
      _type: 'mediaText',
      title: 'De complete ervaring: het Combipakket',
      body: [
        p('Wil je na de intensieve workshop ‘In the Mirror’ in alle rust en privacy alsnog dieper op jouw ontwikkeling en levensvragen ingaan? Kies dan voor het complete Combipakket. Je combineert de rijke groepsbijeenkomst met een uitgebreid en persoonlijk inzichtgevend gesprek.'),
        p(b('Jouw flexibiliteit:'), ' jij bepaalt de volgorde. Je kunt het 1-op-1 gesprek naar wens voorafgaand aan de workshop plannen voor een stevige basis, óf juist na afloop om de inzichten uit de dag in alle rust verder uit te diepen.'),
        p(b('Hoe te boeken:'), ' geef simpelweg in het interesseformulier onderaan de pagina aan dat je gebruik wilt maken van het Combipakket.'),
      ],
      media: 'priceCard',
      priceCard: [
        {
          _type: 'priceRow',
          label: 'Inhoud',
          value: 'Deelname aan de volledige dagworkshop In the Mirror (t.w.v. € 275,-) en een persoonlijk inzichtgesprek van 1,5 uur (t.w.v. € 240,-).',
        },
        {
          _type: 'priceRow',
          label: 'Jouw investering',
          value: '€ 415',
          isPrice: true,
          note: 'Vrijgesteld van btw via de KOR. Je bespaart exact € 100,-.',
        },
      ],
      alignTop: true,
    },
    {
      _type: 'contactForm',
      anchor: 'inschrijven',
      background: 'stone',
      title: 'Interesseformulier',
      lead: 'Laat je interesse achter via dit formulier.',
      note: 'Velden met een * zijn verplicht.',
      form: ref(WORKSHOP_FORM_ID),
      wideForm: true,
    },
  ],
};

const CONVERSATION: PageInput = {
  slug: 'persoonlijk-gesprek',
  title: 'Persoonlijk gesprek',
  seo: {
    description:
      'Een persoonlijk gesprek van één op één, online of op een rustige locatie, met psychologische astrologie als nuchtere spiegel.',
  },
  photoCredit: 'Foto van fan yang via Unsplash.',
  content: [
    {
      _type: 'pageHero',
      title: 'Liever een persoonlijk gesprek?',
      intro: 'In plaats van deelname aan een workshop, kun je ook kiezen voor een een-op-een gesprek online of op een rustige locatie. Je kunt mij vooraf je vragen alvast voorleggen en aangeven waar je het specifiek over wilt hebben.',
      primaryCta: cta('Plan een gesprek', '#agenda'),
      secondaryLink: cta('Bekijk de tarieven', '#tarieven'),
      media: 'image',
      image: remote(
        UNSPLASH('1754379376065-0a8106dc60a1', 'w=1200&h=1500'),
        'twee-stoelen.jpg',
        'Twee stoelen bij een raam met uitzicht op groen',
      ),
    },
    {
      _type: 'mediaText',
      body: [
        p('Je hoeft vooraf niets te weten van astrologie en je hoeft er niet eens in te geloven; zie het simpelweg als een nuchtere, inzichtelijke spiegel op basis van het werk van Carl Jung.'),
        p('We gaan niet op zoek naar kant-en-klare antwoorden en ik breng geen magische oplossingen. We kijken samen naar jouw kwaliteiten en patronen en zien simpelweg hoe ver we komen. Zodat jij het overzicht terugkrijgt en met een frisse blik verder kunt.'),
      ],
      media: 'illustration',
      image: asset('meditatie-tablet.svg', 'Illustratie: een persoon in meditatiehouding naast een tablet met een glimlachend gezicht'),
      mediaLeft: true,
      mediaSmall: true,
      indent: true,
    },
    {
      _type: 'pricing',
      anchor: 'tarieven',
      background: 'stone',
      title: 'Een gesprek, in twee vormen',
      plans: [
        {
          _type: 'plan',
          title: 'Eerste gesprek',
          subtitle: 'Intake & diepte-inzicht',
          price: '€ 240',
          body: 'Duurt 1,5 uur. Vrijgesteld van btw via de KOR, inclusief de voorbereiding van jouw persoonlijke spiegel.',
        },
        {
          _type: 'plan',
          title: 'Vervolggesprekken',
          subtitle: 'Verder kijken, op jouw tempo',
          price: '€ 115',
          body: 'Duurt 1 uur. Vrijgesteld van btw via de KOR.',
        },
      ],
      optionsLabel: 'Veilig en anoniem, op twee manieren:',
      options: [
        { _type: 'option', icon: asset('icoon-online.svg'), label: 'Online via Zoom' },
        { _type: 'option', icon: asset('icoon-locatie.svg'), label: 'Of op een rustige fysieke locatie' },
      ],
    },
    {
      _type: 'calendar',
      anchor: 'agenda',
      title: 'Plan direct jouw gesprek',
      lead: 'Kies hieronder in de agenda een dag en tijdstip dat jou uitkomt voor ons eerste gesprek. Nadat je je gegevens hebt ingevuld en de betaling is afgerond, ontvang je direct een bevestiging in je mailbox.',
      placeholderTitle: 'Hier komt de agenda',
      placeholderText:
        'Voor nu een placeholder: hier komt straks de Cal.com-agenda, met de keuze tussen een eerste gesprek en een vervolggesprek.',
    },
    {
      _type: 'callout',
      background: 'stone',
      size: 'small',
      title: 'Goed om te weten',
      body: 'Dit is geen therapiesessie of crisisopvang. Mijn gesprekken zijn bedoeld voor mensen die stevig genoeg in hun schoenen staan om naar hun eigen patronen te kijken. Loop je op dit moment diepgaand psychisch vast of heb je behoefte aan therapeutische of psychiatrische behandeling? Dan verwijs ik je graag door naar de reguliere zorg; mijn aanbod is daar geen vervanging voor.',
    },
  ],
};

const PODCAST: PageInput = {
  slug: 'podcast',
  title: 'Podcast',
  seo: {
    description: 'Luister naar een nieuwe kijk: audiofragmenten om in je eigen tempo te beluisteren.',
  },
  content: [
    {
      _type: 'pageHero',
      title: 'Luister naar een nieuwe kijk',
      intro: 'Een plek om te luisteren. Zet je koptelefoon op, neem de tijd en laat een nieuwe kijk op jezelf in je eigen tempo binnenkomen.',
      media: 'wave',
    },
    {
      _type: 'episodes',
      background: 'stone',
      title: 'Audiofragmenten',
      episodes: [ref(EPISODE_ID)],
      footnote: 'Hier verschijnen straks meer fragmenten.',
    },
    {
      _type: 'callout',
      size: 'large',
      title: 'Liever met elkaar in gesprek?',
      body: 'Een persoonlijk gesprek van één op één, online of op een rustige locatie.',
      cta: cta('Plan een gesprek', page('persoonlijk-gesprek')),
    },
  ],
};

const CONTACT: PageInput = {
  slug: 'contact',
  title: 'Contact',
  seo: { description: 'Een vraag, of eerst even kennismaken? Laat een bericht achter.' },
  content: [
    {
      _type: 'contactForm',
      illustration: asset('contact.svg', 'Illustratie: een locatiepin, envelop en telefoon, symbolen om contact op te nemen'),
      title: 'Neem contact op',
      lead: 'Een vraag, of eerst even kennismaken? Laat een bericht achter en ik neem contact met je op.',
      links: [
        cta('Direct een gesprek plannen', page('persoonlijk-gesprek')),
        cta('Interesse in de workshop In the Mirror', '/workshop#inschrijven'),
      ],
      form: ref(CONTACT_FORM_ID),
    },
    { _type: 'featureImage', image: rumi },
  ],
};

export const PAGES = [HOME, ABOUT, WORKSHOP, CONVERSATION, PODCAST, CONTACT].map((input) => ({
  _id: pageId(input.slug),
  _type: 'page',
  title: input.title,
  slug: { _type: 'slug', current: input.slug },
  seo: { _type: 'seo', noIndex: false, ...input.seo },
  ...(input.photoCredit ? { photoCredit: input.photoCredit } : {}),
  content: input.content,
}));
