require('dotenv').config();
const Discord = require("discord.js");
const fetch = require("node-fetch");
const Database = require("mysql");

const TOKEN = process.env.TOKEN;
const client = new Discord.Client();
const prefix = "!";

const sedih = ['sedih','ga senang','depresi', 'marah'];

const kataPenyemangat = [
    'Jangan sedih kawan!', 
    'Semangat!',
    'Yuk bisa yuk!',
    'Kamu pasti bisa kawan!'
];

// var con = Database.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// db.get("encouragements").then(encouragements => {
//     if (!encouragements || encouragements.length<1) {
//         db.set("encouragements", kataPenyemangat)
//     }
// })

// function addEncouragements(encouragingMessage) {
//     db.get("penyemangat").then(penyemangat => {
//         penyemangat.push([encouragingMessage]);
//         db.set("penyemangat", penyemangat);
//     })
// }

// function deleteEncouragements(index) {
//     db.get("penyemangat").then(penyemangat => {
//         if(penyemangat.length>index) {
//             penyemangat.splice(index,1);
//             db.set("penyemangat", penyemangat);
//         }
//     })
// }

function fetchQuote() {
    return fetch("https://zenquotes.io/api/random")
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

client.on("ready", () => { 
    // message.reply(`Halo Budah Rupiah! Kenalin dong aku ${client.user.tag}`)
    console.log(`Halo Budak Rupiah! Kenalin dong aku ${client.user.tag}`)
}); 

client.on("message", (message) => {
    if (message.author.bot) return;
    // if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const checkWhiteSpaces = commandBody.indexOf(' ') >= 0;

    if(command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! Hehe canda deng ini latency nya ${timeTaken}ms`)
    }
    else if (command === "sum" && checkWhiteSpaces === true) {
        const numArgs = args.map(x => parseFloat(x));
        let sum = 0;
        // numArgs.map((x) => {sum += x});
        for (key in numArgs) {
            sum+=numArgs[key]
        }
        message.reply(`Hasil jumlah dari nomor yang kamu kasih ${sum}!`);

    } else if (command === "divide" && checkWhiteSpaces === true) {
        const numArgs = args.map(x => parseFloat(x));
        var result = numArgs[0]/numArgs[1];
        // for (key in numArgs){
        //     result = numArgs[key] / numArgs[key];
        // }
        message.reply(`Hasil pembagian dari nomor yang kamu kasih ${result}!`);

    }
    else if (command === "multiple" && checkWhiteSpaces === true) {
        const numArgs = args.map(x => parseFloat(x));
        let multiple = 1;
        numArgs.map(x => {
            multiple*=x;
        });
        message.reply(`Hasil perkalian dari nomor yang kamu kasih ${multiple}!`);

    } else if (command === "minus" && checkWhiteSpaces === true) {
        const numArgs = args.map(x => parseFloat(x));
        let minus = numArgs[0];
        for (var i=1;i<numArgs.length;i++) {
            minus-=numArgs[i];
        }
        message.reply(`Hasil pengurangan dari nomor yang kamu kasih ${minus}!`);

    } else if (command === "inspire") {
        fetchQuote().then(quote => {
            message.channel.send(quote)
        });

    } else if (sedih.some(word => message.content.includes(word))) {
        // db.get("penyemangat").then(penyemangat => {
            const penyemangats = kataPenyemangat[Math.floor(Math.random() * kataPenyemangat.length)]
            message.reply(penyemangats);
        // })
    }
    // } else if (command === "new") {
    //     encouragingMessage = args;
    //     addEncouragements(encouragingMessage);
    //     message.channel.send("Kata penyemangat sudah ditambah!");
    // } else if (command === "delete" || command === "del" ) {
    //     index = parseInt(args);
    //     deleteEncouragements(index);
    //     message.channel.send("Kata penyemangat sudah dikurangi!");
    // }
    else if (checkWhiteSpaces === false) {
        message.reply(`Kamu belum kasih argumen atau gaada spasi!`);

    } else {
        message.reply(`Salah perintah tuh! Cek lagi lah`);   
    }
}); 

client.login(TOKEN);