function filtrar() {
    const status = document.getElementById('status').value;
    const exibir = document.getElementById('exibir').value;
    const urlParams = new URLSearchParams(window.location.search);

    // Atualiza os parâmetros na URL
    if (status) {
        urlParams.set('status', status);
    } else {
        urlParams.delete('status');
    }

    if (exibir) {
        urlParams.set('exibir', exibir);
    } else {
        urlParams.delete('exibir');
    }

    // Atualiza a página com os novos filtros aplicados
    window.location.search = urlParams.toString();
}
