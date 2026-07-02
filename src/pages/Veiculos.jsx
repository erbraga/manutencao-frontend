import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import {InputTextoBotao, BarraSuperiorTexto} from '../components/Tela';
import {IconeEditar, IconeDeletar} from '../components/Icons'

export default function Veiculos() {

  return (
    <div>
      <VeiculosPrincipal />
    </div>
  );
}

function VeiculosPrincipal(){
  const [veiculos, setVeiculos] = useState(() => {
    const armazenados = localStorage.getItem("veiculos");
    return armazenados ? JSON.parse(armazenados) : [];
  });

  const [veiculoEditando, setVeiculoEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem("veiculos", JSON.stringify(veiculos));
  }, [veiculos]);

  const salvarVeiculo = (descricao) => {   
    if (veiculoEditando) {
      setVeiculos((prev) =>
        prev.map((v) =>
          v.id === veiculoEditando.id ? { ...v, descricao } : v
        )
      );
      setVeiculoEditando(null); // limpa edição
    } else {
      const maiorId = veiculos.length > 0 ? Math.max(...veiculos.map(v => v.id)) : 0;
      const novoVeiculo = { id: maiorId + 1, descricao };
      setVeiculos((prev) => [...prev, novoVeiculo]);
    }
  };

  const excluirVeiculo = (id) => {
    setVeiculos((prev) => prev.filter((veiculo) => veiculo.id !== id));
  };

  const editarVeiculo = (veiculo) => {
    setVeiculoEditando(veiculo); // envia id e descrição para o input
  };

  return(
    <section className='w-full'>

      <div className='flex flex-col flex-nowrap p-4 md:p-8 border 
      border-slate-400 rounded-3xl shadow-xl w-full m-auto my-4 
        bg-radial-[at_0%_100%] from-slate-300 to-slate-100'>

        <BarraSuperiorTexto titulo = 'Veículos'
          descricao = 'Mantenha o cadastro dos seus veículos com informações completas 
          como marca, modelo, ano de fabricação, cor, placa, dentre outras informações 
          que achar necessárias.'
        />

        <InputTextoBotao 
          name="veiculo" 
          label="Descrição do veículo"
          onSalvar={salvarVeiculo} 
          veiculoEditando={veiculoEditando}
          className='flex flex-col p-1 mb-2 mt-6 w-full cursor-pointer' 
        />
      </div>

      <VeiculosTabela 
        className='w-full' 
        veiculos={veiculos} 
        excluirVeiculo={excluirVeiculo} 
        editarVeiculo={editarVeiculo}
      />
    </section>
  )
}

function VeiculosTabela({ className, veiculos, excluirVeiculo, editarVeiculo }) {
  const navigate = useNavigate()
  return (
    <div className="md:bg-white md:border md:border-slate-400 md:rounded-3xl md:shadow-xl">
      <ul className="md:m-4">
        {veiculos.map((veiculo) => (
          <li key={veiculo.id} className="flex flex-row justify-between mx-auto bg-white border 
              border-slate-400 md:border-0 rounded-2xl shadow-xl md:shadow-none p-4 
              mb-3 md:mb-0 md:border-b md:border-b-slate-300 md:rounded-b-none 
              items-center hover:bg-teal-200 md:hover:rounded-none">
              <div className='flex flex-col md:flex-row w-full'>
            <h3 className="text-xl w-full md:w-3/4 border-b border-b-slate-300 md:border-none">{veiculo.descricao}</h3>

            <div className="flex gap-2 mt-1 pt-1 col-span-2 menor:max-paisagem:col-span-3
              w-full md:w-1/4">
              <button className="w-full bg-lime-100 border border-lime-300
              font-medium py-2 rounded-xl text-xs justify-center"
              onClick={() => navigate(`/manutencao?veiculoId=${veiculo.id}`)}>
                Manutenções
              </button>
                <button className="w-full bg-blue-100 border  border-blue-300 
                font-medium py-2 rounded-xl text-xs justify-center"
                onClick={() => editarVeiculo(veiculo)} >
                  Editar
              </button>
              <button className="w-full bg-red-100 border border-red-300 
              font-medium py-2 rounded-xl text-xs justify-center"
              onClick={() => excluirVeiculo(veiculo.id)}>
                  Excluir
              </button>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

