import { Client, GuildMember } from 'discord.js';
import tools from '../config/tools';

const ordinal_suffix_of = (i: number): string => {
	let j = i % 10,
		k = i % 100;
	if (j == 1 && k != 11) {
		return i + 'st';
	}
	if (j == 2 && k != 12) {
		return i + 'nd';
	}
	if (j == 3 && k != 13) {
		return i + 'rd';
	}
	return i + 'th';
};

const query = (client: Client) => {
	client.on('guildMemberAdd', (member: GuildMember) => {
		const guild = client.guilds.cache.get(tools.config.serverId);

		// @ts-ignore
		let memberCount = client.guilds.cache.get(tools.config.serverId).memberCount;

		let rules = member.guild.channels.cache.get(tools.config.channels.rulesChannel);
		let introduction = member.guild.channels.cache.get(tools.config.channels.introductionChannel);
		let roles = member.guild.channels.cache.get(tools.config.channels.rolesChannel);
		let coalitionChat = member.guild.channels.cache.get(tools.config.channels.coalitionChat);
		let commonChat = member.guild.channels.cache.get(tools.config.channels.commonChat);

		const message: string = `Hey <@${member.id}>! Welcome and congrats on being the ${ordinal_suffix_of(
			memberCount
		)} member to join the r/ApplyingToCollege Discord server. After completing our ${rules} screening by clicking the complete button at the bottom of your screen, go introduce yourself to the server in ${introduction} & grab some roles in ${roles}. After that, come join the fun in our general chats ${coalitionChat} and ${commonChat}!`;

		try {
			// @ts-ignore
			client.users.cache.get(member.id).send(message);
		} catch (err) {
			console.log(err);
		}
	});
};

export default query;
