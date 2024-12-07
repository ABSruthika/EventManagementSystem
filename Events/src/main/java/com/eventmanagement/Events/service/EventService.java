package com.eventmanagement.Events.service;

import com.eventmanagement.Events.model.Event;
import com.eventmanagement.Events.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        Event event = getEventById(id);
        event.setTitle(updatedEvent.getTitle());
        event.setDescription(updatedEvent.getDescription());
        event.setLocation(updatedEvent.getLocation());
        event.setDate(updatedEvent.getDate());
        event.setTime(updatedEvent.getTime());
        event.setCategory(updatedEvent.getCategory());
        event.setTicketPrice(updatedEvent.getTicketPrice());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}

