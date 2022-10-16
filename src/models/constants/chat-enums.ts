export enum MessageType {
  BLOCKCHAIN_URL = 'blockchainUrlMsgType',
  CREDENTIAL_JSON = 'jsonCredential',
  DID = 'didMsgType',
  PROMPT_RETRY_PROCESS = 'rootsFailedProcessingMsgType',
  PROMPT_ACCEPT_CREDENTIAL = 'rootsAcceptCredentialMsgType',
  PROMPT_OWN_CREDENTIAL = 'rootsOwnCredentialMsgType',
  PROMPT_OWN_DID = 'rootsOwnDidMsgType',
  PROMPT_PUBLISH = 'rootsPromptPublishMsgType',
  PROMPT_ISSUED_CREDENTIAL = 'rootsIssuedCredentialMsgType',
  STATUS = 'statusMsgType',
  TEXT = 'textMsgType',
  CRED_VIEW = 'CRED_VIEW',
  CRED_VERIFY = 'CRED_VERIFY'
}
