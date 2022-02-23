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
  // if (userName.login !== null) {

  // }
  // else {
  //   Swal.fire({
  //     text: 'Wrong username',
  //     icon: 'error',
  //   })
  // }
}



const showUserCard = async (userData) => {
  const cardContainer = document.getElementById('card-container');
  console.log(userData);
  cardContainer.innerHTML = `
    <div
    class="card bg-white flex flex-col items-center justify-center p-4 drop-shadow-md rounded-2xl w-80 mx-auto"
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
      <p>${userData.name}</p>
    </div>
    <!--username-->
    <div class="username text-gray-500">
      <p>${userData.login}</p>
    </div>
    <!--Live in-->
    <div class="work text-gray-700 mt-2">
      <p>${userData.location}</p>
    </div>
    <!--work-->
    <div class="work text-gray-700 mt-4">
      <p>${userData.bio}</p>
    </div>
    <!--work-->
    <div class="w-full work text-gray-700 mt-4 flex justify-around">
      <p class="text-center">Following <br/> <span class="font-bold">${userData.following}</span></p>
      <p class="text-center">Follower <br/> <span class="font-bold">${userData.followers}</span></p>
    </div>
    <!--Creation time-->
    <div class="work text-gray-700 mt-4">
      <p>Created at</p>
      <p>${userData.created_at.slice(0, 10)}</p>
    </div>
    <!-- follow button -->
    <div class="w-full mt-8">
    <a target="_blank" href="${userData.html_url}">
      <button
        class="bg-blue-500 py-2 px-4 hover:bg-blue-600 text-white w-full font-semibold rounded-lg shadow-lg"
      >
        Follow
      </button>
      </a>
    </div>
  </div>
    `;
}

/* 

*/