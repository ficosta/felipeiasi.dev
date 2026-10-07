import { BusThumb } from './Bus';
import { SomFigure } from './Figure';

/**
 * Composition `som`. With no props it is the animated thumbnail (6 s loop).
 * With `--props='{"fig":"idea"}'` it renders one framed case-page illustration as a still.
 */
export const SomThumb: React.FC<{ fig?: string }> = ({ fig }) => (fig ? <SomFigure fig={fig} /> : <BusThumb />);
