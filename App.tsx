import DeploymentStatus from "./components/DeploymentStatus";
import AlternativeResponsePanel from "./components/AlternativeResponsePanel";
import LearningSupportPanel from "./components/LearningSupportPanel";
import ConnectionStatus from "./components/ConnectionStatus";
import InstallationPanel from "./components/InstallationPanel";
import EjaActivities from "./components/EjaActivities";
import { stopSpeaking } from "./utils/speech";
import { Suspense,lazy,useState, useEffect, useRef, useMemo } from "react";
import { Star, LayoutGrid } from "lucide-react";
import { StudentProgress, Badge, Student } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { playSound } from "./utils/audio";
import {
  loadStudentProgress,
  saveStudentProgress,
  resetStudentProgress,
  calculateDynamicPercentages,
  loadActiveStudentId,
  saveActiveStudentId,
  loadStudents,
  DEFAULT_STUDENT_PROGRESS,
} from "./utils/storage";

const GuidedReading=lazy(()=>import("./components/GuidedReading"));
const AudioListening=lazy(()=>import("./components/AudioListening"));
const TextualProduction=lazy(()=>import("./components/TextualProduction"));
const LiteracyGames=lazy(()=>import("./components/LiteracyGames"));
const WordBank=lazy(()=>import("./components/WordBank"));
const WordAwarenessActivities=lazy(()=>import("./components/WordAwarenessActivities"));
const RhymeAwarenessActivities=lazy(()=>import("./components/RhymeAwarenessActivities"));
const WordFormationActivities=lazy(()=>import("./components/WordFormationActivities"));
const FluiLerDiagnosticSondagem=lazy(()=>import("./components/FluiLerDiagnosticSondagem"));
const LearnHub=lazy(()=>import("./components/ContextLearningHub"));
import StudentHomeDashboard from "./components/StudentHomeDashboard";
import CommunicationBoard from "./components/CommunicationBoard";
import AccessibilityControls from "./components/AccessibilityControls";
import { saveStudentResume } from "./utils/studentResume";
const JourneyArea=lazy(()=>import("./components/ContextJourneyArea"));
const FamilyArea=lazy(()=>import("./components/ContextFamilyArea"));
const TeacherArea=lazy(()=>import("./components/TeacherArea"));
import MainNavigation, { MainAreaId, NavigationTab } from "./components/MainNavigation";
import { StudentSelector } from "./components/StudentSelector";
import StudentProfileModal from "./components/StudentProfileModal";
import { CentralAuthModal } from "./components/CentralAuthModal";
import { centralSync } from "./services/centralSyncService";
import { EcosystemRole } from "./utils/ecosystemPermissions";
import { IMAGES } from "./assets/images";
import SafeImage from "./components/SafeImage";

const SYSTEM_BADGES: Badge[] = [
  {
    id: "primeira_descoberta",
    title: "Aventureiro das Nuvens",
    description: "Leu a sua primeira história interativa guiada.",
    icon: "📖",
    color: "from-sky-600 to-teal-700"
  },
  {
    id: "compreensao_mestre",
    title: "Olho Clínico",
    description: "Gabaritou todas as perguntas de um desafio de compreensão textual.",
    icon: "🎯",
    color: "from-amber-600 to-yellow-600"
  },
  {
    id: "escritor_mirim",
    title: "Caneta de Ouro",
    description: "Escreveu um texto criativo e recebeu as dicas da Profe FluiLer.",
    icon: "✍️",
    color: "from-teal-700 to-emerald-800"
  },
  {
    id: "clube_fabuloso",
    title: "Ouvinte Atencioso",
    description: "Escutou uma fábula inteira na rádio de letramento.",
    icon: "🎧",
    color: "from-teal-600 to-sky-700"
  },
  {
    id: "mestre_silabas",
    title: "Mestre das Sílabas",
    description: "Completou um minijogo silábico na Olimpíada.",
    icon: "🧩",
    color: "from-emerald-600 to-teal-700"
  },
  {
    id: "acumulador_150",
    title: "Estrela Brilhante",
    description: "Superou a marca incrível de 150 pontos acumulados no FluiLer.",
    icon: "⭐",
    color: "from-amber-600 to-orange-600"
  }
];

