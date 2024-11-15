
## Create app
```bash
npm install -g pnpm
npx create-next-app@latest scr-network-linearview --use-pnpm
```

## Install Dependencies
1. vis-network
```bash
pnpm i vis-network
```

2. tableau : 
```bash
pnpm i @tableau/extensions-api-types
```
# Run application 
```shell
pnpm dev
```


3. Deploying to Cloud Run

```bash
gcloud builds submit --tag gcr.io/[PROJECT_ID]/[SERVICE_NAME]

gcloud run deploy [SERVICE_NAME] \
    --image gcr.io/[PROJECT_ID]/[SERVICE_NAME] \
    --region [REGION] \
    --platform managed \
    --allow-unauthenticated
```