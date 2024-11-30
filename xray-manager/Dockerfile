FROM node:18-alpine

ARG APP_MODE

ENV ENV_APP_MODE=${APP_MODE}

WORKDIR /xray-manager

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN if [ "${APP_MODE}" = "production" ]; then \
        npm install --production; \
        npm install @nestjs/cli; \
    else \
        npm install; \
    fi

RUN if [ "${APP_MODE}" = "production" ]; then \
        npm run build; \
        npm uni @nestjs/cli; \
    fi

CMD ["/bin/sh", "-c", "\
        if [ \"$ENV_APP_MODE\" = \"production\" ]; then \
            echo \"Running in production mode\"; \
            npm run start:prod; \
        else \
            echo \"Running in development mode\"; \
            npm run dev; \
        fi"]
