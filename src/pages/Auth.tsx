import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Sprout, Shield, Globe } from 'lucide-react';

const Auth = () => {
  const { t, i18n } = useTranslation();
  const { login } = useAuth();
  const [step, setStep] = useState<'language' | 'aadhaar' | 'otp' | 'onboarding'>('language');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    farmSize: '',
    primaryCrop: 'wheat'
  });

  const handleLanguageSelect = (lang: string) => {
    i18n.changeLanguage(lang);
    setStep('aadhaar');
  };

  const handleSendOtp = async () => {
    if (!aadhaarNumber || !consent) return;
    
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      setStep('onboarding');
    }, 1500);
  };

  const handleCompleteOnboarding = () => {
    // Complete registration
    login({
      aadhaarNumber,
      language: i18n.language,
      ...formData
    });
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sprout className="h-12 w-12 text-white mr-2" />
            <h1 className="text-3xl font-bold text-white">{t('auth.title')}</h1>
          </div>
          <p className="text-white/80 text-lg">{t('auth.subtitle')}</p>
        </div>

        <Card className="shadow-agricultural">
          <CardHeader>
            <CardTitle className="text-center">
              {step === 'language' && t('auth.selectLanguage')}
              {step === 'aadhaar' && t('auth.loginWithAadhaar')}
              {step === 'otp' && t('auth.verifyOtp')}
              {step === 'onboarding' && t('onboarding.farmSetup')}
            </CardTitle>
            {(step === 'aadhaar' || step === 'otp') && (
              <CardDescription className="text-center">
                <Shield className="h-4 w-4 inline mr-2" />
                {t('auth.privacyNote')}
              </CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="space-y-4">
            {step === 'language' && (
              <div className="space-y-3">
                <Button 
                  variant="farmer" 
                  size="xl" 
                  className="w-full"
                  onClick={() => handleLanguageSelect('en')}
                >
                  <Globe className="mr-2 h-5 w-5" />
                  {t('auth.english')}
                </Button>
                <Button 
                  variant="harvest" 
                  size="xl" 
                  className="w-full"
                  onClick={() => handleLanguageSelect('hi')}
                >
                  <Globe className="mr-2 h-5 w-5" />
                  {t('auth.hindi')}
                </Button>
              </div>
            )}

            {step === 'aadhaar' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('auth.aadhaarNumber')}</label>
                  <Input 
                    type="text"
                    placeholder={t('auth.enterAadhaar')}
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    maxLength={12}
                    className="text-center text-lg tracking-wider"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="consent" 
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                  />
                  <label htmlFor="consent" className="text-sm">
                    {t('auth.consent')}
                  </label>
                </div>

                <Button 
                  variant="farmer" 
                  size="lg" 
                  className="w-full"
                  onClick={handleSendOtp}
                  disabled={!aadhaarNumber || !consent || loading}
                >
                  {loading ? t('common.loading') : t('auth.sendOtp')}
                </Button>
              </div>
            )}

            {step === 'otp' && (
              <div className="space-y-4">
                <div>
                  <Input 
                    type="text"
                    placeholder={t('auth.enterOtp')}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-center text-xl tracking-widest"
                  />
                </div>

                <Button 
                  variant="farmer" 
                  size="lg" 
                  className="w-full"
                  onClick={handleVerifyOtp}
                  disabled={!otp || loading}
                >
                  {loading ? t('common.loading') : t('auth.verifyOtp')}
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleSendOtp()}
                >
                  {t('auth.resendOtp')}
                </Button>
              </div>
            )}

            {step === 'onboarding' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('onboarding.location')}</label>
                  <Input 
                    placeholder={t('onboarding.enterLocation')}
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">{t('onboarding.farmSize')}</label>
                  <Input 
                    type="number"
                    placeholder={t('onboarding.enterFarmSize')}
                    value={formData.farmSize}
                    onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">{t('onboarding.cropType')}</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={formData.primaryCrop}
                    onChange={(e) => setFormData({...formData, primaryCrop: e.target.value})}
                  >
                    <option value="wheat">{t('crops.wheat')}</option>
                    <option value="rice">{t('crops.rice')}</option>
                    <option value="corn">{t('crops.corn')}</option>
                    <option value="sugarcane">{t('crops.sugarcane')}</option>
                  </select>
                </div>

                <Button 
                  variant="farmer" 
                  size="lg" 
                  className="w-full"
                  onClick={handleCompleteOnboarding}
                >
                  {t('onboarding.getStarted')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;