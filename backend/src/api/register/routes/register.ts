// src/api/register/routes/register.js
module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/registers',
        handler: 'register.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/registers/:id',
        handler: 'register.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  