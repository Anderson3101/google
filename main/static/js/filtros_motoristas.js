function filtrar() {
    const status = document.getElementById('status').value;
    const exibir = document.getElementById('exibir').value;
    const ordem_id = document.getElementById('ordem').value;  // 🔹 Mudamos de "data" para "ordem"

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

    // Adiciona ou remove o parâmetro de ordem por ID
    if (ordem_id) {
        urlParams.set('ordem', ordem_id);  // 🔹 Correto: Enviar ordenação pelo ID
    } else {
        urlParams.delete('ordem');
    }

    // Atualiza a URL com os parâmetros
    window.location.search = urlParams.toString();
}