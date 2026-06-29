import {BarraSuperior, BarraSuperiorItens, PrincipalItens} from '../components/tela';

export default function Itens() {

  return (
    <div>
      <BarraSuperior element = {<BarraSuperiorItens />} />
      <PrincipalItens />
    </div>
  );
}
