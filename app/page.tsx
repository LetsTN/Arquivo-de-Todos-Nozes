"use client";

import { useMemo, useState } from "react";

type Work = {
  id: number;
  title: string;
  author: string;
  fandom: string;
  pairing: string;
  summary: string;
  tags: string[];
  rating: string;
  chapters: string;
  status: "Completa" | "Em andamento";
  kudos: number;
  date: string;
};

const works: Work[] = [
  {
    id: 1,
    title: "A Hextech Love Story",
    author: "Lets",
    fandom: "Arcane",
    pairing: "Caitlyn Kiramman / Vi",
    summary: "Vi trouxe um podrão. Caitlyn queria respostas. Piltover nunca mais foi a mesma.",
    tags: ["Lovers to Enemies", "Angst", "Dark Romance", "Podrão", "Cintaralho Hextech"],
    rating: "Teen",
    chapters: "2/2",
    status: "Completa",
    kudos: 27,
    date: "05 nov 2026",
  },
  {
    id: 2,
    title: "O peso de uma grande escritora",
    author: "Lets",
    fandom: "Archive of Our Own RPF (Realidade Paralela)",
    pairing: "Duas viadas fazendo viadagem",
    summary: "Ela escreveu uma frase. O site caiu. Nenhum hacker foi encontrado.",
    tags: ["Crack", "Bad Writing", "Tragédia tecnológica", "AO3"],
    rating: "General",
    chapters: "1/1",
    status: "Completa",
    kudos: 14,
    date: "04 nov 2026",
  },
  {
    id: 3,
    title: "A tecnologia de Piltover e seus usos",
    author: "Lets",
    fandom: "Arcane",
    pairing: "Caitlyn Kiramman / Vi",
    summary: "Uma contribuição questionável para o avanço científico da humanidade.",
    tags: ["Hextech", "Romance", "Pseudociência", "Crack"],
    rating: "Mature",
    chapters: "1/?",
    status: "Em andamento",
    kudos: 9,
    date: "05 nov 2026",
  },
];

