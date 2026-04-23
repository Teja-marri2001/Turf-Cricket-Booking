package com.turfcricket.booking.service;

import com.turfcricket.booking.dto.BookingRequest;
import com.turfcricket.booking.dto.BookingResponse;
import com.turfcricket.booking.entity.Booking;
import com.turfcricket.booking.entity.PaymentStatus;
import com.turfcricket.booking.entity.Slot;
import com.turfcricket.booking.exception.ConflictException;
import com.turfcricket.booking.exception.NotFoundException;
import com.turfcricket.booking.repository.BookingRepository;
import com.turfcricket.booking.repository.SlotRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;

    public BookingService(BookingRepository bookingRepository, SlotRepository slotRepository) {
        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
    }

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        Slot slot = slotRepository.findWithLockById(request.getSlotId())
                .orElseThrow(() -> new NotFoundException("Slot not found: " + request.getSlotId()));

        if (slot.isBooked()) {
            throw new ConflictException("Slot is already booked");
        }

        slot.setBooked(true);
        slotRepository.save(slot);

        Booking booking = new Booking();
        booking.setName(request.getName().trim());
        booking.setPhone(request.getPhone().trim());
        booking.setSlot(slot);
        booking.setPaymentStatus(request.getPaymentStatus() == null ? PaymentStatus.SUCCESS : request.getPaymentStatus());

        Booking saved = bookingRepository.save(booking);

        return new BookingResponse(
                saved.getId(),
                saved.getName(),
                saved.getPhone(),
                saved.getSlot().getId(),
                saved.getPaymentStatus()
        );
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(booking -> new BookingResponse(
                        booking.getId(),
                        booking.getName(),
                        booking.getPhone(),
                        booking.getSlot().getId(),
                        booking.getPaymentStatus()
                ))
                .toList();
    }
}
