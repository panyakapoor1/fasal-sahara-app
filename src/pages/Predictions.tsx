import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PredictionCard from '@/components/PredictionCard';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Upload, Cpu, Sprout } from 'lucide-react';

// Mock prediction data
const mockPrediction = {
  predictedYield: 4.2,
  confidence: 0.84,
  irrigationRecommendation: "Apply 20mm in next 3 days",
  fertilizerRecommendation: "Urea 30kg/ha at tillering stage",
  pestAlert: {
    probability: 0.12,
    notes: "Monitor for aphids"
  },
  weeklyPlan: [
    { day: "Monday", task: "Check soil moisture", priority: "high" as const },
    { day: "Wednesday", task: "Apply fertilizer", priority: "medium" as const },
    { day: "Friday", task: "Pest inspection", priority: "low" as const },
    { day: "Sunday", task: "Weather monitoring", priority: "medium" as const }
  ]
};

const Predictions = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [soilData, setSoilData] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    notes: ''
  });

  const handleSubmitSoilData = () => {
    // In production, this would send data to ML service
    console.log('Soil data submitted:', soilData);
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setShowForm(false)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="shadow-agricultural">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Soil Test Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">pH Level</label>
                  <Input 
                    type="number"
                    step="0.1"
                    placeholder="6.5"
                    value={soilData.ph}
                    onChange={(e) => setSoilData({...soilData, ph: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Nitrogen (kg/ha)</label>
                  <Input 
                    type="number"
                    placeholder="120"
                    value={soilData.nitrogen}
                    onChange={(e) => setSoilData({...soilData, nitrogen: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phosphorus (kg/ha)</label>
                  <Input 
                    type="number"
                    placeholder="25"
                    value={soilData.phosphorus}
                    onChange={(e) => setSoilData({...soilData, phosphorus: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Potassium (kg/ha)</label>
                  <Input 
                    type="number"
                    placeholder="180"
                    value={soilData.potassium}
                    onChange={(e) => setSoilData({...soilData, potassium: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Organic Matter (%)</label>
                <Input 
                  type="number"
                  step="0.1"
                  placeholder="2.5"
                  value={soilData.organicMatter}
                  onChange={(e) => setSoilData({...soilData, organicMatter: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Additional Notes</label>
                <Textarea 
                  placeholder="Any additional observations about soil condition..."
                  value={soilData.notes}
                  onChange={(e) => setSoilData({...soilData, notes: e.target.value})}
                />
              </div>

              <Button 
                variant="farmer" 
                size="lg" 
                className="w-full"
                onClick={handleSubmitSoilData}
              >
                <Cpu className="h-5 w-5 mr-2" />
                Generate Prediction
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-growth text-white p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Sprout className="h-6 w-6 mr-2" />
                {t('predictions.cropYieldPrediction')}
              </h1>
              <p className="text-white/80 mt-1">
                AI-powered insights for better farming decisions
              </p>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => setShowForm(true)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            >
              <Upload className="h-4 w-4 mr-2" />
              New Prediction
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <PredictionCard
            fieldName="मुख्य खेत"
            cropType="wheat"
            prediction={mockPrediction}
            lastUpdated="2024-01-20T10:30:00Z"
          />
          
          <PredictionCard
            fieldName="दक्षिणी खेत"
            cropType="rice"
            prediction={{
              ...mockPrediction,
              predictedYield: 3.8,
              confidence: 0.78,
              irrigationRecommendation: "Apply 25mm in next 2 days",
              fertilizerRecommendation: "NPK 15kg/ha after 10 days"
            }}
            lastUpdated="2024-01-18T14:15:00Z"
          />
        </div>
      </div>
    </div>
  );
};

export default Predictions;