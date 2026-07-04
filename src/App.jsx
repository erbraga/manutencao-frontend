
import {Outlet} from 'react-router'
import {IconePrincipal} from './components/Icons';

export default function App() {

  return (
    <div className='text-stone-700 text-sm md:text-base'>
      <Cabecalho />
  
      <main className='w-full p-2 md:min-w-2xl md:max-w-5xl xl:min-w-6xl xl:max-w-7xl 
        m-auto'>
        <Outlet />
      </main>
    
    </div>
  );
}

function Cabecalho(){
  return (
    <header className= 'w-full bg-radial-[at_0%_100%] from-slate-300 to-slate-100 p-1 border-b border-slate-400 shadow-xl sticky top-0 z-50'>
        <div className='w-full md:min-w-2xl md:max-w-5xl xl:min-w-6xl xl:max-w-7xl m-auto flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center'>
            <IconePrincipal className="m-1 p-2 md:p-3 border rounded-full bg-indigo-900 
              text-white" />
            <h1 className='p-1 font-bold text-sm md:text-2xl'>Manutenção de veículos</h1>
          </div>
        </div>
    </header>
  );
}
