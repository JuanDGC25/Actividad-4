from django.contrib import admin

from .models import Rol, PerfilUsuario, EstadoSolicitud, Solicitud


@admin.register(Rol)
class RolAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "activo")
    search_fields = ("nombre",)


@admin.register(PerfilUsuario)
class PerfilUsuarioAdmin(admin.ModelAdmin):
    list_display = ("id", "usuario", "rol")
    search_fields = ("usuario__username", "usuario__first_name", "usuario__last_name")
    list_filter = ("rol",)


@admin.register(EstadoSolicitud)
class EstadoSolicitudAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "codigo", "activo", "orden")
    search_fields = ("nombre", "codigo")
    list_filter = ("activo",)


@admin.register(Solicitud)
class SolicitudAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "titulo",
        "categoria",
        "solicitante",
        "responsable",
        "estado",
        "prioridad",
        "fecha_creacion",
    )
    list_filter = ("estado", "prioridad", "categoria")
    search_fields = (
        "titulo",
        "descripcion",
        "solicitante__username",
        "responsable__username",
    )
    ordering = ("-fecha_creacion",)