import React from 'react';

export interface ColoringIconMeta {
  key: string;
  label: string;
  category: 'Classicos' | 'Circo' | 'Animais' | 'Frutas & Natureza' | 'Objetos & Escola';
}

export const COLORING_ICON_CATALOG: ColoringIconMeta[] = [
  // Clássicos (Folha 1 anexa)
  { key: 'bolo', label: 'Bolo de Aniversário', category: 'Classicos' },
  { key: 'dado', label: 'Dado', category: 'Classicos' },
  { key: 'casa', label: 'Casa', category: 'Classicos' },
  { key: 'gato', label: 'Gato', category: 'Classicos' },
  { key: 'fada', label: 'Fada', category: 'Classicos' },
  { key: 'macaco', label: 'Macaco', category: 'Classicos' },
  { key: 'jacare', label: 'Jacaré', category: 'Classicos' },
  { key: 'lua', label: 'Lua', category: 'Classicos' },
  // Circo
  { key: 'palhaco', label: 'Palhaço', category: 'Circo' },
  { key: 'tenda', label: 'Tenda de Circo', category: 'Circo' },
  { key: 'pipoca', label: 'Pipoca', category: 'Circo' },
  { key: 'magico', label: 'Cartola de Mágico', category: 'Circo' },
  { key: 'balao', label: 'Balão', category: 'Circo' },
  { key: 'leao', label: 'Leão', category: 'Circo' },
  { key: 'foca', label: 'Foca com Bola', category: 'Circo' },
  { key: 'malabarista', label: 'Clavas de Malabares', category: 'Circo' },
  // Animais
  { key: 'vaca', label: 'Vaca', category: 'Animais' },
  { key: 'pato', label: 'Pato', category: 'Animais' },
  { key: 'sapo', label: 'Sapo', category: 'Animais' },
  { key: 'cavalo', label: 'Cavalo', category: 'Animais' },
  { key: 'peixe', label: 'Peixe', category: 'Animais' },
  { key: 'passaro', label: 'Pássaro', category: 'Animais' },
  { key: 'cachorro', label: 'Cachorro', category: 'Animais' },
  { key: 'borboleta', label: 'Borboleta', category: 'Animais' },
  { key: 'abelha', label: 'Abelha', category: 'Animais' },
  { key: 'elefante', label: 'Elefante', category: 'Animais' },
  { key: 'girafa', label: 'Girafa', category: 'Animais' },
  { key: 'coelho', label: 'Coelho', category: 'Animais' },
  { key: 'tartaruga', label: 'Tartaruga', category: 'Animais' },
  { key: 'urso', label: 'Urso', category: 'Animais' },
  { key: 'ovelha', label: 'Ovelha', category: 'Animais' },
  { key: 'porco', label: 'Porco', category: 'Animais' },
  { key: 'dinossauro', label: 'Dinossauro', category: 'Animais' },
  // Frutas & Natureza
  { key: 'maca', label: 'Maçã', category: 'Frutas & Natureza' },
  { key: 'banana', label: 'Banana', category: 'Frutas & Natureza' },
  { key: 'uva', label: 'Uva', category: 'Frutas & Natureza' },
  { key: 'abacaxi', label: 'Abacaxi', category: 'Frutas & Natureza' },
  { key: 'morango', label: 'Morango', category: 'Frutas & Natureza' },
  { key: 'laranja', label: 'Laranja', category: 'Frutas & Natureza' },
  { key: 'melancia', label: 'Melancia', category: 'Frutas & Natureza' },
  { key: 'pera', label: 'Pera', category: 'Frutas & Natureza' },
  { key: 'sol', label: 'Sol', category: 'Frutas & Natureza' },
  { key: 'flor', label: 'Flor', category: 'Frutas & Natureza' },
  { key: 'arvore', label: 'Árvore', category: 'Frutas & Natureza' },
  { key: 'nuvem', label: 'Nuvem', category: 'Frutas & Natureza' },
  { key: 'estrela', label: 'Estrela', category: 'Frutas & Natureza' },
  { key: 'arcoiris', label: 'Arco-Íris', category: 'Frutas & Natureza' },
  // Objetos & Escola
  { key: 'bola', label: 'Bola', category: 'Objetos & Escola' },
  { key: 'lapis', label: 'Lápis', category: 'Objetos & Escola' },
  { key: 'livro', label: 'Livro', category: 'Objetos & Escola' },
  { key: 'mochila', label: 'Mochila', category: 'Objetos & Escola' },
  { key: 'carro', label: 'Carro', category: 'Objetos & Escola' },
  { key: 'trem', label: 'Trem', category: 'Objetos & Escola' },
  { key: 'aviao', label: 'Avião', category: 'Objetos & Escola' },
  { key: 'barco', label: 'Barco', category: 'Objetos & Escola' },
  { key: 'foguete', label: 'Foguete', category: 'Objetos & Escola' },
  { key: 'planeta', label: 'Planeta', category: 'Objetos & Escola' },
  { key: 'robo', label: 'Robô', category: 'Objetos & Escola' },
  { key: 'coroa', label: 'Coroa', category: 'Objetos & Escola' },
  { key: 'violao', label: 'Violão', category: 'Objetos & Escola' },
  { key: 'tambor', label: 'Tambor', category: 'Objetos & Escola' },
  { key: 'pipa', label: 'Pipa', category: 'Objetos & Escola' },
  { key: 'boneca', label: 'Boneca', category: 'Objetos & Escola' },
  { key: 'castelo', label: 'Castelo', category: 'Objetos & Escola' },
];

