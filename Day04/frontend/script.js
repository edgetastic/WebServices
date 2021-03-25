const DOMAIN = "http://localhost:3000";

function getAndDisplayAllHeroes() {
    $.ajax({
        method: "GET",
        url: `${DOMAIN}/heroes`
    }).done(function (resp) {
        var heroContainer = document.getElementById("hero-container");
        heroContainer.innerHTML = "";

        resp.forEach(hero => {
            const newDivElement = document.createElement('div');
            newDivElement.textContent = `${hero.id}: ${hero.name} - ${hero.age}`;

            heroContainer.appendChild(newDivElement);
        });
    });
}