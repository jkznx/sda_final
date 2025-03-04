// config/routes.ts
export default {
    routes: [
      {
        method: 'GET',
        path: '/lotto6s/best-seller',
        handler: 'api::lotto6.lotto6.findMostPushed',
        config: {
          auth: false,
          policies: [],
        },
      },
    ],
  };