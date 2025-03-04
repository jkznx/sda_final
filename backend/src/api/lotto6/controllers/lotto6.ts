'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::lotto6.lotto6', ({ strapi }) => ({
  async findMostPushed(ctx) {
    try {
      // ดึง query parameter 'limit' จาก URL (default = 5 ถ้าไม่ระบุ)
      const limit = parseInt(ctx.query.limit) || 5;

      console.log('findMostPushed endpoint called with limit:', limit);

      // ดึงข้อมูล lotto6 โดยเรียงตาม count จากมากไปน้อย
      const mostPushedLotto = await strapi.db.query('api::lotto6.lotto6').findMany({
        orderBy: { count: 'desc' }, // เรียงจากมากไปน้อย
        limit: limit, // จำนวนที่ต้องการ
        populate: ['registers'], // ดึงข้อมูล registers ที่เกี่ยวข้อง (ถ้าไม่ต้องการให้ลบออก)
      });

      console.log('Fetched data:', mostPushedLotto);

      if (!mostPushedLotto || mostPushedLotto.length === 0) {
        return ctx.send({ message: 'No lotto6 found' }, 404);
      }

      // คืนค่าทั้ง array ของ lotto6
      ctx.send(mostPushedLotto);
    } catch (error) {
      console.error('Error in findMostPushed:', error);
      ctx.send({ error: 'Internal server error' }, 500);
    }
  },
}));