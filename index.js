const theInput = document.querySelector(".get-repos input");
const getBtn = document.querySelector(".get-button");
const reposData = document.querySelector(".show-data");

// Add Event Listener
getBtn.addEventListener("click", getRepos);

// Get Repos function
function getRepos() {
	if (!theInput.value) {
		reposData.innerHTML = "<span>Please write a GitHub username</span>";
	} else {
		fetch(`https://api.github.com/users/${theInput.value}/repos`)
			.then((response) => response.json())
			.then((data) => {
				reposData.innerHTML = "";
				// Loop on repositories
				data.map((repo) => {
					let div = document.createElement("div");
					let repoName = document.createTextNode(repo.name);
					div.appendChild(repoName);
					// add a link to the repo
					let infoDiv = document.createElement("div");
					let repoUrl = document.createElement("a");
					repoUrl.appendChild(document.createTextNode("Visit"));
					repoUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
					repoUrl.setAttribute("target", "_blank");
					infoDiv.appendChild(repoUrl);
					// Create star count span
					let starsSpan = document.createElement("span");
					let startTxt = document.createTextNode(
						`Stars ${repo.stargazers_count}`,
					);
					starsSpan.appendChild(startTxt);
					infoDiv.appendChild(starsSpan);
					div.appendChild(infoDiv);
					div.className = "repo-box";
					reposData.appendChild(div);
				});
			});
	}
}
