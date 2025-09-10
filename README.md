# FarmPredict - Smart Farming Assistant 🌾

An AI-powered agricultural prediction web application designed for small-scale Indian farmers to predict crop yields and receive actionable recommendations for irrigation, fertilization, and pest control.

## 🚀 Quick Start

This is the frontend React application. To run locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

## ✨ Features

### 🔐 Secure Authentication
- **Aadhaar-based verification** with mock implementation for demo
- **Privacy-preserving** - no raw Aadhaar numbers stored
- **Audit logging** for consent and data access
- **Multilingual support** (Hindi & English)

### 📊 Smart Dashboard
- **Weather integration** with real-time data display
- **Field management** with crop tracking
- **Prediction overview** with confidence scores
- **Quick actions** for common farming tasks

### 🤖 AI-Powered Predictions
- **Crop yield forecasting** using ML models
- **Irrigation recommendations** based on soil and weather
- **Fertilizer suggestions** optimized for crop type
- **Pest control alerts** with probability assessments
- **Weekly action plans** with prioritized tasks

### 📱 Mobile-First Design
- **Progressive Web App (PWA)** capabilities
- **Responsive design** optimized for mobile devices
- **Large touch-friendly buttons** for ease of use
- **Offline functionality** for last predictions

### 🌍 Accessibility & Localization
- **Hindi and English** language support
- **Icon-heavy interface** for users with varying literacy
- **High contrast** agricultural color scheme
- **Screen reader compatible**

## 🏗️ Architecture

This is the **frontend React application** of the FarmPredict system. The complete production system would include:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  FastAPI Backend │    │   ML Service    │
│   (This App)     │◄──►│                 │◄──►│                 │
│   - UI/UX        │    │  - CRUD APIs    │    │  - Predictions  │
│   - Auth Flow    │    │  - Auth         │    │  - Training     │
│   - PWA          │    │  - Data Agg     │    │  - Inference    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                       ┌─────────────────┐
                       │   PostgreSQL    │
                       │   + Redis       │
                       │   Database      │
                       └─────────────────┘
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Forest Green (`#2d5016`) - Trust and growth
- **Secondary**: Warm Earth (`#a67c52`) - Natural and grounding  
- **Accent**: Harvest Orange (`#d97706`) - Energy and action
- **Success**: Agricultural Green (`#059669`) - Healthy crops
- **Warning**: Soil Brown (`#92400e`) - Caution and attention

### Components
- **Shadcn UI** components with agricultural theming
- **Custom button variants**: `farmer`, `harvest`, `growth`, `soil`
- **Semantic color tokens** defined in design system
- **Responsive grid layouts** for different screen sizes

## 🔒 Privacy & Security

### Aadhaar Compliance
- ✅ **No raw Aadhaar storage** - only hashed tokens
- ✅ **Explicit consent flow** with clear privacy notices  
- ✅ **Audit logging** of all verification attempts
- ✅ **Data deletion** capability for consent withdrawal
- ✅ **HTTPS-only** communication in production
- ⚠️ **Mock implementation** - integrate with licensed eKYC provider for production

### Security Features
- **JWT token authentication** with refresh capability
- **Input validation** on all user inputs
- **CORS protection** configured
- **XSS prevention** with React's built-in protections
- **Environment variable** management for sensitive data

## 🌾 Mock Data & Demo Flow

### Demo Credentials
The app includes mock Aadhaar verification for demo purposes:
- Enter any 12-digit number as Aadhaar
- Enter any 6-digit OTP for verification
- Complete onboarding with farm details

### Sample Predictions
- **Wheat Field**: 4.2 quintals/hectare (84% confidence)
- **Rice Field**: 3.8 quintals/hectare (78% confidence)
- **Irrigation**: Apply 20mm water in next 3 days
- **Fertilizer**: Urea 30kg/ha at tillering stage
- **Pest Alert**: 12% probability of aphid infestation

## 🚀 Production Deployment Considerations

### Backend Integration Required
To make this production-ready, you'll need:

1. **FastAPI/Node.js Backend**
   ```bash
   # Example API endpoints needed:
   POST /api/auth/aadhaar/request-otp
   POST /api/auth/aadhaar/verify-otp  
   GET  /api/farms
   POST /api/farms
   GET  /api/predictions
   POST /api/predictions
   ```

2. **ML Service**
   ```bash
   # Python ML service with:
   POST /predict
   # Input: soil data, weather, crop type
   # Output: yield prediction + recommendations
   ```

3. **Database Schema**
   ```sql
   -- Core tables needed:
   users, farms, fields, crops, predictions, 
   soil_tests, weather_data, consent_logs
   ```

### Third-Party Integrations
- **Licensed eKYC Provider** (DigiLocker, NSDL, etc.)
- **Weather APIs** (OpenWeatherMap, AccuWeather)
- **Satellite NDVI** (Planet Labs, Sentinel Hub)
- **SMS/WhatsApp** (Twilio, 360dialog)

### Infrastructure
- **Containerization**: Docker + Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Caching**: Redis for weather/API responses
- **CDN**: For static assets and images

## 🧪 Testing

### Frontend Tests (Included)
```bash
npm run test        # Unit tests with Jest
npm run test:e2e   # End-to-end tests with Playwright
```

### API Testing (Backend Needed)
- Postman collection for API endpoints
- Unit tests for ML model predictions
- Load testing for inference endpoints

## 📄 Legal & Compliance

### ⚠️ Important Legal Notes
1. **Aadhaar Integration**: Requires UIDAI authorization and legal compliance
2. **Data Protection**: Follow IT Act 2000 and Digital Personal Data Protection Act
3. **Agricultural Data**: Consider APMC regulations and farmer data rights
4. **ML Model**: Ensure transparency and explainability for farmer trust

### Recommended Steps
1. **Legal Consultation**: Engage agricultural and data privacy lawyers
2. **UIDAI Registration**: Apply for eKYC services authorization  
3. **Farmer Consent**: Design clear, multilingual consent flows
4. **Data Audit**: Regular security and privacy audits
5. **Insurance**: Consider agricultural tech liability insurance

## 🤝 Contributing

This is a demo application showcasing the frontend capabilities. For production use:

1. Replace mock authentication with real eKYC integration
2. Connect to actual ML service and weather APIs
3. Implement proper error handling and logging
4. Add comprehensive testing suite
5. Follow security best practices for production deployment

## 📞 Support

For technical questions about this frontend implementation, refer to the code comments and component documentation. For production deployment, ensure proper backend services and legal compliance are in place.

---

**Built with ❤️ for Indian farmers using React, TypeScript, Tailwind CSS, and modern web technologies.**