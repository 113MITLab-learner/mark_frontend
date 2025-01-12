FROM node:20-alpine

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有前端程式碼
COPY . .

# 暴露開發伺服器的埠
EXPOSE 30000

# 啟動開發伺服器
CMD ["npm", "run", "dev", "--", "--host"]
