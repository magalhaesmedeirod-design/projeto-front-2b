'use client';
import { useEffect, useState } from "react";
import styles from './page.module.css';
import CardProd from '@/components/CardProd';

export default function Produtos() {

    const [prods, setProds] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [prodSelected, setProdSelected] = useState(null);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/produtos');
                console.log(response); // só para depuração
                if (!response.ok) {
                    throw new Error(`Erro ao buscar produtos ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data); // como salvar data no estado?
                setProds(data);
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchProdutos();
    }, []);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/categorias');
                console.log(response); // só para depuração
                if (!response.ok) {
                    throw new Error(`Erro ao buscar categorias ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data); // como salvar data no estado?
                setCategorias(data);
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchCategorias();
    }, []);

    const getNomeCategoria = (id_categoria) => {
        const categoria = categorias?.find(cat => cat.id === id_categoria);
        return categoria ? categoria.nome : 'Categoria Indisponível';
    }

const filtro =  prods.fiter( p => p.nome.includes(busca))

    return (
        <div>
            {
                prods === null ?
                    <p>Carregando lista de produtos...</p> :
                    <div>

                        <h2>Lista de produtos</h2>
                        {filtro && filtro.map(f => (
                          <P key={f.id}>{f.nome}</P>
                        ))}
                        <input type="text" placeholder="Faça sua busca" value={busca} onChange={(e) => {setBusca(e.target.value )}}/>

                        <table className={styles.tbl}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOME</th>
                                    <th>DESCRICAO</th>
                                    <th>CATEGORIA</th>
                                    <th>ESTOQUE</th>
                                    <th>PRECO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    prods.map((prod) => (
                                        <tr key={prod.id} onClick={() => setProdSelected(prod)}>
                                            <td>{prod.id}</td>
                                            <td>{prod.nome}</td>
                                            <td>{prod.descricao}</td>
                                            <td>{getNomeCategoria(prod.categoria_id)}</td>
                                            <td>{prod.quantidade_estoque}</td>
                                            <td>{prod.preco}</td>
                                        </tr>
                                        // exiba todos os dados retornados pela API em uma tabela
                                    ))
                                }
                            </tbody>
                        </table>
                        {prodSelected && <CardProd produto={prodSelected} />}

                        {/* 
                        categoria_id: 1
                        descricao: "Notebook com processador Intel Core i5 e 8 GB de RAM."
                        id: 1
                        nome: "boneco de 67"
                        preco: "3299.90"
                        quantidade_estoque: 11 */}
                    </div>
            }
        </div>
    )
}