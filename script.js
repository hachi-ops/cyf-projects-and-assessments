const episodesSearch = document.getElementById("episodes-search");
const searchCount = document.getElementById("search-count");
searchCount.className = "search-count";
const selectMenu = document.getElementById("select-input");
const showSelect = document.getElementById("select-show");

let currentEpisodes = [];

//You can edit ALL of the code here
function setup() {
  const allShows = getAllShows();
  makeSelectMenuForShows(allShows);
  sendRequest(82).then((data) => {
    // console.log(data);
    currentEpisodes = data;
    makePageForEpisodes(currentEpisodes);
    makeSelectMenuForEpisodes(currentEpisodes);

    episodesSearch.addEventListener("keyup", searchEpisodes);
    selectMenu.addEventListener("change", onChange);
    showSelect.addEventListener("change", onChangeShow);
  });
}

function makeSelectMenuForShows(shows) {
  console.log(shows);
  shows.sort((showA, showB) => {
    const { name: nameA } = showA;
    const { name: nameB } = showB;

    if (nameA.toLowerCase() < nameB.toLowerCase()) {
      return -1;
    } else if (nameA.toLowerCase() > nameB.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });

  console.log(shows);
  shows.forEach((show) => {
    // console.log(episode);
    // return formatSeriesAndEpisode(episode.season, episode.number);
    const listOption = document.createElement("option");

    listOption.innerText = show.name;
    listOption.value = show.id;
    showSelect.appendChild(listOption);
  });
}

function padTheNumber(num) {
  return num.toString().padStart(2, "0");
}

function formatEpisodeCode(season, number) {
  return `S${padTheNumber(season)}E${padTheNumber(number)}`;
}

function makeSelectMenuForEpisodes(episodeList) {
  selectMenu.innerHTML = "";
  const showAll = document.createElement("option");
  showAll.innerText = "Show all episodes";
  showAll.value = "Show all";
  selectMenu.appendChild(showAll);

  episodeList.forEach((episode) => {
    const listOption = document.createElement("option");
    const episodeString = `${formatEpisodeCode(
      episode.season,
      episode.number
    )} - ${episode.name}`;

    listOption.innerText = episodeString;

    listOption.value = episode.id;
    selectMenu.appendChild(listOption);
  });
}

function makePageForEpisodes(episodeList) {
  const allEpisodesContainer = document.getElementById("episodes");
  allEpisodesContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    const episodeContainer = document.createElement("div");
    const episodeName = document.createElement("h3");
    const episodeCode = document.createElement("p");
    const image = document.createElement("img");
    const summary = document.createElement("div");

    episodeContainer.className = "episode-container";
    episodeName.className = "episode-name";
    episodeName.innerText = episode.name;

    episodeCode.className = "episode-code";

    episodeCode.innerText = `${formatEpisodeCode(
      episode.season,
      episode.number
    )}`;

    image.src = episode.image.medium;
    image.setAttribute = "alt";
    image.alt = "episode image";
    image.className = "episode-image";

    summary.className = "summary";
    summary.innerHTML = episode.summary;

    allEpisodesContainer.appendChild(episodeContainer);

    episodeContainer.appendChild(episodeCode);
    episodeContainer.appendChild(episodeName);
    episodeContainer.appendChild(image);
    episodeContainer.appendChild(summary);
  });
}

function makeCaseInsensitive(string) {
  return string.toLowerCase();
}

function searchEpisodes(event) {
  const searchTerm = makeCaseInsensitive(event.target.value);

  const filteredEpisodes = currentEpisodes.filter((episode) => {
    const episodeName = makeCaseInsensitive(episode.name);
    const episodeSummary = makeCaseInsensitive(episode.summary);

    return (
      episodeSummary.includes(searchTerm) || episodeName.includes(searchTerm)
    );
  });

  const filteredCount = filteredEpisodes.length;
  const currentCount = currentEpisodes.length;
  const countString = `Displaying ${filteredCount} / ${currentCount} episode(s)`;
  searchCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
}

function onChange(event) {
  const episodeId = event.target.value;

  if (episodeId === "Show all") {
    makePageForEpisodes(currentEpisodes);
  } else {
    const filteredEpisodes = currentEpisodes.filter((e) => {
      return e.id === Number(episodeId);
    });
    makePageForEpisodes(filteredEpisodes);
  }
}

function onChangeShow(event) {
  const showId = event.target.value;
  console.log({ showId });
  sendRequest(showId).then((data) => {
    currentEpisodes = data;
    makePageForEpisodes(currentEpisodes);
    makeSelectMenuForEpisodes(currentEpisodes);
  });
}

function sendRequest(showId) {
  const urlForTherequest = `https://api.tvmaze.com/shows/${showId}/episodes`;

  return fetch(urlForTherequest)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // makePageForEpisodes(data);
      return data;
    })
    .catch((e) => console.log(e));
}

window.onload = setup;
