// ============================================================================
// ARQUITETURA DO ACERVO MULTIGÊNERO E MULTIMODAL (ETAPA E1 - DUA & ACESSIBILIDADE)
// ============================================================================

// 1. Catálogo unificado de gêneros textuais suportados na arquitetura
export type TextGenre =
  | "conto"
  | "fabula"
  | "lenda"
  | "poema"
  | "parlenda"
  | "cantiga"
  | "trava-lingua"
  | "adivinha"
  | "tirinha"
  | "historia-em-quadrinhos"
  | "bilhete"
  | "convite"
  | "receita"
  | "lista"
  | "instrucao-regra"
  | "cartaz"
  | "anuncio"
  | "noticia-infantil"
  | "texto-informativo"
  | "mapa"
  | "tabela"
  | "grafico"
  | "infografico"
  | "outro-multissemiotico";

// 2. Formas estruturais de apresentação visual e tipográfica do gênero
export type ReadingLayoutType =
  | "paragrafos" // Narrativas contínuas (contos, fábulas, lendas, notícias, informativos)
  | "versos-estrofes" // Textos poéticos e rítmicos (poemas, parlendas, cantigas)
  | "quadros-tiras" // Narrativas gráficas (tirinhas, HQs com vinhetas e balões)
  | "etapas-passos" // Textos instrucionais (receitas com ingredientes + modo de preparo, regras)
  | "itens-topicos" // Textos pontuais e de convívio social (listas, bilhetes, convites)
  | "cartaz-mural" // Textos publicitários e de aviso (slogan, chamada, elementos visuais)
  | "dados-diagramas"; // Textos multissemióticos estruturados (tabelas, mapas, gráficos)

// 3. Suporte multimodal: imagens, gravuras, pictogramas e elementos visuais
export interface VisualMedia {
  url?: string; // Caminho local (preferencial para independência de rede) ou data URI
  altText: string; // Descrição textual acessível obrigatória para leitores de tela (WCAG)
  caption?: string; // Legenda explicativa visível para apoio à mediação
  role?:
    | "ilustracao-cenario"
    | "quadro-hq"
    | "pictograma"
    | "foto-informativa"
    | "diagrama-tabela"
    | "elemento-cartaz"
    | "apoio-resposta";
  visualSequenceOrder?: number; // Posição ordinal na sequência visual (apoio a DUA e ordenação)
}

// 4. Elementos específicos de quadrinhos e narrativas dialogadas
export interface ComicBalloon {
  characterName?: string; // Personagem que expressa a fala/pensamento
  balloonType: "fala" | "pensamento" | "grito" | "sussurro" | "narrador-legenda";
  text: string;
  audioPrompt?: string; // Texto adaptado para síntese de voz (TTS) do balão
  characterAvatar?: VisualMedia; // Ícone ou representação visual do personagem
}

// 5. Linhas e células para dados tabulares ou esquemáticos
export interface TableRowData {
  cells: string[];
  isHeader?: boolean;
}

// 6. Bloco de Conteúdo Modular (uma página, estrofe, quadro de tirinha, etapa ou cartão)
export interface ReadingContentBlock {
  id: string;
  orderIndex: number;
  blockTitle?: string; // Ex.: "Ingredientes", "Modo de Fazer", "Quadro 1", "Estrofe 2"

  // Conteúdo verbal
  paragraphs?: string[]; // Parágrafos de texto corrido
  verses?: string[]; // Versos de uma estrofe (para poemas, parlendas, cantigas)

  // Conteúdo para quadrinhos e tirinhas
  balloons?: ComicBalloon[];

  // Conteúdo para textos instrucionais e listas
  itemsOrSteps?: string[];

  // Conteúdo para tabelas e infográficos
  tableData?: TableRowData[];

  // Multimodalidade integrada: imagem associada ao bloco
  visualMedia?: VisualMedia;
  visualSequence?: VisualMedia[]; // Sequência temporal ou ilustrativa vinculada

  // Áudio e narração
  audioText?: string; // Texto específico para o sintetizador de voz narrar este bloco

  // Preparação de metadados para tecnologias assistivas e DUA (estrutural, não implementado)
  accessibilityMetadata?: {
    hasVisualDescription: boolean;
    signLanguageReady: boolean; // Indica se a estrutura tem metadados para futura inserção de Libras
    pictogramReady: boolean; // Indica se a estrutura prevê associação com pictogramas
    screenReaderOptimized: boolean; // Indica se há marcação semântica pronta para leitores de tela
  };
}

