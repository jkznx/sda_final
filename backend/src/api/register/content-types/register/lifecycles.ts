module.exports = {
    async afterCreate(result, data) {
      try {
        console.log('Data received in afterCreate hook:', result);
  
        // เปลี่ยนจาก result เป็น result.result
        const registerData = result.result;
        if (registerData && registerData.lotto_6_s && Array.isArray(registerData.lotto_6_s) && registerData.lotto_6_s.length > 0) {
          for (const lotto of registerData.lotto_6_s) {
            console.log('Processing lotto ID:', lotto.id);
            const currentLotto = await strapi.db.query('api::lotto6.lotto6').findOne({
              where: { id: lotto.id },
            });
            console.log('Fetched Lotto6 from DB:', currentLotto);
            
            const currentCount = currentLotto.count || 0;
            console.log('Current count before update:', currentCount);
  
            const updatedLotto = await strapi.db.query('api::lotto6.lotto6').update({
              where: { id: lotto.id },
              data: { count: currentCount + 1 },
            });
            console.log('Update result:', updatedLotto);
            
            console.log(`Updated Lotto6 ID ${lotto.id}, new count = ${currentCount + 1}`);
          }
        } else {
          console.log('No lotto_6_s found to update count');
        }
      } catch (error) {
        console.error('Error in afterCreate lifecycle hook for Register:', error);
      }
    },
  };