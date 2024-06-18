import { Router } from "express";
import { AsistController } from "../controllers/AsistControllers";

const routerAsist = Router();

/**
 * @swagger
 * tags:
 *   name: Get users from the database
 *   description: Get all users from the database
 * /asist/users:
 *   get:
 *     summary: Show all users from the database
 *     tags: [Get users from the database]
 *     responses:
 *       200:
 *         description: Usuario no registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: 'Juan Perez'
 *                 email:
 *                   type: string
 *                   example: 'juanperez@gmail.com'
 *       500:
 *         description: Some server error
 *
 */

routerAsist.get("/users", AsistController.getUsers);

/**
 * @swagger
 * tags:
 *   name: Search for existing user
 *   description: Search for the existance of a user on the database
 * /asist/new-user:
 *   post:
 *     summary: Search for existing user
 *     tags: [Search for existing user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: 'Juan Perez'
 *                 email:
 *                   type: string
 *                   example: 'juanperez@gmail.com'
 *     responses:
 *       404:
 *         description: Usuario ya registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'El Email ingresado ya se encuentra registrado'
 *       500:
 *         description: Some server error
 *
 */

routerAsist.post("/new-user", AsistController.newUser);

export default routerAsist;
