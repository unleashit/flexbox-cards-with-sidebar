require('babel-register');

const Chance = require('chance');
const chance = new Chance();
const fs = require('fs');

let db = {};

const createHashTags = () => {
    return new Array(Math.ceil(Math.random()*4))
        .fill(undefined)
        .map(hash => chance.hashtag());
};

const createInitials = (name) => {
    return name
        .split(' ')
        .map(part => part[0])
        .filter((part, i) => i !==1)
        .join('')
        .toUpperCase()
};

const seedCards = (cardsToMake) => {
    let json = [], i;

    for (i=0; i < cardsToMake; i++) {

        const name = chance.sentence({words: 3}).slice(0, -1);
        json.push({
            id: chance.guid(),
            name: name,
            city: chance.city(),
            url: chance.url().replace(/^(https:\/\/|http:\/\/)/, ''),
            initials: createInitials(name),
            description: chance.sentence({words: 5}).slice(0, -1),
            hashTags: createHashTags(),
            joined: chance.month() + ' ' + chance.year({min: 1986, max: 2016}),
            image: 'http://lorempixel.com/500/250?random='
                + Math.ceil(Math.random()*200)
        })
    }
    return json;
};

const seedNotifications = (rand) => {
    let notifications = [];
    db.cards.forEach((card, i) => {
        notifications = notifications
            .concat(
                new Array(Math.floor(Math.random() * rand))
                .fill(undefined)
                .map(() => {
                   return {
                       id: card.id,
                       post: chance.sentence(),
                       date: chance.date({year: 2016})
                   }
                })
            );
    });
    return notifications;
};

db.cards = seedCards(20);

// add Infield Digital
db.cards.unshift({
    id: 1,
    name: 'Infield Digital',
    city: 'San Francisco',
    url: 'infielddigital.com',
    initials: 'ID',
    description: 'Content, Commerce, and Coffee',
    hashTags: ['#AEM/CQ5', '#Magento', '#LaPavoni'],
    joined: 'March 2009',
    image: 'images/infield-digital.jpg'
});

// add random notifications
db.notifications = seedNotifications(5);

fs.writeFile('./data/db.json', JSON.stringify(db), (err) => {

    if (err) {
        throw new Error(err)
    } else {
        console.log('DB seeded.');
    }
});
