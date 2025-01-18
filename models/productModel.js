class Product {
    constructor(id, nome, preco, descricao, data_criacao, data_modificacao, quantidade_estoque) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.data_criacao = data_criacao;
        this.data_modificacao = data_modificacao;
        this.quantidade_estoque = quantidade_estoque;
    }
}

module.exports = Product;
