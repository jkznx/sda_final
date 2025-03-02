module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'yourGeneratedSecretKey')
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'yourGeneratedSaltHere'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'yourGeneratedSalt'), 
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
