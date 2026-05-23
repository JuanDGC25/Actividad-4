from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Solicitud
from .serializers import SolicitudSerializer


@extend_schema_view(
    list=extend_schema(summary="Listar solicitudes"),
    retrieve=extend_schema(summary="Consultar una solicitud por ID"),
    create=extend_schema(summary="Crear una nueva solicitud"),
    update=extend_schema(summary="Actualizar completamente una solicitud"),
    partial_update=extend_schema(summary="Actualizar parcialmente una solicitud"),
    destroy=extend_schema(summary="Eliminar una solicitud"),
)
class SolicitudViewSet(viewsets.ModelViewSet):
    queryset = Solicitud.objects.all()
    serializer_class = SolicitudSerializer

    def get_queryset(self):
        queryset = Solicitud.objects.all()

        estado = self.request.query_params.get("estado")
        prioridad = self.request.query_params.get("prioridad")

        if estado:
            queryset = queryset.filter(estado=estado)

        if prioridad:
            queryset = queryset.filter(prioridad=prioridad)

        return queryset

    @extend_schema(summary="Obtener resumen de solicitudes por estado")
    @action(detail=False, methods=["get"])
    def resumen(self, request):
        data = {
            "total": Solicitud.objects.count(),
            "pendientes": Solicitud.objects.filter(estado="PENDIENTE").count(),
            "en_proceso": Solicitud.objects.filter(estado="EN_PROCESO").count(),
            "cerradas": Solicitud.objects.filter(estado="CERRADA").count(),
        }

        return Response(data, status=status.HTTP_200_OK)