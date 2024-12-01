from django.apps import AppConfig

class RestAPIConfig(AppConfig):
    name = 'restapi'

    def ready(self):
        import restapi.signals