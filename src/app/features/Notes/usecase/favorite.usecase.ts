import Notes from '../../../models/notes.class';
import { NotesRepository } from '../repository';

type FavoriteNoteReturn = {
	success: boolean;
	message: string;
	updatedData?: Notes;
};

export class FavoriteNote {
	#id: string;
	#userId: string;

	constructor(id: string, userId: string) {
		this.#id = id;
		this.#userId = userId;
	}

	async execute(): Promise<FavoriteNoteReturn> {
		// const cacheRepository = new CacheRepository();

		const note = await new NotesRepository().favorite(this.#id);

		if (!note) {
			return {
				success: true,
				message: 'Note not found',
			};
		}
		// await cacheRepository.delete(`list-notes-${this.#userId}`);

		return {
			success: true,
			message: 'Note updated successfully',
			updatedData: note,
		};
	}
}
