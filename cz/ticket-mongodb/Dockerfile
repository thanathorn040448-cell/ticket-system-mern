# Deploy: build context = โฟลเดอร์ ticket-mongodb; compose เรียกจาก cz/monitoring-system
# ค่า PORT / LOG_LEVEL / อื่นๆ ส่งผ่าน env ใน compose หรือ .env ตอนรัน container
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]