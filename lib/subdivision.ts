import { Parcel, ServiceRequest, SubdivisionChildProposal } from '../types/land';
import { P005_CHILD_PARCELS } from '../data/parcels';

export class SubdivisionService {
  /**
   * Submit a new citizen subdivision request
   */
  static createSubdivisionRequest(
    parentParcel: Parcel,
    applicantName: string,
    applicantContact: string,
    numberOfChildParcels: number,
    reason: string,
    childProposals: SubdivisionChildProposal[]
  ): ServiceRequest {
    const timestamp = new Date().toISOString().split('T')[0];
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const requestId = `SUB-2026-${randomSuffix}`;

    return {
      requestId,
      parcelId: parentParcel.parcelId,
      ulpin: parentParcel.ulpin,
      requestType: 'Subdivision',
      applicant: applicantName || 'Citizen Landholder (Demo)',
      applicantContact: applicantContact || '+91 98150-XXXXX',
      date: timestamp,
      status: 'Pending',
      details: {
        reason: reason || 'Statutory Land Subdivision & Inheritance Allocation',
        parentArea: parentParcel.area,
        numberOfChildParcels,
        childProposals,
        notes: 'Submitted via Citizen Land Portal. DGPS boundary verification requested.'
      }
    };
  }

  /**
   * Generate child parcels dynamically from parent geometry
   */
  static createChildParcels(
    parent: Parcel,
    childProposals: SubdivisionChildProposal[] = []
  ): Parcel[] {
    // If it is our primary demo parcel P005, return calibrated P005_CHILD_PARCELS
    if (parent.parcelId === 'P005') {
      return P005_CHILD_PARCELS;
    }

    // Dynamic child parcel generator for any other parcel:
    const numChildren = childProposals.length > 0 ? childProposals.length : 3;
    const parentCoords = parent.geometry.coordinates[0];
    
    // Find min and max lng, lat
    const lngs = parentCoords.map((c) => c[0]);
    const lats = parentCoords.map((c) => c[1]);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const width = maxLng - minLng;
    const step = width / numChildren;

    const childLetters = ['A', 'B', 'C', 'D', 'E'];
    const totalArea = parent.area;
    const defaultChildArea = Math.round(totalArea / numChildren);

    const generatedChildren: Parcel[] = [];

    for (let i = 0; i < numChildren; i++) {
      const letter = childLetters[i] || `X${i}`;
      const childLngStart = minLng + i * step;
      const childLngEnd = i === numChildren - 1 ? maxLng : minLng + (i + 1) * step;
      const proposal = childProposals[i];
      const area = proposal?.proposedArea || defaultChildArea;

      const childCentroidLat = (minLat + maxLat) / 2;
      const childCentroidLng = (childLngStart + childLngEnd) / 2;
      const insetLng = Math.min((childLngEnd - childLngStart) * 0.12, width * 0.08);
      const insetLat = Math.min((maxLat - minLat) * 0.10, (maxLat - minLat) * 0.08);
      const left = childLngStart + insetLng;
      const right = childLngEnd - insetLng;
      const bottom = minLat + insetLat;
      const top = maxLat - insetLat;
      const skew = ((i % 2 === 0 ? 1 : -1) * width * 0.035);

      generatedChildren.push({
        parcelId: `${parent.parcelId}-${letter}`,
        ulpin: `${parent.ulpin}-${letter}`,
        surveyNumber: `${parent.surveyNumber}-${letter}`,
        ownerId: `${parent.ownerId}${letter}`,
        area,
        landUse: parent.landUse,
        zone: parent.zone,
        status: 'Active',
        location: `${parent.location} (Subdivision Plot ${letter})`,
        parentParcelId: parent.parcelId,
        centroid: [childCentroidLat, childCentroidLng],
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [left, top],
            [right, top + skew],
            [right + skew * 0.35, bottom],
            [left - skew * 0.25, bottom + skew * 0.20],
            [left, top]
          ]]
        },
        createdDate: new Date().toISOString().split('T')[0]
      });
    }

    return generatedChildren;
  }

  /**
   * Admin Approval workflow:
   * 1. Marks request as 'Approved'
   * 2. Sets parent parcel status to 'Subdivided'
   * 3. Adds child parcels to state
   */
  static processApproval(
    requestId: string,
    currentParcels: Parcel[],
    currentRequests: ServiceRequest[],
    officerName: string = 'Sub-Divisional Magistrate (SDM) / Revenue Officer'
  ): {
    updatedParcels: Parcel[];
    updatedRequests: ServiceRequest[];
    newChildParcels: Parcel[];
    parentParcelId: string;
  } {
    const targetReq = currentRequests.find((r) => r.requestId === requestId);
    if (!targetReq) {
      throw new Error(`Request ${requestId} not found.`);
    }

    const parentParcel = currentParcels.find((p) => p.parcelId === targetReq.parcelId);
    if (!parentParcel) {
      throw new Error(`Parent parcel ${targetReq.parcelId} not found.`);
    }

    // Generate child parcels
    const childProposals = targetReq.details.childProposals || [];
    const childParcels = this.createChildParcels(parentParcel, childProposals);
    const childIds = childParcels.map((c) => c.parcelId);

    // Update parent parcel
    const updatedParent: Parcel = {
      ...parentParcel,
      status: 'Subdivided',
      childParcelIds: childIds,
      subdividedDate: new Date().toISOString().split('T')[0]
    };

    // Update parcel list: replace parent and append children
    const updatedParcels = currentParcels.map((p) => 
      p.parcelId === parentParcel.parcelId ? updatedParent : p
    );

    // Filter out existing child parcels if already partially present, then append
    const finalParcels = [
      ...updatedParcels.filter((p) => !childIds.includes(p.parcelId)),
      ...childParcels
    ];

    // Update request status
    const updatedRequests = currentRequests.map((r) => {
      if (r.requestId === requestId) {
        return {
          ...r,
          status: 'Approved' as const,
          details: {
            ...r.details,
            actionDate: new Date().toISOString().split('T')[0],
            officerName,
            notes: `Subdivision approved. Generated ${childParcels.length} child parcels (${childIds.join(', ')}).`
          }
        };
      }
      return r;
    });

    return {
      updatedParcels: finalParcels,
      updatedRequests,
      newChildParcels: childParcels,
      parentParcelId: parentParcel.parcelId
    };
  }

  /**
   * Admin Rejection workflow
   */
  static processRejection(
    requestId: string,
    rejectionReason: string,
    currentRequests: ServiceRequest[],
    officerName: string = 'Sub-Divisional Magistrate (SDM)'
  ): ServiceRequest[] {
    return currentRequests.map((r) => {
      if (r.requestId === requestId) {
        return {
          ...r,
          status: 'Rejected' as const,
          details: {
            ...r.details,
            rejectionReason: rejectionReason || 'Documentation discrepancy or spatial setback violation.',
            actionDate: new Date().toISOString().split('T')[0],
            officerName
          }
        };
      }
      return r;
    });
  }
}
