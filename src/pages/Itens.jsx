import { useState, useEffect } from 'react';
import {useNavigate, useSearchParams} from 'react-router'
import {IconeSalvar} from '../components/Icons'

import {BarraSuperiorTexto, Selecao, InputTexto, InputNumero, InputData} from '../components/Tela';

export default function Itens() {

  return (
    <div>
      <ItensPrincipal />
    </div>
  );
}

function ItensPrincipal(){
  const [searchParams] = useSearchParams();
  const veiculoIdViaUrl = searchParams.get('veiculoId');
  const itemIdViaUrl = searchParams.get('itemId');
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [intervaloKm, setIntervaloKm] = useState("");
  const [intervaloPrazo, setIntervaloPrazo] = useState("");
  const [ultimaTrocaKm, setUltimaTrocaKm] = useState("");
  const [ultimaTrocaData, setUltimaTrocaData] = useState("");

  const [veiculos, setVeiculos] = useState(() => {
    const armazenados = localStorage.getItem("veiculos");
    return armazenados ? JSON.parse(armazenados) : [];
  });
  
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(veiculoIdViaUrl || "");

  useEffect(() => {
    if (itemIdViaUrl) {
      const armazenados = localStorage.getItem("itensManutencao");
      const itens = armazenados ? JSON.parse(armazenados) : [];
      const itemParaEditar = itens.find(item => 
        String(item.id).trim() === String(itemIdViaUrl).trim()
      );

      if (itemParaEditar) {
        setDescricao(itemParaEditar.descricao || "");
        setIntervaloKm(itemParaEditar.intervalo_km || "");
        setIntervaloPrazo(itemParaEditar.intervalo_prazo || "");
        setUltimaTrocaKm(itemParaEditar.ultima_troca_km || "");
        setUltimaTrocaData(itemParaEditar.ultima_troca_data || "");
        if (itemParaEditar.veiculoId) {
          setVeiculoSelecionado(String(itemParaEditar.veiculoId).trim());
        }
      }
    }
  }, [itemIdViaUrl]);

  useEffect(() => {
    if (veiculoIdViaUrl && !itemIdViaUrl) {
      setVeiculoSelecionado(veiculoIdViaUrl);
    }
  }, [veiculoIdViaUrl, itemIdViaUrl]);



  const handleVoltar = () => {
    navigate(`/manutencao?veiculoId=${veiculoSelecionado}`)
  };

const handleSalvar = () => {
  const armazenados = localStorage.getItem("itensManutencao");
  let itens = armazenados ? JSON.parse(armazenados) : [];

  if (itemIdViaUrl) {
    // Se existe itemId na URL, estamos EDITANDO
    itens = itens.map(item => {
      if (String(item.id) === String(itemIdViaUrl)) {
        return {
          ...item,
          descricao,
          intervalo_km: Number(intervaloKm),
          intervalo_prazo: Number(intervaloPrazo),
          ultima_troca_km: Number(ultimaTrocaKm),
          ultima_troca_data: ultimaTrocaData,
          veiculoId: veiculoSelecionado
        };
      }
      return item;
    });
  } else {
    // Se não existe itemId na URL, é um NOVO ITEM
    const maiorId = itens.length > 0 ? Math.max(...itens.map(i => i.id)) : 0;
    const novoItem = {
      id: maiorId + 1,
      descricao,
      intervalo_km: Number(intervaloKm),
      intervalo_prazo: Number(intervaloPrazo),
      ultima_troca_km: Number(ultimaTrocaKm),
      ultima_troca_data: ultimaTrocaData,
      veiculoId: veiculoSelecionado
    };
    itens.push(novoItem);
  }

  localStorage.setItem("itensManutencao", JSON.stringify(itens));
  navigate(`/manutencao?veiculoId=${veiculoSelecionado}`);
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
          <h3 className="flex flex-col w-full mt-4 bg-white rounded-xl border 
          border-slate-400 h-8 p-1 font-bold text-center">
            {veiculos.find(v => v.id === Number(veiculoSelecionado))?.descricao}
          </h3>
        </div>

        <ItensTabela 
          descricao={descricao}             setDescricao={setDescricao}
          intervaloKm={intervaloKm}         setIntervaloKm={setIntervaloKm}
          intervaloPrazo={intervaloPrazo}   setIntervaloPrazo={setIntervaloPrazo}
          ultimaTrocaKm={ultimaTrocaKm}     setUltimaTrocaKm={setUltimaTrocaKm}
          ultimaTrocaData={ultimaTrocaData} setUltimaTrocaData={setUltimaTrocaData}
          handleVoltar={handleVoltar}       handleSalvar={handleSalvar}
        />
     </section>
  )
}

function ItensTabela({descricao, setDescricao, intervaloKm, setIntervaloKm,
                      intervaloPrazo, setIntervaloPrazo, ultimaTrocaKm, 
                      setUltimaTrocaKm, ultimaTrocaData, setUltimaTrocaData,
                      handleVoltar, handleSalvar}){
  return(
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
      <div className=' flex flex-row gap-2 md:col-span-2 md:justify-end md:mt-12'>
        <div onClick={handleVoltar} className='w-full flex flex-row md:w-1/8 bg-red-100 
          hover:bg-red-300 border border-red-300 rounded-xl p-2 gap-2 items-center
          cursor-pointer'>               
          <IconeSalvar className="cursor-pointer"/>
            <span className=''>Cancelar</span>
        </div>
        <div onClick={handleSalvar} className='w-full flex flex-row md:w-1/8 bg-blue-100 
          hover:bg-blue-300 border border-blue-300 rounded-xl p-2 gap-2 items-center
          cursor-pointer'>               
          <IconeSalvar className="cursor-pointer"/>
          <span className=''>Salvar</span>
        </div>
      </div>
    </section>

  );
}

