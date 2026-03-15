"use client";

import { useEffect, useState } from "react";
import { CookieConsent } from "@/components/cookie-consent";

const CONTENT_URL = "/noidme-pvt-limited/content/noidme-site.json";

type LinkItem = {
  label: string;
  href: string;
};

type SectionFeatures = {
  id: string;
  title: string;
  description: string;
  features: string[];
};

type SiteContent = {
  site: {
    brand: {
      name: string;
      subLabel: string;
    };
    headerCta: LinkItem;
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: LinkItem;
      secondaryCta: LinkItem;
      systemNodes: Array<{ title: string; description: string }>;
    };
  };
  navigation: LinkItem[];
  kpis: {
    title: string;
    items: Array<{ label: string; value: string }>;
  };
  impact: {
    title: string;
    description: string;
    signals: Array<{ title: string; value: string; detail: string; level: number }>;
  };
  platform: SectionFeatures & {
    note: string;
    modules: Array<{ title: string; description: string }>;
  };
  consent: SectionFeatures & {
    coverage: {
      title: string;
      description: string;
      items: string[];
    };
  };
  profiles: SectionFeatures;
  integrations: {
    id: string;
    title: string;
    description: string;
    items: Array<{ name: string; detail: string }>;
  };
  security: {
    id: string;
    title: string;
    leftDescription: string;
    rightDescription: string;
    journey: Array<{ step: string; title: string; description: string }>;
  };
  details: {
    id: string;
    title: string;
    description: string;
    items: Array<{ title: string; body: string; points: string[] }>;
  };
  contact: {
    id: string;
    title: string;
    description: string;
    cta: LinkItem;
  };
  footer: {
    suffix: string;
    links: LinkItem[];
  };
  cookieConsent: {
    message: string;
    rejectLabel: string;
    acceptLabel: string;
    ariaLabel: string;
  };
};

function splitYearText(suffix: string) {
  return `© ${new Date().getFullYear()} ${suffix}`;
}

