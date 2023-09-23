import { Express, Request, Response } from 'express';
import { notesRoutes } from '../../app/features/Notes/notes.routes';
import { usersRoutes } from '../../app/features/Users/users.routes';

export function rotasApp(app: Express) {
	app.get('/', (req: Request, res: Response) => {
		res.status(200).json({ message: 'OK' });
	});

	app.use('/users', usersRoutes);
	app.use('/notes', notesRoutes);
}
