import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/api';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      setMessage(data.message || 'Unable to process request.');
    } catch { setMessage('Unable to connect to the server.'); }
    finally { setBusy(false); }
  }
  return <><Navbar /><main className="account-page auth-flow-page"><div className="account-container auth-flow-container">
    <div className="auth-flow-header"><span className="auth-flow-eyebrow">ACCOUNT RECOVERY</span><h1 className="account-title">Forgot Password</h1><p>We’ll help you get back to your books.</p></div>
    <section className="account-box auth-flow-card">
      <p className="auth-flow-description">Enter your email address and we’ll send you a link to reset your password.</p>
      <form className="account-form" onSubmit={submit}>
        <div className="account-field"><label htmlFor="reset-email">Email address</label>
          <input id="reset-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
        <button className="account-submit-btn" disabled={busy}>{busy ? 'Sending…' : 'Send reset link'}</button>
      </form>{message && <p role="status" className="auth-flow-message">{message}</p>}<Link className="auth-flow-back" to="/account">← Back to Login</Link>
    </section></div></main><Footer /></>;
}
