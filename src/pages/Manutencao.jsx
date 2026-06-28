import {BarraSuperiorManutencao, PrincipalManutencao} from '../components/tela';

export default function Itens() {

  return (
    <div className='text-stone-700 text-sm md:text-base'>
      <div className='w-full p-2 md:min-w-2xl md:max-w-5xl 
        xl:min-w-6xl xl:max-w-7xl m-auto'>
          <BarraSuperiorManutencao />
          <PrincipalManutencao />
      </div> 
    
    </div>
  );
}
