// Constants

// const {
//     openMarvelAPIKey
// } = CONFIG;

// API_KEY = openMarvelAPIKey;

API_KEY = 'd7b9e4ea4e0981b2920b81b74e9e29c4';


const BASE_URL = `https://gateway.marvel.com/v1/public/characters?limit=20&offset=1185&apikey=${API_KEY}`;
// Variables

let marvelData, marvelDetail

var comics = [];

// Cached Element References

const $comicsEl = $('#comics');
const $modal = $('#modal');

const $name = $('#name');
const $desc = $('#desc');
const $story = $('#story');


// Event Listeners

$comicsEl.on('click', 'article', handleClick);

// Functions

init();

function init() {
    getData();
    
}

function getData(detailURL) {
    
    const url = detailURL ? detailURL : BASE_URL
    

    $.ajax(url)
        .then(function (data) {
            if(detailURL) {

                marvelDetail = data;
                render(true);

            } else {
                
                marvelData = data;
                render();
            }
        }, function (error) {
            console.log(error);
        });
}

function handleClick() {
    comics = [];
    const url = this.dataset.url;
    getData(url);
}

function generateUI() {
    return marvelData.data.results.map(function (marvel) {
        return `
            <article data-url="https://gateway.marvel.com/v1/public/characters/${marvel.id}?apikey=${API_KEY}" class="comic flex-ctr outline">
                <img class="comicImg flex-ctr" src="${marvel.thumbnail.path}/portrait_incredible.${marvel.thumbnail.extension}">
            </article>
            `;
    });

}
        
function render(isDetail) {
    if(isDetail) {
        
        for(let i = 0; i < marvelDetail.data.results[0].comics.items.length; i++) {
            comics.push(marvelDetail.data.results[0].comics.items[i].name);
        };
        $name.text(`Name: ${marvelDetail.data.results[0].name}`);
        $desc.text(`Description: ${marvelDetail.data.results[0].description}`);
        $story.text(`Comics: ${comics}`)
        
        $modal.modal();
    } else {
        $comicsEl.html(generateUI());
    }
}
