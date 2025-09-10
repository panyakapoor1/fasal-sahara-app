import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  AlertTriangle, 
  Droplets, 
  Bug, 
  Sprout, 
  Clock, 
  CheckCircle,
  TrendingUp,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Alert {
  id: number;
  fieldId: number;
  fieldName: string;
  type: 'irrigation' | 'fertilizer' | 'pest' | 'weather';
  priority: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

interface Recommendation {
  predicted_yield_q_per_hectare: number;
  confidence: number;
  irrigation_recommendation: string;
  fertilizer_recommendation: string;
  pest_alert: {
    probability: number;
    notes: string;
  };
}

interface AlertsSectionProps {
  onAlertAcknowledge: (alertId: number) => void;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    fieldId: 1,
    fieldName: 'मुख्य खेत',
    type: 'irrigation',
    priority: 'high',
    title: 'Irrigation Required',
    message: 'Soil moisture levels are low. Irrigation recommended within 24 hours.',
    timestamp: new Date().toISOString(),
    acknowledged: false
  },
  {
    id: 2,
    fieldId: 2,
    fieldName: 'दक्षिणी खेत',
    type: 'pest',
    priority: 'medium',
    title: 'Pest Risk Detected',
    message: 'Weather conditions favorable for aphid infestation. Monitor closely.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    acknowledged: false
  }
];

const AlertsSection: React.FC<AlertsSectionProps> = ({ onAlertAcknowledge }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);

  const alertIcons = {
    irrigation: Droplets,
    fertilizer: Sprout,
    pest: Bug,
    weather: AlertTriangle
  };

  const priorityColors = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-agricultural-warning/20 text-agricultural-warning border-agricultural-warning',
    high: 'bg-destructive/20 text-destructive border-destructive'
  };

  const typeColors = {
    irrigation: 'text-agricultural-growth',
    fertilizer: 'text-agricultural-soil',
    pest: 'text-agricultural-warning',
    weather: 'text-primary'
  };

  const handleAlertClick = async (alert: Alert) => {
    setSelectedAlert(alert);
    setIsLoadingRecommendation(true);

    try {
      // Simulate API call to backend /api/recommendations/{field_id}
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockRecommendation: Recommendation = {
        predicted_yield_q_per_hectare: 4.2,
        confidence: 0.84,
        irrigation_recommendation: alert.type === 'irrigation' 
          ? "Apply 25mm irrigation within next 24 hours. Early morning preferred."
          : "Current moisture levels adequate. Next irrigation in 3-4 days.",
        fertilizer_recommendation: alert.type === 'fertilizer'
          ? "Apply Urea 30kg/ha at tillering stage within 5 days."
          : "NPK levels optimal. Next fertilizer application in 2 weeks.",
        pest_alert: {
          probability: alert.type === 'pest' ? 0.65 : 0.12,
          notes: alert.type === 'pest'
            ? "High aphid risk detected. Apply neem oil spray immediately. Monitor for 7 days."
            : "Low pest risk. Continue regular monitoring."
        }
      };

      setRecommendation(mockRecommendation);
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('alerts.fetchRecommendationError'),
        variant: "destructive"
      });
    } finally {
      setIsLoadingRecommendation(false);
    }
  };

  const handleAcknowledge = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
    onAlertAcknowledge(alertId);
    setSelectedAlert(null);
    setRecommendation(null);
    
    toast({
      title: t('alerts.acknowledged'),
      description: t('alerts.acknowledgedDescription'),
    });
  };

  const activeAlerts = alerts.filter(alert => !alert.acknowledged);

  if (activeAlerts.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center text-agricultural-success">
            <CheckCircle className="h-5 w-5 mr-2" />
            {t('alerts.noActiveAlerts')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t('alerts.allClearMessage')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-agricultural-warning" />
              {t('alerts.activeAlerts')} ({activeAlerts.length})
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeAlerts.map((alert, index) => {
              const IconComponent = alertIcons[alert.type];
              
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleAlertClick(alert)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-muted ${typeColors[alert.type]}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-sm">{alert.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${priorityColors[alert.priority]}`}
                        >
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {alert.fieldName} • {alert.message}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {t('alerts.viewRecommendation')}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={() => {
        setSelectedAlert(null);
        setRecommendation(null);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-agricultural-success" />
              {t('alerts.recommendationFor')} {selectedAlert?.fieldName}
            </DialogTitle>
            <DialogDescription>
              {t('alerts.aiGeneratedRecommendation')}
            </DialogDescription>
          </DialogHeader>

          {isLoadingRecommendation ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agricultural-growth"></div>
              <span className="ml-2">{t('alerts.fetchingRecommendation')}</span>
            </div>
          ) : recommendation ? (
            <div className="space-y-6">
              {/* Yield Prediction */}
              <div className="text-center p-4 bg-agricultural-success/10 rounded-lg">
                <div className="text-2xl font-bold text-agricultural-success">
                  {recommendation.predicted_yield_q_per_hectare} q/ha
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('predictions.confidence')}: {Math.round(recommendation.confidence * 100)}%
                </div>
              </div>

              {/* Recommendations */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Droplets className="h-5 w-5 text-agricultural-growth mt-1" />
                  <div>
                    <div className="font-medium">{t('predictions.irrigation')}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {recommendation.irrigation_recommendation}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Sprout className="h-5 w-5 text-agricultural-soil mt-1" />
                  <div>
                    <div className="font-medium">{t('predictions.fertilizer')}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {recommendation.fertilizer_recommendation}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Bug className="h-5 w-5 text-agricultural-warning mt-1" />
                  <div>
                    <div className="font-medium">{t('predictions.pestControl')}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {recommendation.pest_alert.notes}
                    </div>
                    <div className="text-xs font-medium text-agricultural-warning mt-1">
                      {t('predictions.riskLevel')}: {Math.round(recommendation.pest_alert.probability * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedAlert(null);
                    setRecommendation(null);
                  }}
                >
                  {t('common.close')}
                </Button>
                <Button 
                  variant="farmer" 
                  onClick={() => selectedAlert && handleAcknowledge(selectedAlert.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {t('alerts.acknowledge')}
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AlertsSection;