// 7. Palavras-Desafio e Vocabulário com apoio multimodal (DUA)
export interface ReadingGlossaryWord {
  word: string;
  syllables: string; // Divisão silábica para consciência fonológica (ex.: "pla-ní-cie")
  definition: string;
  contextualSentence?: string; // Exemplo de uso na frase
  visualAid?: VisualMedia; // Pictograma ou gravura de apoio ao significado (DUA)
}

// 8. Dimensões cognitivas formativas dos desafios de leitura
export type ReadingCognitiveDimension = "compreensao" | "interpretacao" | "inferencia";

export type ReadingCognitiveSubfocus =
  // Compreensão (localização de dados, assunto, sequência, rimas e reconto)
  | "informacao-explicita"
  | "assunto-principal"
  | "sequencia-acontecimentos"
  | "reconto-factual"
  | "recursos-sonoros-rima"
  // Interpretação (finalidade comunicativa, sentidos e mensagem)
  | "finalidade-comunicativa"
  | "construcao-sentidos"
  | "mensagem-ou-moral"
  | "relacao-elementos-texto"
  // Inferência (pistas, informações implícitas, causa/consequência, texto x imagem)
  | "identificacao-pistas"
  | "informacao-implicita"
  | "causa-consequencia"
  | "predicao-antecipacao"
  | "relacao-texto-imagem-contexto";

// 9. Múltiplas formas de expressão e resposta (DUA)
export type ChallengeResponseFormat =
  | "multipla-escolha-texto" // Múltipla escolha tradicional com alternativas escritas
  | "escolha-imagem" // Seleção entre alternativas com gravuras (DUA para apoio visual)
  | "ordenacao-sequencial" // Ordenação de acontecimentos (cartões/quadros em ordem)
  | "reconto-guiado" // Reconto oral compartilhado ou apoiado por tópicos
  | "escrita-reflexiva" // Pequena resposta redigida pelo estudante
  | "resposta-oral-futura"; // Espaço estrutural reservado para futura entrada de voz/microfone

// 10. Opções de resposta para os desafios formativos
export interface ChallengeOption {
  id: string;
  text?: string; // Texto da alternativa
  visualMedia?: VisualMedia; // Alternativa por imagem ou pictograma (DUA)
  isCorrect?: boolean; // Indicador de correspondência com a evidência do texto
  pedagogicalFeedback?: string; // Devolutiva formativa carinhosa e explicativa (sem nota)
}

// 11. Estrutura completa de um Desafio Pedagógico Formativo
export interface ReadingChallenge {
  id: string;
  dimension: ReadingCognitiveDimension; // Compreensão, Interpretação ou Inferência
  subfocus: ReadingCognitiveSubfocus; // Foco específico observado
  responseFormat: ChallengeResponseFormat; // Formato de resposta (DUA)
  prompt: string; // Enunciado da pergunta ou convite reflexivo
  promptAudioText?: string; // Áudio/TTS para leitura acessível do enunciado
  options?: ChallengeOption[]; // Opções para escolha simples ou visual
  correctAnswerIndex?: number; // Compatibilidade com a interface Question anterior
  sequenceCorrectOrder?: string[]; // Ordem correta de IDs (para desafios de ordenação)
  guidingHints?: string[]; // Dicas pedagógicas de apoio mediado da professora
  formativeObjective: string; // Descrição formativa da habilidade (sem rótulos ou notas)
}

// 12. Declaração do estado real de acessibilidade e DUA do item
export interface ReadingAccessibilityDeclaration {
  hasAudioSupport: boolean; // Áudio/TTS funcionalmente ativo e testado
  hasVisualSupport: boolean; // Contém gravuras, fotos ou tirinhas visuais ativas
  hasAlternativeResponseFormats: boolean; // Permite responder por imagem ou ordenação
  // DECLARAÇÕES HONESTAS (Distinção entre funcional vs. estruturalmente preparado):
  preparedForSignLanguage: boolean; // Estruturalmente preparado (NÃO há vídeos em Libras no momento)
  preparedForBrailleScreenReaders: boolean; // Estrutura possui altText para leitores de tela
  preparedForPictograms: boolean; // Estruturalmente preparado para símbolos de comunicação
}

