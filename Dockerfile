# stage1 as builder
FROM node:10-alpine as build-step

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run ng build


FROM nginx:alpine
COPY --from=build-step /app/dist/sig-front /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]