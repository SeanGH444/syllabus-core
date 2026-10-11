export default function VersionHistoryModal({ syllabus, onClose }) {
  if (!syllabus) return null;
  const versions = (syllabus.versions || []).slice().reverse();
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal vh-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head"><div><h3>Version History</h3><small>{syllabus.code} • {syllabus.title}</small></div><button className="icon-btn" onClick={onClose}>✕</button></div>
        <div className="modal-body">
          <div className="vh-timeline">
            {versions.map((v, i) => (
              <div className="vh-item" key={v.v}>
                <div className={`vh-dot ${i === 0 ? 'current' : ''}`} />
                <div className="vh-content">
                  <div className="vh-head"><strong>Version {v.v}</strong><span className={`status ${v.status.toLowerCase().replaceAll(' ', '-')}`}>{v.status}</span>{i === 0 && <span className="vh-current">Current</span>}</div>
                  <small>{v.date}</small>
                  <p>{v.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-foot"><button className="btn outline" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}
