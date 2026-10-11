import { useState, useEffect } from 'react';
import { PageHead } from '../components/ui';
import { users as usersApi } from '../lib/api';

const ROLE_PERMISSIONS = {
  admin: 'Full access',
  faculty: 'Create + Submit',
};

export default function UsersRoles({ notify }) {
  const [people, setPeople] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', role: 'faculty' });

  const fetchUsers = () => usersApi.list().then(setPeople).catch(() => {});

  useEffect(() => { fetchUsers(); }, []);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await usersApi.create(form);
      setForm({ email: '', password: '', firstName: '', lastName: '', role: 'faculty' });
      setShowForm(false);
      fetchUsers();
      notify('User created.');
    } catch (err) { notify('Failed: ' + err.message); }
  };

  const deleteUser = async (id) => {
    try {
      await usersApi.remove(id);
      fetchUsers();
      notify('User deleted.');
    } catch (err) { notify('Failed: ' + err.message); }
  };

  return (
    <>
      <PageHead title="Users & Roles" subtitle="Manage user accounts and role profiles for the syllabus workflow." actions={<button className="btn primary" onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : '+ Add User'}</button>} />
      {showForm && (
        <div className="card" style={{ marginBottom: 16, padding: 16 }}>
          <form onSubmit={addUser} style={{ display: 'flex', gap: 8, alignItems: 'end', flexWrap: 'wrap' }}>
            <label>First Name<input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="Juan" required /></label>
            <label>Last Name<input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Santos" required /></label>
            <label>Email<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@university.edu.ph" required /></label>
            <label>Password<input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required /></label>
            <label>Role<select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option value="faculty">Faculty</option><option value="admin">Admin</option></select></label>
            <button className="btn primary" type="submit">Save</button>
          </form>
        </div>
      )}
      <div className="table-card">
        <table><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Permissions</th><th></th></tr></thead><tbody>{people.map(p => <tr key={p.id}><td><strong>{p.firstName} {p.lastName}</strong></td><td><small>{p.email}</small></td><td>{p.role === 'admin' ? 'Administrator' : 'Faculty'}</td><td>{ROLE_PERMISSIONS[p.role] || 'Unknown'}</td><td><button className="btn danger" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => deleteUser(p.id)}>Delete</button></td></tr>)}</tbody></table>
        {people.length === 0 && <div className="empty">No users found.</div>}
      </div>
    </>
  );
}
