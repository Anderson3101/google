import os
import django
import random
from faker import Faker

# Configure o ambiente do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'locadora.settings')  # Substitua pelo nome do seu projeto
django.setup()

from motorista.models import Motorista  # Substitua "locadora" pelo nome da sua aplicação

# Inicializa a biblioteca Faker
fake = Faker('pt_BR')

def criar_motoristas():
    motoristas = []
    for _ in range(50):  # Loop para criar 50 motoristas
        motorista = Motorista(
            nome=fake.name(),
            email=fake.email(),
            cnpj=fake.cnpj(),
            cpf=fake.cpf(),
            cep=fake.postcode(),
            endereco=fake.street_name(),
            numero=str(fake.building_number()),
            bairro=fake.bairro(),
            cidade=fake.city(),
            estado=fake.estado_sigla(),
            telefone=fake.phone_number(),
            celular=fake.cellphone_number(),
            observacao=fake.text(max_nb_chars=50),
            status=random.choice([True, False])
        )
        motoristas.append(motorista)

    # Salva todos os motoristas no banco de dados
    Motorista.objects.bulk_create(motoristas)
    print("50 motoristas adicionados com sucesso!")

# Chama a função
if __name__ == "__main__":
    criar_motoristas()
