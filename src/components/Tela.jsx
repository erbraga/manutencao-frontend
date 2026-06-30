import {Link} from 'react-router';

import { useState, useEffect } from 'react';

import {IconePrincipal, IconeHome, IconeItemManutencao, IconeVeiculos, 
  IconeModoAutomatico, IconeAtualizar, IconeEditar, IconeDeletar, 
  IconeSalvar} from './Icons';

import dados from '../dados.json';


export function BarraSuperior({element}){
  return(
    <section className='flex flex-col flex-nowrap p-4 md:p-8 border 
      border-slate-400 rounded-3xl shadow-xl w-full m-auto mt-4 
      bg-radial-[at_0%_100%] from-slate-300 to-slate-100'>
        <div className='flex flex-col md:flex-row'>
          {element}
        </div>
    </section>
  )
}

export function BarraSuperiorManutencao(){
  return(
    <div className='flex flex-col md:flex-row'>
      <div className='flex flex-col md:w-2/3'>
        {/* <div className='rounded-full border border-slate-400 w-fit px-3 py-1 
          italic bg-slate-100 text-cyan-400 text-xs md:text-lg font-semibold'>
          Histórico
        </div> */}
        <h2 className='text-xl md:text-6xl text-justify font-bold text-blue-700'>
          Manutenções</h2>
        <p>
          Visualize todas as manutenções registradas para cada veículo, assim como 
          data e quilometragem da próxima troca.
        </p>
      </div>
      <div className='flex flex-col flex-nowrap md:w-1/3 mt-4 md:mt-0'>
        <div className='paisagem:flex paisagem:flex-col '>
          <div className='w-full flex flex-col paisagem:w-1/2 md:hidden  '></div>
            <div className='flex flex-row flex-nowrap gap-2 paisagem:w-full my-2'>
              <InputData name = "data" label = "data" className='flex flex-col w-1/2' />
              <InputNumero name = "quilometragem" label = "quilometragem" 
                className='flex flex-col w-1/2' />
            </div>           
            <Link to= '/itens' className='w-full flex flex-row  text-white bg-sky-500 
              hover:bg-cyan-400 border border-sky-700 rounded-xl p-1 items-center 
              justify-center'>
              <IconeSalvar className="p-1 rounded-full cursor-pointer" />
                <span className=''>Cadastrar item de manutenção</span>
            </Link>
        </div>
      </div>
    </div>
  )
}

export function BarraSuperiorItens(){
  return(
    <div className='flex flex-col md:flex-row'>
      <div className='flex flex-col'>
        {/* <div className='rounded-full border border-slate-400 w-fit px-3 py-1 
          italic bg-slate-100 text-cyan-400 text-xs md:text-lg font-semibold'>
          Histórico
        </div> */}
        <h2 className='text-xl md:text-6xl text-justify font-bold text-blue-700'>
          Ítens de Manutenção</h2>
        <p>
          Mantenha o cadastro dos ítens de manutenção dos seus veículos informando 
          descrição do ítem, intervalo para próxima manutenção em quilômetros e meses, 
          assim como quilometragem e data da última manutenção.
        </p>
      </div>
    </div>
  )
} 

export function BarraSuperiorVeiculos(){
  return(
    <div className='flex flex-col md:flex-row'>
      <div className='flex flex-col'>
        {/* <div className='rounded-full border border-slate-400 w-fit px-3 py-1 
          italic bg-slate-100 text-cyan-400 text-xs md:text-lg font-semibold'>
          Histórico
        </div> */}
        <h2 className=' text-xl md:text-6xl text-justify font-bold text-blue-700'>
          Veículos</h2>
        <p>
          Mantenha o cadastro dos seus veículos com informações completas como marca, 
          modelo, ano de fabricação, cor, placa, dentre outras informações que achar 
          necessárias.
        </p>
      </div>
    </div>
  )
}

export function PrincipalManutencao(){
  return(
      <section className=''>
        <Selecao name="veiculo" label="Selecione o veículo" 
          className='flex flex-row p-1 mt-6 justify-end' />
        <ManutencaoTabelaDesktop className = 'hidden md:table w-full' />
        <ManutencaoTabelaMobile className = 'md:hidden paisagem:grid paisagem:grid-cols-2 paisagem:gap-2' />
      </section>
  )
}