// 13. MODELO UNIFICADO E ESCALÁVEL DO ACERVO DE LEITURA (ReadingItem)
export interface ReadingItem {
  id: string; // Identificador único
  title: string; // Título da obra
  subtitle?: string; // Subtítulo ou linha de apoio
  genre: TextGenre; // Gênero textual padronizado
  genreDisplayLabel: string; // Rótulo em português (ex.: "Conto", "Fábula", "Tirinha", "Poema")
  authorOrOrigin?: string; // Autor, tradição popular, domínio público ou fonte
  theme?: string; // Tema do texto (Animais, Amizade, Natureza, Cotidiano, etc.)
  coverImageUrl?: string; // Ilustração real da capa da obra (opcional, com fallback honesto)
  
  // Estrutura de layout e apresentação
  layoutType: ReadingLayoutType;

  // Blocos sequenciais de conteúdo (páginas, estrofes, quadros ou passos)
  blocks: ReadingContentBlock[];

  // Palavras-desafio e vocabulário contextualizado
  glossary?: ReadingGlossaryWord[];

  // Desafios formativos de compreensão, interpretação e inferência
  challenges?: ReadingChallenge[];

  // Declaração de acessibilidade e DUA
  accessibility: ReadingAccessibilityDeclaration;

  // Diretrizes pedagógicas formativas para apoio ao planejamento docente
  pedagogicalGuidelines?: {
    recommendedYearGroup?: string; // Ex.: "Ciclo de Alfabetização • Ensino Fundamental"
    bnccSkillsFocus?: string[]; // Ex.: ["EF15LP03", "EF12LP01", "EF15LP14"]
    duaPedagogicalTips?: string[]; // Orientações de mediação para o professor
  };

  // Ponte pedagógica para integração modular (opcionais)
  featuredWordIds?: string[];
  targetSentences?: string[];
  writingPrompt?: {
    theme: string;
    clue: string;
    placeholder: string;
  };
}

export interface DifficultWord {
  word: string;
  syllables: string;
  definition: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  dimension?: ReadingCognitiveDimension;
  subfocus?: ReadingCognitiveSubfocus;
  formativeObjective?: string;
}

export interface StoryData {
  title: string;
  story: string[];
  difficultWords: DifficultWord[];
  questions: Question[];
}

export interface WritingFeedback {
  teacherFeedback: string;
  reconstructedText: string;
  strengths: string[];
  sparklyMission: string;
}

export interface LiteracyGameQuestion {
  id: string;
  gameType: "complete-syllable" | "find-word" | "count-syllables" | "rhyme-time";
  title: string;
  clue: string;
  wordRepresented: string;
  displayWord: string;
  options: string[];
  correctAnswer: number;
  funExplanation: string;
}

export interface StudentProgress {
  readingPoints: number; // pontos acumulados
  storiesReadCount: number; // quantidade de histórias realizadas
  quizzesAnswered: number; // quantidade de quizzes concluídos
  quizzesCorrect: number; // quantidade de acertos em quizzes
  writingsCompleted: number; // quantidade de produções textuais
  gamesPlayed: number; // quantidade de minijogos realizados
  gamesCorrect: number; // quantidade de acertos nos minijogos
  unlockedBadgeIds: string[]; // medalhas/distintivos conquistados
  readingFluencyPercentage: number; // nome legado: índice gamificado de atividades; não mede fluência oral
  textualComprehensionPercentage: number; // nome legado: desafios com acerto integral; não mede compreensão global
}

// Tipo compatível com StudentProgress
export type StudentStats = StudentProgress;

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// ==========================================
// MÓDULO DE AVALIAÇÃO DE LEITURA (SONDAGEM)
// ==========================================

// 1. Os 6 níveis pedagógicos de desenvolvimento leitor (e estado formativo em observação)
export type ReadingDevelopmentProfile =
  | "nao_leitor"
  | "leitor_silabas"
  | "leitor_palavras"
  | "leitor_frases"
  | "leitor_textos_sem_fluencia"
  | "leitor_textos_com_fluencia"
  | "em_observacao";

// 2. Condição em que a leitura foi realizada
export type ReadingCondition = "autonoma" | "compartilhada" | "com_apoio";

// 3. Status formativo de observação (sem notas ou pontos)
export type ObservationStatus =
  | "consolidado"
  | "em_desenvolvimento"
  | "necessita_mediacao"
  | "nao_observado";

