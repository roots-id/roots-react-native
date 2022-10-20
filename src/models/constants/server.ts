export const ServerType = {
  Keys: {
    host: 'hostname',
    post: 'hostport',
  },  
  Local: {
    label: 'Local Test Node',
    hostValue: 'ppp-node-test.atalaprism.io',
    portValue: '50053',
  },
  Prism: {
    label: 'Prism Test Node',
    hostValue: 'ppp.atalaprism.io',
    portValue: '50053',
  },
} as const;
