from django.db import models

class Veiculo(models.Model):
    marca = models.CharField(max_length=50, default="Desconhecido")
    modelo = models.CharField(max_length=50, default="Desconhecido")
    ano = models.IntegerField(blank=False)
    placa = models.CharField(max_length=8, unique=True)
    combustivel = models.CharField(max_length=50, blank=False)
    status = models.CharField(max_length=50, blank=True)
    km_atual = models.CharField(max_length=20, blank=False)
    cambio = models.CharField(max_length=50)