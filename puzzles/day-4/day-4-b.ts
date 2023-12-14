import { readData } from "../../shared.ts"
import chalk from "chalk"

export async function day4b(dataPath?: string) {
	const data = await readData(dataPath)
	let map: Record<string, number> = {}

	for (let card of data) {
		const cardNumber = card.slice(card.indexOf("d") + 1, card.indexOf(":")).trim()
		if (!map[cardNumber]) {
			map[cardNumber] = 1
		}
		let winning: Record<number, boolean> = {}
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
			if (winning[number]) {
				count++
			}
		}
		let current = map[cardNumber]

		while (count) {
			const key = +cardNumber + count
			if (!map[key]) {
				map[key] = 1
			}
			map[key] += current
			count--
		}

		console.log(map)
	}

	return Object.values(map).reduce((acc, val) => acc + val, 0)
}

const answer = await day4b()
console.log(chalk.bgGreen("Your Answer:"), chalk.green(answer))
