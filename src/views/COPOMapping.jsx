import { useEffect, useState } from 'react';
import { MetricBox, PageHead } from '../components/ui';
import { mappingRows } from '../data/initialData';
import { curriculum as curriculumApi, mapping as mappingApi } from '../lib/api';

const CO_COUNT = 4;
const PO_COUNT = 12;

export default function COPOMapping({ notify }) {
  const [curricula, setCurricula] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [map, setMap] = useState(Array.from({ length: CO_COUNT }, () => Array(PO_COUNT).fill('')));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    curriculumApi.list().then(data => {
      setCurricula(data);
      if (data.length > 0) setSelectedCurriculum(data[0].id);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedCurriculum) return;
    setLoading(true);
    mappingApi.get(selectedCurriculum).then(data => {
      const m = Array.from({ length: CO_COUNT }, () => Array(PO_COUNT).fill(''));
      data.forEach(({ co_number, po_number, level }) => {
        if (co_number <= CO_COUNT && po_number <= PO_COUNT) m[co_number - 1][po_number - 1] = level;
      });
      setMap(m);
      setLoading(false);
    }).catch(() => { setLoading(false); });
  }, [selectedCurriculum]);

  const cycle = (r, c) => {
    const vals = ['', 'I', 'R', 'M'];
    const next = map.map(x => [...x]);
    next[r][c] = vals[(vals.indexOf(next[r][c]) + 1) % vals.length];
    setMap(next);
  };

  const saveMapping = async () => {
    if (!selectedCurriculum) return;
    const mappings = [];
    map.forEach((row, r) => row.forEach((v, c) => { if (v) mappings.push({ co: r + 1, po: c + 1, level: v }); }));
    try {
      await mappingApi.save(selectedCurriculum, mappings);
      notify('CO–PO mapping saved.');
    } catch (err) { notify('Save failed: ' + err.message); }
  };

  const filled = map.flat().filter(Boolean).length;
  const strength = Math.min(100, Math.round((filled / (CO_COUNT * PO_COUNT)) * 100));
  const mappedCOs = map.filter(row => row.some(Boolean)).length;
  const mappedPOs = new Set(map.flatMap((row, r) => row.map((v, c) => v ? c : null).filter(x => x !== null))).size;
  const masteryLinks = map.flat().filter(v => v === 'M').length;
  const unmappedPOs = PO_COUNT - mappedPOs;

  const current = curricula.find(c => c.id === selectedCurriculum);

  return (
    <>
      <PageHead title="CO–PO Mapping" subtitle="Map course outcomes to program outcomes and visualize curriculum coverage." actions={<><button className="btn outline" onClick={() => notify('Matrix exported (demo).')}>⇩ Export Matrix</button><button className="btn primary" onClick={saveMapping}>Save Mapping</button></>} />
      <div className="mapping-meta">
        <span><small>Curriculum</small><b><select value={selectedCurriculum || ''} onChange={e => setSelectedCurriculum(Number(e.target.value))}>{curricula.map(c => <option key={c.id} value={c.id}>{c.programName} — Year {c.yearLevel}, {c.semester}</option>)}</select></b></span>
        <div className="mapping-legend"><em className="m-i">I</em> Introduced <em className="m-r">R</em> Reinforced <em className="m-m">M</em> Mastered</div>
      </div>
      {loading ? <div className="empty">Loading mapping...</div> : (
        <div className="matrix-card"><div className="matrix-scroll"><table className="matrix"><thead><tr><th>Course Outcomes</th>{Array.from({ length: PO_COUNT }, (_, i) => <th key={i}>PO{i + 1}</th>)}</tr></thead><tbody>{mappingRows.slice(0, CO_COUNT).map((row, r) => <tr key={r}><td>{row}</td>{map[r].map((v, c) => <td key={c}><button title="Click to cycle I/R/M" className={v ? `map-cell ${v.toLowerCase()}` : 'map-cell'} onClick={() => cycle(r, c)}>{v || '·'}</button></td>)}</tr>)}</tbody></table></div><div className="matrix-footer"><div><span>Mapping Strength</span><div className="bar"><i style={{ width: `${strength}%` }} /></div></div><strong>{strength}%</strong><p>Tip: click any matrix cell to cycle through blank → I → R → M.</p></div></div>
      )}
      <div className="coverage-grid"><MetricBox label="Outcomes with Mapping" value={`${mappedCOs} / ${CO_COUNT}`} note={mappedCOs === CO_COUNT ? 'All COs mapped' : 'Some COs unmapped'} /><MetricBox label="POs Addressed" value={`${mappedPOs} / ${PO_COUNT}`} note="Curriculum coverage" /><MetricBox label="Mastery Links" value={String(masteryLinks)} note="Mastered relationships" /><MetricBox label="Alignment Flags" value={String(unmappedPOs > 3 ? 1 : 0)} note={unmappedPOs > 3 ? `Review PO${mappedPOs + 1}–PO${PO_COUNT} coverage` : 'Coverage looks good'} alert={unmappedPOs > 3} /></div>
    </>
  );
}
