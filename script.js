const episodesSearch = document.getElementById("episodes-search");

const allEpisodes = getAllEpisodes();
const allCount = allEpisodes.length;
const searchCount = document.getElementById("search-count");
searchCount.innerHTML = `Displaying ${allCount} episodes`;
//You can edit ALL of the code here
function setup() {
  makePageForEpisodes(allEpisodes);

  episodesSearch.addEventListener("keyup", searchEpisodes);
}

function makePageForEpisodes(episodeList) {
  // const searchCount = document.createElement("p");
  // searchCount.className = "search-count";
  const allEpisodesContainer = document.getElementById("episodes");
  allEpisodesContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    const episodeContainer = document.createElement("div");
    episodeContainer.className = "episode-container";

    const episodeName = document.createElement("h3");
    episodeName.className = "episode-name";
    episodeName.innerText = episode.name;

    const episodeCode = document.createElement("p");
    episodeCode.className = "episode-code";

    function padTheNumber(num) {
      return num.toString().padStart(2, "0");
    }

    function formatEpisodeCode(season, number) {
      return `S${padTheNumber(season)}E${padTheNumber(number)}`;
    }

    episodeCode.innerText = `${formatEpisodeCode(
      episode.season,
      episode.number
    )}`;

    const image = document.createElement("img");
    image.src = episode.image.medium;
    image.setAttribute = "alt";
    image.alt = "episode image";
    image.className = "episode-image";

    const summary = document.createElement("div");
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

  const filteredEpisodes = allEpisodes.filter((episode) => {
    const episodeName = makeCaseInsensitive(episode.name);
    const episodeSummary = makeCaseInsensitive(episode.summary);

    return (
      episodeSummary.includes(searchTerm) || episodeName.includes(searchTerm)
    );
  });
  const filteredCount = filteredEpisodes.length;

  const countString = `Displaying ${filteredCount} / ${allCount} episode(s)`;
  searchCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
}

window.onload = setup;
