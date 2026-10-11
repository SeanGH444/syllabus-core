import { useMemo } from 'react';
import { PageHead } from '../components/ui';

const STATUS_LABELS = { submitted: 'Submitted', under_review: 'Under Review', for_revision: 'For Revision', approved: 'Approved', rejected: 'Rejected' };

export default function MySyllabi({ syllabi, user, messages, setEditing, setPage, setHistCode, setChatCode, handleDelete, setConfirm, notify }) {
  const my = useMemo(() => syllabi.filter(s => s.userId === user.id).map(s => ({ ...s, unreadCount: messages.filter(m => m.syllabusId === s.id && m.receiverId === user.id && !m.isRead).length })), [syllabi, user, messages]);
  return (
    <>
      <PageHead title="My Syllabi" subtitle="View and manage your submitted syllabi." actions={<button className="btn primary" onClick={() => { setEditing(null); setPage('builder'); }}>+ New Syllabus</button>} />
      <div className="syl-grid">
        {my.map(s => <div className="syl-card" key={s.id}>
          <div className="syl-head"><div className="syl-info"><h4>{s.courseCode}</h4><p>{s.title}</p></div><span className={`status ${s.status}`}>{STATUS_LABELS[s.status] || s.status}</span></div>
          <div className="syl-meta"><span>{s.program}</span><span>Updated {s.updatedAt}</span>{s.unreadCount > 0 && <span className="syl-unread">{s.unreadCount} unread</span>}</div>
          {s.adminComment && <div className="feedback-banner">💬 {s.adminComment}</div>}
          <div className="syl-actions">
            <button className="btn outline" disabled={s.status !== 'for_revision'} onClick={() => { setEditing(s); setPage('builder'); }}>✎ Edit</button>
            <button className="btn outline" onClick={() => { setChatCode(s.id); }}>✉ Message</button>
            <button className="btn outline" onClick={() => setHistCode(s.id)}>◷ History</button>
            <button className="btn danger" onClick={() => setConfirm({ title: 'Delete Syllabus?', message: `Are you sure you want to delete ${s.courseCode}? This cannot be undone.`, label: 'Delete', onConfirm: () => handleDelete(s.id) })}>🗑</button>
          </div>
        </div>)}
        {my.length === 0 && <div className="empty">No syllabi yet. Click "+ New Syllabus" to get started.</div>}
      </div>
    </>
  );
}
