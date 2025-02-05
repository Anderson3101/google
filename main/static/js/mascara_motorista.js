$(function(){
    $('.cpf').mask('000.000.000-00', {reverse: true});
    $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('.number_with_ddd').mask('(00) 00000-0000');
    $('.phone_with_ddd').mask('(00) 0000-0000');
    $('.cep').mask('00000-000');
});
