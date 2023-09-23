import Notes from '../../../models/notes.class';
import { NotesRepository } from '../repository';

type StoreNoteReturn = {
	success: boolean;
	message: string;
	updatedData?: Notes;
};

export class StoreNote {
	#id: string;
	#userId: string;

	constructor(id: string, userId: string) {
		this.#id = id;
		this.#userId = userId;
	}

	async execute(): Promise<StoreNoteReturn> {
		// const cacheRepository = new CacheRepository();

		const note = await new NotesRepository().store(this.#id);

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
