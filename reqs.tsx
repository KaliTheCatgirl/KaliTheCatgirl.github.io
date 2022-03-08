document.getElementById("upBtn").innerHTML = "Up Button";
let url = "";

function up() {
    let req = new XMLHttpRequest();
    req.open("POST", url + "?code=up");
    req.send();
}

function updateurl() {
    url = document.getElementById("urlBox").innerHTML;
}
