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
      { prods === null ? (
        <p>Carregando lista de produtos...</p> 
      ) : (
        <div> 
          <h2>Lista de produtos</h2> 
          
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px' }}>ID</th>
                <th style={{ padding: '8px' }}>Nome</th>
              </tr>
            </thead>
            <tbody>
              { prods.map((prod) => (
                <tr key={prod.id}>
                  <td style={{ padding: '8px' }}>{prod.id}</td>
                  <td style={{ padding: '8px' }}>{prod.nome}</td>
                </tr>
              )) }
            </tbody>
          </table>

        </div> 
      )} 
    </div> 
  ); 
}
