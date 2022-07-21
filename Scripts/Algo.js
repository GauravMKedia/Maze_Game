// This file contain code to initialize an algorithm according to user inuput and code common to all algorithms.

function start() {
    btn_disable.disabled = true;
    solve_disable.disabled = true;
    let algo_opt = document.getElementById("algo").value;
    if (algo_opt == 'dfs') {
        current = grid[0][0];
        stack.push(grid[0][0]);
        let new_dfs = new dfs_Algo();
        new_dfs.dfs_solve();
    }
    if (algo_opt == 'bfs') {
        current = grid[0][0];
        stack.push(grid[0][0]);
        let new_bfs = new bfs_Algo();
        new_bfs.bfs_solve();
    }
}

// Function to check all the possible direction we can go from current state and push them in stack.
function check_way(rowNum, colNum) {
    if (!grid[rowNum][colNum].walls.topWall && grid[rowNum][colNum - 1].visited) {
        stack.push(grid[rowNum][colNum - 1]);
    }
    if (!grid[rowNum][colNum].walls.leftWall && grid[rowNum - 1][colNum].visited) {
        stack.push(grid[rowNum - 1][colNum]);
    }
    if (!grid[rowNum][colNum].walls.rightWall && grid[rowNum + 1][colNum].visited) {
        stack.push(grid[rowNum + 1][colNum]);
    }
    if (!grid[rowNum][colNum].walls.bottomWall && grid[rowNum][colNum + 1].visited) {
        stack.push(grid[rowNum][colNum + 1]);
    }
}


// Function to highlight current position
function highlight_Algo(rowNum, colNum) {
    let size = s;
    let x = (rowNum * size) + 1;
    let y = (colNum * size) + 1;
    ctx.fillStyle = 'purple';

    if (!current.walls.topWall) {
        ctx.fillRect(x, y - 2, size - 2, size);
    }
    if (!current.walls.bottomWall) {
        ctx.fillRect(x, y, size - 2, size);
    }
    if (!current.walls.leftWall) {
        ctx.fillRect(x - 2, y, size, size - 2);
    }
    if (!current.walls.rightWall) {
        ctx.fillRect(x, y, size + 2, size - 2);
    }
}
