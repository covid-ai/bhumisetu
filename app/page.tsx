'use client';

import React, { useEffect, useState } from 'react';
import { useLandStack } from '../context/LandStackContext';
import { Sidebar } from '../components/ui/Sidebar';
import { AppHeader } from '../components/ui/AppHeader';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { BhoomiSetuHero } from '../components/dashboard/BhoomiSetuHero';
import { GISMapView } from '../components/map/GISMapView';
import { MyParcelsView } from '../components/parcel/MyParcelsView';
import { ServiceRequestsView } from '../components/services/ServiceRequestsView';
import { SubdivisionPortalView } from '../components/subdivision/SubdivisionPortalView';
import { LandRecordsTable } from '../components/parcel/LandRecordsTable';
import { AnalyticsReportsView } from '../components/analytics/AnalyticsReportsView';
import { AdminSubdivisionApproval } from '../components/admin/AdminSubdivisionApproval';
import { SettingsView } from '../components/settings/SettingsView';
import { DocumentViewerModal } from '../components/parcel/DocumentViewerModal';

export default function HomePage() {
  const { currentView, activeDocumentModal, setActiveDocumentModal, setCurrentView } = useLandStack();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const analytics = () => setCurrentView('analytics');
    const records = () => setCurrentView('land-records');
    window.addEventListener('landstack-open-analytics', analytics);
    window.addEventListener('landstack-open-records', records);
    return () => {
      window.removeEventListener('landstack-open-analytics', analytics);
      window.removeEventListener('landstack-open-records', records);
    };
  }, [setCurrentView]);

  return (
    <div className="bs-app-shell">
      <AppHeader
        isSidebarOpen={isMobileSidebarOpen}
        onToggleSidebar={() => setIsMobileSidebarOpen(v => !v)}
      />
      {currentView === 'dashboard' && <BhoomiSetuHero />}
      <div className="bs-body">
        <Sidebar isOpen={isMobileSidebarOpen} onCloseMobile={() => setIsMobileSidebarOpen(false)} />
        <main className={`bs-main ${currentView === 'map' ? 'map-main' : ''} ${currentView === 'dashboard' ? 'dashboard-main' : ''}`}>
          {currentView === 'dashboard' && <DashboardOverview />}
          {currentView === 'map' && <GISMapView />}
          {currentView === 'my-parcels' && <MyParcelsView />}
          {currentView === 'service-requests' && <ServiceRequestsView />}
          {currentView === 'subdivision' && <SubdivisionPortalView />}
          {currentView === 'land-records' && <LandRecordsTable />}
          {currentView === 'analytics' && <AnalyticsReportsView />}
          {currentView === 'admin' && <AdminSubdivisionApproval />}
          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>
      <DocumentViewerModal document={activeDocumentModal} onClose={() => setActiveDocumentModal(null)} />
    </div>
  );
}
