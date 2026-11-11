# Estúdio Alfabetizar — Gerador Gratuito de Atividades Visuais para o Ensino Primário

O **Estúdio Alfabetizar** é uma plataforma web gratuita e de código aberto criada para ajudar professores da Educação Infantil e das séries iniciais do Ensino Fundamental (1º e 2º ano) a montar, personalizar e imprimir folhas de atividades visuais em formato **A4** em poucos segundos.

---

## Principais Funcionalidades

1. **4 Formatos de Atividades Visuais Clássicas (Alinhadas à BNCC)**:
   - **Completar Sílabas e Letras Faltantes**: Quadro superior com banco de sílabas e exercícios ilustrados em duas colunas com separação silábica automática.
   - **Contagem e Soma Visual com os Dedinhos / Figuras**: Reta numérica de `0 a 9` no topo e adições visuais usando ilustrações de mãos mostrando os dedinhos levantados ou figuras do tema escolhido.
   - **Ligar Imagens às Palavras**: Colunas de associação entre figuras para colorir e palavras em letra bastão (Caixa Alta) com apoio silábico.
   - **Caça-Palavras e Cruzadinhas Ilustradas**: Grade de letras gerada automaticamente acompanhada de dicas visuais ilustradas.

2. **Ilustrações em Preto e Branco Prontas para Colorir**:
   - Mais de 50 ilustrações vetoriais em traço limpo (estilo livro de colorir) que economizam tinta/toner na impressora da escola e permitem que as crianças pintem as figuras.
   - Gerador de novas figuras para colorir via Inteligência Artificial diretamente no seletor de imagens.

3. **Arquitetura Híbrida 100% Gratuita (IA + Motor Pedagógico Local)**:
   - **Modo IA + Google Search Grounding**: Quando executado com uma chave gratuita `GEMINI_API_KEY` (Free Tier do Google AI Studio), utiliza o modelo `gemini-3.8-flash` para criar atividades inéditas sob medida e pesquisar referências educativas na web em tempo real.
   - **Modo Estático / Vitrine (Custo Zero & GitHub Pages)**: Funciona **mesmo sem servidor backend ou chave de API** graças ao motor pedagógico local integrado (`localPedagogicalEngine.ts`), permitindo hospedar gratuitamente no **GitHub Pages**, **Vercel** ou **Netlify** como vitrine interativa.

4. **Edição Livre na Folha A4 & Impressão Direta**:
   - Clique diretamente sobre o cabeçalho escolar (*Escola, Nome, Data, Turma*), título, enunciado, sílabas ou figuras para editar.
   - Alterne com um clique entre a **Folha do Aluno** e o **Gabarito do Professor**.
   - Folha de estilo `@media print` dedicada que remove todos os menus e exporta a página em formato **A4 Retrato** exato ou **PDF**.

---

## Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Backend (Opcional para IA & Busca Web)**: Node.js, Express, `@google/genai` (`gemini-3.8-flash`)
- **Build & Tooling**: Vite

---

## Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. (Opcional) Configurar chave gratuita do Gemini no arquivo .env
cp .env.example .env
# Edite GEMINI_API_KEY="sua_chave_gratuita_aqui"

# 3. Iniciar o servidor de desenvolvimento (porta 3000)
npm run dev
```

---

## Como Publicar Gratuitamente no GitHub Pages (Vitrine)

Este repositório já inclui o workflow oficial do GitHub Actions em `.github/workflows/deploy-pages.yml`.

1. Envie este projeto para um repositório no seu GitHub.
2. No seu repositório do GitHub, acesse **Settings > Pages**.
3. Em **Build and deployment > Source**, selecione **GitHub Actions**.
4. A cada push na branch `main`, o GitHub publicará automaticamente a versão interativa gratuita do **Estúdio Alfabetizar**.

---

## Licença

Distribuído sob a licença **MIT**. Uso livre e gratuito para professores, escolas e projetos educacionais.
