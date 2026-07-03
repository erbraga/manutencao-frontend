import {Link} from 'react-router';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router'
import dados from '../dados.json';
import {IconePrincipal, IconeHome, IconeItemManutencao, IconeVeiculos, 
  IconeModoAutomatico, IconeAtualizar, IconeEditar, IconeDeletar, IconeAlerta, 
  IconeSalvar} from './Icons';

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

export function InputBotaoEditar({label, name, className, onClick, onCancelar, onChange, 
  value, veiculoEditando}){
  return(
    <div className="flex flex-col p-1 mb-2 mt-6 w-full cursor-pointer">
      <label htmlFor={name}>{label}</label>
      <div className='w-full flex flex-col md:flex-row gap-2'>
        <input  
          name={name} 
          id={name} 
          value={value || ""} 
          onChange={onChange} 
          className='p-2 bg-white border border-slate-400 rounded-xl w-full md:w-3/4'/>
          <div className='flex flex-row w-full md:w-1/4 gap-2'>
            <div className = 'w-1/2 border-2 border-white rounded-xl'>
              <div 
                className='w-full flex flex-row text-white bg-red-500 
                  hover:bg-red-400 border-2 border-red-700 rounded-xl p-2 gap-2 items-center'
                onClick={onCancelar}>
                <IconeSalvar className="cursor-pointer" />
                <span>{"Cancelar"}</span>
              </div>
            </div>
            <div className = 'w-1/2 border-2 border-white rounded-xl'>
              <div 
                className='w-full flex flex-row text-white bg-sky-500 
                  hover:bg-cyan-400 border-2 border-sky-700 rounded-xl p-2 gap-2 items-center'
                onClick={onClick}>
                <IconeSalvar className="cursor-pointer" />
                <span>{"Atualizar"}</span>
              </div>
            </div>
          </div>
      </div>  
    </div>
  );
}

export function InputBotaoSalvar({label, name, className, onClick, onChange, value, 
  veiculoEditando}){
  return(
    <div className="flex flex-col p-1 mb-2 mt-6 w-full cursor-pointer">
      <label htmlFor={name}>{label}</label>
      <div className='w-full flex flex-col md:flex-row gap-2'>
        <input  
          name={name} 
          id={name} 
          value={value || ""} 
          onChange={onChange} 
          className='p-2 bg-white border border-slate-400 rounded-xl w-full md:w-3/4' 
        />
        <div className = 'md:w-1/4 border-2 border-white rounded-xl'>
          <div 
            className='w-full flex flex-row text-white bg-sky-500 
              hover:bg-cyan-400 border-2 border-sky-700 rounded-xl p-2 gap-2 items-center'
            onClick={onClick}
          >
            <IconeSalvar className="cursor-pointer" />
            <span>{"Salvar"}</span>
          </div>
        </div>
      </div>  
    </div>
  );
}


export function SomarPrazo({prazo, data}){
  const dataISO = new Date(data + "T00:00:00");
  dataISO.setMonth(dataISO.getMonth() + Number(prazo));
  const dataCalculadaString = dataISO.toISOString().split('T')[0];
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

export function BarraSuperiorTitulo({veiculo}){
  return(
      <div className='flex flex-col  w-full'>
        <span className=''>
          Veículo selecionado:</span>
        <h3 className=' border-slate-400 rounded-xl p-2 text-xl md:text-3xl text-justify font-bold text-blue-700'>
          {veiculo}</h3>
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

export function BotaoFlutuanteMobile({onClick, icone, legenda, cores}){
  const formatacao = `flex flex-row w-16 md:w-full h-16 p-3 rounded-full 
    md:rounded-xl justify-center border-3 md:border ` + cores;  
    return(
      <div className='border-3 border-white rounded-full md:rounded-xl md:w-1/2 
        cursor-pointer ' onClick={onClick}>
        <div className={formatacao}
            >
            {icone}
            <span className='hidden md:flex font-bold self-center'>{legenda}</span>
        </div>
      </div>

    );
}

export function BotaoHorizontal({onClick, legenda, cores}){
  const className = `w-full border font-medium py-2 rounded-xl text-xs 
    justify-center ` + cores 
  return (
    <button className={className}
      onClick={onClick}>
        {legenda}
    </button>
  );
}

export function Modal({ isOpen, onClose, veiculoNome }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-slate-400 
        rounded-3xl shadow-2xl p-6">
        {/* Cabeçalho do Modal */}
          <div className="flex items-center gap-2 text-red-600">
            <span className="text-xl">⚠️</span>
            <h2 className="text-2xl font-bold">Operação Bloqueada</h2>
          </div>

        {/* Conteúdo */}
        <div className=" text-slate-600">
          <p className="mb-6">
            Não é possível excluir o veículo <strong className="text-slate-900">
            {veiculoNome}</strong>.
          </p>
          <p className="bg-slate-100 border border-slate-300 p-3 rounded-xl">
            Existem itens de manutenção vinculados a este registro. Remova as manutenções 
            deste veículo antes de tentar excluí-lo.
          </p>
        </div>

        {/* Rodapé / Ações */}
        <div className='flex flex-row w-full justify-end p-4'>
          <div className="w-fit border-2 border-white rounded-xl">
            <button
              onClick={onClose}
              className="bg-red-500 border-2 border-red-700 hover:bg-red-700 py-2 px-5 
              rounded-xl font-semibold text-sm text-white"
            >ok</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export function ModalConfirmacao({ isOpen, onClose, onConfirm, veiculoNome }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/40 backdrop-blur-sm p-4 animate-fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-slate-400 
        rounded-3xl shadow-2xl p-6">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center gap-2 text-red-600 mb-4">
            {/* Ícone de aviso simplificado em SVG */}
          <IconeAlerta className="p-2 bg-red-100 rounded-full" />
          <h2 className="text-2xl font-bold">Confirmar Exclusão</h2>
        </div>
        {/* Conteúdo */}
        <p className="text-slate-600 mb-6 leading-relaxed">
          Tem certeza de que deseja excluir o veículo 
          <span className="font-semibold text-slate-900"> {veiculoNome}</span>
          ? Esta ação não poderá ser desfeita.
        </p>
        
        <div className="flex flex-row gap-3 justify-end w-full">
          <button 
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 
            border-2 border-slate-300 rounded-xl font-medium text-slate-700 
            w-1/2 md:w-auto"
            >Cancelar
          </button>
          <button 
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white 
            border-2 border-slate-300 rounded-xl font-medium w-1/2 md:w-auto"
            >Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
