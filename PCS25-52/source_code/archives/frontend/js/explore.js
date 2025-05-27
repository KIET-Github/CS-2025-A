function hideModel(id){
    console.log("pressed")
    getDivId='hide_div'+ id.toString();
    console.log(getDivId)
    if(document.getElementById(getDivId).style.display=="none"){
        document.getElementById(getDivId).style.display="flex";
        document.getElementById(id).className="fa-solid fa-caret-down";
    }
    else{
        document.getElementById(getDivId).style.display="none";
        document.getElementById(id).className="fa-solid fa-caret-up";
    }
}