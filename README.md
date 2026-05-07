# WeatherLight Advisors — Marketing Site

Static Vue 3 + Vuetify site for WeatherLight Advisors. Deployed via AWS
Amplify; contact form posts to a private API Gateway → Lambda → DynamoDB
stack provisioned in `infra/`.

## Local dev

```bash
yarn install
yarn dev
```

The contact endpoint URL is baked into `src/components/Home.vue` via the
`CONTACT_API` constant. Update it after provisioning the backend.

## Backend

See `infra/README.md` for the AWS resources (DynamoDB table,
Lambda, API Gateway HTTP API).
