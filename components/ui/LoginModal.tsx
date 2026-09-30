'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ShieldCheck, UserRound, X, Eye, EyeOff, LogIn, Users } from 'lucide-react';
import { useLandStack, UserRole } from '../../context/LandStackContext';
import { DEMO_ACCOUNTS, getDemoAccount } from '../../data/demoAccounts';

interface LoginModalProps {
  open: boolean;
  initialRole?: UserRole;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, initialRole = 'citizen', onClose }) => {
  const { login } = useLandStack();
  const [role, setRole] = useState<UserRole>(initialRole);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const accounts = useMemo(() => DEMO_ACCOUNTS.filter((account) => account.role === role), [role]);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  useEffect(() => {
    const account = accounts[0];
    setSelectedUsername(account?.username || '');
    setUsername(account?.username || '');
    setPassword(account?.password || '');
    setError('');
  }, [accounts]);

  const selectAccount = (value: string) => {
    const account = DEMO_ACCOUNTS.find((item) => item.username === value);
    setSelectedUsername(value);
    setUsername(value);
    setPassword(account?.password || '');
    setError('');
  };

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = getDemoAccount(username.trim(), password);
    if (account && account.role === role) {
      login({ name: account.name, role: account.role, username: account.username });
      onClose();
      return;
    }
    setError('Select one of the six demo accounts or enter its exact demo credentials.');
  };

  return (
    <div className="bs-modal-backdrop" onMouseDown={onClose}>
      <div className="bs-login-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="bs-login-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <div className="bs-login-brand">
          <div className="bs-login-logo"><img src="/land-logo.svg" alt="BhoomiSetu" /></div>
          <div><b>BhoomiSetu Demo Access</b><small>Six role-based prototype accounts</small></div>
        </div>

        <div className="bs-login-tabs">
          <button className={role === 'citizen' ? 'active' : ''} onClick={() => setRole('citizen')}><UserRound size={15} /> Citizens</button>
          <button className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}><ShieldCheck size={15} /> Admins / SDM</button>
        </div>

        <form onSubmit={submit}>
          <label>Choose demo account
            <select value={selectedUsername} onChange={(e) => selectAccount(e.target.value)}>
              {accounts.map((account) => <option key={account.username} value={account.username}>{account.name} — {account.title}</option>)}
            </select>
          </label>
          <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" /></label>
          <label>Password
            <div className="bs-password-wrap"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /><button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></div>
          </label>
          {error && <div className="bs-login-error">{error}</div>}
          <button className="bs-login-submit" type="submit"><LogIn size={16} /> Sign in as {role === 'admin' ? 'Admin / SDM' : 'Citizen'}</button>
        </form>

        <div className="bs-demo-credentials">
          <b><Users size={12} /> Available demo accounts</b>
          {accounts.map((account) => (
            <button type="button" key={account.username} onClick={() => selectAccount(account.username)}>
              <span>{account.name}</span><strong>{account.username}</strong><em>{account.password}</em>
            </button>
          ))}
          <small>Demo-only authentication. These credentials are for prototype presentation and are not real accounts.</small>
        </div>
      </div>
    </div>
  );
};
