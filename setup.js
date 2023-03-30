
// imports:
// Core interfaces
import { createAgent, IDataStore, IDataStoreORM, IDIDManager, IKeyManager, IResolver } from '@veramo/core'

// Core identity manager plugin. This allows you to create and manage DIDs by orchestrating different DID provider packages.
// This implements `IDIDManager`
import { DIDManager } from '@veramo/did-manager'

// Core key manager plugin. DIDs use keys and this key manager is required to know how to work with them.
// This implements `IKeyManager`
import { KeyManager } from '@veramo/key-manager'

// A key management system that uses a local database to store keys (used by KeyManager)
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

// Storage plugin using TypeORM to link to a database
import { Entities, KeyStore, DIDStore, migrations, PrivateKeyStore } from '@veramo/data-store'

// TypeORM is installed with '@veramo/data-store'
import { DataSource } from 'typeorm'

import { getResolver as webDidResolver } from 'web-did-resolver'

import { getDidKeyResolver, KeyDIDProvider } from '@veramo/did-provider-key'

import { DIDResolverPlugin } from '@veramo/did-resolver'

import { Resolver } from 'did-resolver'

import { getResolver as PeerDidResolver } from 'peer-did-resolver'

import { PeerDIDProvider } from 'did-peer-plugin'

import { CredentialPlugin, ICredentialIssuer, ICredentialVerifier } from '@veramo/credential-w3c'

import {DIDCommHttpTransport, 
  DIDComm,
  DIDCommMessageHandler, 
  CoordinateMediationRecipientMessageHandler, 
  TrustPingMessageHandler,
  PickupRecipientMessageHandler } from '@veramo/did-comm'
  
import {MessageHandler} from '@veramo/message-handler'

const DB_ENCRYPTION_KEY = '588a3b46021c1f38c7f20ec32a0063350d3c35f4225baa5a4d36e9073e044f3a'

let dbConnection = new DataSource({
  type: 'react-native',
  driver: require('react-native-sqlite-storage'),
  database: 'roots.sqlite',
  location: 'default',
  migrations: migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
}).initialize()

// Veramo agent setup
export const veramoagent = createAgent({
  plugins: [
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(DB_ENCRYPTION_KEY))),
      },
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:key',
      providers: {
        'did:key': new KeyDIDProvider({
          defaultKms: 'local',
        }),
        'did:peer': new PeerDIDProvider({
          defaultKms: 'local',
          options: {
            num_algo: 0,
          }
        }),
        },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...webDidResolver(),
        ...getDidKeyResolver(),
        ...PeerDidResolver(),
      }),
    }),
    // @ts-ignore
    new DIDComm([new DIDCommHttpTransport()]),
    new MessageHandler({
      messageHandlers: [
        // @ts-ignore
        new DIDCommMessageHandler(),
        new CoordinateMediationRecipientMessageHandler(),
        new TrustPingMessageHandler(),
        new PickupRecipientMessageHandler(),
      ],
    }),
  ]
})