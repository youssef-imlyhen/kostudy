export const ru = {
  // General
  appName: "Приложение для викторин",
  
  // Navigation
  nav: {
    home: "Главная",
    categories: "Категории",
    mistakes: "Ошибки",
    settings: "Настройки",
    achievements: "Достижения",
    about: "О нас",
    contact: "Контакты",
    share: "Поделиться",
    dashboard: "Панель управления",
    questions: "Вопросы",
    chat: "Чат с ИИ",
  },
  
  // Screens
  homeScreen: {
    welcome: "Добро пожаловать в викторину!",
    enterName: "Введите ваше имя, чтобы начать",
    placeholder: "Ваше имя",
    letsGo: "Поехали!",
    subtitle: "Проверьте свои знания и узнайте что-то новое",
    or: "Или",
    importProgress: "Импортировать прогресс",
    welcomeBack: "С возвращением",
    readyToLearn: "Готовы продолжить учебу?",
    toReview: "К повторению",
    categories: "Категории",
    continueLearning: "Продолжить обучение",
    startLearning: "Начать обучение",
    namePlaceholder: "Введите ваше имя",
  },
  dashboard: {
    title: "Панель управления",
    welcome: "Добро пожаловать",
    subtitle: "Продолжайте свое обучение",
    categories: "Категории",
    questions: "Вопросы",
    toReview: "К повторению",
    learningPath: "Путь обучения",
    browseAll: "Просмотреть все",
    playAll: "Играть все вопросы",
    playAllDesc: "Проверьте свои знания во всех категориях",
    practice: "Практика",
    achievements: "Достижения",
    achievementsDesc: "Отслеживайте свой прогресс и достижения",
    reviewMistakes: "Повторить ошибки",
    questionsToPractice: "вопросов для практики",
    communityTools: "Сообщество и инструменты",
    aiAssistant: "Помощник ИИ",
    aiAssistantDesc: "Получите помощь с трудными вопросами",
    customQuestions: "Пользовательские вопросы",
    customQuestionsDesc: "Создавайте и управляйте своим контентом",
  },
  categoriesScreen: {
    title: "Категории",
  },
  categoryScreen: {
    startQuiz: "Начать викторину",
    categoryNotFound: "Категория не найдена",
  },
  quizScreen: {
    title: "Викторина",
    next: "Следующий",
    submit: "Отправить",
    finishQuiz: "Завершить викторину",
    understood: "Понятно",
    currentStreak: "Текущая серия",
    bestStreak: "Лучшая серия",
    question: "Вопрос",
    showExplanation: "Показать объяснение",
    continueStreak: "Продолжить серию",
    loading: "Загрузка...",
    unsupportedQuestionType: "Неподдерживаемый тип вопроса",
  },
  resultsScreen: {
    title: "Результаты",
    score: "Ваш счет",
    correct: "Правильно",
    incorrect: "Неправильно",
    playAgain: "Играть снова",
    backToCategories: "Назад к категориям",
    streakOver: "Серия окончена!",
    questionsAnsweredCorrectly: "Вопросы, на которые дан правильный ответ",
    newPersonalBest: "Новый личный рекорд!",
    personalBest: "Личный рекорд",
    tryAgain: "Попробуйте еще раз",
    explanation: "Объяснение",
    levelComplete: "Уровень {{level}} завершен",
    greatJob: "Отличная работа! Вы освоили этот уровень.",
    keepPracticing: "Продолжайте практиковаться, чтобы улучшить свой результат!",
    incorrectAnswers: "Неправильные ответы: {{count}}",
    correctAnswers: "Правильные ответы: {{count}}",
    continue: "Продолжить",
    reviewMistakes: "Повторить ошибки",
  },
  achievementsScreen: {
    title: "Достижения",
    points: "Очки",
    correctAnswers: "Правильные ответы",
    completed: "Завершено",
    performanceByCategory: "Результаты по категориям",
    questionsCount: "{{completed}}/{{total}} Вопросов",
    accuracy: "{{accuracy}}% Правильно",
    noPerformance: "Пройдите викторины, чтобы увидеть свои результаты!",
    practiceMistakes: "Практиковать ошибки ({{count}})",
    unlocked: "Разблокировано",
    progress: "Прогресс",
  },
  achievements: {
    firstSteps: {
      title: "Первые шаги",
      description: "Завершите свой первый вопрос викторины"
    },
    quizMaster: {
      title: "Мастер викторин",
      description: "Ответьте правильно на 50 вопросов"
    },
    speedDemon: {
      title: "Скоростной демон",
      description: "Ответьте на вопрос менее чем за 5 секунд"
    },
    streakChampion: {
      title: "Чемпион по сериям",
      description: "Сохраните серию в течение 7 дней"
    },
    categoryConqueror: {
      title: "Покоритель категорий",
      description: "Завершите все вопросы в одной категории"
    },
    perfectScore: {
      title: "Идеальный результат",
      description: "Получите 100% в викторине с 10+ вопросами"
    },
    dedicatedLearner: {
      title: "Преданный ученик",
      description: "Завершите 100 вопросов"
    },
    mistakeMaster: {
      title: "Мастер ошибок",
      description: "Повторите и исправьте 20 ошибок"
    },
    wellRounded: {
      title: "Хорошо сбалансированный",
      description: "Завершите викторины в 3 разных категориях"
    }
  },
  achievementTiers: {
    bronze: "Бронза",
    silver: "Серебро",
    gold: "Золото",
    platinum: "Платина"
  },
  mistakesScreen: {
    title: "Мои ошибки",
    noMistakes: "Вы еще не сделали ни одной ошибки. Так держать!",
    reviewMistakesInCategory: "Повторите свои ошибки в {{category}}",
    score: "Счет",
    categories: "Категории",
    total: "Всего",
    practiceAllMistakes: "Практиковать все ошибки",
    wrongAnswers: "Неправильные ответы",
  },
  settingsScreen: {
    title: "Настройки",
    language: "Язык",
    theme: "Тема",
    sound: "Звуковые эффекты",
    about: "О нас",
    import: "Импортировать прогресс",
    export: "Экспортировать прогресс",
    contact: "Связаться с нами",
    share: "Поделиться",
    reset: "Сбросить прогресс",
    aiSettings: "Настройки ИИ",
    aiGenerationSettings: "Настройки генерации ИИ",
    progressSummary: "Сводка прогресса",
    categories: "Категории",
    mistakes: "Ошибки",
    lastUpdated: "Последнее обновление",
    darkMode: "Темный режим",
    lightMode: "Светлый режим",
    soundOn: "Вкл",
    soundOff: "Выкл",
  },
  aboutScreen: {
    title: "О нас",
    aboutApp: "О приложении",
    description1: "Это приложение помогает вам учиться и проверять свои знания с помощью интерактивных викторин.",
    description2: "Отслеживайте свой прогресс, повторяйте ошибки и совершенствуйте свои навыки со временем.",
    features: "Основные функции",
    feature1: "Интерактивные викторины по нескольким категориям",
    feature2: "Отслеживание прогресса и достижений",
    feature3: "Повторение и практика ошибок",
    feature4: "Помощь на основе ИИ для сложных вопросов",
    feature5: "Создание и управление пользовательскими вопросами",
    contact: "Связаться с нами",
    contactInfo: "Если у вас есть вопросы или отзывы, пожалуйста, свяжитесь с нами по адресу support@quizapp.com",
  },
  contactScreen: {
    title: "Связаться с нами",
    getInTouch: "Связаться",
    description: "Есть вопросы или отзывы? Мы будем рады услышать вас!",
    name: "Имя",
    email: "Электронная почта",
    message: "Сообщение",
    sendMessage: "Отправить сообщение",
    sending: "Отправка...",
    successMessage: "Ваше сообщение успешно отправлено!",
    errorMessage: "Произошла ошибка при отправке вашего сообщения. Пожалуйста, попробуйте еще раз.",
  },
  shareScreen: {
    title: "Поделиться",
    inviteFriends: "Пригласить друзей",
    helpGrow: "Помогите нам расти, поделившись приложением с друзьями!",
    copyLink: "Копировать ссылку",
    successTitle: "Успех!",
    successMessage: "Приложение успешно отправлено через {{method}}",
    errorTitle: "Ошибка",
    errorMessage: "Не удалось поделиться через {{method}}. Пожалуйста, попробуйте еще раз.",
    backToDashboard: "Назад к панели управления",
  },
  chatScreen: {
    title: "Помощник ИИ",
    warning: "Предупреждение: Ключ API Gemini не установлен. Пожалуйста, установите его во вкладке ИИ в Банке вопросов.",
    startConversation: "Начните разговор!",
    prompt: "Задайте вопрос, загрузите изображение или выберите категорию для контекста.",
    quizContext: "Контекст викторины:",
    noContext: "Нет контекста",
    myMistakes: "Мои ошибки",
    typeMessage: "Введите ваше сообщение...",
    chatOptions: "Опции чата",
    clearHistory: "Очистить историю чата",
    startCall: "Начать голосовой вызов",
    sendMessage: "Отправить сообщение",
    generatedImageAlt: "сгенерированное изображение",
    reviewMistakesPrompt: "Это тест, который я проходил, и это все вопросы, на которые я ответил неправильно, теперь мне нужна ваша помощь, чтобы повторить и научиться на своих ошибках",
    categoryHelpPrompt: "Это вопросы из категории {{category}}. Пожалуйста, помогите мне узнать больше о выбранных данных.",
  },
  difficultyScreen: {
    title: "Выбрать сложность",
    noQuestions: "Для этой категории пока нет вопросов.",
    questionsAvailable: "доступных вопросов",
    startQuiz: "Начать викторину",
  },
  questionBankScreen: {
    title: "Банк вопросов",
    manual: "Вручную",
    aiMode: "Режим ИИ",
    addNew: "Добавить новый",
    options: "Опции",
    import: "Импорт",
    export: "Экспорт",
    markdownSupport: "💡 Объяснения теперь поддерживают форматирование Markdown для форматированного текста, ссылок и списков",
    searchPlaceholder: "Поиск вопросов...",
    selectAll: "Выбрать все",
    delete: "Удалить",
    edit: "Редактировать",
    noQuestions: "Вопросы не найдены",
    noResults: "Нет результатов для \"{{searchTerm}}\".",
    emptyBank: "Ваш банк вопросов пуст.",
    addFirstQuestion: "Добавьте свой первый вопрос",
    confirmDelete: {
      title: "Подтвердить удаление",
      message: "Вы уверены, что хотите удалить этот вопрос? Это действие нельзя отменить.",
    },
    importModal: {
      importFailed: "Импорт не удался. Пожалуйста, исправьте следующие проблемы:",
      invalidJson: "Неверный формат JSON. Проверьте синтаксические ошибки.",
    },
  },
  categories: {
    youtube_growth: {
      description: "Стратегии роста вашего YouTube-канала",
    },
    youtube_monetization: {
      description: "Заработок на вашем YouTube-контенте",
    },
    youtube_content: {
      description: "Советы по созданию привлекательных видео",
    },
    youtube_analytics: {
      description: "Понимание производительности вашего канала",
    },
  },
  difficultyDescriptions: {
    easy: "Базовые концепции и фундаментальные знания",
    medium: "Промежуточные концепции и подробное понимание",
    hard: "Продвинутые концепции и глубокие знания",
  },
  categoryEmojiMapping: {
    title: "Сопоставление эмодзи категорий",
    searchPlaceholder: "Поиск категорий...",
    noCategoriesFound: "Категории не найдены",
  },
  liveCallComponent: {
    title: "Живой голосовой вызов",
    context: "Контекст:",
    contextDescription: "Использование вашего прогресса в викторине и ошибок для персонализированной помощи",
  },
  importQuestionsModal: {
    title: "Импорт вопросов",
    close: "Закрыть",
    importFormat: "Формат импорта",
    json: "JSON",
    csv: "CSV",
    dropFile: "Перетащите ваш {format} файл сюда или нажмите, чтобы выбрать",
    or: "ИЛИ",
    pasteRaw: "Вставить необработанный текст",
    formatInfo: "Ваш {format} файл должен следовать этой структуре:",
    cancel: "Отмена",
    import: "Импорт",
  },
  aiGenerationTab: {
    title: "Генерация ИИ",
    apiKey: {
      label: "Ключ API Gemini",
      placeholder: "Введите ваш ключ API Gemini",
      set: "Ключ API установлен",
      change: "Изменить ключ",
      save: "Сохранить",
      info: "Ваш ключ хранится только в вашем браузере. Получите бесплатный ключ на",
    },
    prompt: {
      label: "Подсказка",
      placeholder: "Например: Создайте 10 вопросов с множественным выбором о Римской империи.",
      placeholderWithContext: "Например: Создайте 10 вопросов с множественным выбором на основе содержания {{context}} о древней истории.",
      contextInfo: "ИИ проанализирует ваше содержание {{context}} и сгенерирует вопросы на основе медиа и вашей подсказки.",
    },
    mediaContext: {
      title: "Контекст для генерации вопросов",
    },
    buttons: {
      generate: "Сгенерировать вопросы",
      generating: "Генерация...",
      assignEmojis: "Назначить эмодзи новым категориям",
      enterEmoji: "Введите эмодзи для этой категории",
      back: "Назад",
      saveAndAdd: "Сохранить эмодзи и добавить вопросы",
      preview: "Сгенерированные вопросы (предварительный просмотр)",
      discard: "Отменить",
      nextAssign: "Далее: Назначить эмодзи",
      approveAndAdd: "Одобрить и добавить",
    },
    errors: {
      apiKeyMissing: "Пожалуйста, введите ваш ключ API Gemini. Вы можете получить бесплатный ключ на ai.dev.",
      promptMissing: "Пожалуйста, введите подсказку для генерации вопросов.",
      mediaContextMissing: "Пожалуйста, завершите выбор медиаконтекста или выберите \"Без контекста\".",
      generationFailed: "Не удалось сгенерировать вопросы. Пожалуйста, проверьте ваш ключ API, подсказку и медиаконтекст.",
    },
  },
  sagaLearnScreen: {
    title: "SagaLearn",
    adventureAwaits: "Приключение Ждет",
    adventureAwaitsDesc: "Подготовьте сцену для вашего эпического рассказа.",
    chooseWorld: "Выберите Свой Мир",
    selectHero: "Выберите Героя",
    customHero: "Пользовательский Герой",
    customHeroDesc: "Определите своего собственного протагониста с нуля.",
    customHeroPlaceholder: "Например, хитрый плут с золотым сердцем",
    selectKnowledgePack: "Выберите Пакет Знаний",
    optionalLearningQuest: "Необязательно: Добавьте Учебный Квест",
    justExploring: "Просто Исследую",
    justExploringDesc: "Чистое повествовательное приключение.",
    beginAdventure: "Начать Приключение",
    craftingWorld: "Создание вашего мира...",
    error: {
      apiKey: "Пожалуйста, сначала установите ваш ключ API Gemini в Настройках.",
      adventure: "Не удалось начать приключение. Пожалуйста, проверьте ваш ключ API и попробуйте снова.",
      load: "Ваше сохраненное приключение, похоже, повреждено. Нам нужно начать новое."
    },
    continuePrompt: {
      title: "Продолжить Ваше Приключение?",
      description: "Незавершенное путешествие в режиме Свободного Исследования ждет вас.",
      continue: "Продолжить",
      startOver: "Начать Новое Приключение",
      loading: "Загрузка вашего приключения..."
    },
    gameModeSelector: {
      title: "Выберите Свое Приключение",
      description: "Выберите режим игры, чтобы начать свое учебное путешествие.",
      quizAdventure: "Приключение Викторины",
      quizAdventureDesc: "Структурированный, движимый историей квест, где знания открывают прогресс.",
      freeExploration: "Свободное Исследование",
      freeExplorationDesc: "Открытый мир, где вы можете учиться и открывать новое в своем темпе.",
      quizAdventureDetails: "Структурированный, движимый историей квест, где знания открывают прогресс.",
      freeExplorationDetails: "Открытый мир, где вы можете учиться и открывать новое в своем темпе."
    },
    adventureConfigurator: {
      loading: "Создание вашего мира...",
      error: "Не удалось начать приключение. Пожалуйста, проверьте ваш ключ API и попробуйте снова.",
      adventureAwaits: "Приключение Ждет",
      adventureAwaitsDesc: "Подготовьте сцену для вашего эпического рассказа.",
      chooseWorld: "Выберите Свой Мир",
      selectHero: "Выберите Героя",
      customHero: "Пользовательский Герой",
      customHeroDesc: "Определите своего собственного протагониста с нуля.",
      customHeroPlaceholder: "Например, хитрый плут с золотым сердцем",
      selectKnowledgePack: "Выберите Пакет Знаний",
      optionalLearningQuest: "Необязательно: Добавить учебный квест",
      justExploring: "Просто Исследую",
      justExploringDesc: "Чистое повествовательное приключение.",
      beginAdventure: "Начать Приключение",
      selectOption: "Выберите опцию"
    },
    customDropdown: {
      placeholder: "Выберите опцию"
    },
    quizAdventureUI: {
      question: "Вопрос",
      choices: "Выбор",
      submit: "Отправить",
      next: "Следующий",
      finish: "Завершить викторину",
      loading: "Загрузка следующего вопроса...",
      explanation: "Объяснение",
      objective: "Цель",
      survive: "Выжить",
      turnsRemaining: "Осталось ходов: {{count}}",
      storyUnfolds: "История развивается...",
      victory: "Победа!",
      gameOver: "Игра окончена",
      playAgain: "Играть снова",
      correct: "Правильно!",
      incorrect: "Неправильно!",
      generatingScene: "Генерация сцены...",
      openDashboard: "Открыть панель управления"
    },
    freeExplorationUI: {
      whatDoYouSay: "Что вы скажете {{dialoguePartner}}?",
      whatDoYouDo: "Что вы делаете дальше?",
      suggestions: "Предложения",
      go: "Идти"
    }
  },
  aiGeneratorScreen: {
    title: "AI App Studio",
    subtitle: "Создавайте интерактивные приложения с помощью ИИ",
    description: "Генерируйте игры, уроки, симуляции и инструменты с помощью продвинутого ИИ. Просто опишите, что вы хотите создать, и наблюдайте, как это оживает!"
  },
  aiGenerator: {
    tabs: {
      generator: "Генератор",
      gallery: "Мои приложения"
    },
    apiKey: {
      required: "Требуется ключ API",
      instructions: "Пожалуйста, установите ваш ключ API Gemini в Настройках, чтобы использовать AI App Studio."
    },
    settings: {
      title: "Расширенные настройки",
      show: "Показать расширенные",
      hide: "Скрыть расширенные"
    },
    modelSelector: {
      title: "Выбор модели ИИ",
      tooltip: "Выберите модель ИИ, которая лучше всего соответствует вашим потребностям. Разные модели имеют разные возможности и характеристики производительности.",
      recommendation: "Рекомендации по моделям:"
    },
    starterPrompts: {
      title: "Идеи для начала"
    },
    context: {
      title: "Используйте данные вашего теста",
      description: "Улучшите свои сгенерированные приложения, включив категории теста и прогресс обучения в качестве контекста.",
      includeCategories: "Включить категории теста",
      includeCategoriesDesc: "Используйте категории теста как темы для сгенерированного приложения",
      includeMistakes: "Включить мои ошибки",
      includeMistakesDesc: "Сосредоточьтесь на областях, где вам нужно больше практики",
      selectCategories: "Выберите конкретные категории:",
      selectedCount: "Выбрано {{count}} категорий",
      summary: "Сводка контекста:",
      summaryCategories: "Используемые категории: {{categories}}",
      summaryAllCategories: "Использование всех доступных категорий",
      summaryMistakes: "Фокус на ваших ошибках"
    },
    prompt: {
      label: "Опишите ваше приложение",
      placeholder: "например, создайте игру на запоминание с животными или постройте интерактивный урок о фотосинтезе с анимациями и тестом...",
      hint: "Будьте конкретны в своих пожеланиях - чем больше деталей вы предоставите, тем лучше будет ваше приложение!"
    },
    buttons: {
      generate: "Сгенерировать приложение",
      generating: "Создание вашего приложения...",
      save: "Сохранить приложение",
      createNew: "Создать новое приложение"
    },
    preview: {
      title: "Предварительный просмотр приложения",
      loading: "Загрузка вашего приложения...",
      refresh: "Обновить",
      fullscreen: "Полноэкранный режим",
      exitFullscreen: "Выйти из полноэкранного режима",
      close: "Закрыть",
      info: "Ваше приложение работает в безопасной песочнице"
    },
    saveModal: {
      title: "Сохранить ваше приложение",
      nameLabel: "Название приложения",
      namePlaceholder: "Введите название для вашего приложения",
      descriptionLabel: "Описание (необязательно)",
      descriptionPlaceholder: "Опишите, что делает ваше приложение...",
      characters: "символов",
      infoTitle: "Примечание:",
      infoText: "Ваше приложение будет сохранено локально в вашем браузере и может быть доступно в любое время из галереи.",
      cancel: "Отмена",
      save: "Сохранить приложение",
      saving: "Сохранение..."
    },
    gallery: {
      title: "Мои сгенерированные приложения",
      empty: {
        title: "Пока нет приложений",
        description: "Создайте свое первое приложение, сгенерированное ИИ, чтобы увидеть его здесь!"
      },
      preview: "Предварительный просмотр",
      deleteConfirm: {
        title: "Удалить приложение",
        message: "Вы уверены, что хотите удалить это приложение? Это действие нельзя отменить.",
        cancel: "Отмена",
        delete: "Удалить"
      }
    },
    errors: {
      apiKeyMissing: "Пожалуйста, сначала установите ваш ключ API Gemini в Настройках.",
      promptMissing: "Пожалуйста, опишите, какое приложение вы хотите создать.",
      generationFailed: "Не удалось сгенерировать ваше приложение. Пожалуйста, проверьте ваш ключ API и попробуйте снова."
    }
  }
};