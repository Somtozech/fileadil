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
	resource_id: string;
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

export interface IDatabase {
	add(file: File): Promise<UploadFile>;
	getFile(id: string): Promise<UploadFile>;
}

export default class Database implements IDatabase {
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
	async add(file: File) {
		const newFile: UploadFile = {
			id: generateRandomString(16),
			name: file.filename,
			bytes: file?.size,
			mimetype: file?.mimetype,
			uploaded_at: new Date(),
			url: file.path,
			resource_id: file.path,
		};

		this.db.get('files').push(newFile).write();

		return newFile;
	}

	async getFile(id: string) {
		const file = this.db.get('files').find({ id }).value();
		return file;
	}
}
