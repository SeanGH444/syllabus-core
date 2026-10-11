import { useState } from 'react';
import { PageHead, Field, Toggle } from '../components/ui';

export default function Settings({ notify }) {
  const [ai, setAi] = useState(true), [mail, setMail] = useState(true), [strict, setStrict] = useState(false);
  return (
    <>
      <PageHead title="Settings" subtitle="Configure front-end preferences for syllabus validation and workflow behavior." />
      <div className="settings-grid">
        <div className="settings-card"><h3>Institutional Standard</h3><Field label="Default Syllabus Template"><select><option>Undergraduate Syllabus v4</option><option>Undergraduate Syllabus v3</option></select></Field><Field label="Default Academic Year"><select><option>2026–2027</option><option>2025–2026</option></select></Field><Field label="Default Department"><input defaultValue="College of Information Technology and Engineering" /></Field></div>
        <div className="settings-card"><h3>AI & Notifications</h3><Toggle on={ai} set={setAi} title="AI Compliance Checking" text="Enable automated syllabus quality checks." /><Toggle on={strict} set={setStrict} title="Strict Format Validation" text="Require all template sections before submission." /><Toggle on={mail} set={setMail} title="Email Notifications" text="Notify users about review and revision updates." /></div>
      </div>
      <button className="btn primary" onClick={() => notify('Settings saved locally (demo).')}>Save Settings</button>
    </>
  );
}
