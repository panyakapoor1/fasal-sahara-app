import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BarChart3, 
  Settings, 
  LogOut, 
  Globe 
} from 'lucide-react';

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { path: '/dashboard', label: t('common.dashboard'), icon: Home },
    { path: '/predictions', label: t('common.predictions'), icon: BarChart3 },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = window.location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => window.location.href = item.path}
                  className="flex items-center"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center"
            >
              <Globe className="h-4 w-4 mr-1" />
              {i18n.language === 'en' ? 'हि' : 'En'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center text-destructive"
            >
              <LogOut className="h-4 w-4 mr-1" />
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;