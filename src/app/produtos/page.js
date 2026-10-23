'use client';
import { useEffect, useState } from "react";

export default function Produtos() {
    const [prods, setprods] = useState(null);

    useEffect(() => {
        const fetchprodutos = async () => {
            try {
                const response = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/produtos');
                console.log(response);
                
                if (!response.ok) {
                    throw new Error(`Erro ao buscar produtos ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log(data); 
                
                setprods(data); 
            } catch (e) {
                console.log(e.message);
            }
        };

       
        fetchprodutos(); 
    }, []);

    return (
        <div>
            {
                prods === null ?
                    <p>Carregando lista de produtos...</p> :
                    <div>
                        <h2>Lista de produtos</h2>
                        {
                           
                            prods.map((prod) => (
                                <p key={prod.id}>{prod.nome}</p>
                            ))
                        }
                    </div>
            }
        </div>
    );
}
