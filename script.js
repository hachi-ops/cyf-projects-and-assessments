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

window.onload = setup;
