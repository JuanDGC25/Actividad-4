from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import Rol, PerfilUsuario, EstadoSolicitud, Solicitud


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = [
            "id",
            "nombre",
            "descripcion",
            "activo",
        ]


class EstadoSolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoSolicitud
        fields = [
            "id",
            "nombre",
            "codigo",
            "descripcion",
            "activo",
            "orden",
        ]


class UsuarioSerializer(serializers.ModelSerializer):
    rol = serializers.SerializerMethodField()
    rol_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "rol",
            "rol_id",
        ]

    def get_rol(self, obj):
        perfil = getattr(obj, "perfil", None)

        if not perfil:
            return None

        return {
            "id": perfil.rol.id,
            "nombre": perfil.rol.nombre,
        }


class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4)
    rol_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "rol_id",
        ]

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("El nombre de usuario ya existe.")
        return value

    def validate_rol_id(self, value):
        if not Rol.objects.filter(id=value, activo=True).exists():
            raise serializers.ValidationError("El rol seleccionado no existe o está inactivo.")
        return value

    def create(self, validated_data):
        rol_id = validated_data.pop("rol_id")
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        rol = Rol.objects.get(id=rol_id)

        PerfilUsuario.objects.create(
            usuario=user,
            rol=rol
        )

        Token.objects.create(user=user)

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError("Usuario o contraseña incorrectos.")

        if not user.is_active:
            raise serializers.ValidationError("El usuario se encuentra inactivo.")

        token, created = Token.objects.get_or_create(user=user)

        perfil = getattr(user, "perfil", None)

        attrs["user"] = user
        attrs["token"] = token.key
        attrs["rol"] = perfil.rol.nombre if perfil else None

        return attrs


class SolicitudSerializer(serializers.ModelSerializer):
    solicitante_nombre = serializers.SerializerMethodField(read_only=True)
    responsable_nombre = serializers.SerializerMethodField(read_only=True)
    estado_nombre = serializers.SerializerMethodField(read_only=True)
    estado_codigo = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Solicitud
        fields = [
            "id",
            "titulo",
            "descripcion",
            "categoria",
            "solicitante",
            "solicitante_nombre",
            "responsable",
            "responsable_nombre",
            "estado",
            "estado_nombre",
            "estado_codigo",
            "prioridad",
            "observaciones",
            "fecha_creacion",
            "fecha_actualizacion",
        ]

        read_only_fields = [
            "id",
            "solicitante",
            "estado",
            "solicitante_nombre",
            "responsable_nombre",
            "estado_nombre",
            "estado_codigo",
            "fecha_creacion",
            "fecha_actualizacion",
        ]

    def get_solicitante_nombre(self, obj):
        return obj.solicitante.get_full_name() or obj.solicitante.username

    def get_responsable_nombre(self, obj):
        if not obj.responsable:
            return None

        return obj.responsable.get_full_name() or obj.responsable.username

    def get_estado_nombre(self, obj):
        return obj.estado.nombre

    def get_estado_codigo(self, obj):
        return obj.estado.codigo

    def validate_titulo(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("El título debe tener al menos 5 caracteres.")
        return value

    def validate_descripcion(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("La descripción debe tener al menos 10 caracteres.")
        return value
    