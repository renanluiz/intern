<h1 align="center">
  <br>
  <img height="300px" src="https://i2.wp.com/www.vidadetrainee.com/wp-content/uploads/programa-estagiar-globo.gif?resize=730%2C730&ssl=1" alt="Estagiar na Globo">
  <br>
  Intern Bot
  <br>
</h1>

<h4 align="center">A fun music and moderation bot for Discord.</h4>

<p align="center">
     <img alt="Discord Server" src="https://img.shields.io/discord/766689500985688084">
  <a href="https://discord.js.org/#/">
    <img alt="DiscordJs Framework" src="https://img.shields.io/badge/DiscordJS-v12.5-blue">
  </a>
  <a href="https://github.com/renanluiz/intern/stargazers">
    <img src="https://img.shields.io/github/stars/renanluiz/intern?color=yellow" alt="Project Stars">
  </a>
    <a href="https://nodejs.org/dist/latest-v14.x/docs/api/">
    <img src="https://img.shields.io/badge/NodeJs-v14-brightgreen" alt="NodeJs Documentation">
  </a>
</p>

<p align="center">
  <a href="#overview">Overview</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#features">Features</a>
</p>

# Overview

The Intern bot is a discord fellow always up to help you by playing songs from youtube/soundcloud, searching for lyrics, and some basic server administration functionallities.
The bot is always present in our happy hours and has very interesting commands. This project was built using Nodejs, DiscordJS and was based on Evobot's project, 
which you can check out by <a href="https://github.com/eritislami/evobot">clicking here</a>.

This is a *self-hosted bot* – meaning you will need to host and maintain your own instance in order to use it.

# Installation
Clone the repository locally

```
git clone https://github.com/renanluiz/intern.git
```

Before installing the dependencies, fill in the config.json file with your tokens and some basic configuration

```
{
  "TOKEN": "", // Your personal Discord Bot Token
  "YOUTUBE_API_KEY": "", // Your personal Youtube API Key
  "SOUNDCLOUD_CLIENT_ID": "", // Your personal SoundCloud API Key 
  "MAX_PLAYLIST_SIZE": 10, // Maximum playlist size
  "PREFIX": "/", // Prefix which is going to be used for your commands
  "PRUNING": false,
  "DEFAULT_VOLUME": 50, // Default bot volume (in percentage)
  "STAY_TIME": 30 // Amount of time the bot will stay on the channel before leaving (in seconds)
}

```
<h3>Now install the dependencies</h3>

```
npm install
npm start //Run project
```

If after reading the guide you are still experiencing issues, feel free to open a issue or contact me
[here](mailto:renansouzaoliveira10@gmail.com).

# Features
Type [token]command + argument 
```
/play panic at the disco
```
<div align-text="center">
<a href="https://ibb.co/8bYPK2Z"><img src="https://i.ibb.co/QkDYbnw/image.png" alt="image" height="320px" align="left" ></a>
You can also use reactions to interact with the songs currently playing.

```
/play [song title]
/pause
/stop
/resume
/skipto [number of the song in the queue]
/volume [number (in percentage)]
/procurar [artist/song]
/fila
/help
/uptime
/area [your job role]
/limpar

And much more! 
```

 </div>
 
<h3> You can ask the bot to search for songs by using /procurar + artist/song and it will return you a list of results it could find.</h3>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/QKcQ4JK/image.png" alt="image" height="300px" border="0"></a>
<a href="https://ibb.co/W5fM9ds"><img src="https://i.ibb.co/dMDV937/image.png" alt="image" height="300px" border="0"></a> 
<br>
From that list, you can select the songs you like by typing the numbers splitted by "," e.g: 1,5,8,9

### Clone the repo and create your own instance to start using and unlock all of its functionalities. 😊

# 🤖

#### Thanks for your time!
[Contact me](mailto:renansouzaoliveira10@gmail.com)
