import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createReadStream } from 'fs';
import { IDatabase } from './db';

export default class Controller {
	private readonly db: IDatabase;

	constructor(db: IDatabase) {
		this.db = db;
	}

	getAsset = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const asset = await this.db.getFile(req.params.publicId);

			if (!asset) {
				return res.status(404).send('File Not Found');
			}

			const { url, mimetype } = asset;
			const filePath = path.join(process.cwd(), url);

			const stream = createReadStream(filePath);

			// This will wait until we know the readable stream is actually valid before piping
			stream.on('open', () => {
				res.setHeader('Content-Type', mimetype);
				stream.pipe(res);
			});

			stream.on('error', (error: Error) => {
				return res.status(404).send('File Not Found');
			});
		} catch (error) {
			res.status(404).send('An error occurred');
		}
	};
}
