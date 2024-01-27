import { RandomElement } from "../Utils/random";
import { POSITIVEFACES } from "../Constants/emojis";

const UserData = require("../../Database/Models/userDataModel");

module.exports = {
    name: "thanks",
    help: "Give your thanks to the bot.",
    command: function (msg, args) {
        let author = msg.author.id;
        const emoji = RandomElement(POSITIVEFACES);
        msg.channel.send(`You're welcome <@${author}> ${emoji}`);

        UserData.find({ user: author }, async (err, docs) => {
            if (err) return console.error(err);

            console.log(docs);

            if (!docs || docs.length === 0) {
                let newUserData = new UserData({
                    user: author,
                    thanksGiven: 1,
                });
        
                newUserData.save().catch((err) => console.log(err));
                return;
            };

            if (docs.length > 1) {
                console.warn(`Multiple docs found under user id: ${author}`);
                return;
            }

            const doc = docs[0];
            doc.thanksGiven = (doc.thanksGiven === undefined) ? 1 : doc.thanksGiven + 1;
            doc.save().catch((err) => console.log(err));
        });
    },
};
