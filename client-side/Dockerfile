# build stage
FROM node:lts as build-stage
WORKDIR /ymca/client-side
COPY package*.json ./
RUN npm install
COPY . ./


#uncomment for production:
#RUN npm run serve
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /ymca/client-side/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]