import { useMemo } from 'react';
import { PageHead } from '../components/ui';

export default function Compliance({ syllabi }) {
  const required = 2;
  const facultyData = useMemo(() => {
    const map = {};
    syllabi.forEach(s => {
      if (!map[s.faculty]) map[s.faculty] = { name: s.faculty, total: 0, approved: 0, review: 0 };
      map[s.faculty].total++;
      if (s.status === 'approved') map[s.faculty].approved++;
      else map[s.faculty].review++;
    });
    return Object.values(map).map(f => ({ ...f, compliant: f.total >= required, pct: Math.min(100, Math.round((f.total / required) * 100)) }));
  }, [syllabi]);
  return (
    <>
      <PageHead title="Faculty Compliance Monitoring" subtitle="Track syllabus submission compliance per faculty member for PACUCOA accreditation." />
      <div className="comp-grid">
        {facultyData.map(f => <div className="comp-card" key={f.name}>
          <div className="comp-head"><div className="comp-av">{f.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div><div><h4>{f.name}</h4><small>{f.approved} approved • {f.review} under review</small></div><span className={`comp-badge ${f.compliant ? 'ok' : 'warn'}`}>{f.compliant ? 'Compliant' : 'Non-compliant'}</span></div>
          <div className="progress-row"><div><span>{f.total} of {required} required</span><b>{f.pct}%</b></div><div className="bar"><i style={{ width: `${f.pct}%` }} /></div></div>
          {!f.compliant && <div className="comp-warn">⚠ Missing {required - f.total} of {required} required syllabus submissions</div>}
        </div>)}
      </div>
    </>
  );
}
