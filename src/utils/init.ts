import TWIClient from "../structs/TWIClient";
import {start} from "./notify";

export default (client: TWIClient) => {
    start(client)
    client.tmi.removeAllListeners()
    client.discord.removeAllListeners()
    client.tmi.on('message', (channel, tag, msg, self) => {
        require('./twitch/handler').default(client, channel, tag, msg, self)
    })
    client.discord.on('message', msg => require('./discord/handler').default(msg, client))
    if (client.dokdo) {
        client.discord.on('message', client.dokdo.run.bind(client.dokdo))
    }
}