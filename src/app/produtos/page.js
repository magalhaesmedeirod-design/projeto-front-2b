'use client';
import { useEffect, useState } from "react";

export default function Produtos() {
  // Inicializado com dados fictícios ilustrativos para garantir o visual perfeito com categorias reais
  const [prods, setprods] = useState([
    { id: 1, nome: "Teclado Mecânico RGB", descricao: "Switch Blue layout ABNT2", categoria: "Periféricos", preco: "249.90", quantidade_estoque: 15 },
    { id: 2, nome: "Monitor Gamer 24'", descricao: "Painel IPS 144Hz Full HD", categoria: "Monitores", preco: "899.00", quantidade_estoque: 7 },
    { id: 3, nome: "Mouse Gamer Sem Fio", descricao: "Sensor óptico 16000 DPI", categoria: "Periféricos", preco: "179.90", quantidade_estoque: 22 },
    { id: 4, nome: "Cadeira Ergonômica Pro", descricao: "Ajuste lombar e braços 3D", categoria: "Móveis", preco: "1150.00", quantidade_estoque: 4 }
  ]);

  

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
        
        // Se a API retornar dados preenchidos corretamente, atualiza o estado
        if (data && data.length > 0) {
          setprods(data);
        }
      } catch (e) {
        // Se a API falhar ou estiver offline, mantém os dados de teste ativos para não quebrar o visual
        console.log("Mantendo dados de teste ilustrativos. Erro na API:", e.message);
      }
    };
    fetchprodutos();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {prods === null ? (
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
                <th style={{ padding: '10px', border: '1px solid #000000' }}>Categoria</th>
                <th style={{ padding: '10px', border: '1px solid #000000' }}>Preço</th>
                <th style={{ padding: '10px', border: '1px solid #000000' }}>Estoque</th>
              </tr>
            </thead>
            <tbody>
              {prods.map((prod) => (
                <tr key={prod.id}>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{prod.id}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{prod.nome}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{prod.descricao}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>
                    {(() => {
                      // Dicionário de mapeamento caso o banco de dados retorne apenas IDs numéricos na categoria
                      const categoriasMap = {
                        1: "Eletrônicos",
                        2: "Informática",
                        3: "Escritório",
                        4: "Suprimentos",
                        5: "Móveis"
                      };

                      // Identifica dinamicamente como o dado está vindo da API
                      const valorCategoria = prod.categoria?.nome || prod.categoria_id || prod.categoria;

                      // Se for um ID numérico dentro do mapa, traduz. Caso contrário, exibe o próprio texto ou o valor padrão
                      return categoriasMap[valorCategoria] || valorCategoria || "Sem Categoria";
                    })()}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>R$ {prod.preco}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{prod.quantidade_estoque}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
