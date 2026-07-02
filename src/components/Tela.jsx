import {Link} from 'react-router';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router'
import dados from '../dados.json';
import {IconePrincipal, IconeHome, IconeItemManutencao, IconeVeiculos, 
  IconeModoAutomatico, IconeAtualizar, IconeEditar, IconeDeletar, 
  IconeSalvar} from './Icons';

// Cadastro de Manutenções
//########################################################################
export function ManutencaoPrincipal(){
  const [itens, setItens] = useState(() => {
    const armazenados = localStorage.getItem("itensManutencao");
    return armazenados ? JSON.parse(armazenados) : [];
  });

  const [veiculos, setVeiculos] = useState(() => {
    const armazenados = localStorage.getItem("veiculos");
    return armazenados ? JSON.parse(armazenados) : [];
  });

  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

  const handleSelecionarVeiculo = (id) => {
    const veiculo = veiculos.find(v => v.id === Number(id));
    setVeiculoSelecionado(veiculo);
  };

  const excluirItem = (id) => {
    const novos = itens.filter((i) => i.id !== id);
    setItens(novos);
    localStorage.setItem("itensManutencao", JSON.stringify(novos));
  };

  return(
    <section className=''>
      <div className='flex flex-col flex-nowrap p-4 md:p-8 border 
        border-slate-400 rounded-3xl shadow-xl w-full m-auto my-4 
        bg-radial-[at_0%_100%] from-slate-300 to-slate-100'>
        <BarraSuperiorTexto titulo='Manutenções'
          descricao='Visualize todas as manutenções registradas para cada veículo, assim 
          como data e quilometragem da próxima troca.'
        />

        <div className='flex flex-col md:flex-row gap-2 mt-4 w-full'>
          <Selecao label = "Veículo" name = "veiculo" className="flex flex-col 
            col-span-full md:col-span-1 md:w-3/4"
            opcoes={veiculos.map(v => ({ valor: v.id, texto: v.descricao }))}
            value={veiculoSelecionado}
            onChange={setVeiculoSelecionado}
          />
          <div className='flex flex-row gap-2 md:w-1/4'>
            < InputData label = "Data" name = "data" className="flex flex-col w-1/2"/>
            < InputNumero label = "Quilometragem" name = "data" 
              className="flex flex-col w-1/2"/>
          </div>
        </div>
      </div>

      {/* Tabela Desktop */}
      <ManutencaoTabelaDesktop 
        className='hidden md:table w-full' 
        itens={itens} 
        excluirItem={excluirItem}
      />

      {/* Cards Mobile */}
      <ManutencaoTabelaMobile 
        className='md:hidden paisagem:grid paisagem:grid-cols-2 paisagem:gap-2' 
        itens={itens} 
        excluirItem={excluirItem}
      />
    </section>
  )
}
function ManutencaoTabelaDesktop({className, itens, excluirItem}){

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
            <th rowSpan="2" className=''></th>
            <th rowSpan="2" className=''></th>
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
          {itens.map((item) => (
            <tr key={item.id} className='hover:bg-teal-200'>
              <td className=''>{item.descricao}</td>
                <td className='text-center'>{item.intervalo_km}</td>
                <td className='text-center'>{item.intervalo_prazo}</td>
                <td className='text-center'>{item.ultima_troca_km}</td>
                <td className='text-center'><FormatarDataBr data = {item.ultima_troca_data} /></td>
                <td className='text-center'>{item.ultima_troca_km + item.intervalo_km}</td>
                <td className='text-center'><SomarPrazo prazo = {item.intervalo_prazo} 
                  data = {item.ultima_troca_data}/></td>
                <td className=''>{item.veiculo}</td>
                <td className='text-center w-40'>
                  <IconeAtualizar 
                    className="m-1 p-1 rounded-full hover:bg-teal-400 cursor-pointer" 

                  />
                  <IconeEditar 
                    className="m-1 p-1 rounded-full hover:bg-teal-400 cursor-pointer" 

                  />
                  <IconeDeletar
                    className="m-1 p-1 rounded-full hover:bg-teal-400 cursor-pointer"
                    onClick={() => excluirItem(item.id)}
                  />
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ManutencaoTabelaMobile({className, itens, excluirItem}){
  return(
    <div className='md:hidden paisagem:grid paisagem:grid-cols-2 paisagem:gap-2'>
      {itens.map((item) => (
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
            <BlocoVertical titulo = 'Trocar a cada' valor1 = {item.intervalo_km + ' km'} 
              valor2 = {'ou ' + item.intervalo_prazo + ' meses'} />            

            {/* Bloco: Última Troca */}
            <BlocoVertical titulo = 'Última troca' valor1 = {<>{item.ultima_troca_km} km</>} 
              valor2 = {<>em <FormatarDataBr data = {item.ultima_troca_data} /></>} />
            
            {/* Bloco: Próxima Troca (Em destaque ocupando as 2 colunas) */}
            <BlocoHorizontal titulo = 'Próxima troca: ' 
              texto = <>{item.ultima_troca_km + item.intervalo_km} km ou {<SomarPrazo 
              prazo = {item.intervalo_prazo} data = {item.ultima_troca_data}/>} 
              </> />
            {/* RODAPÉ DO CARD (Ações rápidas fáceis de tocar) */}
            <div className="flex gap-2 pt-1 col-span-2 menor:max-paisagem:col-span-3">
              <button className="w-full bg-lime-100 border border-lime-300
              font-medium py-2 rounded-xl text-xs justify-center">
                Confirmar
              </button>
                <button className="w-full bg-blue-100 border  border-blue-300 
                font-medium py-2 rounded-xl text-xs justify-center">
                  Editar
              </button>
              <button className="w-full bg-red-100 border border-red-300 
              font-medium py-2 rounded-xl text-xs justify-center"
              onClick={() => excluirItem(item.id)}>
                  Excluir
              </button>
            </div>
          </div>  
        </article>
      ))}
    </div>
  )
}


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

export function InputData({label, name, className, onChange, opcoes}){
  return(
    <div className = {className}>
      <label htmlFor={name}>{label}</label>
      <input type="date" name={name} id={name} className='p-1 bg-white border 
        border-slate-400 rounded-xl w-full h-8' 
      onChange={onChange}/>
    </div>

  );
}

export function InputNumero({label, name, className, onChange}){
  return(
    <div className = {className}>
      <label htmlFor={name}>{label}</label>
      <input type="number" name={name} id={name} className='p-1 bg-white border 
        border-slate-400 rounded-xl w-full h-8'
        onChange={onChange} />
    </div>
  );
}

export function InputTexto({label, name, className, onChange}){
  return(
    <div className = {className}>
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} className='p-1 bg-white border 
        border-slate-400 rounded-xl w-full'
        onChange={onChange} />
    </div>
  );
}

function SomarPrazo({prazo, data}){
  const dataISO = new Date(data);
  const mes = dataISO.getMonth();
  const diasMes = mes == 1 ? 27 : 29;
  const mesCalculado = new Date(dataISO.setMonth(mes+Number(prazo)));
  //const dataCalculada = new Date(mesCalculado.setDate(diasMes)).toISOString();
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

function BlocoVertical({ titulo, valor1, valor2}){
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

function BlocoHorizontal({ titulo, texto}){
  return (
    <p className="bg-slate-100 border border-slate-300 p-3 rounded-xl text-xs 
      font-bold uppercase text-center col-span-2 menor:max-paisagem:col-span-1">
        {titulo}
        {texto}
    </p>

  );
}

