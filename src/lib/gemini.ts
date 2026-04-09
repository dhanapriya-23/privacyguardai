import { GoogleGenAI, Type } from "@google/genai";
import { ComplianceInput, ComplianceResult } from "../types/compliance";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `You are an AI-powered Privacy Compliance Engine. 
Your goal is to analyze business operations and data practices, map them against global privacy regulations, identify gaps, and generate legal documents.

You must provide a JSON response following this structure:
{
  "analysis": {
    "applicableLaws": [{ "name": "string", "reason": "string" }],
    "riskAreas": ["string"],
    "missingElements": ["string"]
  },
  "privacyPolicy": "markdown string",
  "termsOfService": "markdown string",
  "gapReport": ["string"],
  "updateSimulation": {
    "regulation": "string",
    "changes": "markdown string (diff-style)"
  }
}

Be precise, structured, and legally aware. Separate global vs jurisdiction-specific rules.`;

export async function analyzeCompliance(input: ComplianceInput): Promise<ComplianceResult> {
  const prompt = `
    Analyze the following business for privacy compliance:
    
    Business Profile:
    - Company Name: ${input.profile.companyName}
    - Product Type: ${input.profile.productType}
    - Regions: ${input.profile.regions.join(", ")}
    
    Data Lifecycle:
    - Collected: ${input.lifecycle.collected}
    - Sources: ${input.lifecycle.sources}
    - Storage: ${input.lifecycle.storageLocation}
    - Sharing: ${input.lifecycle.sharingPractices}
    - Retention: ${input.lifecycle.retentionPeriod}
    
    User Interaction:
    - Login Required: ${input.interaction.loginRequired ? "Yes" : "No"}
    - Payments: ${input.interaction.paymentsInvolved ? "Yes" : "No"}
    - Target Users: ${input.interaction.targetUsers}
    
    Third Parties:
    - APIs: ${input.thirdParties.apis}
    - Payments: ${input.thirdParties.paymentProcessors}
    - Analytics: ${input.thirdParties.analytics}
    
    Tasks:
    1. Compliance Analysis (GDPR, CCPA, etc.)
    2. Generate Privacy Policy (Markdown)
    3. Generate Terms of Service (Markdown)
    4. Compliance Gap Report
    5. Simulate an update: "India introduces stricter consent rules under DPDP Act"
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    },
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as ComplianceResult;
}
