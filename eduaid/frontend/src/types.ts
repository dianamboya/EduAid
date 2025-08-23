
export type Lifecycle = "pending" | "verified" | "sponsored" | "completed" | "revoked";
export type Need = "fees" | "pads" | "books" | "uniforms" | "mentorship";

export interface StudentProfile {
  id: number;
  principal: string; // text repr of principal
  full_name: string;
  school: string;
  county: string;
  date_of_birth: string; // ISO date
  guardian_contact?: string;
  needs: Need[];
  lifecycle: Lifecycle;
  created_at: bigint;
  updated_at: bigint;
  verifier?: string;
  sbt_token_id?: string;
  meta_hash?: string;
}

export interface FundingProgress {
  percent: number; // 0..100
  totalMinor: number; // sum of donations in minor units
  currency: string;
}
