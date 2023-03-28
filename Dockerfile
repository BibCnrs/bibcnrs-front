FROM node:18-alpine as build
WORKDIR /app
COPY . /app/
RUN npm ci && npm run build

FROM nginx:latest AS ngi
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 4200
