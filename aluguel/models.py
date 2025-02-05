from django.db import models
from veiculo.models import Veiculo
from motorista.models import Motorista

class Aluguel(models.Model):
    taxa = models.CharField(max_length=30)
    data_pagamento = models.DateField()
    veiculo = models.ForeignKey(Veiculo, on_delete=models.CASCADE)
    motorista = models.ForeignKey(Motorista, on_delete=models.CASCADE)
    km_atual = models.CharField(max_length=30)
    tipo = models.CharField(max_length=30)
    valor_semanal = models.CharField(blank=True, max_length=30)
    dia_debito = models.CharField(blank=True, max_length=30)
    valor_pago = models.CharField(blank=True, max_length=30)
    data_inicio = models.DateField()
    data_fim = models.DateField()
