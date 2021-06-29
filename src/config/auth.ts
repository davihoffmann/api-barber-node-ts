export default {
  jwt: {
    secreat: process.env.APP_SECRET || 'default', // '8435c53e5c963b90f5dc2ed32ffa9e87',
    expiresIn: '1d',
  },
};
