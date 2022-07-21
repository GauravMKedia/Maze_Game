// This js file contain code to generate maze using canvas


let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");
let generationComplete = false;
let grid = [];
let stack = [];
let current;
let goal;

// When Maze is generating solve and generate button are diasabled
const btn_disable = document.getElementById("generate");
const solve_disable = document.getElementById("solve");


class Maze{
    constructor(size,rows,columns){
        this.size = size;
        this.row_size = rows*size;
        this.col_size = columns*size;
        this.rows = rows;
        this.columns = columns;
        this.stack = stack;
        this.grid=grid;
    }
    
    setup(){
        // This function create a imaginary grid conatining all type of data we will need while actually drawing on screen
        // Here we generate cell for each row then push entire row in grid 
        for(let r=0;r<this.rows;r++){
            let row = [];
            for(let c =0;c<this.columns;c++){
                // Creating a cell for row(r) and column(c)
                let cell = new Cell(r,c,this.grid,this.row_size,this.col_size,this.rows,this.columns);
                row.push(cell);
            }
            this.grid.push(row);
        }
        current = this.grid[0][0];
    }
    
    draw(){
        // This functiopn is called recursively to create grid and make changes as grid get generated.
        let size = this.size;
        let row_size = this.row_size;
        let col_size = this.col_size;
        maze.width = row_size;
        maze.height = col_size;
        maze.style.background="black";
        current.visited=true;

        // This loops are used to display the new state of grid and draw the wall according to value of grid elements
        for(let r=0;r<this.rows;r++){
            for(let c=0;c<this.columns;c++){
                let grid = this.grid;
                grid[r][c].show(this.size,this.row_size,this.col_size,this.rows,this.columns);
            }
        }


        let grid = this.grid;
        // This will call check neighbour function and will put a new grid state in next
        let next = current.check_nb();

        // If the next is not null means current state is having unvisited neighbour then it will visit that state and highlight it
        if(next){
            next.visited=true;
            // Push the next grid state to stack for backtracking.
            this.stack.push(current);
            current.highlight();
            if(document.getElementById("switch").checked===true){    
                // Delay is animation is on.
                wait(300);
            }
            // As we have moved from current to next postion of grid we will need to remove wall between this two postions.
            current.removeWall(current,next);
            // As we are in next postion so make current state as next.
            current = next;
        }
        // If the neighbour of current in not present then we will do backtracking by making current state as Top of Stack.
        else if(this.stack.length>0){
            let cell = this.stack.pop();
            current= cell;
            current.highlight();
            
            if(document.getElementById("switch").checked===true){
                // Delay is animation is on.
                wait(300);
            }
        }
        // If stack is empty and no neighbour is present means maze is generated.
        if(this.stack.length===0){
            generationComplete=true;
        }

        if(generationComplete===true){
            // If Maze generated then highlight the current means first postion of grid  
            current.highlight();

            //  Select a ranodom postion of grid and make it as our goal state.
            let a = Math.floor(Math.random()*(this.rows-1));
            let b =Math.floor(Math.random()*(this.columns-1));
            this.grid[a][b].goal=true;

            // This is used again so that out goal state gets visible.
            grid[a][b].show(this.size,this.row_size,this.col_size,this.rows,this.columns);   
            return;
        }
        window.requestAnimationFrame(()=>{this.draw()});  //This is used for calling draw function repeative according to the browser power.
    }
}

class Cell{
    // This constructor is used to declare all variable for each cell of grid.
    constructor(rowNum,colNum,parentGrid,row_size,col_size,rows,columns){
        this.rowNum = rowNum;
        this.colNum=colNum;
        this.parentGrid=parentGrid;
        this.row_size=row_size;
        this.col_size=col_size;
        this.rows=rows;
        this.columns=columns;
        this.visited = false;
        this.walls = {
            topWall: true,
            rightWall:true,
            leftWall:true,
            bottomWall:true,
        }
        this.goal = false;
    }
    
