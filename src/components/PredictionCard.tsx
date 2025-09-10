import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Droplets, 
  Sprout, 
  Bug, 
  Calendar,
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

interface PredictionData {
  predictedYield: number;
  confidence: number;
  irrigationRecommendation: string;
  fertilizerRecommendation: string;
  pestAlert: {
    probability: number;
    notes: string;
  };
  weeklyPlan: Array<{
    day: string;
    task: string;
    priority: 'low' | 'medium' | 'high';
  }>;
}

interface PredictionCardProps {
  fieldName: string;
  cropType: string;
  prediction: PredictionData;
  lastUpdated: string;
}

const PredictionCard: React.FC<PredictionCardProps> = ({
  fieldName,
  cropType,
  prediction,
  lastUpdated
}) => {
  const { t } = useTranslation();

  const confidenceColor = prediction.confidence >= 0.8 
    ? 'text-agricultural-success' 
    : prediction.confidence >= 0.6 
    ? 'text-agricultural-warning' 
    : 'text-destructive';

  const priorityColors = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-agricultural-warning/20 text-agricultural-warning',
    high: 'bg-destructive/20 text-destructive'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-agricultural">
        <CardHeader className="bg-gradient-growth text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Sprout className="h-6 w-6 mr-2" />
              {fieldName}
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {t(`crops.${cropType}`)}
            </Badge>
          </CardTitle>
          <CardDescription className="text-white/80">
            {t('predictions.lastPrediction')}: {new Date(lastUpdated).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Yield Prediction */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-agricultural-success mr-2" />
              <div>
                <div className="text-3xl font-bold">
                  {prediction.predictedYield} 
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('predictions.quintalsPerHectare')}
                </div>
              </div>
            </div>
            <div className={`text-sm font-medium ${confidenceColor}`}>
              {t('predictions.confidence')}: {Math.round(prediction.confidence * 100)}%
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-agricultural-success" />
              {t('predictions.recommendations')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Irrigation */}
              <div className="flex items-start space-x-3 p-3 bg-agricultural-growth/10 rounded-lg">
                <Droplets className="h-5 w-5 text-agricultural-growth mt-1" />
                <div>
                  <div className="font-medium text-sm">{t('predictions.irrigation')}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {prediction.irrigationRecommendation}
                  </div>
                </div>
              </div>

              {/* Fertilizer */}
              <div className="flex items-start space-x-3 p-3 bg-agricultural-soil/10 rounded-lg">
                <Sprout className="h-5 w-5 text-agricultural-soil mt-1" />
                <div>
                  <div className="font-medium text-sm">{t('predictions.fertilizer')}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {prediction.fertilizerRecommendation}
                  </div>
                </div>
              </div>

              {/* Pest Control */}
              <div className="flex items-start space-x-3 p-3 bg-agricultural-warning/10 rounded-lg">
                <Bug className="h-5 w-5 text-agricultural-warning mt-1" />
                <div>
                  <div className="font-medium text-sm">{t('predictions.pestControl')}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {prediction.pestAlert.notes}
                  </div>
                  <div className="text-xs font-medium text-agricultural-warning mt-1">
                    Risk: {Math.round(prediction.pestAlert.probability * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Plan */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              {t('predictions.weeklyPlan')}
            </h3>
            
            <div className="space-y-2">
              {prediction.weeklyPlan.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-agricultural-growth"></div>
                    <div>
                      <div className="font-medium text-sm">{task.day}</div>
                      <div className="text-sm text-muted-foreground">{task.task}</div>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={priorityColors[task.priority]}
                  >
                    {task.priority}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t">
            <Button variant="farmer" className="w-full">
              {t('predictions.requestPrediction')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PredictionCard;