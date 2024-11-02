# 使用官方Node.js镜像作为基础镜像
FROM node:18-alpine AS base
WORKDIR /app

# 使用国内镜像源并安装yarn
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache yarn

# 构建阶段
FROM base AS builder
COPY package.json yarn.lock ./
# 安装cnpm并使用它来安装依赖
RUN npm install -g cnpm --registry=https://registry.npmmirror.com && \
    cnpm install
# 复制所有文件，排除.dockerignore中的文件
COPY . .
RUN yarn build

# 生产阶段
FROM base AS release
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./env
COPY --from=builder /app/.env.runtime.production ./.env.production
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/node_modules ./node_modules


EXPOSE 3000

CMD ["yarn", "start"]
