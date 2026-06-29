import {BarraSuperior, BarraSuperiorVeiculos, PrincipalVeiculos} from '../components/tela';

export default function Veiculos() {

  return (
    <div>
      <BarraSuperior element = {<BarraSuperiorVeiculos />} />
      <PrincipalVeiculos />

    </div>
  );
}
