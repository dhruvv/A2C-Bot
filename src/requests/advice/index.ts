const axios = require('axios');
import { Client, Message } from 'discord.js';
import tools from '../../config/tools';

const advice = (client: Client) => {
	client.on('message', async (message: Message) => {
		let content: Array<string> = message.content.split(' ');
		if (
			content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-advice` ||
			content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-a`
		) {
			try {
				let advice = await getAdvice();

				message.channel.send(`${advice}`);
			} catch (err) {
				console.log(err);
			}
		}
	});
};

const getAdvice = async (): Promise<string> => {
	const res = await axios.get(`https://api.adviceslip.com/advice`);

	return res.data.slip.advice;
};

export default advice;
