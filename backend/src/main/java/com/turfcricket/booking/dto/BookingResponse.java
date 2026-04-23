package com.turfcricket.booking.dto;

import com.turfcricket.booking.entity.PaymentStatus;

public class BookingResponse {

    private Long id;
    private String name;
    private String phone;
    private Long slotId;
    private PaymentStatus paymentStatus;

    public BookingResponse(Long id, String name, String phone, Long slotId, PaymentStatus paymentStatus) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.slotId = slotId;
        this.paymentStatus = paymentStatus;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public Long getSlotId() {
        return slotId;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }
}
