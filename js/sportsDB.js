const input = () => {
    const inputField = document.getElementById('search-field');
    const inputKey = inputField.value;
    fetchUrl(inputKey);
    inputField.value = '';
}
const warningMessage = (warningMsg) => {
    const warningText = document.createElement('p');
    displaySection.textContent = '';
    warningText.innerText = `${warningMsg}`;
    warningText.classList.add('text-danger');
    warningText.classList.add('text-center');
    displaySection.appendChild(warningText);
    setTimeout(function () {
        displaySection.textContent = '';
    }, 1500);
}
const fetchUrl = searchKey => {
    if (searchKey) {
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchKey}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (!data.player) {
                    warningMessage('broken url');
                }
                else {
                    displayPlayers(data.player);
                }
            })
    }
    else {
        warningMessage('Please search a player name.');
    }
}

const displayPlayers = (playerArr) => {
    const cardParent = document.getElementById('card-parent');
    console.log('cardParent', cardParent);
    cardParent.textContent = '';
    playerArr?.forEach(function (player) {
        console.log(player);
        const divCol = document.createElement('div');
        // divCol.textContent = '';
        divCol.classList.add('col');
        divCol.innerHTML = `
                     <div class="card">
                        <img src="${player.strThumb}" class="card-img-top" alt="player-img">
                        <div class="card-body">
                              <h5 class="card-title">Card title</h5>
                              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
        `;
        cardParent.appendChild(divCol);
    });

}
const searchBtn = document.getElementById('serach-btn');
const displaySection = document.getElementById('display-section');
searchBtn.addEventListener('click', input);
