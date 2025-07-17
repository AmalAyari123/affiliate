# Network Error Troubleshooting Guide

## Common Causes of "Network Error"

### 1. **Local Development Server Access**

The most common issue is that your React Native app cannot access your local Magento server.

#### **For Android Emulator:**
- Android emulator uses `10.0.2.2` to access the host machine's localhost
- Current configuration: `http://10.0.2.2/rest/default/V1`

#### **For iOS Simulator:**
- iOS simulator uses `localhost` to access the host machine
- Current configuration: `http://localhost/rest/default/V1`

#### **For Physical Device:**
- You need to use your computer's IP address
- Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Update the URL in `client.js` to: `http://YOUR_IP_ADDRESS/rest/default/V1`

### 2. **Magento Server Configuration**

Make sure your Magento server is:
- Running and accessible
- Configured to accept requests from your app
- Not blocking requests due to CORS

### 3. **Network Configuration**

#### **Check if Magento is running:**
```bash
# Test in browser
http://localhost/rest/default/V1/customers
http://10.0.2.2/rest/default/V1/customers  # For Android emulator
```

#### **Test with curl:**
```bash
curl -X GET http://localhost/rest/default/V1/customers
```

## Debugging Steps

### Step 1: Check Console Logs
The updated code now includes detailed logging. Check your console for:
- 🌐 API Request logs
- 📡 API Response logs
- 🚨 API Error logs

### Step 2: Use the API Test Component
1. Import and add the `ApiTest` component to your app
2. Run the "Test Basic Connection" to see if the server is reachable
3. Check the detailed response information

### Step 3: Verify Magento Configuration

#### **Check Magento REST API:**
1. Go to Magento Admin → System → Integrations
2. Make sure REST API is enabled
3. Check if there are any API restrictions

#### **Check CORS settings:**
Add to your Magento `.htaccess` file:
```apache
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
```

### Step 4: Test Different URLs

Try these URLs in the API Test component:
- `/` (root)
- `/customers`
- `/integration/customer/token`

## Solutions

### **Solution 1: Use Physical Device IP**
If using a physical device, update `client.js`:

```javascript
const getBaseURL = () => {
  // Replace with your computer's IP address
  return 'http://192.168.1.100/rest/default/V1'; // Your IP here
};
```

### **Solution 2: Use HTTPS**
If your Magento uses HTTPS:

```javascript
const getBaseURL = () => {
  if (Platform.OS === 'android') {
    return 'https://10.0.2.2/rest/default/V1';
  } else if (Platform.OS === 'ios') {
    return 'https://localhost/rest/default/V1';
  }
};
```

### **Solution 3: Use ngrok for Testing**
1. Install ngrok: `npm install -g ngrok`
2. Run: `ngrok http 80`
3. Use the ngrok URL in your app

### **Solution 4: Check Firewall**
Make sure your firewall allows connections on port 80/443

## Common Error Messages

### **"Network error: Please check your internet connection"**
- Server is not reachable
- Wrong IP address
- Firewall blocking connection

### **"Request timeout"**
- Server is slow
- Network issues
- Increase timeout in client.js

### **"Invalid data"**
- API endpoint expects different data format
- Check Magento API documentation

### **"Email already exists"**
- Normal error, try with different email

## Testing Checklist

- [ ] Magento server is running
- [ ] Can access Magento in browser
- [ ] Using correct IP address for your setup
- [ ] No firewall blocking connection
- [ ] CORS is properly configured
- [ ] API endpoints are enabled in Magento
- [ ] Console logs show detailed error information

## Quick Fix Commands

```bash
# Find your IP address
ipconfig  # Windows
ifconfig  # Mac/Linux

# Test Magento API
curl -X GET http://localhost/rest/default/V1/customers

# Check if port 80 is open
telnet localhost 80
```

## Still Having Issues?

1. Check the console logs for specific error details
2. Use the API Test component to isolate the problem
3. Try accessing the API from a browser first
4. Verify your Magento installation and configuration
5. Check if your Magento has any custom API configurations 