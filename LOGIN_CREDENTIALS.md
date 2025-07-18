# PawsIQ Login Credentials

This document contains the available login credentials for testing the PawsIQ application.

## Admin Users
- **Email:** admin@pawsiq.com
- **Password:** admin123
- **Role:** admin
- **Access:** Full admin dashboard

## Regular Users
- **Email:** user@pawsiq.com
- **Password:** user123
- **Role:** user
- **Access:** User dashboard with pet management

- **Email:** user@pawsiq.in
- **Password:** user1234
- **Role:** user
- **Access:** User dashboard with pet management

## Service Providers

### Veterinarian
- **Email:** vet@pawsiq.com
- **Password:** provider123
- **Role:** provider
- **Type:** Veterinarian
- **Access:** Provider dashboard

### Trainer
- **Email:** trainer@pawsiq.com
- **Password:** provider123
- **Role:** provider
- **Type:** Trainer
- **Access:** Provider dashboard

### Groomer
- **Email:** groomer@pawsiq.com
- **Password:** provider123
- **Role:** provider
- **Type:** Groomer
- **Access:** Provider dashboard

## Notes
- The application first tries to authenticate via API call to the backend server
- If the API is not available, it falls back to mock authentication using the credentials above
- All credentials are for development/testing purposes only
- User sessions are stored in localStorage for persistence across browser sessions