# Exmaple usage with discordjs

This simple file includes a discord bot that can spin up a droplet with a command. A game is running on that server by using a simple startup script, and the bot queries the server every few sceonds to check the count of online players.
If the count is 0 for a certain amount of time, the server is then backed-up and destroyed to save resources.
