import Link from "next/link";
import works from "@/data/works.json";

type Work = (typeof works)[number];

function ArchiveSymbols({ rating, category, warnings, status }: { rating: string; category: string; warnings: string; status: string }) {
  const items = [
    { key: "rating", value: rating === "NR" ? "" : rating, label: ({ G: "General Audiences", T: "Teen", M: "Mature", E: "Explicit", NR: "Not Rated" } as Record<string, string>)[rating] },
    { key: "category", value: category === "none" ? "" : ({ "F/F": "♀", "F/M": "♀♂", "M/M": "♂", Gen: "◇", Multi: "✣", Other: "✧" } as Record<string, string>)[category] || "", label: category === "none" ? "Categoria não especificada" : category },
    { key: "warning", value: warnings === "none" ? "" : warnings === "choose_not_to_warn" ? "?" : "!", label: warnings === "none" ? "Nenhum aviso do arquivo indicado" : warnings === "choose_not_to_warn" ? "Autoria optou por não usar avisos" : "Aviso de conteúdo aplicável" },
    { key: "status", value: status === "complete" ? "✓" : "⊘", label: status === "complete" ? "Obra completa" : "Obra em andamento" }
  ];
  return <div className="archive-symbols" aria-label="Classificação da obra">
    {items.map(item => <span key={item.key} className={`archive-symbol symbol-${item.key} ${item.value ? "has-symbol" : "is-blank"}`} data-value={item.key === "category" ? category : undefined} title={item.label} aria-label={item.label}>{item.value}</span>)}
  </div>;
}

export default function Home() {
  const sortedWorks = [...works].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

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

      <section className="archive-intro">
        <div className="archive-intro-inner">
          <p className="eyebrow">ARQUIVO INDEPENDENTE · EST. 2026</p>
          <h1>Arquivo de Todos Nozes</h1>
          <p>Grandes histórias. Pequenas noções. Um espaço para guardar as obras que desafiam a literatura, a lógica e, ocasionalmente, a dignidade humana.</p>
        </div>
      </section>

      <section className="content-wrap" aria-labelledby="works-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A COLEÇÃO</p>
            <h2 id="works-heading">Obras</h2>
            <p className="section-intro">Todas as obras arquivadas, da mais recente às relíquias históricas.</p>
          </div>
          <span className="collection-count">{String(sortedWorks.length).padStart(3, "0")} OBRAS</span>
        </div>

        <div className="work-list">
          {sortedWorks.map((work: Work) => (
            <article className="work-entry" key={work.slug}>
              <div className="work-heading">
                <ArchiveSymbols rating={work.rating} category={work.category} warnings={work.warnings} status={work.status} />
                <h3 className="work-title">              <Link href={`/works/${work.slug}`}>{work.title}</Link></h3>
              </div>
              <p className="byline">por <span className="author-name">{work.author}</span></p>
              <dl className="work-details">
                <div><dt>Fandoms:</dt><dd>{work.fandoms.join(", ")}</dd></div>
                {work.relationships.length > 0 && <div><dt>Relacionamentos:</dt><dd>{work.relationships.join(", ")}</dd></div>}
                {work.characters.length > 0 && <div><dt>Personagens:</dt><dd>{work.characters.join(", ")}</dd></div>}
              </dl>
              <p className="summary">{work.summary}</p>
              <div className="tags" aria-label="Tags">
                {work.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="work-footer">
                <span>{work.chapters} capítulos</span>
                <span>Atualizada em {work.updatedAt}</span>
                <Link href={`/works/${work.slug}`}>Ler obra <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band" id="about">
        <p>“A literatura pode até ter limites. Nós não.”</p>
        <span>— Manifesto editorial do Arquivo de Todos Nozes</span>
      </section>
      <footer className="footer">
        <div className="footer-brand">Arquivo de Todos Nozes</div>
        <p>Feito com carinho e surto.</p>
        <small>Me interna por favor. Não afiliado ao AO3.</small>
      </footer>
    </main>
  );
}
