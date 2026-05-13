Public Blackbox targets — แยกต่อทีม / ต่อ service
================================================

- เพิ่มไฟล์ *.json ในโฟลเดอร์นี้ (เช่น billing-api.json, mobile-bff.json)
- รูปแบบเดียวกับ ../examples/public-probes.example.json
- Prometheus โหลดรวมกับ ../public-probes.json อัตโนมัติ (refresh ~30s)
- ลบ _empty.json ได้เมื่อมีไฟล์จริงอย่างน้อยหนึ่งไฟล์ — ถ้าโฟลเดอร์ไม่มี *.json เลย บางเวอร์ชันอาจ error ตอน glob

แนะนำ labels:
  probe_scope: public_internet (หรือชื่อมุมมองที่ทีมตกลง)
  service: ชื่อ service สั้นๆ
  route: path สำหรับมนุษย์อ่าน
