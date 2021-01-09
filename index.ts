import { Router } from 'express';
import routes from './src/routes';
import { Options } from 'multer';

interface FileadilOptions {
	apiRoute?: string;
	provider?: string;
	uploadOptions?: Options;
}

interface Fileadil {
	(app: Router, options?: Readonly<FileadilOptions>): void;
}

const defaultOptions = {
	apiRoute: '/uploads/',
	provider: 'fs',
};

const fileadil: Fileadil = (app, fileadilOptions) => {
	if (!app || typeof app.use !== 'function') {
		throw new Error('`Express Application is required as parameter`');
	}

	const options = Object.assign(defaultOptions, fileadilOptions);

	app.use(options.apiRoute, routes(options));
};

export default fileadil;
