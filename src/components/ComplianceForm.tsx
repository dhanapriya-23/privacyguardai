import React from 'react';
import { ComplianceInput } from '@/src/types/compliance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Database, Users, ExternalLink } from 'lucide-react';

interface ComplianceFormProps {
  onSubmit: (data: ComplianceInput) => void;
  isLoading: boolean;
}

export function ComplianceForm({ onSubmit, isLoading }: ComplianceFormProps) {
  const [formData, setFormData] = React.useState<ComplianceInput>({
    profile: {
      companyName: '',
      productType: 'SaaS',
      regions: [],
    },
    lifecycle: {
      collected: '',
      sources: '',
      storageLocation: '',
      sharingPractices: '',
      retentionPeriod: '',
    },
    interaction: {
      loginRequired: false,
      paymentsInvolved: false,
      targetUsers: 'Adults',
    },
    thirdParties: {
      apis: '',
      paymentProcessors: '',
      analytics: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">PrivacyGuard AI</h1>
        <p className="text-slate-500">Generate professional compliance reports and policies in seconds.</p>
      </div>

      {/* Business Profile */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <CardTitle>Business Profile</CardTitle>
          </div>
          <CardDescription>Basic information about your company and operations.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input 
              id="companyName" 
              placeholder="e.g. Acme Corp" 
              value={formData.profile.companyName}
              onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, companyName: e.target.value } })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="productType">Product Type</Label>
              <Select 
                value={formData.profile.productType}
                onValueChange={(value: any) => setFormData({ ...formData, profile: { ...formData.profile, productType: value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="AI Platform">AI Platform</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="regions">Regions (comma separated)</Label>
              <Input 
                id="regions" 
                placeholder="e.g. USA, EU, India" 
                onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, regions: e.target.value.split(',').map(s => s.trim()) } })}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Lifecycle */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <CardTitle>Data Lifecycle</CardTitle>
          </div>
          <CardDescription>How you collect, store, and manage user data.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="collected">Data Collected</Label>
            <Textarea 
              id="collected" 
              placeholder="e.g. Name, Email, IP Address, Usage Data" 
              value={formData.lifecycle.collected}
              onChange={(e) => setFormData({ ...formData, lifecycle: { ...formData.lifecycle, collected: e.target.value } })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sources">Data Sources</Label>
              <Input 
                id="sources" 
                placeholder="e.g. User Input, Cookies" 
                value={formData.lifecycle.sources}
                onChange={(e) => setFormData({ ...formData, lifecycle: { ...formData.lifecycle, sources: e.target.value } })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="storage">Storage Location</Label>
              <Input 
                id="storage" 
                placeholder="e.g. AWS US-East-1" 
                value={formData.lifecycle.storageLocation}
                onChange={(e) => setFormData({ ...formData, lifecycle: { ...formData.lifecycle, storageLocation: e.target.value } })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sharing">Sharing Practices</Label>
              <Input 
                id="sharing" 
                placeholder="e.g. No third-party sharing" 
                value={formData.lifecycle.sharingPractices}
                onChange={(e) => setFormData({ ...formData, lifecycle: { ...formData.lifecycle, sharingPractices: e.target.value } })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="retention">Retention Period</Label>
              <Input 
                id="retention" 
                placeholder="e.g. 2 years after account closure" 
                value={formData.lifecycle.retentionPeriod}
                onChange={(e) => setFormData({ ...formData, lifecycle: { ...formData.lifecycle, retentionPeriod: e.target.value } })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Interaction */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <CardTitle>User Interaction</CardTitle>
          </div>
          <CardDescription>How users interact with your platform.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="login" 
                className="w-4 h-4" 
                checked={formData.interaction.loginRequired}
                onChange={(e) => setFormData({ ...formData, interaction: { ...formData.interaction, loginRequired: e.target.checked } })}
              />
              <Label htmlFor="login">Login Required</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="payments" 
                className="w-4 h-4" 
                checked={formData.interaction.paymentsInvolved}
                onChange={(e) => setFormData({ ...formData, interaction: { ...formData.interaction, paymentsInvolved: e.target.checked } })}
              />
              <Label htmlFor="payments">Payments Involved</Label>
            </div>
            <div className="grid gap-2">
              <Select 
                value={formData.interaction.targetUsers}
                onValueChange={(value: any) => setFormData({ ...formData, interaction: { ...formData.interaction, targetUsers: value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Target Users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Adults">Adults</SelectItem>
                  <SelectItem value="Children">Children</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Third Parties */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-orange-600" />
            <CardTitle>Third Parties</CardTitle>
          </div>
          <CardDescription>External services integrated into your product.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="apis">APIs / SDKs</Label>
            <Input 
              id="apis" 
              placeholder="e.g. Google Maps, Twilio" 
              value={formData.thirdParties.apis}
              onChange={(e) => setFormData({ ...formData, thirdParties: { ...formData.thirdParties, apis: e.target.value } })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="paymentProcessors">Payment Processors</Label>
              <Input 
                id="paymentProcessors" 
                placeholder="e.g. Stripe, PayPal" 
                value={formData.thirdParties.paymentProcessors}
                onChange={(e) => setFormData({ ...formData, thirdParties: { ...formData.thirdParties, paymentProcessors: e.target.value } })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="analytics">Analytics / Ads</Label>
              <Input 
                id="analytics" 
                placeholder="e.g. Google Analytics, Mixpanel" 
                value={formData.thirdParties.analytics}
                onChange={(e) => setFormData({ ...formData, thirdParties: { ...formData.thirdParties, analytics: e.target.value } })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Analyzing Compliance..." : "Generate Compliance Report"}
      </Button>
    </form>
  );
}
