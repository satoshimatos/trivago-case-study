FROM ubuntu:latest

# Update the system and install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    postgresql \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the necessary port
EXPOSE 3000

# Set environment variables
ENV DATABASE_URL="postgresql://user:password@host:port/database"

# Run the application
CMD ["npm", "start"]