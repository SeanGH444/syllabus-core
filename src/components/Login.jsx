import { useState } from 'react';


export default function Login({ onLogin }) {
  const [form, setForm] = useState({ user: '', pass: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const fill = (e, p) => { setForm({ user: e, pass: p }); setError(''); };
  const submit = (e) => {
    e.preventDefault();
    if (!form.user.trim() || !form.pass.trim()) { setError('Enter your username/email and password.'); return; }
    const err = onLogin(form.user, form.pass);
    if (err) setError(err);
  };
  return (
    <div className="login-page">
      <section className="login-brand">
        <div className="brand-orb"><img src="/cite-logo.png" alt="College logo" /></div>
        <div>
          <span className="eyebrow light">ACADEMIC QUALITY</span>
          <h1>Syllabus<br />Management System</h1>
          <p>Build, validate, review, approve, archive, and analyze undergraduate syllabi in one institutional workspace.</p>
          <div className="feature-pills"><span>✦ AI Compliance</span><span>✓ Approval Workflow</span><span>⌗ CO–PO Mapping</span></div>
        </div>
      </section>
      <section className="login-panel">
        <form className="login-card" onSubmit={submit}>
          <img className="login-logo" src="/cite-logo.png" alt="College logo" />
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to SMS</h2>
          <p className="muted">Use your institutional account to continue.</p>
          <label>Username or Email<input value={form.user} onChange={e => setForm({ ...form, user: e.target.value })} placeholder="name@university.edu.ph" /></label>
          <label className="pass-field">Password<span className="pass-input"><input type={showPass ? 'text' : 'password'} value={form.pass} onChange={e => setForm({ ...form, pass: e.target.value })} placeholder="••••••••" /><button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>{showPass ? '◉' : '◎'}</button></span></label>
          <div className="login-options"><label className="check"><input type="checkbox" /> Remember me</label><button type="button" className="link-btn">Forgot password?</button></div>
          {error && <div className="form-error">{error}</div>}
          <button className="btn primary wide" type="submit">Sign In</button>
          {/* <div className="or"><span />or<span /></div>
          <button className="btn outline wide" type="button" onClick={() => { onLogin('admin@university.edu.ph', 'admin123'); }}>Enter Demo System</button> */}
          <div className="demo-accounts"><small>Demo accounts — <button type="button" onClick={() => fill('admin@university.edu.ph', 'admin123')}>admin@university.edu.ph / admin123</button> · <button type="button" onClick={() => fill('faculty@university.edu.ph', 'faculty123')}>faculty@university.edu.ph / faculty123</button></small></div>
          {/* <small>Front-end prototype • No live authentication</small> */}
        </form>
      </section>
    </div>
  );
}
