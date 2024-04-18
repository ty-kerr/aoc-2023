import { readData } from "../../shared.ts"
import chalk from "chalk"

export async function day5b(dataPath?: string) {
	const data = await readData(dataPath)

	let seedRange = data
		.shift()!
		.split(" ")
		.slice(1)
		.map((seed) => +seed)

	type TMaps = {
		[key: number]: {
			dest: number[]
			src: number[]
			range: number[]
		}
	}

	let maps: TMaps = {
		1: {
			dest: [],
			src: [],
			range: [],
		},
		2: {
			dest: [],
			src: [],
			range: [],
		},
		3: {
			dest: [],
			src: [],
			range: [],
		},
		4: {
			dest: [],
			src: [],
			range: [],
		},
		5: {
			dest: [],
			src: [],
			range: [],
		},
		6: {
			dest: [],
			src: [],
			range: [],
		},
		7: {
			dest: [],
			src: [],
			range: [],
		},
	}

	let current = 0

	for (let row of data) {
		if (row.length) {
			const splitted = row.split(" ")
			if (isNaN(Number(splitted[0]))) {
				current++
			} else {
				let dest = Number(splitted[0])
				let src = Number(splitted[1])
				let range = Number(splitted[2])
				maps[current].dest.push(dest)
				maps[current].src.push(src)
				maps[current].range.push(range)
			}
		}
	}

	let result = Infinity

	for (let i = 0; i < seedRange.length; i += 2) {
		let end = seedRange[i]
		let start = seedRange[i + 1]
		console.log(start, end)
		for (let seed = start; i <= end; i++) {
			for (let i = 1; i <= 7; i++) {
				let found = false
				const { src, dest, range } = maps[i]

				for (let j = 0; j < src.length; j++) {
					if (found) {
						break
					}
					if (seed >= src[j] && seed < src[j] + range[j]) {
						seed = dest[j] + seed - src[j]
						found = true
					}
				}
			}

			result = Math.min(result, seed)
		}
	}

	return result
}

const answer = await day5b()
console.log(chalk.bgGreen("Your Answer:"), chalk.green(answer))
