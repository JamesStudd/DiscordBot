# Discord Bot

Just a small Discord bot used on our server, so far has 4 commands:  

- RandomName  
Produces a random name from the template [FirstName] [Adjective/Quantity][Verb], also uses alliteration if possible, producing names like:  
    - Danny Deadplants
    - Sally Sixcrumpets
    - Richie Rotten Shirts
    - Stevie Sixjeans
- Combine
Combines X amount of emojis together into a single emoji. This was an idea that spawned from [Twitch.tv](http://www.twitch.tv)'s emotes that could be overlaid onto others, such as the Ice Block at Christmas. Can take in custom emojis or unicode emojis (using Twemoji). Also allows for optional overrides on the position/width/height. Produces results such as:  
![Example of Combine](https://i.imgur.com/kOmgDer.png)  
![Another Example of Combine](https://i.imgur.com/7uDwrdn.png)
- Meme
Produces an image of an emoji with text overlaid on the top and bottom, similar to the old meme formats, producing:
![Example of meme](https://i.imgur.com/JbON6Un.png)  
- Help
Posts an embed with the commands and how to use them.
![Help Command](https://i.imgur.com/XIVyPTb.png)  

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
4. Run `npm run dev` 

## Libraries Used
- **Canvas**
    Allows canvases to be created and images to be created using canvas.toBuffer
- **Discord.js**
    Discord bot API
- **Dotenv**
    Allows environment variables to be set using the .env file
- **Emoji-regex**
    Provides a regex to test for unicode emojis
- **Twemoji**
    Allows conversion of emoji unicode to pngs

### Dev
- **Babel**
    Allows use of next generation JavaScript and compiles it down to normal JavaScript
- **Nodemon**
    Allows reloading of files whenever a new change is detected, speeding up development
