function adicionarCarrinho(nome, preco) {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let produto = {
        nome: nome,
        preco: preco
    };

    carrinho.push(produto);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


function mostrarCarrinho() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let lista = document.getElementById("lista-carrinho");

    let total = 0;

    if (carrinho.length === 0) {

        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";

        document.getElementById("total").innerHTML = "Total: R$ 0,00";

        return;
    }


    lista.innerHTML = "";


    carrinho.forEach(function(produto) {

        lista.innerHTML += `
        
            <div class="produto-carrinho">

                <h3>${produto.nome}</h3>

                <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>

            </div>

        `;

        total += produto.preco;

    });


    document.getElementById("total").innerHTML =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}


function limparCarrinho() {

    localStorage.removeItem("carrinho");

    mostrarCarrinho();

}


function finalizarPedido() {
    window.location.href = "finalizarpedido.html";
}


if (document.getElementById("lista-carrinho")) {

    mostrarCarrinho();

}