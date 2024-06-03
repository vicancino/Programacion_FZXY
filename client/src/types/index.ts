import { z } from "zod";
// Formato de Datos

/** Auth & Users */

const authSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	password_confirmation: z.string(),
	token: z.string(),
});

type Auth = z.infer<typeof authSchema>;

// Login de Usuarios
export type UserLoginForm = Pick<Auth, "email" | "password">;

// Registro de Usuarios
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">;

// Confirmacion de Usuarios
export type ConfirmToken = Pick<Auth, "token">;

// Solicitar nueva confirmacion
export type RequestConfirmationCodeForm = Pick<Auth, "email">;

// Solicitar reestablecer contrasena
export type ForgotPasswordForm = Pick<Auth, "email">;

// Nueva contrasena
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;

/** Asists and Logs */
const asistSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	status: z.boolean(),
});

type Asists = z.infer<typeof asistSchema>;

export type AsistRegistrationFrom = Pick<Asists, "name" | "email">;
