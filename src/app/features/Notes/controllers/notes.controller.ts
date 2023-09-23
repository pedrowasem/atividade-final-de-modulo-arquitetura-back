import { Request, Response } from 'express';
import {
	CreateNote,
	DeleteNote,
	FavoriteNote,
	ListAllNotes,
	StoreNote,
	UpdateNote,
} from '../usecase';

export class NotesController {
	public async create(req: Request, res: Response) {
		const { title, description } = req.body;
		const userId = req.user.id;

		const usecase = new CreateNote({
			title,
			description,
			userId,
		});

		const response = await usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}

		return res.status(201).json(response);
	}

	public async listNotes(req: Request, res: Response) {
		const userId = req.user.id;
		const { title, favorite, stored } = req.query;
		const titleParse: string | undefined = title as string | undefined;
		const favoriteParse: boolean = favorite === 'true';
		const storedParse: boolean = stored === 'true';

		const usecase = new ListAllNotes({ userId, titleParse, favoriteParse, storedParse });
		const response = await usecase.execute();

		if (!response.success) {
			return res.status(404).json(response);
		}
		return res.status(200).json(response);
	}

	public async update(req: Request, res: Response) {
		const { id } = req.params;
		const { title, description } = req.body;
		const userId = req.user.id;

		const usecase = new UpdateNote(
			{
				id,
				title,
				description,
			},
			userId,
		);

		const response = await usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}
		return res.status(200).json(response);
	}

	public async delete(req: Request, res: Response) {
		const { id } = req.params;
		const userId = req.user.id;

		const usecase = new DeleteNote(id, userId);

		const response = await usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}
		return res.status(201).json(response);
	}

	public async favorite(req: Request, res: Response) {
		const { id } = req.params;
		const userId = req.user.id;

		const usecase = new FavoriteNote(id, userId);

		const response = await usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}
		return res.status(201).json(response);
	}

	public async store(req: Request, res: Response) {
		const { id } = req.params;
		const userId = req.user.id;

		const usecase = new StoreNote(id, userId);

		const response = await usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}
		return res.status(201).json(response);
	}
}
