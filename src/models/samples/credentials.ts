import { Buffer } from 'buffer';

const CREDENTIALS = [
  {
    _userId: 3,
    alias: 'credential',
    issuingDidAlias: 'issuer_did',
    claim: {
      subjectDid:
        'did:prism:b8ff969a1bf2be51914b2bcc29121af2ae9a8cbe652b1edf3b87f2461d7eed6c:Cj8KPRI7CgdtYXN0ZXIwEAFKLgoJc2VjcDI1NmsxEiECn4oNyPB3e1HeHQoPYjsIW5nuhI8XK0uc4P_xItiqlls',
      content:
        '{"name":"Alice","degree":"Education","date":"2022-04-13 14:09:37"}',
    },
    verifiedCredential: {
      encodedSignedCredential:
        'eyJpZCI6ImRpZDpwcmlzbTo5ZThkOWUzOTkzNmQzYmY5MzRlMDc3ZjRhYTNkNzc5MTIzNzU1MjE2NDhjZjQxMjk0ZmE2M2ZiYTc5NDVlYjU3Iiwia2V5SWQiOiJpc3N1aW5nMCIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7Im5hbWUiOiJBbGljZSIsImRlZ3JlZSI6IkVkdWNhdGlvbiIsImRhdGUiOiIyMDIyLTA0LTEzIDE0OjA5OjM3IiwiaWQiOiJkaWQ6cHJpc206YjhmZjk2OWExYmYyYmU1MTkxNGIyYmNjMjkxMjFhZjJhZTlhOGNiZTY1MmIxZWRmM2I4N2YyNDYxZDdlZWQ2YzpDajhLUFJJN0NnZHRZWE4wWlhJd0VBRktMZ29KYzJWamNESTFObXN4RWlFQ240b055UEIzZTFIZUhRb1BZanNJVzVudWhJOFhLMHVjNFBfeEl0aXFsbHMifX0.MEQCIHfHZ0EG-CmV3ddBc8Z-7piEN6yIjqYFZqhjcb6YAF-1AiBAw1sDpit0-Jf4n1ztANpe2PAIUZIk86dFAZQjchUrUA',
      proof: {
        hash: '92a70a4f90761f852824c5cd126a4276f5f4c2d60b1a9b8f661031b0658a1c82',
        index: 0,
        siblings: [],
      },
    },
    batchId: '81cb1c4d665e6d6f4d3838bc6f8f4e6035f7d5847c4704d4dafe80263957418c',
    credentialHash:
      '92a70a4f90761f852824c5cd126a4276f5f4c2d60b1a9b8f661031b0658a1c82',
    operationHash:
      '61400f2d783a4cfe2b83e2beb832d01b63888813eb1a03f2ec2a5bd186a4997a',
    revoked: true,
  },
];

const atob = (data: string) => {
  return Buffer.from(data, 'base64').toString('binary');
};

const btoa = (data: string) => {
  return Buffer.from(data, 'binary').toString('base64');
};

export const decodeCredential = (encodedSignedCredential: string) => {
  const credValues = encodedSignedCredential.toString().split('.');
  const decoded = atob(credValues[0]).replace('/\0/g', '');
  const decodedObj = JSON.parse(decoded);
  return decodedObj;
};

export const encodeCredential = (cred): string => {
  const credJson = JSON.stringify(cred);
  console.log('creds - encoding cred', credJson);
  const encoded = btoa(credJson);
  return encoded;
};

export const getUserCredentials = (userId: number) => {
  return CREDENTIALS.filter((credential) => credential._userId === userId);
};

export const getCredentialItem = (did) => {
  const today = new Date(Date.now());
  const credSub = {
    name: 'Demo Credential ' + today.getMilliseconds().toString(),
    achievement: 'Created fake cred',
    date: today.toISOString(),
    id: did.uriLongForm,
  };

  const decodedSignedCred = {
    id: did.uriCanonical,
    keyId: 'issuing0',
    credentialSubject: credSub,
  };
  const prf = {
    hash: today.getMilliseconds().toString(),
    index: 1,
  };
  const esc = encodeCredential(decodedSignedCred);
  const verCred = {
    encodedSignedCredential: esc,
    proof: prf,
  };
  return {
    alias: 'demoCred' + today.getMilliseconds().toString(),
    verifiedCredential: verCred,
  };
};
