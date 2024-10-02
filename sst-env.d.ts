/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
import 'sst'
declare module 'sst' {
  export interface Resource {
    DATABASE_URL: {
      type: 'sst.sst.Secret'
      value: string
    }
    ENCRYPTION_SECRET: {
      type: 'sst.sst.Secret'
      value: string
    }
    HONEYPOT_ENCRYPTION_SEED: {
      type: 'sst.sst.Secret'
      value: string
    }
    RESEND_API_KEY: {
      type: 'sst.sst.Secret'
      value: string
    }
    Remix: {
      type: 'sst.aws.Remix'
      url: string
    }
    SESSION_SECRET: {
      type: 'sst.sst.Secret'
      value: string
    }
    STRIPE_PUBLIC_KEY: {
      type: 'sst.sst.Secret'
      value: string
    }
    STRIPE_SECRET_KEY: {
      type: 'sst.sst.Secret'
      value: string
    }
    StripeWebhookEndpoint: {
      type: 'sst.sst.Secret'
      value: string
    }
  }
}
