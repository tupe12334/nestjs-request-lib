import { ExecutionContext } from "@nestjs/common";

export function requestFactory<RequestType>(
  ctx: ExecutionContext
): RequestType {
  const contextType = ctx.getType();
  if (contextType === "http") {
    // do something that is only important in the context of regular HTTP requests (REST)
    const request = ctx.switchToHttp().getRequest();
    return request;
  } else if (contextType === "rpc") {
    // do something that is only important in the context of Microservice requests
    throw new Error("Rpc context is not implemented yet");
  } else if (contextType === "ws") {
    // do something that is only important in the context of Websockets requests
    throw new Error("Websockets context is not implemented yet");
  } else if (contextType === "graphql") {
    // inline require here, since we don't want to require the graphql module in the package.
    const { GqlExecutionContext } = require("@nestjs/graphql");
    // do something that is only important in the context of GraphQL requests
    const gqlExecutionContext = GqlExecutionContext.create(ctx);
    const request = gqlExecutionContext.getContext().req;
    return request;
  }
  throw new Error("Invalid context");
}
