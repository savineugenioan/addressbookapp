# Stage 1: Build the Angular app
FROM node:22-alpine AS build

# Set the working directory inside the container
ARG deploy_type
#ENV deploy_type=$deploy_type
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY adressbookapp.client/package.json  ./
COPY adressbookapp.client/package-lock.json ./

# Install the dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY adressbookapp.client ./

# Build the Angular app in production mode
RUN npm run build -- --configuration $deploy_type
# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Copy the built app from the build stage to the Nginx web root
COPY --from=build /app/dist/adressbookapp.client /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
