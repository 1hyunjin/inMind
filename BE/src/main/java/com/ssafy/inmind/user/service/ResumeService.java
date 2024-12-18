package com.ssafy.inmind.user.service;


import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.user.dto.ResumeRequestDto;
import com.ssafy.inmind.user.dto.ResumeResponseDto;
import com.ssafy.inmind.user.dto.ResumeUpdateRequestDto;
import com.ssafy.inmind.user.entity.Resume;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.ResumeRepository;
import com.ssafy.inmind.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeResponseDto getResume(Long userId) {
        Resume resume = resumeRepository.findByUserId(userId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        return ResumeResponseDto.fromEntity(resume);
    }

    @Transactional
    public void saveResume(ResumeRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserIdx())
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        Resume resume = Resume.builder()
                .user(user)
                .info(requestDto.getInfo())
                .build();

        resumeRepository.save(resume);
    }

    @Transactional
    public void updateResume(Long resumeId, ResumeUpdateRequestDto requestDto) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        Resume updateResume = Resume.builder()
                .id(resumeId)
                .user(resume.getUser())
                .info(requestDto.getInfo())
                .build();

        resumeRepository.save(updateResume);
    }

    @Transactional
    public void deleteResume(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        resumeRepository.delete(resume);
    }
}
