from gluon.storage import Storage
settings = Storage()

settings.migrate = True
settings.title = 'GuiArtec'
settings.subtitle = 'Welcome to GuiArtec'
settings.author = 'you'
settings.author_email = 'you@example.com'
settings.keywords = ''
settings.description = ''
settings.layout_theme = 'Default'
settings.database_uri = 'sqlite://storage.sqlite'
settings.security_key = '3001c842-3131-4c23-bec3-d117c288f116'
settings.email_server = 'localhost'
settings.email_sender = 'you@example.com'
settings.email_login = ''
settings.login_method = 'local'
settings.login_config = ''
settings.plugins = []
