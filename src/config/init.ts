import { Client } from 'discord.js';
import tools from './tools';
import welcome from '../commands/welcome';
import query from '../commands/query';
import dictionary from '../requests/dictionary/index';
import advice from '../requests/advice/index';
import trivia from '../requests/trivia/index';
import watch from '../montitor-vc/watch';

class Bot {
	private _client: Client;

	constructor() {
		this._client = new Client();
	}

	public start(): void {
		this._client.on('ready', () => {
			console.log('--- Online ---');
			welcome(this._client);
			query(this._client);
			dictionary(this._client);
			advice(this._client);
			trivia(this._client);
			watch(this._client);
			// @ts-ignore
			this._client.user.setActivity(tools.config.watching, { type: 'WATCHING' });
		});
		this._client.login(tools.config.token);
	}
}

export default Bot;
