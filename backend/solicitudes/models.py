from django.db import models
from django.contrib.auth.models import User


class Rol(models.Model):
    nombre = models.CharField(max_length=80, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    activo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Rol"
        verbose_name_plural = "Roles"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class PerfilUsuario(models.Model):
    usuario = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="perfil"
    )
    rol = models.ForeignKey(
        Rol,
        on_delete=models.PROTECT,
        related_name="usuarios"
    )

    class Meta:
        verbose_name = "Perfil de usuario"
        verbose_name_plural = "Perfiles de usuario"

    def __str__(self):
        return f"{self.usuario.username} - {self.rol.nombre}"


class EstadoSolicitud(models.Model):
    nombre = models.CharField(max_length=80, unique=True)
    codigo = models.CharField(max_length=30, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    activo = models.BooleanField(default=True)
    orden = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Estado de solicitud"
        verbose_name_plural = "Estados de solicitud"
        ordering = ["orden", "nombre"]

    def __str__(self):
        return self.nombre


class Solicitud(models.Model):
    PRIORIDADES = [
        ("BAJA", "Baja"),
        ("MEDIA", "Media"),
        ("ALTA", "Alta"),
    ]

    titulo = models.CharField(max_length=150)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)

    solicitante = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="solicitudes_creadas"
    )

    responsable = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="solicitudes_asignadas",
        blank=True,
        null=True
    )

    estado = models.ForeignKey(
        EstadoSolicitud,
        on_delete=models.PROTECT,
        related_name="solicitudes"
    )

    prioridad = models.CharField(
        max_length=20,
        choices=PRIORIDADES,
        default="MEDIA"
    )

    observaciones = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-fecha_creacion"]
        verbose_name = "Solicitud"
        verbose_name_plural = "Solicitudes"

    def __str__(self):
        return f"{self.titulo} - {self.estado.nombre}"