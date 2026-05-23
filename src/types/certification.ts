export interface Certification {
  certification: string;
  meaning: string;
  order: number;
}

export interface CertificationsResponse {
  certifications: Record<string, Certification[]>;
}
