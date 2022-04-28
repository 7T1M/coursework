export interface IClaimData {
  id: number;
  claimId: number;
  title: string;
  email: string;
  address: string;
  urlPreview?: string;
  description: string;
  claimType: number;
  status: number | string;
  rate: number;
}
