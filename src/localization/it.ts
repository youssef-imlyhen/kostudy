export const it = {
  // General
  appName: "App Quiz",
  
  // Navigation
  nav: {
    home: "Home",
    categories: "Categorie",
    mistakes: "Errori",
    settings: "Impostazioni",
    achievements: "Obiettivi",
    about: "Informazioni",
    contact: "Contatti",
    share: "Condividi",
    dashboard: "Dashboard",
    questions: "Domande",
    chat: "Chat AI",
  },
  
  // Screens
  homeScreen: {
    welcome: "Benvenuto nel Quiz!",
    enterName: "Inserisci il tuo nome per iniziare",
    placeholder: "Il tuo nome",
    letsGo: "Andiamo!",
    subtitle: "Metti alla prova le tue conoscenze e impara qualcosa di nuovo",
    or: "O",
    importProgress: "Importa Progresso",
    welcomeBack: "Bentornato",
    readyToLearn: "Pronto per continuare il tuo percorso di apprendimento?",
    toReview: "Da Rivedere",
    categories: "Categorie",
    continueLearning: "Continua ad Imparare",
    startLearning: "Inizia ad Imparare",
    namePlaceholder: "Inserisci il tuo nome",
  },
  dashboard: {
    title: "Dashboard",
    welcome: "Benvenuto",
    subtitle: "Continua il tuo percorso di apprendimento",
    categories: "Categorie",
    questions: "Domande",
    toReview: "Da Rivedere",
    learningPath: "Percorso di Apprendimento",
    browseAll: "Sfoglia tutto",
    playAll: "Gioca a Tutte le Domande",
    playAllDesc: "Metti alla prova le tue conoscenze in tutte le categorie",
    practice: "Esercitati",
    achievements: "Obiettivi",
    achievementsDesc: "Tieni traccia dei tuoi progressi e traguardi",
    reviewMistakes: "Rivedi gli Errori",
    questionsToPractice: "domande da esercitare",
    communityTools: "Comunità e Strumenti",
    aiAssistant: "Assistente AI",
    aiAssistantDesc: "Ottieni aiuto con le domande difficili",
    customQuestions: "Domande Personalizzate",
    customQuestionsDesc: "Crea e gestisci i tuoi contenuti",
    sagaLearn: "SagaLearn",
    sagaLearnDesc: "Avventure di apprendimento interattivo potenziate dall'IA",
    aiAppStudio: "Studio di Applicazioni IA",
    aiAppStudioDesc: "Crea giochi, lezioni e simulazioni interattive con l'IA",
  },
  categoriesScreen: {
    title: "Categorie",
  },
  categoryScreen: {
    startQuiz: "Inizia Quiz",
    categoryNotFound: "Categoria non trovata",
  },
  quizScreen: {
    title: "Quiz",
    next: "Successivo",
    submit: "Invia",
    finishQuiz: "Termina Quiz",
    understood: "Capito",
    currentStreak: "Serie Corrente",
    bestStreak: "Miglior Serie",
    question: "Domanda",
    showExplanation: "Mostra Spiegazione",
    continueStreak: "Continua la Serie",
    loading: "Caricamento...",
    unsupportedQuestionType: "Tipo di domanda non supportato",
  },
  resultsScreen: {
    title: "Risultati",
    score: "Il Tuo Punteggio",
    correct: "Corretto",
    incorrect: "Errato",
    playAgain: "Gioca Ancora",
    backToCategories: "Torna alle Categorie",
    streakOver: "Serie Terminata!",
    questionsAnsweredCorrectly: "Domande risposte correttamente",
    newPersonalBest: "Nuovo record personale!",
    personalBest: "Record Personale",
    tryAgain: "Riprova",
    explanation: "Spiegazione",
    levelComplete: "Livello {{level}} Completato",
    greatJob: "Ottimo lavoro! Hai padroneggiato questo livello.",
    keepPracticing: "Continua ad esercitarti per migliorare il tuo punteggio!",
    incorrectAnswers: "Risposte Errate: {{count}}",
    correctAnswers: "Risposte Corrette: {{count}}",
    continue: "Continua",
    reviewMistakes: "Rivedi gli Errori",
  },
  achievementsScreen: {
    title: "Obiettivi",
    points: "Punti",
    correctAnswers: "Risposte Corrette",
    completed: "Completato",
    performanceByCategory: "Prestazioni per Categoria",
    questionsCount: "{{completed}}/{{total}} Domande",
    accuracy: "{{accuracy}}% Corrette",
    noPerformance: "Completa i quiz per vedere le tue prestazioni!",
    practiceMistakes: "Esercitati sugli Errori ({{count}})",
    unlocked: "Sbloccato",
    progress: "Progresso",
  },
  achievements: {
    firstSteps: {
      title: "Primi Passi",
      description: "Completa la tua prima domanda del quiz"
    },
    quizMaster: {
      title: "Maestro del Quiz",
      description: "Rispondi correttamente a 50 domande"
    },
    speedDemon: {
      title: "Demone della Velocità",
      description: "Rispondi a una domanda in meno di 5 secondi"
    },
    streakChampion: {
      title: "Campione di Serie",
      description: "Mantieni una serie di 7 giorni"
    },
    categoryConqueror: {
      title: "Conquistatore di Categorie",
      description: "Completa tutte le domande in una categoria"
    },
    perfectScore: {
      title: "Punteggio Perfetto",
      description: "Ottieni il 100% in un quiz di 10+ domande"
    },
    dedicatedLearner: {
      title: "Apprendista Dedicato",
      description: "Completa 100 domande"
    },
    mistakeMaster: {
      title: "Maestro degli Errori",
      description: "Rivedi e correggi 20 errori"
    },
    wellRounded: {
      title: "Ben Arrotondato",
      description: "Completa quiz in 3 categorie diverse"
    }
  },
  achievementTiers: {
    bronze: "Bronzo",
    silver: "Argento",
    gold: "Oro",
    platinum: "Platino"
  },
  mistakesScreen: {
    title: "I Miei Errori",
    noMistakes: "Non hai ancora commesso errori. Continua così!",
    reviewMistakesInCategory: "Rivedi i tuoi errori in {{category}}",
    score: "Punteggio",
    categories: "Categorie",
    total: "Totale",
    practiceAllMistakes: "Esercitati su Tutti gli Errori",
    wrongAnswers: "Risposte Errate",
  },
  settingsScreen: {
    title: "Impostazioni",
    language: "Lingua",
    theme: "Tema",
    sound: "Effetti Sonori",
    about: "Informazioni",
    import: "Importa Progresso",
    export: "Esporta Progresso",
    contact: "Contattaci",
    share: "Condividi",
    reset: "Reimposta Progresso",
    aiSettings: "Impostazioni AI",
    aiGenerationSettings: "Impostazioni Generazione AI",
    progressSummary: "Riepilogo Progresso",
    categories: "Categorie",
    mistakes: "Errori",
    lastUpdated: "Ultimo Aggiornamento",
    darkMode: "Modalità Scura",
    lightMode: "Modalità Chiara",
    soundOn: "Attivo",
    soundOff: "Disattivo",
  },
  aboutScreen: {
    title: "Informazioni",
    aboutApp: "Informazioni sull'App",
    description1: "Questa applicazione ti aiuta a imparare e mettere alla prova le tue conoscenze attraverso quiz interattivi.",
    description2: "Tieni traccia dei tuoi progressi, rivedi i tuoi errori e migliora le tue abilità nel tempo.",
    features: "Caratteristiche Principali",
    feature1: "Quiz interattivi in più categorie",
    feature2: "Tieni traccia dei tuoi progressi e obiettivi",
    feature3: "Rivedi ed esercitati sui tuoi errori",
    feature4: "Assistenza basata sull'AI per domande difficili",
    feature5: "Creazione e gestione di domande personalizzate",
    contact: "Contattaci",
    contactInfo: "Se hai domande o feedback, contattaci all'indirizzo support@quizapp.com",
  },
  contactScreen: {
    title: "Contattaci",
    getInTouch: "Mettiti in Contatto",
    description: "Hai domande o feedback? Ci piacerebbe sentirti!",
    name: "Nome",
    email: "Email",
    message: "Messaggio",
    sendMessage: "Invia Messaggio",
    sending: "Invio in corso...",
    successMessage: "Il tuo messaggio è stato inviato con successo!",
    errorMessage: "Si è verificato un errore durante l'invio del tuo messaggio. Riprova.",
  },
  shareScreen: {
    title: "Condividi",
    inviteFriends: "Invita Amici",
    helpGrow: "Aiutaci a crescere condividendo l'app con i tuoi amici!",
    copyLink: "Copia Link",
    successTitle: "Successo!",
    successMessage: "L'app è stata condivisa con successo tramite {{method}}",
    errorTitle: "Errore",
    errorMessage: "Impossibile condividere tramite {{method}}. Riprova.",
    backToDashboard: "Torna alla Dashboard",
  },
  chatScreen: {
    title: "Assistente AI",
    warning: "Attenzione: Chiave API di Gemini non impostata. Impostala nella scheda AI del Banco Domande.",
    startConversation: "Inizia una conversazione!",
    prompt: "Fai una domanda, carica un'immagine o seleziona una categoria per il contesto.",
    quizContext: "Contesto Quiz:",
    noContext: "Nessun Contesto",
    myMistakes: "I Miei Errori",
    typeMessage: "Scrivi il tuo messaggio...",
    chatOptions: "Opzioni Chat",
    clearHistory: "Cancella Cronologia Chat",
    startCall: "Avvia Chiamata Vocale",
    sendMessage: "Invia messaggio",
    generatedImageAlt: "immagine generata",
    reviewMistakesPrompt: "Questo è un test che ho sostenuto e queste sono tutte le domande a cui ho risposto male, ora ho bisogno che tu mi aiuti a rivedere e imparare dai miei errori",
    categoryHelpPrompt: "Queste sono domande della categoria {{category}}. Per favore aiutami a conoscere i dati selezionati.",
  },
  difficultyScreen: {
    title: "Scegli Difficoltà",
    noQuestions: "Nessuna domanda disponibile per questa categoria ancora.",
    questionsAvailable: "domande disponibili",
    startQuiz: "Inizia Quiz",
  },
  questionBankScreen: {
    title: "Banco Domande",
    manual: "Manuale",
    aiMode: "Modalità AI",
    addNew: "Aggiungi Nuovo",
    options: "Opzioni",
    import: "Importa",
    export: "Esporta",
    markdownSupport: "💡 Le spiegazioni ora supportano la formattazione Markdown per testo ricco, link e liste",
    searchPlaceholder: "Cerca domande...",
    selectAll: "Seleziona Tutto",
    delete: "Elimina",
    edit: "Modifica",
    noQuestions: "Nessuna Domanda Trovata",
    noResults: "Nessun risultato per \"{{searchTerm}}\".",
    emptyBank: "Il tuo banco domande è vuoto.",
    addFirstQuestion: "Aggiungi la Tua Prima Domanda",
    confirmDelete: {
      title: "Conferma Eliminazione",
      message: "Sei sicuro di voler eliminare questa domanda? Questa azione non può essere annullata.",
    },
    importModal: {
      importFailed: "Importazione fallita. Correggi i seguenti problemi:",
      invalidJson: "Formato JSON non valido. Controlla gli errori di sintassi.",
    },
  },
  categories: {
    youtube_growth: {
      description: "Strategie per far crescere il tuo canale YouTube",
    },
    youtube_monetization: {
      description: "Guadagnare denaro dai tuoi contenuti YouTube",
    },
    youtube_content: {
      description: "Suggerimenti per creare video coinvolgenti",
    },
    youtube_analytics: {
      description: "Comprendere le prestazioni del tuo canale",
    },
  },
  difficultyDescriptions: {
    easy: "Concetti di base e conoscenze fondamentali",
    medium: "Concetti intermedi e comprensione dettagliata",
    hard: "Concetti avanzati e conoscenze approfondite",
  },
  categoryEmojiMapping: {
    title: "Mappatura Emoji Categoria",
    searchPlaceholder: "Cerca categorie...",
    noCategoriesFound: "Nessuna categoria trovata",
  },
  liveCallComponent: {
    title: "Chiamata Vocale in Diretta",
    context: "Contesto:",
    contextDescription: "Utilizzo del tuo progresso nel quiz e degli errori per un aiuto personalizzato",
  },
  importQuestionsModal: {
    title: "Importa Domande",
    close: "Chiudi",
    importFormat: "Formato Importazione",
    json: "JSON",
    csv: "CSV",
    dropFile: "Trascina il tuo file {format} qui, o clicca per selezionare",
    or: "O",
    pasteRaw: "Incolla Testo Grezzo",
    formatInfo: "Il tuo file {format} dovrebbe seguire questa struttura:",
    cancel: "Annulla",
    import: "Importa",
  },
  aiGenerationTab: {
    title: "Generazione AI",
    apiKey: {
      label: "Chiave API di Gemini",
      placeholder: "Inserisci la tua chiave API di Gemini",
      set: "Chiave API impostata",
      change: "Cambia Chiave",
      save: "Salva",
      info: "La tua chiave è memorizzata solo nel tuo browser. Ottieni una chiave gratuita su",
    },
    prompt: {
      label: "Prompt",
      placeholder: "es: Crea 10 domande a scelta multipla sull'Impero Romano.",
      placeholderWithContext: "es: Crea 10 domande a scelta multipla basate sul contenuto {{context}} sulla storia antica.",
      contextInfo: "L'AI analizzerà il tuo contenuto {{context}} e genererà domande basate sia sul media che sul tuo prompt.",
    },
    mediaContext: {
      title: "Contesto per la Generazione di Domande",
    },
    buttons: {
      generate: "Genera Domande",
      generating: "Generazione in corso...",
      assignEmojis: "Assegna Emoji a Nuove Categorie",
      enterEmoji: "Inserisci un emoji per questa categoria",
      back: "Indietro",
      saveAndAdd: "Salva Emoji e Aggiungi Domande",
      preview: "Domande Generate (Anteprima)",
      discard: "Scarta",
      nextAssign: "Avanti: Assegna Emoji",
      approveAndAdd: "Approva e Aggiungi",
    },
    errors: {
      apiKeyMissing: "Per favore inserisci la tua chiave API di Gemini. Puoi ottenere una chiave gratuita su ai.dev.",
      promptMissing: "Per favore inserisci un prompt per generare domande.",
      mediaContextMissing: "Per favore completa la selezione del contesto multimediale o scegli \"Nessun Contesto\".",
      generationFailed: "Impossibile generare domande. Controlla la tua chiave API, il prompt e il contesto multimediale.",
    },
  },
  sagaLearnScreen: {
    title: "SagaLearn",
    adventureAwaits: "L'Avventura Ti Aspetta",
    adventureAwaitsDesc: "Prepara la scena per la tua epica storia.",
    chooseWorld: "Scegli Il Tuo Mondo",
    selectHero: "Seleziona un Eroe",
    customHero: "Eroe Personalizzato",
    customHeroDesc: "Definisci il tuo protagonista da zero.",
    customHeroPlaceholder: "es: Un furbo ladro dal cuore d'oro",
    selectKnowledgePack: "Seleziona un Pacchetto di Conoscenza",
    optionalLearningQuest: "Opzionale: Aggiungi una Missione di Apprendimento",
    justExploring: "Solo Esplorazione",
    justExploringDesc: "Un'avventura narrativa pura.",
    beginAdventure: "Inizia l'Avventura",
    craftingWorld: "Creazione del tuo mondo...",
    error: {
      apiKey: "Per favore imposta prima la tua chiave API di Gemini nelle Impostazioni.",
      adventure: "Impossibile avviare l'avventura. Controlla la tua chiave API e riprova.",
      load: "La tua avventura salvata sembra corrotta. Dobbiamo iniziarne una nuova."
    },
    continuePrompt: {
      title: "Continuare La Tua Avventura?",
      description: "Un viaggio incompiuto nella modalità Esplorazione Libera ti aspetta.",
      continue: "Continua",
      startOver: "Inizia una Nuova Avventura",
      loading: "Caricamento della tua avventura..."
    },
    gameModeSelector: {
      title: "Scegli La Tua Avventura",
      description: "Seleziona una modalità di gioco per iniziare il tuo percorso di apprendimento.",
      quizAdventure: "Avventura Quiz",
      quizAdventureDesc: "Una missione strutturata e guidata dalla storia dove la conoscenza sblocca i progressi.",
      freeExploration: "Esplorazione Libera",
      freeExplorationDesc: "Un mondo aperto dove puoi imparare e scoprire al tuo ritmo.",
      quizAdventureDetails: "Una missione strutturata e guidata dalla storia dove la conoscenza sblocca i progressi.",
      freeExplorationDetails: "Un mondo aperto dove puoi imparare e scoprire al tuo ritmo."
    },
    adventureConfigurator: {
      loading: "Creazione del tuo mondo...",
      error: "Impossibile avviare l'avventura. Controlla la tua chiave API e riprova.",
      adventureAwaits: "L'Avventura Ti Aspetta",
      adventureAwaitsDesc: "Prepara la scena per la tua epica storia.",
      chooseWorld: "Scegli Il Tuo Mondo",
      selectHero: "Seleziona un Eroe",
      customHero: "Eroe Personalizzato",
      customHeroDesc: "Definisci il tuo protagonista da zero.",
      customHeroPlaceholder: "es: Un furbo ladro dal cuore d'oro",
      selectKnowledgePack: "Seleziona un Pacchetto di Conoscenza",
      optionalLearningQuest: "Opzionale: Aggiungi una Missione di Apprendimento",
      justExploring: "Solo Esplorazione",
      justExploringDesc: "Un'avventura narrativa pura.",
      beginAdventure: "Inizia l'Avventura",
      selectOption: "Seleziona un'opzione"
    },
    customDropdown: {
      placeholder: "Seleziona un'opzione"
    },
    quizAdventureUI: {
      question: "Domanda",
      choices: "Scelte",
      submit: "Invia",
      next: "Successivo",
      finish: "Termina Quiz",
      loading: "Caricamento della prossima domanda...",
      explanation: "Spiegazione",
      objective: "Obiettivo",
      survive: "Sopravvivere",
      turnsRemaining: "Turni rimanenti: {{count}}",
      storyUnfolds: "La storia si sviluppa...",
      victory: "Vittoria!",
      gameOver: "Game Over",
      playAgain: "Gioca di nuovo",
      correct: "Corretto!",
      incorrect: "Errato!",
      generatingScene: "Generazione scena...",
      openDashboard: "Apri Dashboard"
    },
    freeExplorationUI: {
      whatDoYouSay: "Cosa dici a {{dialoguePartner}}?",
      whatDoYouDo: "Cosa fai adesso?",
      suggestions: "Suggerimenti",
      go: "Vai"
    }
  },
  aiGeneratorScreen: {
    title: "Studio di Applicazioni IA",
    subtitle: "Crea Applicazioni Interattive con l'IA",
    description: "Genera giochi, lezioni, simulazioni e strumenti utilizzando l'IA avanzata. Descrivi semplicemente cosa vuoi creare e guarda come prende vita!"
  },
  aiGenerator: {
    tabs: {
      generator: "Generatore",
      gallery: "Le Mie Applicazioni"
    },
    apiKey: {
      required: "Chiave API Richiesta",
      instructions: "Imposta la tua chiave API Gemini nelle Impostazioni per utilizzare lo Studio di Applicazioni IA."
    },
    settings: {
      title: "Impostazioni Avanzate",
      show: "Mostra Avanzate",
      hide: "Nascondi Avanzate"
    },
    modelSelector: {
      title: "Selezione del Modello IA",
      tooltip: "Scegli il modello IA che meglio si adatta alle tue esigenze. Modelli diversi hanno capacità e caratteristiche di prestazioni diverse.",
      recommendation: "Raccomandazioni dei Modelli:"
    },
    starterPrompts: {
      title: "Idee di Partenza"
    },
    context: {
      title: "Usa i Tuoi Dati dei Quiz",
      description: "Migliora le tue applicazioni generate includendo le categorie dei tuoi quiz e i progressi di apprendimento come contesto.",
      includeCategories: "Includi Categorie dei Quiz",
      includeCategoriesDesc: "Usa le categorie dei tuoi quiz come argomenti per l'applicazione generata",
      includeMistakes: "Includi i Miei Errori",
      includeMistakesDesc: "Concentrati sulle aree in cui hai bisogno di più pratica",
      selectCategories: "Seleziona categorie specifiche:",
      selectedCount: "{{count}} categorie selezionate",
      summary: "Riepilogo del Contesto:",
      summaryCategories: "Utilizzo delle categorie: {{categories}}",
      summaryAllCategories: "Utilizzo di tutte le categorie disponibili",
      summaryMistakes: "Concentrazione sulle tue aree di errore"
    },
    prompt: {
      label: "Descrivi la Tua Applicazione",
      placeholder: "es., Crea un gioco di abbinamento della memoria con animali, o costruisci una lezione interattiva sulla fotosintesi con animazioni e un quiz...",
      hint: "Sii specifico su quello che vuoi - più dettagli fornisci, migliore sarà la tua applicazione!"
    },
    buttons: {
      generate: "Genera l'Applicazione",
      generating: "Creazione della Tua Applicazione...",
      save: "Salva l'Applicazione",
      createNew: "Crea una Nuova Applicazione"
    },
    preview: {
      title: "Anteprima dell'Applicazione",
      loading: "Caricamento della tua applicazione...",
      refresh: "Aggiorna",
      fullscreen: "Schermo Intero",
      exitFullscreen: "Esci dallo Schermo Intero",
      close: "Chiudi",
      info: "La tua applicazione è in esecuzione in un ambiente sicuro"
    },
    saveModal: {
      title: "Salva la Tua Applicazione",
      nameLabel: "Nome dell'Applicazione",
      namePlaceholder: "Inserisci un nome per la tua applicazione",
      descriptionLabel: "Descrizione (Opzionale)",
      descriptionPlaceholder: "Descrivi cosa fa la tua applicazione...",
      characters: "caratteri",
      infoTitle: "Nota:",
      infoText: "La tua applicazione verrà salvata localmente nel tuo browser e potrà essere consultata in qualsiasi momento dalla galleria.",
      cancel: "Annulla",
      save: "Salva l'Applicazione",
      saving: "Salvataggio in corso..."
    },
    gallery: {
      title: "Le Mie Applicazioni Generate",
      empty: {
        title: "Nessuna Applicazione per il Momento",
        description: "Crea la tua prima applicazione generata dall'IA per vederla apparire qui!"
      },
      preview: "Anteprima",
      deleteConfirm: {
        title: "Elimina l'Applicazione",
        message: "Sei sicuro di voler eliminare questa applicazione? Questa azione non può essere annullata.",
        cancel: "Annulla",
        delete: "Elimina"
      }
    },
    errors: {
      apiKeyMissing: "Imposta prima la tua chiave API Gemini nelle Impostazioni.",
      promptMissing: "Descrivi il tipo di applicazione che desideri creare.",
      generationFailed: "Impossibile generare la tua applicazione. Controlla la tua chiave API e riprova."
    }
  }
};