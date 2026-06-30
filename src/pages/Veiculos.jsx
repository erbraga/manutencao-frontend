import {BarraSuperior, BarraSuperiorVeiculos, PrincipalVeiculos} from '../components/Tela';

export default function Veiculos() {

  return (
    <div>
      <BarraSuperior element = {<BarraSuperiorVeiculos />} />
      <PrincipalVeiculos />

    </div>
  );
}
