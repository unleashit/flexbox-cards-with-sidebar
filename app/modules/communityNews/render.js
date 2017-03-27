import * as templates from './templates';

const makeHashtags = (hashTags) => {
    if (!hashTags.length) return;

    hashTags = hashTags
        .map(tag => {
            return `<a href="#">${tag}</a>`
        });

    if (hashTags.length > 1) {
        hashTags
            .splice(hashTags.length - 1, 0, 'and');
    }

    return hashTags
        .join(', ')
        .replace('and,', '<span class="card__hashtags--and">and</span>');
};

export const cards = (cardsContainer, res) => {
    let cards = document.createElement('ul');
    cards.className = 'cards';
    cards.innerHTML = res.data.map(templates.card.bind(null, makeHashtags)).join('');
    cardsContainer.appendChild(cards);
};

export const subscriptions = (subscriptions) => {

    const nc = document.querySelector('.notifications-container');

    if (nc.classList.contains('notifications-container--off')) {
        nc.classList.remove('notifications-container--off');
    }

    nc.innerHTML = templates.notificationsContainer() +
        subscriptions.map(company => {
            let html = templates.subscriptionHeader(company);

            if (!company.notifications.length) {
                html += '<div class="subscription"><p class="subscription__no-posts">No posts yet. Stay tuned!</p></div>';
            } else {
                html += company.notifications
                    // sort notifications by date
                    .sort((a,b) => {
                        if (a.date > b.date) {
                            return -1;
                        }
                        if (a.date < b.date) {
                            return 1;
                        }
                        return 0;
                    })
                    // render notifications
                    .map(templates.notifications)
                    .join('') + '\n</ul>\n</div>';
            }
            return html;
        }).join('');
};
