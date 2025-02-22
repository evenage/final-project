fetch("scripts/event.json")
  .then(function (response) {
    return response.json();
  })

  .then(function (jsonObject) {
    const events = jsonObject["events"];

    events.forEach(displayCard);
  });

let eventList = document.querySelector(".eventList");
eventList.style.display = "flex";

function displayCard(event) {
  // Create elements to add to the document

  let card = document.createElement("section");

  let eventName = document.createElement("p");

  let time = document.createElement("p");

  let date = document.createElement("p");

  let performers = document.createElement("p");

  let description = document.createElement("p");

  let portrait = document.createElement("img");

  let location = document.createElement("p");
  // Add the textContent property

  eventName.textContent = event.name;

  time.textContent = event.time;

  date.textContent = event.date;

  description.textContent = event.description;
  performers.textContent = event.performers;
  location.textContent = event.location;
  // Build the image attributes

  portrait.setAttribute("src", event.image);

  portrait.setAttribute("alt", "picture of " + event.name);
  portrait.style.width = "200px";
  portrait.style.height = "200px";

  //
  card.appendChild(portrait);
  card.appendChild(eventName);
  card.appendChild(date);
  card.appendChild(location);
  card.appendChild(time);
  card.appendChild(description);
  card.appendChild(performers);

  // Add/append the existing HTML div with the cards class with the section(card)

  eventList.appendChild(card);
}

// Function to plan an event
function planEvent(
  eventType,
  eventDate,
  eventTime,
  eventLocation,
  numberOfGuests,
  specialRequests
) {
  // Validate the input data
  if (
    eventType === "" ||
    eventDate === "" ||
    eventTime === "" ||
    eventLocation === "" ||
    numberOfGuests === ""
  ) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Calculate the total cost of the event
  let totalCost = eventData[eventType].price;
  if (eventType === "Others") {
    totalCost = 0;
  }

  // Display the event planning confirmation
  eventPlanningConfirmationDiv.innerHTML = `
    <h2>Event Planning Confirmation</h2>
    <p>Event Type: ${eventType}</p>
    <p>Event Date: ${eventDate}</p>
    <p>Event Time: ${eventTime}</p>
<p>Event Location: ${eventLocation}</p>
    <p>Number of Guests: ${numberOfGuests}</p>
    <p>Special Requests: ${specialRequests}</p>
    <p>Total Cost: $${totalCost}</p>
  `;
}

// Add an event listener to the plan event button
planEventButton.addEventListener("click", (e) => {
  e.preventDefault();
  const eventType = eventTypeSelect.value;
  const eventDate = eventDateInput.value;
  const eventTime = eventTimeInput.value;
  const eventLocation = eventLocationInput.value;
  const numberOfGuests = numberOfGuestsInput.value;
  const specialRequests = specialRequestsTextarea.value;
  planEvent(eventType);
});

// last modification
const date =  new Date().getFullYear();
let lastMod = new Date(document.lastModified);
var removeTZ = lastMod.toLocaleString();

const newParagraph = document.createElement("p");
newParagraph.innerText =`Last Modification: ${removeTZ}`;

document.querySelector('#timemod').appendChild(newParagraph);

// toggleMenu function. 
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.getElementById('hamburger');

    // Toggle the menu visibility
    menu.classList.toggle('active');

    //  'X' when the menu is active
    if (menu.classList.contains('active')) {
        //hamburger.innerHTML = '&times;';
        hamburger.innerHTML = 'X';
    } else {
        hamburger.innerHTML = '&#9776';
    }
}

