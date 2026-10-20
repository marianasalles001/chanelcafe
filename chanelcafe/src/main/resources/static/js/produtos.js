
document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript do cardápio carregado!");

    // Trocar as categorias
    const botoes = document.querySelectorAll(".categoria");
    const secoes = document.querySelectorAll(".secao-produtos");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {

            botoes.forEach(function (item) {
                item.classList.remove("ativa");
            });

            secoes.forEach(function (secao) {
                secao.classList.remove("ativa");
            });

            botao.classList.add("ativa");

            const id = botao.getAttribute("data-categoria");
            const secaoEscolhida = document.getElementById(id);

            if (secaoEscolhida) {
                secaoEscolhida.classList.add("ativa");
            }
        });
    });

    // Adicionar produtos ao carrinho
    document.querySelectorAll(".botao-carrinho").forEach(function (botao) {

        botao.addEventListener("click", function () {

            const nome = botao.dataset.nome;
            const preco = Number(botao.dataset.preco);

            let carrinho = [];

            try {
                carrinho = JSON.parse(
                    localStorage.getItem("carrinho")
                ) || [];
            } catch (erro) {
                carrinho = [];
            }

            const existente = carrinho.find(function (produto) {
                return produto.nome === nome;
            });

            if (existente) {
                existente.quantidade = Number(existente.quantidade || 1) + 1;
            } else {
                carrinho.push({
                    nome: nome,
                    preco: preco,
                    quantidade: 1
                });
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));

const mensagem = document.getElementById("mensagem-carrinho");

if (mensagem) {
    mensagem.textContent = nome + " foi adicionado ao carrinho!";
    mensagem.classList.add("mensagem-visivel");

    clearTimeout(mensagem.timer);

    mensagem.timer = setTimeout(function () {
        mensagem.textContent = "";
        mensagem.classList.remove("mensagem-visivel");
    }, 3000);
}

            const contador = document.getElementById("quantidade-carrinho");

            if (contador) {
                contador.textContent = carrinho.reduce(function (total, produto) {
                    return total + Number(produto.quantidade || 1);
                }, 0);
            }
        });
    });

});
