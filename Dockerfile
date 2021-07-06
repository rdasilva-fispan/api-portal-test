# FROM node:16-alpine3.11
# EXPOSE 8080
# RUN mkdir -p openapi
# WORKDIR openapi
# COPY openapi .
# RUN npm install -g npm@7.19.1
# CMD ["npx", "@redocly/openapi-cli@latest", "preview-docs"]


FROM node:16-alpine3.11
RUN npm install -g npm@7.19.1
RUN npm install -g swagger-ui-cli
RUN mkdir -p api-portal
WORKDIR api-portal
COPY . .
EXPOSE 8080
RUN npx @redocly/openapi-cli@latest bundle --output fispan-api --ext yaml
CMD ["swagger-ui", "fispan-api.yaml"]
