from django.db import models
from veiculo.models import Veiculo
from motorista.models import Motorista

class Manutencao(models.Model):
    data_manutencao = models.DateField()
    veiculo = models.ForeignKey(Veiculo, on_delete=models.CASCADE)
    locadora = models.CharField(max_length=20, blank=True)
    motorista = models.ForeignKey(Motorista, on_delete=models.SET_NULL, null=True, blank=True)
    descricao_manutencao = models.TextField()
    valor_manutencao = models.DecimalField(max_digits=10, decimal_places=2)
    local_manutencao = models.CharField(max_length=150)
    status = models.CharField(max_length=20)