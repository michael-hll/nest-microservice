import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (field: keyof any | undefined, ctx: ExecutionContext) => {
    const request = GetRequestFromContext(ctx);
    return request['user'];
  },
);

export function GetRequestFromContext(context: ExecutionContext) {
  const request = context.switchToHttp().getRequest<Request>();    
  return request;
}