enum Instructions
{
	Nop,
	Up,
	Down,
	Forward,
	Left,
	Right,
	Mine,
	MineUp,
	MineDown,
	Place,
	PlaceUp,
	PlaceDown,
	Select
}
document.getElementById("scriptWorks").innerHTML = "Script loaded and working!";
let url = "";

async function get(url: string = '', data: {} = {}) {
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
	get(url, { code: Instructions.Up })
		.then(data => {
			console.log(data);
		});
}

function updateurl() {
	url = document.getElementById("urlBox").innerHTML;
}
