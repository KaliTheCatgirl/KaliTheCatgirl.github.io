document.getElementById("scriptWorks").innerHTML = "Script loaded and working!";
let url = "";

function up() {
    let req = new XMLHttpRequest();
    req.open("POST", url + "?code=up");
    req.send();
}

function updateurl() {
    url = document.getElementById("urlBox").innerHTML;
}
