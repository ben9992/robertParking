function calculateParking() {
	const input = document.getElementById("probabilities").value;
	const probabilities = input.split(",").map(Number);
	const M = parseFloat(document.getElementById("M").value) || 100; // Added M input
	let T = probabilities.length;

	let E_occupied = new Array(T + 1).fill(0);
	let E_empty = new Array(T + 1).fill(0);

	// Initialize for the last space T
	E_occupied[T] = M; // If the last space is occupied, the cost is M
	E_empty[T] = T; // If the last space is empty, the cost is T

	// Working backward from space T-1 to 1
	for (let i = T - 1; i >= 1; i--) {
		E_occupied[i] =
			1 +
			probabilities[i - 1] * E_empty[i + 1] +
			Number((1 - probabilities[i - 1]).toFixed(1)) * E_occupied[i + 1];
		E_empty[i] = Math.min(i, E_occupied[i]);
	}

	const parkingLotDiv = document.getElementById("parking-lot");
	parkingLotDiv.innerHTML = "";

	for (let index = 1; index <= T; index++) {
		const occupied = E_occupied[index].toFixed(2);
		const empty = E_empty[index].toFixed(2);
		const spaceDiv = document.createElement("div");
		spaceDiv.className = "space";

		const spaceNumberDiv = document.createElement("div");
		spaceNumberDiv.className = "space-number";
		spaceNumberDiv.textContent = `Space: ${index}`;

		const expectedCostDiv = document.createElement("div");
		expectedCostDiv.className = "expected-cost";
		expectedCostDiv.textContent = `Expected Cost if Empty: ${empty}, Expected Cost if Occupied: ${occupied}`;

		spaceDiv.appendChild(spaceNumberDiv);
		spaceDiv.appendChild(expectedCostDiv);
		parkingLotDiv.appendChild(spaceDiv);
	}
}
