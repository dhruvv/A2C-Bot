const axios = require('axios');
import { Client, Message } from 'discord.js';
import tools from '../../config/tools';

let wordDef: string;

const dictionary = (client: Client) => {
	client.on('message', async (message: Message) => {
		let content: Array<string> = message.content.split(' ');
		if (
			content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-define` ||
			content[0] === `.def` ||
			content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-d`
		) {
			try {
				let def = await defineWord(content[1]);
				JSON.stringify(def);

				message.channel.send(`${def}`);
			} catch (err) {
				console.log(err);
			}
		}
	});
};

const defineWord = async (word: string): Promise<string> => {
	const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);

	console.log(res.data[0].meanings[0].definitions[0].definition);
	console.log(res.status);

	return res.data[0].meanings[0].definitions[0].definition;
};

export default dictionary;
