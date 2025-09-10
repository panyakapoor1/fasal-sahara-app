import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Sprout, Calendar, TestTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFieldAdded: (field: any) => void;
}

const cropOptions = [
  { value: 'wheat', labelKey: 'wheat' },
  { value: 'rice', labelKey: 'rice' },
  { value: 'corn', labelKey: 'corn' },
  { value: 'sugarcane', labelKey: 'sugarcane' },
  { value: 'cotton', labelKey: 'cotton' },
  { value: 'soybean', labelKey: 'soybean' }
];

const AddFieldModal: React.FC<AddFieldModalProps> = ({ isOpen, onClose, onFieldAdded }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fieldName: '',
    location: '',
    cropType: '',
    size: '',
    sowingDate: '',
    soilPh: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newField = {
        id: Date.now(),
        name: formData.fieldName,
        location: formData.location,
        crop: formData.cropType,
        size: parseFloat(formData.size),
        sowingDate: formData.sowingDate,
        soilMetrics: {
          ph: parseFloat(formData.soilPh),
          nitrogen: parseFloat(formData.nitrogen),
          phosphorus: parseFloat(formData.phosphorus),
          potassium: parseFloat(formData.potassium)
        },
        lastPrediction: null,
        status: 'active'
      };

      onFieldAdded(newField);
      
      toast({
        title: t('fields.fieldAdded'),
        description: t('fields.fieldAddedDescription'),
      });

      // Reset form
      setFormData({
        fieldName: '',
        location: '',
        cropType: '',
        size: '',
        sowingDate: '',
        soilPh: '',
        nitrogen: '',
        phosphorus: '',
        potassium: ''
      });
      
      onClose();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('fields.addFieldError'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sprout className="h-6 w-6 mr-2 text-agricultural-growth" />
            {t('fields.addNewField')}
          </DialogTitle>
          <DialogDescription>
            {t('fields.addFieldDescription')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Sprout className="h-5 w-5 mr-2" />
                {t('fields.basicInformation')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fieldName">{t('fields.fieldName')}</Label>
                  <Input
                    id="fieldName"
                    value={formData.fieldName}
                    onChange={(e) => handleInputChange('fieldName', e.target.value)}
                    placeholder={t('fields.fieldNamePlaceholder')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t('fields.location')}</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder={t('fields.locationPlaceholder')}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t('fields.cropType')}</Label>
                  <Select value={formData.cropType} onValueChange={(value) => handleInputChange('cropType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('fields.selectCrop')} />
                    </SelectTrigger>
                    <SelectContent>
                      {cropOptions.map((crop) => (
                        <SelectItem key={crop.value} value={crop.value}>
                          {t(`crops.${crop.labelKey}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">{t('fields.fieldSize')}</Label>
                  <Input
                    id="size"
                    type="number"
                    step="0.1"
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    placeholder="2.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sowingDate">{t('fields.sowingDate')}</Label>
                  <Input
                    id="sowingDate"
                    type="date"
                    value={formData.sowingDate}
                    onChange={(e) => handleInputChange('sowingDate', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Soil Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TestTube className="h-5 w-5 mr-2" />
                {t('fields.soilMetrics')}
              </CardTitle>
              <CardDescription>
                {t('fields.soilMetricsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="soilPh">{t('fields.soilPh')}</Label>
                  <Input
                    id="soilPh"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={formData.soilPh}
                    onChange={(e) => handleInputChange('soilPh', e.target.value)}
                    placeholder="6.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">{t('fields.nitrogen')} (kg/ha)</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    value={formData.nitrogen}
                    onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                    placeholder="120"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phosphorus">{t('fields.phosphorus')} (kg/ha)</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    value={formData.phosphorus}
                    onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                    placeholder="60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="potassium">{t('fields.potassium')} (kg/ha)</Label>
                  <Input
                    id="potassium"
                    type="number"
                    value={formData.potassium}
                    onChange={(e) => handleInputChange('potassium', e.target.value)}
                    placeholder="40"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button 
              type="submit" 
              variant="farmer" 
              disabled={isSubmitting}
              className="min-w-32"
            >
              {isSubmitting ? t('common.saving') : t('fields.addField')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFieldModal;