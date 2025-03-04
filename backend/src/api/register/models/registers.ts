// src/api/register/models/register.ts

export default {
    lifecycles: {
      async beforeUpdate(params: any, data: any) {
        // ตรวจสอบว่ามีการอัปเดตข้อมูลหรือไม่
        if (data) {
          // ใส่เวลาปัจจุบันลงในฟิลด์ที่ต้องการ
          data.Date = new Date();  // สมมุติว่า `updatedAt` คือฟิลด์ที่ต้องการ
        }
      },
    },
  };
  
