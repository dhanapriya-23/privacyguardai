export interface BusinessProfile {
  companyName: string;
  productType: 'SaaS' | 'Mobile App' | 'E-commerce' | 'AI Platform' | 'Other';
  regions: string[];
}

export interface DataLifecycle {
  collected: string;
  sources: string;
  storageLocation: string;
  sharingPractices: string;
  retentionPeriod: string;
}

export interface UserInteraction {
  loginRequired: boolean;
  paymentsInvolved: boolean;
  targetUsers: 'Adults' | 'Children' | 'Mixed';
}

export interface ThirdParties {
  apis: string;
  paymentProcessors: string;
  analytics: string;
}

export interface ComplianceInput {
  profile: BusinessProfile;
  lifecycle: DataLifecycle;
  interaction: UserInteraction;
  thirdParties: ThirdParties;
}

export interface ComplianceAnalysis {
  applicableLaws: {
    name: string;
    reason: string;
  }[];
  riskAreas: string[];
  missingElements: string[];
}

export interface PolicyUpdate {
  regulation: string;
  changes: string;
}

export interface ComplianceResult {
  analysis: ComplianceAnalysis;
  privacyPolicy: string;
  termsOfService: string;
  gapReport: string[];
  updateSimulation?: PolicyUpdate;
}
