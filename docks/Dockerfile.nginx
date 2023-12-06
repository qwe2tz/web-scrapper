FROM node:18 as build

# Move to nginx folder and remove ./docks dir?

WORKDIR /app

COPY ./frontend/package.json .

RUN npm install

COPY ./frontend .

RUN npm run build

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]