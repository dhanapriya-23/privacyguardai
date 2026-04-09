import React from 'react';
import { ComplianceForm } from './components/ComplianceForm';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { ComplianceInput, ComplianceResult } from './types/compliance';
import { analyzeCompliance } from './lib/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<ComplianceResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFormSubmit = async (data: ComplianceInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const analysisResult = await analyzeCompliance(data);
      setResult(analysisResult);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze compliance. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">PrivacyGuard AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Compliance Guide</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Legal Resources</a>
            <Button variant="outline" size="sm">API Access</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="py-12"
          >
            <ComplianceForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            
            {error && (
              <div className="max-w-4xl mx-auto px-4 mt-4">
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                  <div className="text-center">
                    <p className="font-bold text-slate-900">AI Engine at Work</p>
                    <p className="text-sm text-slate-500">Mapping data practices to global regulations...</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="py-12"
          >
            <AnalysisDashboard result={result} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-semibold">PrivacyGuard AI &copy; 2026</span>
          </div>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
            <a href="#" className="hover:text-slate-600">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
