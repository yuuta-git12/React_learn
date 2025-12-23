FROM node:20-alpine

WORKDIR /usr/src/app

# 依存関係のキャッシュを効かせるため package*.json のみ先にコピー
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Viteの開発サーバをコンテナ外からアクセスできるように --host/--port を指定
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

