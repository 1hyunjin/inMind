package com.example.backend.user.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class OrgRequestDto {

    private String name;

    private String addr;

    private String tel;
}
