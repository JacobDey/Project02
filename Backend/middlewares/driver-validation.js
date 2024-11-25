import validator from "express-validator";
import { Customer } from "../models/customer";
const { check, oneOf } = validator;

export const driverRegister = [
  check("username")
    .bail()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Username must be a minimum 5 characters.")
    .custom(async (value) => {
      const existingUser = Customer.findOne({ username: value });
      if (existingUser) throw new Error("Username already in use.");
    }),

  check("email")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail()
    .custom(async (value) => {
      const existingUser = await Customer.findOne({ email: value });
      if (existingUser) throw new Error("Email already in use");
    }),

  check("password")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be a minimum of 8 characters")
    .bail()
    .matches(/\d/)
    .withMessage("Password must contain at least one numeric character")
    .bail()
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password should contain at least one special character"),

  check("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

export const driverLogin = [
  oneOf([
    check("username")
      .isLength({ min: 5 })
      .withMessage("Username minimum length 5."),

    check("username").isEmail().withMessage("Invalid email address."),
  ]),

  check("password").exists().withMessage("Incorrect password"),
];