// 4. Aspectos observáveis durante a leitura oral
export interface OralReadingObservation {
  decoding: ObservationStatus; // Decodificação e reconhecimento de palavras
  soundLetterSwapsOrOmissions: ObservationStatus; // Trocas de sons/letras ou omissões
  spontaneousSelfCorrection: ObservationStatus; // Autocorreção espontânea
  punctuationAndPauses: ObservationStatus; // Respeito à pontuação e pausas
  rhythmAndIntonation: ObservationStatus; // Ritmo e entonação leitora
  wordReading?: ObservationStatus; // Leitura de palavras isoladas (Registro Rápido)
  sentenceOrTextReading?: ObservationStatus; // Leitura de frases ou textos contínuos (Registro Rápido)
  observedFluency?: ObservationStatus; // Fluência observada global (Registro Rápido)
}

// 5. Compreensão textual observada
export interface ComprehensionObservation {
  explicitInformation: ObservationStatus; // Localização de informações explícitas
  inferences: ObservationStatus; // Realização de inferências e deduções
  globalComprehension: ObservationStatus; // Compreensão global e reconto com próprias palavras
}

// 6. Estrutura de dados cadastrais do Estudante
export interface Student {
  id: string; // Identificador interno único gerado pelo sistema
  name: string; // Nome completo do estudante
  classroom: string; // Turma (ex: Turma A)
  gradeLevel: string; // Ano escolar (ex: 1º Ano Ens. Fundamental)
  status: "ativo" | "inativo"; // Situação cadastral no sistema
  createdAt: string; // Data de cadastro (AAAA-MM-DD)
  customNextStep?: string; // Próximo passo pedagógico registrado livremente pela professora (Etapa D)
  customNextStepDate?: string; // Data do registro do próximo passo (AAAA-MM-DD)
  familyGuidance?: string; // Mensagem aprovada explicitamente pelo professor para compartilhar
  learningSupportPreset?: "maior_apoio" | "apoio_intermediario" | "maior_autonomia";
 communityLabel?: string;
 communityActivity?: {title:string;text:string;prompt:string;options:string[];correct:number};
 learningContext?: "infancia" | "eja"; // Escolha docente; nunca inferida por idade ou desempenho
  // Camada de Identidade Infantil Integrada (FluiLer)
  nickname?: string; // Apelido carinhoso ou nome social preferido da criança
  avatarId?: string; // Identificador do avatar acolhedor escolhido da galeria
  voicePreferenceId?: string; // Nome/identificador da voz de leitura sintetizada preferida
}

// 7. Estrutura completa de uma Avaliação de Leitura formativa
export type AssessmentEvidenceSource = "ia" | "professora" | "sondagem" | "historico";

export interface CollaborativeAudioEvidence {
  audioDurationSeconds: number; // Duração real em segundos
  vocalActivityDetected: boolean; // Presença de voz vs silêncio
  detectablePausesCount: number; // Pausas prolongadas (> 1.5s)
  attemptsCount: number; // Tentativas / regravações da criança
  anchorWordsRecognized?: string[]; // Palavras-âncora detectadas (evidência preliminar)
  totalAnchorWords?: number; // Total de palavras-âncora do texto
  technicalReliability: "alta" | "media" | "preliminar" | "nao_disponivel";
  technicalNote: string; // Nota ética sobre a evidência técnica
}

export interface CollaborativeDivergenceItem {
  indicator: string;
  aiEvidence: string;
  teacherObservation: string;
  pedagogicalNote: string;
}

export interface CollaborativeConvergenceItem {
  indicator: string;
  description: string;
}

export interface CollaborativeEvidenceItem {
  text: string;
  source: AssessmentEvidenceSource;
}

export interface CollaborativeReadingMapping {
  strengths: CollaborativeEvidenceItem[];
  developingAspects: CollaborativeEvidenceItem[];
  learningNeeds: CollaborativeEvidenceItem[];
  recommendedUdlSupports: string[];
  pedagogicalObjective: string;
  trailNextStep: string;
  triangulationStatus: "convergencia" | "divergencia" | "apenas_docente" | "sem_audio";
  divergences: CollaborativeDivergenceItem[];
  convergences: CollaborativeConvergenceItem[];
}

