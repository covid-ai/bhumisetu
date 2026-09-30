import { Parcel } from '../types/land';
import { DEMO_OWNERS, getOwnerById } from '../data/owners';

export interface SearchResult {
  parcel: Parcel;
  matchedBy: 'ulpin' | 'parcelId' | 'surveyNumber' | 'ownerName';
  matchDetail: string;
  ownerName: string;
}

export class SearchService {
  /**
   * Universal search across ULPIN, Parcel ID, Survey Number, and Owner Name
   */
  static search(query: string, parcels: Parcel[]): SearchResult[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResult[] = [];

    for (const parcel of parcels) {
      const owner = getOwnerById(parcel.ownerId);
      const ownerName = owner.name;

      if (parcel.ulpin.toLowerCase().includes(q)) {
        results.push({
          parcel,
          matchedBy: 'ulpin',
          matchDetail: `ULPIN: ${parcel.ulpin}`,
          ownerName
        });
      } else if (parcel.parcelId.toLowerCase() === q || parcel.parcelId.toLowerCase().includes(q)) {
        results.push({
          parcel,
          matchedBy: 'parcelId',
          matchDetail: `Parcel ID: ${parcel.parcelId}`,
          ownerName
        });
      } else if (parcel.surveyNumber.toLowerCase().includes(q)) {
        results.push({
          parcel,
          matchedBy: 'surveyNumber',
          matchDetail: `Survey No: ${parcel.surveyNumber}`,
          ownerName
        });
      } else if (ownerName.toLowerCase().includes(q)) {
        results.push({
          parcel,
          matchedBy: 'ownerName',
          matchDetail: `Owner: ${ownerName}`,
          ownerName
        });
      }
    }

    return results;
  }
}
