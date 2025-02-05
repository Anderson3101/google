document.addEventListener("DOMContentLoaded", function () {
    const modelosPorMarca = {
        Chevrolet: ["Onix", "Prisma", "Cruze", "Tracker", "Spin", "S10", "Equinox", "Blazer"],
        Fiat: ["Argo", "Toro", "Strada", "Pulse", "Fiorino", "Uno", "Doblo", "Mobi", "Fastback"],
        Honda: ["Civic", "HR-V", "Fit", "City", "CR-V", "WR-V"],
        Peugeot: ["208", "2008", "3008", "5008", "Expert", "Partner"],
        Jeep: ["Compass", "Renegade", "Commander", "Wrangler", "Cherokee", "Grand Cherokee"],
        Toyota: ["Corolla", "Hilux", "RAV4", "Yaris", "Etios", "SW4", "Prius", "Camry"],
        Hyundai: ["HB20", "Creta", "Santa Fe", "Tucson", "Elantra", "Kona"],
        Volkswagen: ["Polo", "T-Cross", "Golf", "Virtus", "Jetta", "Amarok", "Tiguan"],
        Renault: ["Kwid", "Duster", "Sandero", "Stepway", "Logan", "Captur", "Oroch"],
        Nissan: ["Kicks", "Versa", "Sentra", "March", "Frontier", "Altima", "Leaf"],
        Ford: ["Fiesta", "EcoSport", "Ka", "Maverick", "Ranger", "Fusion", "Focus"],
        Kia: ["Sportage", "Sorento", "Seltos", "Picanto", "Cerato", "Carnival", "Soul"],
        BYD: ["Han", "Tang", "Dolphin", "Yuan", "Song", "Qin"],
    };

    const combustiveis = ["Gasolina", "Álcool", "Diesel", "Flex", "Híbrido", "Elétrico"];
    const anos = Array.from({ length: 30 }, (_, i) => 2000 + i);

    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const combustivelSelect = document.getElementById("combustivel");
    const anoSelect = document.getElementById("ano");


    function atualizarModelos() {
        const marcaSelecionada = marcaSelect.value;
        const modeloAtual = modeloSelect.dataset.current; // Captura o modelo já cadastrado.

        modeloSelect.innerHTML = "";
        if (marcaSelecionada) {
            // Adiciona a opção padrão.
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione um modelo";
            defaultOption.disabled = true;
            modeloSelect.appendChild(defaultOption);

            // Preenche os modelos disponíveis.
            const modelos = modelosPorMarca[marcaSelecionada] || [];
            modelos.forEach((modelo) => {
                const option = document.createElement("option");
                option.value = modelo;
                option.textContent = modelo;
                if (modelo === modeloAtual) {
                    option.selected = true; // Seleciona o modelo atual.
                }
                modeloSelect.appendChild(option);
            });
        }
    }

    // Configura os eventos para outros selects.
    function configurarOutrosSelects() {
        modeloSelect.addEventListener("change", function () {
            combustivelSelect.disabled = !modeloSelect.value;
        });

        combustivelSelect.addEventListener("change", function () {
            anoSelect.disabled = !combustivelSelect.value;
        });

        // Preenche opções de combustível.
        combustiveis.forEach((combustivel) => {
            const option = document.createElement("option");
            option.value = combustivel;
            option.textContent = combustivel;
            combustivelSelect.appendChild(option);
        });

        // Preenche opções de ano.
        anos.forEach((ano) => {
            const option = document.createElement("option");
            option.value = ano;
            option.textContent = ano;
            anoSelect.appendChild(option);
        });
    }

    // Configuração inicial ao carregar a página.
    atualizarModelos();
    configurarOutrosSelects();

    // Atualiza os modelos sempre que a marca mudar.
    marcaSelect.addEventListener("change", atualizarModelos);
});
