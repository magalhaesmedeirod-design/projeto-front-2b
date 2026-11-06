export default function CardProd({produto}) {
    console.log(produto);
    return (
        <div>
            <h2>id {produto.id} - nome {produto.nome}</h2>
            <p>descrição</p>
            <p>estoque</p>
            <p>preço</p>
        </div>
    )
}