export interface ReadingAssessment {
  id: string; // Identificador único do registro
  studentId?: string; // Vínculo com o estudante cadastrado (opcional para manter compatibilidade com avaliações antigas)
  studentName: string; // Nome do estudante
  classroom: string; // Turma (ex: Turma A)
  gradeLevel: string; // Ano escolar (ex: 1º Ano Ens. Fundamental)
  assessmentDate: string; // Data da avaliação (AAAA-MM-DD)
  textTitle: string; // Título do texto de referência
  textGenre: string; // Gênero textual (Poema, Conto, Tirinha, etc.)
  readingItemId?: string; // ID do ReadingItem da Coleção selecionado na sondagem
  selectedTextContent?: string; // Trecho ou texto completo real utilizado na leitura oral
  readingCondition: ReadingCondition; // Autônoma, compartilhada ou com apoio
  usedSupports: string[]; // Apoios utilizados (ex: apontar com o dedo, pistas visuais)
  readingProfile: ReadingDevelopmentProfile; // Classificação pedagógica atribuída pela professora
  assessmentOrigin?: "sondagem_formativa" | "avaliacao_docente" | "leitura_oral_observada" | "leitura_oral_colaborativa"; // Fidelidade da evidência
  oralReadingObserved?: boolean; // Se houve efetiva escuta e observação de leitura oral
  oralReading: OralReadingObservation; // Observações da leitura oral
  comprehension: ComprehensionObservation; // Compreensão observada
  teacherObservations: string; // Anotações contextuais da professora
  pedagogicalIntervention: string; // Próximo passo / intervenção pedagógica sugerida
  collaborativeEvidence?: {
    audioEvidence?: CollaborativeAudioEvidence;
    mapping?: CollaborativeReadingMapping;
  };
  createdAt: number; // Data/hora em milissegundos para ordenação cronológica
}

// ============================================================================
// 8. INFRAESTRUTURA DO BANCO DE PALAVRAS (ETAPA E3.2 / E4 FUNDAMENTAL)
// ============================================================================

/**
 * Categorias conceituais de palavras no FluiLer:
 * Diferenciação pedagógica sem termos clínicos, diagnósticos ou estigmatizantes.
 */
export type ReadingWordCategory =
  | "vocabulario" // Palavra para ampliação lexical contextualizada
  | "palavra-nova" // Termo recém-introduzido no repertório leitor
  | "atencao-desafio" // Palavra com padrão ortográfico ou grafofonêmico que requer atenção mediada
  | "pseudopalavra"; // Estrutura reservada para futuro treino fonológico de decodificação pura (sem significado)

/**
 * Modelo unificado de uma palavra pedagógica no Banco de Palavras.
 * Reutilizável por biblioteca, atividades, leitura guiada e futuras trilhas.
 */
export interface ReadingWord {
  id: string; // Identificador único (ex: "word_pipoca_1725510000000")
  word: string; // Forma de exibição da palavra (ex: "Pipoquinha" ou "pipoca")
  normalizedWord: string; // Palavra normalizada para busca e deduplicação (minúsculas, sem espaços extras)
  syllables: string; // Divisão silábica para apoio à decodificação (ex: "pi-po-qui-nha" ou "PI - PO - QUI - NHA")
  pronunciationText?: string; // Texto específico para o sintetizador de voz (TTS) se diferir da grafia
  meaning?: string; // Significado pedagógico contextualizado em linguagem simples e acolhedora
  contextualSentence?: string; // Frase contextualizada ou verso de exemplo
  category: ReadingWordCategory; // Categoria pedagógica conceitual
  contexts?: string[]; // Eixos contextuais (ex: ["escola", "animais", "brincadeiras", "alimentacao"])
  relatedWordIds?: string[]; // Relações com outras palavras cadastradas (retrocompatibilidade)
  sourceReadingItemIds?: string[]; // IDs dos ReadingItems aos quais a palavra está vinculada
  difficultyLabel?: string; // Classificação pedagógica qualitativa (ex: "Dígrafo QU", "Encontro consonantal BR"), SEM percentuais e SEM diagnóstico
  tags?: string[]; // Marcadores livres para organização docente
  visualMedia?: VisualMedia; // Apoio visual opcional quando disponível na arquitetura
  createdAt: string; // Data de criação no formato ISO (AAAA-MM-DD ou timestamp ISO)

