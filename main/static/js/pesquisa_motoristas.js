function pesquisarMotoristas() {
    const pesquisa = document.getElementById('search').value.trim();
    const listaMotoristas = document.getElementById('lista_motoristas');

    if (!listaMotoristas) {
        console.error("Erro: Elemento 'lista_motoristas' não encontrado no DOM.");
        return;
    }

    // Faz a requisição AJAX para buscar motoristas no backend
    fetch("/buscar_motoristas/?pesquisa=" + encodeURIComponent(pesquisa))
    .then(response => response.json())
    .then(data => {
        listaMotoristas.innerHTML = ""; // Limpa os resultados antes de atualizar

        if (data.motoristas.length === 0) {
            listaMotoristas.innerHTML = "<p style='text-align: center;'>Nenhum motorista encontrado.</p>";
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
                <li>Nome</li>
                <li>CPF ou CNPJ</li>
                <li>Celular</li>
                <li>E-Mail</li>
                <li>Status</li>
            </ul>
        `;
        tabela.appendChild(tabelaHead);

        // Adicionando motoristas na tabela
        data.motoristas.forEach(motorista => {
            const linha = document.createElement("a");
            linha.href = `/editar_motorista/${motorista.id}`;
            linha.innerHTML = `
                <ul class="infos">
                    <li class="motorista_nome">${motorista.nome}</li>
                    <li>${motorista.cnpj ? motorista.cnpj : (motorista.cpf ? motorista.cpf : "N/A")}</li>
                    <li>${motorista.celular || "N/A"}</li>
                    <li>${motorista.email || "N/A"}</li>
                    <li>${motorista.status ? "Ativo" : "Inativo"}</li>
                </ul>
            `;
            tabela.appendChild(linha);
        });

        // Adiciona a nova tabela na página
        listaMotoristas.appendChild(tabela);
    })
    .catch(error => console.error('Erro ao buscar motoristas:', error));
}
