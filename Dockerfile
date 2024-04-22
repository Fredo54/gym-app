# Use the official Node.js image as the base image
FROM node:20 as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

COPY public ./public

# Build the Next.js application
RUN npx prisma generate
RUN npm run build
# RUN AUTH_SECRET 
# ENV NEXTAUTH_URL="https://gym-web-client-dr7lbxqoaa-uc.a.run.app/"

# Stage 2: Serve the application with a lightweight Node.js server
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json prisma ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
# CMD HOSTNAME="0.0.0.0" node server.js
