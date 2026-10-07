import { AbsoluteFill } from 'remotion';
import { C, F, displayStyle, labelStyle } from '../shared/theme';
import { Browser, Crop, Phone } from './Frames';


export type FigureId =
  | 'flow'
  | 'realtime'
  | 'resultados'
  | 'map'
  | 'arch'
  | 'muncloseup'
  | 'muntap'
  | 'candidate'
  | 'mobilecand'
  | 'camara'
  | 'mobilemap';

const Label: React.FC<{ n: string; text: string; x: number; y: number }> = ({ n, text, x, y }) => (
  <div style={{ position: 'absolute', left: x, top: y, ...labelStyle, fontSize: 20 }}>
    <span style={{ color: C.fg }}>{n}</span>
    <span style={{ margin: '0 12px', color: C.line }}>/</span>
    {text}
  </div>
);

const Triptych: React.FC<{ shots: Array<[string, string]> }> = ({ shots }) => {
  const w = 380;
  const gap = 90;
  const x0 = (1600 - (w * 3 + gap * 2)) / 2;
  return (
    <>
      {shots.map(([src, text], i) => (
        <div key={src}>
          <Label n={`0${i + 1}`} text={text} x={x0 + i * (w + gap)} y={64} />
          <Phone src={src} width={w} x={x0 + i * (w + gap)} y={112} />
        </div>
      ))}
    </>
  );
};

const Flow: React.FC = () => (
  <Triptych
    shots={[
      ['mobile-02-selected.png', 'Pick races'],
      ['mobile-03-after.png', 'Get the alert'],
      ['mobile-04-results.png', 'Read the result'],
    ]}
  />
);

const CloseUp: React.FC<{ n: string; text: string; src: string; sx: number; sy: number; sw: number; sh: number }> = ({
  n,
  text,
  ...c
}) => {
  const width = 1456;
  const h = Math.round((c.sh * width) / c.sw);
  const top = Math.max(120, Math.round((1000 - h) / 2) + 24);
  return (
    <>
      <Label n={n} text={text} x={72} y={top - 52} />
      <Crop natW={3840} x={72} y={top} width={width} {...c} />
    </>
  );
};

const Map: React.FC = () => (
  <>
    <Browser src="desktop-05-mapa.png" width={1456} x={72} y={191} cropH={1150} />
  </>
);

type Box = { x: number; y: number; w: number; h: number; kicker: string; title: string; sub: string; live?: boolean };