export default function App() {
  const [authUser, setAuthUser] = useState(() => centralSync.getCurrentUser());
  const [restoringSession, setRestoringSession] = useState(true);
  const [syncIssue, setSyncIssue] = useState<{message?:string;conflict?:boolean;conflictKey?:string}|null>(null);
  useEffect(() => centralSync.subscribe((status, details) => setSyncIssue(status === 'error' ? details || {message:'Há registros pendentes de envio.'} : null)), []);

  const [ecosystemRole, setEcosystemRole] = useState<EcosystemRole>("student");
  const [currentArea, setCurrentArea] = useState<MainAreaId>("home");
  const [selectedEjaItemId,setSelectedEjaItemId] = useState<string|undefined>();
  const [activeTab, setActiveTab] = useState<NavigationTab>("home");
  const [selectedStudentForAssessment, setSelectedStudentForAssessment] = useState<Student | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const changed = () => {
      const user = centralSync.getCurrentUser();
      setAuthUser(user);
      setStudentListVersion(v => v + 1);
      setSelectedStudentForAssessment(null);
      setIsProfileModalOpen(false);
      if (!user) {
        loadedStudentIdRef.current = null;
        setActiveStudentId(null);
        setStats({ ...DEFAULT_STUDENT_PROGRESS });
        setEcosystemRole("student"); setCurrentArea("home"); setActiveTab("home");
      } else if (user.role !== "teacher") {
        setEcosystemRole(user.role);
        setCurrentArea(user.role === "family" ? "family" : "home");
        setActiveTab(user.role === "family" ? "family_home" : "home");
        const id = user.linkedStudentIds?.[0];
        if (id) { const progress = loadStudentProgress(id); loadedStudentIdRef.current = id; setActiveStudentId(id); saveActiveStudentId(id); setStats(progress); }
      }
    };
    window.addEventListener("fluiler:auth-changed", changed);
    void centralSync.restoreSession().then(async () => {
      if (centralSync.getCurrentUser()) await centralSync.syncWithCentralServer();
      if (mounted) { changed(); setRestoringSession(false); }
    });
    return () => { mounted = false; window.removeEventListener("fluiler:auth-changed", changed); };
  }, []);

  // Escuta segura de atualizações originadas do Banco Central (Firestore)
  useEffect(() => {
    const handleDataUpdated = () => {
      // 1. Atualiza versão da lista de estudantes para re-renderizar imediatamente componentes dependentes
      setStudentListVersion((v) => v + 1);

      // 2. Se há um estudante ativo, recarrega seu progresso e dados mais recentes do Firestore
      const currentActiveId = loadActiveStudentId();
      if (currentActiveId) {
        const studentExists = loadStudents("todos").some((s) => s.id === currentActiveId);
        if (studentExists) {
          const loaded = loadStudentProgress(currentActiveId);
          loadedStudentIdRef.current = currentActiveId;
          setStats(loaded);
        }
      }
    };

    window.addEventListener("fluiler:data-updated", handleDataUpdated);
    return () => {
      window.removeEventListener("fluiler:data-updated", handleDataUpdated);
    };
  }, []);
  
  // Identidade ativa do estudante na Área do Aluno (única fonte de verdade)
  const [activeStudentId, setActiveStudentId] = useState<string | null>(() => loadActiveStudentId());

  // Rastreia qual studentId corresponde ao objeto stats atualmente carregado em memória.
  // Evita rigorosamente que um stats desatualizado ou padrão seja salvo por cima dos dados reais de outro aluno.
  const loadedStudentIdRef = useRef<string | null>(loadActiveStudentId());

  // Recupera o progresso do estudante ativo do localStorage ou DEFAULT_STUDENT_PROGRESS se não houver aluno ativo
  const [stats, setStats] = useState<StudentProgress>(() => {
    const initialStudentId = loadActiveStudentId();
    return initialStudentId ? loadStudentProgress(initialStudentId) : { ...DEFAULT_STUDENT_PROGRESS };
  });

  // Salva o activeStudentId, carrega imediatamente os dados do aluno e atualiza a referência
  const handleSelectActiveStudent = (studentId: string) => {
    const user = centralSync.getCurrentUser();
    if (!user || (user.role !== "teacher" && !user.linkedStudentIds?.includes(studentId))) return;
    const loaded = loadStudentProgress(studentId);
    loadedStudentIdRef.current = studentId;
    setActiveStudentId(studentId);
    saveActiveStudentId(studentId);
    setStats(loaded);
  };

  // Permite trocar de aluno, limpando a chave e retornando à tela de seleção sem gravar zeros no aluno anterior
  const handleSwitchStudent = () => {
    loadedStudentIdRef.current = null;
    setActiveStudentId(null);
    saveActiveStudentId(null);
    // Reseta o estado em memória para o padrão neutro ao deslogar
    setStats({ ...DEFAULT_STUDENT_PROGRESS });
  };

  // Sincroniza a troca de activeStudentId se atualizado por outra via
  useEffect(() => {
    if (activeStudentId) {
      if (loadedStudentIdRef.current !== activeStudentId) {
        const loaded = loadStudentProgress(activeStudentId);
        loadedStudentIdRef.current = activeStudentId;
        setStats(loaded);
      }
    } else {
      loadedStudentIdRef.current = null;
      setStats({ ...DEFAULT_STUDENT_PROGRESS });
    }
  }, [activeStudentId]);

  // Controle de personalização do perfil da criança (Avatar, Apelido e Voz)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [studentListVersion, setStudentListVersion] = useState<number>(0);

  // Lista reativa de todos os estudantes conectada às atualizações do banco central
  const allStudents = useMemo(() => {
    return loadStudents("todos");
  }, [studentListVersion]);

  // Busca o estudante ativo para exibição de nome/turma e perfil afetivo
  const activeStudent = useMemo(() => {
    if (!activeStudentId) return null;
    return allStudents.find((s) => s.id === activeStudentId) || null;
  }, [activeStudentId, allStudents]);

  const [lastNotification, setLastNotification] = useState<string | null>(null);

  // Estado central do texto atualmente em foco no ecossistema (harmonizado para Leitura, Banco, Jogos, Rimas, Consciência e Escrita)
  const [selectedReadingItemId, setSelectedReadingItemId] = useState<string | undefined>(undefined);
  const [wordBankFilterItemId, setWordBankFilterItemId] = useState<string | undefined>(undefined);
  const [gamesFilterReadingItemId, setGamesFilterReadingItemId] = useState<string | undefined>(undefined);
  const [rhymeFilterReadingItemId, setRhymeFilterReadingItemId] = useState<string | undefined>(undefined);
  const [wordAwarenessFilterReadingItemId, setWordAwarenessFilterReadingItemId] = useState<string | undefined>(undefined);
  const [wordFormationFilterReadingItemId, setWordFormationFilterReadingItemId] = useState<string | undefined>(undefined);
  const [writingFilterReadingItemId, setWritingFilterReadingItemId] = useState<string | undefined>(undefined);

  // Rastreia a origem da abertura da leitura para permitir retorno direto da Família ("family")
  const [readingOriginContext, setReadingOriginContext] = useState<"family" | null>(null);

  // Retorno direto para a Área da Família (Casa da Leitura) preservando o aluno ativo
  const handleReturnToFamily = () => {
    setReadingOriginContext(null);
    setEcosystemRole("family");
    setCurrentArea("family");
    setActiveTab("family_home");
  };

  // Retorno unificado ao texto de origem mantendo a continuidade pedagógica
  const handleReturnToReading = (readingItemId?: string) => {
    const targetId = readingItemId || selectedReadingItemId;
    if (targetId) {
      setSelectedReadingItemId(targetId);
    }
    setEcosystemRole("student");
    setCurrentArea("learn");
    setActiveTab("reading");
  };

  // Sincroniza atualizações de estatísticas no localStorage SOMENTE quando stats pertence comprovadamente ao aluno ativo
  useEffect(() => {
    if (authUser && authUser.role !== "family" && activeStudentId && loadedStudentIdRef.current === activeStudentId) {
      saveStudentProgress(stats, activeStudentId);
    }
  }, [stats, activeStudentId]);

  // Alterna o perfil e ambiente ativo do ecossistema
  const handleRoleChange = (role: EcosystemRole) => {
    const user = centralSync.getCurrentUser();
    if (!user || (user.role !== "teacher" && role !== user.role)) { setIsAuthModalOpen(true); return; }
    setEcosystemRole(role);
    centralSync.setEcosystemRole(role);
    if (role === "teacher") {
      centralSync.syncWithCentralServer("teacher");
    }
    if (role === "student") {
      setCurrentArea("home");
      setActiveTab("home");
    } else if (role === "teacher") {
      setCurrentArea("teacher");
      setActiveTab("teacher_home");
    } else if (role === "family") {
      setCurrentArea("family");
      setActiveTab("family_home");
    }
  };

  // Navegação unificada entre abas e áreas
  const handleNavigate = (tab: NavigationTab, targetItemId?: string) => {
    stopSpeaking();
    if (activeStudentId && centralSync.getCurrentUser()?.role === 'student') saveStudentResume(activeStudentId, tab, targetItemId);

    if(tab === "eja"){setSelectedEjaItemId(targetItemId);setEcosystemRole("student");setCurrentArea("learn");setActiveTab("eja");return;}
    if (targetItemId) {
      setSelectedReadingItemId(targetItemId);
      if (tab === "games") {
        setGamesFilterReadingItemId(targetItemId);
      } else if (tab === "rhyme_awareness") {
        setRhymeFilterReadingItemId(targetItemId);
      } else if (tab === "word_formation") {
        setWordFormationFilterReadingItemId(targetItemId);
      } else if (tab === "word_awareness") {
        setWordAwarenessFilterReadingItemId(targetItemId);
      } else if (tab === "wordbank") {
        setWordBankFilterItemId(targetItemId);
      } else if (tab === "writing") {
        setWritingFilterReadingItemId(targetItemId);
      }
    } else if (tab === "reading") {
      setSelectedReadingItemId(undefined);
    }
    if (tab === "home") {
      setEcosystemRole("student");
      setCurrentArea("home");
      setActiveTab("home");
      return;
    }
    if (tab === "learn") {
      setEcosystemRole("student");
      setCurrentArea("learn");
      setActiveTab("learn");
      return;
    }
    if (tab === "journey" || tab === "stats") {
      setEcosystemRole("student");
      setCurrentArea("journey");
      setActiveTab("journey");
      return;
    }
    if (
      [
        "learn",
        "reading",
        "listening",
        "writing",
        "games",
        "wordbank",
        "word_awareness",
        "rhyme_awareness",
        "word_formation",
        "sondagem",
      ].includes(tab)
    ) {
      if (tab !== "games" && gamesFilterReadingItemId) {
        setGamesFilterReadingItemId(undefined);
      }
      if (tab !== "rhyme_awareness" && rhymeFilterReadingItemId) {
        setRhymeFilterReadingItemId(undefined);
      }
      if (tab !== "word_formation" && wordFormationFilterReadingItemId) {
        setWordFormationFilterReadingItemId(undefined);
      }
      setEcosystemRole("student");
      setCurrentArea("learn");
      setActiveTab(tab);
      return;
    }
    // Rotas do Professor
    if (
      [
        "teacher_home",
        "students",
        "assessment",
        "assessment_history",
        "next_steps",
        "planning",
      ].includes(tab)
    ) {
      setEcosystemRole("teacher");
      setCurrentArea("teacher");
      setActiveTab(tab);
      return;
    }
    // Rotas da Família
    if (
      [
        "family_home",
        "family_journey",
        "family_reading",
        "family_tips",
      ].includes(tab)
    ) {
      setEcosystemRole("family");
      setCurrentArea("family");
      setActiveTab(tab);
      return;
    }
    setActiveTab(tab);
  };

  const handleAreaChange = (area: MainAreaId) => {
    stopSpeaking();
    setCurrentArea(area);
    if (area === "home") {
      setEcosystemRole("student");
      setActiveTab("home");
    } else if (area === "learn") {
      setEcosystemRole("student");
      setActiveTab("learn");
    } else if (area === "journey") {
      setEcosystemRole("student");
      setActiveTab("journey");
    } else if (area === "teacher") {
      setEcosystemRole("teacher");
      if (
        ![
          "teacher_home",
          "students",
          "assessment",
          "assessment_history",
          "next_steps",
          "planning",
        ].includes(activeTab)
      ) {
        setActiveTab("teacher_home");
      }
    } else if (area === "family") {
      setEcosystemRole("family");
      if (
        ![
          "family_home",
          "family_journey",
          "family_reading",
          "family_tips",
        ].includes(activeTab)
      ) {
        setActiveTab("family_home");
      }
    }
  };

  // Checa e despacha novos distintivos/medalhas com base no progresso real
  const checkBadgeAchievements = (currentStats: StudentProgress) => {
 if(activeStudent?.learningContext==="eja")return;
    const newlyUnlocked: string[] = [...currentStats.unlockedBadgeIds];
    let added = false;

    // 1. Primeira Descoberta (Leu pelo menos 1 história)
    if (currentStats.storiesReadCount >= 1 && !newlyUnlocked.includes("primeira_descoberta")) {
      newlyUnlocked.push("primeira_descoberta");
      triggerBadgeToast("Aventureiro das Nuvens");
      added = true;
    }

    // 2. Escritor Mirim (Escreveu pelo menos 1 texto)
    if (currentStats.writingsCompleted >= 1 && !newlyUnlocked.includes("escritor_mirim")) {
      newlyUnlocked.push("escritor_mirim");
      triggerBadgeToast("Caneta de Ouro");
      added = true;
    }

    // 3. Mestre das Sílabas (Completou pelo menos 1 minijogo)
    if (currentStats.gamesPlayed >= 1 && !newlyUnlocked.includes("mestre_silabas")) {
      newlyUnlocked.push("mestre_silabas");
      triggerBadgeToast("Mestre das Sílabas");
      added = true;
    }

    // 4. Estrela Brilhante (Alcançou 150 pontos ou mais)
    if (currentStats.readingPoints >= 150 && !newlyUnlocked.includes("acumulador_150")) {
      newlyUnlocked.push("acumulador_150");
      triggerBadgeToast("Estrela Brilhante");
      added = true;
    }

    if (added) {
      setStats(prev => ({
        ...prev,
        unlockedBadgeIds: newlyUnlocked
      }));
    }
  };

  const triggerBadgeToast = (badgeName: string) => {
 if(activeStudent?.learningContext==="eja")return;
    playSound("triumph");
    setLastNotification(`🏆 Incrível! Você desbloqueou o distintivo: ${badgeName}!`);
    setTimeout(() => {
      setLastNotification(null);
    }, 4500);
  };

  // Atualização após leitura guiada e quiz de interpretação
  const handleReadingProgress = (points: number, quizAnswered: boolean, quizCorrect: boolean, storyRead: boolean) => {
    if (centralSync.getCurrentUser()?.role === "family") return;
 if(activeStudent?.learningContext==="eja")points=0;
    setStats(prev => {
      const newStoriesCount = prev.storiesReadCount + (storyRead ? 1 : 0);
      const newQuizzesAnswered = prev.quizzesAnswered + (quizAnswered ? 1 : 0);
      const newQuizzesCorrect = prev.quizzesCorrect + (quizCorrect ? 1 : 0);

      const percentages = calculateDynamicPercentages({
        storiesReadCount: newStoriesCount,
        quizzesAnswered: newQuizzesAnswered,
        quizzesCorrect: newQuizzesCorrect,
        writingsCompleted: prev.writingsCompleted,
        gamesPlayed: prev.gamesPlayed,
      });

      let updatedBadges = [...prev.unlockedBadgeIds];
      if (quizCorrect && !updatedBadges.includes("compreensao_mestre")) {
        updatedBadges.push("compreensao_mestre");
        setTimeout(() => triggerBadgeToast("Olho Clínico"), 500);
      }

      const updated: StudentProgress = {
        ...prev,
        readingPoints: prev.readingPoints + points,
        storiesReadCount: newStoriesCount,
        quizzesAnswered: newQuizzesAnswered,
        quizzesCorrect: newQuizzesCorrect,
        unlockedBadgeIds: updatedBadges,
        readingFluencyPercentage: percentages.readingFluencyPercentage,
        textualComprehensionPercentage: percentages.textualComprehensionPercentage,
      };

      setTimeout(() => checkBadgeAchievements(updated), 800);
      return updated;
    });
  };

  // Atualização após ouvir uma história na rádio
  const handleListeningProgress = (points: number, storyListened: boolean) => {
    if (centralSync.getCurrentUser()?.role === "family") return;
 if(activeStudent?.learningContext==="eja")points=0;
    setStats(prev => {
      let updatedBadges = [...prev.unlockedBadgeIds];
      if (storyListened && !updatedBadges.includes("clube_fabuloso")) {
        updatedBadges.push("clube_fabuloso");
        setTimeout(() => triggerBadgeToast("Ouvinte Atencioso"), 500);
      }

      const updated: StudentProgress = {
        ...prev,
        readingPoints: prev.readingPoints + points,
        unlockedBadgeIds: updatedBadges,
      };

      setTimeout(() => checkBadgeAchievements(updated), 800);
      return updated;
    });
  };

  // Atualização após produção textual
  const handleWritingProgress = (points: number, writingDone: boolean) => {
    if (centralSync.getCurrentUser()?.role === "family") return;
 if(activeStudent?.learningContext==="eja")points=0;
    setStats(prev => {
      const newWritings = prev.writingsCompleted + (writingDone ? 1 : 0);
      const percentages = calculateDynamicPercentages({
        storiesReadCount: prev.storiesReadCount,
        quizzesAnswered: prev.quizzesAnswered,
        quizzesCorrect: prev.quizzesCorrect,
        writingsCompleted: newWritings,
        gamesPlayed: prev.gamesPlayed,
      });

      const updated: StudentProgress = {
        ...prev,
        readingPoints: prev.readingPoints + points,
        writingsCompleted: newWritings,
        readingFluencyPercentage: percentages.readingFluencyPercentage,
        textualComprehensionPercentage: percentages.textualComprehensionPercentage,
      };

      setTimeout(() => checkBadgeAchievements(updated), 800);
      return updated;
    });
  };

  // Atualização após participar de minijogos de letramento
  const handleGamesProgress = (points: number, gamePlayed: boolean, gameCorrect: boolean) => {
    if (centralSync.getCurrentUser()?.role === "family") return;
 if(activeStudent?.learningContext==="eja")points=0;
    setStats(prev => {
      const newGamesPlayed = prev.gamesPlayed + (gamePlayed ? 1 : 0);
      const newGamesCorrect = prev.gamesCorrect + (gameCorrect ? 1 : 0);
      const percentages = calculateDynamicPercentages({
        storiesReadCount: prev.storiesReadCount,
        quizzesAnswered: prev.quizzesAnswered,
        quizzesCorrect: prev.quizzesCorrect,
        writingsCompleted: prev.writingsCompleted,
        gamesPlayed: newGamesPlayed,
      });

      const updated: StudentProgress = {
        ...prev,
        readingPoints: prev.readingPoints + points,
        gamesPlayed: newGamesPlayed,
        gamesCorrect: newGamesCorrect,
        readingFluencyPercentage: percentages.readingFluencyPercentage,
        textualComprehensionPercentage: percentages.textualComprehensionPercentage,
      };

      setTimeout(() => checkBadgeAchievements(updated), 800);
      return updated;
    });
  };

  // Atualização após participar de atividades fonológicas (consciência de palavras e rimas)
  const handlePhonologicalProgress = (points: number) => {
    if (centralSync.getCurrentUser()?.role === "family") return;
 if(activeStudent?.learningContext==="eja")points=0;
    setStats(prev => {
      const updated: StudentProgress = {
        ...prev,
        readingPoints: prev.readingPoints + points,
      };

      setTimeout(() => checkBadgeAchievements(updated), 800);
      return updated;
    });
  };

  // Reset do painel para o estado inicial seguro do estudante ativo
  const handleResetAppStats = () => {
    if (window.confirm("Deseja apagar suas estrelas e medalhas para recomeçar o FluiLer?")) {
      const freshProgress = resetStudentProgress(activeStudentId);
      setStats(freshProgress);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-stone-850 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900 animate-fade-in" id="fluiler-app-root" data-premium="true" data-role={authUser?.role||"guest"} data-activity={activeTab}>
      
      {/* Dynamic Pop Badge achievements Toast alert */}
      <AnimatePresence>
        {lastNotification && (
          <motion.div
            initial={{ opacity: 0, y: -45, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-5 inset-x-0 mx-auto w-max max-w-sm z-50 bg-gradient-to-r from-emerald-850 via-teal-900 to-emerald-950 text-white font-extrabold px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-3 border-2 border-emerald-400/50"
          >
            <span className="text-2xl animate-bounce">🌟</span>
            <div className="text-left text-xs">
              <span className="block font-black text-[10px] uppercase text-amber-350">NOVA CONQUISTA DE RETORNO!</span>
              <span>{lastNotification}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* Barra Superior FluiLer — Cenário Visual Infantil Premium de Leitura */}
      {/* Natureza 🌱 + Luz ☀️ + Livro Protagonista 📖 + Criança 🧒 + Estrelas 🌟 */}
      {/* =================================================================== */}
      <header className="fluiler-masthead" aria-label="FluiLer — Engenhoca Educacional">
        <div className="fluiler-masthead-inner">
          <div className="fluiler-brand"><div className="fluiler-brand-mascot"><SafeImage src={IMAGES.cutePencil} alt="Lápis mascote do FluiLer" containerClassName="w-full h-full"/></div><div><p className="fluiler-brand-kicker">Engenhoca Educacional</p><span className="fluiler-brand-name">FluiLer</span><p className="fluiler-brand-line">Leitura, escrita e novas possibilidades.</p></div></div>
          <div className="fluiler-masthead-side"><span className="fluiler-area-pill">{authUser?.role==="teacher"?"Área do Professor":authUser?.role==="family"?"Área da Família":authUser?.role==="student"?(activeStudent?.learningContext==="eja"?"Leitura e escrita • EJA":"Área do Aluno"):"Alfabetização e letramento"}</span>{authUser?.role==="student"&&activeStudent?.learningContext!=="eja"&&<span className="fluiler-points"><Star aria-hidden="true"/>{stats.readingPoints} <span>pontos de participação</span></span>}</div>
        </div>
      </header>

      <ConnectionStatus/>
      {/* Main Content constraints */}
      <main id="fluiler-main" tabIndex={-1} className="grow max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        
        {/* Navegação Estruturada por Áreas do FluiLer */}
        <MainNavigation
          currentArea={currentArea}
          activeTab={activeTab}
          currentRole={ecosystemRole}
          onRoleChange={handleRoleChange}
          onAreaChange={handleAreaChange}
          onTabChange={handleNavigate}
          activeStudent={activeStudent}
          onSwitchStudent={handleSwitchStudent}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {authUser && syncIssue && <section role="status" className="rounded-2xl border border-amber-300 bg-amber-50 p-4 space-y-3">
          <p>{syncIssue.message}</p>
          {syncIssue.conflictKey && <><p>Uma cópia das duas versões será guardada antes da conciliação.</p><div className="flex flex-wrap gap-3">
            <button className="p-3 rounded-xl bg-white border" onClick={() => {void centralSync.resolveConflict(syncIssue.conflictKey!, 'central').catch(error => setSyncIssue({message:error.message}));}}>Guardar cópia e usar versão central</button>
            {!syncIssue.conflictKey.startsWith('evidences/') && <button className="p-3 rounded-xl bg-white border" onClick={() => {void centralSync.resolveConflict(syncIssue.conflictKey!, 'local').catch(error => setSyncIssue({message:error.message}));}}>Guardar cópia e enviar minha edição</button>}
          </div></>}
        </section>}
        {authUser && !restoringSession && <AccessibilityControls />}
 {authUser?.role==="teacher" && <DeploymentStatus/>}
         {authUser?.role==="student"&&activeStudentId&&activeStudent&&!restoringSession&&<section className="fluiler-support-dock" aria-label="Comunicação e apoios"><CommunicationBoard key={`caa-${activeStudentId}`} studentId={activeStudentId} onFinish={()=>handleNavigate("home")}/><details className="fluiler-secondary-tools"><summary>Apoios e outras formas de responder</summary><div className="fluiler-secondary-tools-content"><LearningSupportPanel key={`support-${activeStudentId}`} student={activeStudent}/><AlternativeResponsePanel key={`alternative-${activeStudentId}`} studentId={activeStudentId}/></div></details></section>}
        {/* Viewport Principal de Áreas Conforme o Perfil Ativo */}
        <Suspense fallback={<p role="status">Abrindo atividade…</p>}><div id="panel-viewport">
          {restoringSession ? <p role="status">Preparando seu acesso…</p> : !authUser ? <section className="rounded-3xl bg-white p-8 text-center space-y-4 border border-emerald-100"><h2 className="text-2xl font-bold">Bem-vindo ao FluiLer</h2><p>Entre com seu acesso para continuar sua jornada.</p><button className="min-h-14 px-8 rounded-2xl bg-teal-800 text-white font-bold" onClick={() => setIsAuthModalOpen(true)}>Entrar</button><InstallationPanel onSignIn={()=>setIsAuthModalOpen(true)}/></section> : <>

          {/* AMBIENTE DO PROFESSOR */}
          {ecosystemRole === "teacher" && authUser?.role === "teacher" && (
            <TeacherArea
              activeTab={
                [
                  "teacher_home",
                  "students",
                  "assessment",
                  "assessment_history",
                  "next_steps",
                  "planning",
                ].includes(activeTab)
                  ? (activeTab as any)
                  : "teacher_home"
              }
              onNavigateTab={(tab) => handleNavigate(tab)}
              selectedStudentForAssessment={selectedStudentForAssessment}
              onSelectStudentForAssessment={setSelectedStudentForAssessment}
            />
          )}

          {/* AMBIENTE DA FAMÍLIA */}
          {ecosystemRole === "family" && (
            <FamilyArea
              activeTab={
                [
                  "family_home",
                  "family_journey",
                  "family_reading",
                  "family_tips",
                ].includes(activeTab)
                  ? (activeTab as any)
                  : "family_home"
              }
              onNavigateTab={(tab) => handleNavigate(tab)}
              stats={stats}
              activeStudent={activeStudent}
              students={allStudents}
              onSelectStudent={(student) => handleSelectActiveStudent(student.id)}
              onNavigateToReading={() => {
                setReadingOriginContext("family");
                setEcosystemRole("student");
                setCurrentArea("learn");
                setActiveTab("reading");
              }}
            />
          )}

          {/* AMBIENTE DO ALUNO */}
          {ecosystemRole === "student" && (
            <>
              {!activeStudentId ? (
                <StudentSelector
                  onSelectStudent={handleSelectActiveStudent}
                  students={allStudents}
                />
              ) : (
                <>
                  {/* 1. ÁREA: INÍCIO (Jardim de Aprendizagem / Trilha do Aluno) */}
                  {currentArea === "home" && (
                    <StudentHomeDashboard
                      stats={stats}
                      onNavigate={handleNavigate}
                      activeStudent={activeStudent}
                      onOpenProfile={() => setIsProfileModalOpen(true)}
                    />
                  )}

                  {/* 2. ÁREA: APRENDER A LER (Biblioteca da Leitura) */}
                  {currentArea === "learn" && (
                    <div className="min-h-96" id="panel-viewport-learn">
                      {activeTab === "learn" && (
                        <LearnHub
                          onNavigate={(tab, targetItemId) => handleNavigate(tab, targetItemId)}
                          onNavigateHome={() => handleAreaChange("home")}
                          activeStudent={activeStudent}
                          stats={stats}
                          onOpenProfile={() => setIsProfileModalOpen(true)}
                          role={ecosystemRole}
                        />
                      )}
                      {activeTab === "eja" && activeStudentId && <EjaActivities studentId={activeStudentId} selectedId={selectedEjaItemId} onSelect={id=>handleNavigate("eja",id)} onHome={()=>handleNavigate("home")}/>}
                      {activeTab === "reading" && (
                        <GuidedReading
                          activeStudent={activeStudent}
                          onProgressUpdate={handleReadingProgress}
                          onNavigateToLearn={() => handleNavigate("learn")}
                          onNavigateToHome={() => handleAreaChange("home")}
                          onReturnToFamily={readingOriginContext === "family" ? handleReturnToFamily : undefined}
                          initialReadingItemId={selectedReadingItemId}
                          onSelectReadingItem={(readingItemId) => {
                            setSelectedReadingItemId(readingItemId || undefined);
                            if (activeStudentId) saveStudentResume(activeStudentId, "reading", readingItemId);
                          }}
                          onNavigateToWordBank={(readingItemId) => {
                            const id = readingItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setWordBankFilterItemId(id);
                            handleNavigate("wordbank");
                          }}
                          onNavigateToGames={(readingItemId) => {
                            const id = readingItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setGamesFilterReadingItemId(id);
                            handleNavigate("games");
                          }}
                          onNavigateToWordAwareness={(readingItemId) => {
                            const id = readingItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setWordAwarenessFilterReadingItemId(id);
                            handleNavigate("word_awareness");
                          }}
                          onNavigateToRhymeAwareness={(readingItemId) => {
                            const id = readingItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setRhymeFilterReadingItemId(id);
                            handleNavigate("rhyme_awareness");
                          }}
                          onNavigateToWordFormation={(readingItemId) => {
                            const id = readingItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setWordFormationFilterReadingItemId(id);
                            handleNavigate("word_formation");
                          }}
                          onNavigateToWriting={(readingItemId) => {
                            const id = readingItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setWritingFilterReadingItemId(id);
                            handleNavigate("writing");
                          }}
                        />
                      )}
                      {activeTab === "listening" && (
                        <AudioListening
                          activeStudent={activeStudent}
                          onProgressUpdate={handleListeningProgress}
                          onNavigateToLearn={() => handleNavigate("learn")}
                          onNavigateToHome={() => handleAreaChange("home")}
                        />
                      )}
                      {activeTab === "writing" && (
                        <TextualProduction
                          activeStudent={activeStudent}
                          onProgressUpdate={handleWritingProgress}
                          onNavigateToLearn={() => handleNavigate("learn")}
                          onNavigateToHome={() => handleAreaChange("home")}
                          initialReadingItemId={writingFilterReadingItemId || selectedReadingItemId}
                          onReturnToReading={handleReturnToReading}
                        />
                      )}
                      {activeTab === "games" && (
                        <LiteracyGames
                          activeStudent={activeStudent}
                          onProgressUpdate={handleGamesProgress}
                          onNavigateToLearn={() => handleNavigate("learn")}
                          onNavigateToHome={() => handleAreaChange("home")}
                          initialReadingItemId={gamesFilterReadingItemId || selectedReadingItemId}
                          onReturnToReading={handleReturnToReading}
                        />
                      )}
                      {activeTab === "wordbank" && (
                        <WordBank
                          onSelectReadingItem={(readingItemId) => {
                            setSelectedReadingItemId(readingItemId);
                            handleNavigate("reading");
                          }}
                          onNavigateToWordAwareness={(readingItemId) => {
                            const id = readingItemId || wordBankFilterItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setWordAwarenessFilterReadingItemId(id);
                            handleNavigate("word_awareness");
                          }}
                          onNavigateToWordFormation={(readingItemId) => {
                            const id = readingItemId || wordBankFilterItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setWordFormationFilterReadingItemId(id);
                            handleNavigate("word_formation");
                          }}
                          onNavigateToLearn={() => handleNavigate("learn")}
                          onNavigateToHome={() => handleAreaChange("home")}
                          initialFilterReadingItemId={wordBankFilterItemId || selectedReadingItemId}
                        />
                      )}
                      {activeTab === "word_awareness" && (
                        <WordAwarenessActivities
                          activeStudent={activeStudent}
                          onProgressUpdate={handlePhonologicalProgress}
                          onNavigateToWordBank={(readingItemId) => {
                            const id = readingItemId || wordAwarenessFilterReadingItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setWordBankFilterItemId(id);
                            handleNavigate("wordbank");
                          }}
                          onNavigateToLearn={() => handleNavigate("learn")}
                          onNavigateToHome={() => handleAreaChange("home")}
                          initialReadingItemId={wordAwarenessFilterReadingItemId || selectedReadingItemId}
                          onReturnToReading={handleReturnToReading}
                        />
                      )}
                      {activeTab === "rhyme_awareness" && (
                        <RhymeAwarenessActivities
                          activeStudent={activeStudent}
                          onProgressUpdate={handlePhonologicalProgress}
                          onNavigateToWordBank={() => {
                            const id = rhymeFilterReadingItemId || selectedReadingItemId;
                            setWordBankFilterItemId(id);
                            handleNavigate("wordbank");
                          }}
                          onNavigateToLearn={() => handleNavigate("learn")}
                          onNavigateToHome={() => handleAreaChange("home")}
                          initialReadingItemId={rhymeFilterReadingItemId || selectedReadingItemId}
                          onReturnToReading={handleReturnToReading}
                        />
                      )}
                      {activeTab === "word_formation" && (
                        <WordFormationActivities
                          activeStudent={activeStudent}
                          onProgressUpdate={handlePhonologicalProgress}
                          onNavigateToWordBank={(readingItemId) => {
                            const id = readingItemId || wordFormationFilterReadingItemId || selectedReadingItemId;
                            setSelectedReadingItemId(id);
                            setWordBankFilterItemId(id);
                            handleNavigate("wordbank");
                          }}
                          onNavigateToLearn={() => handleNavigate("learn")}
                          onNavigateToHome={() => handleAreaChange("home")}
                          initialReadingItemId={wordFormationFilterReadingItemId || selectedReadingItemId}
                          onReturnToReading={handleReturnToReading}
                        />
                      )}
                      {activeTab === "sondagem" && (
                        <FluiLerDiagnosticSondagem
                          student={
                            activeStudent || {
                              id: activeStudentId || `estudante_${Date.now()}`,
                              name: "Pequeno Leitor",
                              classroom: "1º Ano",
                              gradeLevel: "1º Ano EF",
                              status: "ativo",
                              createdAt: new Date().toISOString().split("T")[0],
                            }
                          }
                          onComplete={(_result) => {
                            setStudentListVersion((v) => v + 1);
                            handleNavigate("home");
                          }}
                          onCancel={() => handleNavigate("home")}
                        />
                      )}
                    </div>
                  )}

                  {/* 3. ÁREA: MINHA JORNADA (Caminho do Crescimento) */}
                  {currentArea === "journey" && (
                    <JourneyArea
                      stats={stats}
                      badges={SYSTEM_BADGES}
                      activeStudent={activeStudent}
                      onResetProgress={handleResetAppStats}
                      onNavigateToHome={() => handleAreaChange("home")}
                      onNavigateToLearn={() => handleNavigate("learn")}
                      onOpenProfile={() => setIsProfileModalOpen(true)}
                      onNavigate={handleNavigate}
                    />
                  )}
                </>
              )}
            </>
          )}
          </>}
        </div>

        {/* Dynamic Catalog Features List — Exibido apenas para o perfil de Professor (mediador pedagógico) */}
        {ecosystemRole === "teacher" && authUser?.role === "teacher" && (
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-2xs space-y-4">
            <h2 className="text-base font-extrabold text-stone-850 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-emerald-700" />
              Recursos e Espaços Pedagógicos do FluiLer
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-semibold text-stone-600">
              <li className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 flex items-center gap-2 text-stone-750">
                <span className="text-emerald-600 font-bold">✔</span> Biblioteca com fábulas, tirinhas, cantigas e poesias
              </li>
              <li className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 flex items-center gap-2 text-stone-750">
                <span className="text-emerald-600 font-bold">✔</span> Consciência fonológica (Etapas B1 palavras e B2 rimas)
              </li>
              <li className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 flex items-center gap-2 text-stone-750">
                <span className="text-emerald-600 font-bold">✔</span> Banco de palavras ilustrado com áudio e sílabas
              </li>
              <li className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 flex items-center gap-2 text-stone-750">
                <span className="text-emerald-600 font-bold">✔</span> Produção textual orientada e audiolivros de escuta
              </li>
              <li className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 flex items-center gap-2 text-stone-750">
                <span className="text-emerald-600 font-bold">✔</span> Caderno de planejamento com sondagem formativa
              </li>
              <li className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 flex items-center gap-2 text-stone-750">
                <span className="text-emerald-600 font-bold">✔</span> Casa da Leitura com orientações acolhedoras à família
              </li>
            </ul>
          </div>
        )}

      </Suspense></main>

      {/* Modal Afetivo da Criança: Escolha de Personagem, Apelido e Voz */}
      {isProfileModalOpen && activeStudent && (
        <StudentProfileModal
          student={activeStudent}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onSave={() => {
            setStudentListVersion((v) => v + 1);
            setIsProfileModalOpen(false);
          }}
        />
      )}

      {/* Modal de Autenticação e Persistência Central */}
      <CentralAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onRoleChange={(role) => {
          handleRoleChange(role);
        }}
        onSelectStudent={(student) => {
          handleSelectActiveStudent(student.id);
        }}
      />

      {/* Elegant minimalist bottom footer */}
      <footer className="bg-slate-900 text-slate-450 py-5 text-xs text-center border-t border-slate-850/80">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-semibold">
          <p>© 2026 FluiLer — Engenhoca Educacional</p>
          <div className="flex gap-4">
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md">
              Área para Responsáveis & Pedagogia Geral
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
