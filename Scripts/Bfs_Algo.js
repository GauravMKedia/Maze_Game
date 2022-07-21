// This file contain code for Breadth First Search Algorithm. 

class bfs_Algo{
    bfs_solve(){
        current = stack.shift();
        current.visited = false;
        check_way(current.rowNum,current.colNum);
        if(current.goal){
            btn_disable.disabled=false;
            return;
        }
        highlight_Algo(current.rowNum,current.colNum);
        if(document.getElementById("switch").checked===true){
            wait(300);
        }
        window.requestAnimationFrame(()=>{this.bfs_solve()});
    }
}
