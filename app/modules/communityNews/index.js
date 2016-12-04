import axios from 'axios';
import * as render from './render'
import '../../scss/styles.scss';
import find from 'lodash/find';

const __API_URL__ = 'http://localhost:3000/';

let App = {

    init() {
        this.cardsContainer = document.querySelector('.cards-container');
        this.notificationsContainer = document.querySelector('.notifications-container');
        this.subscriptions = [];

        this.setupCards();
    },

    setupCards() {
        axios(__API_URL__ + 'cards')
            .then(render.cards.bind(this, this.cardsContainer))
            .then(this.addCardListener.bind(this))
            .catch(err => new Error(err));
    },

    addCardListener() {
        this.cardsContainer.addEventListener('click', (e) => {
           if (e.target.className === 'card__follow--button') {
               const companyID = e.target.getAttribute('data-id');
               this.subscribe(companyID);
           }
        })
    },

    subscribe(companyID) {
        axios(__API_URL__ + 'notifications')
            .then(res => {
                // get notifications that match selected company
                return res.data.filter(n => n.id === companyID);
            })
            .then(notifications => {
                // get the company name from the ID
                return axios(__API_URL__ + 'cards/' + companyID)
            .then(company => {
                // check to see if already subscribed
                if (find(this.subscriptions, (s) => s.name === company.data.name) === undefined) {
                    this.subscriptions.unshift({
                        name: company.data.name,
                        initials: company.data.initials,
                        notifications: notifications,
                        subscribedDate: Date.now()
                    });
                 }
                // open and show the subscriptions if any follow buttons are clicked
                render.subscriptions(this.subscriptions);
                this.addCloseListeners();
                window.scrollTo(0, 0);
                })
            })
            .catch(err => new Error(err));
    },

    addCloseListeners() {
        const close = document.getElementById('notifications-container__close');
        const closeHandler = () => {
            this.notificationsContainer
                .classList.add('notifications-container--off');
        };

        close.addEventListener('click', closeHandler);
        this.cardsContainer.addEventListener('click', closeHandler);
    }

};

App.init();





