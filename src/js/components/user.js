import { getUser } from '../utils/user';

let userView = document.getElementById('userView');

async function init() {
  let user = await getUser();

  userView.appendChild(new UserProfile(user));
}

// User profile component
class UserProfile extends HTMLElement {
  constructor(user) {
    super();

    this.user = user;
    this.render();

    return;
  }

  // Create social data section
  socialData() {
    let company = `
      <p>
        <i class="fas fa-users"></i> ${this.user.company}
      </p>
    `;
    let blog = `
      <p>
        <i class="fas fa-link"></i>
        <a href="${this.user.blog} target="_blank">
          ${this.user.blog}
        </a>
      </p>
    `;
    let location = `
      <p>
        <i class="fas fa-map-marker"></i> ${this.user.location}
      </p>
    `;

    return `
      <div class="user-social">
        ${this.user.company ? company : ''}
        ${this.user.blog ? blog : ''}
        ${this.user.location ? location : ''}
      </div>
    `;
  }

  // Render component
  render() {
    this.id = 'userProfile';
    this.classList.add('user-profile');

    // Template
    this.innerHTML = `
      <div class="user-img">
        <img src="${this.user.avatar_url}" class="avatar">
      </div>
      <div class="user-info">
        <h1 class="user-name">${this.user.name}</h1>
        <a href="${this.user.url}" target="_blank">
          @${this.user.login}
        </a>
        <p class="user-bio">
          ${this.user.bio}
        </p>
      </div>
      ${this.socialData()}
    `;
  }
}

customElements.define('user-profile', UserProfile);

export default init;
