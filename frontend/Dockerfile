FROM node:18

# setup app files
WORKDIR /app
# uncomment next line if you don't want to use volumes: - ./frontend:/app in `../docker-compose.yml`
# COPY . .

# pre-requisite commands
RUN npm install

# run
CMD ["npm", "run", "dev"]
