export const LANGUAGES = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
] as const;

export type LangCode = (typeof LANGUAGES)[number]['code'];

type TranslationKeys = {
  // General
  'app.name': string;
  'app.subtitle': string;
  // Auth
  'auth.login': string;
  'auth.signup': string;
  'auth.email': string;
  'auth.password': string;
  'auth.google': string;
  'auth.passkey': string;
  'auth.or': string;
  'auth.no_account': string;
  'auth.has_account': string;
  'auth.login_title': string;
  'auth.signup_title': string;
  // Editor
  'editor.untitled': string;
  'editor.open': string;
  'editor.save': string;
  'editor.run': string;
  'editor.stop': string;
  'editor.drag_hint': string;
  'editor.no_nodes': string;
  'editor.saved': string;
  'editor.opened': string;
  'editor.created': string;
  'editor.renamed': string;
  'editor.new_project': string;
  'editor.open_project': string;
  'editor.no_projects': string;
  // Execution
  'exec.running': string;
  'exec.log': string;
  'exec.in_progress': string;
  'exec.completed': string;
  'exec.error': string;
  'exec.configure': string;
  // Node categories
  'cat.triggers': string;
  'cat.actions': string;
  'cat.conditions': string;
  'cat.outputs': string;
  // Pricing
  'pricing.title': string;
  'pricing.subtitle': string;
  'pricing.year': string;
  'pricing.trial': string;
  'pricing.start_trial': string;
  'pricing.no_charge': string;
  'pricing.manage': string;
  'pricing.refresh': string;
  'pricing.back': string;
  'pricing.active': string;
  'pricing.trial_active': string;
  'pricing.trial_until': string;
  'pricing.renews': string;
  // Features
  'feat.unlimited': string;
  'feat.all_nodes': string;
  'feat.auto_exec': string;
  'feat.webhooks': string;
  'feat.notifications': string;
  'feat.support': string;
  // Admin
  'admin.title': string;
  'admin.dashboard': string;
  'admin.workflows': string;
  'admin.users': string;
  'admin.settings': string;
  'admin.search': string;
  // Settings
  'settings.theme': string;
  'settings.language': string;
  'settings.light': string;
  'settings.dark': string;
  // Footer / Legal
  'footer.terms': string;
  'footer.privacy': string;
  'footer.eula': string;
  'footer.cookies': string;
  'footer.support': string;
  'footer.disclaimer': string;
  // Cookie consent
  'cookie.title': string;
  'cookie.description': string;
  'cookie.accept_all': string;
  'cookie.reject': string;
  'cookie.customize': string;
  'cookie.save': string;
  'cookie.necessary': string;
  'cookie.analytics': string;
  'cookie.functional': string;
  'cookie.always_on': string;
  // IARC / Age Rating
  'footer.age_rating': string;
  'iarc.title': string;
  'iarc.intro': string;
  'iarc.rating_label': string;
  'iarc.rating_desc': string;
  'iarc.content_section': string;
  'iarc.category': string;
  'iarc.present': string;
  'iarc.violence': string;
  'iarc.fear': string;
  'iarc.language': string;
  'iarc.sexual': string;
  'iarc.drugs': string;
  'iarc.gambling': string;
  'iarc.ugc': string;
  'iarc.iap': string;
  'iarc.personal_info': string;
  'iarc.user_interaction': string;
  'iarc.location': string;
  'iarc.notes_title': string;
  'iarc.note_ugc': string;
  'iarc.note_iap': string;
  'iarc.note_personal': string;
  'iarc.about_title': string;
  'iarc.about_desc': string;
  'iarc.more_info': string;
};

type Translations = Record<LangCode, TranslationKeys>;

