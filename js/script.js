/*
1. hämta API
2. skapa en funktion som gör ett element för varje objekt, och ger dem en klass och id
3. skapa en funktion som kopplar eventListeners till varje element
4. skapa funktion för att byta vy som kör via eventListeners
5. 
*/

const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/solaris-api/';

const planets = document.querySelector("#planets");
const planetPage = document.querySelector("#planetPage");
const returnBtn = document.querySelector("#return");

async function getKey() {
    const resp = await fetch(`${BASE_URL}keys/`)
    const data = await resp.json();
    return data.key;
}

async function getCelestialBodies() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}bodies/`, {
    headers: {'x-zocom': key}
    })
    const data = await response.json();
    main(data);
}

function newElement(elemTag) {
    const elem = document.createElement(elemTag);
    return elem;
}

function createPlanetElement(elem, location) {
    elem.id = planet.name;
    elem.classList.add("planet");
    location.appendChild(elem);
}

function createSaturnusRing(location) {
    const satRing = document.createElement("figure");
    satRing.id = "saturnusRing";
    location.appendChild(satRing);
}

function attachEvents(planet) {
    document.querySelector("#" + planet.name).addEventListener("click", () => {
        switchScreen(planetPage, planets);
        showPlanetInfo(planet);
    })
}

function switchScreen(screenToShow, screenToHide) {
    screenToHide.classList.remove("flex");
    screenToHide.classList.add("hidden");
    screenToShow.classList.remove("hidden");
    screenToShow.classList.add("flex");
}

function fillTitle(title) {
    const titleName = document.querySelector("#titleName");
    titleName.innerText = title;
}

function fillSubTitle(subTitle) {
    const latinName = document.querySelector("#latinName");
    latinName.innerText = subTitle;
}

function fillDescription(description) {
    const desc = document.querySelector("#planetDescription");
    desc.innerText = description;
}

function fillCircumference(circumference) {
    const circ = document.querySelector("#planetCircumference");
    circ.innerText = circumference
}

function fillDistanceToSun(distance) {
    const dist = document.querySelector("#distanceToSun");
    dist.innerText = distance
}

function fillMaxTemp(temperature) {
    const temp = document.querySelector("#maxTemp");
    temp.innerText = temperature
}

function fillMinTemp(temperature) {
    const temp = document.querySelector("#minTemp");
    temp.innerText = temperature
}

function clearMoonList(moons) {
    const nameList = document.querySelector("#moonNames");
    while(nameList.firstChild) {
        nameList.removeChild(nameList.lastChild);
    }
}

function fillMoonList(moons) {
    const nameList = document.querySelector("#moonNames");
    for(i = 0; i < moons.length; i++) {
        const liElem = newElement("li");
        liElem.id = `${moons[i]}`;
        liElem.innerText = moons[i];
        nameList.appendChild(liElem);
    }
}

function main(planetData) {
    for(planet of planetData) {
        const newFigure = newElement("figure");
        createPlanetElement(newFigure, planets);
        if(planet.id === 6) {
            createSaturnusRing(newFigure);
        }
        attachEvents(planet);
    }
}

function showPlanetInfo(planet) {
    const selectedPlanet = document.querySelector(".selectedPlanet");
    selectedPlanet.id = "temp" + planet.name;
    selectedPlanet.classList.add("planet");
    fillTitle(planet.name);
    fillSubTitle(planet.latinName);
    fillDescription(planet.desc);
    fillCircumference(planet.circumference);
    fillDistanceToSun(planet.distance);
    fillMaxTemp(planet.temp.day);
    fillMinTemp(planet.temp.night);
    fillMoonList(planet.moons);
    
    returnBtn.addEventListener("click", () => {
        switchScreen(planets, planetPage);
        clearMoonList(planet.moons);
    })
}

getCelestialBodies();