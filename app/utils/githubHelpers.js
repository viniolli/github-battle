import axios from 'axios'

const id = "viniolli";
const sec = "f85b0594e6ed80ab675d45a656b853d4bc970fce";
const param = `?client_id${id}&client_secret=${sec}`

function getUserInfo(username = 'viniolli') {
	return axios.get(`https://api.github.com/users/${username + param}`);
}

function getRepos(username = 'viniolli') {
	return axios.get(`https://api.github.com/users/${username}/repos${param}&per_page=100`);
}

function getTotalStars(repos) {
	return repos.data.reduce((prev, curr) => prev + curr.stargazers_count, 0)
}

async function getPlayersData(player) {
	try {
		const repos = await getRepos(player.login)
		const totalStars = await getTotalStars(repos)
		return {
			followers: player.followers,
			totalStars
		}
	} catch (err) {
		console.warn('Error in getPlayersData', err)
	}
}

function calculateScores(players) {
	return [
		players[0].followers * 3 + players[0].totalStars,
		players[1].followers * 3 + players[1].totalStars,
	]
}

export async function getPlayersInfos (players) {
	try {
		const info = await Promise.all(players.map((username) => getUserInfo(username)))
		return info.map((user) => user.data)
	} catch(err) {
		console.warn('Error in getPlayersInfos', err)
	}
}
export async function battle (players) {
	try {
		const playerOne = getPlayersData(players[0]);
		const playerTwo = getPlayersData(players[1]);
		const data = await Promise.all([playerOne, playerTwo])
		return calculateScores(data)
	} catch(err) {
		console.warn('Error in getPlayersInfo: ', err)
	}
}
