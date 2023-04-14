FROM node:18-alpine as build
WORKDIR /app
COPY ./package*.json .
RUN npm ci
ARG VITE_BIBAPI_HOST
ENV VITE_BIBAPI_HOST=$VITE_BIBAPI_HOST
COPY . .
RUN npm run build

FROM nginx:mainline-alpine AS ngi
RUN rm -rf /usr/share/nginx/html/*
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 4200
