import {BarraSuperior, BarraSuperiorItens, PrincipalItens} from '../components/Tela';

export default function Itens() {

  return (
    <div>
      <BarraSuperior element = {<BarraSuperiorItens />} />
      <PrincipalItens />
    </div>
  );
}
