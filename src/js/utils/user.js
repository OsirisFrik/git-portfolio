import request from './request';

let user;
let repos = {
  owner: [],
  forks: []
};

async function getUser() {
  try {
    if (!user) {
      user = await request({
        method: 'get',
        url: `/users/${process.env.USER}`
      });

      let favicon = document.createElement('link');

      favicon.type = 'img/png';
      favicon.href = user.avatar_url;
      favicon.rel = 'icon';

      document.head.appendChild(favicon);
    }

    return user
  } catch (err) {
    throw new Error(err);
  }
}

async function getRepos() {
  try {
    if (repos.forks.length < 1 && repos.owner.length < 1) {
      let _repos = await request({
        method: 'get',
        url: `/users/${process.env.USER}/repos`,
        params: {
          type: 'owner',
          per_page: user ? user.public_repos : 100,
          sort: 'update'
        }
      });

      _repos.forEach(repo => repo.fork ? repos.forks.push(repo) : repos.owner.push(repo));
    }

    return repos;
  } catch (err) {
    throw new Error(err);
  }
}

export {
  getUser,
  getRepos
};

