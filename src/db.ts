import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileSync';
import { generateRandomString } from './util';

interface UploadFile {
	id: string;
	name: string;
	bytes?: number;
	url: string;
	uploaded_at: Date;
	mimetype: string;
}

interface File {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	size: number;
	destination: string;
	filename: string;
	path: string;
}

export default class Database {
	private db: any;
	private source: string;
	constructor(path = 'db.json') {
		this.source = path;
		this.init();
	}

	private init() {
		const adapter = new FileAsync(this.source);
		this.db = lowdb(adapter);

		this.db.defaults({ files: [] }).write();
	}

	/** File - Multer File */
	async add(file: File): Promise<UploadFile> {
		const newFile: UploadFile = {
			id: generateRandomString(16),
			name: file.filename,
			bytes: file?.size,
			mimetype: file?.mimetype,
			uploaded_at: new Date(),
			url: file.path,
		};

		console.log(newFile);

		this.db.get('files').push(newFile).write();

		return newFile;
	}
}
