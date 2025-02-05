from django.shortcuts import render, redirect, get_object_or_404
from .forms import MotoristaForm
from .models import Motorista
from django.contrib import messages
from django.core.paginator import Paginator
from django.http import JsonResponse


def criar_motorista(request):
    if request.method == 'POST':
        form = MotoristaForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Motorista cadastrado com sucesso!')
            return redirect('listar_motoristas')
    return render(request, 'cadastro_motorista.html')


def listar_motoristas(request):
    motoristas = Motorista.objects.all()

    # Pegando o parâmetro de ordenação com fallback para '-id'
    ordem_id = request.GET.get('ordem', '-id')

    # Garantir que a ordenação só pode ser pelo ID
    if ordem_id not in ['id', '-id']:
        ordem_id = '-id'

    # Aplicando a ordenação pelo ID
    motoristas = motoristas.order_by(ordem_id)

    # Filtragem por status (Ativo/Inativo)
    status = request.GET.get('status', '')
    if status == 'Ativos':
        motoristas = motoristas.filter(status=True)
    elif status == 'Desativado':
        motoristas = motoristas.filter(status=False)

    # Paginação (Garante que sempre será um número válido)
    try:
        exibir = int(request.GET.get('exibir', 20))
    except ValueError:
        exibir = 20  # Padrão: listar 10 por página

    paginator = Paginator(motoristas, exibir)
    page = request.GET.get('page')
    motoristas = paginator.get_page(page)

    return render(request, 'listar_motoristas.html', {
        'motoristas': motoristas,
        'ordem_id': ordem_id,
        'status': status,
        'exibir': exibir
    })


def editar_motorista(request, pk):
    motorista = get_object_or_404(Motorista, pk=pk)

    if request.method == 'POST':
        form = MotoristaForm(request.POST, instance=motorista)
        if form.is_valid():
            form.save()
            messages.success(request, 'Motorista editado com sucesso!')
            return redirect('listar_motoristas')

    return render(request, 'editar_motorista.html', {'motorista': motorista})


def excluir_motorista(request, pk):
    motorista = get_object_or_404(Motorista, pk=pk)
    motorista.delete()
    messages.success(request, 'Motorista excluído com sucesso!')
    return redirect('listar_motoristas')


def buscar_motoristas(request):
    pesquisa = request.GET.get('pesquisa', '').strip()

    if pesquisa:
        # Filtra motoristas pelo nome, CPF ou CNPJ
        motoristas = Motorista.objects.filter(
            nome__icontains=pesquisa
        ) | Motorista.objects.filter(
            cpf__icontains=pesquisa
        ) | Motorista.objects.filter(
            cnpj__icontains=pesquisa
        )
    else:
        motoristas = Motorista.objects.all()  # Se não houver pesquisa, retorna todos

    # Ordena por ID (Mais Recentes)
    motoristas = motoristas.order_by('-id')

    # Converte os motoristas para JSON
    data = list(motoristas.values('id', 'nome', 'cpf', 'cnpj', 'celular', 'email', 'status'))

    return JsonResponse({'motoristas': data})
