const Up = 1;
const Down = 2;
const Forward = 3;
const Left = 4;
const Right = 5;
const Mine = 6;
const MineUp = 7;
const MineDown = 8;
const Place = 9;
const PlaceUp = 10;
const PlaceDown = 11;
const Select = 12;
let url = "";

async function get(url = '', data = {}) {
	const response = await fetch(url, {
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data)
	});
	return response.json();
  }

function up() {  
	get(url, { code: Up })
		.then(data => {
			console.log(data);
		});
}

function updateurl() {
	url = document.getElementById("urlBox").innerHTML;
}
