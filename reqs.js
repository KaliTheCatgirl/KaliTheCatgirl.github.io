let req = new XMLHttpRequest();
let resp = "No request yet!";

const url='cerulity32k.github.io';
req.open("GET", url);
req.send();

req.onreadystatechange = (e) => {
    resp = req.responseText;
}

function up() {
    document.getElementById("upBtn").innerHTML = resp;
}