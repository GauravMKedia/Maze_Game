// This file contain code for Depth First Search Algorithm. 

class dfs_Algo{    
    dfs_solve(){
        current = stack.pop();
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
        window.requestAnimationFrame(()=>{this.dfs_solve()});
    }

}
