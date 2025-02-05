function setActiveLink() {
    // Obtém o caminho atual da URL
    const currentPath = window.location.pathname;

    // Seleciona todos os links do menu
    const links = document.querySelectorAll('nav ul li a');

    // Remove a classe 'active' de todos os links
    links.forEach(link => link.classList.remove('active'));

    // Adiciona a classe 'active' ao link correspondente à URL atual
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Mantém o estilo ativo para a página atual ao carregar
setActiveLink();
