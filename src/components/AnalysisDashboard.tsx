import React from 'react';
import { ComplianceResult } from '@/src/types/compliance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ReactMarkdown from 'react-markdown';
import { AlertCircle, CheckCircle2, FileText, Gavel, RefreshCw, ShieldAlert } from 'lucide-react';

interface AnalysisDashboardProps {
  result: ComplianceResult;
  onReset: () => void;
}

export function AnalysisDashboard({ result, onReset }: AnalysisDashboardProps) {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Compliance Report</h1>
          <p className="text-slate-500">Generated based on your business profile and data practices.</p>
        </div>
        <button 
          onClick={onReset}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4"
        >
          Start New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Summary & Gaps */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-slate-700" />
                <CardTitle>Applicable Laws</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {result.analysis.applicableLaws.map((law, i) => (
                <div key={i} className="space-y-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {law.name}
                  </Badge>
                  <p className="text-sm text-slate-600 leading-relaxed">{law.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-red-100 shadow-sm bg-red-50/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <CardTitle className="text-red-900">Risk & Gaps</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-red-700">Critical Risks</p>
                <ul className="space-y-2">
                  {result.analysis.riskAreas.map((risk, i) => (
                    <li key={i} className="flex gap-2 text-sm text-red-800">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2 pt-4 border-t border-red-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Actionable Fixes</p>
                <ul className="space-y-2">
                  {result.gapReport.map((gap, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Policies & Simulation */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="privacy" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="privacy" className="flex gap-2">
                <FileText className="w-4 h-4" /> Privacy Policy
              </TabsTrigger>
              <TabsTrigger value="tos" className="flex gap-2">
                <FileText className="w-4 h-4" /> Terms of Service
              </TabsTrigger>
              <TabsTrigger value="simulation" className="flex gap-2">
                <RefreshCw className="w-4 h-4" /> Policy Update
              </TabsTrigger>
            </TabsList>

            <TabsContent value="privacy">
              <Card className="border-slate-200 shadow-sm">
                <ScrollArea className="h-[600px] p-6">
                  <div className="prose prose-slate prose-sm max-w-none">
                    <ReactMarkdown>{result.privacyPolicy}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="tos">
              <Card className="border-slate-200 shadow-sm">
                <ScrollArea className="h-[600px] p-6">
                  <div className="prose prose-slate prose-sm max-w-none">
                    <ReactMarkdown>{result.termsOfService}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="simulation">
              <Card className="border-blue-100 shadow-sm bg-blue-50/20">
                <CardHeader>
                  <CardTitle className="text-blue-900">Regulation Update Simulation</CardTitle>
                  <CardDescription>
                    Simulating impact of: <strong>{result.updateSimulation?.regulation}</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 text-slate-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <ReactMarkdown 
                      components={{
                        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                        h3: ({ children }) => <h3 className="text-blue-400 font-bold mb-2">{children}</h3>,
                        code: ({ children }) => <code className="bg-slate-800 px-1 rounded">{children}</code>
                      }}
                    >
                      {result.updateSimulation?.changes || "No simulation data available."}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs text-center">
        <strong>Disclaimer:</strong> This tool provides AI-generated compliance guidance and policy templates. It is not a substitute for professional legal advice. Always have your policies reviewed by a qualified legal professional before deployment.
      </div>
    </div>
  );
}
