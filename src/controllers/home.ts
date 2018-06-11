import { Request, Response } from 'express';
/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  res.send('Hello world.');
};
/**
 * GET /health-check
 * Health check
 */
export let healthCheck = (req: Request, res: Response) =>
  res.sendStatus(200); // O.K.
