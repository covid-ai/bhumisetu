'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Search, Bell, ChevronDown, Menu, X, Map, Home, BarChart3, FileText, HelpCircle,
  UserCircle2, ShieldCheck
} from 'lucide-react';
import { useLandStack, UserRole } from '../../context/LandStackContext';
import { LoginModal } from './LoginModal';
import { SearchService, SearchResult } from '../../lib/search';

interface AppHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { parcels, focusParcelOnMap, setCurrentView, currentUser, logout, serviceRequests } = useLandStack();
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginRole, setLoginRole] = useState<UserRole>('citizen');
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    setResults(SearchService.search(query, parcels));
    setOpen(true);
  }, [query, parcels]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const role = (event as CustomEvent).detail?.role as UserRole | undefined;
      setLoginRole(role || 'admin');
      setLoginOpen(true);
    };
    window.addEventListener('landstack-open-login', handler);
    return () => window.removeEventListener('landstack-open-login', handler);
  }, []);

  return (
    <>
      <div className="prototype-strip">
        <span>⚠</span>
        <b>PROTOTYPE / DEMO DATA:</b>
        <span className="hidden sm:inline">Parcel boundaries, ownership information, ULPINs and records are simulated demonstration data and are not official government land records.</span>
        <span className="sm:hidden">Simulated demonstration data · Not official records.</span>
      </div>

      <header className="bs-topbar">
        <div className="bs-brand">
          <button className="mobile-menu" onClick={onToggleSidebar} aria-label="Toggle navigation">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="bs-logo"><img src="/land-logo.svg" alt="BhoomiSetu" /></div>
          <div className="bs-brand-copy">
            <div className="bs-brand-name">Bhoomi<span>Setu</span></div>
            <div className="bs-brand-tag">Unified Land Governance for a Smarter India</div>
          </div>
        </div>

        <nav className="bs-topnav" aria-label="Primary navigation">
          <a href="#" className="active"><Home size={14} /> Home</a>
          <button onClick={() => focusParcelOnMap('P005')}><Map size={14} /> Explore Map</button>
          <button onClick={() => setCurrentView('service-requests')}><ShieldCheck size={14} /> Services</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent('landstack-open-analytics'))}><BarChart3 size={14} /> Analytics</button>
          <button onClick={() => currentUser?.role === 'admin' ? setCurrentView('admin') : window.dispatchEvent(new CustomEvent('landstack-open-login', { detail: { role: 'admin' } }))}><FileText size={14} /> Departments</button>
          <a href="#" onClick={(e) => e.preventDefault()}><FileText size={14} /> API Hub</a>
          <a href="#" onClick={(e) => e.preventDefault()}><HelpCircle size={14} /> Help</a>
        </nav>

        <div className="bs-header-actions">
          <div ref={ref} className="bs-search-wrap">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim() && setOpen(true)}
              placeholder="Search by ULPIN / Survey No. / Village / Owner"
            />
            <button aria-label="Search"><Search size={18} /></button>
            {open && (
              <div className="bs-search-dropdown">
                {results.length ? results.slice(0, 6).map((res) => (
                  <button key={res.parcel.parcelId} onClick={() => {
                    focusParcelOnMap(res.parcel.parcelId);
                    setQuery(''); setOpen(false);
                  }}>
                    <div><b>{res.parcel.parcelId}</b><span>{res.parcel.ulpin}</span></div>
                    <small>{res.ownerName} · Survey {res.parcel.surveyNumber}</small>
                  </button>
                )) : <div className="bs-search-empty">No matching cadastral parcel found.</div>}
              </div>
            )}
          </div>
          <div className="bs-notification-wrap"><button className="bs-icon-btn notification-btn" aria-label="Notifications" onClick={() => setNotificationsOpen(v => !v)}><Bell size={19} /><span>{serviceRequests.filter(r => currentUser?.role === 'admin' ? (r.status === 'Pending' || r.status === 'Under Review') : r.submittedByUsername === currentUser?.username && (r.status === 'Pending' || r.status === 'Under Review')).length || 0}</span></button>{notificationsOpen && <div className="bs-notification-menu"><div className="bs-notification-title"><b>{currentUser?.role === 'admin' ? 'Officer Notifications' : 'My Notifications'}</b><button onClick={() => setNotificationsOpen(false)}>×</button></div>{serviceRequests.filter(r => currentUser?.role === 'admin' ? (r.status === 'Pending' || r.status === 'Under Review') : r.submittedByUsername === currentUser?.username).slice(0,5).map(r => <button key={r.requestId} onClick={() => { focusParcelOnMap(r.parcelId); setNotificationsOpen(false); }}><b>{r.requestType}</b><span>{r.requestId} · {r.status}</span></button>)}{serviceRequests.filter(r => currentUser?.role === 'admin' ? (r.status === 'Pending' || r.status === 'Under Review') : r.submittedByUsername === currentUser?.username).length === 0 && <div className="bs-notification-empty">No new notifications</div>}</div>}</div>
          <div className="bs-profile-wrap">
            <button className="bs-profile" onClick={() => setProfileOpen(v => !v)}>
              <span className="bs-avatar">{currentUser?.name?.charAt(0) || 'D'}</span>
              <span className="bs-profile-copy"><b>{currentUser?.name || 'Sign in'}</b><small>{currentUser?.role === 'admin' ? 'Admin / SDM' : currentUser ? 'Citizen' : 'Demo access'}</small></span>
              <ChevronDown size={15} />
            </button>
            {profileOpen && <div className="bs-profile-menu">
              <div><b>{currentUser ? `${currentUser.name} session` : 'Demo account access'}</b><small>{currentUser?.role === 'admin' ? 'Admin / SDM' : currentUser ? 'Citizen' : 'Choose one of six demo accounts'}</small></div>
              <button onClick={() => { setLoginRole('citizen'); setLoginOpen(true); setProfileOpen(false); }}>Citizen / Client Login</button>
              <button onClick={() => { setLoginRole('admin'); setLoginOpen(true); setProfileOpen(false); }}>Admin / SDM Login</button>
              {currentUser && <button className="danger" onClick={() => { logout(); setProfileOpen(false); }}>Sign out</button>}
            </div>}
          </div>
        </div>
      </header>
      <LoginModal open={loginOpen} initialRole={loginRole} onClose={() => setLoginOpen(false)} />
    </>
  );
};
