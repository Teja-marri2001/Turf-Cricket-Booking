package com.turfcricket.booking.repository;

import com.turfcricket.booking.entity.Slot;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    List<Slot> findByDateAndIsBookedFalseOrderByTimeAsc(LocalDate date);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Slot> findWithLockById(Long id);
}
