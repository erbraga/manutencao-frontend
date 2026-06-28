import {BarraSuperior, BarraSuperiorManutencao, PrincipalManutencao} from '../components/tela';

export default function Itens() {

  return (
    <div>
      <BarraSuperior element = {<BarraSuperiorManutencao />} />
      <PrincipalManutencao />
    </div>
  );
}
