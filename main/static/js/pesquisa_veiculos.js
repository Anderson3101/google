function pesquisarVeiculos() {
    const pesquisa = document.getElementById('pesquisa').value;
    
    // Faz a requisição para a busca no backend
    fetch(`/buscar_veiculos/?pesquisa=${pesquisa}`)
    .then(response => response.json())
    .then(data => {
        const listaVeiculos = document.getElementById('lista_veiculos');
        listaVeiculos.innerHTML = ""; // Limpa os resultados atuais

        if (data.veiculos.length === 0) {
            listaVeiculos.innerHTML = "<p>Nenhum veículo encontrado.</p>";
            return;
        }

        data.veiculos.forEach(veiculo => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="marca">
                    <h3>${veiculo.marca}</h3>
                </div>
                <div class="placa_modelo">
                    <p>${veiculo.modelo}</p>
                    <p class="p_placa">${veiculo.placa}</p>
                </div> 
                <div class="imagem">
                    <img src="/static/icons/Car.png" alt="Foto de carro">
                </div>             
                <div class="ano_status">
                    <p class="p_ano">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <path d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
                        </svg>
                        ${veiculo.ano}
                    </p>
                    <p class="p_status">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="16" height="16" rx="8" fill="${veiculo.status === 'Indisponível' ? '#CE0000' : '#3563E9'}" fill-opacity="0.3"/>
                            <circle cx="8" cy="8" r="4" fill="${veiculo.status === 'Indisponível' ? '#CE0000' : '#3563E9'}"/>
                        </svg>
                        ${veiculo.status}
                    </p>
                </div>
                <div class="btn_editar">
                    <a href="/editar_veiculo/${veiculo.id}">Editar</a>
                </div>
            `;

            listaVeiculos.appendChild(card);
        });
    });
}