    check_nb(){
        // This function is used to check all the neighbour of current state and return a random neighbour.
        let grid = this.parentGrid;
        let rowNum = this.rowNum;
        let colNum = this.colNum;
        let neighbours=[];
        let top = rowNum != 0 ? grid[rowNum-1][colNum] : undefined;
        let right = colNum != this.columns-1 ? grid[rowNum][colNum+1] : undefined;
        let bottom = rowNum != this.rows-1 ? grid[rowNum+1][colNum] : undefined;
        let left = colNum != 0 ? grid[rowNum][colNum-1] : undefined;
        

        if(top && !top.visited){neighbours.push(top);}
        if(right && !right.visited){neighbours.push(right);}
        if(bottom && !bottom.visited){neighbours.push(bottom);}
        if(left && !left.visited){neighbours.push(left);}

        if(neighbours.length!=0){
            let random =  Math.floor(Math.random()*neighbours.length);
            return neighbours[random];
        }
        else{
            return undefined;
        }
    }
    

    // Function to Draw Top, Right, Left, Bottom Wall of give row and column
    drawTopWall(x,y,row_size,col_size,columns,rows,size){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+size,y);
        ctx.stroke();
    }
    
    drawRightWall(x,y,row_size,col_size,columns,rows,size){
        ctx.beginPath();
        ctx.moveTo(x+size,y);
        ctx.lineTo(x+size,y+size);
        ctx.stroke();
    }
    
    drawLeftWall(x,y,row_size,col_size,columns,rows,size){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x,y+size);
        ctx.stroke();
    }
    
    drawBottomWall(x,y,row_size,col_size,columns,rows,size){
        ctx.beginPath();
        ctx.moveTo(x,y+size);
        ctx.lineTo(x+size,y+size);
        ctx.stroke();
    }

    // Function to highlight current position as purple
    highlight(){
        let size = s;
        let rowNum= this.rowNum;
        let colNum= this.colNum;
        let x = (rowNum * size) +1;
        let y = (colNum * size) +1;
        ctx.fillStyle = 'purple';
        ctx.fillRect(x,y,size-2,size-2);
    }

    // Function to Remove wall 
    removeWall(c1,c2){
        let x = c1.rowNum-c2.rowNum;
        if(x===1){
            c1.walls.leftWall=false;
            c2.walls.rightWall=false;
        }
        else if(x===-1){
            c1.walls.rightWall=false;
            c2.walls.leftWall=false;
        }
        let y = c1.colNum-c2.colNum;
        if(y===1){
            c1.walls.topWall=false;
            c2.walls.bottomWall=false;
        }
        else if(y===-1){
            c1.walls.bottomWall=false;
            c2.walls.topWall=false;
        }
    }
    
    //Function to Display grid according to values of grid.
    show(size,row_size,col_size,rows,columns){
        let x = this.rowNum * size;
        let y = this.colNum * size;
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        
        if(this.walls.topWall){this.drawTopWall(x,y,row_size,col_size,columns,rows,size)}
        if(this.walls.rightWall){this.drawRightWall(x,y,row_size,col_size,columns,rows,size)}
        if(this.walls.bottomWall){this.drawBottomWall(x,y,row_size,col_size,columns,rows,size)}
        if(this.walls.leftWall){this.drawLeftWall(x,y,row_size,col_size,columns,rows,size)}
        
        if(this.visited){
            ctx.fillRect(x+1,y+1,size-2,size-2);
        }

        // If current postion is goal postion then it is coloured as green
        if(this.goal){
            ctx.fillStyle = "rgb(83, 247, 43)";
            ctx.fillRect(x + 1, y + 1, size- 2, size - 2);
            btn_disable.disabled=false
            solve_disable.disabled=false
        }
        
    }
}


//This is the main function called when user gives input and press start button.
function init(){
    btn_disable.disabled=true;
    solve_disable.disabled=true;
    let newMaze = new Maze(s,b,a);
    newMaze.setup();
    newMaze.draw();
}
