import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Service } from "typedi";

@Middleware({ type: "after" })
@Service()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: any) {
    response.status(error.httpCode || 500);
    response.json({
      code: error.httpCode || 500,
      name: error.name,
      message: error && typeof error === "string" ? error : error?.message,
      errors: error.errors,
    });

    next();
  }
}
