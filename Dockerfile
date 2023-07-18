FROM ubuntu:latest

# Update the system and install dependencies
ENV DEBIAN_FRONTEND=noninteractive
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

RUN echo "DB_HOST='db'" >> /app/.env
RUN echo "DB_NAME='postgres'" >> /app/.env
RUN echo "DB_USER='dockeruser'" >> /app/.env
RUN echo "DB_PASSWORD='dockerpassword'" >> /app/.env

EXPOSE 3333

ENV DATABASE_URL="postgresql://dockeruser:dockerpassword@localhost:5432/postgres"

# Run the application
CMD ["npm", "start"]