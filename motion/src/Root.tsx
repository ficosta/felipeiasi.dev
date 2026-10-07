import { Composition } from 'remotion';
import { THUMB } from './shared/theme';
import { OgrafThumb } from './ograf/OgrafThumb';
import { SomThumb } from './som/SomThumb';
import { ApuracaoThumb } from './apuracao/ApuracaoThumb';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ograf" component={OgrafThumb} {...THUMB} />
    <Composition id="som" component={SomThumb} {...THUMB} />
    <Composition id="apuracao" component={ApuracaoThumb} {...THUMB} />
  </>
);
