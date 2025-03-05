module.exports = {
    async beforeUpdate(event) {
      try {
        const { params, data } = event;
  
        console.log("User update event triggered:", data);
  
        // เช็คว่ามี lotto_6s ถูกอัปเดตหรือไม่
        if (data.lotto_6s && Array.isArray(data.lotto_6s)) {
          console.log("Updating count for lotto_6s:", data.lotto_6s);
  
          // ใช้ Promise.all() เพื่ออัปเดตหลายรายการพร้อมกัน
          await Promise.all(
            data.lotto_6s.map(async (lotto6Id) => {
              const currentLotto = await strapi.db.query("api::lotto6.lotto6").findOne({
                where: { id: lotto6Id },
              });
  
              if (currentLotto) {
                const newCount = (currentLotto.count || 0) + 1;
                await strapi.db.query("api::lotto6.lotto6").update({
                  where: { id: lotto6Id },
                  data: { count: newCount },
                });
  
                console.log(`Updated Lotto6 ID ${lotto6Id}, new count = ${newCount}`);
              }
            })
          );
        }
      } catch (error) {
        console.error("Error in beforeUpdate lifecycle hook for User:", error);
      }
    },
  };
  