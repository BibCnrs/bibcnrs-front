FROM node:18-alpine as build
WORKDIR /app
COPY ./package*.json .
RUN npm ci
ARG BIBAPI_HOST
ARG SOURCE_MAP
ENV VITE_BIBAPI_HOST=$BIBAPI_HOST \
    VITE_ENV="prod" \
    VITE_SOURCE_MAP=$SOURCE_MAP
COPY ./tsconfig*.json ./vite.config.ts ./index.html ./
COPY ./public ./public
COPY ./src ./src
RUN npm run build

FROM nginx:1.24-alpine AS ngi
RUN rm -rf /usr/share/nginx/html/*
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
