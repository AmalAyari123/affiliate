# Authentication Implementation

This document describes the authentication flow implemented in the affiliate React Native app.

## Overview

The app implements a complete authentication system that handles:
1. Customer registration (Magento API)
2. Customer login (Magento API) 
3. Affiliate signup (Mageplaza API)
4. Token-based authentication with AsyncStorage
5. Automatic navigation based on authentication state

## API Endpoints

### 1. Customer Registration
- **URL**: `POST https://magento.test/rest/default/V1/customers`
- **Body**:
```json
{
  "customer": {
    "email": "user@example.com",
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

### 2. Customer Login
- **URL**: `POST https://magento.test/rest/default/V1/integration/customer/token`
- **Body**:
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```
- **Response**: Returns authentication token

### 3. Affiliate Signup
- **URL**: `POST https://magento.test/rest/default/V1/mpAffiliate/signup`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{"status":1,"affiliate_id":"1"}`

## Implementation Details

### Files Modified/Created

1. **`app/api/client.js`**
   - Updated base URL to Magento API
   - Added request/response interceptors for token management
   - Automatic token inclusion in headers

2. **`app/api/authApi.js`** (New)
   - Complete API service for authentication
   - Functions for registration, login, and affiliate signup
   - Error handling and response formatting

3. **`app/context/AuthContext.js`** (New)
   - React Context for global authentication state
   - Token management with AsyncStorage
   - Authentication state management

4. **`app/screens/register.js`**
   - Updated to use new auth API
   - Complete registration flow (customer → login → affiliate)
   - Form validation and loading states
   - Integration with AuthContext

5. **`app/screens/LoginScreen.js`**
   - Updated to use new auth API
   - Form validation and loading states
   - Integration with AuthContext

6. **`app/screens/Profile.js`**
   - Added logout functionality
   - Integration with AuthContext

7. **`App.js`**
   - Updated to use AuthProvider
   - Automatic navigation based on authentication state

### Authentication Flow

1. **Registration Flow**:
   - User fills registration form
   - App calls customer registration API
   - App calls login API to get token
   - App calls affiliate signup API with token
   - User is automatically logged in and redirected to main app

2. **Login Flow**:
   - User enters credentials
   - App calls login API
   - Token is stored in AsyncStorage
   - User is redirected to main app

3. **Logout Flow**:
   - User clicks logout in Profile screen
   - Token is removed from AsyncStorage
   - User is redirected to auth screens

### Token Management

- Tokens are automatically stored in AsyncStorage
- Tokens are automatically included in API requests
- Authentication state is managed globally via Context
- App automatically checks authentication status on startup

### Error Handling

- Form validation with user-friendly error messages
- API error handling with proper error messages
- Network error handling
- Loading states during API calls

### Security Features

- Password visibility toggle
- Form validation
- Secure token storage
- Automatic token inclusion in authenticated requests

## Usage

1. **Registration**: Navigate to Register screen and fill the form
2. **Login**: Navigate to Login screen and enter credentials
3. **Logout**: Go to Profile screen and click logout button

The app will automatically handle the authentication flow and redirect users appropriately based on their authentication status. 