const translations: Translations = {
  it: {
    'app.name': 'OpenClawForWindows',
    'app.subtitle': 'Automation Builder',
    'auth.login': 'Accedi',
    'auth.signup': 'Registrati',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.google': 'Continua con Google',
    'auth.passkey': 'Accedi con Passkey',
    'auth.or': 'oppure',
    'auth.no_account': 'Non hai un account?',
    'auth.has_account': 'Hai già un account?',
    'auth.login_title': 'Accedi al tuo account',
    'auth.signup_title': 'Crea un nuovo account',
    'editor.untitled': 'Progetto senza titolo',
    'editor.open': 'Apri',
    'editor.save': 'Salva',
    'editor.run': 'Esegui',
    'editor.stop': 'Ferma',
    'editor.drag_hint': 'Trascina i nodi dalla sidebar per iniziare',
    'editor.no_nodes': 'Aggiungi almeno un nodo prima di eseguire.',
    'editor.saved': 'Salvato',
    'editor.opened': 'Aperto',
    'editor.created': 'Creato',
    'editor.renamed': 'Rinominato',
    'editor.new_project': 'Nuovo progetto',
    'editor.open_project': 'Apri progetto',
    'editor.no_projects': 'Nessun progetto salvato',
    'exec.running': 'In esecuzione...',
    'exec.log': 'Log esecuzione',
    'exec.in_progress': 'In corso…',
    'exec.completed': 'Completato ✓',
    'exec.error': 'Errore ✗',
    'exec.configure': 'Configura…',
    'cat.triggers': 'Trigger',
    'cat.actions': 'Azioni',
    'cat.conditions': 'Condizioni',
    'cat.outputs': 'Output',
    'pricing.title': 'OpenClawForWindows Pro',
    'pricing.subtitle': 'Automazioni senza limiti',
    'pricing.year': '/anno',
    'pricing.trial': '10 giorni di prova gratuita · Annulla quando vuoi',
    'pricing.start_trial': 'Inizia la prova gratuita',
    'pricing.no_charge': 'Non ti verrà addebitato nulla per 10 giorni',
    'pricing.manage': 'Gestisci abbonamento',
    'pricing.refresh': 'Aggiorna stato',
    'pricing.back': 'Torna indietro',
    'pricing.active': 'Abbonamento attivo',
    'pricing.trial_active': 'Prova gratuita attiva',
    'pricing.trial_until': 'Prova fino al',
    'pricing.renews': 'Rinnovo il',
    'feat.unlimited': 'Workflow illimitati',
    'feat.all_nodes': 'Tutti i tipi di nodo',
    'feat.auto_exec': 'Esecuzione automatica',
    'feat.webhooks': 'Webhook & API',
    'feat.notifications': 'Notifiche desktop',
    'feat.support': 'Supporto prioritario',
    'admin.title': 'Pannello Admin',
    'admin.dashboard': 'Dashboard',
    'admin.workflows': 'Workflow',
    'admin.users': 'Utenti',
    'admin.settings': 'Impostazioni',
    'admin.search': 'Cerca workflow, utenti...',
    'settings.theme': 'Tema',
    'settings.language': 'Lingua',
    'settings.light': 'Chiaro',
    'settings.dark': 'Scuro',
    'footer.terms': 'Termini di Servizio',
    'footer.privacy': 'Privacy & GDPR',
    'footer.eula': 'EULA',
    'footer.cookies': 'Cookie Policy',
    'footer.support': 'Supporto',
    'footer.disclaimer': 'OpenClawForWindows non è responsabile per l\'uso improprio delle automazioni create dagli utenti.\nUtilizzando il servizio accetti i nostri Termini di Servizio e la Privacy Policy.',
    'cookie.title': 'Utilizziamo i cookie',
    'cookie.description': 'Questo sito utilizza cookie per migliorare la tua esperienza. Puoi scegliere quali cookie accettare.',
    'cookie.accept_all': 'Accetta tutti',
    'cookie.reject': 'Rifiuta',
    'cookie.customize': 'Personalizza',
    'cookie.save': 'Salva',
    'cookie.necessary': 'Necessari',
    'cookie.analytics': 'Analitici',
    'cookie.functional': 'Funzionali',
    'cookie.always_on': 'Sempre attivi',
    'footer.age_rating': 'Classificazione età',
    'iarc.title': 'Classificazione per età (IARC)',
    'iarc.intro': 'OpenClawForWindows è classificato secondo gli standard dell\'International Age Rating Coalition (IARC). Questa pagina descrive i contenuti presenti nella nostra applicazione.',
    'iarc.rating_label': 'PEGI 3 / Everyone',
    'iarc.rating_desc': 'Adatto a tutte le età. Nessun contenuto inappropriato.',
    'iarc.content_section': 'Descrittori di contenuto',
    'iarc.category': 'Categoria',
    'iarc.present': 'Presente',
    'iarc.violence': 'Violenza',
    'iarc.fear': 'Paura / Horror',
    'iarc.language': 'Linguaggio volgare',
    'iarc.sexual': 'Contenuti sessuali / Nudità',
    'iarc.drugs': 'Droghe / Alcol / Tabacco',
    'iarc.gambling': 'Gioco d\'azzardo',
    'iarc.ugc': 'Contenuti generati dagli utenti (UGC)',
    'iarc.iap': 'Acquisti in-app / Abbonamenti',
    'iarc.personal_info': 'Condivisione informazioni personali',
    'iarc.user_interaction': 'Interazione tra utenti',
    'iarc.location': 'Geolocalizzazione',
    'iarc.notes_title': 'Note aggiuntive',
    'iarc.note_ugc': 'Gli utenti possono creare workflow e interagire con il chatbot di supporto.',
    'iarc.note_iap': 'Sono disponibili piani di abbonamento a pagamento tramite Stripe.',
    'iarc.note_personal': 'Per creare un account sono richiesti email e dati del profilo.',
    'iarc.about_title': 'Cos\'è l\'IARC?',
    'iarc.about_desc': 'L\'International Age Rating Coalition (IARC) è un sistema globale di classificazione per età delle applicazioni digitali. Fornisce classificazioni coerenti e affidabili per app e giochi su diverse piattaforme.',
    'iarc.more_info': 'Per maggiori informazioni visita',
  },
  en: {
    'app.name': 'OpenClawForWindows',
    'app.subtitle': 'Automation Builder',
    'auth.login': 'Log in',
    'auth.signup': 'Sign up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.google': 'Continue with Google',
    'auth.passkey': 'Sign in with Passkey',
    'auth.or': 'or',
    'auth.no_account': "Don't have an account?",
    'auth.has_account': 'Already have an account?',
    'auth.login_title': 'Log in to your account',
    'auth.signup_title': 'Create a new account',
    'editor.untitled': 'Untitled project',
    'editor.open': 'Open',
    'editor.save': 'Save',
    'editor.run': 'Run',
    'editor.stop': 'Stop',
    'editor.drag_hint': 'Drag nodes from the sidebar to get started',
    'editor.no_nodes': 'Add at least one node before running.',
    'editor.saved': 'Saved',
    'editor.opened': 'Opened',
    'editor.created': 'Created',
    'editor.renamed': 'Renamed',
    'editor.new_project': 'New project',
    'editor.open_project': 'Open project',
    'editor.no_projects': 'No saved projects',
    'exec.running': 'Running...',
    'exec.log': 'Execution log',
    'exec.in_progress': 'In progress…',
    'exec.completed': 'Completed ✓',
    'exec.error': 'Error ✗',
    'exec.configure': 'Configure…',
    'cat.triggers': 'Triggers',
    'cat.actions': 'Actions',
    'cat.conditions': 'Conditions',
    'cat.outputs': 'Outputs',
    'pricing.title': 'OpenClawForWindows Pro',
    'pricing.subtitle': 'Unlimited automations',
    'pricing.year': '/year',
    'pricing.trial': '10-day free trial · Cancel anytime',
    'pricing.start_trial': 'Start free trial',
    'pricing.no_charge': "You won't be charged for 10 days",
    'pricing.manage': 'Manage subscription',
    'pricing.refresh': 'Refresh status',
    'pricing.back': 'Go back',
    'pricing.active': 'Active subscription',
    'pricing.trial_active': 'Free trial active',
    'pricing.trial_until': 'Trial until',
    'pricing.renews': 'Renews on',
    'feat.unlimited': 'Unlimited workflows',
    'feat.all_nodes': 'All node types',
    'feat.auto_exec': 'Auto execution',
    'feat.webhooks': 'Webhooks & APIs',
    'feat.notifications': 'Desktop notifications',
    'feat.support': 'Priority support',
    'admin.title': 'Admin Panel',
    'admin.dashboard': 'Dashboard',
    'admin.workflows': 'Workflows',
    'admin.users': 'Users',
    'admin.settings': 'Settings',
    'admin.search': 'Search workflows, users...',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy & GDPR',
    'footer.eula': 'EULA',
    'footer.cookies': 'Cookie Policy',
    'footer.support': 'Support',
    'footer.disclaimer': 'OpenClawForWindows is not responsible for misuse of automations created by users. By using the Service you agree to our Terms of Service and Privacy Policy.',
    'cookie.title': 'We use cookies',
    'cookie.description': 'This site uses cookies to improve your experience. You can choose which cookies to accept.',
    'cookie.accept_all': 'Accept all',
    'cookie.reject': 'Reject',
    'cookie.customize': 'Customize',
    'cookie.save': 'Save',
    'cookie.necessary': 'Necessary',
    'cookie.analytics': 'Analytics',
    'cookie.functional': 'Functional',
    'cookie.always_on': 'Always on',
    'footer.age_rating': 'Age Rating',
    'iarc.title': 'Age Rating (IARC)',
    'iarc.intro': 'OpenClawForWindows is rated according to the International Age Rating Coalition (IARC) standards. This page describes the content present in our application.',
    'iarc.rating_label': 'PEGI 3 / Everyone',
    'iarc.rating_desc': 'Suitable for all ages. No inappropriate content.',
    'iarc.content_section': 'Content Descriptors',
    'iarc.category': 'Category',
    'iarc.present': 'Present',
    'iarc.violence': 'Violence',
    'iarc.fear': 'Fear / Horror',
    'iarc.language': 'Bad Language',
    'iarc.sexual': 'Sexual Content / Nudity',
    'iarc.drugs': 'Drugs / Alcohol / Tobacco',
    'iarc.gambling': 'Gambling',
    'iarc.ugc': 'User-Generated Content (UGC)',
    'iarc.iap': 'In-App Purchases / Subscriptions',
    'iarc.personal_info': 'Personal Information Sharing',
    'iarc.user_interaction': 'User Interaction',
    'iarc.location': 'Geolocation',
    'iarc.notes_title': 'Additional Notes',
    'iarc.note_ugc': 'Users can create workflows and interact with the support chatbot.',
    'iarc.note_iap': 'Paid subscription plans are available via Stripe.',
    'iarc.note_personal': 'Email and profile data are required to create an account.',
    'iarc.about_title': 'What is IARC?',
    'iarc.about_desc': 'The International Age Rating Coalition (IARC) is a global age rating system for digital applications. It provides consistent and reliable ratings for apps and games across different platforms.',
    'iarc.more_info': 'For more information visit',
  },
  es: {
    'app.name': 'OpenClawForWindows', 'app.subtitle': 'Constructor de Automatización',
    'auth.login': 'Iniciar sesión', 'auth.signup': 'Registrarse', 'auth.email': 'Correo', 'auth.password': 'Contraseña',
    'auth.google': 'Continuar con Google', 'auth.passkey': 'Iniciar con Passkey', 'auth.or': 'o',
    'auth.no_account': '¿No tienes cuenta?', 'auth.has_account': '¿Ya tienes cuenta?',
    'auth.login_title': 'Inicia sesión', 'auth.signup_title': 'Crea una cuenta',
    'editor.untitled': 'Proyecto sin título', 'editor.open': 'Abrir', 'editor.save': 'Guardar',
    'editor.run': 'Ejecutar', 'editor.stop': 'Detener', 'editor.drag_hint': 'Arrastra nodos desde la barra lateral',
    'editor.no_nodes': 'Añade al menos un nodo.', 'editor.saved': 'Guardado', 'editor.opened': 'Abierto',
    'editor.created': 'Creado', 'editor.renamed': 'Renombrado', 'editor.new_project': 'Nuevo proyecto',
    'editor.open_project': 'Abrir proyecto', 'editor.no_projects': 'Sin proyectos guardados',
    'exec.running': 'Ejecutando...', 'exec.log': 'Log de ejecución', 'exec.in_progress': 'En curso…',
    'exec.completed': 'Completado ✓', 'exec.error': 'Error ✗', 'exec.configure': 'Configurar…',
    'cat.triggers': 'Disparadores', 'cat.actions': 'Acciones', 'cat.conditions': 'Condiciones', 'cat.outputs': 'Salidas',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Automatizaciones ilimitadas', 'pricing.year': '/año',
    'pricing.trial': '10 días gratis · Cancela cuando quieras', 'pricing.start_trial': 'Iniciar prueba gratis',
    'pricing.no_charge': 'No se te cobrará durante 10 días', 'pricing.manage': 'Gestionar suscripción',
    'pricing.refresh': 'Actualizar estado', 'pricing.back': 'Volver',
    'pricing.active': 'Suscripción activa', 'pricing.trial_active': 'Prueba activa',
    'pricing.trial_until': 'Prueba hasta', 'pricing.renews': 'Renueva el',
    'feat.unlimited': 'Workflows ilimitados', 'feat.all_nodes': 'Todos los nodos',
    'feat.auto_exec': 'Ejecución automática', 'feat.webhooks': 'Webhooks & APIs',
    'feat.notifications': 'Notificaciones', 'feat.support': 'Soporte prioritario',
    'admin.title': 'Panel Admin', 'admin.dashboard': 'Dashboard', 'admin.workflows': 'Workflows',
    'admin.users': 'Usuarios', 'admin.settings': 'Configuración', 'admin.search': 'Buscar...',
    'settings.theme': 'Tema', 'settings.language': 'Idioma', 'settings.light': 'Claro', 'settings.dark': 'Oscuro',
    'footer.terms': 'Términos de Servicio', 'footer.privacy': 'Privacidad y GDPR', 'footer.eula': 'EULA', 'footer.cookies': 'Política de Cookies', 'footer.support': 'Soporte',
    'footer.disclaimer': 'OpenClawForWindows no es responsable del uso indebido de las automatizaciones creadas por los usuarios. Al usar el Servicio, aceptas nuestros Términos de Servicio y Política de Privacidad.',
    'cookie.title': 'Usamos cookies', 'cookie.description': 'Este sitio usa cookies para mejorar tu experiencia. Puedes elegir qué cookies aceptar.', 'cookie.accept_all': 'Aceptar todas', 'cookie.reject': 'Rechazar', 'cookie.customize': 'Personalizar', 'cookie.save': 'Guardar', 'cookie.necessary': 'Necesarias', 'cookie.analytics': 'Analíticas', 'cookie.functional': 'Funcionales', 'cookie.always_on': 'Siempre activas',
  },
  fr: {
    'app.name': 'OpenClawForWindows', 'app.subtitle': "Constructeur d'Automatisation",
    'auth.login': 'Connexion', 'auth.signup': "S'inscrire", 'auth.email': 'E-mail', 'auth.password': 'Mot de passe',
    'auth.google': 'Continuer avec Google', 'auth.passkey': 'Connexion Passkey', 'auth.or': 'ou',
    'auth.no_account': 'Pas de compte ?', 'auth.has_account': 'Déjà un compte ?',
    'auth.login_title': 'Connectez-vous', 'auth.signup_title': 'Créer un compte',
    'editor.untitled': 'Projet sans titre', 'editor.open': 'Ouvrir', 'editor.save': 'Enregistrer',
    'editor.run': 'Exécuter', 'editor.stop': 'Arrêter', 'editor.drag_hint': 'Glissez des nœuds depuis la barre latérale',
    'editor.no_nodes': 'Ajoutez au moins un nœud.', 'editor.saved': 'Enregistré', 'editor.opened': 'Ouvert',
    'editor.created': 'Créé', 'editor.renamed': 'Renommé', 'editor.new_project': 'Nouveau projet',
    'editor.open_project': 'Ouvrir un projet', 'editor.no_projects': 'Aucun projet sauvegardé',
    'exec.running': 'En cours...', 'exec.log': "Journal d'exécution", 'exec.in_progress': 'En cours…',
    'exec.completed': 'Terminé ✓', 'exec.error': 'Erreur ✗', 'exec.configure': 'Configurer…',
    'cat.triggers': 'Déclencheurs', 'cat.actions': 'Actions', 'cat.conditions': 'Conditions', 'cat.outputs': 'Sorties',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Automatisations illimitées', 'pricing.year': '/an',
    'pricing.trial': '10 jours gratuits · Annulez quand vous voulez', 'pricing.start_trial': 'Essai gratuit',
    'pricing.no_charge': 'Aucun frais pendant 10 jours', 'pricing.manage': 'Gérer abonnement',
    'pricing.refresh': 'Actualiser', 'pricing.back': 'Retour',
    'pricing.active': 'Abonnement actif', 'pricing.trial_active': 'Essai actif',
    'pricing.trial_until': "Essai jusqu'au", 'pricing.renews': 'Renouvellement le',
    'feat.unlimited': 'Workflows illimités', 'feat.all_nodes': 'Tous les nœuds',
    'feat.auto_exec': 'Exécution automatique', 'feat.webhooks': 'Webhooks & APIs',
    'feat.notifications': 'Notifications', 'feat.support': 'Support prioritaire',
    'admin.title': 'Panneau Admin', 'admin.dashboard': 'Tableau de bord', 'admin.workflows': 'Workflows',
    'admin.users': 'Utilisateurs', 'admin.settings': 'Paramètres', 'admin.search': 'Rechercher...',
    'settings.theme': 'Thème', 'settings.language': 'Langue', 'settings.light': 'Clair', 'settings.dark': 'Sombre',
    'footer.terms': 'Conditions d\'utilisation', 'footer.privacy': 'Confidentialité & RGPD', 'footer.eula': 'CLUF', 'footer.cookies': 'Politique de cookies', 'footer.support': 'Assistance',
    'footer.disclaimer': 'OpenClawForWindows n\'est pas responsable de l\'utilisation abusive des automatisations créées par les utilisateurs. En utilisant le Service, vous acceptez nos Conditions d\'utilisation et notre Politique de confidentialité.',
    'cookie.title': 'Nous utilisons des cookies', 'cookie.description': 'Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez choisir lesquels accepter.', 'cookie.accept_all': 'Tout accepter', 'cookie.reject': 'Refuser', 'cookie.customize': 'Personnaliser', 'cookie.save': 'Enregistrer', 'cookie.necessary': 'Nécessaires', 'cookie.analytics': 'Analytiques', 'cookie.functional': 'Fonctionnels', 'cookie.always_on': 'Toujours actifs',
  },
  de: {
    'app.name': 'OpenClawForWindows', 'app.subtitle': 'Automatisierungs-Builder',
    'auth.login': 'Anmelden', 'auth.signup': 'Registrieren', 'auth.email': 'E-Mail', 'auth.password': 'Passwort',
    'auth.google': 'Weiter mit Google', 'auth.passkey': 'Mit Passkey anmelden', 'auth.or': 'oder',
    'auth.no_account': 'Kein Konto?', 'auth.has_account': 'Bereits ein Konto?',
    'auth.login_title': 'Anmelden', 'auth.signup_title': 'Konto erstellen',
    'editor.untitled': 'Unbenanntes Projekt', 'editor.open': 'Öffnen', 'editor.save': 'Speichern',
    'editor.run': 'Ausführen', 'editor.stop': 'Stoppen', 'editor.drag_hint': 'Ziehen Sie Knoten aus der Seitenleiste',
    'editor.no_nodes': 'Fügen Sie mindestens einen Knoten hinzu.', 'editor.saved': 'Gespeichert', 'editor.opened': 'Geöffnet',
    'editor.created': 'Erstellt', 'editor.renamed': 'Umbenannt', 'editor.new_project': 'Neues Projekt',
    'editor.open_project': 'Projekt öffnen', 'editor.no_projects': 'Keine gespeicherten Projekte',
    'exec.running': 'Wird ausgeführt...', 'exec.log': 'Ausführungsprotokoll', 'exec.in_progress': 'Läuft…',
    'exec.completed': 'Abgeschlossen ✓', 'exec.error': 'Fehler ✗', 'exec.configure': 'Konfigurieren…',
    'cat.triggers': 'Auslöser', 'cat.actions': 'Aktionen', 'cat.conditions': 'Bedingungen', 'cat.outputs': 'Ausgaben',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Unbegrenzte Automatisierungen', 'pricing.year': '/Jahr',
    'pricing.trial': '10 Tage kostenlos · Jederzeit kündbar', 'pricing.start_trial': 'Kostenlos testen',
    'pricing.no_charge': '10 Tage kostenlos', 'pricing.manage': 'Abo verwalten',
    'pricing.refresh': 'Aktualisieren', 'pricing.back': 'Zurück',
    'pricing.active': 'Aktives Abo', 'pricing.trial_active': 'Testphase aktiv',
    'pricing.trial_until': 'Test bis', 'pricing.renews': 'Verlängerung am',
    'feat.unlimited': 'Unbegrenzte Workflows', 'feat.all_nodes': 'Alle Knotentypen',
    'feat.auto_exec': 'Automatische Ausführung', 'feat.webhooks': 'Webhooks & APIs',
    'feat.notifications': 'Desktop-Benachrichtigungen', 'feat.support': 'Prioritäts-Support',
    'admin.title': 'Admin-Panel', 'admin.dashboard': 'Dashboard', 'admin.workflows': 'Workflows',
    'admin.users': 'Benutzer', 'admin.settings': 'Einstellungen', 'admin.search': 'Suchen...',
    'settings.theme': 'Design', 'settings.language': 'Sprache', 'settings.light': 'Hell', 'settings.dark': 'Dunkel',
    'footer.terms': 'Nutzungsbedingungen', 'footer.privacy': 'Datenschutz & DSGVO', 'footer.eula': 'EULA', 'footer.cookies': 'Cookie-Richtlinie', 'footer.support': 'Support',
    'footer.disclaimer': 'OpenClawForWindows ist nicht verantwortlich für den Missbrauch von Automatisierungen, die von Benutzern erstellt werden. Durch die Nutzung des Dienstes akzeptieren Sie unsere Nutzungsbedingungen und Datenschutzrichtlinie.',
    'cookie.title': 'Wir verwenden Cookies', 'cookie.description': 'Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. Sie können wählen, welche Cookies Sie akzeptieren.', 'cookie.accept_all': 'Alle akzeptieren', 'cookie.reject': 'Ablehnen', 'cookie.customize': 'Anpassen', 'cookie.save': 'Speichern', 'cookie.necessary': 'Notwendig', 'cookie.analytics': 'Analyse', 'cookie.functional': 'Funktional', 'cookie.always_on': 'Immer aktiv',
  },
  // Remaining languages use English as base with key translations
  pt: { ...null as any },
  ru: { ...null as any },
  zh: { ...null as any },
  ja: { ...null as any },
  ko: { ...null as any },
  ar: { ...null as any },
  hi: { ...null as any },
  tr: { ...null as any },
  pl: { ...null as any },
  nl: { ...null as any },
  sv: { ...null as any },
  da: { ...null as any },
  fi: { ...null as any },
  no: { ...null as any },
  cs: { ...null as any },
  sk: { ...null as any },
  ro: { ...null as any },
  hu: { ...null as any },
  el: { ...null as any },
  bg: { ...null as any },
  hr: { ...null as any },
  uk: { ...null as any },
  th: { ...null as any },
  vi: { ...null as any },
  id: { ...null as any },
  ms: { ...null as any },
  tl: { ...null as any },
  he: { ...null as any },
  fa: { ...null as any },
  bn: { ...null as any },
  ta: { ...null as any },
  sr: { ...null as any },
  sl: { ...null as any },
  lt: { ...null as any },
  lv: { ...null as any },
};

