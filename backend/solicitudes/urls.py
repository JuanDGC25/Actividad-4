from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    LoginView,
    RegistroUsuarioView,
    RolViewSet,
    EstadoSolicitudViewSet,
    UsuarioViewSet,
    SolicitudViewSet,
)

router = DefaultRouter()
router.register(r"roles", RolViewSet, basename="roles")
router.register(r"estados", EstadoSolicitudViewSet, basename="estados")
router.register(r"usuarios", UsuarioViewSet, basename="usuarios")
router.register(r"solicitudes", SolicitudViewSet, basename="solicitudes")

urlpatterns = [
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/registro/", RegistroUsuarioView.as_view(), name="registro"),
]

urlpatterns += router.urls