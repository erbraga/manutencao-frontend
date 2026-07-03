import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import {InputBotaoEditar, InputBotaoSalvar, BarraSuperiorTexto, BotaoHorizontal, 
  Modal} from '../components/Tela';
import {IconeEditar, IconeDeletar} from '../components/Icons'

export default function Veiculos() {

  return (
    <div>
      <VeiculosPrincipal />
    </div>
  );
}

function VeiculosPrincipal(){
  const [modalAberto, setModalAberto] = useState(false);
  const [veiculoBloqueadoNome, setVeiculoBloqueadoNome] = useState('');

  const [veiculos, setVeiculos] = useState(() => {
    const armazenados = localStorage.getItem("veiculos");
    return armazenados ? JSON.parse(armazenados) : [];
  });

  const [veiculoEditando, setVeiculoEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem("veiculos", JSON.stringify(veiculos));
  }, [veiculos]);

//################################################
  const [valor, setValor] = useState("");

  useEffect(() => {
    if (veiculoEditando) {
      setValor(veiculoEditando.descricao); // mostra descrição no input
    }
  }, [veiculoEditando]);

  const handleSalvar = () => {
    if (valor.trim() !== "") {
      salvarVeiculo(valor);
      setValor("");
    }
  };

const handleCancelar = () => {
    setValor("");
    setVeiculoEditando(null); // Ao cancelar, redefine e volta para o InputBotaoSalvar
  };
//################################################


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

  const excluirVeiculo = (id, descricao) => {
    // 1. Busca a lista de manutenções guardadas no localStorage
    const armazenadosManutencao = localStorage.getItem("itensManutencao");
    const manutencoes = armazenadosManutencao ? JSON.parse(armazenadosManutencao) : [];

    // 2. Verifica se existe alguma manutenção vinculada ao ID deste veículo
    // Certifique-se de que a propriedade na sua tabela de manutenção chama-se exatamente 'veiculoId'
    const possuiManutencao = manutencoes.some(m => Number(m.veiculoId) === Number(id));

    if (possuiManutencao) {
      setVeiculoBloqueadoNome(descricao);
      setModalAberto(true);
      return; // Bloqueia a exclusão interrompendo a função

    }

    // 3. Confirmação nativa simples antes de apagar permanentemente
    if (confirm("Deseja realmente excluir este veículo?")) {
      setVeiculos((prev) => prev.filter((veiculo) => veiculo.id !== id));
    }
  };

  const editarVeiculo = (veiculo) => {
    setVeiculoEditando(veiculo); // envia id e descrição para o input
  };

  

  return(
    <section className='w-full'>
      <div className='flex flex-col flex-nowrap p-4 md:p-8 border 
      border-slate-400 rounded-3xl shadow-xl w-full m-auto my-4 
        bg-radial-[at_0%_100%] from-slate-300 to-slate-100'>

      {/* Alteração dinâmica aqui baseado no estado veiculoEditando */}
      {veiculoEditando ? (
        <InputBotaoEditar 
          name="veiculo" 
          label="Edite o veículo selecionado"
          onClick={handleSalvar}
          onCancelar={handleCancelar}
          onChange={(e) => setValor(e.target.value)}
          veiculoEditando={veiculoEditando}
          value={valor} 
        />
      ) : (
        <InputBotaoSalvar 
          name="veiculo" 
          label="Cadastre um novo veículo aqui"
          onSalvar={salvarVeiculo}
          onClick={handleSalvar}
          onChange={(e) => setValor(e.target.value)}
          veiculoEditando={veiculoEditando}
          value = {valor} 
        />
      )}
      </div>

      <VeiculosTabela 
        className='w-full' 
        veiculos={veiculos} 
        excluirVeiculo={excluirVeiculo} 
        editarVeiculo={editarVeiculo}
      />

      {/* Renderização do Modal de Bloqueio */}
        <Modal 
          isOpen={modalAberto} 
          onClose={() => setModalAberto(false)} 
          veiculoNome={veiculoBloqueadoNome}
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
                <h3 className="text-xl w-full md:w-3/4 border-b border-b-slate-300 
                  md:border-none">{veiculo.descricao}
                </h3>
                <div className="flex gap-2 mt-1 pt-1 col-span-2 
                  menor:max-paisagem:col-span-3
                  w-full md:w-1/4">
                  <BotaoHorizontal 
                    onClick={() => navigate(`/manutencao?veiculoId=${veiculo.id}`)}
                    legenda = 'Manutenções' cores = 'bg-lime-100 border-lime-300'/>
                  <BotaoHorizontal 
                    onClick={() => editarVeiculo(veiculo)}
                    legenda = 'Editar' cores = 'bg-blue-100 border-blue-300'/>
                  <BotaoHorizontal 
                    onClick={() => excluirVeiculo(veiculo.id, veiculo.descricao)}
                    legenda = 'Excluir' cores = 'bg-red-100 border-red-300'/>
                </div>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


