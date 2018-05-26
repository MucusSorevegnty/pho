
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
                .addField("Mixtes :rabbit:", "```fix\n çbob\n çdiceroll \n çfish \n çhack \n çping \n çrandomblague \n çsay```", true)
                .addField("Utilitaires :notepad_spiral:", "```fix\nçavatar \n çemojis \n çguild \n çhelp\n çprofile \n çroles \n çseen```", true)
                .addField("Fun :balloon:", "```fix\nç8ball\nçketchup\nçpfc```", true)
                .addField("Modération :hammer:", "```fix\nçban \n çkick \n çclear \n çsondage```", true)
                .addField("A venir :desktop:", "```fix\n Version public du bot```", true)
                .setFooter("KetchupBot", "https://cdn.discordapp.com/attachments/374596599822680068/442355597367574549/ketchup1.jpg")
                .setTimestamp()
                .setColor("0xDF0101")
            message.channel.send(embede);
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
            "Quel est le point commun entre des spaghetti et un robot ?\n\nIls sont tous les deux automates !",
            "Qu'est-ce qu'est un croco en prison ? \n Un crocrodile",
            "Qui a une tête de beurre ne doit pas s'approcher du four.",
            "Quel est le point commun entre des juifs et des chaussures?\nIl y en a plus en 38 qu'en 45",
            "Deux arabes sont sur un immeuble.\nQui saute en premier?\nL'immeuble.",
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
           message.channel.send(embedd);
            break;
            case "diceroll":
            let dice = Math.floor((Math.random() * 6) + 1);
            message.channel.sendMessage(":game_die: **" + message.author.username + "** le dè tombe sur **" + dice +"** :game_die:");
            break;
            case "hack":
            var embedh = new Discord.RichEmbed()
            .setDescription(":rotating_light: Discord se fait hacker :spy:! :rotating_light:")
            .setImage("https://i.imgur.com/vDS5tJX.gif")
            .setColor("0x74DF00");
            message.channel.sendEmbed(embedh);
            break;
            case "8ball":
            let argsed = message.content.split(" ").slice(1); 
            let tte = argsed.join(" ")
            if (!tte){
            return message.reply("Merci de poser une question. Par exemple `ç8ball Est-ce que les licornes existent` :8ball:")};
            let replies = ["Oui.", "Non.", "Surement...", "Sans aucun doutes !", "Ce n'est pas à moi de répondre à cette question !", "Tout indique que non.", "Aussi vrai que de dire que licornes existent :unicorn:."];
            let resultat = (replies[Math.floor(Math.random() * replies.length)])
            message.channel.sendMessage("| :8ball:" + resultat + " **" + message.author.username + "** :8ball:");
        break;
        case "roles":
        message.channel.sendCode("fix", message.guild.roles.map(r => r.name).lenght > 900 ? "Trop de rôles, impossible de tout afficher" : message.guild.roles.map(r => r.name));
        break;
        case "invite":
        
        break;
        case "fish":
        let poissons = ["🦑", "🦐", "🦀", "🐚", "🐙", "🦈", "🐡", "🐠", "🐟", "🐬", "🐋", "🐳", "🐢"];  
        let peche = Math.floor((Math.random() * poissons.length)); 
        message.channel.sendMessage("**" + message.author.username + "** viens de pêcher " + poissons[peche] + "!");
        break;
        case "guild":
        var embedg = new Discord.RichEmbed()
      .setTitle(`${message.guild.name} (${message.guild.id})`)
      .addField("Membres :busts_in_silhouette:", message.guild.memberCount, false)
      .addField("Region :map:", message.guild.region, false)
      .addField("Date de création :date:", `${message.guild.createdAt.toDateString()}`, false)
      .addField("Owner :crown:", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
      .addField("Autres :question:", "**Listes des Rôles**: Voir commande `çroles` \n**Listes des émojis**: Voir commande `çemojis`", true)
      .setColor("F4FA58")
      .setTimestamp()
      .setFooter("Commande demandé par " + message.author.username, message.author.avatarURL)
      .setThumbnail(message.guild.iconURL);
      message.channel.send(embedg);
        break;
        case "bob":
            var image; 
            let splitargsed = message.content.split(" ").slice(1); 
            let tteargumentation = splitargsed.join(" ")
            if(tteargumentation){ 
            if(message.mentions.users.first()){
          
            var image = message.mentions.users.first().avatarURL; 
          
            }else{
            var image = tteargumentation; 
            }
            }else{ 
          
            var image = message.author.avatarURL; 
            } 
            message.channel.send({
                files:[{
                  attachment: `http://triggered-api.tk/api/v2/bob?url=${message.author.displayAvatarURL}`,
                  name: `bob.gif`
                }]
              }).catch(err => { if(err) return message.channel.send("**❌ Une erreur s'est produite**") })  
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


    if (message.content.startsWith(prefix + "seen")) {
        let huser = message.mentions.users.first() || message.author;
        let servers = bot.guilds.filter(g => g.members.has(huser.id));
        var message2 = "```";
        for (var i = 0; i < servers.map(g => g.name).length; i++) {
            var temp = (i === 0 ? `Guilds en commun avec ${huser.tag}\n` : "") + (i + 1) + ". " + servers.map(g => g.name)[i] + "\n";
            if ((message2 + temp).length <= 2000 - 3) {
                message2 += temp;
            } else {
                message2 += "```";
                message.channel.send(message2);
                message2 = "```";
            }
        }
        message2 += "```";
        message.channel.send(message2);
    }


    if(message.content === prefix + "emojis"){
        var data = new Discord.RichEmbed()
        if (message.guild.emojis.array().length === 0) data.addField("Liste des émojis de la guild", "Aucun émoji perssonel n'est présent sur cette guild !", true);
        else {
          var emojis = []
          var emojis2 = []
          message.guild.emojis.array().map(function(emoje) {
            if (emojis.join(" ").length <= 950) emojis.push(`${emoje}`);
            else (emojis2.push(`${emoje}`))
          })
          data.setThumbnail
          data.setColor("0x04B4AE")
          data.addField("Liste des émojis de la guild", emojis.join(" "), true);
          if (emojis2.length > 0) data.addField("​", emojis2.join(" "));
          message.channel.sendEmbed(data);
  }
    }
    if(message.content[0] === prefix) {
		let splitMessage = message.content.split(" "); 
		if(splitMessage[0] === 'çpfc') {
			if(splitMessage.length === 2) {
				var userChoice = splitMessage[1]; 
				var botChoice = Math.floor(Math.random() * 3); 
				var stone = ":white_circle:"; 
				var leaf = ":maple_leaf:"; 
				var scissors = ":scissors:"; 
				switch ( botChoice ) {
					case 0:
					var botChoice = "Pierre"
					break;
					case 1:
					var botChoice = "Feuille"
					break;
					case 2:
					var botChoice = "Ciseaux"
					break;
					default:
					message.channel.send(":warning:")
				}
				switch ( userChoice ) {
					case "Pierre":
					case "pierre":
					if (botChoice === "Pierre") {
						message.channel.send("Égalité ! J'avais également choisi la pierre. " + stone);
						message.react("🔁");
					} else if (botChoice === "Feuille") {
						message.channel.send("Perdu ! J'avais choisi la feuille. " + leaf);
						message.react("👎");
					} else if (botChoice === "Ciseaux") {
						message.channel.send(" Vous gagnez ! J'avais choisi les ciseaux... " + scissors);
						message.react("🎉");
					}
                    break;
					case "Feuille":
					case "feuille":
					if (botChoice === "Pierre") {
						message.channel.send("Gagné ! J'avais choisi la pierre... " + stone);
						message.react("🎉");
					} else if (botChoice === "Feuille") {
						message.channel.send("Égalité ! J'avais également choisi la feuille ! " + leaf);
						message.react("🔁");
					} else if (botChoice === "Ciseaux") {
						message.channel.send("Perdu ! J'avais choisi les ciseaux ! " + scissors);
						message.react("👎");
					}
					break;
					case "Ciseaux":
					case "ciseaux":
					if (botChoice === "Pierre") {
						message.channel.send("Perdu ! J'avais choisi la pierre ! " + stone);
						message.react("👎");

					} else if (botChoice === "Feuille") {
						message.channel.send("Gagné ! J'avais choisi la feuille... " +leaf)
						message.react("🎉");
						
					} else if (botChoice === "Ciseaux") {
						message.channel.send("Égalité ! J'avais également choisi les ciseaux ! " + scissors)
						message.react("🔁");
					}
					break;
					default:
					message.channel.send(":warning: Merci d'entrez un choix valide ! :warning: \n **Pierre** " +stone+ " ; **Feuille** " +leaf+ " ou **Ciseaux** " +scissors+ " !")
					message.channel.send()
				}
			}
		}
}

    if(message.content.startsWith(prefix + "sondage")) {
        if(message.member.hasPermission("ADMINISTRATOR")){
        var args = message.content.split("").slice(1);
        var thingToEcho = args.join("")
        var embeds = new Discord.RichEmbed()
        .setDescription("Sondage")
        .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
        .setColor("0x5F04B4")
        .setTimestamp()
        message.channel.sendMessage("Nouveau sondage créé avec succès :wink: !");
        message.guild.channels.find("name", "sondages").send(embeds)
        .then(function (message) {
            message.react("✅")
            message.react("❌")
        }).catch(function(){
        });
    }else{
        return message.channel.sendMessage("Vous n'avez pas la permission nécessarire à l'utilisation de cette commande.");
    }
    }
            }   
        }
)
    


