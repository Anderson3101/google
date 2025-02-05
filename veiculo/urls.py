from django.urls import path
from . import views

urlpatterns = [
    path('cadastro_veiculo/', views.criar_veiculo, name='cadastro_veiculo'),
    path('listar_veiculos/', views.listar_veiculos, name='listar_veiculos'),
    path('excluir_veiculo/<int:pk>', views.excluir_veiculo, name='excluir_veiculo'),
    path('editar_veiculo/<int:pk>', views.editar_veiculo, name='editar_veiculo'),
    path('buscar_veiculos/', views.buscar_veiculos, name='buscar_veiculos'),
]