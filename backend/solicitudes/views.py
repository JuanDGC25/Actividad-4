from django.contrib.auth.models import User

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Rol, EstadoSolicitud, Solicitud
from .serializers import (
    RolSerializer,
    EstadoSolicitudSerializer,
    UsuarioSerializer,
    RegistroUsuarioSerializer,
    LoginSerializer,
    SolicitudSerializer,
)


class LoginView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Iniciar sesión",
        request=LoginSerializer,
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        data = {
            "token": serializer.validated_data["token"],
            "usuario": {
                "id": user.id,
                "username": user.username,
                "nombre": user.get_full_name() or user.username,
                "email": user.email,
                "rol": serializer.validated_data["rol"],
            },
        }

        return Response(data, status=status.HTTP_200_OK)


class RegistroUsuarioView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Registrar usuario",
        request=RegistroUsuarioSerializer,
        responses=UsuarioSerializer,
    )
    def post(self, request):
        serializer = RegistroUsuarioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            UsuarioSerializer(user).data,
            status=status.HTTP_201_CREATED
        )


@extend_schema_view(
    list=extend_schema(summary="Listar roles"),
    retrieve=extend_schema(summary="Consultar rol por ID"),
)
class RolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Rol.objects.filter(activo=True)
    serializer_class = RolSerializer
    permission_classes = [AllowAny]


@extend_schema_view(
    list=extend_schema(summary="Listar estados de solicitud"),
    retrieve=extend_schema(summary="Consultar estado por ID"),
)
class EstadoSolicitudViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EstadoSolicitud.objects.filter(activo=True)
    serializer_class = EstadoSolicitudSerializer
    permission_classes = [IsAuthenticated]


@extend_schema_view(
    list=extend_schema(summary="Listar usuarios"),
    retrieve=extend_schema(summary="Consultar usuario por ID"),
)
class UsuarioViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.filter(is_active=True).select_related("perfil", "perfil__rol")
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]


@extend_schema_view(
    list=extend_schema(summary="Listar solicitudes"),
    retrieve=extend_schema(summary="Consultar una solicitud por ID"),
    create=extend_schema(summary="Crear una nueva solicitud"),
    update=extend_schema(summary="Editar completamente una solicitud"),
    partial_update=extend_schema(summary="Actualizar parcialmente una solicitud"),
    destroy=extend_schema(summary="Eliminar una solicitud"),
)
class SolicitudViewSet(viewsets.ModelViewSet):
    queryset = Solicitud.objects.select_related(
        "solicitante",
        "responsable",
        "estado",
    ).all()

    serializer_class = SolicitudSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset

        estado = self.request.query_params.get("estado")
        prioridad = self.request.query_params.get("prioridad")

        if estado:
            queryset = queryset.filter(estado__codigo=estado)

        if prioridad:
            queryset = queryset.filter(prioridad=prioridad)

        return queryset

    def perform_create(self, serializer):
        estado_pendiente = EstadoSolicitud.objects.get(codigo="PENDIENTE")

        serializer.save(
            solicitante=self.request.user,
            estado=estado_pendiente
        )
        
    @extend_schema(summary="Obtener resumen de solicitudes por estado")
    @action(detail=False, methods=["get"])
    def resumen(self, request):
        total = Solicitud.objects.count()
        pendientes = Solicitud.objects.filter(estado__codigo="PENDIENTE").count()
        en_proceso = Solicitud.objects.filter(estado__codigo="EN_PROCESO").count()
        cerradas = Solicitud.objects.filter(estado__codigo="CERRADA").count()

        data = {
            "total": total,
            "pendientes": pendientes,
            "en_proceso": en_proceso,
            "cerradas": cerradas,
        }

        return Response(data, status=status.HTTP_200_OK)