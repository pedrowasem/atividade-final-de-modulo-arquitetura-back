import Notes from '../../../models/notes.class';
import { NotesRepository } from '../repository';

export type CreateNoteDTO = {
	title: string;
	description: string;
	userId: string;
};

export type CreateNoteModelDTO = {
	id: string;
	title: string;
	description: string;
	userId: string;
	createdAt: Date;
	favorite: boolean;
	stored: boolean;
};

type NewType = Notes;

type CreateNoteReturn = {
	success: boolean;
	message: string;
	note?: NewType;
};

export class CreateNote {
	#data: CreateNoteDTO;

	constructor(data: CreateNoteDTO) {
		this.#data = data;
	}

	async execute(): Promise<CreateNoteReturn> {
		// const cacheRepository = new CacheRepository();

		const newNote = await new NotesRepository().create(this.#data);

		// await cacheRepository.delete(`list-notes-${this.#data.userId}`);

		return { success: true, message: 'Note created successfully', note: newNote };
	}
}
