import ApiError from "../utils/ApiError.js";

// Usage: validate(schema) for body, validate(schema, "params") for params
const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message.replace(/"/g, ""),
      }));
      return next(new ApiError(400, "Validation failed", errors));
    }

    if (source === "body") req.body = value;
    next();
  };

export default validate;
