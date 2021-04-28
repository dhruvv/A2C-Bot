import { Client } from 'discord.js';
import tools from '../config/tools';

const watch = (client: Client) => {
	client.on('voiceStateUpdate', (oldState, newState) => {
		if (
			oldState.channelID === tools.config.channels.voiceChannel ||
			newState.channelID === tools.config.channels.voiceChannel
		) {
			if (oldState.channelID === null) {
				console.log('User joined!');
				// @ts-ignore
				let role: any = oldState.guild.roles.cache.find((r) => r.name === tools.config.roles.voiceChatRoleName);

				// @ts-ignore
				oldState.guild.members.cache.get(oldState.id).roles.add(role);
			} else if (newState.channelID === tools.config.channels.voiceChannel || newState.channelID === null) {
				console.log('User left!');
				// @ts-ignore
				newState.guild.members.cache
					.get(oldState.id)
					// @ts-ignore
					.roles.remove(oldState.guild.roles.cache.get(tools.config.roles.voiceChatRoleID));
			}
		}
	});
};

export default watch;
