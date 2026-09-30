import { Parcel, ParcelHistoryEvent, ParcelDocument, LegalAdministrativeInfo, Owner } from '../types/land';
import { INITIAL_PARCELS, P005_CHILD_PARCELS } from '../data/parcels';
import { getOwnerById } from '../data/owners';
import { getLegalAdminByParcelId } from '../data/legalAdmin';
import { getDocumentsByParcelId } from '../data/documents';
import { getHistoryByParcelId } from '../data/history';

// Service layer designed for seamless migration to Supabase/PostgreSQL/PostGIS later.
// Currently serves simulated mock land records.

export class ParcelService {
  /**
   * Retrieve all parcels (including active subdivided child parcels)
   */
  static getParcels(activeParcels: Parcel[] = INITIAL_PARCELS): Parcel[] {
    return activeParcels;
  }

  /**
   * Get single parcel by Parcel ID (e.g. "P005" or "P005-A")
   */
  static getParcelById(parcelId: string, parcelList: Parcel[] = INITIAL_PARCELS): Parcel | undefined {
    return parcelList.find((p) => p.parcelId.toLowerCase() === parcelId.toLowerCase());
  }

  /**
   * Get parcel by ULPIN (e.g. "IN-CH-DEMO-000005")
   */
  static getParcelByULPIN(ulpin: string, parcelList: Parcel[] = INITIAL_PARCELS): Parcel | undefined {
    const clean = ulpin.trim().toLowerCase();
    return parcelList.find((p) => p.ulpin.toLowerCase() === clean);
  }

  /**
   * Fetch owner details for a given owner ID
   */
  static getParcelOwner(ownerId: string): Owner {
    return getOwnerById(ownerId);
  }

  /**
   * Fetch Legal & Administrative records (RoR, Tax, Encumbrance, etc.)
   */
  static getParcelLegalAdmin(parcelId: string): LegalAdministrativeInfo {
    return getLegalAdminByParcelId(parcelId);
  }

  /**
   * Fetch Documents list for a parcel
   */
  static getParcelDocuments(parcelId: string): ParcelDocument[] {
    return getDocumentsByParcelId(parcelId);
  }

  /**
   * Fetch Historical Timeline events for a parcel
   */
  static getParcelHistory(parcelId: string): ParcelHistoryEvent[] {
    return getHistoryByParcelId(parcelId);
  }

  /**
   * Get simulated AI Land Intelligence analysis
   */
  static getAIInsights(parcel: Parcel) {
    const isDisputed = parcel.status === 'Disputed';
    const isSubdivided = parcel.status === 'Subdivided';

    return {
      landUseCompliance: {
        status: isDisputed ? ('Warning' as const) : ('Compliant' as const),
        details: isDisputed 
          ? 'Spatial overlay flagged pending court injunction note in revenue ledger.'
          : `Fully compliant with Master Plan Chandigarh 2031 under ${parcel.zone}. No encroached demo buffer detected.`
      },
      documentCompleteness: {
        ratio: isDisputed ? '2/5' : '5/5',
        score: isDisputed ? 40 : 100,
        details: isDisputed
          ? 'Clear title certificate is encumbered; building sanction withheld.'
          : 'All essential statutory records (RoR, Sale Deed, GIS Naksha, Tax Receipt, Sanction) verified.'
      },
      developmentInsight: {
        status: isDisputed ? ('Restricted' as const) : ('Favorable' as const),
        details: isDisputed
          ? 'No further construction or partition permissible until dispute clearance.'
          : `${parcel.landUse} development parameters optimal. Permissible FAR 1:2.0 with front setback 15ft.`
      },
      infrastructureProximity: {
        roadDistance: '35m to sectoral road, 120m to arterial Purv Marg',
        utilitiesDistance: 'Dual feeder electricity within 410m; water boosting within 380m',
        details: 'High-connectivity civic quadrant with storm-water drainage alignment.'
      }
    };
  }
}
