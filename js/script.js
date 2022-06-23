const url = "https://api.github.com/users/";

const main = document.querySelector(".main");
const form = document.querySelector(".search-form");
const search = document.querySelector(".search");

async function getUser(username) {
  const response = await fetch(url + username);
  const user = await response.json();
  createCard(user);
  getRepos(username);
}

async function getRepos(username) {
  const response = await fetch(url + username + "/repos");
  const repos = await response.json();
  addRepoToCard(repos);
}

function createCard(user) {
  const cardHtml = `
  <div class="profile w-100 p-5 mt-4 shadow text-white row align-items-center justify-content-between">
    <div class="col-lg-5 profile-img text-center">
      <img src="${user.avatar_url}" class="w-75" alt="${user.name}">
    </div>
    <div class="col-lg-7 profile-body">
      <h2>${user.name}</h2>
      <p class="text-white-50">${user.bio}</p>
      <ul class="list-inline p-0">
      <li class="list-inline-item"><span class="mr text-white-50">Followers</span><span class="fw-bold">${user.followers}</span></li>
        <li class="list-inline-item"><span class="mr text-white-50">Following</span><span class="fw-bold">${user.following}</span></li>
        <li class="list-inline-item"><span class="mr text-white-50">Repos</span><span class="fw-bold">${user.public_repos}</span></li>
      </ul>
      <div class="repos" id="repos"></div>
    </div>
  </div>
  `;
  main.innerHTML = cardHtml;
}

function addRepoToCard(repos) {
  const reposElement = document.querySelector("#repos");
  repos.slice(0, 15).forEach((repo) => {
    const links = document.createElement("a");
    links.classList.add("repo");
    links.href = repo.html_url;
    links.target = "_blank";
    links.innerText = repo.name;
    reposElement.append(links);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
  }
});
