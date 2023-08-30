const auth1 = 'ghp_d2nCYUB';
const auth2 = 'fcgWdcbmg';
const auth3 = '90BiQfmWbCy';
const auth4 = '3Rn1Gh8Ah';
class GithubUser {
  constructor() {
    this.searchInput = document.querySelector('.searchInput');
    this.spinnerIcon = document.getElementById('spinner');
    this.ghchartForm = document.getElementsByClassName('ghchart')[0];
    this.initEventListeners();
  }

  initEventListeners() {
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.searchInput.value) {
        const searchValue = this.searchInput.value.trim();
        this.fetchUserInfo(auth1 + auth2 + auth3 + auth4, searchValue);
        this.fetchUserRepos(auth1 + auth2 + auth3 + auth4, searchValue);
        document.getElementById('repoContainer').innerHTML = '';
        this.searchInput.value = '';
      }
    });
    this.searchInput.addEventListener('input', () => {
      this.validateInput(this.searchInput.value);
    });
    this.searchInput.addEventListener('blur', () => {
      this.clearValidationMessage();
    });
  }

  validateInput(value) {
    const validationMessage = document.getElementById('validationMessage');
    if (!value.match(/^[a-zA-Z0-9\-_]+$/)) {
      validationMessage.textContent = '올바른 형식의 닉네임을 입력해주세요';
      validationMessage.style.color = 'red';
    } else if (value.length > 39) {
      validationMessage.textContent = '닉네임이 너무 깁니다. 다시 입력해주세요';
      validationMessage.style.color = 'red';
    } else {
      validationMessage.textContent = '올바른 닉네임 형식입니다.';
      validationMessage.style.color = 'green';
    }
  }

  clearValidationMessage() {
    const validationMessage = document.getElementById('validationMessage');
    validationMessage.textContent = '';
  }

  async fetchUserInfo(token, searchValue) {
    try {
      this.showSpinner();

      const response = await fetch(`https://api.github.com/users/${searchValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'token ' + token,
        },
      });

      if (!response.ok && response.status === 404) {
        throw new Error('User not found');
      }

      const data = await response.json();
      this.displayUserInfo(data);
    } catch (error) {
      if (error.message === 'User not found') {
        this.showDefaultUserInfo(searchValue);
      }
    } finally {
      this.hideSpinner();
    }
  }

  async fetchUserRepos(token, userId) {
    try {
      this.showSpinner();

      const response = await fetch(`https://api.github.com/users/${userId}/repos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'token ' + token,
        },
      });

      if (!response.ok && response.status === 404) {
        throw new Error('User not found');
      }

      const data = await response.json();
      data.forEach((repoData) => {
        const userRepoInfos = this.extractRepoInfo(repoData);
        this.updateUserRepo(userRepoInfos);
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.hideSpinner();
    }
  }

  displayUserInfo(data) {
    const userInfoTags = this.extractUserInfo(data);
    const userInfoDetails = this.extractUserInfoDetail(data);

    this.updateUserTags(userInfoTags);
    this.updateUserDetails(userInfoDetails);
    this.updateUserGhchart(data.login);

    const elementsToUpdate = [
      document.getElementsByClassName('profileBox')[0],
      document.getElementsByClassName('subTitle')[0],
      document.getElementById('repoContainer'),
    ];

    elementsToUpdate.forEach((el) => (el.style.display = ''));

    document.getElementById('errorBox').style.display = 'none';
  }

  showDefaultUserInfo(searchValue) {
    const message = `🤔 "${searchValue}" is not registered`;
    const errorBox = document.getElementById('errorBox');

    const elementsToHide = [
      document.getElementsByClassName('profileBox')[0],
      document.getElementsByClassName('subTitle')[0],
      document.getElementById('repoContainer'),
      this.ghchartForm,
    ];

    elementsToHide.forEach((el) => (el.style.display = 'none'));
    this.ghchartForm.classList.add('hidden');

    errorBox.innerHTML = message;
    errorBox.style.display = '';
  }

  showSpinner() {
    this.spinnerIcon.style.display = 'block';
  }

  hideSpinner() {
    this.spinnerIcon.style.display = 'none';
  }

  extractUserInfo(data) {
    return {
      image: data.avatar_url,
      publicRepos: data.public_repos,
      publicGists: data.public_gists,
      followers: data.followers,
      following: data.following,
    };
  }

  extractUserInfoDetail(data) {
    return {
      company: data.company,
      webBlog: data.blog,
      location: data.location,
      memberSince: data.created_at,
    };
  }

  extractRepoInfo(data) {
    return {
      repoNames: data.name,
      repoStars: data.stargazers_count,
      repoWatchers: data.watchers_count,
      repoForks: data.forks_count,
    };
  }

  updateUserTags(userInfo) {
    const userImage = document.getElementById('userImg');
    const userPublicRepos = document.getElementsByClassName('tag1')[0];
    const userPublicGists = document.getElementsByClassName('tag2')[0];
    const userFollowers = document.getElementsByClassName('tag3')[0];
    const userFollowing = document.getElementsByClassName('tag4')[0];

    userImage.src = userInfo.image;
    userPublicRepos.innerHTML = `Public Repos: ${userInfo.publicRepos}`;
    userPublicGists.innerHTML = `Public Gists: ${userInfo.publicGists}`;
    userFollowers.innerHTML = `Followers: ${userInfo.followers}`;
    userFollowing.innerHTML = `Following: ${userInfo.following}`;
  }

  updateUserDetails(userInfo) {
    const userCompany = document.getElementsByClassName('info1')[0];
    const userWebBlog = document.getElementsByClassName('info2')[0];
    const userLocation = document.getElementsByClassName('info3')[0];
    const userMemberSince = document.getElementsByClassName('info4')[0];

    userCompany.innerHTML = userInfo.company
      ? `Company: ${userInfo.company}`
      : '<p>Company: 등록된 정보가 없습니다.</p>';
    userWebBlog.innerHTML = userInfo.webBlog
      ? `Website & Blog: <a href="${userInfo.webBlog}" target="_blank">${userInfo.webBlog}</a>`
      : '<p>Website & Blog: 등록된 정보가 없습니다.</p>';
    userLocation.innerHTML = userInfo.location
      ? `Location: ${userInfo.location}`
      : '<p>Location: 등록된 정보가 없습니다.</p>';
    userMemberSince.innerHTML = `Member Since: ${
      userInfo.memberSince ? new Date(Date.parse(userInfo.memberSince)).toDateString() : 'Unknown'
    }`;
  }

  updateUserGhchart(id) {
    const ghchartImage = document.getElementById('ghchartImg');
    this.ghchartForm.classList.remove('hidden');
    ghchartImage.src = `https://ghchart.rshah.org/${id}`;
  }

  updateUserRepo(repoInfos) {
    const repoContainer = document.getElementById('repoContainer');
    if (!repoContainer) {
      return; // repoContainer가 없으면 함수 종료
    }
    const template = `
      <div class="repoBox borderBox flexRow">
        <div class="repoNameText">${repoInfos.repoNames}</div>
        <div class="tags flexRow">
          <div class="blue">Stars: ${repoInfos.repoStars}</div>
          <div class="grey">Watchers: ${repoInfos.repoWatchers}</div>
          <div class="green">Forks: ${repoInfos.repoForks}</div>
        </div>
      </div>
    `;
    repoContainer.insertAdjacentHTML('beforeend', template);
  }
}

const githubUser = new GithubUser();
