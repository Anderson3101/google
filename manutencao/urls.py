from django.urls import path
from . import views

urlpatterns = [
    path('adicionar_manutencao/', views.adicionar_manutencao, name='adicionar_manutencao'),
    path('listar_manutencao/', views.listar_manutencao, name='listar_manutencao'),
    path('editar_manutencao/<int:pk>', views.editar_manutencao, name='editar_manutencao'),
    path('adicionar_manutencao/', views.adicionar_manutencao, name='adicionar_manutencao'),
    path('buscar_manutencoes/', views.buscar_manutencoes, name='buscar_manutencoes'),

]