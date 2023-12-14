import { readData } from "../../shared.ts"
import chalk from "chalk"

export async function day2a(dataPath?: string) {
	const data = await readData(dataPath)
	let result = 0
	const map = {
		red: 12,
		green: 13,
		blue: 14,
	}

	for (let game of data) {
		let valid = true
		const gameNumber = game.slice(4, game.indexOf(":"))
		const scores = game
			.slice(game.indexOf(":") + 1)
			.replace(/\s/g, "")
			.split(";")

		for (let score of scores) {
			let outcomes = score.split(",").forEach((outcome) => {
				const number = outcome.toLowerCase().replace(/[^0-9]/g, "")
				const color = outcome.toLowerCase().replace(/[^a-z]/g, "")
				if (+number > map[color as keyof typeof map]) {
					valid = false
				}
			})

			if (!valid) {
				break
			}
		}
		if (valid) {
			result += +gameNumber
		}
	}
	return result
}

const answer = await day2a()
console.log(chalk.bgGreen("Your Answer:"), chalk.green(answer))
