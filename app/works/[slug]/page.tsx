import Link from "next/link";
import { notFound } from "next/navigation";
import works from "@/data/works.json";

function ArchiveSymbols({ rating, category, warnings, status }: { rating: string; category: string; warnings: string; status: string }) {
  const items = [
    { key: "rating", value: rating === "NR" ? "" : rating, label: ({ G: "General Audiences", T: "Teen", M: "Mature", E: "Explicit", NR: "Not Rated" } as Record<string, string>)[rating] },
    { key: "category", value: category === "none" ? "" : ({ "F/F": "♀", "F/M": "♀♂", "M/M": "♂", Gen: "◇", Multi: "✣", Other: "✧" } as Record<string, string>)[category] || "", label: category === "none" ? "Categoria não especificada" : category },
    { key: "warning", value: warnings === "none" ? "" : warnings === "choose_not_to_warn" ? "?" : "!", label: warnings === "none" ? "Nenhum aviso do arquivo indicado" : warnings === "choose_not_to_warn" ? "Autoria optou por não usar avisos" : "Aviso de conteúdo aplicável" },
    { key: "status", value: status === "complete" ? "✓" : "⊘", label: status === "complete" ? "Obra completa" : "Obra em andamento" }
  ];
  return <div className="archive-symbols" aria-label="Classificação da obra">
    {items.map(item => <span key={item.key} className={`archive-symbol symbol-${item.key} ${item.value ? "has-symbol" : "is-blank"}`} title={item.label} aria-label={item.label}>{item.value}</span>)}
  </div>;
}



type Work = Omit<(typeof works)[number], "wordCount"> & { wordCount: number | null };

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const work = (works as Work[]).find((item) => item.slug === params.slug);

  if (!work) notFound();

  return (
    <main className="archive-shell">
      <div className="utility-bar">
        <div className="utility-inner">
          <span>Um arquivo para preservar aquilo que não precisaria ser preservado.</span>
          <span>Feito de nozes pra nozes</span>
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/">
            <span className="brand-mark">ATN</span>
            <span><strong>Arquivo de Todos Nozes</strong><small>um arquivo de fanfics questionáveis</small></span>
          </Link>
          <nav className="main-nav" aria-label="Navegação principal">
            <Link className="active" href="/">Obras</Link>
            <a href="/#about">Sobre o arquivo</a>
          </nav>
        </div>
      </header>

      <article className="reader-wrap">
        <Link className="back-link" href="/">← Voltar para todas as obras</Link>
        <header className="reader-header">
          <div className="reader-title-row">
            <ArchiveSymbols rating={work.rating} category={work.category} warnings={work.warnings} status={work.status} />
            <h1>{work.title}</h1>
          </div>
          <p className="byline">por <span className="author-name">{work.author}</span></p>
          <p className="reader-summary">{work.summary}</p>
        </header>

        <dl className="reader-meta">
          <div><dt>Fandoms</dt><dd>{work.fandoms.join(", ")}</dd></div>
          <div><dt>Relacionamentos</dt><dd>{work.relationships.length ? work.relationships.join(", ") : "Nenhum relacionamento especificado"}</dd></div>
          <div><dt>Personagens</dt><dd>{work.characters.length ? work.characters.join(", ") : "Não especificados"}</dd></div>
          <div><dt>Capítulos</dt><dd>{work.chapters}</dd></div>
          <div><dt>Última atualização</dt><dd>{work.updatedAt}</dd></div>
          {work.wordCount !== null && <div><dt>Palavras</dt><dd>{work.wordCount.toLocaleString("pt-BR")}</dd></div>}
        </dl>

        <section className="reader-tags">
          <h2>Tags</h2>
          <div className="tags">{work.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </section>

        <section className="chapter" aria-label="Texto da obra">
          <h2 className="chapter-heading">Texto da obra</h2>
          {work.content.length > 0 ? (
            <div className="chapter-text">
              {work.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          ) : (
            <p className="empty-story">O registro desta obra já está no arquivo, mas o texto ainda não foi inserido. O conteúdo pode ser adicionado ao campo <code>content</code> em <code>data/works.json</code>.</p>
          )}
        </section>
      </article>

      <footer className="footer">
        <div className="footer-brand">Arquivo de Todos Nozes</div>
        <p>Feito com carinho e surto.</p>
        <small>Me interna por favor. Não afiliado ao AO3.</small>
      </footer>
    </main>
  );
}
