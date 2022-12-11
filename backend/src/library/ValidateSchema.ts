// import Joi, { ObjectSchema } from "joi";
// import { NextFunction, Response, Request } from "express";
// import Logging from "./Logging";
// import { ITodos } from "../models/Todos";

// export const ValidateSchema = (schema: ObjectSchema) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.validateAsync(req.body);
//     } catch (error) {
//       Logging.error(error);
//       return res.status(422).json({ error });
//     }
//   };
// };

// export const Schemas = {
//   todos: {
//     create: Joi.object({
//       author: Joi.string().required(),
//       title: Joi.string().required(),
//       description: Joi.string().required(),
//     }),
//     update: Joi.object({
//       author: Joi.string().required(),
//       title: Joi.string().required(),
//       description: Joi.string().required(),
//       isDone: Joi.boolean().required(),
//     }),
//   },
// };
