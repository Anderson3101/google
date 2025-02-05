function pesquisarManutencoes() {
    const pesquisa = document.getElementById('pesquisa').value.trim();
    const listaManutencoes = document.getElementById('lista_manutencoes');

    if (!listaManutencoes) {
        console.error("Erro: Elemento 'lista_manutencoes' não encontrado no DOM.");
        return;
    }

    // Faz a requisição AJAX para buscar manutenções no backend
    fetch("/buscar_manutencoes/?pesquisa=" + encodeURIComponent(pesquisa))
    .then(response => response.json())
    .then(data => {
        listaManutencoes.innerHTML = ""; // Limpa os resultados antes de atualizar

        if (data.manutencoes.length === 0) {
            listaManutencoes.innerHTML = "<p style='text-align: center;'>Nenhuma manutenção encontrada.</p>";
            return;
        }

        // Criando nova tabela dinamicamente
        const tabela = document.createElement("div");
        tabela.classList.add("tabela_body");

        // Criando o cabeçalho novamente
        const tabelaHead = document.createElement("div");
        tabelaHead.classList.add("tabela_head");
        tabelaHead.innerHTML = `
            <ul>
                <li>Data</li>
                <li>Veículo</li>
                <li>Motorista</li>
                <li>Valor</li>
                <li>Local</li>
            </ul>
        `;
        tabela.appendChild(tabelaHead);

        // Adicionando manutenções na tabela
        data.manutencoes.forEach(manutencao => {
            const linha = document.createElement("a");
            linha.href = `/editar_manutencao/${manutencao.id}`;
            linha.innerHTML = `
                <ul class="infos">
                    <li>${manutencao.data_manutencao}</li>
                    <li>${manutencao.veiculo__placa}</li>
                    <li>${manutencao.motorista__nome || "Sem Motorista"}</li>
                    <li>${manutencao.valor_manutencao}</li>
                    <li>${manutencao.local_manutencao}</li>
                </ul>
            `;
            tabela.appendChild(linha);
        });

        // Adiciona a nova tabela na página
        listaManutencoes.appendChild(tabela);
    })
    .catch(error => console.error('Erro ao buscar manutenções:', error));
}
