/* element för manipulation */
var button = document.getElementById("clickerbutton");
var lionButton = document.getElementById("lejon");
var scoreDiv = document.getElementById("score");
var powerText = document.getElementById("powerText");
var zebraButton = document.getElementById("zebra");
var lionSuper = document.getElementById("lionSuper");

/* Skapa ett nytt element för poängen */
var scoreText = document.createElement("p");

/* spelvariabler */
var clickValue = 1;
var bank = 0;
var lejonCost = 15;
var lejonClicks = 0;
var zebraCost = 30;
var zebra = null;
var zebraTimer = 0;
var lionPurchased = 0;
var superLionPurchased = 0;

/* startvärden */
scoreText.textContent = "Points: 0";
lionButton.textContent = "Gun " + lejonCost;
zebraButton.textContent = "Rifle " + zebraCost;

/* click event + logic */
button.addEventListener("click", function() {
	// kontrollera om vi har ett lejon aktivt, annars återställ clickValue
	if (lejonClicks > 0) {
		lejonClicks--;
	} else if (lejonClicks == 0) {
		clickValue = 1;		
	}
	bank += clickValue; // lägg till värdet vid click
	scoreText.textContent = "Points: " + Math.floor(bank); // sätt textvärdet i p elementet till bank.
}, true);

/* kod för zebrapowerup med räknare */
zebraButton.addEventListener("click", function() {
	if (bank >= zebraCost && zebraTimer == 0) {
		bank -= zebraCost;
		zebraTimer += 10;
		powerText.textContent += "Bought Gun\n";

		// Lägg till setInterval med en funktion som laddas varje sekund
		zebra = setInterval(function() {
			bank += 10;
			scoreText.textContent = "Points: " + Math.floor(bank);
			zebraTimer--;

			if (zebraTimer == 0) {
				powerText.textContent += "No Rifle\n";
				clearInterval(zebra);  // kalla på clearInterval för att rensa setInterval
			}
		}, 1000);
	} else if (zebraTimer > 0) {
		powerText.textContent += "Already Rifle\n";
	} else {
		powerText.textContent += "No money no Rifle\n";
	}
}, true);

// knapp och kod för lejon powerup
lionButton.addEventListener("click", function() {
	if (bank >= lejonCost) {
		clickValue *= 2;
		bank -= lejonCost;
		lejonCost *= 1.4;
		lejonClicks += 10;

		// FIXA för superlejon!
		lionPurchased++; // ny rad för att lägga till köpta lejon
		if (lionPurchased > 9 && superLionPurchased != 1) { // kontrollera om vi köpt 10 lejon
			lionSuper.style.display = "inline";	// visa knappen
		}

		lionButton.textContent = "Gun " + Math.floor(lejonCost);
		powerText.textContent += "Bought gun\n";
		scoreText.textContent = "Points: " + Math.floor(bank); // sätt textvärdet i p elementet till bank.
	} else {
		powerText.textContent += "No money no Gun\n";
	}
}, true);


lionSuper.addEventListener("click", function() {
	lionSuper.style.display = "none";	// göm knappen
	bank = bank * 10;
	superLionPurchased = 1;
	powerText.textContent += "Bought super Gun!\n";
	scoreText.textContent = "Points: " + Math.floor(bank);
}, true);

scoreDiv.appendChild(scoreText); // fäst p elementet i score diven.