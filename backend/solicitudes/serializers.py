from rest_framework import serializers
from .models import Solicitud


class SolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud
        fields = [
            "id",
            "titulo",
            "descripcion",
            "categoria",
            "solicitante",
            "responsable",
            "estado",
            "prioridad",
            "fecha_creacion",
            "fecha_actualizacion",
        ]
        read_only_fields = ["id", "fecha_creacion", "fecha_actualizacion"]

    def validate_titulo(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("El título debe tener al menos 5 caracteres.")
        return value

    def validate_descripcion(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("La descripción debe tener al menos 10 caracteres.")
        return value