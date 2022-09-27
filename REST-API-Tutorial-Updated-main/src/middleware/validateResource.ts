import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import logger from "../utils/logger";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    logger.info(" Input request body received  ---->>>> "+ JSON.stringify(req.body));
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      logger.info(" Input request body parsed sucessfully  ");
      next();
      logger.info(" comppleted next()  ");
    } catch (e: any) {
      console.log(e);
      return res.status(400).send(e.errors);
    }
  };

export default validate;
