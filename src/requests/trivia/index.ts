import axios from 'axios';
import { Client, Message } from 'discord.js';
import tools from '../../config/tools';

let qs;
let ans;

const trivia = (client: Client) => {
	client.on('message', async (message: Message) => {
		let content: Array<string> = message.content.split(' ');
		if (
			content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-trivia` ||
			content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-t`
		) {
			try {
				const data: any = await triviaReq();
				qs = data[0].question;
				ans = data[0].answer;

				message.channel.send(
					`Question: ${qs}\nUse \`\`!a2c-guess\`\`to check your response or \`\`!a2c-ans\`\` to see the answer!`
				);
				console.log(ans);
			} catch (err) {
				console.log(err);
			}
		} else if (content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-ans`) {
			message.channel.send(`Question: ${qs}\nAnswer: ${ans}`);
		} else if (content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-guess`) {
			let builder: string = '';
			for (let i = 1; i < content.length; i++) {
				builder += ` ${content[i]}`;
			}

			console.log(builder);

			if (builder.toLowerCase() === ` ${ans.toLowerCase()}`) {
				message.channel.send(`Nice!`);
			} else {
				message.channel.send(`Oh no :( try again!`);
			}
		}
	});
};

const triviaReq = async (): Promise<string> => {
	const res = await axios.get(`https://jservice.io/api/random`);

	return res.data;
};

export default trivia;
