FROM node:18
WORKDIR /gui
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install
COPY public public
COPY src src
COPY tsconfig.json tsconfig.json
COPY .envdocker .env
RUN npm run build
COPY public.crt public.crt
COPY private.key private.key
COPY server.js server.js
CMD node server.js
EXPOSE 443
