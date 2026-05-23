from django.db import models


class Solicitud(models.Model):
    ESTADOS = [
        ("PENDIENTE", "Pendiente"),
        ("EN_PROCESO", "En proceso"),
        ("CERRADA", "Cerrada"),
    ]

    PRIORIDADES = [
        ("BAJA", "Baja"),
        ("MEDIA", "Media"),
        ("ALTA", "Alta"),
    ]

    titulo = models.CharField(max_length=150)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    solicitante = models.CharField(max_length=120)
    responsable = models.CharField(max_length=120, blank=True, null=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default="PENDIENTE")
    prioridad = models.CharField(max_length=20, choices=PRIORIDADES, default="MEDIA")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-fecha_creacion"]
        verbose_name = "Solicitud"
        verbose_name_plural = "Solicitudes"

    def __str__(self):
        return f"{self.titulo} - {self.estado}"