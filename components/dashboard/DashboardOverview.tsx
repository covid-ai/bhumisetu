'use client';

import React from 'react';
import {
  Search, MapPin, ChevronRight, CheckCircle2, ShieldCheck, Download, Share2,
  Tractor, Home, Landmark, ClipboardList, ArrowUpRight, Sparkles, AlertTriangle,
  FileCheck2, TrendingUp, Eye, Building2, Navigation, Layers3
} from 'lucide-react';
import { useLandStack } from '../../context/LandStackContext';
import { LandMap } from '../map/LandMap';
import { getOwnerById } from '../../data/owners';

const Metric = ({ icon: Icon, title, value, note, tone, onClick }: any) => (
  <button onClick={onClick} className="bs-metric-card" type="button">
    <div className={`bs-metric-icon ${tone}`}><Icon size={21} /></div>
    <div className="bs-metric-copy">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  </button>
);

export const DashboardOverview: React.FC = () => {
  const { parcels, serviceRequests, selectedParcel, setCurrentView, focusParcelOnMap, setActiveLayer, currentUser } = useLandStack();
  const displayParcel = selectedParcel || parcels.find(p => p.parcelId === 'P005') || parcels[0];
  const owner = displayParcel ? getOwnerById(displayParcel.ownerId) : undefined;

  const total = parcels.length;
  const agricultural = parcels.filter(p => p.landUse === 'Agricultural').length;
  const residential = parcels.filter(p => p.landUse === 'Residential').length;
  const disputed = parcels.filter(p => p.status === 'Disputed').length;
  const pending = serviceRequests.filter(r => r.status === 'Pending' || r.status === 'Under Review').length;
  const activeTransactions = serviceRequests.filter(r => r.status !== 'Completed').length;

  return (
    <div className="bs-dashboard">
      <div className="bs-role-banner"><div><b>{currentUser?.role === 'admin' ? 'Officer / SDM Workspace' : 'Citizen Workspace'}</b><span>{currentUser?.role === 'admin' ? 'Review citizen submissions, approvals and cadastral governance queues.' : 'Explore your parcels, submit land services and track only your own applications.'}</span></div><em>{currentUser?.role === 'admin' ? 'ADMIN DEMO' : 'CITIZEN DEMO'}</em></div>
      {/* Search / location selectors */}
      <section className="bs-filter-row">
        <select defaultValue="Chandigarh (UT)"><option>Chandigarh (UT)</option><option>Maharashtra</option><option>Delhi (NCT)</option></select>
        <select defaultValue="Chandigarh (District)"><option>Chandigarh (District)</option></select>
        <select defaultValue="Chandigarh Sadar (Tehsil)"><option>Chandigarh Sadar (Tehsil / Taluka · Demo)</option><option>Central Sub-Division</option><option>East Sub-Division</option><option>South Sub-Division</option></select>
        <select defaultValue="Sector 26"><option>Sector 26</option><option>Sector 17</option><option>Sector 19</option><option>Sector 22</option><option>Sector 32</option><option>Sector 34</option><option>Sector 42</option><option>Sector 45</option><option>Manimajra</option><option>Kishangarh</option></select>
        <button className="bs-green-btn" onClick={() => focusParcelOnMap('P005')}>Search</button>
        <button className="bs-outline-btn" onClick={() => { setActiveLayer('cadastral'); setCurrentView('map'); }}>Map</button>
        <button className="bs-outline-btn" onClick={() => { setActiveLayer('satellite'); setCurrentView('map'); }}>Satellite</button>
        <button className="bs-outline-btn" onClick={() => { setActiveLayer('landuse'); setCurrentView('map'); }}>Layers</button>
      </section>

      {/* Map + parcel information */}
      <section className="bs-map-card">
        <div className="bs-map-area">
          <div className="bs-map-toolbar">
            <button className="active"><Navigation size={15} /> Select</button>
            <button><span>⌁</span> Measure</button>
            <button><span>✎</span> Draw</button>
            <button onClick={() => setCurrentView('map')}><Layers3 size={15} /> Layers</button>
            <button><span>▽</span> Filter</button>
          </div>
          <LandMap />
          <div className="bs-landuse-legend">
            <strong>Land Use (LULC)</strong>
            <span><i className="lu-agri" /> Agricultural</span>
            <span><i className="lu-res" /> Residential</span>
            <span><i className="lu-com" /> Commercial</span>
            <span><i className="lu-ind" /> Industrial</span>
            <span><i className="lu-gov" /> Government Land</span>
            <span><i className="lu-forest" /> Forest</span>
            <strong className="legend-subtitle">Parcel status</strong>
            <span><i className="status-blue" /> Active</span>
            <span><i className="status-orange" /> Selected</span>
            <span><i className="status-red" /> Disputed</span>
            <span><i className="status-green" /> Subdivided child</span>
          </div>
          <div className="bs-map-location"><span /> Chandigarh UT · Chandigarh District · Chandigarh Sadar · Sector 26</div>
        </div>

        <aside className="bs-parcel-card">
          {displayParcel ? (
            <>
              <div className="bs-parcel-head">
                <div><span>Parcel Information</span><em><CheckCircle2 size={12} /> Verified</em></div>
                <div className="bs-parcel-thumb"><div className="thumb-field" /></div>
              </div>
              <div className="bs-ulpin">ULPIN <b>{displayParcel.ulpin}</b> <button aria-label="copy">▣</button></div>
              <div className="bs-tabs"><button className="active">Overview</button><button>Ownership</button><button>Land Use</button><button>Approvals</button><button>More</button></div>
              <div className="bs-info-grid">
                <label>Survey / Gat No.<b>{displayParcel.surveyNumber}</b></label>
                <label>Village / Sector<b>{displayParcel.location.includes('Sector 26') ? 'Sector 26' : (displayParcel.location.split(',')[0] || 'Chandigarh')}</b></label>
                <label>Tehsil / Taluka<b>Chandigarh Sadar (Demo)</b></label>
                <label>District<b>Chandigarh</b></label>
                <label>Area<b>{(displayParcel.area / 435.6).toFixed(2)} Hectare ({displayParcel.area.toLocaleString()} sq.ft.)</b></label>
                <label>Land Use<b className="green-chip">{displayParcel.landUse}</b></label>
                <label>Ownership Type<b>Private</b></label>
                <label>Owner Name<b>{owner?.name || 'Masked for privacy'} <span className="muted-eye">◌</span></b></label>
                <label>UPIN/ULPIN<b>{displayParcel.ulpin}</b></label>
                <label>Latitude / Longitude<b>{displayParcel.centroid[0].toFixed(4)}, {displayParcel.centroid[1].toFixed(4)}</b></label>
              </div>
              <div className="bs-parcel-actions">
                <button onClick={() => focusParcelOnMap(displayParcel.parcelId)}><MapPin size={15} /> View on Map</button>
                <button onClick={() => window.print()}><Download size={15} /> Download Report</button>
                <button aria-label="Share"><Share2 size={15} /></button>
              </div>
            </>
          ) : <div className="p-8 text-sm text-slate-500">Select a parcel to inspect.</div>}
        </aside>
      </section>

      {/* KPI strip */}
      <section className="bs-metrics-grid">
        <Metric icon={Building2} title="Total Parcels" value={total.toLocaleString()} note="+2.3%" tone="mint" onClick={() => setCurrentView('land-records')} />
        <Metric icon={Tractor} title="Agricultural Land" value={`${agricultural.toLocaleString()}`} note={`${total ? Math.round(agricultural / total * 100) : 0}% of demo set`} tone="purple" onClick={() => setCurrentView('land-records')} />
        <Metric icon={Home} title="Residential Land" value={residential.toLocaleString()} note="17%" tone="yellow" onClick={() => setCurrentView('land-records')} />
        <Metric icon={Landmark} title="Government Land" value={parcels.filter(p => p.landUse === 'Public').length.toLocaleString()} note="7%" tone="red" onClick={() => setCurrentView('land-records')} />
        <Metric icon={FileCheck2} title="Pending Verification" value={pending.toLocaleString()} note="2.5%" tone="blue" onClick={() => setCurrentView('service-requests')} />
        <Metric icon={ClipboardList} title="Active Transactions" value={activeTransactions.toLocaleString()} note="+12%" tone="pink" onClick={() => setCurrentView('service-requests')} />
      </section>

      <div className="bs-bottom-grid">
        {/* Department layers */}
        <section className="bs-panel layers-panel">
          <div className="bs-panel-title"><div><b>Departmental Layers</b></div><button onClick={() => setCurrentView('map')}>View All</button></div>
          {[
            ['🔒','Cadastral Maps (Base Layer)',true],['▣','Record of Rights (RoR)',true],['◫','Registration Records',true],['▧','Land Use & Zoning',true],['▤','Master Plan',false],['▥','Building Permissions',true],['▨','Encumbrance / Mortgage',true],['▦','Property Tax',true],['◉','Utility Infrastructure',false],['◎','Environmental / Restriction Zones',false]
          ].map(([icon,label,on], i) => <div className="layer-row" key={i}><span>{icon}</span><b>{label as string}</b><i className={on ? 'on' : ''}><small /></i></div>)}
        </section>

        {/* AI insights */}
        <section className="bs-panel ai-panel">
          <div className="bs-panel-title"><div><Sparkles size={16} /> <b>AI Insights & Analysis</b><em>Beta</em></div><button onClick={() => setCurrentView('analytics')}>View Details</button></div>
          <div className="insight-row good"><CheckCircle2 /><div><b>Land Use Consistency</b><span>Land use matches with official records.</span></div><ChevronRight /></div>
          <div className="insight-row warn"><AlertTriangle /><div><b>Recent Change Detection</b><span>Possible land cover change detected (Jan 2023 - Dec 2024)</span></div><button onClick={() => setCurrentView('analytics')}>View</button></div>
          <div className="insight-row good"><CheckCircle2 /><div><b>Encroachment Risk</b><span>No encroachment detected.</span></div></div>
          <div className="insight-row good"><CheckCircle2 /><div><b>Zoning Compliance</b><span>Within permissible use.</span></div></div>
          <div className="valuation"><span>₹ Market Valuation (Estimated)</span><b>₹ 12.5 - 15.8 Lakh / Acre</b><i>i</i></div>
        </section>

        {/* Satellite imagery */}
        <section className="bs-panel satellite-panel">
          <div className="bs-panel-title"><div><b>Recent Satellite Imagery</b></div><button>View Timeline</button></div>
          <div className="satellite-compare"><div className="sat-img sat-a"><span>Jan 2023</span></div><div className="sat-img sat-b"><span>Dec 2024</span></div><div className="sat-arrow">›</div></div>
          <p><AlertTriangle size={14} /> AI detected changes in land cover within the parcel boundary.</p>
          <button className="report-btn" onClick={() => setCurrentView('analytics')}>View Change Report</button>
        </section>

        {/* Citizen services */}
        <section className="bs-panel citizen-panel">
          <div className="bs-panel-title"><div><b>Citizen Services</b></div><button onClick={() => setCurrentView('service-requests')}>View All</button></div>
          <div className="citizen-grid">
            {[
              ['⌕','Ownership Verification','Check land ownership details','my-parcels'],
              ['▣','Transaction Status','Track registration status','service-requests'],
              ['▤','Apply for NOC','Apply for land permission','service-requests'],
              ['▥','Building Permission','Submit & track application','service-requests'],
              ['₹','Property Tax','View & pay property tax','service-requests'],
              ['⚑','Grievance / Dispute','Raise land-related issue','service-requests'],
            ].map(([icon,title,desc,view]) => <button key={title} onClick={() => setCurrentView(view as any)}><span>{icon}</span><div><b>{title}</b><small>{desc}</small></div><ChevronRight size={15} /></button>)}
          </div>
        </section>
      </div>

      {/* Keep existing workflow discoverable */}
      <div className="bs-workflow-strip">
        <button onClick={() => focusParcelOnMap('P005')}><Eye size={15} /> Inspect demo parcel P005</button>
        <button onClick={() => setCurrentView('subdivision')}><TrendingUp size={15} /> Subdivision workflow</button>
        <button onClick={() => setCurrentView('admin')}><ShieldCheck size={15} /> Officer approval desk</button>
        <button onClick={() => setCurrentView('settings')}><Search size={15} /> Platform settings</button>
      </div>
    </div>
  );
};
