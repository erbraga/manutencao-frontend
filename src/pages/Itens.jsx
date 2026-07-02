import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router'
import {IconeSalvar} from '../components/Icons'

import {BarraSuperiorTexto, Selecao, InputTexto, InputNumero, InputData} from '../components/Tela';

export default function Itens() {

  return (
    <div>
      <ItensPrincipal />
    </div>
  );
}

// Cadastro de Itens de manutenção
//########################################################################
function ItensPrincipal(){
  const [descricao, setDescricao] = useState("");
  const [intervaloKm, setIntervaloKm] = useState("");
  const [intervaloPrazo, setIntervaloPrazo] = useState("");
  const [ultimaTrocaKm, setUltimaTrocaKm] = useState("");
  const [ultimaTrocaData, setUltimaTrocaData] = useState("");

  const navigate = useNavigate();

  const [veiculos, setVeiculos] = useState(() => {
    const armazenados = localStorage.getItem("veiculos");
    return armazenados ? JSON.parse(armazenados) : [];
  });

  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

  const handleSelecionarVeiculo = (id) => {
    const veiculo = veiculos.find(v => v.id === Number(id));
    setVeiculoSelecionado(veiculo);
  };


  const handleSalvar = () => {
    const armazenados = localStorage.getItem("itensManutencao");
    const itens = armazenados ? JSON.parse(armazenados) : [];
    const maiorId = itens.length > 0 ? Math.max(...itens.map(i => i.id)) : 0;

    const novoItem = {
      id: maiorId + 1,
      descricao,
      intervalo_km: Number(intervaloKm),
      intervalo_prazo: Number(intervaloPrazo),
      ultima_troca_km: Number(ultimaTrocaKm),
      ultima_troca_data: ultimaTrocaData,
      veiculo: veiculoSelecionado
    };

    localStorage.setItem("itensManutencao", JSON.stringify([...itens, novoItem]));
    console.log(novoItem)

    navigate("/manutencao");
  };


  return(
      <section className='w-full'>
        <div className='flex flex-col flex-nowrap p-4 md:p-8 border 
        border-slate-400 rounded-3xl shadow-xl w-full m-auto my-4 
          bg-radial-[at_0%_100%] from-slate-300 to-slate-100'>

          <BarraSuperiorTexto titulo = 'Ítens de Manutenção'
            descricao = 'Mantenha o cadastro dos ítens de manutenção dos seus veículos informando 
            descrição do ítem, intervalo para próxima manutenção em quilômetros e meses, 
            assim como quilometragem e data da última manutenção.'
          />

            <Selecao label = "Veículo" name = "veiculo" className="flex flex-col 
            col-span-full mt-6"
            opcoes={veiculos.map(v => ({ valor: v.id, texto: v.descricao }))}
            value={veiculoSelecionado}
            onChange={setVeiculoSelecionado}
          />
        </div>

        <section className='grid grid-cols-1 md:grid-cols-2 bg-white border border-slate-400 rounded-3xl 
          shadow-xl mt-6 p-4 gap-3 md:gap-6'>
          <InputTexto label="Item de manutenção" className="md:col-span-2"
            value={descricao} onChange={(e) => setDescricao(e.target.value)}  />
          <InputNumero label="Quilometragem para troca" 
            value={intervaloKm} onChange={(e) => setIntervaloKm(e.target.value)} />
          <InputNumero label="Prazo para troca (meses)" 
            value={intervaloPrazo} onChange={(e) => setIntervaloPrazo(e.target.value)} />
          <InputNumero label="Última troca (km)" 
            value={ultimaTrocaKm} onChange={(e) => setUltimaTrocaKm(e.target.value)} />
          <InputData label="Última troca (data)" 
            value={ultimaTrocaData} onChange={(e) => setUltimaTrocaData(e.target.value)} />
          <div className=' flex flex-row gap-2 md:col-span-2 md:ml-12 md:justify-end md:mt-12'>
            <div onClick={handleSalvar} className='w-full flex flex-row md:w-1/4  text-white bg-sky-500 
              hover:bg-cyan-400 border border-sky-700 rounded-xl p-2 gap-2 items-center
              cursor-pointer'>
              <IconeSalvar className="cursor-pointer" onClick={handleSalvar}/>
                <span className=''>Salvar</span>
            </div>
          </div>
        </section>


-     </section>
  )
}

function ItensTabela({className}){
  const [descricao, setDescricao] = useState("");
  const [intervaloKm, setIntervaloKm] = useState("");
  const [IntervaloPrazo, setIntervaloPrazo] = useState("");
  const [ultimaTrocaKm, setUltimaTrocaKm] = useState("");
  const [ultimaTrocaData, setUltimaTrocaData] = useState("");

   const handleSalvar = () => {
    if (descricao.trim() !== "") {
      onSalvar({
        descricao,
        intervalo_km: Number(intervaloKm),
        intervalo_prazo: Number(IntervaloPrazo),
        ultima_troca_km: Number(ultimaTrocaKm),
        ultima_troca_data: ultimaTrocaData
      });
      // limpa os campos
      setDescricao("");
      setIntervaloKm("");
      setIntervaloPrazo("");
      setUltimaTrocaKm("");
      setUltimaTrocaData("");
    }
  }; 

  return(
    <section className='grid grid-cols-1 md:grid-cols-2 bg-white border border-slate-400 rounded-3xl 
      shadow-xl mt-6 p-4 gap-3 md:gap-6'>
      <InputTexto name = "item" label = "item de manutenção" 
        className='md:col-span-2' />
      <InputNumero name = "PrazoTrocaKm" label = "Quilometragem para troca" 
        className='' />
      <InputNumero name = "PrazoTrocaMeses" label = "Prazo para troca (em meses)" 
        className='' />
      <InputNumero name = "UltimaTrocaKm" label = "Quilometragem da última troca" 
        className='' />
      <InputData name = "UltimaTrocaData" label = "Data da última troca" 
        className='' />
      <div className=' flex flex-row gap-2 md:col-span-2 md:ml-12 md:justify-end md:mt-12'>
          <a className='w-full flex flex-row md:w-1/4  text-white bg-sky-500 
            hover:bg-cyan-400 border border-sky-700 rounded-xl p-2 gap-2 items-center
            cursor-pointer'>
            <IconeSalvar className="cursor-pointer" onClick={handleSalvar}/>
              <span className=''>Salvar</span>
          </a>
      </div>
    </section>
    )
}
