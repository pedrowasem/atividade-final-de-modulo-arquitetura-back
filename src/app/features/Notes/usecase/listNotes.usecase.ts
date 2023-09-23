import { NotesRepository } from '../repository';

export type ListNotesFiltersDTO = {
	userId: string;
	titleParse?: string;
	favoriteParse?: boolean;
	storedParse?: boolean;
};

type ListNotesReturn = {
	success: boolean;
	message: string;
	notes: any;
};

export class ListAllNotes {
	#data: ListNotesFiltersDTO;

	constructor(data: ListNotesFiltersDTO) {
		this.#data = data;
	}
	async execute(): Promise<ListNotesReturn> {
		// const cacheRepository = new CacheRepository();

		// let notes = await cacheRepository.get<Notes[]>(`list-notes-${this.#data.userId}`);

		// if (!notes) {
		const repository = new NotesRepository();

		const notes = await repository.listNotes(this.#data);

		// await cacheRepository.set(`list-notes-${this.#data.userId}`, notes);
		// }

		if (!notes.length) {
			return {
				success: true,
				message: 'Notes not found',
				notes: [],
			};
		}
		return {
			success: true,
			message: 'Listed all notes successfully',
			notes: notes,
		};
	}
}
