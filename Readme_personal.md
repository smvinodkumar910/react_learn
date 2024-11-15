
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

gcloud auth configure-docker us-east4-docker.pkg.dev/prj-edw-geocoder-1/scr-network-tableau-viz-ext

docker build . -t us-east4-docker.pkg.dev/prj-edw-geocoder-1/scr-network-tableau-viz-ext/scr-network-tableau-viz-ext:staging

docker push us-central1-docker.pkg.dev/prj-edw-geocoder-1/neodash-docker-repo/neodash-custom-editable:staging

gcloud builds submit --tag gcr.io/[PROJECT_ID]/[SERVICE_NAME]

gcloud builds submit --tag us-east4-docker.pkg.dev/prj-edw-geocoder-1/scr-network-tableau-viz-ext/scr-network-tableau-viz-ext:staging --project prj-edw-geocoder-1

gcloud run deploy [SERVICE_NAME] \
    --image gcr.io/[PROJECT_ID]/[SERVICE_NAME] \
    --region [REGION] \
    --platform managed \
    --allow-unauthenticated
```