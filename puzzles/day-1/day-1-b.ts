import { readData } from "../../shared.ts"
import chalk from "chalk"

export async function day1b(dataPath?: string) {
	const data = await readData(dataPath)
	let result = 0
	for (let calibration of data) {
		let numberString = ""
		let second = ""

		//find first
		for (let i = 0; i < calibration.length; i++) {
			const current = calibration.slice(i)
			const number = getNumberFromString(current)
			if (number) {
				numberString += number
				break
			}
		}
		for (let i = calibration.length - 1; i >= 0; i--) {
			const current = calibration.slice(i)
			const number = getNumberFromString(current)
			if (number) {
				numberString += number
				break
			}
		}
		console.log(numberString)
		result += +numberString
	}
	return result
}

const getNumberFromString = (current: string): string | undefined => {
	if (Number(current[0]) >= 0 && Number(current[0]) < 10) {
		return current[0]
	} else if (current.startsWith("zero")) {
		return "0"
	} else if (current.startsWith("one")) {
		return "1"
	} else if (current.startsWith("two")) {
		return "2"
	} else if (current.startsWith("three")) {
		return "3"
	} else if (current.startsWith("four")) {
		return "4"
	} else if (current.startsWith("five")) {
		return "5"
	} else if (current.startsWith("six")) {
		return "6"
	} else if (current.startsWith("seven")) {
		return "7"
	} else if (current.startsWith("eight")) {
		return "8"
	} else if (current.startsWith("nine")) {
		return "9"
	} else {
		return undefined
	}
}

const answer = await day1b()
console.log(chalk.bgGreen("Your Answer:"), chalk.green(answer))
