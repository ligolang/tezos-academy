ARG BUILDER_IMAGE="node:16"
ARG RUNNER_IMAGE="joseluisq/static-web-server:2.9-alpine"

FROM ${BUILDER_IMAGE} as builder

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

FROM ${RUNNER_IMAGE}

ENV NODE_ENV production
ENV SERVER_FALLBACK_PAGE /public/index.html
COPY --from=builder /app/src/frontend/build /public

EXPOSE 3000

ENTRYPOINT ["static-web-server", "--root", "/public" , "-g", "INFO" ,"-p" , "3000"]
