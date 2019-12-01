FROM node:10-alpine

# Create working directory
RUN mkdir /opt/app
WORKDIR /opt/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm set progress=false && npm ci

# Add node_module binaries on PATH
ENV PATH /opt/app/node_modules/.bin:$PATH

# Copy over source code
COPY . .

# Build the source
RUN npm run build
