import { Router, Request, Response, NextFunction } from 'express';
import Upload from './upload';
import db from './db';

const router = Router();

export default (options: any) => {
	const upload = new Upload(options.uploadOptions);
	const database = new db();

	router.post(
		'/single',
		upload.single('file'),
		async (req: Request, res: Response, next: NextFunction) => {
			await database.add(req.file);
			res.send({ message: 'Upload was successful' });
		}
	);

	router.get('/:url', (req: Request, res: Response, next: NextFunction) => {
		console.log(req.file);
	});

	return router;
};
