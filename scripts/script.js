let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async() => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('button-next');
    const backButton = document.getElementById('button-back');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
}

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpa os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";
            
            const characterNameBg = document.createElement("div");
            characterNameBg.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`;

            mainContent.appendChild(card);
            card.appendChild(characterNameBg);
            characterNameBg.appendChild(characterName);
        });

        const nextButton = document.getElementById('button-next');
        const backButton = document.getElementById('button-back');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        nextButton.style.visibility = responseJson.next? "visible" : "hidden";
        backButton.style.visibility = responseJson.previous? "visible" : "hidden";

        currentPageUrl = url;
        
    } catch (error) {
        alert('Erro ao carregar os personagens');
        console.log(error);
    }
}