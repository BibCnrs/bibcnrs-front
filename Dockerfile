FROM node:18-alpine as build
WORKDIR /app
COPY ./package*.json .
RUN npm ci
ARG VITE_BIBAPI_HOST
ENV VITE_BIBAPI_HOST=$VITE_BIBAPI_HOST \
    ENV="prod"
COPY ./tsconfig*.json ./vite.config.ts ./index.html ./
COPY ./public ./public
COPY ./src ./src
RUN npm run build
COPY ./nginx.conf ./nginx.conf

FROM nginx:mainline-alpine AS ngi
RUN rm -rf /usr/share/nginx/html/*
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
