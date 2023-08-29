const auth1 = 'ghp_d2nCYUB';
const auth2 = 'fcgWdcbmg';
const auth3 = '90BiQfmWbCy';
const auth4 = '3Rn1Gh8Ah';
const searchInput = document.querySelector('.searchInput');
const ghchartForm = document.getElementsByClassName('ghchart');
const spinnerIcon = document.getElementById('spinner');

//깃허브 유저 데이터 가져오는 비동기 함수
function fetchGithubUserInfo(token, searchValue) {
  //로딩시 spinner icon을 보여줌
  spinnerIcon.style.display = 'block';

  fetch(`https://api.github.com/users/${searchValue}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token ' + token,
    },
  })
    .then((response) => {
      if (!response.ok && response.status === 404) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then((data) => {
      displayGithubUserInfo(data);
      spinnerIcon.style.display = 'none';
    })
    .catch((error) => {
      if (error.message === 'User not found') {
        emptyData();
        spinnerIcon.style.display = 'none';
      }
    });
}

//검색 인풋창에서 엔터를 눌렀을 때 실행되는 이벤트들
searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    if (searchInput.value === '') return;
    let searchValue = searchInput.value;
    fetchGithubUserInfo(auth1 + auth2 + auth3 + auth4, searchValue);

    const repoContainer = document.getElementById('repoContainer');
    repoContainer.innerHTML = '';
    fetchGithubUserRepos(auth1 + auth2 + auth3 + auth4, searchValue);
    searchInput.value = '';
  }
});

// 사용자 정보를 화면에 표시하는 함수
function displayGithubUserInfo(data) {
  // 데이터 추출
  let userInfoTags = tagsUserInfo(data);
  let userInfoDetails = userInfoDetail(data);
  // UI 업데이트
  updateUserTags(userInfoTags);
  updateUserDetails(userInfoDetails);
  updateUserGhchart(data.login);

  // emptye 데이터를 처리하고 난 뒤 다시 검색했을 때를 작동할 코드
  const profileBox = document.getElementsByClassName('profileBox');
  const subTitle = document.getElementsByClassName('subTitle');
  const repoBox = document.getElementById('repoContainer');

  profileBox[0].style.display = '';
  subTitle[0].style.display = '';
  repoBox.style.display = '';

  const errorBox = document.getElementById('errorBox');
  errorBox.style.display = 'none';
}

function updateUserGhchart(id) {
  console.log('id임', id);
  // 1. ghchart div에 class hidden 삭제

  const ghchartImage = document.getElementById('ghchartImg');

  ghchartForm[0].classList.remove('hidden');
  ghchartImage.src = `https://ghchart.rshah.org/${id}`;

  // 2. ghchartImg img에 src id 업데이트
}

//데이터가 없을때 보여줄 데이터를 전달하는 함수
function emptyData() {
  let defaultData = defaultUserInfo();
  updateEmptyData(defaultData);
}

// 데이터가 없을 때 보여줄 메세지 객체를 리턴하는 함수
function defaultUserInfo() {
  return {
    message: `🤔 "${searchInput.value}" is not registered`,
  };
}

// 깃헙 API 응답으로부터 필요한 사용자 정보를 추출하는 함수들
function tagsUserInfo(data) {
  return {
    image: data.avatar_url,
    publicRepos: data.public_repos,
    publicGists: data.public_gists,
    followers: data.followers,
    following: data.following,
  };
}

function userInfoDetail(data) {
  return {
    company: data.company,
    webBlog: data.blog,
    location: data.location,
    memberSince: data.created_at,
  };
}

// 데이터가 없을때 UI를 업데이트하는 함수
function updateEmptyData(data) {
  const profileBox = document.getElementsByClassName('profileBox');
  const subTitle = document.getElementsByClassName('subTitle');
  const repoBox = document.getElementById('repoContainer');
  const errorBox = document.getElementById('errorBox');

  profileBox[0].style.display = 'none';
  subTitle[0].style.display = 'none';
  repoBox.style.display = 'none';
  ghchartForm[0].classList.add('hidden');

  errorBox.innerHTML = data.message; // 수정된 부분
  errorBox.style.display = ''; // 수정된 부분
}

// 추출된 사용자 정보로 UI를 업데이트하는 함수들
function updateUserTags(userInfo) {
  const userImage = document.getElementById('userImg');
  const userPublicRepos = document.getElementsByClassName('tag1');
  const userPublicGists = document.getElementsByClassName('tag2');
  const userFollowers = document.getElementsByClassName('tag3');
  const userFollowing = document.getElementsByClassName('tag4');

  userImage.src = userInfo.image;
  userPublicRepos[0].innerHTML = `Public Repos: ${userInfo.publicRepos}`;
  userPublicGists[0].innerHTML = `Public Gists: ${userInfo.publicGists}`;
  userFollowers[0].innerHTML = `Followers: ${userInfo.followers}`;
  userFollowing[0].innerHTML = `Following: ${userInfo.following}`;
}

function updateUserDetails(userInfo) {
  const userCompany = document.getElementsByClassName('info1');
  const userWebBlog = document.getElementsByClassName('info2');
  const userLocation = document.getElementsByClassName('info3');
  const userMemberSince = document.getElementsByClassName('info4');

  if (userInfo.company) {
    userCompany[0].innerHTML = `Company: ${userInfo.company}`;
  } else {
    userCompany[0].innerHTML = '<p>Company: 등록된 정보가 없습니다.</p>';
  }

  if (userInfo.webBlog) {
    userWebBlog[0].innerHTML = `Website & Blog: <a href="${userInfo.webBlog}" target="_blank">${userInfo.webBlog}</a>`;
  } else {
    userWebBlog[0].innerHTML = '<p>Website & Blog: 등록된 정보가 없습니다.</p>';
  }

  if (userInfo.location) {
    userLocation[0].innerHTML = `Location: ${userInfo.location}`;
  } else {
    userLocation[0].innerHTML = '<p>Location: 등록된 정보가 없습니다.</p>';
  }

  userMemberSince[0].innerHTML = `Member Since: ${
    userInfo.memberSince ? new Date(Date.parse(userInfo.memberSince)).toDateString() : 'Unknown'
  }`;
}

//검색된 사용자의 리포지토리 데이터를 가져오는 비동기 함수
function fetchGithubUserRepos(token, useId) {
  spinnerIcon.style.display = 'block';

  fetch(`https://api.github.com/users/${useId}/repos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token ' + token,
    },
  })
    .then((response) => {
      if (!response.ok && response.status === 404) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then((data) => {
      spinnerIcon.style.display = 'none';
      data.forEach((repoData) => {
        let userRepoInfos = userRepoInfo(repoData);
        updateUserRepo(userRepoInfos);
      });
    })
    .catch((error) => {
      spinnerIcon.style.display = 'none';
      console.error(error);
    });
}

// 깃헙 API 응답으로부터 필요한 리퍼지토리 정보를 추출하는 함수
function userRepoInfo(data) {
  return {
    repoNames: data.name,
    repoStars: data.stargazers_count,
    repoWatchers: data.watchers_count,
    repoForks: data.forks_count,
  };
}

// 추출한 데이터를 화면에 업데이트하는 함수
function displayGithubReposInfo(data) {
  let userRepoInfos = userRepoInfo(data);
  updateUserRepo(userRepoInfos); //UI 업데이트
}

// 데이터를 전달받아 UI 업데이트
function updateUserRepo(repoInfos) {
  const repoContainer = document.getElementById('repoContainer');

  if (!repoContainer) {
    return; // repoContainer가 없으면 함수 종료
  }

  let template = `
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
