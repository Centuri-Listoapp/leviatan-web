export type LoyaltyStatus = "GREEN" | "YELLOW" | "RED";

export interface RelationshipChartData {
  relationshipChart: RelationshipChart;
}

export interface RelationshipChart {
  person: RelationshipPerson;
  candidate: { id: string; fullName: string };
  // null cuando la grabación todavía no tiene interacciones.
  currentLoyaltyIndex: number | null;
  currentStatus: LoyaltyStatus | null;
  interactions: RelationshipInteraction[];
}

export interface RelationshipPerson {
  fullName: string;
  code: string;
  votingCenterName?: string | null;
}

export interface RelationshipInteraction {
  id: string;
  date: string;
  loyaltyIndex: number;
  label: string;
  status: LoyaltyStatus;
}
