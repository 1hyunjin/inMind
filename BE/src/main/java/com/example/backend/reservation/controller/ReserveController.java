package com.example.backend.reservation.controller;


import com.example.backend.exception.RestApiException;
import com.example.backend.reservation.dto.ReserveDeleteDto;
import com.example.backend.reservation.dto.ReserveRequestDto;
import com.example.backend.reservation.dto.ReserveResponseDto;
import com.example.backend.reservation.dto.ReserveUpdateDto;
import com.example.backend.reservation.service.ReserveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserve")
@RequiredArgsConstructor
public class ReserveController {

    private final ReserveService reserveService;

    @PostMapping()
    public ResponseEntity<Void> reserve(@RequestBody ReserveRequestDto request) throws RestApiException {
        reserveService.reserve(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<ReserveResponseDto>> getReserve(@RequestParam("userId") long userId) {
        List<ReserveResponseDto> responseDtoList = reserveService.getReservation(userId);
        return ResponseEntity.ok(responseDtoList);
    }

    @PutMapping
    public ResponseEntity<Void> updateReserve(@RequestBody ReserveUpdateDto request) throws RestApiException {
        reserveService.updateReserve(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteReservation(@RequestBody ReserveDeleteDto request) throws RestApiException{
        reserveService.deleteReserve(request.getReserveInfoIdx());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
