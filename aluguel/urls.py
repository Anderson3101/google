from django.urls import path
from . import views

urlpatterns = [
    path('cadastro_aluguel/', views.criar_aluguel, name='cadastro_aluguel'),
    path('ajax/buscar_motoristas/', views.buscar_motoristas, name='buscar_motoristas'),
    path('ajax/buscar_veiculos/', views.buscar_veiculos, name='buscar_veiculos'),
    path('listar_alugueis/', views.listar_alugueis, name='listar_alugueis'),
    path('editar_aluguel/editar/<int:pk>/', views.editar_aluguel, name='editar_aluguel'),
    path('excluir_aluguel/excluir/<int:pk>/', views.excluir_aluguel, name='excluir_aluguel'),
    path('buscar_aluguel/buscar/', views.buscar_alugueis, name='buscar_alugueis'),
    path('calendario/', views.calendario, name='calendario'),
    path('ajax/buscar_pagamentos_dia/', views.buscar_pagamentos_dia, name='buscar_pagamentos_dia'),

]
