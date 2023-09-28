FROM node:18
WORKDIR /gui
COPY package.json package.json
RUN npm install
COPY public public
COPY src src
COPY tsconfig.json tsconfig.json
COPY .envdocker .env
RUN npm run build
WORKDIR /etc/ssl/certs/
COPY public.crt ./public.crt
COPY private.key ./private.key
WORKDIR /gui
COPY server.js server.js
CMD node server.js
EXPOSE 443