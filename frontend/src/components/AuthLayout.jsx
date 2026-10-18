import { LogoMark } from "./Icons";

const PREVIEW = [
  { name: "To Do", tone: "todo", chips: ["Draft project brief", "Review pull requests"] },
  { name: "In Progress", tone: "progress", chips: ["Build login screen"] },
  { name: "Done", tone: "done", chips: ["Set up database", "Deploy API"] },
];

export const AuthLayout = ({ title, subtitle, children, footer }) => (
  <div className="auth">
    <aside className="auth-aside">
      <div className="brand brand-light">
        <LogoMark />
        <span>TaskFlow</span>
      </div>
      <div className="auth-pitch">
        <h2>Plan the week. Move work forward.</h2>
        <p>Keep every task in one board and drag it across as it gets done.</p>
      </div>
      <div className="mini-board" aria-hidden="true">
        {PREVIEW.map((col) => (
          <div key={col.name} className={`mini-col tone-${col.tone}`}>
            <span className="mini-title">{col.name}</span>
            {col.chips.map((chip) => (
              <span key={chip} className="mini-chip">
                {chip}
              </span>
            ))}
          </div>
        ))}
      </div>
    </aside>

    <main className="auth-main">
      <div className="auth-card">
        <div className="brand auth-brand-mobile">
          <LogoMark />
          <span>TaskFlow</span>
        </div>
        <h1>{title}</h1>
        <p className="auth-sub">{subtitle}</p>
        {children}
        <p className="auth-footer">{footer}</p>
      </div>
    </main>
  </div>
);
