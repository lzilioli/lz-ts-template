FROM node:12.20.1

WORKDIR /usr/src/app

ARG GITHUB_NPM_AUTH_TOKEN

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .npmrc ./
RUN printf "registry=https://registry.npmjs.org\n" > ./.npmrc
RUN printf "@lzilioli:registry=https://npm.pkg.github.com/\n" >> ./.npmrc
RUN printf "//npm.pkg.github.com/:_authToken=${GITHUB_NPM_AUTH_TOKEN}\n" >> ./.npmrc

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN rm -f .npmrc

# Bundle app source
COPY . .

ENV DEBUG=lz-ts-template:*

CMD [ "npm", "run", "start-dev" ]