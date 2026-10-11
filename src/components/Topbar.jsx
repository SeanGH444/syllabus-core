import { useEffect, useRef } from 'react';
import { navItems } from '../data/initialData';

export default function Topbar({ page, onLogout, user, unread, threads, msgDrop, setMsgDrop, setChatCode, markRead }) {
  const title = navItems.find(([k]) => k === page)?.[2] || 'Dashboard';
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setMsgDrop(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [setMsgDrop]);
  return (
    <header className="topbar">
      <div><span className="eyebrow">SYLLABUS MANAGEMENT SYSTEM</span><h2>{title}</h2></div>
      <div className="top-actions">
        <div className="search">⌕ <input placeholder="Search syllabus, course, faculty..." /></div>
        <div className="msg-wrap" ref={ref}>
          <button className="icon-btn" title="Messages" onClick={() => setMsgDrop(!msgDrop)}>✉{unread > 0 && <span className="pill">{unread}</span>}</button>
          {msgDrop && <div className="msg-drop">
            <div className="msg-drop-head"><strong>Messages</strong><span>{unread} unread</span></div>
            {threads.length === 0 && <div className="msg-empty">No conversations yet.</div>}
            {threads.map(t => <button key={t.code} className={`thread${t.unread ? ' unread' : ''}`} onClick={() => { setChatCode(t.code); markRead(t.code); setMsgDrop(false); }}>
              <div className="thread-av">{t.partner?.initials || '?'}</div>
              <div className="thread-body"><div className="thread-top"><strong>{t.code}</strong><small>{t.lastTime}</small></div><p>{t.partner?.name || 'Unknown'}</p><span>{t.lastMsg}</span></div>
              {t.unread > 0 && <span className="thread-dot" />}
            </button>)}
          </div>}
        </div>
        <button className="icon-btn" title="Notifications">♢<span className="dot" /></button>
        <button className="profile-btn"><span className="avatar">{user.initials}</span><span><strong>{user.name}</strong><small>{user.role === 'admin' ? 'Academic Administrator' : user.dept}</small></span></button>
        <button className="logout" onClick={onLogout}>Log out</button>
      </div>
    </header>
  );
}
