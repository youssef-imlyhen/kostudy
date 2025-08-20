export const ko = {
  // General
  appName: "퀴즈 앱",
  
  // Navigation
  nav: {
    home: "홈",
    categories: "카테고리",
    mistakes: "오답",
    settings: "설정",
    achievements: "업적",
    about: "정보",
    contact: "연락처",
    share: "공유",
    dashboard: "대시보드",
    questions: "문제",
    chat: "AI 채팅",
  },
  
  // Screens
  homeScreen: {
    welcome: "퀴즈에 오신 것을 환영합니다!",
    enterName: "이름을 입력하여 시작하세요",
    placeholder: "당신의 이름",
    letsGo: "시작해요!",
    subtitle: "지식을 시험하고 새로운 것을 배우세요",
    or: "또는",
    importProgress: "진행 상황 가져오기",
    welcomeBack: "다시 오신 것을 환영합니다",
    readyToLearn: "학습을 계속할 준비가 되셨나요?",
    toReview: "복습하기",
    categories: "카테고리",
    continueLearning: "학습 계속하기",
    startLearning: "학습 시작하기",
    namePlaceholder: "이름을 입력하세요",
  },
  dashboard: {
    title: "대시보드",
    welcome: "환영합니다",
    subtitle: "학습 여정을 계속하세요",
    categories: "카테고리",
    questions: "문제",
    toReview: "복습하기",
    learningPath: "학습 경로",
    browseAll: "모두 보기",
    playAll: "모든 문제 풀기",
    playAllDesc: "모든 카테고리에서 지식을 시험하세요",
    practice: "연습",
    achievements: "업적",
    achievementsDesc: "진행 상황과 마일스톤을 추적하세요",
    reviewMistakes: "오답 복습",
    questionsToPractice: "연습할 문제",
    communityTools: "커뮤니티 및 도구",
    aiAssistant: "AI 어시스턴트",
    aiAssistantDesc: "어려운 문제에 대한 도움을 받으세요",
    customQuestions: "사용자 정의 문제",
    customQuestionsDesc: "자신만의 콘텐츠를 만들고 관리하세요",
  },
  categoriesScreen: {
    title: "카테고리",
  },
  categoryScreen: {
    startQuiz: "퀴즈 시작",
    categoryNotFound: "카테고리를 찾을 수 없습니다",
  },
  quizScreen: {
    title: "퀴즈",
    next: "다음",
    submit: "제출",
    finishQuiz: "퀴즈 종료",
    understood: "이해함",
    currentStreak: "현재 연승",
    bestStreak: "최고 연승",
    question: "문제",
    showExplanation: "설명 보기",
    continueStreak: "연승 계속하기",
    loading: "로딩 중...",
    unsupportedQuestionType: "지원되지 않는 문제 유형",
  },
  resultsScreen: {
    title: "결과",
    score: "당신의 점수",
    correct: "정답",
    incorrect: "오답",
    playAgain: "다시 플레이",
    backToCategories: "카테고리로 돌아가기",
    streakOver: "연승 종료!",
    questionsAnsweredCorrectly: "정답으로 답변한 문제",
    newPersonalBest: "새로운 개인 최고 기록!",
    personalBest: "개인 최고 기록",
    tryAgain: "다시 시도",
    explanation: "설명",
    levelComplete: "{{level}} 레벨 완료",
    greatJob: "훌륭해요! 이 레벨을 마스터했습니다.",
    keepPracticing: "점수를 향상시키기 위해 계속 연습하세요!",
    incorrectAnswers: "오답: {{count}}",
    correctAnswers: "정답: {{count}}",
    continue: "계속",
    reviewMistakes: "오답 복습",
  },
  achievementsScreen: {
    title: "업적",
    points: "포인트",
    correctAnswers: "정답 수",
    completed: "완료됨",
    performanceByCategory: "카테고리별 성과",
    questionsCount: "{{completed}}/{{total}} 문제",
    accuracy: "{{accuracy}}% 정답",
    noPerformance: "퀴즈를 완료하여 성과를 확인하세요!",
    practiceMistakes: "오답 연습 ({{count}})",
    unlocked: "잠금 해제됨",
    progress: "진행 상황",
  },
  achievements: {
    firstSteps: {
      title: "첫 걸음",
      description: "첫 퀴즈 문제를 완료하세요"
    },
    quizMaster: {
      title: "퀴즈 마스터",
      description: "50문제를 정답으로 맞히세요"
    },
    speedDemon: {
      title: "스피드 데몬",
      description: "5초 이내에 문제를 푸세요"
    },
    streakChampion: {
      title: "연승 챔피언",
      description: "7일 연승을 유지하세요"
    },
    categoryConqueror: {
      title: "카테고리 정복자",
      description: "한 카테고리의 모든 문제를 완료하세요"
    },
    perfectScore: {
      title: "완벽한 점수",
      description: "10문제 이상의 퀴즈에서 100%를 달성하세요"
    },
    dedicatedLearner: {
      title: "헌신적인 학습자",
      description: "100문제를 완료하세요"
    },
    mistakeMaster: {
      title: "오답 마스터",
      description: "20개의 오답을 복습하고 수정하세요"
    },
    wellRounded: {
      title: "균형 잡힌",
      description: "3개의 다른 카테고리에서 퀴즈를 완료하세요"
    }
  },
  achievementTiers: {
    bronze: "브론즈",
    silver: "실버",
    gold: "골드",
    platinum: "플래티넘"
  },
  mistakesScreen: {
    title: "내 오답",
    noMistakes: "아직 오답이 없습니다. 계속 유지하세요!",
    reviewMistakesInCategory: "{{category}}에서 오답 복습하기",
    score: "점수",
    categories: "카테고리",
    total: "총계",
    practiceAllMistakes: "모든 오답 연습",
    wrongAnswers: "오답",
  },
  settingsScreen: {
    title: "설정",
    language: "언어",
    theme: "테마",
    sound: "음향 효과",
    about: "정보",
    import: "진행 상황 가져오기",
    export: "진행 상황 내보내기",
    contact: "문의하기",
    share: "공유",
    reset: "진행 상황 재설정",
    aiSettings: "AI 설정",
    aiGenerationSettings: "AI 생성 설정",
    progressSummary: "진행 상황 요약",
    categories: "카테고리",
    mistakes: "오답",
    lastUpdated: "마지막 업데이트",
    darkMode: "다크 모드",
    lightMode: "라이트 모드",
    soundOn: "켜기",
    soundOff: "끄기",
  },
  aboutScreen: {
    title: "정보",
    aboutApp: "앱 정보",
    description1: "이 애플리케이션은 인터랙티브 퀴즈를 통해 학습하고 지식을 시험하는 데 도움을 줍니다.",
    description2: "진행 상황을 추적하고, 오답을 복습하며, 시간이 지남에 따라 기술을 향상시키세요.",
    features: "주요 기능",
    feature1: "여러 카테고리의 인터랙티브 퀴즈",
    feature2: "진행 상황 및 업적 추적",
    feature3: "오답 복습 및 연습",
    feature4: "어려운 문제에 대한 AI 기반 지원",
    feature5: "사용자 정의 문제 생성 및 관리",
    contact: "문의하기",
    contactInfo: "질문이나 피드백이 있으시면 support@quizapp.com으로 연락해 주세요",
  },
  contactScreen: {
    title: "문의하기",
    getInTouch: "연락하기",
    description: "질문이나 피드백이 있으신가요? 저희는 귀하의 의견을 듣고 싶습니다!",
    name: "이름",
    email: "이메일",
    message: "메시지",
    sendMessage: "메시지 보내기",
    sending: "전송 중...",
    successMessage: "메시지가 성공적으로 전송되었습니다!",
    errorMessage: "메시지 전송 중 오류가 발생했습니다. 다시 시도해 주세요.",
  },
  shareScreen: {
    title: "공유",
    inviteFriends: "친구 초대",
    helpGrow: "앱을 친구와 공유하여 우리를 도와주세요!",
    copyLink: "링크 복사",
    successTitle: "성공!",
    successMessage: "앱이 {{method}}을 통해 성공적으로 공유되었습니다",
    errorTitle: "오류",
    errorMessage: "{{method}}을 통해 공유하지 못했습니다. 다시 시도해 주세요.",
    backToDashboard: "대시보드로 돌아가기",
  },
  chatScreen: {
    title: "AI 어시스턴트",
    warning: "경고: Gemini API 키가 설정되지 않았습니다. 문제 은행의 AI 탭에서 설정해 주세요.",
    startConversation: "대화 시작!",
    prompt: "질문을 하거나 이미지를 업로드하거나 카테고리를 선택하여 컨텍스트를 제공하세요.",
    quizContext: "퀴즈 컨텍스트:",
    noContext: "컨텍스트 없음",
    myMistakes: "내 오답",
    typeMessage: "메시지를 입력하세요...",
    chatOptions: "채팅 옵션",
    clearHistory: "채팅 기록 지우기",
    startCall: "음성 통화 시작",
    sendMessage: "메시지 보내기",
    generatedImageAlt: "생성된 이미지",
    reviewMistakesPrompt: "이것은 제가 본 시험이고, 이 모든 문제는 제가 틀린 것입니다. 이제 오답을 복습하고 배우기 위해 당신의 도움이 필요합니다",
    categoryHelpPrompt: "이것들은 {{category}} 카테고리의 문제입니다. 선택한 데이터에 대해 알려주세요.",
  },
  difficultyScreen: {
    title: "난이도 선택",
    noQuestions: "이 카테고리에는 아직 문제가 없습니다.",
    questionsAvailable: "사용 가능한 문제",
    startQuiz: "퀴즈 시작",
  },
  questionBankScreen: {
    title: "문제 은행",
    manual: "수동",
    aiMode: "AI 모드",
    addNew: "새로 추가",
    options: "옵션",
    import: "가져오기",
    export: "내보내기",
    markdownSupport: "💡 설명이 이제 리치 텍스트, 링크 및 목록을 위한 Markdown 형식을 지원합니다",
    searchPlaceholder: "문제 검색...",
    selectAll: "모두 선택",
    delete: "삭제",
    edit: "편집",
    noQuestions: "문제를 찾을 수 없습니다",
    noResults: "\"{{searchTerm}}\"에 대한 결과가 없습니다.",
    emptyBank: "문제 은행이 비어 있습니다.",
    addFirstQuestion: "첫 번째 문제 추가",
    confirmDelete: {
      title: "삭제 확인",
      message: "이 문제를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.",
    },
    importModal: {
      importFailed: "가져오기에 실패했습니다. 다음 문제를 해결해 주세요:",
      invalidJson: "잘못된 JSON 형식입니다. 구문 오류를 확인하세요.",
    },
  },
  categories: {
    youtube_growth: {
      description: "YouTube 채널 성장 전략",
    },
    youtube_monetization: {
      description: "YouTube 콘텐츠로 수익 창출",
    },
    youtube_content: {
      description: "매력적인 동영상 제작 팁",
    },
    youtube_analytics: {
      description: "채널 성과 이해",
    },
  },
  difficultyDescriptions: {
    easy: "기본 개념 및 기초 지식",
    medium: "중급 개념 및 상세한 이해",
    hard: "고급 개념 및 심층적인 지식",
  },
  categoryEmojiMapping: {
    title: "카테고리 이모지 매핑",
    searchPlaceholder: "카테고리 검색...",
    noCategoriesFound: "카테고리를 찾을 수 없습니다",
  },
  liveCallComponent: {
    title: "실시간 음성 통화",
    context: "컨텍스트:",
    contextDescription: "퀴즈 진행 상황과 오답을 사용하여 개인화된 도움 받기",
  },
  importQuestionsModal: {
    title: "문제 가져오기",
    close: "닫기",
    importFormat: "가져오기 형식",
    json: "JSON",
    csv: "CSV",
    dropFile: "{format} 파일을 여기에 드롭하거나 클릭하여 선택",
    or: "또는",
    pasteRaw: "원시 텍스트 붙여넣기",
    formatInfo: "{format} 파일은 다음 구조를 따라야 합니다:",
    cancel: "취소",
    import: "가져오기",
  },
  aiGenerationTab: {
    title: "AI 생성",
    apiKey: {
      label: "Gemini API 키",
      placeholder: "Gemini API 키를 입력하세요",
      set: "API 키가 설정되었습니다",
      change: "키 변경",
      save: "저장",
      info: "키는 브라우저에만 저장됩니다. 무료 키를 받으세요",
    },
    prompt: {
      label: "프롬프트",
      placeholder: "예: 로마 제국에 대한 10개의 객관식 문제를 만드세요.",
      placeholderWithContext: "예: 고대 역사에 대한 {{context}} 콘텐츠를 기반으로 10개의 객관식 문제를 만드세요.",
      contextInfo: "AI는 {{context}} 콘텐츠를 분석하고 미디어와 프롬프트를 기반으로 문제를 생성합니다.",
    },
    mediaContext: {
      title: "문제 생성을 위한 컨텍스트",
    },
    buttons: {
      generate: "문제 생성",
      generating: "생성 중...",
      assignEmojis: "새 카테고리에 이모지 할당",
      enterEmoji: "이 카테고리의 이모지를 입력하세요",
      back: "뒤로",
      saveAndAdd: "이모지 저장 및 문제 추가",
      preview: "생성된 문제 (미리보기)",
      discard: "버리기",
      nextAssign: "다음: 이모지 할당",
      approveAndAdd: "승인 및 추가",
    },
    errors: {
      apiKeyMissing: "Gemini API 키를 입력하세요. ai.dev에서 무료 키를 받을 수 있습니다.",
      promptMissing: "문제를 생성할 프롬프트를 입력하세요.",
      mediaContextMissing: "미디어 컨텍스트 선택을 완료하거나 \"컨텍스트 없음\"을 선택하세요.",
      generationFailed: "문제 생성에 실패했습니다. API 키, 프롬프트 및 미디어 컨텍스트를 확인하세요.",
    },
  },
  sagaLearnScreen: {
    title: "SagaLearn",
    adventureAwaits: "모험이 기다리고 있습니다",
    adventureAwaitsDesc: "당신의 영웅적 이야기를 위한 무대를 마련하세요.",
    chooseWorld: "세상 선택하기",
    selectHero: "영웅 선택하기",
    customHero: "사용자 정의 영웅",
    customHeroDesc: "처음부터 나만의 주인공을 정의하세요.",
    customHeroPlaceholder: "예: 황금 같은 마음을 가진 교활한 도적",
    selectKnowledgePack: "지식 팩 선택하기",
    optionalLearningQuest: "선택 사항: 학습 퀘스트 추가",
    justExploring: "그냥 탐험 중",
    justExploringDesc: "순수한 이야기 모험.",
    beginAdventure: "모험 시작하기",
    craftingWorld: "세상 만들기 중...",
    error: {
      apiKey: "먼저 설정에서 Gemini API 키를 설정해 주세요.",
      adventure: "모험을 시작하지 못했습니다. API 키를 확인하고 다시 시도해 주세요.",
      load: "저장된 모험이 손상된 것 같습니다. 새 모험을 시작해야 합니다."
    },
    continuePrompt: {
      title: "모험을 계속하시겠습니까?",
      description: "자유 탐험 모드에서 완료되지 않은 여정이 기다리고 있습니다.",
      continue: "계속하기",
      startOver: "새로운 모험 시작하기",
      loading: "모험을 로딩 중..."
    },
    gameModeSelector: {
      title: "모험 선택하기",
      description: "학습 여정을 시작할 게임 모드를 선택하세요.",
      quizAdventure: "퀴즈 모험",
      quizAdventureDesc: "지식이 진전을 해제하는 구조화되고 이야기 주도적인 퀘스트입니다.",
      freeExploration: "자유 탐험",
      freeExplorationDesc: "자신의 속도로 배우고 발견할 수 있는 개방형 세계입니다.",
      quizAdventureDetails: "지식이 진전을 해제하는 구조화되고 이야기 주도적인 퀘스트입니다.",
      freeExplorationDetails: "자신의 속도로 배우고 발견할 수 있는 개방형 세계입니다."
    },
    adventureConfigurator: {
      loading: "세상 만들기 중...",
      error: "모험을 시작하지 못했습니다. API 키를 확인하고 다시 시도해 주세요.",
      adventureAwaits: "모험이 기다리고 있습니다",
      adventureAwaitsDesc: "당신의 영웅적 이야기를 위한 무대를 마련하세요.",
      chooseWorld: "세상 선택하기",
      selectHero: "영웅 선택하기",
      customHero: "사용자 정의 영웅",
      customHeroDesc: "처음부터 나만의 주인공을 정의하세요.",
      customHeroPlaceholder: "예: 황금 같은 마음을 가진 교활한 도적",
      selectKnowledgePack: "지식 팩 선택하기",
      optionalLearningQuest: "선택사항: 학습 퀘스트 추가",
      justExploring: "탐험만 하기",
      justExploringDesc: "순수한 내러티브 모험입니다.",
      beginAdventure: "모험 시작하기",
      selectOption: "옵션 선택"
    },
    customDropdown: {
      placeholder: "옵션 선택"
    },
    quizAdventureUI: {
      question: "문제",
      choices: "선택지",
      submit: "제출",
      next: "다음",
      finish: "퀴즈 종료",
      loading: "다음 문제를 로딩 중...",
      explanation: "설명",
      objective: "목표",
      survive: "생존",
      turnsRemaining: "남은 턴: {{count}}",
      storyUnfolds: "이야기가 펼쳐집니다...",
      victory: "승리!",
      gameOver: "게임 오버",
      playAgain: "다시 플레이",
      correct: "정답!",
      incorrect: "오답!",
      generatingScene: "장면 생성 중...",
      openDashboard: "대시보드 열기"
    },
    freeExplorationUI: {
      whatDoYouSay: "{{dialoguePartner}}에게 무엇을 말할까요?",
      whatDoYouDo: "다음에 무엇을 할까요?",
      suggestions: "제안",
      go: "가기"
    }
  },
  aiGeneratorScreen: {
    title: "AI App Studio",
    subtitle: "Create Interactive Apps with AI",
    description: "Generate games, lessons, simulations, and tools using advanced AI. Simply describe what you want to create and watch it come to life!"
  },
  aiGenerator: {
    tabs: {
      generator: "Generator",
      gallery: "My Apps"
    },
    apiKey: {
      required: "API Key Required",
      instructions: "Please set your Gemini API key in Settings to use the AI App Studio."
    },
    settings: {
      title: "Advanced Settings",
      show: "Show Advanced",
      hide: "Hide Advanced"
    },
    modelSelector: {
      title: "AI Model Selection",
      tooltip: "Choose the AI model that best fits your needs. Different models have different capabilities and performance characteristics.",
      recommendation: "Model Recommendations:"
    },
    starterPrompts: {
      title: "Starter Ideas"
    },
    context: {
      title: "Use Your Quiz Data",
      description: "Enhance your generated apps by including your quiz categories and learning progress as context.",
      includeCategories: "Include Quiz Categories",
      includeCategoriesDesc: "Use your quiz categories as topics for the generated app",
      includeMistakes: "Include My Mistakes",
      includeMistakesDesc: "Focus on areas where you need more practice",
      selectCategories: "Select specific categories:",
      selectedCount: "{{count}} categories selected",
      summary: "Context Summary:",
      summaryCategories: "Using categories: {{categories}}",
      summaryAllCategories: "Using all available categories",
      summaryMistakes: "Focusing on your mistake areas"
    },
    prompt: {
      label: "Describe Your App",
      placeholder: "e.g., Create a memory matching game with animals, or build an interactive lesson about photosynthesis with animations and a quiz...",
      hint: "Be specific about what you want - the more details you provide, the better your app will be!"
    },
    buttons: {
      generate: "Generate App",
      generating: "Creating Your App...",
      save: "Save App",
      createNew: "Create New App"
    },
    preview: {
      title: "App Preview",
      loading: "Loading your app...",
      refresh: "Refresh",
      fullscreen: "Fullscreen",
      exitFullscreen: "Exit Fullscreen",
      close: "Close",
      info: "Your app is running in a secure sandbox environment"
    },
    saveModal: {
      title: "Save Your App",
      nameLabel: "App Name",
      namePlaceholder: "Enter a name for your app",
      descriptionLabel: "Description (Optional)",
      descriptionPlaceholder: "Describe what your app does...",
      characters: "characters",
      infoTitle: "Note:",
      infoText: "Your app will be saved locally in your browser and can be accessed anytime from the gallery.",
      cancel: "Cancel",
      save: "Save App",
      saving: "Saving..."
    },
    gallery: {
      title: "My Generated Apps",
      empty: {
        title: "No Apps Yet",
        description: "Create your first AI-generated app to see it here!"
      },
      preview: "Preview",
      deleteConfirm: {
        title: "Delete App",
        message: "Are you sure you want to delete this app? This action cannot be undone.",
        cancel: "Cancel",
        delete: "Delete"
      }
    },
    errors: {
      apiKeyMissing: "Please set your Gemini API key in Settings first.",
      promptMissing: "Please describe what kind of app you want to create.",
      generationFailed: "Failed to generate your app. Please check your API key and try again."
    }
  }
};