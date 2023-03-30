module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [

    [
        'react-native-reanimated/plugin',
        {
          globals: ['__scanCodes'],
      },
    ],
    ["@babel/plugin-syntax-import-assertions"],
    [            
        

      'babel-plugin-rewrite-require',
      {
        aliases: {
          crypto: 'crypto-browserify',
          stream: 'stream-browserify',
        },
      },
    ],
  ],

}