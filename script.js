//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  const allEpisodesContainer = document.getElementById("episodes");

  episodeList.forEach((episode) => {
    const episodeContainer = document.createElement("div");
    episodeContainer.className = "episode-container";

    const episodeName = document.createElement("h3");
    episodeName.classList = "episode-name";
    episodeName.innerText = episode.name;
    episodeContainer.appendChild(episodeName);

    const episodeCode = document.createElement("p");
    episodeCode.className = "episode-code";
    episodeContainer.appendChild(episodeCode);

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
    episodeContainer.appendChild(image);

    const summary = document.createElement("div");
    summary.className = "summary";
    summary.innerHTML = episode.summary;
    episodeContainer.appendChild(summary);

    allEpisodesContainer.appendChild(episodeContainer);
  });
}

window.onload = setup;