const BoxView: React.FC<{ b: Box }> = ({ b }) => (
  <div
    style={{
      position: 'absolute',
      left: b.x,
      top: b.y,
      width: b.w,
      height: b.h,
      border: `1px solid #3A3A3D`,
      background: C.panel,
      boxSizing: 'border-box',
      padding: '18px 18px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...labelStyle, fontSize: 16 }}>
      {b.live && <span style={{ width: 10, height: 10, background: C.tally }} />}
      {b.kicker}
    </div>
    <div>
      <div style={{ ...displayStyle, fontSize: 46, color: C.fg }}>{b.title}</div>
      <div style={{ fontFamily: F.mono, fontSize: 15, color: C.dim, marginTop: 10, lineHeight: 1.35 }}>{b.sub}</div>
    </div>
  </div>
);

const Arch: React.FC = () => {
  const w = 250;
  const gap = 46;
  const col = (i: number) => 72 + i * (w + gap);
  const midY = 470;
  const h = 170;
  const main: Box[] = [
    { x: col(0), y: midY - h / 2, w, h, kicker: 'Source · live', title: 'TSE', sub: 'Official result files', live: true },
    { x: col(1), y: midY - h / 2, w, h, kicker: 'Follows', title: 'Mirror', sub: 'Copies each new file' },
    { x: col(2), y: midY - h / 2, w, h, kicker: 'Stores', title: 'Object storage', sub: 'Live + historical' },
    { x: col(3), y: midY - h / 2, w, h, kicker: 'Serves', title: 'Bunny CDN', sub: 'api.apuracao.setup.news' },
  ];
  const rx = col(4);
  const rw = 1600 - 72 - rx;
  const rh = 130;
  const readers: Box[] = [
    { x: rx, y: midY - rh / 2 - 180, w: rw, h: rh, kicker: 'Readers', title: 'App', sub: 'apuracao.setup.news' },
    { x: rx, y: midY - rh / 2, w: rw, h: rh, kicker: 'Newsroom', title: 'TV graphics', sub: 'CNN Brasil' },
    { x: rx, y: midY - rh / 2 + 180, w: rw, h: rh, kicker: 'Newsroom', title: 'Maps', sub: 'By municipality' },
  ];
  const hist: Box = {
    x: col(2),
    y: 700,
    w,
    h: 210,
    kicker: 'Beside live data',
    title: '2022 + geometry',
    sub: 'Results and shapes by municipality',
  };
  const stroke = C.dim;
  const arrow = (x1: number, y1: number, x2: number, y2: number, key: string) => (
    <g key={key}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={2} />
    </g>
  );
  const busX = col(3) + w + gap / 2;
  return (
    <>
      <div style={{ position: 'absolute', left: 72, top: 64, ...labelStyle, fontSize: 20 }}>Data path</div>
      <div style={{ position: 'absolute', left: 68, top: 104, ...displayStyle, fontSize: 92, color: C.fg }}>
        Read the TSE once. Serve everyone.
      </div>
      <svg width={1600} height={1000} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <marker id="ah" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L10,5 L0,10 z" fill={stroke} />
          </marker>
        </defs>
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={col(i) + w}
            y1={midY}
            x2={col(i + 1) - 2}
            y2={midY}
            stroke={stroke}
            strokeWidth={2}
            markerEnd="url(#ah)"
          />
        ))}
        {arrow(col(3) + w, midY, busX, midY, 'bus-in')}
        {arrow(busX, midY - 180, busX, midY + 180, 'bus')}
        {[-180, 0, 180].map((dy) => (
          <line key={dy} x1={busX} y1={midY + dy} x2={rx - 2} y2={midY + dy} stroke={stroke} strokeWidth={2} markerEnd="url(#ah)" />
        ))}
        <line x1={col(2) + w / 2} y1={hist.y} x2={col(2) + w / 2} y2={midY + h / 2 + 2} stroke={stroke} strokeWidth={2} markerEnd="url(#ah)" />
      </svg>
      {[...main, ...readers, hist].map((b) => (
        <BoxView key={b.title} b={b} />
      ))}
      <div style={{ position: 'absolute', left: rx, top: midY + 180 + rh / 2 + 30, width: rw, ...labelStyle, fontSize: 18, lineHeight: 1.5 }}>
        Every reader hits the cache. None of them hits the TSE.
      </div>
    </>
  );
};

export const Figure: React.FC<{ id: FigureId }> = ({ id }) => (
  <AbsoluteFill style={{ background: C.bg, color: C.fg }}>
    {id === 'flow' && <Flow />}
    {id === 'realtime' && (
      <>
        <Browser src="desktop-04-results.png" width={1376} x={112} y={44} />
      </>
    )}
    {id === 'resultados' && <Browser src="desktop-05-resultados.png" width={1376} x={112} y={44} />}
    {id === 'map' && <Map />}
    {id === 'arch' && <Arch />}
    {id === 'muncloseup' && (
      <CloseUp n="Mapa" text="Minas Gerais por município" src="w-mun-mg-2026.png" sx={660} sy={420} sw={2520} sh={1240} />
    )}
    {id === 'muntap' && <Browser src="d2-mun-mg-click.png" width={1376} x={112} y={44} />}
    {id === 'candidate' && <Browser src="d2-cand-lula-top.png" width={1376} x={112} y={44} />}
    {id === 'mobilecand' && (
      <Triptych
        shots={[
          ['m3-cand-1.png', 'Profile and result'],
          ['m3-cand-3.png', 'Electoral history'],
          ['m3-cand-5.png', 'Campaign accounts'],
        ]}
      />
    )}
    {id === 'camara' && (
      <CloseUp n="Congresso" text="Câmara dos Deputados" src="w-camara.png" sx={688} sy={372} sw={2464} sh={1380} />
    )}
    {id === 'mobilemap' && (
      <Triptych
        shots={[
          ['m3-map-br.png', 'Map by state'],
          ['m3-mun-mg.png', 'Map by municipality'],
          ['m3-camara.png', 'Congress'],
        ]}
      />
    )}
  </AbsoluteFill>
);
