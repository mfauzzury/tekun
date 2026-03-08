# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/admin-web/package.json apps/admin-web/
COPY apps/api-server/package.json apps/api-server/
RUN npm ci
COPY apps/admin-web/ apps/admin-web/
RUN npm run build:admin

# Serve stage
FROM nginx:alpine
COPY --from=build /app/apps/admin-web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
