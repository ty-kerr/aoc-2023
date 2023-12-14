import { readData } from "../../shared.ts"
import chalk from "chalk"

export async function day2b(dataPath?: string) {
	const data = await readData(dataPath)
	let result = 0

	for (let game of data) {
		let valid = true
		const gameNumber = game.slice(4, game.indexOf(":"))
		const scores = game
			.slice(game.indexOf(":") + 1)
			.replace(/\s/g, "")
			.split(";")
		let power = 0

		const map = {
			red: 0,
			green: 0,
			blue: 0,
		}

		for (let score of scores) {
			score.split(",").forEach((outcome) => {
				const number = outcome.toLowerCase().replace(/[^0-9]/g, "")
				const color = outcome.toLowerCase().replace(/[^a-z]/g, "")
				map[color as keyof typeof map] = Math.max(map[color as keyof typeof map], +number)
			})
		}
		power = Object.values(map).reduce((acc, val) => acc * val, 1)

		result += power
	}
	return result
}

const answer = await day2b()
console.log(chalk.bgGreen("Your Answer:"), chalk.green(answer))
