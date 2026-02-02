import joi from "joi";

export const validate = (schema) => {
    return (req,res,next)=>{
        const {error} = schema.validate(req.body, {abortEarly: false});
        if(error){
            const errorMessage =error.details.map((detail)=> detail.message).join(" ")
            return res.status(400).json({error: errorMessage});
        }
        next()
    }
}

export const createUserValidation = joi.object({
  firstName: joi
    .string()
    .min(2)
    .max(20)
    .required()
    .messages({ "srting.empty": "First name is required" }),
  lastName: joi
    .string()
    .min(2)
    .max(20)
    .required()
    .messages({ "string.empty": "Last name is required" }),
  email: joi
    .string()
    .email()
    .required()
    .messages({ "string.email": "Please provide valid email address" }),
  phone: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({ "string.pattern.base": "Phone number must be 10 digits" }),
  password: joi
    .string()
    .min(6)
    .pattern(new RegExp("(?=.*[A-Z])"))
    .pattern(new RegExp("(?=.*[!@#$%^&*])")) 
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one special character",
    }),
    image: joi.string().optional()
});

export const updateUserValidate = joi.object({
    firstName: joi.string().min(2).max(20).optional(),
    lastName: joi.string().min(2).max(20).optional(),
    email: joi.string().email().optional(),
    phone: joi.string().pattern(/^[0-9]{10}$/).messages({"string.pattern.base":"Phone number must be 10 digits"}),
    image: joi.string().optional(),
})