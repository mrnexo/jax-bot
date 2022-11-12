const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js');

const prefix = '$';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("ready", () => {
    console.log("Bot is online!");

    const activities = [
        'Looking for new updates!',
        'Moderating Discord servers',
        'You can test me if you want!'
    ];

    setInterval(() => {  
        const status = activities[Math.floor(Math.random() * activities.length)];
        client.user.setPresence({ activities: [{ name: `${status}`}]});

    }, 5000);

})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //mesage array

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    //COMMANDS

//test command

if (command === `test`) {
    message.channel.send("Bot is working!")
}

//ban command

if (command === 'ban') {
    const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));

    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.channel.send("You don't have permission to ban people in this server!");
    if (!member) return message.channel.send("You must specify someone in this command!")
    if (message.member === member) return message.channel.send("You cannot ban yourself");
    if (!member.kickable) return message.channel.send("You cannot ban this person!");

    let reason = argument.slice(1).join(" ") || "No reason given."

    const embed = new EmbedBuilder()
    .setColor("Blue")
    .setDescription(`:white_check_mark: ${member.user.tag} has been **banned** | ${reason}`)

    const dmEmbed = new EmbedBuilder()
    .setColor("Blue")
    .setDescription(`:white_check_mark: You were **banned** from ${message.guild.name} | ${reason}`)

    member.send({ embeds: [dmEmbed]}).catch(err => {
        console.log(`${member.user.tag} has their DMs off and cannot receive the ban message.`);
    })

    member.ban().catch(err => {
        message.channel.send("There was an error banning this member.");
    })

    message.channel.send({ embeds: [embed] });
}

// timeout commad

if (command === 'timeout') {

    const timeUser =  message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find( x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));
    const duration = argument[1];

    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.channel.send("You don't have permission to time people out in this server!");
    if (!timeUser) return message.channel.send("Please specify a member to timeout.");
    if (message.member === timeUser) return message.channel.send("You cannot time yourself out!");
    if (!duration) return messageArray.channel.send("Please specify a duration in which you want the member to be timed out for.");
    if (duration > 604800) return message.channel.send("Please specify a duration between 1 and 604800 (one week) seconds.");

    if (isNaN(duration)) {
        return message.channel.send("Please specify a valid number in the duration section.");
    }

    let reason = argument.slice(2).join(" ") || "No reason given.";
    const embed = new EmbedBuilder()
    .setColor("Blue")
    .setDescription(`:white_check_mark: ${timeUser.user.tag} has been **timed out** for ${duration} seconds | ${reason}`)

    const dmEmbed = new EmbedBuilder()
    .setColor("Blue")
    .setDescription(`:white_check_mark: You have been **timed out** in ${message.guild.name} for ${duration} seconds | ${reason}`)

    timeUser.timeout(duration * 1000, reason);

    message.channel.send({ embeds: [embed] });

    timeUser.send({ embed: [dmEmbed] }).catch(err => {
        return;
    });
}


//untimeout command


if (command === 'untimeout') {

    const timeUser =  message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find( x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));

    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.channel.send("You don't have permission tu untime people out in this server.");
    if (!timeUser) return message.channel.send("Please specify a member to untimeout.");
    if (message.member === timeUser) return message.channel.send("You cannot untime yourseld out.");
    if (!timeUser.kickable) return message.channel.send("You cannot untime this person out.");

    let reason = argument.slice(1).join(" ") || "No reason given";

    const embed = new EmbedBuilder()
    .setColor("Blue")
    .setDescription(`:white_check_mark: ${timeUser.user.tag} has been **untimed out** | ${reason}`)

    const dmEmbed = new EmbedBuilder()
    .setColor("Blue")
    .setDescription(`:white_check_mark: You have been **untimed out** in ${message.guild.name} | ${reason}`)

    timeUser.timeout(null, reason);

    message.channel.send({embeds: [embed] });
    
    timeUser.send({ embeds: [dmEmbed] }).catch(err => {
        return;
    });
}






















})

client.login("TOKEN-HERE");