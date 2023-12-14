import { readData } from "../../shared.ts"
import chalk from "chalk"

export async function day3a(dataPath?: string) {
	const data = await readData(dataPath)
	const grid = data

	let visited = new Set<string>()
	const q = getStartingPoints(grid)
	const length = grid[0].length
	let result = 0

	while (q.length) {
		const point = q.shift()
		if (!point) {
			break
		}

		const [r, c] = point
		const row = grid[r]
		let left = c
		let right = c
		let hasVisited = false

		while ((left >= 0 && isNumber(row[left])) || (right < length && isNumber(row[right]))) {
			if (visited.has(`${r}_${left}`) || visited.has(`${r}_${right}`)) {
				hasVisited = true
				break
			}

			if (isNumber(row[left])) {
				visited.add(`${r}_${left}`)
				left--
			}
			if (isNumber(row[right])) {
				visited.add(`${r}_${right}`)
				right++
			}
		}

		if (hasVisited) {
			continue
		}

		result += +row.slice(left + 1, right)
	}

	return result
}

const isNumber = (char: string) => Number(char) >= 0 && Number(char) <= 9

const getStartingPoints = (grid: string[]) => {
	let points = []
	let symbols = []
	let rows = grid.length
	let cols = grid[0].length
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] === ".") {
				continue
			} else if (Number(grid[r][c]) >= 0 && Number(grid[r][c]) <= 9) {
				continue
			}
			symbols.push([r, c])
		}
	}

	const directions = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
		[1, 1],
		[-1, 1],
		[1, -1],
		[-1, -1],
	]

	for (let [r, c] of symbols) {
		for (let [dr, dc] of directions) {
			if (r + dr < 0 || r + dr >= rows) {
				continue
			}
			if (c + dc < 0 || c + dc >= cols) {
				continue
			}
			if (Number(grid[r + dr][c + dc]) >= 0 && Number(grid[r + dr][c + dc]) <= 9) {
				points.push([r + dr, c + dc])
			}
		}
	}
	console.log(points)
	return points
}

const answer = await day3a()
console.log(chalk.bgGreen("Your Answer:"), chalk.green(answer))
