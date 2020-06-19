import { getRepos } from '../utils/user';

let reposView = document.getElementById('reposView');
let ownerRepos = document.createElement('div');
let forkRepos = document.createElement('div');

ownerRepos.classList.add('repos');
ownerRepos.id = 'ownerRepos';

forkRepos.classList.add('repos');
ownerRepos.id = 'forkRepos';

async function init() {
  let repos = await getRepos(); // get repos

  await loadRepos(ownerRepos, 'My Repos', repos.owner); // load owner repos
  await loadRepos(forkRepos, 'Forks', repos.forks); // load fork repos

  return;
}

/**
 * @method loadRepos
 * @param { HTMLDivElement } container
 * @param { String } title 
 * @param { Array } repos 
 */

async function loadRepos(container, title, repos) {
  let titleNode = document.createElement('h1');

  titleNode.textContent = title;
  reposView.appendChild(titleNode);

  for (let i = 0; i < repos.length; i++) {
    const card = new RepoCard(repos[i]);
    
    container.appendChild(card);
  }

  reposView.appendChild(container);

  return;
}

class RepoCard extends HTMLElement {
  constructor(repo) {
    super();
    
    this.repo =  repo;
    this.render();
  }

  repoData() {
    let language = `
      <div>
        <i class="fas fa-code"></i> ${this.repo.language}
      </div>
    `;

    return `
      <div class="repo-data">
        ${this.repo.language ? language : ''}
        <div>
          <i class="fas fa-star"></i> ${this.repo.stargazers_count}
        </div>
        <div>
          <i class="fas fa-code-branch"></i> ${this.repo.forks}
        </div>
      </div>
    `;
  }

  // Render component
  render() {
    this.id = this.repo.id;
    this.classList.add('repo-card');

    // Template
    this.innerHTML = `
      <a href="${this.repo.html_url}" target="_blank">
        <section>
          <div class="repo-title">
            <h1>${this.repo.name}</h1>
          </div>
          ${this.repoData()}
          <div class="repo-description">
            ${this.repo.description || ''}
          </div>
        </section>
      </a>
    `;
  }
}

customElements.define('repo-card', RepoCard);

export default init;
