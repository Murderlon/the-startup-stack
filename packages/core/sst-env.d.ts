/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "Api": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "ApiRouter": {
      "type": "sst.aws.Router"
      "url": string
    }
    "DATABASE_URL": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "ENCRYPTION_SECRET": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Email": {
      "configSet": string
      "sender": string
      "type": "sst.aws.Email"
    }
    "GITHUB_CLIENT_ID": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "GITHUB_CLIENT_SECRET": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "HONEYPOT_ENCRYPTION_SEED": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "ReactRouter": {
      "type": "sst.aws.React"
      "url": string
    }
    "SESSION_SECRET": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "STRIPE_PUBLIC_KEY": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "STRIPE_SECRET_KEY": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "StripeWebhook": {
      "id": string
      "secret": string
      "type": "stripe.index/webhookEndpoint.WebhookEndpoint"
    }
  }
}
