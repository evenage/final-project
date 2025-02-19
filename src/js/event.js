// Event creation logic
document.getElementById("createEventBtn").addEventListener("click", function() {
    const eventName = prompt("Enter Event Name:");
    const eventDate = prompt("Enter Event Date:");
    const eventLocation = prompt("Enter Event Location:");
    
    const event = { eventName, eventDate, eventLocation };
    localStorage.setItem('event', JSON.stringify(event));
    alert("Event Created Successfully!");
    displayEvent();
  });
  
  // Display event data
  function displayEvent() {
    const event = JSON.parse(localStorage.getItem('event'));
    if (event) {
      const eventList = document.getElementById("eventList");
      eventList.innerHTML = `
        <h2>Upcoming Event</h2>
        <p>Name: ${event.eventName}</p>
        <p>Date: ${event.eventDate}</p>
        <p>Location: ${event.eventLocation}</p>
      `;
    }
  }
  
  // Display event when page loads
  document.addEventListener("DOMContentLoaded", function() {
    displayEvent();
  });
  