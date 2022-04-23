var matrix = []
var start = [0, 3, 6, 27, 30, 33, 54, 57, 60]
var positions_order = []
var button = document.getElementById("solveButton")

var v = document.getElementsByClassName("form-control")

//Gives line by line box positions
for (const key in start) {
    var k = start[key]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            positions_order.push(j + k)
        }
        k += 9
    }
}

//converts array of positions to matrix
for (let i = 0; i < 9; i++) {
    let temp = []
    for (let j = 0; j < 9; j++) {
        let p = positions_order[9 * i + j]
        temp.push(v[p])
    }
    matrix.push(temp)
}

let N = 9

function solveSudoku(grid, row, col) {

    if (row == N - 1 && col == N) {
        return true
    }

    if (col == N) {
        row++
        col = 0
    }

    if (grid[row][col].value != 0) {
        return solveSudoku(grid, row, col + 1)
    }

    for (let num = 1; num < 10; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col].value = num
            if (solveSudoku(grid, row, col + 1)) {
                return true
            }
        }
        grid[row][col].value = 0;
    }
    return false
}

function isSafe(grid, row, col, num) {
    for (let x = 0; x <= 8; x++) {
        if (grid[row][x].value == num) {
            return false
        }
    }

    for (let x = 0; x <= 8; x++) {
        if (grid[x][col].value == num) {
            return false
        }
    }

    let startRow = row - row % 3
    let startCol = col - col % 3

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol].value == num) {
                return false
            }
        }
    }
    return true
}

button.addEventListener("click", () => {
    if (solveSudoku(matrix, 0, 0)) {
        console.log(matrix)
    }
    else {
        console.log("Cannot solve")
    }
})