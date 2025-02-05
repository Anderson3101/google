document.addEventListener("DOMContentLoaded", function () {
    const cepInput = document.querySelector('input[name="cep"]');
    const enderecoInput = document.querySelector('input[name="endereco"]');
    const bairroInput = document.querySelector('input[name="bairro"]');
    const cidadeInput = document.querySelector('input[name="cidade"]');
    const estadoInput = document.querySelector('input[name="estado"]');

    if (cepInput) {
        cepInput.addEventListener("blur", function () {
            const cep = cepInput.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número.

            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            enderecoInput.value = data.logradouro || '';
                            bairroInput.value = data.bairro || '';
                            cidadeInput.value = data.localidade || '';
                            estadoInput.value = data.uf || '';
                        } else {
                            alert("CEP não encontrado!");
                        }
                    })
                    .catch(error => {
                        console.error("Erro ao buscar o CEP:", error);
                        alert("Erro ao buscar o CEP. Tente novamente.");
                    });
            } else {
                alert("CEP inválido. Por favor, digite um CEP com 8 números.");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".navbar a");
    const divPessoal = document.querySelector("#pessoal");
    const divEndereco = document.querySelector("#endereco");

    // Esconde a seção de endereço sem remover o display flex do pai
    divEndereco.classList.add("hidden");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Evita a navegação padrão

            // Remove a classe 'active' de todos os links
            links.forEach(l => l.classList.remove("active"));

            // Adiciona a classe 'active' ao link clicado
            this.classList.add("active");

            if (this.textContent.trim() === "Endereço") {
                divPessoal.classList.add("hidden");
                divEndereco.classList.remove("hidden");
            } else if (this.textContent.trim() === "Cadastro") {
                divEndereco.classList.add("hidden");
                divPessoal.classList.remove("hidden");
            }
        });
    });

    // Define "Cadastro" como ativo inicialmente
    links[0].classList.add("active");
});

document.addEventListener("DOMContentLoaded", function () {
    const ativoCheckbox = document.getElementById("status_ativo");
    const inativoCheckbox = document.getElementById("status_inativo");
    const ativoLabel = document.querySelector("label[for='status_ativo']");
    const inativoLabel = document.querySelector("label[for='status_inativo']");

    function toggleCheckboxes(event) {
        if (event.target === ativoCheckbox) {
            inativoCheckbox.checked = false;
            inativoLabel.classList.toggle("active", ativoCheckbox.checked);
            ativoLabel.classList.remove("active");
        } else if (event.target === inativoCheckbox) {
            ativoCheckbox.checked = false;
            ativoLabel.classList.toggle("active", inativoCheckbox.checked);
            inativoLabel.classList.remove("active");
        }
    }

    ativoCheckbox.addEventListener("change", toggleCheckboxes);
    inativoCheckbox.addEventListener("change", toggleCheckboxes);
});

// validador.js
document.addEventListener('DOMContentLoaded', function() {
    // Supondo que você tenha um formulário com um id ou nome
    var form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        var ativoChecked = document.getElementById('status_ativo').checked;
        var inativoChecked = document.getElementById('status_inativo').checked;

        if (!ativoChecked && !inativoChecked) {
            alert('Por favor, selecione o status.');
            event.preventDefault(); // Impede o envio do formulário
        }
    });
});
