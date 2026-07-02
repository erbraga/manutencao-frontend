import {Link} from 'react-router';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router'
import dados from '../dados.json';
import {IconePrincipal, IconeHome, IconeItemManutencao, IconeVeiculos, 
  IconeModoAutomatico, IconeAtualizar, IconeEditar, IconeDeletar, 
  IconeSalvar} from './Icons';



export function InputTextoBotao({label, name, className, onSalvar, veiculoEditando}){
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


export function Selecao({label, value, name, className, opcoes, onChange}){
  return(
    <div className = {className}>
      <label htmlFor={name} className=''>{label}</label>
      <select name={name} id={name} className='p-1 bg-white border border-slate-400 
        rounded-xl w-full h-8'
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >

      <option value="">-- selecione --</option>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.texto}
          </option>
        ))}

        {/* {dados.veiculos.map((item) => (
        <option key={item.id} value={item.id}>{item.descricao}</option>
        ))} */}
      </select>
    </div>
  );
}

export function InputData({label, name, className, onChange, opcoes, value}){
  return(
    <div className = {className}>
      <label htmlFor={name}>{label}</label>
      <input type="date" name={name} id={name} value = {value}
        className='p-1 bg-white border border-slate-400 rounded-xl w-full h-8' 
      onChange={onChange}/>
    </div>

  );
}

export function InputNumero({label, name, className, onChange, value}){
  return(
    <div className = {className}>
      <label htmlFor={name}>{label}</label>
      <input type="number" name={name} id={name} value = {value}
      className='p-1 bg-white border border-slate-400 rounded-xl w-full h-8'
        onChange={onChange} />
    </div>
  );
}

export function InputTexto({label, name, className, onChange, value}){
  return(
    <div className = {className}>
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} value = {value}
        className='p-1 bg-white border border-slate-400 rounded-xl w-full'
        onChange={onChange} />
    </div>
  );
}

export function SomarPrazo({prazo, data}){
  const dataISO = new Date(data + "T00:00:00");
  dataISO.setMonth(dataISO.getMonth() + Number(prazo));
  const dataCalculadaString = dataISO.toISOString().split('T')[0];
  // const mes = dataISO.getMonth();
  // const diasMes = mes == 1 ? 27 : 29;
  // const mesCalculado = new Date(dataISO.setMonth(mes+Number(prazo)));
  //const dataCalculada = new Date(mesCalculado.setDate(diasMes)).toISOString();
  return (
    <span>
      <FormatarDataBr data={dataCalculadaString} />
    </span>
  );
}

export function FormatarDataBr({data}) {
  const dataObj = (data instanceof Date) ? data : new Date(data + "T00:00:00");
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

function ManutencaoBarraFiltros({className}){
  return (
    <div className={className}>
      <Selecao name="veiculo" label="Veículo" 
          className='flex flex-col w-full' />
      <div className='flex flex-row flex-nowrap gap-2 paisagem:w-full my-2'>
        <InputData name = "data" label = "data" 
          className='flex flex-col w-1/2' />
        <InputNumero name = "quilometragem" label = "quilometragem" 
          className='flex flex-col w-1/2' />
      </div> 
    </div>
  )
}

export function BarraSuperiorTexto({titulo, descricao}){
  return(
      <div className='flex flex-col md:flex-row'>
        <div className='flex flex-col'>
          <h2 className=' text-xl md:text-6xl text-justify font-bold text-blue-700'>
            {titulo}</h2>
          <p>{descricao}</p>
        </div>
      </div>
  )
}

export function BlocoVertical({ titulo, valor1, valor2}){
  return (
    <div className="bg-slate-100 border border-slate-300 p-2 rounded-xl  ">
      <p className="text-xs font-bold text-slate-400 uppercase">
        {titulo}</p>
      <p className='font-semibold mt-0.5'>
        {valor1}</p>
      <p className='text-xs text-slate-500 font-medium'>
        {valor2}</p>
    </div>

  );
}

export function BlocoHorizontal({ titulo, texto}){
  return (
    <p className="bg-slate-100 border border-slate-300 p-3 rounded-xl text-xs 
      font-bold uppercase text-center col-span-2 menor:max-paisagem:col-span-1">
        {titulo}
        {texto}
    </p>

  );
}

