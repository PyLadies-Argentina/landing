// Sample calendar widget to display upcoming events
document.addEventListener("DOMContentLoaded", function () {
    const calendarDiv = document.getElementById("calendar");

    let events = []; // This will store the loaded data

// Fetch events from JSON
    fetch('/data/events.json')
    .then(response => {
        if (!response.ok) throw new Error('Error al cargar los eventos');
        return response.json();
    })
    .then(events => {
        const container = document.getElementById('event-container');
        const title = document.getElementById('upcoming-title');

        // Get today's date (without time)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter future events
        const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
        });

        // Sort by date (closest first)
        upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Check if there are any upcoming events
        if (upcomingEvents.length === 0) {
            title.style.display = 'none';
            container.innerHTML = `
                <p style="text-align:center; font-size:1.2em; color:#555; width:100%;">
                No hay eventos próximos programados. ¡Vuelve pronto!
                </p>
            `;
            return;
        }

        // Show title
        title.style.display = 'block';
        
        // Generate cards for upcoming events
        upcomingEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';

        card.innerHTML = `
            <img src="${event.img}" alt="${event.title}" class="event-img">
            <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-date">Fecha: ${event.date}</p>
            <a href="${event.url}" class="event-link" target="_blank">Más información</a>
            </div>
        `;

        container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Hubo un problema:', error);
        document.getElementById('event-container').innerHTML = `
        <p style="text-align:center; color:red;">
            No se pudieron cargar los eventos. Inténtalo más tarde.
        </p>`;
    });
    // Display events in the calendar

});