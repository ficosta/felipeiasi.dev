export default function Contact({
  data,
}: {
  data: { email: string; linkedin: string; github: string };
}) {
  return (
    <section id="contact" className="container">
      <h2 className="mb-6 text-2xl font-semibold">Contato</h2>
      <div className="flex flex-wrap items-center gap-4">
        <a className="underline" href={`mailto:${data.email}`}>
          Email
        </a>
        <a className="underline" href={data.linkedin} target="_blank">
          LinkedIn
        </a>
        <a className="underline" href={data.github} target="_blank">
          GitHub
        </a>
      </div>
    </section>
  );
}
