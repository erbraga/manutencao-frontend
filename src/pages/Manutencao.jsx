import {BarraSuperior, BarraSuperiorManutencao, PrincipalManutencao} from '../components/Tela';

export default function Itens() {

  return (
    <div>
      <BarraSuperior element = {<BarraSuperiorManutencao />} />
      <PrincipalManutencao />
    </div>
  );
}
