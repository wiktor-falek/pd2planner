interface GridItem<T> {
	value: T | null;
	isOriginSquare: boolean;
	originX: number;
	originY: number;
}

interface Grid<T> {
	width: number;
	height: number;
	_squares: GridItem<T>[][];
}

function createGridItem<T>(
	value: T | null,
	originX: number,
	originY: number,
	isOriginSquare: boolean = false
): GridItem<T> {
	return {
		value,
		isOriginSquare,
		originX,
		originY,
	};
}

export function createGrid<T>(width: number, height: number): Grid<T> {
	const _squares = Array.from({ length: height }, () =>
		Array.from({ length: width }, () => createGridItem<T>(null, 0, 0))
	);

	return {
		width,
		height,
		_squares,
	};
}

export function squareExists<T>(grid: Grid<T>, x: number, y: number): boolean {
	return x >= 0 && x < grid.width && y >= 0 && y < grid.height;
}

export function getSquare<T>(grid: Grid<T>, x: number, y: number): GridItem<T> | null {
	if (squareExists(grid, x, y)) {
		return grid._squares[y]![x]!;
	}
	return null;
}

export function squareIsTaken<T>(grid: Grid<T>, x: number, y: number): boolean {
	const square = getSquare(grid, x, y);
	return square?.value !== null;
}

export function itemFits<T>(
	grid: Grid<T>,
	originX: number,
	originY: number,
	width: number,
	height: number
): boolean {
	for (let dx = 0; dx < width; dx++) {
		for (let dy = 0; dy < height; dy++) {
			const x = originX + dx;
			const y = originY + dy;
			if (!squareExists(grid, x, y) || squareIsTaken(grid, x, y)) return false;
		}
	}
	return true;
}

export function addItemAt<T>(
	grid: Grid<T>,
	item: T,
	originX: number,
	originY: number,
	width: number,
	height: number
): boolean {
	if (!itemFits(grid, originX, originY, width, height)) return false;

	for (let x = originX; x < originX + width; x++) {
		for (let y = originY; y < originY + height; y++) {
			const square = getSquare(grid, x, y);
			if (square) {
				square.value = item;
				square.originX = originX;
				square.originY = originY;
			}
		}
	}

	const originSquare = getSquare(grid, originX, originY);
	originSquare!.isOriginSquare = true;

	return true;
}

export function addItem<T>(grid: Grid<T>, item: T, width: number, height: number): boolean {
	for (let x = 0; x < grid.width; x++) {
		for (let y = 0; y < grid.height; y++) {
			if (itemFits(grid, x, y, width, height)) {
				return addItemAt(grid, item, x, y, width, height);
			}
		}
	}
	return false;
}

// export class Grid<T> {
// 	width: number;
// 	height: number;
// 	private squares: GridItem<T>[][];

// 	constructor(width: number, height: number) {
// 		this.width = width;
// 		this.height = height;

// 		this.squares = Array.from({ length: height }, () =>
// 			Array.from({ length: width }, () => new GridItem<T>(null, 0, 0))
// 		);
// 	}

// 	private getSquare(x: number, y: number): GridItem<T> | null {
// 		if (this.squareExists(x, y)) {
// 			return this.squares[y]![x]!;
// 		}
// 		return null;
// 	}

// 	addItem(item: T, width: number, height: number): boolean {
// 		for (let x = 0; x < this.width; x++) {
// 			for (let y = 0; y < this.height; y++) {
// 				if (this.itemFits(x, y, width, height)) {
// 					return this.addItemAt(item, x, y, width, height);
// 				}
// 			}
// 		}
// 		return false;
// 	}

// 	addItemAt(item: T, originX: number, originY: number, width: number, height: number): boolean {
// 		if (!this.itemFits(originX, originY, width, height)) return false;

// 		for (let x = originX; x < originX + width; x++) {
// 			for (let y = originY; y < originY + height; y++) {
// 				const square = this.getSquare(x, y);
// 				if (square) {
// 					square.value = item;
// 					square.originX = originX;
// 					square.originY = originY;
// 				}
// 			}
// 		}

// 		const originSquare = this.getSquare(originX, originY);
// 		if (originSquare) originSquare.isOriginSquare = true;

// 		return true;
// 	}

// 	getGridItem(x: number, y: number): GridItem<T> | null {
// 		return this.getSquare(x, y);
// 	}

// 	getItem(x: number, y: number): Nullable<T> {
// 		const square = this.getSquare(x, y);
// 		return square ? square.value : null;
// 	}

// 	*items(): Iterable<T> {
// 		for (let row of this.squares) {
// 			for (let cell of row) {
// 				if (cell.value !== null) yield cell.value;
// 			}
// 		}
// 	}

// 	removeItem(item: T): boolean {
// 		let removed = false;

// 		for (let x = 0; x < this.width; x++) {
// 			for (let y = 0; y < this.height; y++) {
// 				const square = this.getSquare(x, y);
// 				if (square && square.value === item) {
// 					square.value = null;
// 					removed = true;
// 				}
// 			}
// 		}

// 		return removed;
// 	}

// 	squareIsOriginSquare(x: number, y: number): boolean {
// 		const square = this.getSquare(x, y);
// 		return square ? square.isOriginSquare : false;
// 	}

// 	squareExists(x: number, y: number): boolean {
// 		return x >= 0 && x < this.width && y >= 0 && y < this.height;
// 	}

// 	squareIsTaken(x: number, y: number): boolean {
// 		const square = this.getSquare(x, y);
// 		return square?.value !== null;
// 	}

// 	itemFits(originX: number, originY: number, width: number, height: number): boolean {
// 		for (let dx = 0; dx < width; dx++) {
// 			for (let dy = 0; dy < height; dy++) {
// 				const x = originX + dx;
// 				const y = originY + dy;
// 				if (!this.squareExists(x, y) || this.squareIsTaken(x, y)) return false;
// 			}
// 		}
// 		return true;
// 	}
// }
