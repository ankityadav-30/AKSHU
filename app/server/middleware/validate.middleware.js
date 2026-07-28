import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema, source = "body") => {
    return async (req, res, next) => {
        try {
            const validatedData = await schema.parseAsync(req[source]);

            req[source] = validatedData;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map((item) => ({
                    field: item.path.join("."),
                    message: item.message,
                }));

                return next(
                    new ApiError(
                        422,
                        "Validation failed",
                        errors
                    )
                );
            }

            next(error);
        }
    };
};

export default validate;