const Discord = require('discord.js')
var prefix = ("ç");
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json');
const db = low(adapter);
db.defaults({ histoires: [], xp: []}).write()

bot.login(process.env.TOKEN);

bot.on('ready', function() {
	bot.user.setGame("çhelp | Faire du ketchup !");
	console.log("Machine à ketchup prête !");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    
    if (!message.content.startsWith(prefix)) return;
    
    var args = message.content.substring(prefix.length).split(" ");
    
    switch (args[0].toLowerCase()) {
        case "avatar":
        if (!message.mentions.users.first()) return message.channel.send("Merci de mentionner un utilisateur")
            let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
            let ava = user.displayAvatarURL
            let embed = {
            color:0x000000,
            description:"Avatar de "+user.username+"",
            image:{url:ava}
            }
        message.channel.send("", {embed})
        break;
        case "help":
            var embede = new Discord.RichEmbed()
                .setDescription(" Voici la liste des commandes de KetchupBot ! Bot développé par Superyastiquereuros#2049")
                .addField("Commandes mixtes :rabbit:", "çketchup \n çping \n çrandomblague \n çsay ", true)
                .addField("Commandes utilitaires :notepad_spiral:", "çavatar \n çhelp \n çprofile", false)
                .addField("Commandes de modération :hammer:", "çban \n çkick \n çclear \n çsondage", false)
                .setFooter("KetchupBot", "https://cdn.discordapp.com/attachments/374596599822680068/442355597367574549/ketchup1.jpg")
                .setTimestamp()
                .setColor("0xDF0101")
            message.channel.sendEmbed(embede)
        break;
        case "say":
            if(message.member.hasPermission("READ_MESSAGES")) {
            message.delete();
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            message.channel.sendMessage(thingToEcho)
        } else {
            message.reply(`Tu n'as pas la permission de faire cette commande.`)}
        break;
        case "kick":
        let command = message.content.split(" ")[0];
        const args = message.content.slice(prefix.length).split(/ +/);
        command = args.shift().toLowerCase();

            if(!message.member.hasPermission("KICK_MEMBERS")) {
                return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
            }
            if(message.mentions.users.size === 0) {
                return message.reply("Merci de mentionner l'utilisateur à expluser.").catch(console.error);
            }
            let kickMember = message.guild.member(message.mentions.users.first());
            if(!kickMember) {
                return message.reply("Cet utilisateur est introuvable ou impossible à expulser.")
            }
            if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
                return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
            }
            kickMember.kick().then(member => {
                message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
                message.guild.channels.find("name", "general").send(`**${member.user.username}** a été expulsé du discord par **${message.author.username}**`)
            }).catch(console.error)
        break;
        case "ban":
        let commande = message.content.split(" ")[0];
        const argse = message.content.slice(prefix.length).split(/ +/);
        commande = argse.shift().toLowerCase();
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("Merci de mentionner l'utilisateur à bannir.");
        member.ban().then(member => {
            message.reply(`${member.user.username} a été banni avec succès.`).catch(console.error);
            message.guild.channels.find("name", "general").send(`**${member.user.username}** a été banni du discord par **${message.author.username}**`)
        }).catch(console.error)
        break;
        case "randomblague":

            var replys = [
            "Un jour , Bill Gates alla lire un peu les newsgroups. \n Et le pauvre, il constata qu'il n'avait pas trop la cote. \n Alors il convoqua tous les journalistes des USA, d'Europe et d'Asie dans sa maison près du lac Machin. \n Il attendu que tout le monde ait préparé ses appareils photo, et puis là, sûr de son effet, il traverse le lac en marchant sur l'eau!!! \n  Le lendemain, dans tous les newsgroups, on pouvait lire: \n - Et en plus, il ne sait même pas nager",
            "La maîtresse demande : \n - Par quelle lettre commence « hier » ? Etienne lève la main : \n - Par un d, madame. \n  - Tu fais commencer « hier » par un d ? s'étonne la maîtresse. \n - Ben, hier, on était bien dimanche.",
            "Elle : Passe chez moi ce soir, il n'y aura personne. \n Moi : Woaw, super, incroyable. \n Je suis passé chez elle... \n ...effectivement, il n'y avait personne. ",
            "Je connais une fin heureuse. \n C'est la fin de la semaine.",
            "Qu'est-ce qu'un steak qui n'en est pas un ? \n Une pastèque ( pas steak ) !",
            "Qu'est-ce qu'une manifestation d'aveugles ? \n  Un festival de Cannes !",
            "Vous voulez une blague a l'envers ? \n Riez je raconte après.",
            "Qu'est-ce qu'est un croco en prison ? \n Un crocrodile",
            "Qui a une tête de beurre ne doit pas s'approcher du four.",
            "J'ai ouvert mon placard  \n  Et j'ai raconté une blague à mes vêtements... \n Ils étaient pliés !!!",
            "Si l'argent ne fais pas le bonheur, donne le moi.",
            "Pourquoi Mickey Mousse ? Parce que Mario brosse."
            ];
        
          let reponse = (replys[Math.floor(Math.random() * replys.length)])
           var embedd = new Discord.RichEmbed()
           .setTitle("Blague au hasard")
           .setDescription(reponse)
           .setTimestamp()
           .setColor("0x01DF01");
           message.channel.sendEmbed(embedd);
            break;
        case "ping":
        message.channel.sendMessage('Pong :ping_pong: `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
        break;
        case "clear":
        if (message.member.hasPermission("MANAGE_MESSAGES")){
            message.channel.fetchMessages()
                .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("Erreur")})}
        break;

}})
bot.on("message", message => {

var msgauthor = message.author.id;

    if(message.author.bot)return;
    
    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp : ${userxp[1]}`)
    
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

      if(message.content === prefix + "profile") {
          var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
          var xpfinal = Object.values(xp);
          var embed2 = new Discord.RichEmbed()
          .setTitle("Profile de " + message.author.username)
          .setThumbnail(message.author.displayAvatarURL)
          .setColor("0xFFFF00")
          .addField("ID:", message.author.id)
          .addField("Date de création du compte:", message.author.createdAt)
          .addField("Balance:", `${xpfinal[1]} ₭`)
          .setTimestamp()

          message.channel.sendEmbed(embed2);
      }

      if(message.content === prefix + "ketchup") {
          message.channel.sendMessage("Ketchup \n MIAM \n https://cdn.discordapp.com/attachments/439717123858759690/441244738780135424/ketchup1.jpg")
    }

    if(message.content.startsWith(prefix + "sondage")) {
        if(message.author.is = "242220208914300928" || "2633250372710563846"){
        var args = message.content.split("").slice(1);
        var thingToEcho = args.join("")
        var embeds = new Discord.RichEmbed()
        .setDescription("Sondage")
        .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
        .setColor("0x5F04B4")
        .setTimestamp()
        console.log("Nouveau sondage créé.");
        message.guild.channels.find("name", "sondages").sendEmbed(embeds)
        .then(function (message) {
            message.react("✅")
            message.react("❌")
        }).catch(function(){
        });
    }else{
        return message.channel.sendMessage("Vous n'avez pas la permission nécessarire à l'utilisation de cette commande.")
    }
    }

            }

            
        }
    
    


)
