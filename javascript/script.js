var api_key = `xitYMCsB071sZnhYgg0ANkI3iRMocM7c`;
var animalList = [`zebra`, `panda`, `llama`, `lemur`,`kitten`,`dolphin`,`chihuahua`,];


function drawButton() {
    for (i = 0; i < animalList.length; i++) {
        var button = $(`<button>`);
        button.attr('value', animalList[i])
            .attr(`class`, `btn btn-info animal-button`)
            .text(animalList[i]);
        $(`#button-container`).append(button);
    }
};

window.onload = function () {
    console.log(`window.onload fired`);
    drawButton();

    $(`.animal-button`).on(`click`, function () {
        var animal = $(this).val();
        console.log(`${animal} button clicked!`);
        drawGiphs(animal);
    });

    $(`#submit-button`).on(`click`, function () {
        var newButton = $(`#text-input`).val();
        animalList.push(newButton);
        $(`#button-container`).empty();
        var newButton = $(`#text-input`).val("");
        drawButton();

        $(`.animal-button`).on(`click`, function () {
            var animal = $(this).val();
            console.log(`${animal} button clicked!`);
            drawGiphs(animal);
        });
    });
};

function drawGiphs(a) {
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${a}&api_key=${api_key}&limit=10&rating=R`
    $.ajax({
        url: queryURL,
        method: `GET`
    }).then(function (response) {
        console.log(response);
        for (i = 0; i < 10; i++) {
            var giphyCard = $(`<div>`);
            var giphyURL = response.data[i].images.fixed_height.url;
            var giphyRating = response.data[i].rating;
            giphyCard.attr(`class`, `card`)
                .attr(`style`,`width: 45%;`)
                .html(`
                <img class="card-img-top" src="${giphyURL}">
                <div class="card-body">
                    <p class="card-text">Rated: ${giphyRating}</p>
                </div>
                `);
            $(`#giphy-container`).prepend(giphyCard);
        }
    });
}

