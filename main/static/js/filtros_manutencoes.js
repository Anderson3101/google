function filtrar() {
    const status = document.getElementById('status').value;
    const exibir = document.getElementById('exibir').value;
    const ordemData = document.getElementById('data').value;

    const urlParams = new URLSearchParams(window.location.search);

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

    if (ordemData) {
        urlParams.set('ordem', ordemData);
    } else {
        urlParams.delete('ordem');
    }

    window.location.search = urlParams.toString();
}
