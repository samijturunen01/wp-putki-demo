import type { Person } from './company'

export type ServiceId = 'lampo' | 'vesi' | 'ilma' | 'asbesti'
export type Topic = ServiceId

export interface Faq {
  q: string
  a: string
}

export interface Service {
  id: ServiceId
  path: string
  code: string
  label: string
  /** Line colour on the drawings: heat = supply red, water/air = cyan, asbestos = warning yellow */
  tone: 'heat' | 'flow' | 'air' | 'signal'
  /** H1 on the service page */
  title: string
  /** One sentence on the homepage pipeline */
  short: string
  intro: string
  need: { title: string; text: string }
  /** Service items as listed on wp-putki.fi/palvelut, with neutral explanations. */
  items: { name: string; text: string }[]
  forWhom: { segment: string; text: string }[]
  photo: string
  photoAlt: string
  contactIds: Person['id'][]
  faq: Faq[]
  cta: string
  seo: { title: string; description: string }
}

export const services: Service[] = [
  {
    id: 'lampo',
    path: '/palvelut/lampo',
    code: '01',
    label: 'Lämpö',
    tone: 'heat',
    title: 'Lämmitys linjassa: lämmönjakokeskukset, lämpöjohdot ja lämpöpumput',
    short: 'Lämmönjakokeskusten, lämpöjohtojen ja kattiloiden uusinnat, lämpöpumput ja lämmityslaitteiden huollot.',
    intro:
      'Uusimme lämmönjakokeskukset, lämpöjohdot ja lämpökattilat, toteutamme maalämpö-, ilma- ja vesilämpöpumppujärjestelmiä ja huollamme lämmityslaitteita – kerrostaloissa, toimitiloissa ja omakotitaloissa.',
    need: {
      title: 'Kun lämpö ei enää pysy tasaisena',
      text: 'Kylmät patterit, vuotava venttiili tai käyttöikänsä päähän tullut lämmönjakokeskus näkyvät ensin asumismukavuudessa ja sitten energialaskussa. Suunnitelmallinen uusinta on yleensä helpompi toteuttaa kuin talvinen hätäkorjaus – siksi tarjous kannattaa pyytää ajoissa.',
    },
    items: [
      { name: 'Lämmönjakokeskusten uusinnat', text: 'Kaukolämpökohteen lämmönjakokeskus siirtää lämmön rakennuksen lämmitysverkostoon ja käyttöveteen. Uusinta on ajankohtainen, kun laitteisto on käyttöikänsä päässä tai sen säätö ei enää pysy kohdallaan.' },
      { name: 'Lämpöjohtojen uusinnat', text: 'Vanhojen lämpöjohtojen ja -putkistojen vaihto, kun vuodot, korroosio tai ikä alkavat näkyä.' },
      { name: 'Lämpökattiloiden uusinnat', text: 'Vanhan kattilan vaihto uuteen osaksi rakennuksen lämmitysjärjestelmää.' },
      { name: 'Maalämpöpumput', text: 'Maalämpö rakennuksen lämmitykseen – uutena järjestelmänä tai vanhan lämmitysmuodon tilalle.' },
      { name: 'Ilma- ja vesilämpöpumput', text: 'Ilmalämpöpumput sekä ilma-vesilämpöpumput vesikiertoiseen lämmitykseen.' },
      { name: 'Huoltopalvelut', text: 'Lämmönjakokeskusten ja lämmityslaitteiden huollot ja korjaukset.' },
    ],
    forWhom: [
      { segment: 'Taloyhtiöt', text: 'Lämmönjakokeskuksen ja lämpöjohtojen uusinnat suunnitelmallisena urakkana.' },
      { segment: 'Yritykset ja teollisuus', text: 'Kiinteistöjen lämmitysjärjestelmien uusinnat ja huollot.' },
      { segment: 'Omakotitalot', text: 'Kattilan vaihto ja lämpöpumppuratkaisut kotiin.' },
    ],
    photo: 'stock-lampo',
    photoAlt: 'Lämmitysjärjestelmän kiertovesipumppu, venttiilejä ja painemittari tekniikkatilassa (kuvituskuva)',
    contactIds: ['arto', 'tuomas'],
    faq: [
      {
        q: 'Milloin lämmönjakokeskus kannattaa uusia?',
        a: 'Lämmönjakokeskuksen käyttöikä on yleisen arvion mukaan noin 20–25 vuotta. Uusintaa kannattaa harkita viimeistään, kun laitteisto vuotaa, osia on vaikea saada tai lämpötilojen säätö ei enää pysy kohdallaan. Kerro tarjouspyynnössä laitteiston ikä ja havaitut oireet.',
      },
      {
        q: 'Teettekö lämpöpumppuasennuksia omakotitaloihin?',
        a: 'Kyllä. Maalämpöpumput sekä ilma- ja vesilämpöpumput kuuluvat lämpöpalveluihimme, ja palvelemme taloyhtiöiden ja yritysten lisäksi yksityisasiakkaita. Kerro tarjouspyynnössä talon koko ja nykyinen lämmitysmuoto.',
      },
      {
        q: 'Saako lämmitystyöstä kotitalousvähennystä?',
        a: 'Kotitalous voi saada kotitalousvähennystä kodin kunnossapito- ja perusparannustöiden työn osuudesta. Tarkista ajantasaiset ehdot ja enimmäismäärät Verohallinnon sivuilta (vero.fi).',
      },
    ],
    cta: 'Pyydä tarjous lämpötyöstä',
    seo: {
      title: 'Lämmönjakokeskukset, lämpöjohdot ja lämpöpumput Joensuu | WP-Putki',
      description:
        'Lämmönjakokeskusten, lämpöjohtojen ja lämpökattiloiden uusinnat, maalämpö-, ilma- ja vesilämpöpumput sekä lämmityslaitteiden huollot Joensuussa. Pyydä tarjous WP-Putkelta.',
    },
  },
  {
    id: 'vesi',
    path: '/palvelut/vesi',
    code: '02',
    label: 'Vesi',
    tone: 'flow',
    title: 'Linjasaneeraukset ja vesijohtotyöt ammattitaidolla',
    short: 'Linja- ja vesijohtosaneeraukset, putkistojen korjaus- ja huoltotyöt sekä WC-istuinten ja hanojen uusinnat.',
    intro:
      'Taloyhtiön linjasaneerauksesta yksittäiseen hanaan: teemme linja- ja vesijohtosaneeraukset, putkistojen korjaus- ja huoltotyöt sekä WC-istuinten ja hanojen uusinnat.',
    need: {
      title: 'Pieni vuoto tai koko talon putkiremontti',
      text: 'Tippuva hana on pieni työ, vanhan putkiston uusiminen taas taloyhtiön suurimpia remontteja. Molemmissa ratkaisee huolellinen työ – vesivahinko tulee aina kalliimmaksi kuin oikein tehty korjaus.',
    },
    items: [
      { name: 'Linjasaneeraukset', text: 'Linjasaneeraus eli putkiremontti tarkoittaa rakennuksen vesi- ja viemärilinjojen uusimista. Laskemme urakan tarjouksen ja toteutamme LVI-työt työnjohdon kanssa.' },
      { name: 'Vesijohtosaneeraukset', text: 'Käyttövesiputkistojen uusinnat, kun vanha putkisto vuotaa, ruostuu tai on tullut käyttöikänsä päähän.' },
      { name: 'Putkistojen korjaus- ja huoltotyöt', text: 'Vuotojen korjaukset sekä putkistojen ja venttiilien huolto- ja korjaustyöt.' },
      { name: 'WC-istuinten ja hanojen uusinnat', text: 'Vanhan WC-istuimen, keittiö- tai kylpyhuonehanan vaihto uuteen.' },
    ],
    forWhom: [
      { segment: 'Taloyhtiöt', text: 'Linjasaneeraukset ja käyttövesiputkistojen uusinnat urakkana.' },
      { segment: 'Yritykset ja teollisuus', text: 'Putkistojen korjaus- ja huoltotyöt toimitiloissa.' },
      { segment: 'Kotitaloudet', text: 'Hanat, WC-istuimet ja putkivuodot – soita työtilaus.' },
    ],
    photo: 'stock-vesi',
    photoAlt: 'Vesijohtojen venttiilejä ja vesimittareita putkistossa (kuvituskuva)',
    contactIds: ['tuomas', 'arto'],
    faq: [
      {
        q: 'Vesi vuotaa – mitä teen ensin?',
        a: 'Sulje vesi kalusteen omasta sulkuventtiilistä tai asunnon pääsulusta ja kuivaa vesi pois. Soita sitten työtilaus numeroon 040 034 1377 (arkisin 7.00–15.30). Taloyhtiössä ilmoita vuodosta myös huoltoyhtiölle tai isännöitsijälle.',
      },
      {
        q: 'Vaihdatteko yksittäisen hanan tai WC-istuimen?',
        a: 'Kyllä. WC-istuinten ja hanojen uusinnat kuuluvat vesipalveluihimme. Pienet työt tilataan helpoimmin puhelimella arkisin 7.00–15.30.',
      },
      {
        q: 'Tarvitaanko ennen linjasaneerausta asbestikartoitus?',
        a: 'Jos rakennuksen rakentaminen on aloitettu ennen vuotta 1994, asbestikartoitus on tehtävä ennen purku- ja korjaustöitä. WP-Putki tekee myös asbesti- ja haitta-ainekartoitukset sekä purkutyöt.',
      },
    ],
    cta: 'Pyydä tarjous vesityöstä',
    seo: {
      title: 'Linjasaneeraus ja vesijohtotyöt Joensuu | WP-Putki',
      description:
        'Linja- ja vesijohtosaneeraukset, putkistojen korjaus- ja huoltotyöt sekä WC-istuinten ja hanojen uusinnat Joensuussa ja lähialueilla. Työtilaukset arkisin 7.00–15.30.',
    },
  },
  {
    id: 'ilma',
    path: '/palvelut/ilma',
    code: '03',
    label: 'Ilma',
    tone: 'air',
    title: 'Ilmanvaihdon asennukset, huollot, mittaukset ja säädöt',
    short: 'IV-laitteiden ja -putkistojen asennukset, suodatinvaihdot, kanavanuohoukset, mittaukset ja säädöt.',
    intro:
      'Myymme, asennamme ja huollamme ilmanvaihtolaitteita ja IV-tarvikkeita. Meiltä löytyy laaja valikoima ilmanvaihtolaitteiden suodattimia ja muita tarvittavia varusteita.',
    need: {
      title: 'Tunkkainen ilma, vedon tunne tai kova ääni',
      text: 'Ilmanvaihto toimii huomaamatta – kunnes suodattimet tukkeutuvat, kanavat likaantuvat tai ilmamäärät eivät enää ole kohdallaan. Säännöllinen huolto pitää sisäilman raikkaana ja laitteen toiminnan tasaisena.',
    },
    items: [
      { name: 'Ilmanvaihtolaitteiden ja -putkistojen asennukset', text: 'IV-koneiden, kanavistojen ja päätelaitteiden asennukset uudis- ja korjauskohteisiin.' },
      { name: 'Suodattimien vaihdot', text: 'IV-koneiden suodatinvaihdot – laaja valikoima ilmanvaihtolaitteiden suodattimia.' },
      { name: 'Kanavanuohoukset', text: 'Ilmanvaihtokanavien puhdistus kertyneestä pölystä ja liasta.' },
      { name: 'Mittaukset ja säädöt', text: 'Ilmamäärien mittaus ja säätö, jotta ilmanvaihto toimii suunnitellusti.' },
      { name: 'IV-laitteiden huollot ja korjaukset', text: 'Ilmanvaihtokoneiden ja -laitteiden huolto- ja korjaustyöt.' },
      { name: 'IV-tarvikkeet', text: 'IV-tarvikkeiden myynti, asennus ja huolto.' },
    ],
    forWhom: [
      { segment: 'Taloyhtiöt', text: 'Kanavanuohoukset, ilmamäärien mittaukset ja säädöt koko talolle.' },
      { segment: 'Yritykset ja teollisuus', text: 'IV-asennukset, -huollot ja -korjaukset toimitiloihin.' },
      { segment: 'Omakotitalot', text: 'IV-koneen huolto ja suodatinvaihdot.' },
    ],
    photo: 'stock-ilma',
    photoAlt: 'Ilmanvaihdon kierresaumakanavia rakennuksen katon rajassa (kuvituskuva)',
    contactIds: ['arto'],
    faq: [
      {
        q: 'Kuinka usein IV-koneen suodattimet vaihdetaan?',
        a: 'Vaihtoväli riippuu laitteesta ja ympäristöstä, joten tarkista se laitteen valmistajan ohjeesta. Jos et ole varma, kysy meiltä – suodatinvaihdot kuuluvat IV-palveluihimme.',
      },
      {
        q: 'Mitä kanavanuohous tarkoittaa?',
        a: 'Kanavanuohouksessa ilmanvaihtokanavat puhdistetaan niihin kertyneestä pölystä ja liasta. Puhdistuksen jälkeen ilmamäärät kannattaa tarvittaessa mitata ja säätää, jotta ilmanvaihto toimii suunnitellusti.',
      },
      {
        q: 'Kenelle soitan IV-työstä?',
        a: 'IV-töistä ja niiden urakkalaskennasta vastaa Arto Korhonen, puh. 050 385 0540.',
      },
    ],
    cta: 'Pyydä tarjous IV-työstä',
    seo: {
      title: 'Ilmanvaihtotyöt, kanavanuohous ja IV-huolto Joensuu | WP-Putki',
      description:
        'Ilmanvaihtolaitteiden ja -putkistojen asennukset, suodatinvaihdot, kanavanuohoukset, mittaukset ja säädöt sekä IV-laitteiden huollot Joensuussa. Kysy WP-Putkelta.',
    },
  },
  {
    id: 'asbesti',
    path: '/palvelut/asbesti',
    code: '04',
    label: 'Asbesti',
    tone: 'signal',
    title: 'Asbesti- ja haitta-ainekartoitukset sekä purkutyöt',
    short: 'Asbesti- ja haitta-ainekartoitukset ennen remonttia sekä asbesti- ja haitta-aineiden purkutyöt.',
    intro:
      'Kartoitamme asbestin ja muut haitta-aineet ennen remonttia ja teemme niiden purkutyöt. Samalta yritykseltä saat myös remontin LVI-työt.',
    need: {
      title: 'Ennen kuin seinää avataan',
      text: 'Ennen vuotta 1994 rakennetuissa taloissa asbestia voi olla esimerkiksi putkieristeissä, laattojen saumoissa ja liimoissa, tasoitteissa ja maaleissa. Siksi rakennuksessa, jonka rakentaminen on aloitettu ennen vuotta 1994, on tehtävä asbestikartoitus ennen purku- ja korjaustöitä.',
    },
    items: [
      { name: 'Asbestikartoitukset', text: 'Selvitys siitä, onko korjattavissa rakenteissa asbestia ja missä – ennen kuin purkutyöt alkavat.' },
      { name: 'Haitta-ainekartoitukset', text: 'Rakennusmateriaalien muiden haitta-aineiden kartoitus korjaushankkeen suunnittelun pohjaksi.' },
      { name: 'Asbestin purkutyöt', text: 'Asbestia sisältävien materiaalien purku remontin tai saneerauksen yhteydessä.' },
      { name: 'Haitta-aineiden purkutyöt', text: 'Haitta-aineita sisältävien rakenteiden purku osana korjaushanketta.' },
    ],
    forWhom: [
      { segment: 'Taloyhtiöt', text: 'Kartoitukset ja purut linjasaneerausten ja muiden remonttien alle.' },
      { segment: 'Yritykset ja teollisuus', text: 'Haitta-ainekartoitukset ja purkutyöt korjaushankkeisiin.' },
      { segment: 'Omakotitalot', text: 'Asbestikartoitus ennen kylpyhuone- tai keittiöremonttia.' },
    ],
    photo: 'stock-asbesti',
    photoAlt: 'Purkutyömaa aidattuna, purkujätesäkkejä ja varoitusnauha (kuvituskuva)',
    contactIds: ['mika'],
    faq: [
      {
        q: 'Milloin asbestikartoitus tarvitaan?',
        a: 'Kun rakennuksen rakentaminen on aloitettu ennen vuotta 1994, asbestikartoitus on tehtävä ennen purku- ja korjaustöitä. Kartoitus tarvitaan myös pienemmissä remonteissa, kuten kylpyhuoneen tai keittiön uusimisessa.',
      },
      {
        q: 'Voiko kartoituksen, purun ja LVI-työt tilata samalta yritykseltä?',
        a: 'Kyllä. WP-Putki tekee asbesti- ja haitta-ainekartoitukset, purkutyöt sekä lämpö-, vesi- ja ilmanvaihtotyöt. Yhteyshenkilö asbestiasioissa on Mika Heinonen, puh. 040 727 7961.',
      },
      {
        q: 'Mitä tarjouspyyntöön kannattaa liittää?',
        a: 'Rakennusvuosi, remontin laajuus (esimerkiksi kylpyhuone tai linjasaneeraus), mahdolliset aiemmat kartoitusraportit ja toivottu aikataulu.',
      },
    ],
    cta: 'Pyydä tarjous kartoituksesta',
    seo: {
      title: 'Asbestikartoitus ja asbestipurku Joensuu | WP-Putki',
      description:
        'Asbesti- ja haitta-ainekartoitukset sekä purkutyöt Joensuussa – ja samalta yritykseltä remontin LVI-työt. Yhteyshenkilö Mika Heinonen, 040 727 7961.',
    },
  },
]

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!

export const toneColor: Record<Service['tone'], string> = {
  heat: 'var(--color-heat)',
  flow: 'var(--color-flow)',
  air: 'var(--color-flow-lite)',
  signal: 'var(--color-signal)',
}
