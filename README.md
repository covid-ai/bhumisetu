# Land Stack – Integrated Land Governance Platform (India DPI Prototype)

A full-stack hackathon prototype demonstrating integrated digital land governance in India. Built with Next.js, React, TypeScript, Tailwind CSS, Leaflet, and OpenStreetMap.

> **DEMO DATA DISCLAIMER:**
> *Parcel boundaries, ownership information, ULPINs, records, and service statuses shown in this prototype are simulated demonstration data and are not official government land records.*

---

## 🌟 Core Architecture & Idea

* **Real OpenStreetMap Basemap:** Live interactive OpenStreetMap centered on Chandigarh, India (`30.7250° N, 76.7835° E`).
* **Simulated Cadastral Layer:** 25+ realistic cadastral parcels modeled in GeoJSON with unique Parcel IDs (`P001`–`P025`), 14-digit Bhu-Aadhaar ULPINs (`IN-CH-DEMO-000001`–`IN-CH-DEMO-000025`), and survey numbers.
* **End-to-End Statutory Subdivision Workflow:**
  $$\text{Real Map} \rightarrow \text{Click P005} \rightarrow \text{Inspect ULPIN} \rightarrow \text{Apply for Subdivision} \rightarrow \text{Admin SDM Approval} \rightarrow \text{Generate Child Parcels (P005-A, B, C)}$$
* **Indian Digital Public Infrastructure (DPI) Aesthetics:** Designed in accordance with Indian e-governance standards (dark navy sidebar, Bhu-Aadhaar badges, tricolor touches, and high-contrast accessibility).
* **Future-Ready Database Architecture:** Modular service layer (`lib/parcelService.ts`, `lib/subdivision.ts`) ready to connect to PostgreSQL / PostGIS / Supabase without frontend rewrites.

---

## 🚀 Quick Start (Local Setup)

The application runs locally with zero external database dependencies:

