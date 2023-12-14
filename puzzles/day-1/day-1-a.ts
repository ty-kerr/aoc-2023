import { readData } from "../../shared.ts"
import chalk from "chalk"

export async function day1a(dataPath?: string) {
	const data = await readData(dataPath)
	let result = 0
	for (let calibration of data) {
		calibration = calibration.toLowerCase().replace(/[^0-9]/g, "")
		result += +(calibration[0] + calibration[calibration.length - 1])
	}
	return result
}

const answer = await day1a()
console.log(chalk.bgGreen("Your Answer:"), chalk.green(answer))
