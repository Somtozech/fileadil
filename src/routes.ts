import { Router, Request, Response, NextFunction } from 'express';
import Upload from './upload';

const router = Router();

export default (options: any) => {
	const upload = new Upload(options.uploadOptions);

	router.post(
		'/single',
		upload.single('file'),
		(req: Request, res: Response, next: NextFunction) => {
			console.log(req.file);

			res.send({ message: 'Upload was successful' });
		}
	);

	router.get('/:url', (req: Request, res: Response, next: NextFunction) => {
		console.log(req.file);
	});

	return router;
};
