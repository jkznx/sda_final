module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/lotto6s',
      handler: 'lotto6.find', // หรือ handler อื่นที่คุณต้องการ
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/lotto6s/best-seller',
      handler: 'lotto6.findMostPushed',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};