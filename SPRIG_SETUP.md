# Sprig Survey Setup

## Overview
Sprig surveys are configured to trigger on the experimentation docs page to gather user feedback.

## Setup Instructions

### 1. Environment Variables
To enable Sprig surveys, you need to set the following environment variable:

```
NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID=your-sprig-environment-id
```

### 2. Local Development
For local development, create a `.env.local` file in the root directory:

```bash
# .env.local
NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID=your-sprig-environment-id
```

### 3. Production Deployment
For production, set the environment variable in your deployment platform:

- **Vercel**: Add the environment variable in your project settings
- **GitHub Actions**: Add as a repository secret and reference in your deployment workflow
- **Other platforms**: Follow your platform's documentation for setting environment variables

### 4. Survey Configuration
The survey is triggered when users visit the `/docs/experiments` page. The tracking event name is `viewed_experimentation_docs`.

In your Sprig dashboard:
1. Create a survey
2. Set up targeting based on the `viewed_experimentation_docs` event
3. Configure your survey questions and appearance

### 5. Security Notes
- The environment variable is prefixed with `NEXT_PUBLIC_` because it needs to be available in the browser
- The Sprig Environment ID is not sensitive like an API key, but should still be managed securely
- If the environment variable is not set, Sprig will not initialize and no surveys will be shown

## Testing
To test the integration:
1. Set up your local environment with the Sprig Environment ID
2. Navigate to `/docs/experiments`
3. Check your Sprig dashboard for the tracking event
4. Verify that surveys are displayed according to your targeting rules