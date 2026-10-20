// =========================
// MOSTRAR RESUMO DO PEDIDO
// =========================

function mostrarResumo() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let lista = document.getElementById("resumo-produtos");
    let totalElemento = document.getElementById("resumo-total");

    // Se não estiver na página de finalizar pedido
    if (!lista || !totalElemento) {
        return;
    }

    let total = 0;

    lista.innerHTML = "";

    if (carrinho.length === 0) {

        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";

        totalElemento.innerHTML = "Total: R$ 0,00";

        return;
    }

    carrinho.forEach(function(produto) {

        lista.innerHTML += `
            <div class="produto-resumo">

                <span>
                    ${produto.nome}
                </span>

                <span>
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </span>

            </div>
        `;

        total += produto.preco;
    });

    totalElemento.innerHTML =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}


// =========================
// FORMA DE PAGAMENTO
// =========================

function mostrarPagamento() {

    let pagamento = document.getElementById("pagamento");

    let dados = document.getElementById("dados-pagamento");

    // Se não estiver na página de finalizar pedido
    if (!pagamento || !dados) {
        return;
    }

    let tipoPagamento = pagamento.value;

    dados.innerHTML = "";


    // =========================
    // CARTÃO
    // =========================

    if (
        tipoPagamento === "Cartão de crédito" ||
        tipoPagamento === "Cartão de débito"
    ) {

        dados.innerHTML = `

            <div class="dados-cartao">

                <h3>Dados do Cartão</h3>

                <label for="numero-cartao">
                    Número do cartão
                </label>

                <input
                    type="text"
                    id="numero-cartao"
                    placeholder="0000 0000 0000 0000"
                    maxlength="19"
                >


                <label for="nome-cartao">
                    Nome no cartão
                </label>

                <input
                    type="text"
                    id="nome-cartao"
                    placeholder="Nome completo"
                >


                <div class="linha-cartao">

                    <div>

                        <label for="validade">
                            Validade
                        </label>

                        <input
                            type="text"
                            id="validade"
                            placeholder="MM/AA"
                            maxlength="5"
                        >

                    </div>


                    <div>

                        <label for="cvv">
                            CVV
                        </label>

                        <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            maxlength="3"
                        >

                    </div>

                </div>

            </div>

        `;
    }


    // =========================
    // PIX
    // =========================

    else if (tipoPagamento === "Pix") {

        let carrinho =
            JSON.parse(localStorage.getItem("carrinho")) || [];

        let total = 0;

        carrinho.forEach(function(produto) {

            total += produto.preco;

        });

        let valorPix =
            total.toFixed(2).replace(".", ",");


        dados.innerHTML = `

            <div class="dados-pix">

                <h3>Pagamento via Pix</h3>

                <p>
                    Escaneie o QR Code abaixo
                    para realizar o pagamento.
                </p>


                <div class="qr-code">

                    <img
                        src="../imagens/qrcode-pix.png"
                        alt="QR Code para pagamento via Pix"
                    >

                </div>


                <p>

                    <strong>Nome:</strong><br>

                    Chanel Café

                </p>


                <p>

                    <strong>Chave Pix:</strong><br>

                    contato@chanelcafe.com.br

                </p>


                <p>

                    <strong>Valor do pedido:</strong><br>

                    <span id="valor-pix">

                        R$ ${valorPix}

                    </span>

                </p>


                <p class="pix-aviso">

                    Após realizar o pagamento,
                    aguarde a confirmação do pedido.

                </p>

            </div>

        `;
    }


    // =========================
    // DINHEIRO
    // =========================

    else if (tipoPagamento === "Dinheiro") {

        dados.innerHTML = `

            <div class="dados-dinheiro">

                <h3>
                    Pagamento em dinheiro
                </h3>


                <label for="troco">
                    Precisa de troco?
                </label>


                <select id="troco">

                    <option value="nao">
                        Não
                    </option>

                    <option value="sim">
                        Sim
                    </option>

                </select>

            </div>

        `;
    }

}