function ManutencaoTabelaDesktop({className}){

  return(
    <div className={className}>
      <table className='mt-1 w-full border border-slate-400 rounded-3xl shadow-xl/10 bg-white 
        overflow-hidden border-separate border-spacing-0 
        [&_th]:p-2 [&_td]:p-2 [&_td]:border-b [&_td]:border-b-slate-300 
        [&_th]:border-b-2 [&_th]:border-b-slate-300'>
        <thead className=''>
          <tr className=''>
            <th rowSpan="2" className=''>Item de manutenção</th>
            <th colSpan="2" className=''>Trocar a cada</th>
            <th colSpan="2" className=''>Última troca</th>
            <th colSpan="2" className=''>Próxima troca</th>
            <th rowSpan="2" className=''>Confirmar<br></br>troca</th>
          </tr>
          <tr className=''>
              <th className=''>km</th>
              <th className=''>meses</th> 
              <th className=''>km</th>
              <th className=''>data</th>
              <th className=''>km</th>
              <th className=''>data</th>
          </tr>
        </thead>
        <tbody className=''>
          {dados.itens.map((item) => (
            <tr key={item.id} className='hover:bg-slate-200'>
              <td className=''>{item.descricao}</td>
                <td className='text-center'>{item.intervalo_km}</td>
                <td className='text-center'>{item.intervalo_prazo}</td>
                <td className='text-center'>{item.ultima_troca_km}</td>
                <td className='text-center'><FormatarDataBr data = {item.ultima_troca_data} /></td>
                <td className='text-center'>{item.ultima_troca_km + item.intervalo_km}</td>
                <td className='text-center'><SomarPrazo prazo = {item.intervalo_prazo} 
                  data = {item.ultima_troca_data}/></td>
                <td className='text-center'>
                  <Link to ="#">
                    <IconeAtualizar className="m-1 p-2 rounded-full text-white
                      hover:bg-sky-500 bg-cyan-400 cursor-pointer" />
                  </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ManutencaoTabelaMobile({className}){
  return(
    <div className='md:hidden paisagem:grid paisagem:grid-cols-2 paisagem:gap-2'>
      {dados.itens.map((item) => (
        <article key={item.id} className='w-full mx-auto bg-white border border-slate-400 
          rounded-3xl p-4 shadow-xl mb-4'>
          {/* CABEÇALHO DO CARD (Nome do item e status) */}
          <div className='flex justify-between items-start border-b border-slate-300 
            pb-1 mb-1'>
            <h3 className="text-xl font-bold">{item.descricao}</h3>
            {/* Badge de Status/Ações */}
            <span className="text-xs bg-amber-50 text-amber-600 font-semibold 
              px-2 py-1 rounded-full border border-amber-300">
              Atenção</span>
          </div >
          {/* CORPO DO CARD (Grade de Informações) */}
          <div className="grid grid-cols-2 menor:max-paisagem:grid-cols-3 gap-2 text-sm">
            {/* Bloco: Trocar a cada */}
            <div className="bg-slate-100 p-2 rounded-xl  border border-slate-300">
              <p className="text-xs font-bold text-slate-400 uppercase">Trocar a cada</p>
              <p className='font-semibold mt-0.5'>{item.intervalo_km} km </p>
              <p className='text-xs text-slate-500 font-medium'>ou {item.intervalo_prazo} meses </p>
            </div>
            {/* Bloco: Última Troca */}
            <div className="bg-slate-100 p-2 rounded-xl border border-slate-300">
              <p className="text-xs font-bold text-slate-400 uppercase">
                Última troca</p>
              <p className='font-semibold mt-0.5'>
                {item.ultima_troca_km} km</p>
              <p className='text-xs text-slate-500 font-medium'>
                em {item.ultima_troca_data}</p>
            </div>
            
            {/* Bloco: Próxima Troca (Em destaque ocupando as 2 colunas) */}
            <p className="bg-emerald-50 border border-emerald-200 p-3 
              rounded-xl text-xs font-bold uppercase text-emerald-700 
              text-center col-span-2 menor:max-paisagem:col-span-1">
              Próxima troca: {item.ultima_troca_km + item.intervalo_km} km ou 31/12/2026</p>
        
            {/* RODAPÉ DO CARD (Ações rápidas fáceis de tocar) */}
            <div className="flex gap-2 pt-1 col-span-2 menor:max-paisagem:col-span-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 border border-blue-800 text-white 
              font-medium py-2 rounded-xl text-xs justify-center">
                Confirmar Troca
              </button>
            </div>
          </div>  
        </article>
      ))}
    </div>
  )
}

export function PrincipalVeiculos(){
  const [veiculos, setVeiculos] = useState(dados.veiculos);
  const [veiculoEditando, setVeiculoEditando] = useState(null);

  const salvarVeiculo = (descricao) => {
    if (veiculoEditando) {
      // Atualiza veículo existente
      setVeiculos((prev) =>
        prev.map((v) =>
          v.id === veiculoEditando.id ? { ...v, descricao } : v
        )
      );
      setVeiculoEditando(null); // limpa edição
    } else {
      // Adiciona novo veículo
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
      <InputTextoBotao 
        name="veiculo" 
        label="Descrição do veículo"
        onSalvar={salvarVeiculo} 
        veiculoEditando={veiculoEditando}
        className='flex flex-col p-1 mb-2 mt-6 w-full cursor-pointer' 
      />
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
  return (
    <div className="md:bg-white md:border md:border-slate-400 md:rounded-3xl md:shadow-xl">
      <ul className="md:m-4">
        {veiculos.map((veiculo) => (
          <li key={veiculo.id} className="flex flex-row justify-between mx-auto bg-white border 
              border-slate-400 md:border-0 rounded-2xl shadow-xl md:shadow-none p-2 
              mb-3 md:mb-0 md:border-b md:border-b-slate-300 md:rounded-b-none 
              items-center hover:bg-slate-200 md:hover:rounded-none">
            <h3 className="text-xl">{veiculo.descricao}</h3>
            <div>
              <IconeEditar 
                className="m-1 p-1 rounded-full hover:bg-slate-300 cursor-pointer" 
                onClick={() => editarVeiculo(veiculo)} 
              />
              <IconeDeletar
                className="m-1 p-1 rounded-full hover:bg-slate-300 cursor-pointer"
                onClick={() => excluirVeiculo(veiculo.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InputTextoBotao({label, name, className, onSalvar, veiculoEditando}){
  const [valor, setValor] = useState("");

  useEffect(() => {
    if (veiculoEditando) {
      setValor(veiculoEditando.descricao); // mostra descrição no input
    }
  }, [veiculoEditando]);

  const handleSalvar = () => {
    if (valor.trim() !== "") {
      onSalvar(valor);
      setValor("");
    }
  };

  return(
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <div className='w-full flex flex-col md:flex-row gap-2'>
        <input  
          name={name} 
          id={name} 
          value={valor} 
          onChange={(e) => setValor(e.target.value)} 
          className='p-2 bg-white border border-slate-400 rounded-xl w-full md:w-3/4' 
        />
        <a 
          className='w-full flex flex-row md:w-1/4 text-white bg-sky-500 
            hover:bg-cyan-400 border border-sky-700 rounded-xl p-2 gap-2 items-center'
          onClick={handleSalvar}
        >
          <IconeSalvar className="cursor-pointer" />
          <span>{veiculoEditando ? "Atualizar" : "Salvar"}</span>
        </a>
      </div>  
    </div>
  );
}



export function PrincipalItens(){
  return(
      <section className='w-full'>
        <ItensTabela className = 'w-full' />
-     </section>
  )
}

function ItensTabela({className}){
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
          <a className='w-full flex flex-row md:w-1/4 text-white bg-sky-500 
            hover:bg-cyan-400 border border-sky-700 rounded-xl p-2 gap-2 items-center
            cursor-pointer'>
            <IconeSalvar className="cursor-pointer" />
              <span className=''>Salvar</span>
          </a>
          <a className='w-full flex flex-row md:w-1/4 text-white bg-red-500 
            hover:bg-red-400 border border-red-700 rounded-xl p-2 gap-2 items-center
            cursor-pointer'>
            <IconeDeletar className="cursor-pointer" />
              <span className=''>Excluir</span>
          </a>
      </div>
    </section>
    )
}


function Selecao({label, name, className}){
  return(
    <div className = {className}>
      <label htmlFor={name} className='p-1'>{label}</label>
      <select name={name} id={name} className='p-1 bg-white border border-slate-400 rounded-xl'>
        {dados.veiculos.map((item) => (
        <option key={item.id} value={item.id}>{item.descricao}</option>
        ))}
      </select>
    </div>
  );
}

function InputData({label, name, className}){
  return(
    <div className = {className}>
      <label htmlFor={name}>{label}</label>
      <input type="date" name={name} id={name} className='p-1 bg-white border 
      border-slate-400 rounded-xl w-full' />
    </div>

  );
}

function InputNumero({label, name, className}){
  return(
    <div className = {className}>
      <label htmlFor={name}>{label}</label>
      <input type="number" name={name} id={name} className='p-1 bg-white border 
        border-slate-400 rounded-xl w-full' />
    </div>
  );
}

function InputTexto({label, name, className}){
  return(
    <div className = {className}>
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} className='p-1 bg-white border 
        border-slate-400 rounded-xl w-full' />
    </div>
  );
}



function SomarPrazo({prazo, data}){
  const dataISO = new Date(data);
  const mes = dataISO.getMonth();
  const diasMes = mes == 1 ? 27 : 29;
  const mesCalculado = new Date(dataISO.setMonth(mes+Number(prazo)));
  const dataCalculada = new Date(mesCalculado.setDate(diasMes)).toISOString();
  //const dataFormatada = this.formatarDataBr(dataCalculada.slice(0,10));
  return (
    <span>
      <FormatarDataBr data={dataISO} />
    </span>
  );
}

function FormatarDataBr({data}) {
  const dataObj = (data instanceof Date) ? data : new Date(data);
  const dataFormatada = dataObj.toLocaleDateString("pt-BR");
  return (
    <span>
      {dataFormatada}
    </span>
  );
}

function ExcluirRegistro({tabela,id}){
  return(
    <div>

    </div>
  )


}