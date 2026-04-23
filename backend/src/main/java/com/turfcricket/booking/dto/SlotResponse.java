package com.turfcricket.booking.dto;

import java.time.LocalDate;

public class SlotResponse {

    private Long id;
    private LocalDate date;
    private String time;
    private boolean booked;

    // ✅ REQUIRED CONSTRUCTOR
    public SlotResponse(Long id, LocalDate date, String time, boolean booked) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.booked = booked;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public boolean isBooked() {
        return booked;
    }
}