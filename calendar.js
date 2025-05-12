// Sample calendar widget to display upcoming events
document.addEventListener("DOMContentLoaded", function () {
    const calendarDiv = document.getElementById("calendar");

    let events = []; // This will store the loaded data

    // Load JSON file
    fetch('events.json')
        .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
        })
        .then(data => {
        events = data;
        events.forEach(event => {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            eventDiv.innerHTML = `
                <strong>${event.date}</strong>: ${event.title}
            `;
            calendarDiv.appendChild(eventDiv);
        });
        // You can now use the events array, e.g., render them on the page
        })
        .catch(error => {
        console.error("Could not load events:", error);
        });

    // Display events in the calendar

});