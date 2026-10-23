'use client'; 
import { useEffect, useState } from "react"; 

export default function Produtos() { 
  const [prods, setprods] = useState(null); 

  useEffect(() => { 
    const fetchprodutos = async () => { 
      try { 
        const response = await fetch('https://ifro.edu.br'); 
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}> 
      { prods === null ? (
        <p>Carregando lista de produtos...</p> 
      ) : (



















        
        <div> 
          <h2 style={{ marginBottom: '15px' }}>Lista de produtos</h2> 
          
          {/* Tabela com colapso de bordas para as divisões ficarem finas e unidas */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ textAlign: 'left', backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', border: '1px solid #000000' }}>ID</th>
                <th style={{ padding: '10px', border: '1px solid #000000' }}>Nome</th>
                <th style={{ padding: '10px', border: '1px solid #000000' }}>Descrição</th>
                <th style={{ padding: '10px', border: '1px solid #000000' }}>Preço</th>
                <th style={{ padding: '10px', border: '1px solid #000000' }}>Estoque</th>
              </tr>
            </thead>
            
            <tbody>
              { prods.map((prod) => (
                <tr key={prod.id}>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{prod.id}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{prod.nome}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{prod.descricao}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>R$ {prod.preco}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{prod.quantidade_estoque}</td>
                </tr>
              )) }
            </tbody>
          </table>

        </div> 
      )} 
    </div> 
  ); 
}
