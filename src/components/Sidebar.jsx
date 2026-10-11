export default function Sidebar({ page, setPage, nav, user, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="side-brand"><img src="/cite-logo.png" alt="CICT logo" /><div><strong>SMS</strong></div></div>
      <nav>{nav.map(([key, icon, label]) => <button key={key} className={page === key ? 'active' : ''} onClick={() => setPage(key)}><span className="nav-icon">{icon}</span><span>{label}</span></button>)}</nav>
      <div className="side-footer"><div className="mini-avatar">{user.initials}</div><div><strong>{user.name}</strong><small>{user.role === 'admin' ? 'Academic Administrator' : user.dept}</small></div></div>
    </aside>
  );
}
