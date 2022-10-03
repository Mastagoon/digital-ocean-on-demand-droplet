/*
 * This example uses discord.js to create a bot that will spin up a game server on !start command
 * The bot poles the server every 30 seconds to check for player count, and will shut down the server if no players are present for 30 minute
 */
import { config } from "dotenv"
import Log from "../../src/util/logger.js"
import Discord, { Collection, Message } from "discord.js"
import { destroyServer, isServerUp, spawnNewServer } from "../../src/actions"
config()

let idle_timer = 0
let pause = false

// setting up discord bot
const bot = new Discord.Client({
  intents: ["GUILD_MESSAGES", "GUILDS"],
})

bot.on("ready", async () => {
  Log.info(`Logged in as ${bot.user?.username}`)
  setInterval(async () => {
    const st = await isServerUp()
    // Check game population ever 1 minute
    if (st) {
      const count = await getPlayerCount(
        st.networks.v4.find((n) => n.type === "public")?.ip_address ?? ""
      )
      Log.debug(`Player count: ${count} (${idle_timer})`)
      bot.user?.setActivity(`with ${count} players`, { type: "PLAYING" })
      if (count === 0) idle_timer++
      else idle_timer = 0
      if (idle_timer >= 15) {
        bot.user?.setActivity("Game Name", { type: "PLAYING" })
        await destroyServer()
        idle_timer = 0
      }
    } else bot.user?.setActivity(`Server offline`)
  }, 120000)
})

bot.on("messageCreate", async (msg: Message) => {
  if (!msg.channel || msg.bot) return
  if (msg === "!start") {
    if (pause) return msg.reply(`Please wait for the server to start`) // command has been used recently
    pause = true
    setTimeout(() => {
      pause = false
    }, 1000 * 60 * 5) // 5 minutes
    const up = await isServerUp()
    if (up) return msg.reply(`Server is already up`)
    msg.reply(`Starting server, this could take a few minutes...`)
    const server = await spawnNewServer()
    if (server) msg.reply(`Server is up and running!`)
    else msg.reply(`Server failed to start`)
  }
})

const getPlayerCount = async (ip: string) => {
  try {
    const result = await fetch(`http://${ip}:8080/players`)
    return result.body ?? 0
  } catch (err: any) {
    Log.error(`Error getting player count`)
    console.log(err)
    return 0
  }
}
