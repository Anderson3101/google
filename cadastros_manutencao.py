import os
import django
import random
from faker import Faker

# Configure o ambiente do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'locadora.settings')  # Substitua pelo nome do seu projeto
django.setup()

from manutencao.models import Manutencao  # Substitua "manutencao" pelo nome da sua aplicação
from veiculo.models import Veiculo  # Certifique-se de importar o modelo Veiculo
from motorista.models import Motorista  # Certifique-se de importar o modelo Motorista

# Inicializa a biblioteca Faker
fake = Faker('pt_BR')

def criar_manutencao():
    manutencao_list = []
    status_manutencao = ['Finalizado', 'Cancelado']
    
    # Lista de descrições curtas de serviços
    descricoes_servicos = [
        'Troca de óleo e filtros',
        'Alinhamento e balanceamento',
        'Substituição de pastilhas de freio',
        'Revisão completa do motor',
        'Troca de pneus dianteiros',
        'Substituição da bateria',
        'Ajuste do sistema de suspensão',
        'Reparo no sistema de direção',
        'Troca da correia dentada',
        'Substituição do radiador',
        'Revisão elétrica completa',
        'Troca de velas de ignição',
        'Reparo do sistema de ar-condicionado',
        'Substituição dos amortecedores traseiros',
        'Troca do fluido de freio',
        'Reparo de vazamento no cárter',
        'Revisão do sistema de injeção',
        'Substituição do escapamento',
        'Troca do filtro de ar-condicionado',
        'Reparo de pane elétrica'
    ]

    # Loop para criar 50 manutenções
    for _ in range(50):
        veiculo = random.choice(Veiculo.objects.all())  # Escolhe um veículo aleatório
        motorista = random.choice(Motorista.objects.all()) if random.random() > 0.2 else None  # 20% de chance de não ter motorista
        descricao = random.choice(descricoes_servicos)  # Escolhe uma descrição aleatória

        manutencao = Manutencao(
            data_manutencao=fake.date_this_decade(),
            veiculo=veiculo,
            motorista=motorista,
            descricao_manutencao=descricao,
            valor_manutencao=round(random.uniform(100, 5000), 2),  # Valor entre 100 e 5000
            local_manutencao=fake.company(),
            status=random.choice(status_manutencao)
        )
        manutencao_list.append(manutencao)

    # Salva todas as manutenções no banco de dados em uma única operação
    Manutencao.objects.bulk_create(manutencao_list)
    print("50 manutenções adicionadas com sucesso!")

# Chama a função
if __name__ == "__main__":
    criar_manutencao()