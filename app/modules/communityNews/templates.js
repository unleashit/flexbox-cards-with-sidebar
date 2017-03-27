import moment from 'moment';

export const card = (makeHashtags, card) => `
<li class="card" style="background-image: url('${card.image}')">
    <div class="card__logo-row">
        <div class="card__initials">${card.initials}</div>
        <div class="card__follow">
            <button class="card__follow--button" data-id="${card.id}">Follow</button>
        </div>
    </div>
    <h4 class="card__title">${card.name}</h4>
    <p>
        <span class="card__description">${card.description}</span> &mdash;
        <span class="card__hashtags">${makeHashtags(card.hashTags)}</span>
    </p>
    <p>
        <span class="card__city">${card.city}</span> &bull;
        <span class="card__url"><a href="${card.url}">${card.url}</a></span> &bull;
        <span class="card__joied">Joined ${card.joined}</span>
    </p>
</li>`;

export const notificationsContainer = () => `
<h2 class="notifications-container--heading">Following
    <span id="notifications-container__close" class="notifications-container__close">
        <svg width="25" height="25" viewBox="0 0 32 32">
            <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
        </svg>
    </span>
</h2>`;

export const subscriptionHeader = (company) => `
<div class="subscription">
    <div class="subscription__logo">${company.initials}</div>
    <h4>${company.name}</h4>
    <ul class="subscription__list">
`;

export const notifications = (notification) => `
<li class="subscription__notification">
    <div class="subscription__date">${moment(notification.date).fromNow()}</div>
    <div class="subscription__post">${notification.post}</div>
</li>`;