  // ==========================================================================
  // E4-B.0: NÚCLEO LINGUÍSTICO (Campos estruturais opcionais e rigorosos)
  // ==========================================================================
  syllableCount?: number; // Quantidade de sílabas derivada da divisão silábica oficial
  initialSyllable?: string; // Sílaba inicial (ex: "pi" em "pi-po-qui-nha")
  finalSyllable?: string; // Sílaba final (ex: "nha" em "pi-po-qui-nha")
  initialLetter?: string; // Letra/grafema inicial (ex: "P")
  finalLetter?: string; // Letra/grafema final (ex: "a")
  initialSound?: string; // Fonema inicial seguro quando houver transcrição validada (ex: "/p/", "/s/", "/k/")
  finalSound?: string; // Fonema final seguro quando houver transcrição validada (ex: "/a/", "/ɾ/")
  rhymeFamily?: string; // Família de rima fonológica validada (ex: "inha", "ar", "asso")
  alliterationGroup?: string; // Grupo de aliteração fonêmica (ex: "som-inicial-m", "som-inicial-p")
  phonologicalFeatures?: string[]; // Padrões fonológicos validados (ex: ["ditongo-oral-decrescente-ou", "coda-silabica-r"])
  orthographicFeatures?: string[]; // Padrões ortográficos validados (ex: ["digrafo-qu", "digrafo-nh", "m-antes-de-p"])
  pedagogicalTags?: string[]; // Marcadores pedagógicos curriculares (ex: ["rima", "diminutivo", "verbo-infinitivo"])
  relations?: WordRelation[]; // Relações tipadas e validadas entre palavras
}

// ============================================================================
// 9. RELAÇÕES LINGUÍSTICAS E EVIDÊNCIAS PEDAGÓGICAS (ETAPA E4-B.0)
// ============================================================================

/**
 * Tipos explícitos de relações pedagógicas entre palavras no FluiLer.
 * Cada relação possui critério claro para não confundir rima com semelhança ortográfica,
 * nem temática com som inicial.
 */
export type WordRelationType =
  | "rima" // Mesma família de rima fonológica validada (ex: pipoquinha / mudinha)
  | "som-inicial" // Aliteração fonêmica (mesmo som inicial / fonema, ex: mudinha / marcador -> /m/)
  | "silaba-inicial" // Mesma sílaba inicial gráfica e fonológica (ex: pipoca / pirulito)
  | "silaba-final" // Mesma sílaba final gráfica e fonológica (ex: estourar / cirandar -> -rar / -dar)
  | "semantica" // Relação de significado (sinonímia, antonímia, campo lexical)
  | "tematica" // Pertencentes ao mesmo eixo temático ou texto (ex: escola, culinária)
  | "contraste" // Contraste linguístico ou conceitual mediado
  | "formacao-palavras" // Relação morfológica (primitiva/derivada, sufixação diminutiva, família de palavras)
  | "mesmo-texto"; // Palavras que ocorrem no mesmo ReadingItem do acervo

/**
 * Relação tipada e rastreável entre duas palavras cadastradas.
 */
export interface WordRelation {
  targetWordId: string; // ID da palavra relacionada no Banco
  type: WordRelationType; // Tipo conceitual da relação
  description?: string; // Breve justificativa pedagógica da relação
  validatedByTeacher?: boolean; // Se a relação foi verificada ou proposta por curadoria docente
}

/**
 * Tipos de evidência de aprendizagem linguística que podem ser registradas
 * pelas atividades futuras (B1, B2, etc.).
 * SEM pontuação, SEM porcentagens, SEM diagnósticos clínicos automáticos.
 */
export type PedagogicalEvidenceType =
  | "identificou-palavra"
  | "segmentou-palavra"
  | "identificou-silaba-inicial"
  | "identificou-silaba-final"
  | "reconheceu-rima"
  | "identificou-som-inicial"
  | "combinou-sons"
  | "segmentou-sons"
  | "realizou-manipulacao";

/**
 * Registro estruturado de uma evidência pedagógica.
 * O sistema organiza evidências; o professor interpreta e decide.
 */
export interface WordPedagogicalEvidence {
  id: string; // Identificador único da evidência
  wordId: string; // ID da palavra no Banco de Palavras
  evidenceType: PedagogicalEvidenceType; // Tipo de evidência pedagógica observada
  timestamp: number; // Data/hora do registro (milissegundos)
  context?: string; // Contexto de observação (ex: "leitura-guiada", "banco-de-palavras", "atividade")
  sourceActivityId?: string; // ID da atividade ou leitura onde ocorreu a evidência
  observationNotes?: string; // Observação qualitativa e acolhedora registrada
}

// Re-exportações do Registro Único de Evidências Formativas
export type {
  StudentFormativeEvidence,
  FormativeEvidenceActivityType,
  FormativeEvidenceSource,
  FormativeResponseFormat,
} from "./types/evidence";
export { getFormativeEvidenceSource } from "./types/evidence";