const allTags = ["Todas", "Crack", "Angst", "Romance", "Bad Writing", "Podrão", "Hextech"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("Todas");
  const [sort, setSort] = useState("recentes");
  const [randomWork, setRandomWork] = useState<Work | null>(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredWorks = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = works.filter((work) => {
      const matchesQuery = !q || [
        work.title, work.author, work.fandom, work.pairing, work.summary, ...work.tags,
      ].join(" ").toLowerCase().includes(q);
      const matchesTag = activeTag === "Todas" || work.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase());
      return matchesQuery && matchesTag;
    });
    return [...result].sort((a, b) => sort === "kudos" ? b.kudos - a.kudos : b.id - a.id);
  }, [query, activeTag, sort]);

  function surpriseMe() {
    const pool = filteredWorks.length ? filteredWorks : works;
    setRandomWork(pool[Math.floor(Math.random() * pool.length)]);
  }

  return (
    <main>
      <div className="utility-bar">
        <div className="utility-inner">
          <span>Um arquivo para preservar aquilo que jamais deveria ter sido escrito.</span>
          <span className="utility-right">Feito de nozes, caos e más decisões</span>
        </div>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#" aria-label="Arquivo de Todos Nozes - início">
            <span className="brand-mark">ATN</span>
            <span>
              <strong>Arquivo de Todos Nozes</strong>
              <small>um arquivo de fanworks questionáveis</small>
            </span>
          </a>
          <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-expanded={mobileMenu}>
            {mobileMenu ? "Fechar" : "Menu"}
          </button>
          <nav className={mobileMenu ? "main-nav open" : "main-nav"} aria-label="Navegação principal">
            <a className="active" href="#works">Explorar</a>
            <a href="#about">Sobre o arquivo</a>
            <button className="nav-submit" onClick={() => setShowSubmit(true)}>Publicar uma obra</button>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">ARQUIVO INDEPENDENTE · EST. 2026</p>
            <h1>Grandes histórias.<br /><em>Pequenas noções.</em></h1>
            <p className="hero-description">
              Um espaço seguro para publicar aquilo que a sociedade ainda não está pronta para ler.
              A literatura pode até ter limites. Nós não encontramos.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#works">Explorar obras <span>↗</span></a>
              <button className="button button-secondary" onClick={surpriseMe}>Sortear uma atrocidade <span>✳</span></button>
            </div>
          </div>
          <div className="hero-stamp" aria-label="Selo de qualidade questionável">
            <span className="stamp-top">CERTIFICADO</span>
            <strong>100%</strong>
            <span className="stamp-mid">QUESTIONÁVEL</span>
            <span className="stamp-bottom">DESDE 2026 · ATN</span>
          </div>
        </div>
      </section>

      <div className="stats-strip">
        <div><strong>003</strong><span>obras arquivadas</span></div>
        <div><strong>∞</strong><span>decisões duvidosas</span></div>
        <div><strong>0</strong><span>arrependimentos (declarados)</span></div>
      </div>

      <section className="content-wrap" id="works">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A COLEÇÃO</p>
            <h2>Obras recentemente arquivadas</h2>
            <p className="section-intro">Cada história é uma nova oportunidade de questionar os rumos da humanidade.</p>
          </div>
          <span className="collection-count">{filteredWorks.length.toString().padStart(3, "0")} RESULTADOS</span>
        </div>

        <div className="browser-layout">
          <aside className="filters">
            <div className="filter-title"><span>⌕</span> Refinar busca</div>
            <label className="search-label" htmlFor="search">Pesquisar no arquivo</label>
            <input id="search" className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Título, fandom, personagem..." />
            <div className="filter-group">
              <span className="filter-label">Gêneros e tags</span>
              <div className="tag-filter-list">
                {allTags.map((tag) => (
                  <button key={tag} className={activeTag === tag ? "filter-chip selected" : "filter-chip"} onClick={() => setActiveTag(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label" htmlFor="sort">Ordenar por</label>
              <select id="sort" className="search-input" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="recentes">Mais recentes</option>
                <option value="kudos">Mais nozes (kudos)</option>
              </select>
            </div>
            <div className="filter-note">
              <strong>Nota da curadoria</strong>
              <p>O arquivo não se responsabiliza por danos emocionais, risadas fora de hora ou vontade súbita de escrever.</p>
            </div>
          </aside>

          <div className="work-list">
            {filteredWorks.length ? filteredWorks.map((work) => (
              <article className="work-card" key={work.id}>
                <div className="work-main">
                  <div className="work-meta">
                    <span className="rating">{work.rating}</span>
                    <span>{work.status}</span>
                    <span>{work.chapters} capítulos</span>
                  </div>
                  <h3><button className="work-title" onClick={() => setRandomWork(work)}>{work.title}</button></h3>
                  <p className="byline">por <a href="#author">{work.author}</a></p>
                  <p className="pairing">{work.pairing}</p>
                  <p className="summary">{work.summary}</p>
                  <div className="tags">
                    {work.tags.map((tag) => <button key={tag} onClick={() => setActiveTag(allTags.includes(tag) ? tag : "Todas")}>{tag}</button>)}
                  </div>
                </div>
                <div className="work-side">
                  <span className="fandom-label">FANDOM</span>
                  <strong>{work.fandom}</strong>
                  <div className="work-numbers"><span>♡ {work.kudos} nozes</span><span>{work.date}</span></div>
                </div>
              </article>
            )) : (
              <div className="empty-state">
                <span>:(</span>
                <h3>Nenhuma atrocidade encontrada.</h3>
                <p>Tente outra busca. A criatividade humana é vasta.</p>
                <button className="text-button" onClick={() => { setQuery(""); setActiveTag("Todas"); }}>Limpar filtros</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="quote-band" id="about">
        <p>“A literatura pode até ter limites. Nós não encontramos.”</p>
        <span>— Manifesto editorial do Arquivo de Todos Nozes</span>
      </section>

      <footer className="footer">
        <div className="footer-brand">Arquivo de Todos Nozes</div>
        <p>Feito com carinho, caos e uma quantidade preocupante de referências.</p>
        <div className="footer-links"><a href="#works">Explorar</a><a href="#about">Sobre</a><button onClick={() => setShowSubmit(true)}>Enviar uma obra</button></div>
        <small>Este é um projeto independente de paródia e arquivo de fanworks. Não afiliado ao AO3.</small>
      </footer>

      {randomWork && (
        <div className="modal-backdrop" role="presentation" onClick={() => setRandomWork(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="work-modal-title" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRandomWork(null)} aria-label="Fechar">×</button>
            <p className="eyebrow">OBRA SELECIONADA PELO DESTINO</p>
            <h2 id="work-modal-title">{randomWork.title}</h2>
            <p className="byline">por {randomWork.author} · {randomWork.fandom}</p>
            <p className="pairing">{randomWork.pairing}</p>
            <p>{randomWork.summary}</p>
            <div className="tags">{randomWork.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-foot">♡ {randomWork.kudos} nozes · {randomWork.chapters} capítulos</div>
          </section>
        </div>
      )}

      {showSubmit && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowSubmit(false)}>
          <section className="modal submit-modal" role="dialog" aria-modal="true" aria-labelledby="submit-title" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSubmit(false)} aria-label="Fechar">×</button>
            <p className="eyebrow">NOVO PATRIMÔNIO CULTURAL</p>
            <h2 id="submit-title">Publicar uma obra</h2>
            <p>O formulário de publicação completo chega na próxima versão. Por enquanto, envie sua proposta à curadoria.</p>
            <label htmlFor="proposal">Conte o que você pretende arquivar</label>
            <textarea id="proposal" placeholder="Título, fandom, resumo e nível de absurdo..." />
            <button className="button button-primary" onClick={() => setShowSubmit(false)}>Entregar à curadoria (em breve)</button>
          </section>
        </div>
      )}
    </main>
  );
}
