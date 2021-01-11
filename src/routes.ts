import { Router, Request, Response, NextFunction } from 'express';
import Upload from './upload';
import db from './db';
import Controller from './controller';

const router = Router();

export default (options: any) => {
	const upload = new Upload(options.uploadOptions);
	const database = new db();
	const controller = new Controller(database);

	router.post(
		'/single',
		upload.single('file'),
		async (req: Request, res: Response, next: NextFunction) => {
			await database.add(req.file);
			res.send({ message: 'Upload was successful' });
		}
	);

	router.get('/:publicId', controller.getAsset);

	return router;
};