// Fill remaining languages with translated auth/UI strings
const langData: Record<string, Partial<TranslationKeys>> = {
  pt: { 'auth.login': 'Entrar', 'auth.signup': 'Cadastrar', 'auth.google': 'Continuar com Google', 'auth.or': 'ou', 'auth.no_account': 'Não tem conta?', 'auth.has_account': 'Já tem conta?', 'auth.login_title': 'Entre na sua conta', 'auth.signup_title': 'Crie uma conta', 'editor.open': 'Abrir', 'editor.save': 'Salvar', 'editor.run': 'Executar', 'editor.stop': 'Parar', 'editor.drag_hint': 'Arraste nós da barra lateral', 'cat.triggers': 'Gatilhos', 'cat.actions': 'Ações', 'cat.conditions': 'Condições', 'cat.outputs': 'Saídas', 'settings.light': 'Claro', 'settings.dark': 'Escuro', 'settings.theme': 'Tema', 'settings.language': 'Idioma',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Automações sem limites', 'pricing.year': '/ano', 'pricing.trial': '10 dias grátis · Cancele quando quiser', 'pricing.start_trial': 'Iniciar teste grátis', 'pricing.no_charge': 'Sem cobrança por 10 dias', 'pricing.manage': 'Gerenciar assinatura', 'pricing.refresh': 'Atualizar', 'pricing.back': 'Voltar', 'pricing.active': 'Assinatura ativa', 'pricing.trial_active': 'Teste ativo', 'pricing.trial_until': 'Teste até', 'pricing.renews': 'Renova em',
    'feat.unlimited': 'Workflows ilimitados', 'feat.all_nodes': 'Todos os tipos de nó', 'feat.auto_exec': 'Execução automática', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Notificações desktop', 'feat.support': 'Suporte prioritário' },
  ru: { 'auth.login': 'Войти', 'auth.signup': 'Регистрация', 'auth.google': 'Войти через Google', 'auth.or': 'или', 'editor.open': 'Открыть', 'editor.save': 'Сохранить', 'editor.run': 'Запуск', 'editor.stop': 'Стоп', 'cat.triggers': 'Триггеры', 'cat.actions': 'Действия', 'cat.conditions': 'Условия', 'cat.outputs': 'Выходы', 'settings.light': 'Светлая', 'settings.dark': 'Тёмная', 'settings.theme': 'Тема', 'settings.language': 'Язык',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Безлимитная автоматизация', 'pricing.year': '/год', 'pricing.trial': '10 дней бесплатно · Отмена в любое время', 'pricing.start_trial': 'Начать пробный период', 'pricing.no_charge': 'Бесплатно в течение 10 дней', 'pricing.manage': 'Управление подпиской', 'pricing.refresh': 'Обновить', 'pricing.back': 'Назад', 'pricing.active': 'Подписка активна', 'pricing.trial_active': 'Пробный период', 'pricing.trial_until': 'Пробный до', 'pricing.renews': 'Продление',
    'feat.unlimited': 'Безлимитные воркфлоу', 'feat.all_nodes': 'Все типы узлов', 'feat.auto_exec': 'Авто-выполнение', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Уведомления', 'feat.support': 'Приоритетная поддержка' },
  zh: { 'auth.login': '登录', 'auth.signup': '注册', 'auth.google': '使用Google继续', 'auth.or': '或', 'editor.open': '打开', 'editor.save': '保存', 'editor.run': '运行', 'editor.stop': '停止', 'cat.triggers': '触发器', 'cat.actions': '操作', 'cat.conditions': '条件', 'cat.outputs': '输出', 'settings.light': '浅色', 'settings.dark': '深色', 'settings.theme': '主题', 'settings.language': '语言',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': '无限自动化', 'pricing.year': '/年', 'pricing.trial': '10天免费试用 · 随时取消', 'pricing.start_trial': '开始免费试用', 'pricing.no_charge': '10天内不收费', 'pricing.manage': '管理订阅', 'pricing.refresh': '刷新', 'pricing.back': '返回', 'pricing.active': '订阅已激活', 'pricing.trial_active': '试用中', 'pricing.trial_until': '试用至', 'pricing.renews': '续费日期',
    'feat.unlimited': '无限工作流', 'feat.all_nodes': '所有节点类型', 'feat.auto_exec': '自动执行', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': '桌面通知', 'feat.support': '优先支持' },
  ja: { 'auth.login': 'ログイン', 'auth.signup': '登録', 'auth.google': 'Googleで続行', 'auth.or': 'または', 'editor.open': '開く', 'editor.save': '保存', 'editor.run': '実行', 'editor.stop': '停止', 'cat.triggers': 'トリガー', 'cat.actions': 'アクション', 'cat.conditions': '条件', 'cat.outputs': '出力', 'settings.light': 'ライト', 'settings.dark': 'ダーク', 'settings.theme': 'テーマ', 'settings.language': '言語',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': '無制限の自動化', 'pricing.year': '/年', 'pricing.trial': '10日間無料 · いつでもキャンセル', 'pricing.start_trial': '無料トライアル開始', 'pricing.no_charge': '10日間無料', 'pricing.manage': 'サブスク管理', 'pricing.refresh': '更新', 'pricing.back': '戻る', 'pricing.active': 'サブスク有効', 'pricing.trial_active': 'トライアル中', 'pricing.trial_until': 'トライアル終了日', 'pricing.renews': '更新日',
    'feat.unlimited': '無制限ワークフロー', 'feat.all_nodes': '全ノードタイプ', 'feat.auto_exec': '自動実行', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'デスクトップ通知', 'feat.support': '優先サポート' },
  ko: { 'auth.login': '로그인', 'auth.signup': '가입', 'auth.google': 'Google로 계속', 'auth.or': '또는', 'editor.open': '열기', 'editor.save': '저장', 'editor.run': '실행', 'editor.stop': '중지', 'cat.triggers': '트리거', 'cat.actions': '액션', 'cat.conditions': '조건', 'cat.outputs': '출력', 'settings.light': '라이트', 'settings.dark': '다크', 'settings.theme': '테마', 'settings.language': '언어',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': '무제한 자동화', 'pricing.year': '/년', 'pricing.trial': '10일 무료 · 언제든 취소', 'pricing.start_trial': '무료 체험 시작', 'pricing.no_charge': '10일간 무료', 'pricing.manage': '구독 관리', 'pricing.refresh': '새로고침', 'pricing.back': '뒤로', 'pricing.active': '구독 활성', 'pricing.trial_active': '체험 중', 'pricing.trial_until': '체험 종료일', 'pricing.renews': '갱신일',
    'feat.unlimited': '무제한 워크플로우', 'feat.all_nodes': '모든 노드 유형', 'feat.auto_exec': '자동 실행', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': '데스크톱 알림', 'feat.support': '우선 지원' },
  ar: { 'auth.login': 'تسجيل الدخول', 'auth.signup': 'التسجيل', 'auth.google': 'المتابعة مع Google', 'auth.or': 'أو', 'editor.open': 'فتح', 'editor.save': 'حفظ', 'editor.run': 'تشغيل', 'editor.stop': 'إيقاف', 'settings.light': 'فاتح', 'settings.dark': 'داكن', 'settings.theme': 'المظهر', 'settings.language': 'اللغة',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'أتمتة بلا حدود', 'pricing.year': '/سنة', 'pricing.trial': '10 أيام مجاناً · إلغاء في أي وقت', 'pricing.start_trial': 'ابدأ التجربة المجانية', 'pricing.no_charge': 'بدون رسوم لمدة 10 أيام', 'pricing.manage': 'إدارة الاشتراك', 'pricing.refresh': 'تحديث', 'pricing.back': 'رجوع', 'pricing.active': 'اشتراك نشط', 'pricing.trial_active': 'تجربة نشطة', 'pricing.trial_until': 'التجربة حتى', 'pricing.renews': 'التجديد في',
    'feat.unlimited': 'سير عمل غير محدود', 'feat.all_nodes': 'جميع أنواع العقد', 'feat.auto_exec': 'تنفيذ تلقائي', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'إشعارات سطح المكتب', 'feat.support': 'دعم ذو أولوية' },
  hi: { 'auth.login': 'लॉगिन', 'auth.signup': 'साइन अप', 'auth.google': 'Google से जारी रखें', 'auth.or': 'या', 'editor.open': 'खोलें', 'editor.save': 'सहेजें', 'editor.run': 'चलाएं', 'editor.stop': 'रोकें', 'settings.light': 'लाइट', 'settings.dark': 'डार्क', 'settings.theme': 'थीम', 'settings.language': 'भाषा',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'असीमित ऑटोमेशन', 'pricing.year': '/वर्ष', 'pricing.trial': '10 दिन मुफ़्त · कभी भी रद्द करें', 'pricing.start_trial': 'मुफ़्त परीक्षण शुरू करें', 'pricing.no_charge': '10 दिन तक कोई शुल्क नहीं', 'pricing.manage': 'सदस्यता प्रबंधित करें', 'pricing.refresh': 'ताज़ा करें', 'pricing.back': 'वापस', 'pricing.active': 'सदस्यता सक्रिय', 'pricing.trial_active': 'परीक्षण सक्रिय', 'pricing.trial_until': 'परीक्षण तक', 'pricing.renews': 'नवीनीकरण',
    'feat.unlimited': 'असीमित वर्कफ़्लो', 'feat.all_nodes': 'सभी नोड प्रकार', 'feat.auto_exec': 'स्वचालित निष्पादन', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'डेस्कटॉप सूचनाएं', 'feat.support': 'प्राथमिकता सहायता' },
  tr: { 'auth.login': 'Giriş', 'auth.signup': 'Kayıt', 'auth.google': 'Google ile devam et', 'auth.or': 'veya', 'editor.open': 'Aç', 'editor.save': 'Kaydet', 'editor.run': 'Çalıştır', 'editor.stop': 'Durdur', 'settings.light': 'Açık', 'settings.dark': 'Koyu', 'settings.theme': 'Tema', 'settings.language': 'Dil',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Sınırsız otomasyon', 'pricing.year': '/yıl', 'pricing.trial': '10 gün ücretsiz · İstediğiniz zaman iptal edin', 'pricing.start_trial': 'Ücretsiz denemeyi başlat', 'pricing.no_charge': '10 gün boyunca ücret yok', 'pricing.manage': 'Aboneliği yönet', 'pricing.refresh': 'Yenile', 'pricing.back': 'Geri', 'pricing.active': 'Abonelik aktif', 'pricing.trial_active': 'Deneme aktif', 'pricing.trial_until': 'Deneme bitiş', 'pricing.renews': 'Yenileme tarihi',
    'feat.unlimited': 'Sınırsız iş akışı', 'feat.all_nodes': 'Tüm düğüm türleri', 'feat.auto_exec': 'Otomatik çalıştırma', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Masaüstü bildirimleri', 'feat.support': 'Öncelikli destek' },
  pl: { 'auth.login': 'Zaloguj', 'auth.signup': 'Zarejestruj', 'auth.or': 'lub', 'editor.open': 'Otwórz', 'editor.save': 'Zapisz', 'editor.run': 'Uruchom', 'editor.stop': 'Zatrzymaj', 'settings.light': 'Jasny', 'settings.dark': 'Ciemny', 'settings.theme': 'Motyw', 'settings.language': 'Język',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Nieograniczona automatyzacja', 'pricing.year': '/rok', 'pricing.trial': '10 dni za darmo · Anuluj kiedy chcesz', 'pricing.start_trial': 'Rozpocznij darmowy okres', 'pricing.no_charge': 'Bez opłat przez 10 dni', 'pricing.manage': 'Zarządzaj subskrypcją', 'pricing.refresh': 'Odśwież', 'pricing.back': 'Wróć', 'pricing.active': 'Subskrypcja aktywna', 'pricing.trial_active': 'Okres próbny', 'pricing.trial_until': 'Próba do', 'pricing.renews': 'Odnowienie',
    'feat.unlimited': 'Nielimitowane workflow', 'feat.all_nodes': 'Wszystkie typy węzłów', 'feat.auto_exec': 'Automatyczne wykonanie', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Powiadomienia', 'feat.support': 'Priorytetowe wsparcie' },
  nl: { 'auth.login': 'Inloggen', 'auth.signup': 'Registreren', 'auth.or': 'of', 'editor.open': 'Openen', 'editor.save': 'Opslaan', 'editor.run': 'Uitvoeren', 'editor.stop': 'Stoppen', 'settings.light': 'Licht', 'settings.dark': 'Donker', 'settings.theme': 'Thema', 'settings.language': 'Taal',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Onbeperkte automatisering', 'pricing.year': '/jaar', 'pricing.trial': '10 dagen gratis · Altijd opzegbaar', 'pricing.start_trial': 'Gratis proberen', 'pricing.no_charge': '10 dagen gratis', 'pricing.manage': 'Abonnement beheren', 'pricing.refresh': 'Vernieuwen', 'pricing.back': 'Terug', 'pricing.active': 'Abonnement actief', 'pricing.trial_active': 'Proefperiode', 'pricing.trial_until': 'Proef tot', 'pricing.renews': 'Verlenging',
    'feat.unlimited': 'Onbeperkte workflows', 'feat.all_nodes': 'Alle knoopsoorten', 'feat.auto_exec': 'Automatische uitvoering', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Desktopmeldingen', 'feat.support': 'Prioriteitsondersteuning' },
  sv: { 'auth.login': 'Logga in', 'auth.signup': 'Registrera', 'auth.or': 'eller', 'editor.open': 'Öppna', 'editor.save': 'Spara', 'editor.run': 'Kör', 'editor.stop': 'Stoppa', 'settings.light': 'Ljus', 'settings.dark': 'Mörk', 'settings.theme': 'Tema', 'settings.language': 'Språk',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Obegränsad automatisering', 'pricing.year': '/år', 'pricing.trial': '10 dagar gratis · Avbryt när som helst', 'pricing.start_trial': 'Starta gratis provperiod', 'pricing.no_charge': 'Ingen kostnad i 10 dagar', 'pricing.manage': 'Hantera prenumeration', 'pricing.refresh': 'Uppdatera', 'pricing.back': 'Tillbaka', 'pricing.active': 'Prenumeration aktiv', 'pricing.trial_active': 'Provperiod', 'pricing.trial_until': 'Prov till', 'pricing.renews': 'Förnyas',
    'feat.unlimited': 'Obegränsade arbetsflöden', 'feat.all_nodes': 'Alla nodtyper', 'feat.auto_exec': 'Automatisk körning', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Skrivbordsaviseringar', 'feat.support': 'Prioriterad support' },
  da: { 'auth.login': 'Log ind', 'auth.signup': 'Tilmeld', 'auth.or': 'eller', 'editor.open': 'Åbn', 'editor.save': 'Gem', 'editor.run': 'Kør', 'editor.stop': 'Stop', 'settings.light': 'Lys', 'settings.dark': 'Mørk', 'settings.theme': 'Tema', 'settings.language': 'Sprog',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Ubegrænset automatisering', 'pricing.year': '/år', 'pricing.trial': '10 dage gratis · Annuller når som helst', 'pricing.start_trial': 'Start gratis prøve', 'pricing.no_charge': 'Ingen betaling i 10 dage', 'pricing.manage': 'Administrer abonnement', 'pricing.refresh': 'Opdater', 'pricing.back': 'Tilbage', 'pricing.active': 'Abonnement aktivt', 'pricing.trial_active': 'Prøveperiode', 'pricing.trial_until': 'Prøve til', 'pricing.renews': 'Fornyes',
    'feat.unlimited': 'Ubegrænsede workflows', 'feat.all_nodes': 'Alle nodetyper', 'feat.auto_exec': 'Automatisk kørsel', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Skrivbordsnotifikationer', 'feat.support': 'Prioriteret support' },
  fi: { 'auth.login': 'Kirjaudu', 'auth.signup': 'Rekisteröidy', 'auth.or': 'tai', 'editor.open': 'Avaa', 'editor.save': 'Tallenna', 'editor.run': 'Suorita', 'editor.stop': 'Pysäytä', 'settings.light': 'Vaalea', 'settings.dark': 'Tumma', 'settings.theme': 'Teema', 'settings.language': 'Kieli',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Rajaton automaatio', 'pricing.year': '/vuosi', 'pricing.trial': '10 päivää ilmaiseksi · Peruuta milloin vain', 'pricing.start_trial': 'Aloita ilmainen kokeilu', 'pricing.no_charge': 'Ei maksua 10 päivään', 'pricing.manage': 'Hallinnoi tilausta', 'pricing.refresh': 'Päivitä', 'pricing.back': 'Takaisin', 'pricing.active': 'Tilaus aktiivinen', 'pricing.trial_active': 'Kokeilujakso', 'pricing.trial_until': 'Kokeilu asti', 'pricing.renews': 'Uusitaan',
    'feat.unlimited': 'Rajattomat työnkulut', 'feat.all_nodes': 'Kaikki solmutyypit', 'feat.auto_exec': 'Automaattinen suoritus', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Työpöytäilmoitukset', 'feat.support': 'Ensisijainen tuki' },
  no: { 'auth.login': 'Logg inn', 'auth.signup': 'Registrer', 'auth.or': 'eller', 'editor.open': 'Åpne', 'editor.save': 'Lagre', 'editor.run': 'Kjør', 'editor.stop': 'Stopp', 'settings.light': 'Lys', 'settings.dark': 'Mørk', 'settings.theme': 'Tema', 'settings.language': 'Språk',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Ubegrenset automatisering', 'pricing.year': '/år', 'pricing.trial': '10 dager gratis · Avbryt når som helst', 'pricing.start_trial': 'Start gratis prøve', 'pricing.no_charge': 'Ingen kostnad i 10 dager', 'pricing.manage': 'Administrer abonnement', 'pricing.refresh': 'Oppdater', 'pricing.back': 'Tilbake', 'pricing.active': 'Abonnement aktivt', 'pricing.trial_active': 'Prøveperiode', 'pricing.trial_until': 'Prøve til', 'pricing.renews': 'Fornyes',
    'feat.unlimited': 'Ubegrensede arbeidsflyter', 'feat.all_nodes': 'Alle nodetyper', 'feat.auto_exec': 'Automatisk kjøring', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Skrivbordsvarsler', 'feat.support': 'Prioritert støtte' },
  cs: { 'auth.login': 'Přihlásit', 'auth.signup': 'Registrovat', 'auth.or': 'nebo', 'editor.open': 'Otevřít', 'editor.save': 'Uložit', 'editor.run': 'Spustit', 'editor.stop': 'Zastavit', 'settings.light': 'Světlý', 'settings.dark': 'Tmavý', 'settings.theme': 'Motiv', 'settings.language': 'Jazyk',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Neomezená automatizace', 'pricing.year': '/rok', 'pricing.trial': '10 dní zdarma · Zrušte kdykoli', 'pricing.start_trial': 'Začít zkušební období', 'pricing.no_charge': '10 dní bez poplatku', 'pricing.manage': 'Spravovat předplatné', 'pricing.refresh': 'Obnovit', 'pricing.back': 'Zpět', 'pricing.active': 'Předplatné aktivní', 'pricing.trial_active': 'Zkušební období', 'pricing.trial_until': 'Zkouška do', 'pricing.renews': 'Obnovení',
    'feat.unlimited': 'Neomezené workflow', 'feat.all_nodes': 'Všechny typy uzlů', 'feat.auto_exec': 'Automatické spuštění', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Oznámení na ploše', 'feat.support': 'Prioritní podpora' },
  sk: { 'auth.login': 'Prihlásiť', 'auth.signup': 'Registrovať', 'auth.or': 'alebo', 'editor.open': 'Otvoriť', 'editor.save': 'Uložiť', 'editor.run': 'Spustiť', 'editor.stop': 'Zastaviť', 'settings.light': 'Svetlý', 'settings.dark': 'Tmavý', 'settings.theme': 'Téma', 'settings.language': 'Jazyk',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Neobmedzená automatizácia', 'pricing.year': '/rok', 'pricing.trial': '10 dní zadarmo · Zrušte kedykoľvek', 'pricing.start_trial': 'Začať skúšobné obdobie', 'pricing.no_charge': '10 dní bez poplatku', 'pricing.manage': 'Spravovať predplatné', 'pricing.refresh': 'Obnoviť', 'pricing.back': 'Späť', 'pricing.active': 'Predplatné aktívne', 'pricing.trial_active': 'Skúšobné obdobie', 'pricing.trial_until': 'Skúška do', 'pricing.renews': 'Obnovenie',
    'feat.unlimited': 'Neobmedzené workflow', 'feat.all_nodes': 'Všetky typy uzlov', 'feat.auto_exec': 'Automatické spustenie', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Oznámenia', 'feat.support': 'Prioritná podpora' },
  ro: { 'auth.login': 'Autentificare', 'auth.signup': 'Înregistrare', 'auth.or': 'sau', 'editor.open': 'Deschide', 'editor.save': 'Salvează', 'editor.run': 'Execută', 'editor.stop': 'Oprește', 'settings.light': 'Deschis', 'settings.dark': 'Închis', 'settings.theme': 'Temă', 'settings.language': 'Limbă',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Automatizări nelimitate', 'pricing.year': '/an', 'pricing.trial': '10 zile gratuit · Anulează oricând', 'pricing.start_trial': 'Începe proba gratuită', 'pricing.no_charge': 'Fără taxe 10 zile', 'pricing.manage': 'Gestionează abonamentul', 'pricing.refresh': 'Actualizează', 'pricing.back': 'Înapoi', 'pricing.active': 'Abonament activ', 'pricing.trial_active': 'Probă activă', 'pricing.trial_until': 'Probă până la', 'pricing.renews': 'Reînnoire',
    'feat.unlimited': 'Workflow-uri nelimitate', 'feat.all_nodes': 'Toate tipurile de noduri', 'feat.auto_exec': 'Execuție automată', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Notificări desktop', 'feat.support': 'Suport prioritar' },
  hu: { 'auth.login': 'Bejelentkezés', 'auth.signup': 'Regisztráció', 'auth.or': 'vagy', 'editor.open': 'Megnyitás', 'editor.save': 'Mentés', 'editor.run': 'Futtatás', 'editor.stop': 'Leállítás', 'settings.light': 'Világos', 'settings.dark': 'Sötét', 'settings.theme': 'Téma', 'settings.language': 'Nyelv',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Korlátlan automatizálás', 'pricing.year': '/év', 'pricing.trial': '10 nap ingyen · Bármikor lemondható', 'pricing.start_trial': 'Ingyenes próba indítása', 'pricing.no_charge': '10 napig ingyenes', 'pricing.manage': 'Előfizetés kezelése', 'pricing.refresh': 'Frissítés', 'pricing.back': 'Vissza', 'pricing.active': 'Előfizetés aktív', 'pricing.trial_active': 'Próbaidőszak', 'pricing.trial_until': 'Próba eddig', 'pricing.renews': 'Megújítás',
    'feat.unlimited': 'Korlátlan munkafolyamatok', 'feat.all_nodes': 'Minden csomóponttípus', 'feat.auto_exec': 'Automatikus végrehajtás', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Asztali értesítések', 'feat.support': 'Elsőbbségi támogatás' },
  el: { 'auth.login': 'Σύνδεση', 'auth.signup': 'Εγγραφή', 'auth.or': 'ή', 'editor.open': 'Άνοιγμα', 'editor.save': 'Αποθήκευση', 'editor.run': 'Εκτέλεση', 'editor.stop': 'Διακοπή', 'settings.light': 'Φωτεινό', 'settings.dark': 'Σκοτεινό', 'settings.theme': 'Θέμα', 'settings.language': 'Γλώσσα',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Απεριόριστη αυτοματοποίηση', 'pricing.year': '/έτος', 'pricing.trial': '10 ημέρες δωρεάν · Ακύρωση ανά πάσα στιγμή', 'pricing.start_trial': 'Δωρεάν δοκιμή', 'pricing.no_charge': 'Χωρίς χρέωση για 10 ημέρες', 'pricing.manage': 'Διαχείριση συνδρομής', 'pricing.refresh': 'Ανανέωση', 'pricing.back': 'Πίσω', 'pricing.active': 'Συνδρομή ενεργή', 'pricing.trial_active': 'Δοκιμαστική περίοδος', 'pricing.trial_until': 'Δοκιμή έως', 'pricing.renews': 'Ανανέωση στις',
    'feat.unlimited': 'Απεριόριστα workflows', 'feat.all_nodes': 'Όλοι οι τύποι κόμβων', 'feat.auto_exec': 'Αυτόματη εκτέλεση', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Ειδοποιήσεις desktop', 'feat.support': 'Προτεραιότητα υποστήριξης' },
  bg: { 'auth.login': 'Вход', 'auth.signup': 'Регистрация', 'auth.or': 'или', 'editor.open': 'Отвори', 'editor.save': 'Запази', 'editor.run': 'Изпълни', 'editor.stop': 'Спри', 'settings.light': 'Светла', 'settings.dark': 'Тъмна', 'settings.theme': 'Тема', 'settings.language': 'Език',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Неограничена автоматизация', 'pricing.year': '/година', 'pricing.trial': '10 дни безплатно · Отказ по всяко време', 'pricing.start_trial': 'Безплатен пробен период', 'pricing.no_charge': 'Без такса за 10 дни', 'pricing.manage': 'Управление на абонамент', 'pricing.refresh': 'Обнови', 'pricing.back': 'Назад', 'pricing.active': 'Абонамент активен', 'pricing.trial_active': 'Пробен период', 'pricing.trial_until': 'Проба до', 'pricing.renews': 'Подновяване',
    'feat.unlimited': 'Неограничени работни потоци', 'feat.all_nodes': 'Всички типове възли', 'feat.auto_exec': 'Автоматично изпълнение', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Настолни известия', 'feat.support': 'Приоритетна поддръжка' },
  hr: { 'auth.login': 'Prijava', 'auth.signup': 'Registracija', 'auth.or': 'ili', 'editor.open': 'Otvori', 'editor.save': 'Spremi', 'editor.run': 'Pokreni', 'editor.stop': 'Zaustavi', 'settings.light': 'Svijetla', 'settings.dark': 'Tamna', 'settings.theme': 'Tema', 'settings.language': 'Jezik',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Neograničena automatizacija', 'pricing.year': '/godinu', 'pricing.trial': '10 dana besplatno · Otkažite kad želite', 'pricing.start_trial': 'Započni besplatno probno', 'pricing.no_charge': 'Bez naplate 10 dana', 'pricing.manage': 'Upravljanje pretplatom', 'pricing.refresh': 'Osvježi', 'pricing.back': 'Natrag', 'pricing.active': 'Pretplata aktivna', 'pricing.trial_active': 'Probno razdoblje', 'pricing.trial_until': 'Proba do', 'pricing.renews': 'Obnova',
    'feat.unlimited': 'Neograničeni tijekovi rada', 'feat.all_nodes': 'Sve vrste čvorova', 'feat.auto_exec': 'Automatsko izvršavanje', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Obavijesti na radnoj površini', 'feat.support': 'Prioritetna podrška' },
  uk: { 'auth.login': 'Увійти', 'auth.signup': 'Реєстрація', 'auth.or': 'або', 'editor.open': 'Відкрити', 'editor.save': 'Зберегти', 'editor.run': 'Запустити', 'editor.stop': 'Зупинити', 'settings.light': 'Світла', 'settings.dark': 'Темна', 'settings.theme': 'Тема', 'settings.language': 'Мова',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Необмежена автоматизація', 'pricing.year': '/рік', 'pricing.trial': '10 днів безкоштовно · Скасуйте будь-коли', 'pricing.start_trial': 'Почати безкоштовний період', 'pricing.no_charge': 'Без оплати 10 днів', 'pricing.manage': 'Керувати підпискою', 'pricing.refresh': 'Оновити', 'pricing.back': 'Назад', 'pricing.active': 'Підписка активна', 'pricing.trial_active': 'Пробний період', 'pricing.trial_until': 'Проба до', 'pricing.renews': 'Поновлення',
    'feat.unlimited': 'Необмежені робочі процеси', 'feat.all_nodes': 'Усі типи вузлів', 'feat.auto_exec': 'Автоматичне виконання', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Сповіщення на робочому столі', 'feat.support': 'Пріоритетна підтримка' },
  th: { 'auth.login': 'เข้าสู่ระบบ', 'auth.signup': 'สมัคร', 'auth.or': 'หรือ', 'editor.open': 'เปิด', 'editor.save': 'บันทึก', 'editor.run': 'เรียกใช้', 'editor.stop': 'หยุด', 'settings.light': 'สว่าง', 'settings.dark': 'มืด', 'settings.theme': 'ธีม', 'settings.language': 'ภาษา',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'ระบบอัตโนมัติไม่จำกัด', 'pricing.year': '/ปี', 'pricing.trial': 'ทดลองฟรี 10 วัน · ยกเลิกเมื่อไหร่ก็ได้', 'pricing.start_trial': 'เริ่มทดลองฟรี', 'pricing.no_charge': 'ไม่เสียค่าใช้จ่าย 10 วัน', 'pricing.manage': 'จัดการการสมัคร', 'pricing.refresh': 'รีเฟรช', 'pricing.back': 'กลับ', 'pricing.active': 'สมัครสมาชิกแล้ว', 'pricing.trial_active': 'ช่วงทดลอง', 'pricing.trial_until': 'ทดลองจนถึง', 'pricing.renews': 'ต่ออายุ',
    'feat.unlimited': 'เวิร์กโฟลว์ไม่จำกัด', 'feat.all_nodes': 'โหนดทุกประเภท', 'feat.auto_exec': 'รันอัตโนมัติ', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'การแจ้งเตือนเดสก์ท็อป', 'feat.support': 'การสนับสนุนลำดับแรก' },
  vi: { 'auth.login': 'Đăng nhập', 'auth.signup': 'Đăng ký', 'auth.or': 'hoặc', 'editor.open': 'Mở', 'editor.save': 'Lưu', 'editor.run': 'Chạy', 'editor.stop': 'Dừng', 'settings.light': 'Sáng', 'settings.dark': 'Tối', 'settings.theme': 'Giao diện', 'settings.language': 'Ngôn ngữ',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Tự động hóa không giới hạn', 'pricing.year': '/năm', 'pricing.trial': 'Dùng thử 10 ngày · Hủy bất cứ lúc nào', 'pricing.start_trial': 'Bắt đầu dùng thử', 'pricing.no_charge': 'Miễn phí 10 ngày', 'pricing.manage': 'Quản lý đăng ký', 'pricing.refresh': 'Làm mới', 'pricing.back': 'Quay lại', 'pricing.active': 'Đăng ký hoạt động', 'pricing.trial_active': 'Đang dùng thử', 'pricing.trial_until': 'Dùng thử đến', 'pricing.renews': 'Gia hạn',
    'feat.unlimited': 'Quy trình không giới hạn', 'feat.all_nodes': 'Tất cả loại nút', 'feat.auto_exec': 'Thực thi tự động', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Thông báo desktop', 'feat.support': 'Hỗ trợ ưu tiên' },
  id: { 'auth.login': 'Masuk', 'auth.signup': 'Daftar', 'auth.or': 'atau', 'editor.open': 'Buka', 'editor.save': 'Simpan', 'editor.run': 'Jalankan', 'editor.stop': 'Hentikan', 'settings.light': 'Terang', 'settings.dark': 'Gelap', 'settings.theme': 'Tema', 'settings.language': 'Bahasa',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Otomasi tanpa batas', 'pricing.year': '/tahun', 'pricing.trial': 'Uji coba 10 hari · Batalkan kapan saja', 'pricing.start_trial': 'Mulai uji coba gratis', 'pricing.no_charge': 'Gratis selama 10 hari', 'pricing.manage': 'Kelola langganan', 'pricing.refresh': 'Perbarui', 'pricing.back': 'Kembali', 'pricing.active': 'Langganan aktif', 'pricing.trial_active': 'Masa uji coba', 'pricing.trial_until': 'Uji coba hingga', 'pricing.renews': 'Perpanjangan',
    'feat.unlimited': 'Workflow tanpa batas', 'feat.all_nodes': 'Semua jenis node', 'feat.auto_exec': 'Eksekusi otomatis', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Notifikasi desktop', 'feat.support': 'Dukungan prioritas' },
  ms: { 'auth.login': 'Log masuk', 'auth.signup': 'Daftar', 'auth.or': 'atau', 'editor.open': 'Buka', 'editor.save': 'Simpan', 'editor.run': 'Jalankan', 'editor.stop': 'Hentikan', 'settings.light': 'Terang', 'settings.dark': 'Gelap', 'settings.theme': 'Tema', 'settings.language': 'Bahasa',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Automasi tanpa had', 'pricing.year': '/tahun', 'pricing.trial': 'Percubaan 10 hari · Batal bila-bila masa', 'pricing.start_trial': 'Mula percubaan percuma', 'pricing.no_charge': 'Percuma selama 10 hari', 'pricing.manage': 'Urus langganan', 'pricing.refresh': 'Muat semula', 'pricing.back': 'Kembali', 'pricing.active': 'Langganan aktif', 'pricing.trial_active': 'Tempoh percubaan', 'pricing.trial_until': 'Percubaan sehingga', 'pricing.renews': 'Pembaharuan',
    'feat.unlimited': 'Aliran kerja tanpa had', 'feat.all_nodes': 'Semua jenis nod', 'feat.auto_exec': 'Pelaksanaan automatik', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Pemberitahuan desktop', 'feat.support': 'Sokongan keutamaan' },
  tl: { 'auth.login': 'Mag-login', 'auth.signup': 'Mag-sign up', 'auth.or': 'o', 'editor.open': 'Buksan', 'editor.save': 'I-save', 'editor.run': 'Patakbuhin', 'editor.stop': 'Itigil', 'settings.light': 'Maliwanag', 'settings.dark': 'Madilim', 'settings.theme': 'Tema', 'settings.language': 'Wika',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Walang limitasyong automation', 'pricing.year': '/taon', 'pricing.trial': '10 araw na libreng pagsubok · Kanselahin kahit kailan', 'pricing.start_trial': 'Simulan ang libreng pagsubok', 'pricing.no_charge': 'Walang bayad sa loob ng 10 araw', 'pricing.manage': 'Pamahalaan ang subscription', 'pricing.refresh': 'I-refresh', 'pricing.back': 'Bumalik', 'pricing.active': 'Aktibong subscription', 'pricing.trial_active': 'Aktibong pagsubok', 'pricing.trial_until': 'Pagsubok hanggang', 'pricing.renews': 'Pag-renew',
    'feat.unlimited': 'Walang limitasyong workflow', 'feat.all_nodes': 'Lahat ng uri ng node', 'feat.auto_exec': 'Awtomatikong pagpapatakbo', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Desktop notification', 'feat.support': 'Priority na suporta' },
  he: { 'auth.login': 'התחברות', 'auth.signup': 'הרשמה', 'auth.or': 'או', 'editor.open': 'פתח', 'editor.save': 'שמור', 'editor.run': 'הפעל', 'editor.stop': 'עצור', 'settings.light': 'בהיר', 'settings.dark': 'כהה', 'settings.theme': 'ערכת נושא', 'settings.language': 'שפה',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'אוטומציה ללא הגבלה', 'pricing.year': '/שנה', 'pricing.trial': '10 ימי ניסיון חינם · ביטול בכל עת', 'pricing.start_trial': 'התחל ניסיון חינם', 'pricing.no_charge': 'ללא חיוב למשך 10 ימים', 'pricing.manage': 'נהל מנוי', 'pricing.refresh': 'רענן', 'pricing.back': 'חזור', 'pricing.active': 'מנוי פעיל', 'pricing.trial_active': 'תקופת ניסיון', 'pricing.trial_until': 'ניסיון עד', 'pricing.renews': 'חידוש ב',
    'feat.unlimited': 'תהליכי עבודה ללא הגבלה', 'feat.all_nodes': 'כל סוגי הצמתים', 'feat.auto_exec': 'הפעלה אוטומטית', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'התראות שולחן עבודה', 'feat.support': 'תמיכה בעדיפות' },
  fa: { 'auth.login': 'ورود', 'auth.signup': 'ثبت‌نام', 'auth.or': 'یا', 'editor.open': 'باز کردن', 'editor.save': 'ذخیره', 'editor.run': 'اجرا', 'editor.stop': 'توقف', 'settings.light': 'روشن', 'settings.dark': 'تاریک', 'settings.theme': 'پوسته', 'settings.language': 'زبان',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'اتوماسیون نامحدود', 'pricing.year': '/سال', 'pricing.trial': '10 روز رایگان · هر زمان لغو کنید', 'pricing.start_trial': 'شروع دوره آزمایشی', 'pricing.no_charge': 'بدون هزینه برای 10 روز', 'pricing.manage': 'مدیریت اشتراک', 'pricing.refresh': 'بازخوانی', 'pricing.back': 'بازگشت', 'pricing.active': 'اشتراک فعال', 'pricing.trial_active': 'دوره آزمایشی', 'pricing.trial_until': 'آزمایش تا', 'pricing.renews': 'تمدید',
    'feat.unlimited': 'گردش کار نامحدود', 'feat.all_nodes': 'همه انواع گره', 'feat.auto_exec': 'اجرای خودکار', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'اعلان‌های دسکتاپ', 'feat.support': 'پشتیبانی اولویت‌دار' },
  bn: { 'auth.login': 'লগইন', 'auth.signup': 'সাইন আপ', 'auth.or': 'অথবা', 'editor.open': 'খুলুন', 'editor.save': 'সংরক্ষণ', 'editor.run': 'চালান', 'editor.stop': 'থামান', 'settings.light': 'হালকা', 'settings.dark': 'গাঢ়', 'settings.theme': 'থিম', 'settings.language': 'ভাষা',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'সীমাহীন অটোমেশন', 'pricing.year': '/বছর', 'pricing.trial': '10 দিন বিনামূল্যে · যেকোনো সময় বাতিল করুন', 'pricing.start_trial': 'বিনামূল্যে ট্রায়াল শুরু', 'pricing.no_charge': '10 দিন বিনামূল্যে', 'pricing.manage': 'সাবস্ক্রিপশন পরিচালনা', 'pricing.refresh': 'রিফ্রেশ', 'pricing.back': 'ফিরে যান', 'pricing.active': 'সাবস্ক্রিপশন সক্রিয়', 'pricing.trial_active': 'ট্রায়াল চলছে', 'pricing.trial_until': 'ট্রায়াল পর্যন্ত', 'pricing.renews': 'পুনর্নবীকরণ',
    'feat.unlimited': 'সীমাহীন ওয়ার্কফ্লো', 'feat.all_nodes': 'সব ধরনের নোড', 'feat.auto_exec': 'স্বয়ংক্রিয় সম্পাদন', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'ডেস্কটপ বিজ্ঞপ্তি', 'feat.support': 'অগ্রাধিকার সহায়তা' },
  ta: { 'auth.login': 'உள்நுழை', 'auth.signup': 'பதிவு', 'auth.or': 'அல்லது', 'editor.open': 'திற', 'editor.save': 'சேமி', 'editor.run': 'இயக்கு', 'editor.stop': 'நிறுத்து', 'settings.light': 'ஒளி', 'settings.dark': 'இருள்', 'settings.theme': 'தீம்', 'settings.language': 'மொழி',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'வரம்பற்ற ஆட்டோமேஷன்', 'pricing.year': '/ஆண்டு', 'pricing.trial': '10 நாள் இலவச சோதனை · எப்போது வேண்டுமானாலும் ரத்து செய்யலாம்', 'pricing.start_trial': 'இலவச சோதனை தொடங்கு', 'pricing.no_charge': '10 நாட்களுக்கு கட்டணம் இல்லை', 'pricing.manage': 'சந்தா நிர்வகிக்க', 'pricing.refresh': 'புதுப்பி', 'pricing.back': 'பின்னால்', 'pricing.active': 'சந்தா செயலில்', 'pricing.trial_active': 'சோதனை காலம்', 'pricing.trial_until': 'சோதனை வரை', 'pricing.renews': 'புதுப்பிப்பு',
    'feat.unlimited': 'வரம்பற்ற பணிப்பாய்வு', 'feat.all_nodes': 'அனைத்து நோட் வகைகள்', 'feat.auto_exec': 'தானியங்கி செயல்படுத்தல்', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'டெஸ்க்டாப் அறிவிப்புகள்', 'feat.support': 'முன்னுரிமை ஆதரவு' },
  sr: { 'auth.login': 'Пријава', 'auth.signup': 'Регистрација', 'auth.or': 'или', 'editor.open': 'Отвори', 'editor.save': 'Сачувај', 'editor.run': 'Покрени', 'editor.stop': 'Заустави', 'settings.light': 'Светла', 'settings.dark': 'Тамна', 'settings.theme': 'Тема', 'settings.language': 'Језик',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Неограничена аутоматизација', 'pricing.year': '/годишње', 'pricing.trial': '10 дана бесплатно · Откажите кад год', 'pricing.start_trial': 'Започни бесплатни пробни', 'pricing.no_charge': 'Без наплате 10 дана', 'pricing.manage': 'Управљај претплатом', 'pricing.refresh': 'Освежи', 'pricing.back': 'Назад', 'pricing.active': 'Претплата активна', 'pricing.trial_active': 'Пробни период', 'pricing.trial_until': 'Проба до', 'pricing.renews': 'Обнова',
    'feat.unlimited': 'Неограничени радни токови', 'feat.all_nodes': 'Сви типови чворова', 'feat.auto_exec': 'Аутоматско извршавање', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Обавештења на радној површини', 'feat.support': 'Приоритетна подршка' },
  sl: { 'auth.login': 'Prijava', 'auth.signup': 'Registracija', 'auth.or': 'ali', 'editor.open': 'Odpri', 'editor.save': 'Shrani', 'editor.run': 'Zaženi', 'editor.stop': 'Ustavi', 'settings.light': 'Svetla', 'settings.dark': 'Temna', 'settings.theme': 'Tema', 'settings.language': 'Jezik',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Neomejena avtomatizacija', 'pricing.year': '/leto', 'pricing.trial': '10 dni brezplačno · Prekličite kadarkoli', 'pricing.start_trial': 'Začni brezplačno preizkušnjo', 'pricing.no_charge': 'Brez stroškov 10 dni', 'pricing.manage': 'Upravljaj naročnino', 'pricing.refresh': 'Osveži', 'pricing.back': 'Nazaj', 'pricing.active': 'Naročnina aktivna', 'pricing.trial_active': 'Preizkusno obdobje', 'pricing.trial_until': 'Preizkus do', 'pricing.renews': 'Obnovitev',
    'feat.unlimited': 'Neomejeni delovni tokovi', 'feat.all_nodes': 'Vse vrste vozlišč', 'feat.auto_exec': 'Samodejno izvajanje', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Namizna obvestila', 'feat.support': 'Prednostna podpora' },
  lt: { 'auth.login': 'Prisijungti', 'auth.signup': 'Registruotis', 'auth.or': 'arba', 'editor.open': 'Atidaryti', 'editor.save': 'Išsaugoti', 'editor.run': 'Paleisti', 'editor.stop': 'Sustabdyti', 'settings.light': 'Šviesi', 'settings.dark': 'Tamsi', 'settings.theme': 'Tema', 'settings.language': 'Kalba',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Neribota automatizacija', 'pricing.year': '/metus', 'pricing.trial': '10 dienų nemokamai · Atšaukite bet kada', 'pricing.start_trial': 'Pradėti nemokamą bandomąjį', 'pricing.no_charge': 'Be mokesčio 10 dienų', 'pricing.manage': 'Tvarkyti prenumeratą', 'pricing.refresh': 'Atnaujinti', 'pricing.back': 'Atgal', 'pricing.active': 'Prenumerata aktyvi', 'pricing.trial_active': 'Bandomasis laikotarpis', 'pricing.trial_until': 'Bandymas iki', 'pricing.renews': 'Atnaujinimas',
    'feat.unlimited': 'Neriboti darbo srautai', 'feat.all_nodes': 'Visi mazgų tipai', 'feat.auto_exec': 'Automatinis vykdymas', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Darbalaukio pranešimai', 'feat.support': 'Prioritetinė pagalba' },
  lv: { 'auth.login': 'Pieslēgties', 'auth.signup': 'Reģistrēties', 'auth.or': 'vai', 'editor.open': 'Atvērt', 'editor.save': 'Saglabāt', 'editor.run': 'Palaist', 'editor.stop': 'Apturēt', 'settings.light': 'Gaišs', 'settings.dark': 'Tumšs', 'settings.theme': 'Motīvs', 'settings.language': 'Valoda',
    'pricing.title': 'OpenClawForWindows Pro', 'pricing.subtitle': 'Neierobežota automatizācija', 'pricing.year': '/gadā', 'pricing.trial': '10 dienas bez maksas · Atceliet jebkurā laikā', 'pricing.start_trial': 'Sākt bezmaksas izmēģinājumu', 'pricing.no_charge': 'Bez maksas 10 dienas', 'pricing.manage': 'Pārvaldīt abonementu', 'pricing.refresh': 'Atjaunināt', 'pricing.back': 'Atpakaļ', 'pricing.active': 'Abonements aktīvs', 'pricing.trial_active': 'Izmēģinājuma periods', 'pricing.trial_until': 'Izmēģinājums līdz', 'pricing.renews': 'Atjaunošana',
    'feat.unlimited': 'Neierobežotas darbplūsmas', 'feat.all_nodes': 'Visi mezglu veidi', 'feat.auto_exec': 'Automātiska izpilde', 'feat.webhooks': 'Webhooks & APIs', 'feat.notifications': 'Darbvirsmas paziņojumi', 'feat.support': 'Prioritāra atbalsts' },
};

// Merge partial translations with English fallback
for (const [code, partial] of Object.entries(langData)) {
  translations[code as LangCode] = { ...translations.en, ...partial };
}

export function t(key: keyof TranslationKeys, lang: LangCode): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

export default translations;
