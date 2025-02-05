from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.db.models import Q
from django.contrib import messages
from .forms import ManutencaoForm
from veiculo.models import Veiculo
from motorista.models import Motorista
from manutencao.models import Manutencao

def adicionar_manutencao(request):
    veiculos = Veiculo.objects.all()
    motoristas = Motorista.objects.all()

    if request.method == 'POST':
        form = ManutencaoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_manutencao')
    else:
        form = ManutencaoForm()

    return render(request, 'adicionar_manutencao.html', {
        'form': form,
        'veiculos': veiculos,
        'motoristas': motoristas,
    })
    
def listar_manutencao(request):
    # ✅ Sempre inicializa a variável corretamente
    manutencao = Manutencao.objects.all()

    # 🔍 Pegando os filtros da URL
    pesquisa = request.GET.get('pesquisa', '').strip()
    status = request.GET.get('status', '')
    ordem = request.GET.get('ordem', '-data_manutencao')
    exibir = request.GET.get('exibir', '20')  # Quantidade por página (padrão 20)

    # 🔍 Aplicando filtros SE houver valores definidos
    if pesquisa:
        manutencoes = manutencoes.filter(
            Q(veiculo__placa__icontains=pesquisa) |
            Q(motorista__nome__icontains=pesquisa) |
            Q(local_manutencao__icontains=pesquisa)
        )

    if status:
        manutencao = manutencao.filter(status=status)

    # 🔍 Aplicando ordenação de forma segura
    ordem_permitida = ['data_manutencao', '-data_manutencao']
    if ordem not in ordem_permitida:
        ordem = '-data_manutencao'  # Ordena por padrão do mais recente para o mais antigo

    manutencao = manutencao.order_by(ordem)

    # 🔍 Aplicando paginação
    try:
        exibir = int(exibir)
    except ValueError:
        exibir = 20  # Se 'exibir' não for um número, define como 20

    paginator = Paginator(manutencao, exibir)
    page = request.GET.get('page')
    manutencao = paginator.get_page(page)

    return render(request, 'listar_manutencao.html', {
        'manutencao': manutencao,
        'pesquisa': pesquisa,
        'status': status,
        'exibir': exibir,
        'ordem': ordem,
    })


def editar_manutencao(request, pk):
    manutencao = Manutencao.objects.get(pk=pk)
    veiculos = Veiculo.objects.all()
    motoristas = Motorista.objects.all()
    
    if request.method == 'POST':
        data = request.POST.copy()  # Copia os dados do formulário para edição

        # 🔹 Converte valor_manutencao para número corretamente
        if 'valor_manutencao' in data:
            data['valor_manutencao'] = data['valor_manutencao'].replace(',', '.')  # Troca vírgula por ponto

        form = ManutencaoForm(data, instance=manutencao)
        if form.is_valid():
            form.save()
            messages.success(request, 'Manutenção editada com sucesso!')
            return redirect('listar_manutencao')
        else:
            print(form.errors)  # Exibe erros no terminal para depuração

    else:
        form = ManutencaoForm(instance=manutencao)

    return render(request, 'editar_manutencao.html', {
        'manutencao': manutencao,
        'veiculos': veiculos,
        'motoristas': motoristas,
        'form': form,
    })



# 🔹 Função de Busca AJAX
def buscar_manutencoes(request):
    pesquisa = request.GET.get('pesquisa', '').strip()

    # Filtro por placa, motorista ou local da manutenção
    manutencoes = Manutencao.objects.filter(
        Q(veiculo__placa__icontains=pesquisa) |
        Q(motorista__nome__icontains=pesquisa) |
        Q(local_manutencao__icontains=pesquisa)
    )

    # Converte os dados para JSON
    data = list(manutencoes.values(
        'id', 'veiculo__placa', 'motorista__nome',
        'valor_manutencao', 'local_manutencao', 'data_manutencao'
    ))
    return JsonResponse({'manutencoes': data})