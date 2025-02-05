function filtrar() {
    const status = document.getElementById('status').value;
    const exibir = document.getElementById('exibir').value;
    const ordemData = document.getElementById('data').value;

    const urlParams = new URLSearchParams(window.location.search);

    // Adiciona ou remove o parâmetro de status
    if (status) {
        urlParams.set('status', status);
    } else {
        urlParams.delete('status');
    }

    // Adiciona ou remove o parâmetro de exibir
    if (exibir) {
        urlParams.set('exibir', exibir);
    } else {
        urlParams.delete('exibir');
    }

    // Adiciona ou remove o parâmetro de ordem por data
    if (ordemData) {
        urlParams.set('data', ordemData);
    } else {
        urlParams.delete('data');
    }

    // Atualiza a URL com os parâmetros
    window.location.search = urlParams.toString();
}

function pesquisarManutencao() {
    const pesquisa = document.getElementById("search").value.toLowerCase();
    const cards = document.querySelectorAll(".infos");

    if (pesquisa === "") {
        // Se a pesquisa estiver vazia, exibe todos os veículos
        cards.forEach(card => {
            card.style.display = "flex";
        });
        return; // Sai da função para evitar filtragem
    }

    cards.forEach(card => {
        const placa = card.querySelector(".motorista_nome").textContent.toLowerCase();

        // Se a placa corresponde ao valor digitado, exibe o card; senão, oculta
        if (placa.includes(pesquisa)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}