// =========================
// CONFIRMAR PEDIDO
// =========================

function enviarPedido(event) {

    event.preventDefault();


    // Pega os produtos do carrinho

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];


    // Calcula o total

    let total = 0;

    carrinho.forEach(function(produto) {

        total += produto.preco;

    });


    // Pega os dados preenchidos

    let nome =
        document.getElementById("nome").value;

    let telefone =
        document.getElementById("telefone").value;

    let endereco =
        document.getElementById("endereco").value;

    let numero =
        document.getElementById("numero").value;

    let pagamento =
        document.getElementById("pagamento").value;


    // Cria o pedido

    let pedido = {

        nome: nome,

        telefone: telefone,

        endereco: endereco,

        numero: numero,

        pagamento: pagamento,

        produtos: carrinho,

        total: total

    };


    // Salva o pedido

    localStorage.setItem(
        "pedidoFinalizado",
        JSON.stringify(pedido)
    );


    // Limpa o carrinho

    localStorage.removeItem("carrinho");


    // Vai para a página de pedidos

    window.location.href = "pedidos.html";

}


// =========================
// MOSTRAR PEDIDO FINALIZADO
// =========================

function mostrarPedido() {

    let container =
        document.getElementById("pedido-container");


    // Se não estiver na página de pedidos

    if (!container) {
        return;
    }


    // Pega o pedido salvo

    let pedido =
        JSON.parse(
            localStorage.getItem("pedidoFinalizado")
        );


    // Se não existir pedido

    if (!pedido) {

        container.innerHTML = `

            <div class="pedido-vazio">

                <h3>
                    Nenhum pedido encontrado.
                </h3>

                <p>
                    Você ainda não realizou nenhum pedido.
                </p>

                <a href="produtos.html">
                    Ir para o Cardápio
                </a>

            </div>

        `;

        return;
    }


    // Cria a lista de produtos

    let produtos = "";


    pedido.produtos.forEach(function(produto) {

        produtos += `

            <div class="produto-pedido">

                <span>
                    ${produto.nome}
                </span>

                <span>
                    R$ ${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}
                </span>

            </div>

        `;

    });


    // Mostra todas as informações

    container.innerHTML = `

        <div class="pedido-confirmado">


            <!-- CONFIRMAÇÃO -->

            <div class="titulo-pedido">

                <h3>
                    Pedido realizado!
                </h3>

                <p>
                    Seu pedido foi registrado
                    com sucesso.
                </p>

            </div>


            <!-- DADOS DO CLIENTE -->

            <div class="informacoes-pedido">

                <h3>
                    Dados do Cliente
                </h3>


                <p>

                    <strong>Nome:</strong>

                    ${pedido.nome}

                </p>


                <p>

                    <strong>Telefone:</strong>

                    ${pedido.telefone}

                </p>


                <p>

                    <strong>Endereço:</strong>

                    ${pedido.endereco},
                    ${pedido.numero}

                </p>


                <p>

                    <strong>
                        Forma de pagamento:
                    </strong>

                    ${pedido.pagamento}

                </p>

            </div>


            <!-- PRODUTOS -->

            <div class="produtos-pedido">

                <h3>
                    Produtos do Pedido
                </h3>


                ${produtos}


                <div class="total-pedido">

                    <strong>
                        Total
                    </strong>


                    <strong>

                        R$
                        ${pedido.total
                            .toFixed(2)
                            .replace(".", ",")}

                    </strong>

                </div>

            </div>


            <!-- STATUS -->

            <div class="status-pedido">

                <h3>
                    Status do Pedido
                </h3>


                <p>
                    Pedido recebido pelo
                    Chanel Café.
                </p>


                <span>
                    EM PREPARAÇÃO
                </span>

            </div>


        </div>

    `;

}


// =========================
// EXECUTAR AS FUNÇÕES
// =========================

// Página finalizarpedido.html
mostrarResumo();


// Página pedidos.html
mostrarPedido();