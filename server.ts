import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAiClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const AVAILABLE_ICON_KEYS = [
  'bolo', 'dado', 'casa', 'gato', 'fada', 'macaco', 'jacare', 'lua',
  'palhaco', 'tenda', 'pipoca', 'magico', 'balao', 'leao', 'foca', 'malabarista',
  'vaca', 'pato', 'sapo', 'cavalo', 'peixe', 'passaro', 'cachorro', 'borboleta',
  'abelha', 'elefante', 'girafa', 'coelho', 'tartaruga', 'urso', 'ovelha', 'porco',
  'maca', 'banana', 'uva', 'abacaxi', 'morango', 'laranja', 'melancia', 'pera',
  'sol', 'flor', 'arvore', 'nuvem', 'estrela', 'arcoiris', 'foguete', 'planeta',
  'bola', 'lapis', 'livro', 'mochila', 'carro', 'trem', 'aviao', 'barco',
  'robo', 'coroa', 'violao', 'tambor', 'pipa', 'boneca', 'dinossauro', 'castelo'
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // 1. Generate complete structured A4 worksheet via Gemini
  app.post('/api/worksheets/generate', async (req, res) => {
    try {
      const {
        theme = 'Animais e Brincadeiras',
        pedagogicalGoal = 'Sílabas simples e consciência fonológica',
        activityType = 'syllables',
        difficulty = 'facil',
        itemCount = 8,
      } = req.body || {};

      const ai = getAiClient();

      const prompt = `Você é um especialista em alfabetização infantil e matemática para os anos iniciais do Ensino Fundamental (1º e 2º ano no Brasil).
Crie uma folha de atividade visual completa em Português do Brasil sobre:
- TEMA LÚDICO: "${theme}"
- CONTEÚDO / HABILIDADE PEDAGÓGICA: "${pedagogicalGoal}"
- FORMATO DA ATIVIDADE: "${activityType}" (opções: "syllables", "visual_math", "matching", "word_puzzle")
- NÍVEL DE DIFICULDADE: "${difficulty}"
- QUANTIDADE DE EXERCÍCIOS: ${itemCount}

REGRAS OBRIGATÓRIAS:
1. Use vocabulário infantil adequado para crianças de 5 a 8 anos em fase inicial de alfabetização.
2. Separe as sílabas de cada palavra com total precisão ortográfica em português (ex: "BO-LO", "CA-SA", "MA-CA-CO", "JA-CA-RÉ", "PA-LHA-ÇO", "LE-ÃO").
3. Para cada item, escolha o melhor "iconKey" da lista disponível: [${AVAILABLE_ICON_KEYS.join(', ')}].
4. Caso a palavra do tema NÃO tenha um ícone correspondente exato na lista acima, gere também no campo "customSvg" o código interno de elementos SVG (<path>, <circle>, <rect>, <polygon>, <line>) desenhados para um viewBox="0 0 100 100", com traço preto grosso (stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round") no estilo desenho infantil para colorir!
5. Preencha os dados específicos do formato solicitado:
   - Se "syllables": gere ${itemCount} palavras em "syllableItems" com a sílaba faltante (normalmente a primeira sílaba, missingIndex = 0).
   - Se "visual_math": gere 4 a 5 somas visuais simples (números entre 1 e 5 em cada mão/grupo, soma máxima até 10) em "mathItems". Escolha visualStyle = "fingers" se o tema ou objetivo envolver contar nos dedos, ou "theme_icons" para contar figuras do tema.
   - Se "matching": gere 6 pares de associação imagem <-> palavra/sílaba em "matchingItems".
   - Se "word_puzzle": gere 6 palavras simples (de 3 a 7 letras, sem espaços) com dicas infantis curtas em "puzzleWords".`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'Título curto e lúdico da folha de atividade em português.',
              },
              instruction: {
                type: Type.STRING,
                description: 'Enunciado claro para o aluno (ex: Complete as palavras com as sílabas abaixo:).',
              },
              teacherTip: {
                type: Type.STRING,
                description: 'Dica rápida de mediação pedagógica em sala de aula para o professor.',
              },
              bnccCode: {
                type: Type.STRING,
                description: 'Código e habilidade da BNCC relacionada (ex: EF01LP08 ou EF01MA06).',
              },
              syllableItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    syllables: { type: Type.ARRAY, items: { type: Type.STRING } },
                    missingIndex: { type: Type.INTEGER },
                    iconKey: { type: Type.STRING },
                    customSvg: {
                      type: Type.STRING,
                      description: 'Elementos SVG internos opcionais para viewBox 0 0 100 100 em preto e branco para colorir.',
                    },
                  },
                  required: ['word', 'syllables', 'missingIndex', 'iconKey'],
                },
              },
              mathItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    leftCount: { type: Type.INTEGER },
                    rightCount: { type: Type.INTEGER },
                    operator: { type: Type.STRING },
                    visualStyle: { type: Type.STRING },
                    iconKey: { type: Type.STRING },
                    itemLabel: { type: Type.STRING },
                  },
                  required: ['leftCount', 'rightCount', 'operator', 'visualStyle', 'iconKey', 'itemLabel'],
                },
              },
              matchingItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    syllableHint: { type: Type.STRING },
                    iconKey: { type: Type.STRING },
                    customSvg: { type: Type.STRING },
                  },
                  required: ['word', 'syllableHint', 'iconKey'],
                },
              },
              puzzleWords: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    hint: { type: Type.STRING },
                    iconKey: { type: Type.STRING },
                    customSvg: { type: Type.STRING },
                  },
                  required: ['word', 'hint', 'iconKey'],
                },
              },
            },
            required: ['title', 'instruction', 'teacherTip', 'bnccCode'],
          },
        },
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Error generating worksheet:', error);
      res.status(500).json({
        error: error?.message || 'Não foi possível gerar a atividade com IA no momento.',
      });
    }
  });

  // 2. Generate a custom coloring-book SVG illustration for any word
  app.post('/api/worksheets/draw-icon', async (req, res) => {
    try {
      const { word = 'Estrela' } = req.body || {};
      const ai = getAiClient();

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Desenhe uma ilustração infantil simples em estilo livro de colorir (apenas traços pretos nítidos em fundo branco, sem preenchimento escuro) representando a palavra "${word}".
Retorne APENAS os elementos internos de um SVG para viewBox="0 0 100 100" usando tags <path>, <circle>, <rect>, <ellipse>, <polygon> ou <line> com stroke="#0f172a", stroke-width="3.5", fill="none" (ou fill="#ffffff"), stroke-linecap="round", stroke-linejoin="round".`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              svgInner: {
                type: Type.STRING,
                description: 'Tags internas do SVG (<path .../>, <circle .../>) dentro de um viewBox 0 0 100 100.',
              },
            },
            required: ['svgInner'],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim());
      res.json(parsed);
    } catch (error: any) {
      console.error('Error drawing custom SVG icon:', error);
      res.status(500).json({
        error: error?.message || 'Não foi possível desenhar a figura.',
      });
    }
  });

  // 3. Search the web for free educational worksheet references and ideas using Google Search Grounding
  app.post('/api/worksheets/search-web', async (req, res) => {
    try {
      const {
        theme = 'Animais',
        pedagogicalGoal = 'Completar sílabas alfabetização',
      } = req.body || {};

      const ai = getAiClient();

      const searchPrompt = `Pesquise na internet referências gratuitas, atividades para imprimir do ensino primário / educação infantil e ideias práticas de folhas de exercícios em português sobre:
Tema: "${theme}"
Conteúdo pedagógico: "${pedagogicalGoal}"

Estruture a resposta em Markdown claro e objetivo contendo:
1. **Resumo de Ideias Encontradas na Web**: 3 a 4 formatos de atividades visuais muito usados por professores brasileiros para esse tema e conteúdo.
2. **Palavras e Exemplos Recomendados**: Uma seleção de palavras, sílabas ou desafios matemáticos prontos para usar na folha A4.
3. **Como Aplicar e Adaptar em Sala**: Orientações rápidas e gratuitas para impressão e mediação com os alunos.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: searchPrompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links: Array<{ title: string; uri: string }> = [];
      const seenUris = new Set<string>();

      for (const chunk of rawChunks) {
        const web = (chunk as any)?.web;
        if (web?.uri && !seenUris.has(web.uri)) {
          seenUris.add(web.uri);
          links.push({
            title: web.title || web.uri,
            uri: web.uri,
          });
        }
      }

      res.json({
        summaryMarkdown: response.text || 'Nenhuma descrição encontrada.',
        links,
        queryUsed: `${pedagogicalGoal} tema ${theme} atividades para imprimir educação infantil`,
      });
    } catch (error: any) {
      console.error('Error searching web references:', error);
      res.status(500).json({
        error: error?.message || 'Não foi possível buscar referências na web no momento.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Estúdio Alfabetizar server running on http://localhost:${PORT}`);
  });
}

startServer();
