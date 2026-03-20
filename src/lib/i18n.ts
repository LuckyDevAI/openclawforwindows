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
};

type Translations = Record<LangCode, TranslationKeys>;

const translations: Translations = {
  it: {
    'app.name': 'OpenClaw',
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
    'pricing.title': 'OpenClaw Pro',
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
  },
  en: {
    'app.name': 'OpenClaw',
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
    'pricing.title': 'OpenClaw Pro',
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
  },
  es: {
    'app.name': 'OpenClaw', 'app.subtitle': 'Constructor de Automatización',
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
    'pricing.title': 'OpenClaw Pro', 'pricing.subtitle': 'Automatizaciones ilimitadas', 'pricing.year': '/año',
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
  },
  fr: {
    'app.name': 'OpenClaw', 'app.subtitle': "Constructeur d'Automatisation",
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
    'pricing.title': 'OpenClaw Pro', 'pricing.subtitle': 'Automatisations illimitées', 'pricing.year': '/an',
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
  },
  de: {
    'app.name': 'OpenClaw', 'app.subtitle': 'Automatisierungs-Builder',
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
    'pricing.title': 'OpenClaw Pro', 'pricing.subtitle': 'Unbegrenzte Automatisierungen', 'pricing.year': '/Jahr',
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
  pt: { 'auth.login': 'Entrar', 'auth.signup': 'Cadastrar', 'auth.google': 'Continuar com Google', 'auth.or': 'ou', 'auth.no_account': 'Não tem conta?', 'auth.has_account': 'Já tem conta?', 'auth.login_title': 'Entre na sua conta', 'auth.signup_title': 'Crie uma conta', 'editor.open': 'Abrir', 'editor.save': 'Salvar', 'editor.run': 'Executar', 'editor.stop': 'Parar', 'editor.drag_hint': 'Arraste nós da barra lateral', 'cat.triggers': 'Gatilhos', 'cat.actions': 'Ações', 'cat.conditions': 'Condições', 'cat.outputs': 'Saídas', 'settings.light': 'Claro', 'settings.dark': 'Escuro', 'settings.theme': 'Tema', 'settings.language': 'Idioma' },
  ru: { 'auth.login': 'Войти', 'auth.signup': 'Регистрация', 'auth.google': 'Войти через Google', 'auth.or': 'или', 'editor.open': 'Открыть', 'editor.save': 'Сохранить', 'editor.run': 'Запуск', 'editor.stop': 'Стоп', 'cat.triggers': 'Триггеры', 'cat.actions': 'Действия', 'cat.conditions': 'Условия', 'cat.outputs': 'Выходы', 'settings.light': 'Светлая', 'settings.dark': 'Тёмная', 'settings.theme': 'Тема', 'settings.language': 'Язык' },
  zh: { 'auth.login': '登录', 'auth.signup': '注册', 'auth.google': '使用Google继续', 'auth.or': '或', 'editor.open': '打开', 'editor.save': '保存', 'editor.run': '运行', 'editor.stop': '停止', 'cat.triggers': '触发器', 'cat.actions': '操作', 'cat.conditions': '条件', 'cat.outputs': '输出', 'settings.light': '浅色', 'settings.dark': '深色', 'settings.theme': '主题', 'settings.language': '语言' },
  ja: { 'auth.login': 'ログイン', 'auth.signup': '登録', 'auth.google': 'Googleで続行', 'auth.or': 'または', 'editor.open': '開く', 'editor.save': '保存', 'editor.run': '実行', 'editor.stop': '停止', 'cat.triggers': 'トリガー', 'cat.actions': 'アクション', 'cat.conditions': '条件', 'cat.outputs': '出力', 'settings.light': 'ライト', 'settings.dark': 'ダーク', 'settings.theme': 'テーマ', 'settings.language': '言語' },
  ko: { 'auth.login': '로그인', 'auth.signup': '가입', 'auth.google': 'Google로 계속', 'auth.or': '또는', 'editor.open': '열기', 'editor.save': '저장', 'editor.run': '실행', 'editor.stop': '중지', 'cat.triggers': '트리거', 'cat.actions': '액션', 'cat.conditions': '조건', 'cat.outputs': '출력', 'settings.light': '라이트', 'settings.dark': '다크', 'settings.theme': '테마', 'settings.language': '언어' },
  ar: { 'auth.login': 'تسجيل الدخول', 'auth.signup': 'التسجيل', 'auth.google': 'المتابعة مع Google', 'auth.or': 'أو', 'editor.open': 'فتح', 'editor.save': 'حفظ', 'editor.run': 'تشغيل', 'editor.stop': 'إيقاف', 'settings.light': 'فاتح', 'settings.dark': 'داكن', 'settings.theme': 'المظهر', 'settings.language': 'اللغة' },
  hi: { 'auth.login': 'लॉगिन', 'auth.signup': 'साइन अप', 'auth.google': 'Google से जारी रखें', 'auth.or': 'या', 'editor.open': 'खोलें', 'editor.save': 'सहेजें', 'editor.run': 'चलाएं', 'editor.stop': 'रोकें', 'settings.light': 'लाइट', 'settings.dark': 'डार्क', 'settings.theme': 'थीम', 'settings.language': 'भाषा' },
  tr: { 'auth.login': 'Giriş', 'auth.signup': 'Kayıt', 'auth.google': 'Google ile devam et', 'auth.or': 'veya', 'editor.open': 'Aç', 'editor.save': 'Kaydet', 'editor.run': 'Çalıştır', 'editor.stop': 'Durdur', 'settings.light': 'Açık', 'settings.dark': 'Koyu', 'settings.theme': 'Tema', 'settings.language': 'Dil' },
  pl: { 'auth.login': 'Zaloguj', 'auth.signup': 'Zarejestruj', 'auth.or': 'lub', 'editor.open': 'Otwórz', 'editor.save': 'Zapisz', 'editor.run': 'Uruchom', 'editor.stop': 'Zatrzymaj', 'settings.light': 'Jasny', 'settings.dark': 'Ciemny', 'settings.theme': 'Motyw', 'settings.language': 'Język' },
  nl: { 'auth.login': 'Inloggen', 'auth.signup': 'Registreren', 'auth.or': 'of', 'editor.open': 'Openen', 'editor.save': 'Opslaan', 'editor.run': 'Uitvoeren', 'editor.stop': 'Stoppen', 'settings.light': 'Licht', 'settings.dark': 'Donker', 'settings.theme': 'Thema', 'settings.language': 'Taal' },
  sv: { 'auth.login': 'Logga in', 'auth.signup': 'Registrera', 'auth.or': 'eller', 'editor.open': 'Öppna', 'editor.save': 'Spara', 'editor.run': 'Kör', 'editor.stop': 'Stoppa', 'settings.light': 'Ljus', 'settings.dark': 'Mörk', 'settings.theme': 'Tema', 'settings.language': 'Språk' },
  da: { 'auth.login': 'Log ind', 'auth.signup': 'Tilmeld', 'auth.or': 'eller', 'editor.open': 'Åbn', 'editor.save': 'Gem', 'editor.run': 'Kør', 'editor.stop': 'Stop', 'settings.light': 'Lys', 'settings.dark': 'Mørk', 'settings.theme': 'Tema', 'settings.language': 'Sprog' },
  fi: { 'auth.login': 'Kirjaudu', 'auth.signup': 'Rekisteröidy', 'auth.or': 'tai', 'editor.open': 'Avaa', 'editor.save': 'Tallenna', 'editor.run': 'Suorita', 'editor.stop': 'Pysäytä', 'settings.light': 'Vaalea', 'settings.dark': 'Tumma', 'settings.theme': 'Teema', 'settings.language': 'Kieli' },
  no: { 'auth.login': 'Logg inn', 'auth.signup': 'Registrer', 'auth.or': 'eller', 'editor.open': 'Åpne', 'editor.save': 'Lagre', 'editor.run': 'Kjør', 'editor.stop': 'Stopp', 'settings.light': 'Lys', 'settings.dark': 'Mørk', 'settings.theme': 'Tema', 'settings.language': 'Språk' },
  cs: { 'auth.login': 'Přihlásit', 'auth.signup': 'Registrovat', 'auth.or': 'nebo', 'editor.open': 'Otevřít', 'editor.save': 'Uložit', 'editor.run': 'Spustit', 'editor.stop': 'Zastavit', 'settings.light': 'Světlý', 'settings.dark': 'Tmavý', 'settings.theme': 'Motiv', 'settings.language': 'Jazyk' },
  sk: { 'auth.login': 'Prihlásiť', 'auth.signup': 'Registrovať', 'auth.or': 'alebo', 'editor.open': 'Otvoriť', 'editor.save': 'Uložiť', 'editor.run': 'Spustiť', 'editor.stop': 'Zastaviť', 'settings.light': 'Svetlý', 'settings.dark': 'Tmavý', 'settings.theme': 'Téma', 'settings.language': 'Jazyk' },
  ro: { 'auth.login': 'Autentificare', 'auth.signup': 'Înregistrare', 'auth.or': 'sau', 'editor.open': 'Deschide', 'editor.save': 'Salvează', 'editor.run': 'Execută', 'editor.stop': 'Oprește', 'settings.light': 'Deschis', 'settings.dark': 'Închis', 'settings.theme': 'Temă', 'settings.language': 'Limbă' },
  hu: { 'auth.login': 'Bejelentkezés', 'auth.signup': 'Regisztráció', 'auth.or': 'vagy', 'editor.open': 'Megnyitás', 'editor.save': 'Mentés', 'editor.run': 'Futtatás', 'editor.stop': 'Leállítás', 'settings.light': 'Világos', 'settings.dark': 'Sötét', 'settings.theme': 'Téma', 'settings.language': 'Nyelv' },
  el: { 'auth.login': 'Σύνδεση', 'auth.signup': 'Εγγραφή', 'auth.or': 'ή', 'editor.open': 'Άνοιγμα', 'editor.save': 'Αποθήκευση', 'editor.run': 'Εκτέλεση', 'editor.stop': 'Διακοπή', 'settings.light': 'Φωτεινό', 'settings.dark': 'Σκοτεινό', 'settings.theme': 'Θέμα', 'settings.language': 'Γλώσσα' },
  bg: { 'auth.login': 'Вход', 'auth.signup': 'Регистрация', 'auth.or': 'или', 'editor.open': 'Отвори', 'editor.save': 'Запази', 'editor.run': 'Изпълни', 'editor.stop': 'Спри', 'settings.light': 'Светла', 'settings.dark': 'Тъмна', 'settings.theme': 'Тема', 'settings.language': 'Език' },
  hr: { 'auth.login': 'Prijava', 'auth.signup': 'Registracija', 'auth.or': 'ili', 'editor.open': 'Otvori', 'editor.save': 'Spremi', 'editor.run': 'Pokreni', 'editor.stop': 'Zaustavi', 'settings.light': 'Svijetla', 'settings.dark': 'Tamna', 'settings.theme': 'Tema', 'settings.language': 'Jezik' },
  uk: { 'auth.login': 'Увійти', 'auth.signup': 'Реєстрація', 'auth.or': 'або', 'editor.open': 'Відкрити', 'editor.save': 'Зберегти', 'editor.run': 'Запустити', 'editor.stop': 'Зупинити', 'settings.light': 'Світла', 'settings.dark': 'Темна', 'settings.theme': 'Тема', 'settings.language': 'Мова' },
  th: { 'auth.login': 'เข้าสู่ระบบ', 'auth.signup': 'สมัคร', 'auth.or': 'หรือ', 'editor.open': 'เปิด', 'editor.save': 'บันทึก', 'editor.run': 'เรียกใช้', 'editor.stop': 'หยุด', 'settings.light': 'สว่าง', 'settings.dark': 'มืด', 'settings.theme': 'ธีม', 'settings.language': 'ภาษา' },
  vi: { 'auth.login': 'Đăng nhập', 'auth.signup': 'Đăng ký', 'auth.or': 'hoặc', 'editor.open': 'Mở', 'editor.save': 'Lưu', 'editor.run': 'Chạy', 'editor.stop': 'Dừng', 'settings.light': 'Sáng', 'settings.dark': 'Tối', 'settings.theme': 'Giao diện', 'settings.language': 'Ngôn ngữ' },
  id: { 'auth.login': 'Masuk', 'auth.signup': 'Daftar', 'auth.or': 'atau', 'editor.open': 'Buka', 'editor.save': 'Simpan', 'editor.run': 'Jalankan', 'editor.stop': 'Hentikan', 'settings.light': 'Terang', 'settings.dark': 'Gelap', 'settings.theme': 'Tema', 'settings.language': 'Bahasa' },
  ms: { 'auth.login': 'Log masuk', 'auth.signup': 'Daftar', 'auth.or': 'atau', 'editor.open': 'Buka', 'editor.save': 'Simpan', 'editor.run': 'Jalankan', 'editor.stop': 'Hentikan', 'settings.light': 'Terang', 'settings.dark': 'Gelap', 'settings.theme': 'Tema', 'settings.language': 'Bahasa' },
  tl: { 'auth.login': 'Mag-login', 'auth.signup': 'Mag-sign up', 'auth.or': 'o', 'editor.open': 'Buksan', 'editor.save': 'I-save', 'editor.run': 'Patakbuhin', 'editor.stop': 'Itigil', 'settings.light': 'Maliwanag', 'settings.dark': 'Madilim', 'settings.theme': 'Tema', 'settings.language': 'Wika' },
  he: { 'auth.login': 'התחברות', 'auth.signup': 'הרשמה', 'auth.or': 'או', 'editor.open': 'פתח', 'editor.save': 'שמור', 'editor.run': 'הפעל', 'editor.stop': 'עצור', 'settings.light': 'בהיר', 'settings.dark': 'כהה', 'settings.theme': 'ערכת נושא', 'settings.language': 'שפה' },
  fa: { 'auth.login': 'ورود', 'auth.signup': 'ثبت‌نام', 'auth.or': 'یا', 'editor.open': 'باز کردن', 'editor.save': 'ذخیره', 'editor.run': 'اجرا', 'editor.stop': 'توقف', 'settings.light': 'روشن', 'settings.dark': 'تاریک', 'settings.theme': 'پوسته', 'settings.language': 'زبان' },
  bn: { 'auth.login': 'লগইন', 'auth.signup': 'সাইন আপ', 'auth.or': 'অথবা', 'editor.open': 'খুলুন', 'editor.save': 'সংরক্ষণ', 'editor.run': 'চালান', 'editor.stop': 'থামান', 'settings.light': 'হালকা', 'settings.dark': 'গাঢ়', 'settings.theme': 'থিম', 'settings.language': 'ভাষা' },
  ta: { 'auth.login': 'உள்நுழை', 'auth.signup': 'பதிவு', 'auth.or': 'அல்லது', 'editor.open': 'திற', 'editor.save': 'சேமி', 'editor.run': 'இயக்கு', 'editor.stop': 'நிறுத்து', 'settings.light': 'ஒளி', 'settings.dark': 'இருள்', 'settings.theme': 'தீம்', 'settings.language': 'மொழி' },
  sr: { 'auth.login': 'Пријава', 'auth.signup': 'Регистрација', 'auth.or': 'или', 'editor.open': 'Отвори', 'editor.save': 'Сачувај', 'editor.run': 'Покрени', 'editor.stop': 'Заустави', 'settings.light': 'Светла', 'settings.dark': 'Тамна', 'settings.theme': 'Тема', 'settings.language': 'Језик' },
  sl: { 'auth.login': 'Prijava', 'auth.signup': 'Registracija', 'auth.or': 'ali', 'editor.open': 'Odpri', 'editor.save': 'Shrani', 'editor.run': 'Zaženi', 'editor.stop': 'Ustavi', 'settings.light': 'Svetla', 'settings.dark': 'Temna', 'settings.theme': 'Tema', 'settings.language': 'Jezik' },
  lt: { 'auth.login': 'Prisijungti', 'auth.signup': 'Registruotis', 'auth.or': 'arba', 'editor.open': 'Atidaryti', 'editor.save': 'Išsaugoti', 'editor.run': 'Paleisti', 'editor.stop': 'Sustabdyti', 'settings.light': 'Šviesi', 'settings.dark': 'Tamsi', 'settings.theme': 'Tema', 'settings.language': 'Kalba' },
  lv: { 'auth.login': 'Pieslēgties', 'auth.signup': 'Reģistrēties', 'auth.or': 'vai', 'editor.open': 'Atvērt', 'editor.save': 'Saglabāt', 'editor.run': 'Palaist', 'editor.stop': 'Apturēt', 'settings.light': 'Gaišs', 'settings.dark': 'Tumšs', 'settings.theme': 'Motīvs', 'settings.language': 'Valoda' },
};

// Merge partial translations with English fallback
for (const [code, partial] of Object.entries(langData)) {
  translations[code as LangCode] = { ...translations.en, ...partial };
}

export function t(key: keyof TranslationKeys, lang: LangCode): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

export default translations;