export function NoIdMeSite() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContent() {
      try {
        const response = await fetch(CONTENT_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`);
        }
        const data = (await response.json()) as SiteContent;
        setContent(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Could not load website content.");
        }
      } finally {
        setLoading(false);
      }
    }

    void loadContent();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <main className="site-state" aria-busy="true" aria-live="polite">
        <p>Loading NoIdMe content...</p>
      </main>
    );
  }

  if (!content || error) {
    return (
      <main className="site-state" aria-live="polite">
        <p>{error ?? "Content unavailable."}</p>
      </main>
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="container nav-shell">
          <a href="#main-content" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64" role="presentation" focusable="false">
                <defs>
                  <linearGradient id="noidme-bg-refined" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#333333" />
                    <stop offset="1" stopColor="#080808" />
                  </linearGradient>
                  <linearGradient id="noidme-shield-refined" x1="16" y1="15" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#cfcfcf" />
                  </linearGradient>
                </defs>
                <rect x="4.5" y="4.5" width="55" height="55" rx="14" fill="url(#noidme-bg-refined)" stroke="#3e3e3e" />
                <path d="M13 16.5c7.6-5.2 26.4-7.5 38 0" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M32 13.5L47.5 20.8v12.3c0 8.6-6.3 15.3-15.5 18.9C22.8 48.4 16.5 41.7 16.5 33.1V20.8L32 13.5z"
                  fill="url(#noidme-shield-refined)"
                />
                <circle cx="28.4" cy="27.5" r="3.15" fill="#111111" />
                <path d="M23.2 36.6c1.7-2.7 3.6-4.1 5.4-4.1s3.7 1.4 5.4 4.1" fill="none" stroke="#111111" strokeWidth="3.1" strokeLinecap="round" />
                <circle cx="40.6" cy="38.8" r="7.2" fill="#111111" />
                <path d="M37.2 38.8l2.1 2.1 4.4-4.6" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="brand-text">
              <strong>{content.site.brand.name}</strong>
              <small>{content.site.brand.subLabel}</small>
            </span>
          </a>
          <nav className="site-nav" aria-label="Primary">
            <ul>
              {content.navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={content.site.headerCta.href} className="btn btn-primary nav-cta">
            {content.site.headerCta.label}
          </a>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero-section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">{content.site.hero.eyebrow}</p>
              <h1>{content.site.hero.title}</h1>
              <p className="hero-copy">{content.site.hero.description}</p>
              <div className="hero-actions">
                <a href={content.site.hero.primaryCta.href} className="btn btn-primary">
                  {content.site.hero.primaryCta.label}
                </a>
                <a href={content.site.hero.secondaryCta.href} className="btn btn-ghost">
                  {content.site.hero.secondaryCta.label}
                </a>
              </div>
            </div>
            <div className="hero-system" aria-label="NoIdMe platform map">
              {content.site.hero.systemNodes.map((item) => (
                <article key={item.title} className="system-node">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="kpi-strip" aria-labelledby="kpi-title">
          <div className="container kpi-grid">
            <h2 id="kpi-title" className="sr-only">
              {content.kpis.title}
            </h2>
            {content.kpis.items.map((item) => (
              <dl key={item.label} className="kpi-card">
                <dt className="kpi-label">{item.label}</dt>
                <dd className="kpi-value">{item.value}</dd>
              </dl>
            ))}
          </div>
        </section>

        <section className="section infographic-section" aria-labelledby="signals-title">
          <div className="container">
            <h2 id="signals-title">{content.impact.title}</h2>
            <p className="section-copy">{content.impact.description}</p>
            <div className="signal-grid">
              {content.impact.signals.map((item) => (
                <article key={item.title} className="signal-card">
                  <p className="signal-title">{item.title}</p>
                  <p className="signal-value">{item.value}</p>
                  <p className="signal-detail">{item.detail}</p>
                  <div className="signal-meter" role="img" aria-label={`${item.title} level ${item.value}`}>
                    <span style={{ width: `${item.level}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id={content.platform.id} className="section" aria-labelledby="platform-title">
          <div className="container">
            <div className="split-head">
              <div>
                <h2 id="platform-title">{content.platform.title}</h2>
                <p className="section-copy">{content.platform.description}</p>
              </div>
              <p className="section-note">{content.platform.note}</p>
            </div>
            <div className="card-grid card-grid-tall">
              {content.platform.features.map((item, index) => (
                <article key={item} className={`feature-card ${index === 0 ? "feature-card-lead" : ""}`}>
                  <p>{item}</p>
                </article>
              ))}
            </div>
            <div className="module-grid" aria-label="NoIdMe platform modules">
              {content.platform.modules.map((item) => (
                <article key={item.title} className="module-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id={content.consent.id} className="section section-alt" aria-labelledby="consent-title">
          <div className="container">
            <div className="showcase-grid">
              <div>
                <h2 id="consent-title">{content.consent.title}</h2>
                <p className="section-copy">{content.consent.description}</p>
                <div className="card-grid">
                  {content.consent.features.map((item) => (
                    <article key={item} className="feature-card">
                      <p>{item}</p>
                    </article>
                  ))}
                </div>
              </div>
              <aside className="showcase-panel">
                <h3>{content.consent.coverage.title}</h3>
                <p>{content.consent.coverage.description}</p>
                <ul>
                  {content.consent.coverage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section id={content.profiles.id} className="section" aria-labelledby="profiles-title">
          <div className="container">
            <h2 id="profiles-title">{content.profiles.title}</h2>
            <p className="section-copy">{content.profiles.description}</p>
            <div className="card-grid">
              {content.profiles.features.map((item) => (
                <article key={item} className="feature-card">
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id={content.integrations.id} className="section section-alt" aria-labelledby="integrations-title">
          <div className="container">
            <h2 id="integrations-title">{content.integrations.title}</h2>
            <p className="section-copy">{content.integrations.description}</p>
            <div className="integration-list">
              {content.integrations.items.map((item) => (
                <article key={item.name} className="integration-card">
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id={content.security.id} className="section" aria-labelledby="security-title">
          <div className="container">
            <div className="compliance-panel">
              <h2 id="security-title">{content.security.title}</h2>
              <div className="compliance-grid">
                <p>{content.security.leftDescription}</p>
                <p>{content.security.rightDescription}</p>
              </div>
            </div>
            <div className="journey-grid">
              {content.security.journey.map((item) => (
                <article key={item.title} className="journey-card">
                  <p className="journey-step">{item.step}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id={content.details.id} className="section section-alt" aria-labelledby="details-title">
          <div className="container">
            <h2 id="details-title">{content.details.title}</h2>
            <p className="section-copy">{content.details.description}</p>
            <div className="details-grid">
              {content.details.items.map((item) => (
                <details key={item.title} className="details-card">
                  <summary>{item.title}</summary>
                  <p>{item.body}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id={content.contact.id} className="section section-alt" aria-labelledby="contact-title">
          <div className="container cta-panel">
            <h2 id="contact-title">{content.contact.title}</h2>
            <p>{content.contact.description}</p>
            <a className="btn btn-primary" href={content.contact.cta.href} aria-label={content.contact.cta.label}>
              {content.contact.cta.label}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-shell">
          <p>{splitYearText(content.footer.suffix)}</p>
          <div className="footer-links">
            {content.footer.links.map((item, index) => (
              <a key={`${item.href}-${item.label}-${index}`} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <CookieConsent
        message={content.cookieConsent.message}
        rejectLabel={content.cookieConsent.rejectLabel}
        acceptLabel={content.cookieConsent.acceptLabel}
        ariaLabel={content.cookieConsent.ariaLabel}
      />
    </>
  );
}
