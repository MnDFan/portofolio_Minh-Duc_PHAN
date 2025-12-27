type Project = {
  title: string;
  description: string;
  tags: string[];
  url?: string;
};

const skills = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Design système",
  "Accessibilité",
  "Performance web",
];

const highlights = [
  "Interfaces claires et orientées parcours utilisateur",
  "Code propre, typé et maintenable",
  "Livrables rapides grâce à une approche produit",
];

const fallbackProjects: Project[] = [
  {
    title: "Exemple projet 1",
    description:
      "Projet GitHub de démonstration. Remplacez ce bloc par vos dépôts publics.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Exemple projet 2",
    description:
      "Un second exemple pour illustrer la grille. Ajoutez la description de votre dépôt.",
    tags: ["Sécurité", "API"],
  },
  {
    title: "Exemple projet 3",
    description:
      "Un troisième placeholder. Les tags peuvent venir des topics GitHub.",
    tags: ["Infra", "Outils"],
  },
];

async function fetchGithubProjects(): Promise<Project[]> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "octocat";
  const token = process.env.GITHUB_TOKEN;

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
    {
      // Cache côté serveur et revalidation périodique.
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!res.ok) {
    return fallbackProjects;
  }

  const repos: Array<{
    name: string;
    description: string | null;
    html_url: string;
    topics?: string[];
    language?: string | null;
  }> = await res.json();

  return repos.map((repo) => ({
    title: repo.name,
    description:
      repo.description || "Projet GitHub sans description (à compléter).",
    tags:
      (repo.topics && repo.topics.length > 0
        ? repo.topics.slice(0, 4)
        : repo.language
          ? [repo.language]
          : []) || [],
    url: repo.html_url,
  }));
}

export default async function Home() {
  const projects = await fetchGithubProjects();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,209,102,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(94,234,212,0.1),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(94,129,244,0.12),transparent_30%)]" />
          <div className="relative flex flex-col gap-6">
            <p className="text-sm uppercase tracking-[0.22em] text-amber-200/90">Portfolio 2025</p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Bonjour, je suis Minh-Duc Phan.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-200/85">
              Etudiant en Master 1 spécialité cybersécurité à l'ECE Paris, Ayant une première expérience en audit IT chez AXA et des bases solides en programmation, je
souhaite contribuer activement aux missions de gouvernance, gestion des risques et conformité
(GRC).
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Développement front-end",
                "UX pragmatique",
                "Systèmes de design",
                "Next.js",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-100/90"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white hover:text-white"
                href="#projets"
              >
                Voir mes projets
              </a>
            </div>
          </div>
        </header>

        <section className="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-[1.1fr_0.9fr] md:gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">À propos</h2>
            <p className="text-base leading-7 text-slate-200/85">
              Curieux et rigoureux, je structure les projets pour livrer vite sans perdre la qualité. Je combine prototypage rapide, échanges fréquents avec les parties prenantes et tests sur de vrais usages pour prendre de meilleures décisions produit.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200/90">
              Ma façon de travailler
            </p>
            <ul className="space-y-2 text-sm leading-6 text-slate-200/85">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projets" className="mt-12 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Projets récents</h2>
            <span className="text-sm text-slate-300/80">Sélection à personnaliser</span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-amber-200/60 hover:shadow-xl hover:shadow-amber-200/10"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm leading-6 text-slate-200/85">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {project.url ? (
                  <a
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-200 transition group-hover:translate-x-0.5"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir sur GitHub
                    <span aria-hidden className="text-lg">→</span>
                  </a>
                ) : (
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-200/80">
                    Bientôt en ligne
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-amber-200/25 via-amber-200/20 to-cyan-200/15 p-8 text-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Envie de travailler ensemble ?</h2>
            <p className="text-base text-slate-900/80">
              Si vous souhaitez de discuter pour un projet ou autre, n'hésiter pas à me contacter !
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:-translate-y-0.5 hover:bg-black"
              href="mailto:minhduc.phan2504@gmail.com"
            >
              Discuter par e-mail
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-950 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:border-black"
              href="/CV.pdf"
              download="CV_Minh-Duc_PHAN.pdf"
            >
              Télécharger le CV
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
