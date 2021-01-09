import multer, { Multer, Options, Field } from 'multer';
import { generateRandomString } from './util';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},

	filename: function (req, file, cb) {
		const uniqueSuffix = generateRandomString(10);

		const name = file.fieldname + '-' + uniqueSuffix + file.originalname;

		cb(null, name);
	},
});

export default class Upload {
	private multerInstance: Multer;

	constructor(options: Options) {
		this.multerInstance = multer({ ...options, storage });
	}

	single = (file: string) => this.multerInstance.single(file);

	array = (file: string, maxCount?: number) =>
		this.multerInstance.array(file, maxCount);

	fields = (files: Array<Field>) => this.multerInstance.fields(files);
}
