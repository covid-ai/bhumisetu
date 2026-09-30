'use client';

import React from 'react';
import {
  LayoutDashboard, Map, Search, UserCheck, FileText, Database, BarChart3, ShieldCheck,
  Settings, ChevronDown, LandPlot, Building2, Landmark, Receipt, Network, Sparkles,
  Headphones, UserRoundCheck, Download, BadgeCheck
} from 'lucide-react';
import { useLandStack, AppView } from '../../context/LandStackContext';

interface SidebarProps { isOpen: boolean; onCloseMobile?: () => void; }

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { currentView, setCurrentView, serviceRequests, currentUser } = useLandStack();
  const pending = serviceRequests.filter(r => r.requestType === 'Subdivision' && (r.status === 'Pending' || r.status === 'Under Review')).length;

  const go = (view: AppView) => {
    if (view === 'admin' && currentUser?.role !== 'admin') {
      window.dispatchEvent(new CustomEvent('landstack-open-login', { detail: { role: 'admin' } }));
      onCloseMobile?.();
      return;
    }
    setCurrentView(view); onCloseMobile?.();
  };

  const primary: { id: AppView; label: string; icon: any; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Explore Map', icon: Map },
    { id: 'land-records', label: 'Parcel Search', icon: Search },
    { id: 'my-parcels', label: 'Ownership & Records', icon: UserCheck },
    { id: 'land-records', label: 'Land Use & Zoning', icon: LandPlot },
    { id: 'subdivision', label: 'Approvals & Permissions', icon: BadgeCheck, badge: pending },
    { id: 'service-requests', label: 'Citizen Services & Property Tax', icon: Receipt },
    { id: 'map', label: 'Utilities & Infrastructure', icon: Network },
    { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
    { id: 'analytics', label: 'AI Tools', icon: Sparkles },
    { id: 'admin', label: 'Officer Dashboard', icon: ShieldCheck },
  ];

  return (
    <>
      {isOpen && <div className="bs-sidebar-backdrop" onClick={onCloseMobile} />}
      <aside className={`bs-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="bs-sidebar-scroll">
          <div className="bs-sidebar-section-title">LAND GOVERNANCE</div>
          {primary.filter(item => currentUser?.role === 'admin' || item.label !== 'Officer Dashboard').map((item, index) => {
            const Icon = item.icon;
            const active = currentView === item.id && ((item.label === 'Dashboard' && currentView === 'dashboard') || item.label !== 'Dashboard');
            return (
              <button key={`${item.label}-${index}`} className={`bs-side-item ${active ? 'active' : ''}`} onClick={() => go(item.id)}>
                <Icon size={17} />
                <span>{item.label}</span>
                {item.badge ? <em>{item.badge}</em> : item.label !== 'Dashboard' && ['Explore Map','Parcel Search','Ownership & Records','Land Use & Zoning','Approvals & Permissions','Property Tax','Utilities & Infrastructure','Analytics & Insights','AI Tools','Citizen Services & Property Tax','Officer Dashboard'].includes(item.label) ? <ChevronDown size={13} className="side-chevron" /> : null}
              </button>
            );
          })}

          <div className="bs-sidebar-section-title quick-title">QUICK ACTIONS</div>
          <button className="bs-quick" onClick={() => go('my-parcels')}><UserRoundCheck size={17} /><span>Verify Ownership</span></button>
          <button className="bs-quick" onClick={() => go('service-requests')}><Network size={17} /><span>Track Transaction</span></button>
          <button className="bs-quick" onClick={() => go('subdivision')}><BadgeCheck size={17} /><span>Apply for Service</span></button>
          <button className="bs-quick" onClick={() => go('land-records')}><Download size={17} /><span>Download Report</span></button>
        </div>

        <div className="bs-sidebar-footer">
          <div className="bs-support-title">Support</div>
          <button><Headphones size={16} /> Help & FAQ</button>
          <button><FileText size={16} /> Contact Us</button>
        </div>
      </aside>
    </>
  );
};
