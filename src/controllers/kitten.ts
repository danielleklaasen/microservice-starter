import { Request, Response } from 'express';
import { default as Kitten } from '../models/Kitten';

/**
 * POST /kitten
 * Post a new kitten.
 */
export let postKitten = (req: Request, res: Response) => {
  const kitty = new Kitten({ name: req.body.name });

  kitty.saveAsync()
    .then((kitten) => {
      res.send(kitten);
    })
    .catch((error) => {
      res.send(error);
    });
};

/**
 * GET /kittens
 * Get all kittens.
 */
export let getAllKittens = (req: Request, res: Response) => {
  Kitten.findAsync()
    .then((kittens) => {
      res.send(kittens);
    })
    .catch((error) => {
      res.send(error);
    });
};

/**
 * POST /kitten/:id
 * Update a kitten by ID.
 */
export let updateKitten = (req: Request, res: Response) => {
  Kitten.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    .then((kitten) => {
      res.send(kitten);
    })
    .catch((error) => {
      res.send(error);
    });
};

/**
 * DELETE /kitten/:id
 * Update a kitten by ID.
 */
export let deleteKitten = (req: Request, res: Response) => {
  Kitten.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send('success');
    })
    .catch((error) => {
      res.send(error);
    });
};