```bash
# 1. Navigate to the project directory
cd "C:\Users\Admin\.gemini\antigravity\scratch\land-stack"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📋 The 17-Step Hackathon Demonstration Script

Follow this step-by-step walkthrough during presentations:

1. **Step 1 - Open Dashboard:** View high-level metrics (Total Parcels, Verified Titles, Pending Petitions, Disputed Parcels) and the quick map preview.
2. **Step 2 - Navigate to GIS Map:** Click **"GIS Cadastral Map"** on the dark navy sidebar.
3. **Step 3 - Real OpenStreetMap Basemap:** Observe the live interactive Chandigarh basemap (supports pan, zoom, layer controls, and ESRI satellite toggle).
4. **Step 4 - Cadastral Parcel Polygons:** View 25+ simulated cadastral plots overlaying the map with real coordinates.
5. **Step 5 - Click Parcel `P005`:** Click parcel `P005` (or use the helper button or search bar).
6. **Step 6 - Highlight Parcel:** `P005` lights up with a prominent saffron/orange border and tooltip.
7. **Step 7 - Parcel Details Panel Opens:** The right-side drawer opens showing the ULPIN (`IN-CH-DEMO-000005`), Survey No. (`45/2`), and Area (`10,000 sq.ft.`).
8. **Step 8 - Inspect Ownership & Legal Records:**
   * Owner: Amit Sharma (Demo)
   * RoR (Record of Rights / Jamabandi): Verified – Demo
   * Registration Deed: Registered – Demo
   * Building Permission: Approved – Demo
   * Mortgage: None / Clear Title – Demo
   * Property Tax: Paid – Demo
9. **Step 9 - History & Genealogy Tab:** Click **"History & Tree"** to view the mutation timeline (2010 to 2026) and parcel lineage.
10. **Step 10 - Documents & AI Intelligence Tabs:**
    * Click **"Documents"** and click **"View Demo Document"** to inspect a simulated Jamabandi or Sale Deed with digital seals and watermarks.
    * Click **"AI Intel"** to see automated spatial compliance, zoning FAR rules, and infrastructure proximity.
11. **Step 11 - Apply for Subdivision:** Click the **"Apply for Subdivision"** button. The partition petition modal opens.
12. **Step 12 - Submit Petition:**
    * Parent Area: 10,000 sq.ft.
    * Configure 3 child parcels: Child 1 (3,000 sq.ft.), Child 2 (3,000 sq.ft.), Child 3 (4,000 sq.ft.).
    * Submit petition; a tracking docket (`SUB-2026-0001`) is generated with status `Pending Review`.
13. **Step 13 - Switch to Admin Portal:** Click **"Admin Approval Desk"** in the sidebar.
14. **Step 14 - Admin Approves Petition:** The SDM inspects docket `SUB-2026-0001` and clicks **"Approve & Subdivide"**.
15. **Step 15 - Child Parcels Generated:** The parent parcel `P005` status updates to `SUBDIVIDED` and 3 child parcels (`P005-A`, `P005-B`, `P005-C`) are generated with distinct geometries.
16. **Step 16 - Child Parcels Appear on GIS Map:** Return to **GIS Cadastral Map**. The parent plot is replaced by the 3 green-bordered child plots.
17. **Step 17 - Inspect Child Parcel:** Click `P005-A`. The details panel opens displaying its new ULPIN (`IN-CH-DEMO-000005-A`), area (`3,000 sq.ft.`), and a link to its parent parcel lineage!

---

## 📂 Project Organization

```text
land-stack/
├── app/
│   ├── globals.css                # Tailwind CSS + Leaflet styles
│   ├── layout.tsx                 # Root layout with LandStackProvider
│   └── page.tsx                   # View controller (Dashboard, Map, Admin, etc.)
├── components/
│   ├── map/
│   │   ├── LandMap.tsx            # Dynamic SSR-safe Leaflet container
│   │   ├── LeafletMapInner.tsx    # Leaflet MapContainer, TileLayer & controls
│   │   ├── ParcelLayer.tsx        # GeoJSON Cadastral Polygon renderer & highlighter
│   │   ├── InfrastructureLayer.tsx# Schools, hospitals, roads, utilities markers
│   │   └── MapControls.tsx        # Layer switcher (Cadastral, Land Use, Satellite)
│   ├── parcel/
│   │   ├── ParcelDetailsPanel.tsx # Right-side slide-over details panel
│   │   ├── ParcelInfoTab.tsx      # Core specs, ownership, RoR & tax info
│   │   ├── ParcelHistoryTab.tsx   # Mutation timeline & genealogy visual tree
│   │   ├── ParcelDocumentsTab.tsx # Demo legal certificates & deeds list
│   │   ├── ParcelNearbyTab.tsx    # Proximity to roads, utilities, civic infra
│   │   ├── ParcelAITab.tsx        # AI Land Intelligence & Master Plan checks
│   │   ├── ParcelGenealogy.tsx    # Visual lifecycle tree (Parent -> Children)
│   │   ├── DocumentViewerModal.tsx# Digital revenue certificate viewer modal
│   │   ├── MyParcelsView.tsx      # Citizen landholder portal view
│   │   └── LandRecordsTable.tsx   # Searchable master registry table
│   ├── subdivision/
│   │   ├── SubdivisionRequestModal.tsx # Citizen partition application form
│   │   └── SubdivisionPortalView.tsx   # Workflow overview & petition tracker
│   ├── admin/
│   │   └── AdminSubdivisionApproval.tsx # SDM revenue officer approval desk
│   ├── dashboard/
│   │   └── DashboardOverview.tsx  # Metrics cards, quick map, recent petitions
│   ├── analytics/
│   │   └── AnalyticsReportsView.tsx# Zoning distributions, KPI performance charts
│   ├── settings/
│   │   └── SettingsView.tsx       # Reset demo state & PostGIS DDL schema
│   └── ui/
│       ├── AppHeader.tsx          # Global multi-attribute search & demo banner
│       └── Sidebar.tsx            # Indian DPI dark navy navigation sidebar
├── data/
│   ├── parcels.ts                 # 25 realistic GeoJSON parcels in Chandigarh
│   ├── owners.ts                  # Simulated citizen ownership dataset
│   ├── legalAdmin.ts              # RoR, building permissions, property tax
│   ├── documents.ts               # Simulated statutory revenue deeds
│   ├── history.ts                 # Cadastral mutation events timeline
│   ├── infrastructure.ts          # Physical roads, schools, hospitals, utilities
│   └── serviceRequests.ts         # Initial service request queue
├── lib/
│   ├── parcelService.ts           # Modular query service (database-ready)
│   ├── subdivision.ts             # Geometry split calculation & approval engine
│   └── search.ts                  # Universal search by ULPIN, survey no, owner
├── types/
│   └── land.ts                    # TypeScript interfaces for all land models
└── context/
    └── LandStackContext.tsx       # Centralized reactive state provider
```

---

## 🛡️ Future Database Integration (PostgreSQL + PostGIS)

To connect Supabase or PostgreSQL:
1. Enable PostGIS: `CREATE EXTENSION postgis;`
2. Create tables for `cadastral_parcels`, `owners`, `service_requests`, and `documents`.
3. In `lib/parcelService.ts`, replace in-memory array filters with SQL/Prisma/Supabase queries:
   ```typescript
   // Example future query
   const { data } = await supabase.from('cadastral_parcels').select('*');
   ```
4. All frontend components consume data strictly through `lib/parcelService.ts` and `context/LandStackContext.tsx`, requiring zero UI rewrites.


## Demo Accounts

This prototype now uses exactly six demo accounts; previous `admin.demo` and `citizen.demo` credentials are removed.

### Admin / SDM
- Deepak — `deepak.admin` / `DEEPAK123`
- Krushna — `krushna.admin` / `KRUSHNA123`

### Citizen
- Shubham — `shubham.citizen` / `SHUBHAM123`
- Pawan — `pawan.citizen` / `PAWAN123`
- Preeti — `preeti.citizen` / `PREETI123`
- Shreya — `shreya.citizen` / `SHREYA123`

These are presentation-only demo credentials, not real authentication.
