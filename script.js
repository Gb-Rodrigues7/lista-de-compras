// Array para armazenar os produtos inseridos
let produtos = [];
let total = 0;

// Elementos do DOM
const produtoInput = document.getElementById("produto");
const valorInput = document.getElementById("valor");
const tabela = document.getElementById("tabelaProdutos");
const tbody = tabela.querySelector("tbody");
const totalElement = document.getElementById("total");

// Função para adicionar um produto ao array e atualizar a tabela
document.getElementById("adicionar").addEventListener("click", function() {
    const nomeProduto = produtoInput.value;
    const valorProduto = parseFloat(valorInput.value);

    if (nomeProduto && !isNaN(valorProduto) && valorProduto > 0) {
        // Adiciona o produto ao array
        produtos.push({ nome: nomeProduto, valor: valorProduto });

        // Atualiza o valor total
        total += valorProduto;

        // Limpa os campos de entrada
        produtoInput.value = '';
        valorInput.value = '';

    } else {
        alert("Por favor, insira um nome de produto válido e um valor numérico positivo.");
    }
});

// Função para exibir a tabela com os produtos
document.getElementById("visualizarTabela").addEventListener("click", function() {
    // Limpa a tabela
    tbody.innerHTML = '';

    // Adiciona cada produto na tabela
    produtos.forEach(function(produto, index) {
        let linha = document.createElement("tr");
        let nomeCell = document.createElement("td");
        let valorCell = document.createElement("td");
        let removerCell = document.createElement("td");
        let removerBtn = document.createElement("button");

        nomeCell.textContent = produto.nome;
        valorCell.textContent = "R$ " + produto.valor.toFixed(2);

        // Configura o botão de remover
        removerBtn.textContent = "Remover";
        removerBtn.classList.add("btn-remover");
        removerBtn.addEventListener("click", function() {
            if (confirm("Tem certeza que deseja remover este produto?")) {
                removerProduto(index);
            }
        });

        removerCell.appendChild(removerBtn);
        linha.appendChild(nomeCell);
        linha.appendChild(valorCell);
        linha.appendChild(removerCell);
        tbody.appendChild(linha);
    });

    // Atualiza o total no rodapé da tabela
    totalElement.textContent = "R$ " + total.toFixed(2);

    // Exibe a tabela se houver produtos
    if (produtos.length > 0) {
        tabela.classList.remove("oculto");
    }
});

// Função para remover um produto do array e atualizar a tabela e o total
function removerProduto(index) {
    // Subtrai o valor do produto do total
    total -= produtos[index].valor;

    // Remove o produto do array
    produtos.splice(index, 1);

    // Atualiza a tabela e o total
    document.getElementById("visualizarTabela").click();  // Recarrega a tabela
}

// Função para imprimir a tabela
document.getElementById("imprimirTabela").addEventListener("click", function() {
    const tabelaHTML = tabela.outerHTML;
    const novaJanela = window.open('', '', 'height=500,width=800');
    novaJanela.document.write('<html><head><title>Imprimir Tabela</title>');
    novaJanela.document.write('<style>table { border-collapse: collapse; width: 100%; } th, td { padding: 10px; border: 1px solid #ccc; } th { background-color: #4A90E2; color: white; }</style>');
    novaJanela.document.write('</head><body>');
    novaJanela.document.write(tabelaHTML);
    novaJanela.document.write('</body></html>');
    novaJanela.document.close();
    novaJanela.print();
});
