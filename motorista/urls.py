from django.urls import path
from . import views

urlpatterns = [
    path('cadastro_motorista/', views.criar_motorista, name='cadastro_motorista'),
    path('listar_motoristas/', views.listar_motoristas, name='listar_motoristas'),
    path('editar_motorista/<int:pk>', views.editar_motorista, name='editar_motorista'),
    path('excluir_motorista/<int:pk>', views.excluir_motorista, name='excluir_motorista'),
    path('buscar_motoristas/', views.buscar_motoristas, name='buscar_motoristas'),
]