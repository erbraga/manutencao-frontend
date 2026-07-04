import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import {IconeAtualizar, IconeEditar, IconeDeletar, IconeMais, IconeVoltar
       } from '../components/Icons';
import {InputData, InputNumero, FormatarDataBr, SomarPrazo, BlocoVertical, 
      BlocoHorizontal, BarraSuperiorTitulo, BotaoFlutuanteMobile, Modal
      } from '../components/Tela';

export function Manutencoes(){
  const [modalAberto, setModalAberto] = useState(false);
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

  const [dataAtualizacao, setDataAtualizacao] = useState("");
  const [kmAtualizacao, setKmAtualizacao] = useState("");

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

  const atualizarItem = (id) => {
    
    const itemAtual = itens.find(item => Number(item.id) === Number(id));
    const dataAtualizacaoItemAtual = itemAtual.ultima_troca_data;
    const kmAtualizacaoItemAtual = itemAtual.ultima_troca_km;
    const hoje = new Date().toISOString().split("T")[0];
    // Validação básica para garantir que o usuário preencheu os campos do topo
    if ((!dataAtualizacao || !kmAtualizacao) ||
        (dataAtualizacao < dataAtualizacaoItemAtual) ||
        (kmAtualizacao < kmAtualizacaoItemAtual) ||
        (dataAtualizacao > hoje)
      ) {
      //alert("Por favor, preencha os campos de Data e Quilometragem no topo para atualizar a última troca.");
      setModalAberto(true);
      return;
    }

    // Mapeia os itens e altera apenas o item que corresponde ao ID clicado
    const itensAtualizados = itens.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ultima_troca_data: dataAtualizacao,
          ultima_troca_km: Number(kmAtualizacao)
        };
      }
      return item;
    });

    // Atualiza o estado da tela e salva no localStorage
    setItens(itensAtualizados);
    localStorage.setItem("itensManutencao", JSON.stringify(itensAtualizados));
  };

  const voltarVeiculos = () => {
    navigate(`/veiculos`);
  }

  const somarPrazo = (prazo, data) => {
    if (!data || typeof data !== 'string') {
        return ""; // Ou retorne "" se preferir deixar em branco
      }

    let dataISO = new Date(data + "T00:00:00");
    dataISO.setMonth(dataISO.getMonth() + Number(prazo));
    const dataCalculadaString = dataISO.toISOString().split('T')[0];
    return dataCalculadaString;
  }

  const compararDatas = (data1, data2) => {
    data1 = new Date(data1 + "T00:00:00");
    data2 = new Date(data2 + "T00:00:00");
      return (data1 < data2)
  }




  

  return(
    <section className=''>
      <div className='flex flex-col flex-nowrap w-full my-4 p-4 md:p-8 border 
        border-slate-400 rounded-3xl shadow-xl   
        bg-radial-[at_0%_100%] from-slate-300 to-slate-100'>
        <div className='flex flex-row'>
          <div className='flex flex-row w-3/4'>
          <BarraSuperiorTitulo 
            veiculo = {veiculos.find(v => v.id === Number(veiculoSelecionado))?.descricao}/>
          </div>
          <nav className='fixed right-8 bottom-8 md:relative md:right-0 md:bottom-0 
            flex flex-row justify-end items-center gap-2 md:w-1/4'>
            <BotaoFlutuanteMobile cores="bg-sky-500 hover:bg-sky-300 border-sky-700 text-white"
              onClick={voltarVeiculos} icone = {<IconeVoltar className="cursor-pointer " />}
              legenda = "Voltar"/>

            <BotaoFlutuanteMobile cores="bg-red-500 hover:bg-red-300 border-red-700 text-white"
              onClick={handleNovoItem} 
              icone = {<IconeMais className="cursor-pointer "/>}
              legenda = "Novo item"/>

          </nav>
        </div>
        
        <div className='flex flex-col md:flex-row gap-2 py-2 w-full items-end'>
          <div className='flex flex-row gap-2 w-full md:w-1/3 items-end'>
            < InputData label = "Data" name = "data"  
              className="flex flex-col w-1/2"
              onChange={(e) => setDataAtualizacao(e.target.value)}/>
            < InputNumero label = "Quilometragem" name = "data" 
              className="flex flex-col w-1/2"
              onChange={(e) => setKmAtualizacao(e.target.value)}/>
          </div>
        </div>

      </div>

      <Modal 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        titulo = {<>Não é possível atualizar o histórico de manutenções.</>}
        texto = {<TextoModal/>}
        />      

      {/* Tabela Desktop */}
      <ManutencoesTabelaDesktop 
        className='hidden md:table w-full' 
        itens={itensFiltrados}
        kmAtualizacao={kmAtualizacao}
        dataAtualizacao={dataAtualizacao}
        atualizarItem = {atualizarItem}
        editarItem={editarItem}
        excluirItem={excluirItem}
        somarPrazo = {somarPrazo}
        compararDatas = {compararDatas}
      />

      {/* Cards Mobile */}
      <ManutencoesTabelaMobile 
        className='md:hidden paisagem:grid paisagem:grid-cols-2 paisagem:gap-2' 
        itens={itensFiltrados}
        kmAtualizacao={kmAtualizacao}
        dataAtualizacao={dataAtualizacao}
        atualizarItem = {atualizarItem}
        editarItem={editarItem}
        excluirItem={excluirItem}
        somarPrazo = {somarPrazo}
        compararDatas = {compararDatas}
      />
    </section>
  )
}

