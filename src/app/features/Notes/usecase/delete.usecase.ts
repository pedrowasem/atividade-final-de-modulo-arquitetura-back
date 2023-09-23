import { NotesRepository } from '../repository';

type DeleteNoteReturn = {
	success: boolean;
	message: string;
	deletedNoteId?: string;
};

export class DeleteNote {
	#id: string;
	#userId: string;

	constructor(id: string, userId: string) {
		this.#id = id;
		this.#userId = userId;
	}

	async execute(): Promise<DeleteNoteReturn> {
		// const cacheRepository = new CacheRepository();

		const id = await new NotesRepository().delete(this.#id);

		// await cacheRepository.delete(`list-notes-${this.#userId}`);

		return {
			success: true,
			message: 'Note deleted successfully',
			deletedNoteId: id,
		};
	}
}
