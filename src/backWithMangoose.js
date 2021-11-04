const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://beloze:Ezzollebb84848484@cluster0.w3dn3.mongodb.net/LearnJS?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;
const schemaDeck = new Schema({
    name: String,
    deck: String,
    classDeck: String,
    type: String,
    description: String,
    objects: Array
});
const Deck = mongoose.model("Deck", schemaDeck);

Deck.find({}, function(err, items) {
    console.log(items);
});