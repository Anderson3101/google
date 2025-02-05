import os
import django
import random
from faker import Faker

# Configure o ambiente do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'locadora.settings')  # Substitua pelo nome do seu projeto
django.setup()

from veiculo.models import Veiculo  # Substitua "locadora" pelo nome da sua aplicação

# Inicializa a biblioteca Faker
fake = Faker('pt_BR')

def criar_veiculos():
    veiculos = []
    combustiveis = ['Gasolina', 'Etanol', 'Diesel', 'GNV', 'Elétrico', 'Híbrido']

    # Lista de marcas e modelos reais
    marcas_e_modelos = {
        'Toyota': ['Corolla', 'Hilux', 'Yaris', 'Rav4'],
        'Honda': ['Civic', 'Fit', 'HR-V', 'CR-V'],
        'Ford': ['Focus', 'Fiesta', 'EcoSport', 'Ranger'],
        'Volkswagen': ['Golf', 'Polo', 'Tiguan', 'Jetta'],
        'Chevrolet': ['Onix', 'Prisma', 'Tracker', 'S10'],
        'Fiat': ['Uno', 'Argo', 'Mobi', 'Strada'],
        'Hyundai': ['HB20', 'Creta', 'Tucson', 'Santa Fe']
    }

    for _ in range(50):  # Loop para criar 50 veículos
        marca = random.choice(list(marcas_e_modelos.keys()))
        modelo = random.choice(marcas_e_modelos[marca])

        veiculo = Veiculo(
            marca=marca,
            modelo=modelo,
            ano=random.randint(1990, 2025),
            placa=fake.license_plate().upper(),
            combustivel=random.choice(combustiveis),
            status=random.choice(['Disponível', 'Indisponível']),
            km_atual=random.randint(0, 100000),
            cambio=random.choice(['Manual', 'Automático', 'CVT'])
        )
        veiculos.append(veiculo)

    # Salva todos os veículos no banco de dados em uma única operação
    Veiculo.objects.bulk_create(veiculos)
    print("50 veículos adicionados com sucesso!")

# Chama a função
if __name__ == "__main__":
    criar_veiculos()