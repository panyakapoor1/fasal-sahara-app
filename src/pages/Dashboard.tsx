import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import AddFieldModal from '@/components/AddFieldModal';
import AlertsSection from '@/components/AlertsSection';
import { 
  Sprout, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  AlertTriangle,
  MapPin,
  Calendar,
  BarChart3,
  Plus
} from 'lucide-react';

// Mock data for demonstration
const mockWeatherData = {
  temperature: 28,
  humidity: 65,
  rainfall: 12,
  condition: 'Partly Cloudy'
};

const mockFieldsData = [
  {
    id: 1,
    name: 'मुख्य खेत',
    crop: 'wheat',
    size: 1.5,
    sowingDate: '2024-01-15',
    lastPrediction: {
      yield: 4.2,
      confidence: 0.84,
      date: '2024-01-20'
    }
  },
  {
    id: 2,
    name: 'दक्षिणी खेत',
    crop: 'rice',
    size: 1.0,
    sowingDate: '2024-01-10',
    lastPrediction: {
      yield: 3.8,
      confidence: 0.78,
      date: '2024-01-18'
    }
  }
];

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [fieldsData, setFieldsData] = useState(mockFieldsData);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);

  const totalFields = fieldsData.length;
  const totalSize = fieldsData.reduce((sum, field) => sum + field.size, 0);
  const activePredictions = fieldsData.filter(field => field.lastPrediction).length;

  const handleFieldAdded = (newField: any) => {
    setFieldsData(prev => [...prev, newField]);
  };

  const handleAlertAcknowledge = (alertId: number) => {
    // Handle alert acknowledgment
    console.log('Alert acknowledged:', alertId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold">
                {t('dashboard.welcome')}, {user?.name}
              </h1>
              <div className="flex items-center text-white/80 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {user?.farmLocation}
              </div>
            </div>
            <Sprout className="h-10 w-10" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Weather Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <CloudRain className="h-5 w-5 mr-2 text-agricultural-growth" />
                {t('dashboard.todayWeather')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Thermometer className="h-6 w-6 mx-auto text-accent mb-1" />
                  <div className="text-2xl font-bold">{mockWeatherData.temperature}°C</div>
                  <div className="text-sm text-muted-foreground">Temperature</div>
                </div>
                <div className="text-center">
                  <Droplets className="h-6 w-6 mx-auto text-agricultural-growth mb-1" />
                  <div className="text-2xl font-bold">{mockWeatherData.humidity}%</div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </div>
                <div className="text-center">
                  <CloudRain className="h-6 w-6 mx-auto text-primary mb-1" />
                  <div className="text-2xl font-bold">{mockWeatherData.rainfall}mm</div>
                  <div className="text-sm text-muted-foreground">Rainfall</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('dashboard.totalFields')}
                  </p>
                  <p className="text-2xl font-bold">{totalFields}</p>
                  <p className="text-xs text-muted-foreground">
                    {totalSize.toFixed(1)} {t('dashboard.hectares')}
                  </p>
                </div>
                <Sprout className="h-8 w-8 text-agricultural-growth" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('dashboard.activePredictions')}
                  </p>
                  <p className="text-2xl font-bold">{activePredictions}</p>
                  <p className="text-xs text-agricultural-success">
                    Recent updates
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-agricultural-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('dashboard.alerts')}
                  </p>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-agricultural-warning">
                    Requires attention
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-agricultural-warning" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{t('dashboard.quickActions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="farmer" 
                  size="lg" 
                  className="h-16"
                  onClick={() => setIsAddFieldModalOpen(true)}
                >
                  <Plus className="h-6 w-6 mr-2" />
                  {t('dashboard.addField')}
                </Button>
                <Button 
                  variant="growth" 
                  size="lg" 
                  className="h-16"
                  onClick={() => window.location.href = '/predictions'}
                >
                  <BarChart3 className="h-6 w-6 mr-2" />
                  {t('dashboard.viewPredictions')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AlertsSection onAlertAcknowledge={handleAlertAcknowledge} />
        </motion.div>

        {/* Recent Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t('fields.myFields')}
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldsData.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-agricultural-growth/20 rounded-lg flex items-center justify-center">
                        <Sprout className="h-6 w-6 text-agricultural-growth" />
                      </div>
                      <div>
                        <h3 className="font-medium">{field.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t(`crops.${field.crop}`)} • {field.size} ha
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {field.lastPrediction?.yield || 'N/A'} q/ha
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {field.lastPrediction ? Math.round(field.lastPrediction.confidence * 100) + '% confidence' : 'No prediction yet'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Field Modal */}
      <AddFieldModal
        isOpen={isAddFieldModalOpen}
        onClose={() => setIsAddFieldModalOpen(false)}
        onFieldAdded={handleFieldAdded}
      />
    </div>
  );
};

export default Dashboard;