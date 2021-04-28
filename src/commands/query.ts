import { Client, Message } from 'discord.js';
import tools from '../config/tools';

type ArrString = Array<string>;
// make sat and act data type

process.on('uncaughtException', function (error) {
	console.log(error.stack);
});

const shuffle = (array: ArrString): ArrString => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

const query = (client: Client) => {
	client.on('message', async (message: Message) => {
		try {
			let content: ArrString = message.content.split(' ');
			if (content.length > 1) {
				if (
					content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-random` ||
					content[0] === `${tools.config.cmdPrefix}${tools.config.cmdWord}-r`
				) {
					content.shift();
					content = shuffle(content);

					for (let i = 0; i < content.length; i++) {
						message.channel.send(content[i]);
					}
				}
			} else if (
				content[0] === `${tools.config.cmdPrefix}a2c-help` ||
				content[0] === `${tools.config.cmdPrefix}a2c-h`
			) {
				message.channel.send(
					'\n**A2C Command List**\n```bash\n"College Randomizer"\n!a2c-random college1 college2 .... OR !a2c-r college1 college2 ....\n"Word definition" \n!a2c-define word OR !a2c-d word OR .def word \n"Trivia Fun!" \n!a2c-trivia OR !a2c-t\n"Words of Advice"\n!a2c-advice OR !a2c-a```'
				);
			} else if (content[0] === `${tools.config.cmdPrefix}a2c`) {
				message.channel.send('Please specify a search term. ```Ex: "!a2c-h"```');
			} else if (content[0] === `${tools.config.cmdPrefix}a2c-random`) {
				message.channel.send(
					"Please specify the colleges you're interested in, seperated by spaces. ```Ex: !a2c-random Cornell Harvard Dartmouth```"
				);
			}
		} catch (error) {
			message.channel.send('An issue occured');
			console.log(error);
		}
	});
};

export default query;
