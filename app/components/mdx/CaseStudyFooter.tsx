import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface CaseStudyFooterProps {
  github?: string;
  live?: string;
  related?: FooterLink[];
  backHref?: string;
  backLabel?: string;
}

export function CaseStudyFooter({ github, live, related, backHref = "/#work", backLabel = "← Back to all work" }: CaseStudyFooterProps) {
  return (
    <footer
      style={{
        marginTop: 80,
        paddingTop: 40,
        borderTop: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Links row */}
      {(github || live || (related && related.length > 0)) && (
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 18px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.1)",
                background: "#fff",
                fontSize: 13,
                fontWeight: 500,
                color: "#333",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                textDecoration: "none",
                transition: "border-color 0.15s, background 0.15s",
              }}
              className="cs-footer-link"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 0C3.36 0 0 3.36 0 7.5c0 3.315 2.15 6.123 5.128 7.115.375.07.512-.163.512-.362 0-.178-.007-.77-.01-1.388-2.085.453-2.525-.875-2.525-.875-.34-.864-.83-1.095-.83-1.095-.678-.463.051-.454.051-.454.75.053 1.144.77 1.144.77.667 1.14 1.75.812 2.176.62.067-.481.26-.812.473-.998-1.664-.19-3.412-.832-3.412-3.702 0-.818.292-1.487.77-2.011-.077-.19-.334-.952.073-1.984 0 0 .63-.2 2.062.768a7.17 7.17 0 0 1 1.875-.253c.636.003 1.277.086 1.875.253 1.43-.97 2.059-.768 2.059-.768.408 1.032.151 1.794.074 1.984.48.524.77 1.193.77 2.011 0 2.877-1.751 3.51-3.418 3.697.268.232.508.687.508 1.385 0 1-.009 1.806-.009 2.052 0 .2.135.435.514.36C12.853 13.62 15 10.813 15 7.5 15 3.36 11.64 0 7.5 0z" fill="currentColor"/>
              </svg>
              View on GitHub
            </a>
          )}

          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 18px",
                borderRadius: 8,
                border: "1px solid #0070f3",
                background: "#0070f3",
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                textDecoration: "none",
              }}
            >
              Live Demo →
            </a>
          )}

          {related?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 18px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#fafafa",
                fontSize: 13,
                fontWeight: 500,
                color: "#555",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Link
          href={backHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontFamily: "var(--font-geist-mono), monospace",
            color: "#999",
            textDecoration: "none",
          }}
        >
          {backLabel}
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "#ccc",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            Saad Hasan
          </span>
          <span style={{ color: "#e5e5e5" }}>·</span>
          <a
            href="https://github.com/saadh393"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              color: "#bbb",
              fontFamily: "var(--font-geist-mono), monospace",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
          <span style={{ color: "#e5e5e5" }}>·</span>
          <a
            href="https://linkedin.com/in/saadh393"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              color: "#bbb",
              fontFamily: "var(--font-geist-mono), monospace",
              textDecoration: "none",
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
