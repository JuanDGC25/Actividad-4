from django.contrib import admin
from .models import Solicitud


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
    search_fields = ("titulo", "descripcion", "solicitante", "responsable")
    ordering = ("-fecha_creacion",)