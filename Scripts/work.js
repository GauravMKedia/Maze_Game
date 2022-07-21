// Main JS file for initialization

// For adding media Query
var x = window.matchMedia("(max-width: 767px),(max-height:584px)")
myFunction(x);

function myFunction(x) {
    // If the screen size is lower than above data then user is shown a confirm message.
    if (x.matches) 
    {
        let cnf = confirm("Plase use Laptop or Tablet to have better user experience.\nDo you want to continue with this device ?")
        if(!cnf){
            document.getElementById("contain").style.display='none';
            document.getElementById("container").style.display='none';
            document.body.style.backgroundColor="white";
        }
    }
}


let s = 40; //Box size Predefined
let a; //Rows
let b; //Columns

// Finding height and width available for board after navigation section
let body_height = document.getElementById('board').offsetHeight-20;
let body_width = document.getElementById('board').offsetWidth-20;
// Calculating max possible number of rows and columns in given screen
a_max=parseInt((body_height/s)-1);
b_max=parseInt((body_width/s)-1);
// Passing the max value to input section for display
document.getElementById("max_rows").innerHTML=parseInt(a_max);
document.getElementById("max_columns").innerHTML=parseInt(b_max);

// When Start button is clicked function checking is called
document.getElementById("start").addEventListener("click",checking);

function checking(){
    //This function will check the input value     
    a = document.getElementById("row").value;
    b = document.getElementById("column").value;
    
    if(a<=a_max&&b<=b_max&&a>1&&b>1){
        // If given input is valid then display board page and call init function of Maze_Generator.js
        document.getElementById("contain").style.zIndex = "-1";
        init();
    }
    else{
        alert("Please provide proper Input");
    }
}

//When generate button is clicked the page is reloded
document.getElementById("generate").addEventListener("click",reload);
function reload(){
    window.location.reload();
}

//When Solve button is clicked start function of Algo.js is called
document.getElementById("solve").addEventListener("click",start);


// General function to create delay as async is not used in this website
function wait(t){
    let date = new Date();
    let newDt = new Date();
    while(newDt-date<t){
        newDt = new Date();
    }
}

