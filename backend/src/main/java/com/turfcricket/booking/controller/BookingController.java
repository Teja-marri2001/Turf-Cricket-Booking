package com.turfcricket.booking.controller;

import com.turfcricket.booking.dto.BookingRequest;
import com.turfcricket.booking.dto.BookingResponse;
import com.turfcricket.booking.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping   // ✅ FIXED (REMOVE /book)
    public BookingResponse createBooking(@Valid @RequestBody BookingRequest request) {
        System.out.println("🔥 HIT BOOKING API"); // DEBUG
        return bookingService.createBooking(request);
    }

    @GetMapping    // ✅ FIXED (REMOVE /bookings)
    public List<BookingResponse> getAllBookings() {
        return bookingService.getAllBookings();
    }
}