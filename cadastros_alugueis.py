import os
import django
import random
from faker import Faker

# Configura o ambiente do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'locadora.settings')  # Substitua pelo nome do seu projeto
django.setup()

from aluguel.models import Aluguel  # Substitua pelo nome correto do app
from veiculo.models import Veiculo
from motorista.models import Motorista

# Inicializa a biblioteca Faker
fake = Faker('pt_BR')

def criar_alugueis():
    alugueis = []
    veiculos = list(Veiculo.objects.all())  # Lista de veículos existentes
    motoristas = list(Motorista.objects.all())  # Lista de motoristas existentes

    if not veiculos or not motoristas:
        print("⚠️ Não há veículos ou motoristas cadastrados. Adicione-os primeiro.")
        return

    for _ in range(50):  # Gera 50 aluguéis
        veiculo = random.choice(veiculos)
        motorista = random.choice(motoristas)
        data_inicio = fake.date_between(start_date='-2y', end_date='today')
        data_fim = fake.date_between(start_date=data_inicio, end_date='+1y')

        # ✅ Garante que a data de pagamento esteja dentro de um intervalo válido
        data_pagamento = fake.date_between(start_date=data_inicio, end_date=data_fim)

        aluguel = Aluguel(
            taxa=round(random.uniform(50, 500), 2),
            data_pagamento=data_pagamento,
            veiculo=veiculo,
            motorista=motorista,
            km_atual=random.randint(1000, 200000),
            valor_pago=round(random.uniform(500, 5000), 2),
            data_inicio=data_inicio,
            data_fim=data_fim
        )
        alugueis.append(aluguel)

    # Salva todos os registros de uma vez
    Aluguel.objects.bulk_create(alugueis)
    print("✅ 50 aluguéis adicionados com sucesso!")

# Chama a função
if __name__ == "__main__":
    criar_alugueis()
