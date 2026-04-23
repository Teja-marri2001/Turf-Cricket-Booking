package com.turfcricket.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.turfcricket")
public class TurfBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(TurfBookingApplication.class, args);
    }
}
