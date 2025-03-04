module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/lotto6s/best-seller',
        handler: 'lotto6.findMostPushed',
        config: {
          policies: [],
          auth: false, // ข้าม auth ถ้าต้องการให้ public
        },
      },
    ],
  };