import { Router } from 'express';
import { NotesController } from './controllers';
import {
	validateNoteId,
	validateNotesData,
	validateToken,
	validateUpdateNoteData,
} from './middlewares';

export const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.post('/', validateToken, validateNotesData, notesController.create);

notesRoutes.get('/', validateToken, notesController.listNotes);

notesRoutes.put(
	'/:id',
	validateToken,
	validateNoteId,
	validateUpdateNoteData,
	notesController.update,
);

notesRoutes.put('/:id/favorite', validateToken, validateNoteId, notesController.favorite);

notesRoutes.put('/:id/store', validateToken, validateNoteId, notesController.store);

notesRoutes.delete('/:id', validateToken, validateNoteId, notesController.delete);
