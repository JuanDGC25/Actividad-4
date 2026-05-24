from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import User

from .models import Rol, EstadoSolicitud, PerfilUsuario


@receiver(post_migrate)
def crear_datos_iniciales(sender, **kwargs):
    if sender.name != "solicitudes":
        return

    roles = [
        {
            "nombre": "Solicitante",
            "descripcion": "Usuario que registra y consulta solicitudes internas.",
        },
        {
            "nombre": "Responsable",
            "descripcion": "Usuario encargado de atender solicitudes asignadas.",
        },
        {
            "nombre": "Administrador",
            "descripcion": "Usuario encargado de administrar el sistema.",
        },
    ]

    for rol_data in roles:
        Rol.objects.get_or_create(
            nombre=rol_data["nombre"],
            defaults={
                "descripcion": rol_data["descripcion"],
                "activo": True,
            }
        )

    estados = [
        {
            "nombre": "Pendiente",
            "codigo": "PENDIENTE",
            "descripcion": "Solicitud registrada y pendiente de atención.",
            "orden": 1,
        },
        {
            "nombre": "En proceso",
            "codigo": "EN_PROCESO",
            "descripcion": "Solicitud asignada o en gestión.",
            "orden": 2,
        },
        {
            "nombre": "Cerrada",
            "codigo": "CERRADA",
            "descripcion": "Solicitud atendida y finalizada.",
            "orden": 3,
        },
    ]

    for estado_data in estados:
        EstadoSolicitud.objects.get_or_create(
            codigo=estado_data["codigo"],
            defaults={
                "nombre": estado_data["nombre"],
                "descripcion": estado_data["descripcion"],
                "activo": True,
                "orden": estado_data["orden"],
            }
        )

    admin_rol = Rol.objects.filter(nombre="Administrador").first()

    if admin_rol:
        admin_user, created = User.objects.get_or_create(
            username="admin",
            defaults={
                "first_name": "Administrador",
                "last_name": "Sistema",
                "email": "admin@solicitudes.com",
                "is_staff": True,
                "is_superuser": True,
            }
        )

        if created:
            admin_user.set_password("admin123")
            admin_user.save()

        PerfilUsuario.objects.get_or_create(
            usuario=admin_user,
            defaults={
                "rol": admin_rol,
            }
        )