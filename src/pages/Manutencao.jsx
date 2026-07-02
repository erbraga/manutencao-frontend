import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import {IconeAtualizar, IconeEditar, IconeDeletar} from '../components/Icons';
import {BarraSuperiorTexto, Selecao, InputData, InputNumero, FormatarDataBr, SomarPrazo,
  BlocoVertical, BlocoHorizontal
} from '../components/Tela';

export default function Itens() {

  return (
    <div>
      <ManutencaoPrincipal />
    </div>
  );
}

function ManutencaoPrincipal(){
  const [searchParams] = useSearchParams();
  const veiculoIdViaUrl = searchParams.get('veiculoId');
  const navigate = useNavigate();
  
  const [itens, setItens] = useState(() => {
    const armazenados = localStorage.getItem("itensManutencao");
    return armazenados ? JSON.parse(armazenados) : [];
  });

  const [veiculos, setVeiculos] = useState(() => {
    const armazenados = localStorage.getItem("veiculos");
    return armazenados ? JSON.parse(armazenados) : [];
  });

  const [veiculoSelecionado, setVeiculoSelecionado] = useState(veiculoIdViaUrl || "");

  useEffect(() => {
    setVeiculoSelecionado(veiculoIdViaUrl || "");
  }, [veiculoIdViaUrl]);


  const itensFiltrados = veiculoSelecionado 
    ? itens.filter(item => {
        // Garante que o ID do item exista antes de converter para String
        const itemVeiculoId = item.veiculoId ? String(item.veiculoId).trim() : "";
        const selecionadoId = String(veiculoSelecionado).trim();
        return itemVeiculoId === selecionadoId;
      })
    : itens;

  // const handleSelecionarVeiculo = (id) => {
  //   const veiculo = veiculos.find(v => v.id === Number(id));
  //   setVeiculoSelecionado(veiculo);
  // };

  const editarItem = (id) => {
    navigate(`/itens?veiculoId=${veiculoSelecionado}&itemId=${id}`);
  }

  const excluirItem = (id) => {
    const novos = itens.filter((i) => i.id !== id);
    setItens(novos);
    localStorage.setItem("itensManutencao", JSON.stringify(novos));
  };

  const handleNovoItem = () => {
    navigate(`/itens?veiculoId=${veiculoSelecionado}`);
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

        <div className='flex flex-col md:flex-row gap-2 mt-4 py-2 w-full items-end'>
          <h3 className="flex flex-col w-full md:w-2/3 bg-white rounded-xl border 
          border-slate-400 h-8 p-1 font-bold text-center">
            {veiculos.find(v => v.id === Number(veiculoSelecionado))?.descricao}
          </h3>
          
          <div className='flex flex-row gap-2 w-full md:w-1/3 items-end'>
            < InputData label = "Data" name = "data" className="flex flex-col w-1/2"/>
            < InputNumero label = "Quilometragem" name = "data" 
              className="flex flex-col w-1/2"/>
            <button className='flex flex-col w-16 h-16 md:h-8 bg-red-400 rounded-full md:rounded-xl 
            text-white font-bold text-center
            fixed bottom-8 right-8 md:relative md:bottom-0 md:right-0'
            onClick={handleNovoItem}>
            +</button>
          </div>
        </div>
      </div>

      {/* Tabela Desktop */}
      <ManutencaoTabelaDesktop 
        className='hidden md:table w-full' 
        itens={itensFiltrados}
        editarItem={editarItem}
        excluirItem={excluirItem}
      />

      {/* Cards Mobile */}
      <ManutencaoTabelaMobile 
        className='md:hidden paisagem:grid paisagem:grid-cols-2 paisagem:gap-2' 
        itens={itensFiltrados}
        editarItem={editarItem}
        excluirItem={excluirItem}
      />
    </section>
  )
}
function ManutencaoTabelaDesktop({className, itens, editarItem, excluirItem}){

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
                <td className=''>{item.veiculoId}</td>
                <td className='text-center w-40'>
                  <IconeAtualizar 
                    className="m-1 p-1 rounded-full hover:bg-teal-400 cursor-pointer" 

                  />
                  <IconeEditar 
                    className="m-1 p-1 rounded-full hover:bg-teal-400 cursor-pointer" 
                    onClick={() => editarItem(item.id)}
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

function ManutencaoTabelaMobile({className, itens, editarItem, excluirItem}){
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
                font-medium py-2 rounded-xl text-xs justify-center"
                onClick={() => editarItem(item.id)}>
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

