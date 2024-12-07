const apiUrl = 'http://localhost:8080/api/events';

// Fetch all events and populate the table on the Event List page
if (window.location.pathname === '/event-list.html') {
    fetchEvents();
}

// Create or update an event on the Create/Update Event page
if (window.location.pathname === '/create-event.html') {
    document.getElementById('eventForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const id = document.getElementById('eventId').value;
        const event = {
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            location: document.getElementById('location').value,
            ticketPrice: document.getElementById('ticketPrice').value,
            description: document.getElementById('description').value,
        };

        if (id) {
            // Update event
            fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event),
            }).then(() => {
                alert('Event updated successfully!');
                resetForm();
                window.location.href = 'event-list.html';
            });
        } else {
            // Create event
            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event),
            }).then(() => {
                alert('Event created successfully!');
                resetForm();
                window.location.href = 'event-list.html';
            });
        }
    });
}

// Fetch and display events in the Event List page
function fetchEvents() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(events => {
            const tableBody = document.getElementById('eventsTableBody');
            tableBody.innerHTML = '';
            events.forEach(event => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${event.title}</td>
                    <td>${event.category}</td>
                    <td>${event.date}</td>
                    <td>${event.time}</td>
                    <td>${event.location}</td>
                    <td>${event.ticketPrice}</td>
                    <td>${event.description}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editEvent(${event.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

// Edit an event and populate the form on the Create/Update Event page
function editEvent(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(event => {
            document.getElementById('eventId').value = event.id;
            document.getElementById('title').value = event.title;
            document.getElementById('category').value = event.category;
            document.getElementById('date').value = event.date;
            document.getElementById('time').value = event.time;
            document.getElementById('location').value = event.location;
            document.getElementById('ticketPrice').value = event.ticketPrice;
            document.getElementById('description').value = event.description;
        });
}

// Delete an event
function deleteEvent(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Event deleted successfully!');
            fetchEvents();
        });
}

// Reset the form after submission
function resetForm() {
    document.getElementById('eventId').value = '';
    document.getElementById('eventForm').reset();
}
