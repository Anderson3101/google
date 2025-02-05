from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator

class Motorista(models.Model):
    datacadastro = models.DateField(auto_now_add=True)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=200, blank=True, null=True)
    cnpj = models.CharField(max_length=18, blank=True, unique= True, null=True, verbose_name='CNPJ')
    cpf = models.CharField(max_length=14, blank=True, unique= True, null=True, verbose_name='CPF')
    cep = models.CharField(max_length=9)
    endereco = models.CharField(max_length=255)
    numero = models.IntegerField()
    bairro = models.CharField(max_length=255)
    cidade = models.CharField(max_length=255)
    estado = models.CharField(max_length=2)
    telefone = models.CharField(max_length=15, blank=True, null=True)
    celular = models.CharField(max_length=15)
    observacao = models.TextField(blank=True, null=True)
    status = models.BooleanField(blank=True)