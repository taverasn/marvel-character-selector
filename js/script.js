// Constants

const {
    openMarvelAPIKey
} = CONFIG;

const BASE_URL = 'https://gateway.marvel.com/'

const API_KEY = openMarvelAPIKey
// Variables

let marvelData;

// Cached Element References

const $comicsEl = $('#comics');

// Event Listeners

$comicsEl.on('click', 'article', handleClick);

// Functions

init();

function init() {
    getData();
}

function getData() {
    $.ajax(BASE_URL + `v1/public/characters?ts=1&apikey=` + API_KEY)
        .then(function (data) {
            marvelData = data;
            render();
        }, function (error) {
            console.log(error);
        });
}

function generateUI() {
    return marvelData.data.results.map(function (marvel) {
        return `
            <article class="comic flex-ctr outline">
                <img class=" comicImg flex-ctr" src="${marvel.thumbnail.path}/portrait_incredible.${marvel.thumbnail.extension}">
            </article>
            `;

    });

}

function handleClick() {

}

function render() {
    $comicsEl.html(generateUI());
}