import { MessageType } from '../constants';
import { getCurrentUser } from './contacts';

const CHATS_OWN = [
  {
    _id: 1,
    text: 'Welcome to your personal RootsWallet history!',
    createdAt: new Date(),
    _userId: 3,
    user: {
      _id: 1,
      name: 'RootsHelper',
      avatar: 'https://avatars.githubusercontent.com/u/95590918?s=200&v=4',
    },
    received: true,
  },
  {
    _id: 2,
    text: "We'll post new wallet events here.",
    createdAt: new Date(),
    _userId: 3,
    user: {
      _id: 1,
      name: 'RootsHelper',
      avatar: 'https://avatars.githubusercontent.com/u/95590918?s=200&v=4',
    },
    received: true,
  },
  {
    _id: 3,
    text: 'You created your first decentralized ID (called a DID)!',
    createdAt: new Date(),
    _userId: 3,
    user: {
      _id: 1,
      name: 'RootsHelper',
      avatar: 'https://avatars.githubusercontent.com/u/95590918?s=200&v=4',
    },
    received: true,
  },
  {
    _id: 4,
    text: 'Your new DID is being added to Prism so that you can receive verifiable credentials (called VCs) from other users and organizations like Catalyst, your school, rental companies, etc.',
    createdAt: new Date(),
    _userId: 3,
    user: {
      _id: 2,
      name: 'PrismBot',
      avatar: 'https://avatars.githubusercontent.com/u/11140484?s=200&v=4',
    },
    received: true,
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'View',
          value: `${MessageType.PROMPT_OWN_DID} view`,
        },
        {
          title: 'Confirm',
          value: `${MessageType.PROMPT_OWN_DID} confirm`,
        },
      ],
      keepIt: true,
    },
  },
  {
    _id: 5,
    text: 'Your DID was added to Prism',
    createdAt: new Date(),
    _userId: 3,
    user: {
      _id: 2,
      name: 'PrismBot',
      avatar: 'https://avatars.githubusercontent.com/u/11140484?s=200&v=4',
    },
    received: true,
  },
  {
    _id: 6,
    text: '*Click to geek out on Cardano blockchain details*',
    createdAt: new Date(),
    _userId: 3,
    user: {
      _id: 2,
      name: 'PrismBot',
      avatar: 'https://avatars.githubusercontent.com/u/11140484?s=200&v=4',
    },
    received: true,
  },
  {
    _id: 4,
    text: 'You have received a credentials',
    createdAt: new Date(),
    _userId: 3,
    user: {
      _id: 2,
      name: 'PrismBot',
      avatar: 'https://avatars.githubusercontent.com/u/11140484?s=200&v=4',
    },
    received: true,
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'View Credential',
          value: `${MessageType.PROMPT_OWN_CREDENTIAL} ${MessageType.CRED_VIEW}`,
        }
      ],
      keepIt: true,
    },
  },
];

const CHATS_USER4 = [
  {
    _id: 1,
    text: 'You are now in contact with Esteban Garcia',
    createdAt: new Date(),
    _userId: 4,
    user: {
      _id: 1,
      name: 'RootsHelper',
      avatar: 'https://avatars.githubusercontent.com/u/95590918?s=200&v=4',
    },
    received: true,
  },
  {
    _id: 2,
    text: 'Hey! I have sent you the docs credentials',
    createdAt: new Date(),
    _userId: 4,
    user: {
      _id: 4,
      name: 'Esteban Garcia',
      avatar:
        'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png',
    },
    received: true,
  },
  {
    _id: 3,
    text: 'I will check that out thanks!',
    createdAt: new Date(),
    _userId: 4,
    user: {
      _id: 3,
      name: 'Lance',
      avatar: 'https://avatars.githubusercontent.com/u/681493?v=4',
    },
    sent: true,
  },
];

export const CHATS_USER5 = [
  {
    _id: 1,
    text: 'You are now in contact with Rodolfo Johns',
    createdAt: new Date(),
    _userId: 5,
    user: {
      _id: 1,
      name: 'RootsHelper',
      avatar: 'https://avatars.githubusercontent.com/u/95590918?s=200&v=4',
    },
    received: true,
  },
  {
    _id: 2,
    text: 'Hey! I have sent you the docs credentials',
    createdAt: new Date(),
    _userId: 5,
    user: {
      _id: 5,
      name: 'Rodolfo Johns',
      avatar: 'https://avatars.githubusercontent.com/u/2913773?v=4',
    },
    received: true,
  },
  {
    _id: 3,
    text: 'I will check that out thanks!',
    createdAt: new Date(),
    _userId: 5,
    user: {
      _id: 3,
      name: 'Lance',
      avatar: 'https://avatars.githubusercontent.com/u/681493?v=4',
    },
    sent: true,
  },
];

export const CHATS_USER6 = [
  {
    _id: 1,
    text: 'You are now in contact with MeGrimLance Steven',
    createdAt: new Date(),
    _userId: 6,
    user: {
      _id: 1,
      name: 'RootsHelper',
      avatar: 'https://avatars.githubusercontent.com/u/95590918?s=200&v=4',
    },
    received: true,
  },
  {
    _id: 2,
    text: 'Hey! I have sent you the docs credentials',
    createdAt: new Date(),
    _userId: 6,
    user: {
      _id: 6,
      name: 'MeGrimLance Steven',
      avatar:
        'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png',
    },
    received: true,
  },
  {
    _id: 3,
    text: 'I will check that out thanks!',
    createdAt: new Date(),
    _userId: 6,
    user: {
      _id: 3,
      name: 'Lance',
      avatar: 'https://avatars.githubusercontent.com/u/681493?v=4',
    },
    sent: true,
  },
];

export const CHATS = [
  ...CHATS_OWN,
  ...CHATS_USER4,
  ...CHATS_USER5,
  ...CHATS_USER6,
];

export const getChatByUser = (userId: number) => {
  return CHATS.filter((chat) => chat._userId === userId).map((chat, index) => ({
    ...chat,
    _id: index,
  }));
};

export const getMappedCurrentUser = () => {
  const user = getCurrentUser();
  return {
    _id: user._id,
    name: user.displayName,
    avatar: user.displayPictureUrl,
  };
};
