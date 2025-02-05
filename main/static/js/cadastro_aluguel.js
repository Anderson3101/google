$(document).ready(function() {
    // Função genérica para lidar com a busca e exibição de sugestões
    function setupAutocomplete(searchInput, hiddenInput, suggestionsDiv, url, displayField) {
        // Quando digita no campo de busca
        $(searchInput).on('keyup', function() {
            var query = $(this).val();
            if(query.length < 1) {  // Inicia a busca a partir de 1 caracter
                $(suggestionsDiv).empty();
                return;
            }
            $.ajax({
                url: url,
                data: { q: query },
                dataType: 'json',
                success: function(data) {
                    // Limpa sugestões anteriores
                    $(suggestionsDiv).empty();
                    // Exibe cada sugestão
                    $.each(data, function(index, item) {
                        var suggestionItem = $('<div>')
                            .addClass('suggestion-item')
                            .text(item[displayField])
                            .attr('data-id', item.id);
                        $(suggestionsDiv).append(suggestionItem);
                    });
                }
            });
        });

        // Quando clica em uma sugestão
        $(suggestionsDiv).on('click', '.suggestion-item', function() {
            var selectedText = $(this).text();
            var selectedId = $(this).data('id');
            $(searchInput).val(selectedText);
            $(hiddenInput).val(selectedId);
            $(suggestionsDiv).empty();
        });
    }

    // Configura o autocomplete para veículo
    setupAutocomplete(
        '#veiculo_search',
        '#veiculo_id',
        '#veiculo_suggestions',
        '/ajax/buscar_veiculos/',  // URL configurada no urls.py
        'placa'
    );

    // Configura o autocomplete para motorista
    setupAutocomplete(
        '#motorista_search',
        '#motorista_id',
        '#motorista_suggestions',
        '/ajax/buscar_motoristas/',  // URL configurada no urls.py
        'nome'
    );
});

$(document).ready(function() {
    // ... código já existente para autocomplete ...

    // Controle condicional do Tipo do pagamento
    $("#tipo").change(function(){
        var tipo = $(this).val();
        if (tipo === "Recorrente") {
            $("#recorrente_fields").show();
            $("#valor_total_field").hide();
        } else if (tipo === "Valor total") {
            $("#recorrente_fields").hide();
            $("#valor_total_field").show();
        } else {
            // Se nenhum tipo for selecionado, oculta ambos
            $("#recorrente_fields").hide();
            $("#valor_total_field").hide();
        }
    });
});
