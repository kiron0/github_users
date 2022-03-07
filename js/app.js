// add event listener on enter button
document.getElementById('search-input').addEventListener("keypress", function (event) {
  if (event.key == 'Enter') {
    document.getElementById('search-btn').click()
  };
});

const getInput = () => {
  const input = document.getElementById('search-input');
  const inputValue = input.value;
  if (inputValue == '') {
    Swal.fire({
      text: 'Please type a username first',
      icon: 'warning',
    })
  }
  else {
    loadGithubUser(inputValue);
  }
  input.value = '';
}

const loadGithubUser = async (userName) => {
  const url = `https://api.github.com/users/${userName}`;
  const res = await fetch(url);
  const data = await res.json();
  showUserCard(data);
  if (data.id == undefined) {
    Swal.fire({
      text: 'Wrong username, please check again',
      icon: 'error',
    })
  }
  else {
    showUserCard(data);
  }
}



const showUserCard = async (userData) => {
  const cardContainer = document.getElementById('card-container');
  console.log(userData);
  cardContainer.innerHTML = `
    <div
    class="card flex flex-col items-center justify-center p-4 rounded-2xl w-80 mx-auto"
  >
    
    <div class="profile mx-auto rounded-full py-2 w-24">
      <img
        class="rounded-full h-24 w-24 object-cover"
        src="${userData.avatar_url}"
        alt="profile"
      />
    </div>
    <!--name-->
    <div class="name text-gray-800 text-2xl font-medium mt-4">
      <p>${userData.name ? userData.name : "name not defind"}</p>
    </div>
    <!--username-->
    <div class="username text-gray-500">
      <p>${userData.login}</p>
    </div>
    <!--Live in-->
    <div class="work text-gray-700 mt-2">
      <p>${userData.location ? userData.location : "location not defind"}</p>
    </div>
    <!--work-->
    <div class="work text-gray-700 mt-4">
      <p>${userData.bio ? userData.bio : "bio not defind"}</p>
    </div>
    <!--work-->
    <div class="w-full work text-gray-700 mt-4 flex justify-around">
      <p class="text-center">Following <br/> <span class="font-bold">${userData.following}</span></p>
      <p class="text-center">Follower <br/> <span class="font-bold">${userData.followers}</span></p>
    </div>
    <!--Creation time-->
    <div class="work text-gray-700 mt-6">
      <p>Created at: ${userData.created_at.slice(0, 10)}</p>
      <p class="mt-1">Updated at: ${userData.updated_at.slice(0, 10)}</p>
    </div>
    <!-- follow button -->
    <div class="w-52 mt-8 mb-4">
    <a target="_blank" href="${userData.html_url}">
      <button
        class="py-2 px-4 w-full font-semibold rounded-lg shadow-lg"
      >
        Follow
      </button>
      </a>
    </div>
  </div>
    `;
}

let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () => {
  themeToggler.classList.toggle('fa-sun');
  if (themeToggler.classList.contains('fa-sun')) {
    document.body.classList.add('active');
  } else {
    document.body.classList.remove('active');
  }
}

/* 

*/