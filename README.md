# Discord Bot

## Usage   

1. Download the code / Clone the repo
2. Run `npm install` or `yarn install`
3. Create a `.env` file in the root folder, containing `DISCORD_TOKEN="Your Bot Token Here"`. Note:- To create a bot:
    - Go to https://discord.com/developers/applications
    - "New Application"
    - Click "Bot"
    - Copy the token and paste it into the .env file
    To then invite the bot:
    - Go to the Application page
    - Click on your bot's page
    - Go to the "Auth2" tab
    - Click the "Bot" checkbox under "Scopes"
    - Tick the permissions you want the bot to have
    - Copy the URL and open it, this will give you a list of servers that your bot can join.  
4. Create a `DISCORD_TOKEN_DEV` environment variable when developing, this should be a bot token (refer to the guide above).  
5. Create a  `MONGODB_URI` environment variable with a connection string to a MongoDB.   
6. Run `npm run dev` 

## Troubleshooting
### Node-Canvas error
If you get an error when running `npm install` relating to Node-Canvas. Try lowering your Node version. This repo was built on `v14.15.0`.

### Bot is running fine, but message content is empty
An update to the Discord bot application made privileged gateway intentions disabled by default.
    - Go to https://discord.com/developers/applications
    - Select application > Bot > Privileged Gateway Intents
    - Make sure 'MESSAGE CONTENT INTENT' is enabled
    - Enable any other intents that apply


## Commands
8ball, choose, combine, commands, dbcheckroles, dbstorerole, deletereminder, genre, getreminders, help, keys, meme, netflix, osrs, randomname, remind, roll, strike, thanks, unstrike.