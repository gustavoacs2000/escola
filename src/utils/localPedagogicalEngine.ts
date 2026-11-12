import {
  ActivityType,
  DifficultyLevel,
  MatchingItem,
  PuzzleWordItem,
  SyllableItem,
  VisualMathItem,
  WebSearchResult,
  WorksheetDocument,
} from '../types/worksheet';

interface ThemeWordEntry {
  word: string;
  syllables: string[];
  iconKey: string;
  hint: string;
  categoryKeywords: string[];
}

const PEDAGOGICAL_WORD_BANK: ThemeWordEntry[] = [
  // Circo & Espetáculo
  {
    word: 'PALHAÇO',
    syllables: ['PA', 'LHA', 'ÇO'],
    iconKey: 'palhaco',
    hint: 'Faz todo mundo rir no picadeiro',
    categoryKeywords: ['circo', 'espetaculo', 'festa', 'alegria'],
  },
  {
    word: 'PIPOCA',
    syllables: ['PI', 'PO', 'CA'],
    iconKey: 'pipoca',
    hint: 'Lanche crocante e quentinho do circo',
    categoryKeywords: ['circo', 'festa', 'comida', 'lanche', 'alimento'],
  },
  {
    word: 'TENDA',
    syllables: ['TEN', 'DA'],
    iconKey: 'tenda',
    hint: 'Lona colorida onde acontece o show',
    categoryKeywords: ['circo', 'espetaculo'],
  },
  {
    word: 'MÁGICO',
    syllables: ['MÁ', 'GI', 'CO'],
    iconKey: 'magico',
    hint: 'Tira coelhos da cartola misteriosa',
    categoryKeywords: ['circo', 'fantasia', 'magia', 'espetaculo'],
  },
  {
    word: 'BALÃO',
    syllables: ['BA', 'LÃO'],
    iconKey: 'balao',
    hint: 'Sobe colorido pelo ar na festa',
    categoryKeywords: ['circo', 'festa', 'brinquedo', 'ceu'],
  },
  {
    word: 'FOCA',
    syllables: ['FO', 'CA'],
    iconKey: 'foca',
    hint: 'Equilibra a bola na ponta do nariz',
    categoryKeywords: ['circo', 'mar', 'agua', 'animal', 'animais', 'oceano'],
  },
  {
    word: 'LEÃO',
    syllables: ['LE', 'ÃO'],
    iconKey: 'leao',
    hint: 'Tem uma grande juba e ruge forte',
    categoryKeywords: ['circo', 'selva', 'floresta', 'animal', 'animais'],
  },
  {
    word: 'TAMBOR',
    syllables: ['TAM', 'BOR'],
    iconKey: 'tambor',
    hint: 'Instrumento que marca o rufar no circo',
    categoryKeywords: ['circo', 'musica', 'brinquedo', 'instrumento'],
  },
  {
    word: 'MALABARES',
    syllables: ['MA', 'LA', 'BA', 'RES'],
    iconKey: 'malabarista',
    hint: 'Equilibra clavas e bolinhas no ar',
    categoryKeywords: ['circo', 'espetaculo'],
  },

  // Animais da Fazenda, Floresta, Fundo do Mar & Dinossauros
  {
    word: 'VACA',
    syllables: ['VA', 'CA'],
    iconKey: 'vaca',
    hint: 'Animal da fazenda que produz leite',
    categoryKeywords: ['animal', 'animais', 'fazenda', 'campo', 'sitio'],
  },
  {
    word: 'CAVALO',
    syllables: ['CA', 'VA', 'LO'],
    iconKey: 'cavalo',
    hint: 'Galopa rápido pelos campos da fazenda',
    categoryKeywords: ['animal', 'animais', 'fazenda', 'campo', 'sitio'],
  },
  {
    word: 'OVELHA',
    syllables: ['O', 'VE', 'LHA'],
    iconKey: 'ovelha',
    hint: 'Tem pelo macio que nos dá a lã',
    categoryKeywords: ['animal', 'animais', 'fazenda', 'campo', 'sitio'],
  },
  {
    word: 'PORCO',
    syllables: ['POR', 'CO'],
    iconKey: 'porco',
    hint: 'Tem rabinho enrolado e vive na fazenda',
    categoryKeywords: ['animal', 'animais', 'fazenda', 'campo', 'sitio'],
  },
  {
    word: 'PATO',
    syllables: ['PA', 'TO'],
    iconKey: 'pato',
    hint: 'Nada na lagoa e faz quá-quá',
    categoryKeywords: ['animal', 'animais', 'fazenda', 'agua', 'lagoa', 'mar'],
  },
  {
    word: 'SAPO',
    syllables: ['SA', 'PO'],
    iconKey: 'sapo',
    hint: 'Pula bem alto perto da lagoa',
    categoryKeywords: ['animal', 'animais', 'fazenda', 'lagoa', 'natureza', 'agua'],
  },
  {
    word: 'GATO',
    syllables: ['GA', 'TO'],
    iconKey: 'gato',
    hint: 'Bichinho doméstico que gosta de miar',
    categoryKeywords: ['animal', 'animais', 'casa', 'estimacao', 'fazenda'],
  },
  {
    word: 'CACHORRO',
    syllables: ['CA', 'CHOR', 'RO'],
    iconKey: 'cachorro',
    hint: 'Melhor amigo que abana o rabo',
    categoryKeywords: ['animal', 'animais', 'casa', 'estimacao', 'fazenda'],
  },
  {
    word: 'MACACO',
    syllables: ['MA', 'CA', 'CO'],
    iconKey: 'macaco',
    hint: 'Pula de galho em galho e gosta de banana',
    categoryKeywords: ['animal', 'animais', 'floresta', 'selva'],
  },
  {
    word: 'GIRAFA',
    syllables: ['GI', 'RA', 'FA'],
    iconKey: 'girafa',
    hint: 'Animal de pescoço bem comprido e pintinhas',
    categoryKeywords: ['animal', 'animais', 'floresta', 'selva', 'zoologico'],
  },
  {
    word: 'JACARÉ',
    syllables: ['JA', 'CA', 'RÉ'],
    iconKey: 'jacare',
    hint: 'Tem bocão comprido e vive no rio',
    categoryKeywords: ['animal', 'animais', 'rio', 'floresta', 'agua', 'mar'],
  },
  {
    word: 'COELHO',
    syllables: ['CO', 'E', 'LHO'],
    iconKey: 'coelho',
    hint: 'Tem orelhas compridas e adora cenoura',
    categoryKeywords: ['animal', 'animais', 'fazenda', 'floresta'],
  },
  {
    word: 'TARTARUGA',
    syllables: ['TAR', 'TA', 'RU', 'GA'],
    iconKey: 'tartaruga',
    hint: 'Caminha devagar levando seu casco',
    categoryKeywords: ['animal', 'animais', 'mar', 'oceano', 'agua', 'natureza', 'fundo'],
  },
  {
    word: 'ELEFANTE',
    syllables: ['E', 'LE', 'FAN', 'TE'],
    iconKey: 'elefante',
    hint: 'Maior animal terrestre com longa tromba',
    categoryKeywords: ['animal', 'animais', 'selva', 'circo', 'zoologico'],
  },
  {
    word: 'URSO',
    syllables: ['UR', 'SO'],
    iconKey: 'urso',
    hint: 'Peludo e fofinho que adora mel',
    categoryKeywords: ['animal', 'animais', 'floresta', 'brinquedo'],
  },
  {
    word: 'PEIXE',
    syllables: ['PEI', 'XE'],
    iconKey: 'peixe',
    hint: 'Vive nadando nas águas do mar e do rio',
    categoryKeywords: ['animal', 'animais', 'mar', 'oceano', 'agua', 'fundo'],
  },
  {
    word: 'PÁSSARO',
    syllables: ['PÁS', 'SA', 'RO'],
    iconKey: 'passaro',
    hint: 'Bate as asas e canta nas árvores',
    categoryKeywords: ['animal', 'animais', 'natureza', 'ceu', 'floresta'],
  },
  {
    word: 'BORBOLETA',
    syllables: ['BOR', 'BO', 'LE', 'TA'],
    iconKey: 'borboleta',
    hint: 'Tem asas coloridas e voa pelas flores',
    categoryKeywords: ['animal', 'animais', 'natureza', 'jardim', 'inseto'],
  },
  {
    word: 'ABELHA',
    syllables: ['A', 'BE', 'LHA'],
    iconKey: 'abelha',
    hint: 'Visita as flores e fabrica o mel',
    categoryKeywords: ['animal', 'animais', 'natureza', 'jardim', 'inseto'],
  },
  {
    word: 'DINOSSAURO',
    syllables: ['DI', 'NOS', 'SAU', 'RO'],
    iconKey: 'dinossauro',
    hint: 'Gigante pré-histórico que viveu há milhões de anos',
    categoryKeywords: ['dinossauro', 'dinossauros', 'animal', 'animais', 'aventura'],
  },

  // Frutas & Alimentação Saudável
  {
    word: 'MAÇÃ',
    syllables: ['MA', 'ÇÃ'],
    iconKey: 'maca',
    hint: 'Fruta vermelhinha muito saborosa',
    categoryKeywords: ['fruta', 'frutas', 'comida', 'alimentacao', 'merenda', 'saudavel'],
  },
  {
    word: 'BANANA',
    syllables: ['BA', 'NA', 'NA'],
    iconKey: 'banana',
    hint: 'Fruta amarela que descascamos fácil',
    categoryKeywords: ['fruta', 'frutas', 'comida', 'alimentacao', 'merenda', 'saudavel'],
  },
  {
    word: 'UVA',
    syllables: ['U', 'VA'],
    iconKey: 'uva',
    hint: 'Frutinha que dá em cachos docinhos',
    categoryKeywords: ['fruta', 'frutas', 'comida', 'alimentacao', 'merenda', 'saudavel'],
  },
  {
    word: 'ABACAXI',
    syllables: ['A', 'BA', 'CA', 'XI'],
    iconKey: 'abacaxi',
    hint: 'Fruta tropical que usa uma coroa verde',
    categoryKeywords: ['fruta', 'frutas', 'comida', 'alimentacao', 'merenda', 'saudavel'],
  },
  {
    word: 'MORANGO',
    syllables: ['MO', 'RAN', 'GO'],
    iconKey: 'morango',
    hint: 'Frutinha vermelha cheia de pontinhos',
    categoryKeywords: ['fruta', 'frutas', 'comida', 'alimentacao', 'merenda', 'saudavel'],
  },
  {
    word: 'LARANJA',
    syllables: ['LA', 'RAN', 'JA'],
    iconKey: 'laranja',
    hint: 'Fruta cítrica ótima para fazer suco',
    categoryKeywords: ['fruta', 'frutas', 'comida', 'alimentacao', 'merenda', 'saudavel'],
  },
  {
    word: 'MELANCIA',
    syllables: ['ME', 'LAN', 'CI', 'A'],
    iconKey: 'melancia',
    hint: 'Grande e verde por fora, vermelha e docinha por dentro',
    categoryKeywords: ['fruta', 'frutas', 'comida', 'alimentacao', 'merenda', 'saudavel'],
  },
  {
    word: 'PERA',
    syllables: ['PE', 'RA'],
    iconKey: 'pera',
    hint: 'Fruta macia e suculenta',
    categoryKeywords: ['fruta', 'frutas', 'comida', 'alimentacao', 'merenda', 'saudavel'],
  },

  // Natureza, Céu & Espaço
  {
    word: 'SOL',
    syllables: ['SOL'],
    iconKey: 'sol',
    hint: 'Ilumina e aquece o nosso dia',
    categoryKeywords: ['natureza', 'ceu', 'espaco', 'clima', 'planeta', 'astronauta'],
  },
  {
    word: 'LUA',
    syllables: ['LU', 'A'],
    iconKey: 'lua',
    hint: 'Brilha no céu durante a noite',
    categoryKeywords: ['natureza', 'ceu', 'espaco', 'noite', 'planeta', 'astronauta'],
  },
  {
    word: 'ESTRELA',
    syllables: ['ES', 'TRE', 'LA'],
    iconKey: 'estrela',
    hint: 'Pisca lá no alto do céu noturno',
    categoryKeywords: ['natureza', 'ceu', 'espaco', 'noite', 'planeta', 'astronauta'],
  },
  {
    word: 'PLANETA',
    syllables: ['PLA', 'NE', 'TA'],
    iconKey: 'planeta',
    hint: 'Gira pelo espaço ao redor do Sol',
    categoryKeywords: ['espaco', 'astronauta', 'planeta', 'planetas', 'ceu'],
  },
  {
    word: 'FOGUETE',
    syllables: ['FO', 'GUE', 'TE'],
    iconKey: 'foguete',
    hint: 'Viaja rápido rumo ao espaço e aos planetas',
    categoryKeywords: ['espaco', 'astronauta', 'planeta', 'planetas', 'transporte', 'brinquedos'],
  },
  {
    word: 'NUVEM',
    syllables: ['NU', 'VEM'],
    iconKey: 'nuvem',
    hint: 'Flutua branquinha no céu e traz a chuva',
    categoryKeywords: ['natureza', 'ceu', 'clima', 'agua'],
  },
  {
    word: 'ARCO-ÍRIS',
    syllables: ['AR', 'CO', 'Í', 'RIS'],
    iconKey: 'arcoiris',
    hint: 'Aparece colorido no céu depois da chuva',
    categoryKeywords: ['natureza', 'ceu', 'clima', 'cores'],
  },
  {
    word: 'FLOR',
    syllables: ['FLOR'],
    iconKey: 'flor',
    hint: 'Enfeita e perfuma o jardim',
    categoryKeywords: ['natureza', 'jardim', 'planta'],
  },
  {
    word: 'ÁRVORE',
    syllables: ['ÁR', 'VO', 'RE'],
    iconKey: 'arvore',
    hint: 'Dá sombra fresca e frutos na natureza',
    categoryKeywords: ['natureza', 'jardim', 'planta', 'floresta'],
  },

  // Objetos, Brinquedos, Transportes & Escola
  {
    word: 'BOLO',
    syllables: ['BO', 'LO'],
    iconKey: 'bolo',
    hint: 'Doce com velinhas na festa de aniversário',
    categoryKeywords: ['festa', 'comida', 'cotidiano', 'casa'],
  },
  {
    word: 'DADO',
    syllables: ['DA', 'DO'],
    iconKey: 'dado',
    hint: 'Cubinho com pontinhos para jogar no tabuleiro',
    categoryKeywords: ['brinquedo', 'brinquedos', 'jogos', 'escola'],
  },
  {
    word: 'CASA',
    syllables: ['CA', 'SA'],
    iconKey: 'casa',
    hint: 'Lugar acolhedor onde moramos com a família',
    categoryKeywords: ['cotidiano', 'casa', 'familia', 'cidade'],
  },
  {
    word: 'FADA',
    syllables: ['FA', 'DA'],
    iconKey: 'fada',
    hint: 'Personagem encantada com varinha de condão',
    categoryKeywords: ['fantasia', 'contos', 'magia', 'historia'],
  },
  {
    word: 'COROA',
    syllables: ['CO', 'RO', 'A'],
    iconKey: 'coroa',
    hint: 'Usada na cabeça por reis e rainhas nos contos',
    categoryKeywords: ['fantasia', 'contos', 'historia', 'castelo'],
  },
  {
    word: 'CASTELO',
    syllables: ['CAS', 'TE', 'LO'],
    iconKey: 'castelo',
    hint: 'Grande fortaleza com torres dos contos de fadas',
    categoryKeywords: ['fantasia', 'contos', 'historia', 'castelo'],
  },
  {
    word: 'BOLA',
    syllables: ['BO', 'LA'],
    iconKey: 'bola',
    hint: 'Brinquedo redondo ótimo para chutar e jogar',
    categoryKeywords: ['brinquedo', 'brinquedos', 'esporte', 'escola', 'brincadeiras'],
  },
  {
    word: 'BONECA',
    syllables: ['BO', 'NE', 'CA'],
    iconKey: 'boneca',
    hint: 'Brinquedo clássico de faz de conta',
    categoryKeywords: ['brinquedo', 'brinquedos', 'brincadeiras'],
  },
  {
    word: 'PIPA',
    syllables: ['PI', 'PA'],
    iconKey: 'pipa',
    hint: 'Brinquedo que voa alto no vento com rabiola',
    categoryKeywords: ['brinquedo', 'brinquedos', 'ceu', 'brincadeiras'],
  },
  {
    word: 'ROBÔ',
    syllables: ['RO', 'BÔ'],
    iconKey: 'robo',
    hint: 'Boneco metálico cheio de botões e luzes',
    categoryKeywords: ['brinquedo', 'brinquedos', 'espaco', 'tecnologia', 'brincadeiras'],
  },
  {
    word: 'VIOLÃO',
    syllables: ['VI', 'O', 'LÃO'],
    iconKey: 'violao',
    hint: 'Instrumento musical de cordas',
    categoryKeywords: ['musica', 'instrumento', 'escola', 'arte'],
  },
  {
    word: 'CARRO',
    syllables: ['CAR', 'RO'],
    iconKey: 'carro',
    hint: 'Veículo de quatro rodas que anda nas ruas',
    categoryKeywords: ['transporte', 'transportes', 'cidade', 'brinquedo', 'brinquedos'],
  },
  {
    word: 'TREM',
    syllables: ['TREM'],
    iconKey: 'trem',
    hint: 'Anda sobre os trilhos puxando vagões',
    categoryKeywords: ['transporte', 'transportes', 'cidade', 'brinquedo', 'brinquedos'],
  },
  {
    word: 'AVIÃO',
    syllables: ['A', 'VI', 'ÃO'],
    iconKey: 'aviao',
    hint: 'Voa entre as nuvens levando passageiros',
    categoryKeywords: ['transporte', 'transportes', 'ceu', 'viagem', 'brinquedos'],
  },
  {
    word: 'BARCO',
    syllables: ['BAR', 'CO'],
    iconKey: 'barco',
    hint: 'Navega pelas águas do mar e dos rios',
    categoryKeywords: ['transporte', 'transportes', 'mar', 'oceano', 'agua', 'fundo'],
  },
  {
    word: 'LÁPIS',
    syllables: ['LÁ', 'PIS'],
    iconKey: 'lapis',
    hint: 'Material escolar usado para escrever e desenhar',
    categoryKeywords: ['escola', 'material', 'aula', 'estudo'],
  },
  {
    word: 'LIVRO',
    syllables: ['LI', 'VRO'],
    iconKey: 'livro',
    hint: 'Cheio de páginas com histórias e aprendizados',
    categoryKeywords: ['escola', 'material', 'historia', 'contos', 'leitura'],
  },
  {
    word: 'MOCHILA',
    syllables: ['MO', 'CHI', 'LA'],
    iconKey: 'mochila',
    hint: 'Usada para levar os cadernos e materiais para a escola',
    categoryKeywords: ['escola', 'material', 'aula', 'estudo'],
  },
];

