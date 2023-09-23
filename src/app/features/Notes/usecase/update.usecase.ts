import Notes from '../../../models/notes.class';
import { NotesRepository } from '../repository';

export type UpdateNoteDTO = {
	id: string;
	title: string;
	description: string;
};

type UpdateReturn = {
	success: boolean;
	message: string;
	updatedData?: Notes;
};

export class UpdateNote {
	#data: UpdateNoteDTO;
	#userId: string;

	constructor(data: UpdateNoteDTO, userId: string) {
		this.#data = data;
		this.#userId = userId;
	}

	public async execute(): Promise<UpdateReturn> {
		// const cacheRepository = new CacheRepository();

		const note = new NotesRepository().getNoteById(this.#data.id);
		if (!note) {
			return {
				success: false,
				message: 'Id does not exist',
			};
		}

		const { id, title, description } = this.#data;

		const updateNote = await new NotesRepository().update(id, { title, description });

		// await cacheRepository.delete(`list-notes-${this.#userId}`);

		return {
			success: true,
			message: 'Note updated successfully',
			updatedData: updateNote,
		};
	}
}
