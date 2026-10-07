// Standalone entry for rendering only the `som` composition, so a half-written file in
// another project's folder cannot block this one. Same id, component and format as Root.tsx.
import { Composition, registerRoot } from 'remotion';
import { THUMB } from '../shared/theme';
import { SomThumb } from './SomThumb';

const SomRoot: React.FC = () => <Composition id="som" component={SomThumb} {...THUMB} />;

registerRoot(SomRoot);
