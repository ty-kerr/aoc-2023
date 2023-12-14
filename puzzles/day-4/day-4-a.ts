import { readData } from "../../shared.ts"
import chalk from "chalk"

export async function day4a(dataPath?: string) {
	const data = await readData(dataPath)

	let result = 0

	for (let card of data) {
		let winning: Record<number, boolean> = {}
		let won: Record<number, boolean> = {}
		let count = 0

		let [winningNumbers, currentCards] = card
			.substring(card.indexOf(":") + 1)
			.split("|")
			.map((i) => i.trim())
			.map((i) => i.split(" "))

		for (let current of winningNumbers) {
			if (!current) {
				continue
			}
			const number = +current.trim()
			winning[number] = true
		}

		for (let current of currentCards) {
			if (!current) {
				continue
			}
			const number = +current.trim()
			if (winning[number] && !won[number]) {
				count++
				won[number] = true
			}
		}
		if (count) {
			result += Math.pow(2, count - 1)
		}
	}

	return result
}

const answer = await day4a()
console.log(chalk.bgGreen("Your Answer:"), chalk.green(answer))