function selectWordsForTheme(theme: string, count: number): ThemeWordEntry[] {
  const normalized = (theme || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const scored = PEDAGOGICAL_WORD_BANK.map((entry, idx) => {
    let score = 0;
    for (const kw of entry.categoryKeywords) {
      if (normalized.includes(kw) || kw.includes(normalized)) {
        score += 12;
      }
    }
    if (normalized.includes(entry.iconKey)) {
      score += 18;
    }
    // Prefer words with at least 2 syllables for syllable completion
    if (entry.syllables.length >= 2) {
      score += 2;
    }
    return { entry, score, idx };
  });

  scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
  return scored.slice(0, count).map((s) => s.entry);
}

/**
 * Generates a complete, pedagogically accurate worksheet locally with zero API cost.
 * Used as an instant fallback if no API key is configured, rate limits are reached,
 * or when hosted statically on GitHub Pages.
 */
export function generateLocalPedagogicalWorksheet(params: {
  theme: string;
  pedagogicalGoal: string;
  activityType: ActivityType;
  difficulty: DifficultyLevel;
  itemCount?: number;
  baseHeader?: WorksheetDocument['header'];
}): WorksheetDocument {
  const {
    theme = 'Circo e Animais',
    pedagogicalGoal = 'Sílabas simples e consciência fonológica',
    activityType = 'syllables',
    difficulty = 'facil',
    itemCount = 8,
    baseHeader,
  } = params;

  const selectedEntries = selectWordsForTheme(theme, Math.max(8, itemCount));
  const nowId = Date.now();

  const syllableItems: SyllableItem[] = selectedEntries.slice(0, 8).map((entry, idx) => ({
    id: `local-s-${nowId}-${idx}`,
    word: entry.word,
    syllables: entry.syllables,
    missingIndex:
      difficulty === 'desafio' && entry.syllables.length > 1
        ? idx % entry.syllables.length
        : 0,
    iconKey: entry.iconKey,
  }));

  const isFingerTheme =
    theme.toLowerCase().includes('dedinho') ||
    pedagogicalGoal.toLowerCase().includes('dedinho');

  const mathPairs =
    difficulty === 'desafio'
      ? [
          [4, 3],
          [5, 2],
          [3, 4],
          [5, 4],
        ]
      : difficulty === 'medio'
      ? [
          [2, 3],
          [3, 2],
          [4, 1],
          [3, 3],
        ]
      : [
          [1, 2],
          [2, 2],
          [3, 1],
          [3, 2],
        ];

  const mathItems: VisualMathItem[] = mathPairs.map(([left, right], idx) => ({
    id: `local-m-${nowId}-${idx}`,
    leftCount: left,
    rightCount: right,
    operator: '+',
    visualStyle: isFingerTheme ? 'fingers' : 'theme_icons',
    iconKey: selectedEntries[idx % selectedEntries.length]?.iconKey || 'estrela',
    itemLabel: theme,
  }));

  const matchingItems: MatchingItem[] = selectedEntries.slice(0, 6).map((entry, idx) => ({
    id: `local-mt-${nowId}-${idx}`,
    word: entry.word,
    syllableHint: entry.syllables.join(' - '),
    iconKey: entry.iconKey,
  }));

  const puzzleWords: PuzzleWordItem[] = selectedEntries.slice(0, 6).map((entry, idx) => ({
    id: `local-pw-${nowId}-${idx}`,
    word: entry.word
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z]/g, ''),
    hint: entry.hint,
    iconKey: entry.iconKey,
  }));

  const titleByFormat: Record<ActivityType, string> = {
    syllables: `Descobrindo as Sílabas: ${theme}`,
    visual_math: isFingerTheme
      ? 'SOMANDO COM OS DEDINHOS'
      : `Somando com ${theme}`,
    matching: `Ligue as Palavras: ${theme}`,
    word_puzzle: `Caça-Palavras Ilustrado: ${theme}`,
  };

  const instructionByFormat: Record<ActivityType, string> = {
    syllables: 'Complete as palavras com as sílabas abaixo e pinte os desenhos:',
    visual_math:
      'Conte os elementos em cada quadro, escreva os números abaixo e descubra o resultado:',
    matching: 'Ligue cada figura à sua palavra correspondente:',
    word_puzzle: 'Observe os desenhos abaixo e encontre o nome de cada figura no diagrama:',
  };

  return {
    id: `ws-${nowId}`,
    title: titleByFormat[activityType],
    theme,
    pedagogicalGoal,
    activityType,
    difficulty,
    instruction: instructionByFormat[activityType],
    teacherTip: `Explore oralmente o tema "${theme}" pedindo que a turma bata palmas para cada sílaba ou conte nos dedos antes de registrar no papel.`,
    bnccCode:
      activityType === 'visual_math'
        ? 'EF01MA06 — Construir fatos básicos da adição e utilizá-los em procedimentos de cálculo.'
        : 'EF01LP08 — Relacionar elementos sonoros (sílabas, fonemas) com sua representação escrita.',
    header: baseHeader || {
      schoolName: '',
      studentLabel: 'NOME:',
      dateLabel: 'DATA:',
      classLabel: 'TURMA:',
      borderStyle: activityType === 'visual_math' ? 'dashed' : 'rounded',
      uppercaseOnly: true,
      showColoringHint: true,
      footerCredit: 'Estúdio Alfabetizar — Material Pedagógico Gratuito',
    },
    syllableItems,
    mathItems,
    showNumberStrip: true,
    matchingItems,
    puzzleMode: 'word_search',
    puzzleWords,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Verified (200 OK) free Brazilian educational portals with ready-to-print worksheets
 * for 1º and 2º ano (Sílabas, Alfabetização, Soma com Desenhos/Dedinhos, BNCC).
 */
export function getCuratedFreeWebReferences(
  theme: string,
  pedagogicalGoal: string
): WebSearchResult {
  const selected = selectWordsForTheme(theme, 6);
  const wordList = selected.map((w) => `${w.word} (${w.syllables.join('-')})`).join(', ');

  return {
    queryUsed: `${pedagogicalGoal} tema ${theme} atividades gratuitas alfabetização 1º ano`,
    links: [
      {
        title: 'Toda Matéria — 8 Atividades de Alfabetização Prontas para Imprimir (Sílabas, Ligar e Caça-Palavras)',
        uri: 'https://www.todamateria.com.br/atividades-alfabetizacao/',
      },
      {
        title: 'Toda Matéria — 5 Folhas de Separação e Contagem de Sílabas (1º Ano Fundamental)',
        uri: 'https://www.todamateria.com.br/atividades-de-separacao-de-silabas-1-ano-do-ensino-fundamental/',
      },
      {
        title: 'Toda Matéria — 8 Folhas de Continhas de Somar / Adição Visual (1º Ano Fundamental)',
        uri: 'https://www.todamateria.com.br/atividades-com-continhas-de-somar-adicao-para-1-ano-do-fundamental/',
      },
      {
        title: 'Tudo Sala de Aula — Atividades de Adição 1º Ano com Desenhos Prontas em PDF',
        uri: 'https://www.tudosaladeaula.com/2024/02/atividades-de-adicao-1-ano-com-desenhos/',
      },
      {
        title: 'Nova Escola — Banco Gratuito de Atividades de Alfabetização e Planos BNCC',
        uri: 'https://novaescola.org.br/atividades/alfabetizacao',
      },
      {
        title: 'Click Escolar — Folhas Clássicas de Alfabetização 1º Ano para Imprimir',
        uri: 'https://www.clickescolar.com/atividades-de-alfabetizacao-1-ano.htm',
      },
      {
        title: 'Portal MEC — Compromisso Nacional Criança Alfabetizada (Materiais Oficiais)',
        uri: 'https://www.gov.br/mec/pt-br/crianca-alfabetizada',
      },
    ],
    summaryMarkdown: `### Acervo Verificado de Atividades Gratuitas para "${theme}" (${pedagogicalGoal})

1. **Quadro de Sílabas e Juntar Palavras (Toda Matéria & Click Escolar)**: Folhas prontas em que a criança observa a figura do tema **${theme}**, identifica a sílaba faltante no quadro de apoio e escreve em letra bastão (Caixa Alta).
2. **Adição Visual com Dedinhos e Desenhos (Tudo Sala de Aula & Toda Matéria)**: Fichas de matemática para o 1º ano com contagem de elementos ilustrados e gestos das mãos apoiados pela reta numérica de 0 a 9.
3. **Banco de Palavras Selecionadas para "${theme}"**: ${wordList}.
4. **Pronto para Uso Imediato**: Você pode clicar em **"Transformar em Folha A4 Agora"** acima para montar automaticamente esta folha ou carregar qualquer um dos **8 Modelos Gratuitos Prontos** logo abaixo.`,
  };
}
