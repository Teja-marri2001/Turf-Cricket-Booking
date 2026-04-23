package com.turfcricket.booking.service;

import com.turfcricket.booking.dto.SlotResponse;
import com.turfcricket.booking.entity.Slot;
import com.turfcricket.booking.exception.NotFoundException;
import com.turfcricket.booking.repository.SlotRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SlotService {

    private final SlotRepository slotRepository;

    public SlotService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    public List<SlotResponse> getAvailableSlots(LocalDate date) {

        // Fetch only available slots
        List<Slot> slots = slotRepository.findByDateAndIsBookedFalseOrderByTimeAsc(date);

        // If no slots exist → create default slots
        if (slots.isEmpty()) {

            List<Slot> newSlots = new ArrayList<>();

            for (int hour = 6; hour < 24; hour += 2) {

                Slot slot = new Slot();
                slot.setDate(date);
                slot.setTime(LocalTime.of(hour, 0));
                slot.setBooked(false);

                newSlots.add(slot);
            }

            slotRepository.saveAll(newSlots);

            slots = slotRepository.findByDateAndIsBookedFalseOrderByTimeAsc(date);
        }

        // Convert entity → DTO
        List<SlotResponse> response = new ArrayList<>();

        for (Slot slot : slots) {
            LocalTime start = slot.getTime();
            LocalTime end = start.plusHours(2);

            String timeRange = start.toString() + " - " + end.toString();

            response.add(new SlotResponse(
                    slot.getId(),
                    slot.getDate(),
                    timeRange,
                    slot.isBooked()
            ));
        }

        return response;
    }

    @Transactional
    public SlotResponse blockSlot(Long slotId) {

        Slot slot = slotRepository.findWithLockById(slotId)
                .orElseThrow(() -> new NotFoundException("Slot not found: " + slotId));

        slot.setBooked(true);
        Slot saved = slotRepository.save(slot);

        LocalTime start = saved.getTime();
        LocalTime end = start.plusHours(2);

        String timeRange = start.toString() + " - " + end.toString();

        return new SlotResponse(
                saved.getId(),
                saved.getDate(),
                timeRange,
                saved.isBooked()
        );
    }
}