function ManutencoesTabelaDesktop({className, itens, atualizarItem, kmAtualizacao, 
  dataAtualizacao, editarItem, excluirItem, somarPrazo, compararDatas}){

  return(
    <div className={className}>
      <table className='mt-1 w-full border border-slate-400 rounded-3xl shadow-xl/10 
        bg-white overflow-hidden border-separate border-spacing-0 
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
          {itens.map((item) => {
          const proximaKm = Number(item.ultima_troca_km) + Number(item.intervalo_km);
          const kmVenceu = kmAtualizacao && proximaKm < kmAtualizacao;
          const proximaDataString = somarPrazo(item.intervalo_prazo, item.ultima_troca_data)
          const dataVenceu = compararDatas(proximaDataString, dataAtualizacao);        
          const deveAlertar = kmVenceu || dataVenceu;
        
          return(
              <tr key={item.id} className='hover:bg-teal-200'>
                <td className=''>{item.descricao}</td>
                  <td className='text-center'>{item.intervalo_km}</td>
                  <td className='text-center'>{item.intervalo_prazo}</td>
                  <td className='text-center'>{item.ultima_troca_km}</td>
                  <td className='text-center'><FormatarDataBr data = {item.ultima_troca_data} /></td>
                  <td className='text-center'>{item.ultima_troca_km + item.intervalo_km}</td>
                  <td className='text-center'>
                    <SomarPrazo 
                      prazo = {item.intervalo_prazo} 
                      data = {item.ultima_troca_data}/></td>
                  <td className='hidden'>{item.veiculoId}</td>

                  <td className='text-center w-40'>
                    <IconeAtualizar 
                      className="m-1 p-1 rounded-full hover:bg-teal-400 cursor-pointer
                      text-blue-600 hover:blue-700" 
                      onClick={() => atualizarItem(item.id)}
                    />
                    <IconeEditar 
                      className="m-1 p-1 rounded-full hover:bg-teal-400 cursor-pointer
                      text-lime-600 hover:text-lime-700" 
                      onClick={() => editarItem(item.id)}
                    />
                    <IconeDeletar
                      className="m-1 p-1 rounded-full hover:bg-teal-400 cursor-pointer
                      text-red-600 hover:red-700"
                      onClick={() => excluirItem(item.id)}
                    />
                    <div className='flex justify-center'>{deveAlertar && <Alerta />}</div>
                  </td>
              
              </tr>
        )})}
        </tbody>
      </table>
    </div>
  );
}

function ManutencoesTabelaMobile({className, itens, atualizarItem, kmAtualizacao, 
  dataAtualizacao, editarItem, excluirItem,somarPrazo, compararDatas}){
  return(
    <div className='md:hidden paisagem:grid paisagem:grid-cols-2 paisagem:gap-2'>
      {itens.map((item) => {
          const proximaKm = Number(item.ultima_troca_km) + Number(item.intervalo_km);
          const kmVenceu = kmAtualizacao && proximaKm < kmAtualizacao;
          const proximaDataString = somarPrazo(item.intervalo_prazo, item.ultima_troca_data)
          const dataVenceu = compararDatas(proximaDataString, dataAtualizacao);        
          const deveAlertar = kmVenceu || dataVenceu;           
          return(
        <article key={item.id} className='w-full mx-auto bg-white border border-slate-400 
          rounded-3xl p-4 shadow-xl mb-4'>
          {/* CABEÇALHO DO CARD (Nome do item e status) */}
          <div className='flex justify-between items-center border-b border-slate-300 
            pb-1 mb-1'>
            <h3 className="text-xl font-bold">{item.descricao}</h3>
            {/* Badge de Status/Ações */}
            <div className=''> {deveAlertar && <Alerta />}</div>
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
              texto = <>{proximaKm} km ou {<SomarPrazo 
              prazo = {item.intervalo_prazo} data = {item.ultima_troca_data}/>} 
              </> />
            {/* RODAPÉ DO CARD (Ações rápidas fáceis de tocar) */}
            <div className="flex gap-2 pt-1 col-span-2 menor:max-paisagem:col-span-3">
              <button className="w-full bg-blue-100 border border-blue-300
              font-medium py-2 rounded-xl text-xs justify-center"
              onClick={() => atualizarItem(item.id)}>
                Atualizar
              </button>
                <button className="w-full bg-lime-100 border  border-lime-300 
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
      )})}
    </div>
  )
}

function TextoModal() {
  return (
    <div className="">
      <span className="">Os campos de data e quilometragem precisam ser 
        preenchidos conforme as seguintes regras:</span>
      <ul className="list-disc list-outside pl-4">
        <li className='mt-2'>
          Utilize uma <strong>data igual ou inferior</strong> à data de hoje.
        </li>
        <li>
          Tanto a <strong>data</strong> quanto a <strong>quilometragem </strong> 
          devem ser informadas e posteriores à última data ou quilometragem cadastrada.
        </li>
      </ul>
    </div>
  );
}

function Alerta(){
  return(
    <div className='w-24 md:w-24 text-center bg-red-500 border 
      border-red-500 rounded-xl text-white font-bold'>
      Vencida
    </div>
  )
}