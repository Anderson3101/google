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
    const anoAtual = new Date().getFullYear();
    const anos = Array.from({ length: anoAtual - 2015 + 1 }, (_, i) => 2015 + i);
    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const combustivelSelect = document.getElementById("combustivel");
    const anoSelect = document.getElementById("ano");

    modeloSelect.disabled = true;
    combustivelSelect.disabled = true;
    anoSelect.disabled = true;

    marcaSelect.addEventListener("change", function () {
        const marcaSelecionada = marcaSelect.value;
    
        modeloSelect.innerHTML = "";
        modeloSelect.disabled = !marcaSelecionada;
        combustivelSelect.disabled = true;
        anoSelect.disabled = true;
    
        if (marcaSelecionada) {
            // Adicionar a opção padrão ao campo de modelo
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione um modelo";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            modeloSelect.appendChild(defaultOption);
    
            const modelos = modelosPorMarca[marcaSelecionada] || [];
            modelos.forEach((modelo) => {
                const option = document.createElement("option");
                option.value = modelo;
                option.textContent = modelo;
                modeloSelect.appendChild(option);
            });
        }
    });

    modeloSelect.addEventListener("change", function () {
        const modeloSelecionado = modeloSelect.value;
        combustivelSelect.disabled = !modeloSelecionado;
        anoSelect.disabled = true;
    });

    combustivelSelect.addEventListener("change", function () {
        const combustivelSelecionado = combustivelSelect.value;
        anoSelect.disabled = !combustivelSelecionado;
    });

    combustiveis.forEach((combustivel) => {
        const option = document.createElement("option");
        option.value = combustivel;
        option.textContent = combustivel;
        combustivelSelect.appendChild(option);
    });

    anos.forEach((ano) => {
        const option = document.createElement("option");
        option.value = ano;
        option.textContent = ano;
        anoSelect.appendChild(option);
    });
});