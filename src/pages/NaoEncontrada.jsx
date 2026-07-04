import { useParams, useNavigate } from "react-router";

export default function PaginaNaoEncontrada(){
    const params = useParams();
    const urlInvalida = params["*"];
    const navigate = useNavigate();

    //alert (URLInvalida)
    
    return(

    <div className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-white border border-slate-400 
            rounded-3xl shadow-2xl p-6">
            {/* Cabeçalho do Modal */}
            {/* <div className="flex items-center gap-2 text-red-600">
                <span className="text-xl">⚠️</span>
                <h2 className="text-2xl font-bold">Operação Bloqueada</h2>
            </div> */}
            <p className="mt-6 mb-2 text-justify">Se você está nesta página é porque alguma coisa errada aconteceu 
                entre a sua cadeira e o monitor de vídeo. Não se desespere, você 
                digitou o endereço: </p>
            <span className="font-bold"> {urlInvalida} </span>
            <p className="mt-2 text-justify">Como você acabou chegando aqui, clique no botão abaixo para voltar 
                para a página inicial da aplicação.</p> 

            {/* Rodapé / Ações */}
            <div className='flex flex-row w-full justify-center p-4'>
                <div className="w-fit border-2 border-white rounded-xl">
                    <button
                    onClick={() => navigate(`/`)}
                    className="bg-red-500 border-2 border-red-700 hover:bg-red-700 py-2 px-5 
                    rounded-xl font-semibold text-sm text-white"
                    >Voltar  para a página inicial</button>
                </div>
            </div>
        </div>
    </div>
    );
}