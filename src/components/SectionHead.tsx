interface SectionHeadProps {
  index: string;
  label: string;
  title: string;
  meta?: string;
  id: string;
}

export default function SectionHead({ index, label, title, meta, id }: SectionHeadProps) {
  return (
    <header className="grid grid-cols-1 gap-3 border-b border-line pb-5 mb-8 lg:grid-cols-[200px_1fr_auto] lg:items-end">
      <span className="label">
        {index} / {label}
      </span>
      <h2 id={id} className="display text-5xl lg:text-7xl">
        {title}
      </h2>
      {meta && <span className="label hidden lg:block">{meta}</span>}
    </header>
  );
}
