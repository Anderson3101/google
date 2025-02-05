from django.shortcuts import render, redirect
from .forms import VeiculoForm
from .models import Veiculo
from django.contrib import messages
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.core.serializers import serialize


def criar_veiculo(request):
    if request.method == 'POST':
        form = VeiculoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Veiculo cadastrado com sucesso!')
            return redirect('listar_veiculos')
    return render(request, 'cadastro_veiculo.html')

def listar_veiculos(request):
    # Obtém os parâmetros de filtros
    status = request.GET.get('status', '')
    pesquisa = request.GET.get('pesquisa', '')
    placa = request.GET.get('placa', '')  # Novo parâmetro de placa
    exibir = int(request.GET.get('exibir', 20))  # Quantidade por página (padrão 20)

    # Busca inicial
    veiculos = Veiculo.objects.all()

    # Filtro por status
    if status:
        veiculos = veiculos.filter(status=status)

    # Pesquisa por placa
    if pesquisa:
        veiculos = veiculos.filter(placa__icontains=pesquisa)

    # Filtro por placa específica
    if placa:
        veiculos = veiculos.filter(placa=placa)

    # Ordena por marca e aplica paginação
    veiculos = veiculos.order_by('marca')
    paginator = Paginator(veiculos, exibir)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    # Verifica se a requisição é AJAX
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render(request, 'partials/lista_veiculos.html', {'veiculos': page_obj})

    # Renderiza os dados para o template completo
    return render(request, 'listar_veiculos.html', {
        'veiculos': page_obj,
        'status': status,
        'pesquisa': pesquisa,
        'exibir': exibir,
    })

def editar_veiculo(request, pk):
    veiculo = Veiculo.objects.get(pk=pk)
    if request.method == 'POST':
        form = VeiculoForm(request.POST, instance=veiculo)
        if form.is_valid():
            form.save()
            messages.success(request, 'Veiculo editado com sucesso!')
            return redirect('listar_veiculos')
    return render(request, 'editar_veiculo.html', {'veiculo': veiculo})

def excluir_veiculo(request, pk):
    veiculo = Veiculo.objects.get(pk=pk)
    veiculo.delete()
    messages.success(request, 'Veiculo excluido com sucesso!')
    return redirect('listar_veiculos')

def buscar_veiculos(request):
    pesquisa = request.GET.get('pesquisa', '')  # Obtém o termo pesquisado

    # Busca no banco independentemente da página ativa
    veiculos = Veiculo.objects.filter(
        placa__icontains=pesquisa
    ) | Veiculo.objects.filter(
        modelo__icontains=pesquisa
    ) | Veiculo.objects.filter(
        marca__icontains=pesquisa
    )

    # Retorna os dados como JSON
    data = list(veiculos.values('id', 'marca', 'modelo', 'placa', 'ano', 'status'))
    return JsonResponse({'veiculos': data})