/**
 * Renders a child-friendly black-and-white hand counting illustration (0 to 5 fingers per hand,
 * or two hands for 6 to 10) matching the "SOMANDO COM OS DEDINHOS" style.
 */
export function FingerCountIllustration({
  count,
  className = 'w-20 h-20',
}: {
  count: number;
  className?: string;
}) {
  const safeCount = Math.max(0, Math.min(10, Math.round(count)));

  const renderSingleHand = (fingersUp: number, keySuffix: string) => {
    // 5 finger slots: [thumb, index, middle, ring, pinky]
    // Which fingers are raised for 0..5:
    const isIndexUp = fingersUp >= 1;
    const isMiddleUp = fingersUp >= 2;
    const isRingUp = fingersUp >= 3;
    const isPinkyUp = fingersUp >= 4;
    const isThumbUp = fingersUp >= 5;

    return (
      <svg
        key={keySuffix}
        viewBox="0 0 100 110"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wrist & Palm */}
        <path
          d="M32 98 V82 C26 78 24 68 24 56 C24 48 30 45 35 45 H68 C74 45 78 50 78 58 C78 70 74 78 68 82 V98 Z"
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Index Finger */}
        {isIndexUp ? (
          <rect
            x="33"
            y="14"
            width="10"
            height="36"
            rx="5"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
        ) : (
          <rect
            x="32"
            y="38"
            width="11"
            height="14"
            rx="5.5"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
        )}

        {/* Middle Finger */}
        {isMiddleUp ? (
          <rect
            x="45"
            y="10"
            width="10"
            height="40"
            rx="5"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
        ) : (
          <rect
            x="44"
            y="37"
            width="11"
            height="15"
            rx="5.5"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
        )}

        {/* Ring Finger */}
        {isRingUp ? (
          <rect
            x="57"
            y="15"
            width="10"
            height="35"
            rx="5"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
        ) : (
          <rect
            x="56"
            y="38"
            width="11"
            height="14"
            rx="5.5"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
        )}

        {/* Pinky Finger */}
        {isPinkyUp ? (
          <rect
            x="69"
            y="23"
            width="9"
            height="28"
            rx="4.5"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
        ) : (
          <rect
            x="68"
            y="41"
            width="10"
            height="13"
            rx="5"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
        )}

        {/* Thumb */}
        {isThumbUp ? (
          <path
            d="M26 62 L13 44 C10 40 13 35 18 37 L31 48"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M25 58 C25 51 35 49 42 54 C45 56 44 62 38 63 L27 63"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Palm crease line */}
        <path
          d="M36 66 Q52 71 66 64"
          stroke="#0f172a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  if (safeCount <= 5) {
    return renderSingleHand(safeCount, 'h1');
  }

  return (
    <div className="inline-flex items-center justify-center -space-x-2">
      {renderSingleHand(5, 'h1')}
      {renderSingleHand(safeCount - 5, 'h2')}
    </div>
  );
}

/**
 * Renders a crisp black-and-white line-art illustration for coloring on A4 worksheets.
 */
export function ColoringIllustration({
  iconKey,
  customSvg,
  className = 'w-16 h-16',
}: {
  iconKey: string;
  customSvg?: string;
  className?: string;
}) {
  const normalizedKey = (iconKey || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (customSvg && customSvg.trim().length > 10) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: customSvg }}
      />
    );
  }

  const strokeProps = {
    stroke: '#0f172a',
    strokeWidth: 3.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: '#ffffff',
  };

  const renderShape = () => {
    switch (normalizedKey) {
      case 'bolo':
        return (
          <>
            {/* Plate */}
            <ellipse cx="50" cy="84" rx="38" ry="6" {...strokeProps} />
            {/* Bottom tier */}
            <rect x="20" y="58" width="60" height="24" rx="4" {...strokeProps} />
            <path d="M20 66 Q30 72 40 66 T60 66 T80 66" {...strokeProps} fill="none" />
            {/* Top tier */}
            <rect x="28" y="38" width="44" height="20" rx="4" {...strokeProps} />
            <path d="M28 45 Q39 51 50 45 T72 45" {...strokeProps} fill="none" />
            {/* 3 Candles */}
            <rect x="36" y="22" width="5" height="16" {...strokeProps} />
            <rect x="47.5" y="20" width="5" height="18" {...strokeProps} />
            <rect x="59" y="22" width="5" height="16" {...strokeProps} />
            {/* Flames */}
            <path d="M38.5 13 C35 17 36 21 38.5 21 C41 21 42 17 38.5 13 Z" {...strokeProps} />
            <path d="M50 11 C46.5 15 47.5 19 50 19 C52.5 19 53.5 15 50 11 Z" {...strokeProps} />
            <path d="M61.5 13 C58 17 59 21 61.5 21 C64 21 65 17 61.5 13 Z" {...strokeProps} />
          </>
        );

      case 'dado':
        return (
          <>
            {/* 3D Isometric Cube */}
            <polygon points="50,14 84,32 84,68 50,86 16,68 16,32" {...strokeProps} />
            <polyline points="16,32 50,50 84,32" {...strokeProps} fill="none" />
            <line x1="50" y1="50" x2="50" y2="86" {...strokeProps} />
            {/* Pips */}
            <circle cx="50" cy="31" r="3" fill="#0f172a" />
            <circle cx="38" cy="26" r="2.5" fill="#0f172a" />
            <circle cx="62" cy="36" r="2.5" fill="#0f172a" />
            <circle cx="28" cy="52" r="2.8" fill="#0f172a" />
            <circle cx="38" cy="66" r="2.8" fill="#0f172a" />
            <circle cx="62" cy="54" r="2.8" fill="#0f172a" />
            <circle cx="72" cy="64" r="2.8" fill="#0f172a" />
            <circle cx="62" cy="70" r="2.8" fill="#0f172a" />
          </>
        );

      case 'casa':
        return (
          <>
            {/* Chimney */}
            <rect x="64" y="20" width="10" height="18" {...strokeProps} />
            {/* House body */}
            <rect x="22" y="46" width="56" height="40" {...strokeProps} />
            {/* Roof */}
            <polygon points="14,46 50,16 86,46" {...strokeProps} />
            {/* Door */}
            <rect x="30" y="60" width="14" height="26" {...strokeProps} />
            <circle cx="41" cy="73" r="1.5" fill="#0f172a" />
            {/* Window */}
            <rect x="54" y="56" width="16" height="16" {...strokeProps} />
            <line x1="62" y1="56" x2="62" y2="72" {...strokeProps} />
            <line x1="54" y1="64" x2="70" y2="64" {...strokeProps} />
          </>
        );

      case 'gato':
        return (
          <>
            {/* Tail */}
            <path d="M26 74 C12 68 12 44 22 40" {...strokeProps} fill="none" />
            {/* Body */}
            <ellipse cx="44" cy="68" rx="20" ry="15" {...strokeProps} />
            {/* Legs */}
            <rect x="30" y="76" width="7" height="12" rx="3" {...strokeProps} />
            <rect x="52" y="76" width="7" height="12" rx="3" {...strokeProps} />
            {/* Head */}
            <circle cx="62" cy="44" r="16" {...strokeProps} />
            {/* Ears */}
            <polygon points="50,32 52,16 62,28" {...strokeProps} />
            <polygon points="64,28 74,16 76,32" {...strokeProps} />
            {/* Eyes & Nose */}
            <circle cx="57" cy="42" r="2" fill="#0f172a" />
            <circle cx="68" cy="42" r="2" fill="#0f172a" />
            <polygon points="62,48 59,45 65,45" fill="#0f172a" />
            {/* Whiskers */}
            <line x1="44" y1="46" x2="53" y2="48" {...strokeProps} />
            <line x1="44" y1="52" x2="53" y2="51" {...strokeProps} />
            <line x1="71" y1="48" x2="80" y2="46" {...strokeProps} />
            <line x1="71" y1="51" x2="80" y2="52" {...strokeProps} />
          </>
        );

      case 'fada':
        return (
          <>
            {/* Wings */}
            <ellipse cx="32" cy="52" rx="16" ry="10" transform="rotate(-20 32 52)" {...strokeProps} />
            <ellipse cx="64" cy="52" rx="16" ry="10" transform="rotate(20 64 52)" {...strokeProps} />
            {/* Dress */}
            <polygon points="48,46 30,82 66,82" {...strokeProps} />
            {/* Head */}
            <circle cx="48" cy="34" r="12" {...strokeProps} />
            {/* Fairy Hat */}
            <polygon points="38,26 48,8 58,26" {...strokeProps} />
            {/* Smile & Eyes */}
            <circle cx="44" cy="33" r="1.8" fill="#0f172a" />
            <circle cx="52" cy="33" r="1.8" fill="#0f172a" />
            <path d="M44 38 Q48 42 52 38" {...strokeProps} fill="none" />
            {/* Magic Wand */}
            <line x1="62" y1="56" x2="80" y2="30" {...strokeProps} />
            <polygon
              points="82,20 85,26 91,27 86,31 88,37 82,34 76,37 78,31 73,27 79,26"
              {...strokeProps}
            />
          </>
        );

      case 'macaco':
        return (
          <>
            {/* Vine */}
            <path d="M30 8 Q24 45 32 88" {...strokeProps} fill="none" />
            {/* Curly Tail */}
            <path d="M62 72 C78 72 84 54 74 48 C68 44 64 52 70 56" {...strokeProps} fill="none" />
            {/* Ears */}
            <circle cx="34" cy="34" r="7" {...strokeProps} />
            <circle cx="70" cy="34" r="7" {...strokeProps} />
            {/* Head */}
            <circle cx="52" cy="34" r="16" {...strokeProps} />
            <ellipse cx="52" cy="38" rx="12" ry="9" {...strokeProps} />
            {/* Eyes & Smile */}
            <circle cx="47" cy="31" r="2" fill="#0f172a" />
            <circle cx="57" cy="31" r="2" fill="#0f172a" />
            <path d="M46 40 Q52 45 58 40" {...strokeProps} fill="none" />
            {/* Body */}
            <ellipse cx="52" cy="64" rx="13" ry="16" {...strokeProps} />
            {/* Arms holding vine */}
            <path d="M40 56 L28 42" {...strokeProps} fill="none" />
            <path d="M64 56 L74 64" {...strokeProps} fill="none" />
          </>
        );

      case 'jacare':
        return (
          <>
            {/* Tail & Body */}
            <path
              d="M20 72 C10 68 12 52 24 56 L36 60 L36 38 L76 38 C84 38 86 48 76 50 L54 52 L58 82 L32 82 Z"
              {...strokeProps}
            />
            {/* Snout Teeth */}
            <polyline points="56,50 60,55 64,50 68,55 72,50" {...strokeProps} fill="none" />
            {/* Eye bump */}
            <circle cx="46" cy="32" r="6" {...strokeProps} />
            <circle cx="47" cy="32" r="2.2" fill="#0f172a" />
            {/* Back scales */}
            <polygon points="30,56 33,48 36,56" {...strokeProps} />
            <polygon points="22,55 25,47 28,55" {...strokeProps} />
            {/* Belly stripes */}
            <line x1="40" y1="62" x2="52" y2="62" {...strokeProps} />
            <line x1="40" y1="70" x2="54" y2="70" {...strokeProps} />
          </>
        );

      case 'lua':
        return (
          <>
            <path
              d="M64 16 C38 16 22 36 22 54 C22 74 38 86 64 86 C48 78 44 64 44 50 C44 36 50 24 64 16 Z"
              {...strokeProps}
            />
            {/* Sleeping eye & smile */}
            <path d="M34 46 Q38 50 42 46" {...strokeProps} fill="none" />
            <path d="M35 58 Q40 62 43 58" {...strokeProps} fill="none" />
          </>
        );

      case 'palhaco':
        return (
          <>
            {/* Curly hair puffs */}
            <circle cx="22" cy="46" r="10" {...strokeProps} />
            <circle cx="24" cy="60" r="9" {...strokeProps} />
            <circle cx="78" cy="46" r="10" {...strokeProps} />
            <circle cx="76" cy="60" r="9" {...strokeProps} />
            {/* Bowtie */}
            <polygon points="50,82 32,74 32,90" {...strokeProps} />
            <polygon points="50,82 68,74 68,90" {...strokeProps} />
            <circle cx="50" cy="82" r="5" {...strokeProps} />
            {/* Face */}
            <circle cx="50" cy="52" r="22" {...strokeProps} />
            {/* Party Hat */}
            <polygon points="34,34 50,10 66,34" {...strokeProps} />
            <circle cx="50" cy="10" r="4" {...strokeProps} />
            {/* Clown Nose & Smile */}
            <circle cx="50" cy="52" r="6" {...strokeProps} />
            <circle cx="41" cy="43" r="2.2" fill="#0f172a" />
            <circle cx="59" cy="43" r="2.2" fill="#0f172a" />
            <path d="M38 60 Q50 70 62 60" {...strokeProps} fill="none" />
          </>
        );

      case 'tenda':
        return (
          <>
            {/* Flag */}
            <line x1="50" y1="10" x2="50" y2="22" {...strokeProps} />
            <polygon points="50,10 66,15 50,20" {...strokeProps} />
            {/* Roof */}
            <polygon points="14,50 50,22 86,50" {...strokeProps} />
            <line x1="50" y1="22" x2="34" y2="50" {...strokeProps} />
            <line x1="50" y1="22" x2="66" y2="50" {...strokeProps} />
            {/* Tent Walls */}
            <rect x="20" y="50" width="60" height="36" {...strokeProps} />
            {/* Entrance curtains */}
            <polygon points="50,50 36,86 64,86" {...strokeProps} />
          </>
        );

      case 'pipoca':
        return (
          <>
            {/* Popcorn puffs */}
            <circle cx="34" cy="34" r="9" {...strokeProps} />
            <circle cx="50" cy="28" r="11" {...strokeProps} />
            <circle cx="66" cy="34" r="9" {...strokeProps} />
            <circle cx="42" cy="38" r="8" {...strokeProps} />
            <circle cx="58" cy="38" r="8" {...strokeProps} />
            {/* Striped Bucket */}
            <polygon points="24,42 76,42 68,86 32,86" {...strokeProps} />
            <line x1="38" y1="42" x2="42" y2="86" {...strokeProps} />
            <line x1="50" y1="42" x2="50" y2="86" {...strokeProps} />
            <line x1="62" y1="42" x2="58" y2="86" {...strokeProps} />
          </>
        );

      case 'magico':
        return (
          <>
            {/* Top Hat */}
            <ellipse cx="50" cy="68" rx="34" ry="8" {...strokeProps} />
            <rect x="28" y="28" width="44" height="40" rx="3" {...strokeProps} />
            <rect x="28" y="56" width="44" height="8" {...strokeProps} />
            {/* Magic Wand crossing */}
            <line x1="18" y1="20" x2="82" y2="44" {...strokeProps} />
            <circle cx="18" cy="20" r="3" {...strokeProps} />
          </>
        );

      case 'balao':
        return (
          <>
            <ellipse cx="50" cy="38" rx="22" ry="26" {...strokeProps} />
            <polygon points="50,64 45,70 55,70" {...strokeProps} />
            <path d="M50 70 Q42 78 52 84 T48 94" {...strokeProps} fill="none" />
            <path d="M38 26 Q34 34 36 44" {...strokeProps} fill="none" />
          </>
        );

      case 'leao':
        return (
          <>
            {/* Mane */}
            <circle cx="50" cy="50" r="32" {...strokeProps} strokeDasharray="8 4" />
            <circle cx="30" cy="28" r="7" {...strokeProps} />
            <circle cx="70" cy="28" r="7" {...strokeProps} />
            {/* Face */}
            <circle cx="50" cy="50" r="22" {...strokeProps} />
            <circle cx="42" cy="45" r="2.5" fill="#0f172a" />
            <circle cx="58" cy="45" r="2.5" fill="#0f172a" />
            <polygon points="50,55 45,50 55,50" fill="#0f172a" />
            <path d="M43 60 Q50 65 57 60" {...strokeProps} fill="none" />
          </>
        );

      case 'foca':
        return (
          <>
            {/* Ball on nose */}
            <circle cx="50" cy="20" r="10" {...strokeProps} />
            <path d="M40 20 Q50 26 60 20" {...strokeProps} fill="none" />
            {/* Seal head & body */}
            <path
              d="M50 32 C38 32 34 44 36 56 C38 70 24 82 20 86 H80 C76 82 62 70 64 56 C66 44 62 32 50 32 Z"
              {...strokeProps}
            />
            <circle cx="45" cy="40" r="2" fill="#0f172a" />
            <circle cx="55" cy="40" r="2" fill="#0f172a" />
            {/* Flippers */}
            <ellipse cx="30" cy="72" rx="10" ry="5" transform="rotate(-25 30 72)" {...strokeProps} />
            <ellipse cx="70" cy="72" rx="10" ry="5" transform="rotate(25 70 72)" {...strokeProps} />
          </>
        );

      case 'vaca':
        return (
          <>
            {/* Horns & Ears */}
            <path d="M30 28 Q24 16 34 20" {...strokeProps} />
            <path d="M70 28 Q76 16 66 20" {...strokeProps} />
            <ellipse cx="22" cy="36" rx="8" ry="5" {...strokeProps} />
            <ellipse cx="78" cy="36" rx="8" ry="5" {...strokeProps} />
            {/* Head */}
            <rect x="28" y="24" width="44" height="48" rx="18" {...strokeProps} />
            {/* Snout */}
            <ellipse cx="50" cy="64" rx="24" ry="14" {...strokeProps} />
            <circle cx="42" cy="62" r="2.5" fill="#0f172a" />
            <circle cx="58" cy="62" r="2.5" fill="#0f172a" />
            {/* Eyes */}
            <circle cx="41" cy="40" r="2.5" fill="#0f172a" />
            <circle cx="59" cy="40" r="2.5" fill="#0f172a" />
          </>
        );

      case 'pato':
        return (
          <>
            {/* Body */}
            <path
              d="M24 62 C20 50 32 48 44 50 C58 52 76 48 80 62 C82 76 66 84 46 84 C28 84 22 74 24 62 Z"
              {...strokeProps}
            />
            {/* Head */}
            <circle cx="38" cy="34" r="14" {...strokeProps} />
            {/* Beak */}
            <path d="M24 32 L12 36 L24 40 Z" {...strokeProps} />
            <circle cx="35" cy="31" r="2.2" fill="#0f172a" />
            {/* Wing */}
            <path d="M44 62 Q58 56 66 68 Q54 74 44 62 Z" {...strokeProps} />
          </>
        );

      case 'sapo':
        return (
          <>
            <ellipse cx="50" cy="60" rx="28" ry="20" {...strokeProps} />
            <circle cx="36" cy="36" r="10" {...strokeProps} />
            <circle cx="64" cy="36" r="10" {...strokeProps} />
            <circle cx="36" cy="36" r="3.5" fill="#0f172a" />
            <circle cx="64" cy="36" r="3.5" fill="#0f172a" />
            <path d="M32 60 Q50 72 68 60" {...strokeProps} fill="none" />
          </>
        );

      case 'peixe':
        return (
          <>
            <polygon points="72,50 90,32 90,68" {...strokeProps} />
            <ellipse cx="46" cy="50" rx="28" ry="20" {...strokeProps} />
            <circle cx="30" cy="45" r="3" fill="#0f172a" />
            <path d="M40 38 Q34 50 40 62" {...strokeProps} fill="none" />
            <path d="M52 42 Q58 50 52 58" {...strokeProps} fill="none" />
          </>
        );

      case 'passaro':
        return (
          <>
            <polygon points="76,40 88,44 76,48" {...strokeProps} />
            <circle cx="64" cy="42" r="14" {...strokeProps} />
            <ellipse cx="44" cy="58" rx="22" ry="16" {...strokeProps} />
            <circle cx="68" cy="39" r="2.2" fill="#0f172a" />
            <path d="M34 54 Q46 46 54 58 Q44 66 34 54 Z" {...strokeProps} />
            <line x1="40" y1="74" x2="36" y2="86" {...strokeProps} />
            <line x1="50" y1="74" x2="54" y2="86" {...strokeProps} />
          </>
        );

      case 'cachorro':
        return (
          <>
            <ellipse cx="26" cy="48" rx="8" ry="16" transform="rotate(15 26 48)" {...strokeProps} />
            <ellipse cx="74" cy="48" rx="8" ry="16" transform="rotate(-15 74 48)" {...strokeProps} />
            <circle cx="50" cy="50" r="22" {...strokeProps} />
            <circle cx="42" cy="44" r="2.5" fill="#0f172a" />
            <circle cx="58" cy="44" r="2.5" fill="#0f172a" />
            <ellipse cx="50" cy="54" rx="5" ry="3.5" fill="#0f172a" />
            <path d="M42 62 Q50 68 58 62" {...strokeProps} fill="none" />
          </>
        );

      case 'borboleta':
        return (
          <>
            <ellipse cx="32" cy="38" rx="18" ry="14" {...strokeProps} />
            <ellipse cx="68" cy="38" rx="18" ry="14" {...strokeProps} />
            <ellipse cx="34" cy="64" rx="14" ry="12" {...strokeProps} />
            <ellipse cx="66" cy="64" rx="14" ry="12" {...strokeProps} />
            <rect x="46" y="28" width="8" height="46" rx="4" {...strokeProps} />
            <path d="M48 28 Q40 16 34 18" {...strokeProps} fill="none" />
            <path d="M52 28 Q60 16 66 18" {...strokeProps} fill="none" />
          </>
        );

      case 'abelha':
        return (
          <>
            <ellipse cx="42" cy="32" rx="10" ry="14" {...strokeProps} />
            <ellipse cx="58" cy="32" rx="10" ry="14" {...strokeProps} />
            <ellipse cx="50" cy="56" rx="26" ry="18" {...strokeProps} />
            <line x1="42" y1="39" x2="42" y2="73" {...strokeProps} />
            <line x1="56" y1="39" x2="56" y2="73" {...strokeProps} />
            <circle cx="32" cy="52" r="2.5" fill="#0f172a" />
            <polygon points="76,56 86,52 86,60" fill="#0f172a" />
          </>
        );

      case 'elefante':
        return (
          <>
            <ellipse cx="22" cy="48" rx="14" ry="20" {...strokeProps} />
            <ellipse cx="78" cy="48" rx="14" ry="20" {...strokeProps} />
            <circle cx="50" cy="46" r="22" {...strokeProps} />
            <path d="M44 52 v20 c0 8 12 8 12 0 v-4" {...strokeProps} />
            <circle cx="41" cy="40" r="2.5" fill="#0f172a" />
            <circle cx="59" cy="40" r="2.5" fill="#0f172a" />
          </>
        );

      case 'coelho':
        return (
          <>
            <ellipse cx="40" cy="26" rx="7" ry="18" {...strokeProps} />
            <ellipse cx="60" cy="26" rx="7" ry="18" {...strokeProps} />
            <circle cx="50" cy="58" r="22" {...strokeProps} />
            <circle cx="42" cy="52" r="2.5" fill="#0f172a" />
            <circle cx="58" cy="52" r="2.5" fill="#0f172a" />
            <polygon points="50,62 46,58 54,58" fill="#0f172a" />
            <rect x="46" y="64" width="8" height="6" {...strokeProps} />
          </>
        );

      case 'tartaruga':
        return (
          <>
            <circle cx="78" cy="52" r="10" {...strokeProps} />
            <circle cx="81" cy="50" r="2" fill="#0f172a" />
            <path d="M18 62 C18 34 68 34 68 62 Z" {...strokeProps} />
            <rect x="26" y="62" width="10" height="14" rx="4" {...strokeProps} />
            <rect x="52" y="62" width="10" height="14" rx="4" {...strokeProps} />
            <line x1="43" y1="40" x2="43" y2="62" {...strokeProps} />
            <line x1="22" y1="52" x2="64" y2="52" {...strokeProps} />
          </>
        );

      case 'urso':
        return (
          <>
            <circle cx="28" cy="28" r="10" {...strokeProps} />
            <circle cx="72" cy="28" r="10" {...strokeProps} />
            <circle cx="50" cy="52" r="26" {...strokeProps} />
            <ellipse cx="50" cy="60" rx="12" ry="9" {...strokeProps} />
            <circle cx="41" cy="44" r="2.5" fill="#0f172a" />
            <circle cx="59" cy="44" r="2.5" fill="#0f172a" />
            <circle cx="50" cy="57" r="3.5" fill="#0f172a" />
          </>
        );

      case 'maca':
        return (
          <>
            <path d="M50 28 C52 16 58 14 62 14" {...strokeProps} fill="none" />
            <ellipse cx="62" cy="22" rx="8" ry="4" transform="rotate(-20 62 22)" {...strokeProps} />
            <path
              d="M50 30 C36 24 20 36 22 56 C24 76 38 86 50 80 C62 86 76 76 78 56 C80 36 64 24 50 30 Z"
              {...strokeProps}
            />
          </>
        );

      case 'banana':
        return (
          <>
            <path
              d="M28 24 C22 52 44 82 78 76 C60 66 44 46 38 22 Z"
              {...strokeProps}
            />
          </>
        );

      case 'uva':
        return (
          <>
            <line x1="50" y1="14" x2="50" y2="26" {...strokeProps} />
            <circle cx="38" cy="34" r="9" {...strokeProps} />
            <circle cx="50" cy="34" r="9" {...strokeProps} />
            <circle cx="62" cy="34" r="9" {...strokeProps} />
            <circle cx="44" cy="48" r="9" {...strokeProps} />
            <circle cx="56" cy="48" r="9" {...strokeProps} />
            <circle cx="50" cy="62" r="9" {...strokeProps} />
          </>
        );

      case 'sol':
        return (
          <>
            <circle cx="50" cy="50" r="20" {...strokeProps} />
            <line x1="50" y1="12" x2="50" y2="22" {...strokeProps} />
            <line x1="50" y1="78" x2="50" y2="88" {...strokeProps} />
            <line x1="12" y1="50" x2="22" y2="50" {...strokeProps} />
            <line x1="78" y1="50" x2="88" y2="50" {...strokeProps} />
            <line x1="23" y1="23" x2="30" y2="30" {...strokeProps} />
            <line x1="70" y1="70" x2="77" y2="77" {...strokeProps} />
            <line x1="77" y1="23" x2="70" y2="30" {...strokeProps} />
            <line x1="30" y1="70" x2="23" y2="77" {...strokeProps} />
          </>
        );

      case 'flor':
        return (
          <>
            <line x1="50" y1="54" x2="50" y2="88" {...strokeProps} />
            <ellipse cx="60" cy="72" rx="8" ry="4" transform="rotate(-25 60 72)" {...strokeProps} />
            <circle cx="50" cy="24" r="10" {...strokeProps} />
            <circle cx="50" cy="52" r="10" {...strokeProps} />
            <circle cx="36" cy="38" r="10" {...strokeProps} />
            <circle cx="64" cy="38" r="10" {...strokeProps} />
            <circle cx="50" cy="38" r="9" {...strokeProps} />
          </>
        );

      case 'arvore':
        return (
          <>
            <rect x="43" y="54" width="14" height="32" {...strokeProps} />
            <circle cx="36" cy="44" r="16" {...strokeProps} />
            <circle cx="64" cy="44" r="16" {...strokeProps} />
            <circle cx="50" cy="28" r="18" {...strokeProps} />
          </>
        );

      case 'estrela':
        return (
          <polygon
            points="50,12 61,36 88,39 68,57 73,84 50,70 27,84 32,57 12,39 39,36"
            {...strokeProps}
          />
        );

      case 'bola':
        return (
          <>
            <circle cx="50" cy="50" r="32" {...strokeProps} />
            <polygon points="50,36 62,45 57,60 43,60 38,45" {...strokeProps} />
            <line x1="50" y1="36" x2="50" y2="18" {...strokeProps} />
            <line x1="62" y1="45" x2="80" y2="40" {...strokeProps} />
            <line x1="57" y1="60" x2="68" y2="76" {...strokeProps} />
            <line x1="43" y1="60" x2="32" y2="76" {...strokeProps} />
            <line x1="38" y1="45" x2="20" y2="40" {...strokeProps} />
          </>
        );

      case 'lapis':
        return (
          <>
            <polygon points="24,76 34,54 46,66" {...strokeProps} />
            <polygon points="34,54 68,20 80,32 46,66" {...strokeProps} />
            <polygon points="24,76 28,67 33,72" fill="#0f172a" />
          </>
        );

      case 'livro':
        return (
          <>
            <path d="M16 28 Q33 22 50 30 Q67 22 84 28 V74 Q67 68 50 76 Q33 68 16 74 Z" {...strokeProps} />
            <line x1="50" y1="30" x2="50" y2="76" {...strokeProps} />
          </>
        );

      case 'carro':
        return (
          <>
            <path d="M16 62 L26 40 H66 L80 54 H86 V70 H14 V62 Z" {...strokeProps} />
            <circle cx="30" cy="70" r="10" {...strokeProps} />
            <circle cx="70" cy="70" r="10" {...strokeProps} />
            <line x1="46" y1="40" x2="46" y2="60" {...strokeProps} />
          </>
        );

      case 'foguete':
        return (
          <>
            <polygon points="26,64 14,78 32,74" {...strokeProps} />
            <polygon points="74,64 86,78 68,74" {...strokeProps} />
            <path d="M50 14 C34 28 32 54 32 74 H68 C68 54 66 28 50 14 Z" {...strokeProps} />
            <circle cx="50" cy="44" r="9" {...strokeProps} />
          </>
        );

      case 'robo':
        return (
          <>
            <line x1="50" y1="12" x2="50" y2="24" {...strokeProps} />
            <circle cx="50" cy="12" r="4" {...strokeProps} />
            <rect x="28" y="24" width="44" height="34" rx="6" {...strokeProps} />
            <circle cx="40" cy="38" r="4" {...strokeProps} />
            <circle cx="60" cy="38" r="4" {...strokeProps} />
            <rect x="38" y="48" width="24" height="5" {...strokeProps} />
            <rect x="24" y="62" width="52" height="24" rx="4" {...strokeProps} />
          </>
        );

      case 'coroa':
        return (
          <>
            <polygon points="16,72 16,32 34,50 50,24 66,50 84,32 84,72" {...strokeProps} />
            <circle cx="16" cy="28" r="4" {...strokeProps} />
            <circle cx="50" cy="20" r="4" {...strokeProps} />
            <circle cx="84" cy="28" r="4" {...strokeProps} />
          </>
        );

      case 'pipa':
        return (
          <>
            <polygon points="50,14 78,44 50,74 22,44" {...strokeProps} />
            <line x1="50" y1="14" x2="50" y2="74" {...strokeProps} />
            <line x1="22" y1="44" x2="78" y2="44" {...strokeProps} />
            <path d="M50 74 Q42 84 54 92" {...strokeProps} fill="none" />
          </>
        );

      default:
        // Friendly star-burst / badge frame for any other keyword
        return (
          <>
            <rect x="18" y="18" width="64" height="64" rx="14" {...strokeProps} />
            <polygon
              points="50,26 57,41 73,43 61,54 64,70 50,62 36,70 39,54 27,43 43,41"
              {...strokeProps}
            />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderShape()}
    </svg>
  );
}
