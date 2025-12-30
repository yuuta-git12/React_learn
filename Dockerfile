FROM node:20-alpine

WORKDIR /usr/src/app

# 依存関係のキャッシュを効かせるため package*.json のみ先にコピー
COPY package*.json ./

# ホットリロード用
ENV CHOKIDAR_USEPOLLING=true

# 起動はdocker-compose側で行う
CMD ["sh"]

