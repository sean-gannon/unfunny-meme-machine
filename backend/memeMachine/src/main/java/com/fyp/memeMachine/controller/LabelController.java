package com.fyp.memeMachine.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fyp.memeMachine.dto.LabelDto;
import com.fyp.memeMachine.model.Label;
import com.fyp.memeMachine.model.Meme;
import com.fyp.memeMachine.repository.LabelRepository;
import com.fyp.memeMachine.repository.MemeRepository;

@RestController
@RequestMapping("/api/labels")
@CrossOrigin(origins = "http://localhost:3000")
public class LabelController {

    private final LabelRepository labelRepository;
    private final MemeRepository memeRepository;

    public LabelController(LabelRepository labelRepository, MemeRepository memeRepository) {
        this.labelRepository = labelRepository;
        this.memeRepository = memeRepository;
    }

    @PostMapping
    public ResponseEntity<?> createLabel(@RequestBody LabelDto dto) {
        Meme meme = null;
        if (dto.getMemeId() != null) {
            meme = memeRepository.findById(dto.getMemeId()).orElse(null);
        } else if (dto.getMemeUrl() != null && !dto.getMemeUrl().isEmpty()) {
            // try to find meme by url or filename
            meme = memeRepository.findByUrl(dto.getMemeUrl()).orElse(null);
            if (meme == null) {
                // attempt matching by filename: strip path if present
                String maybeFilename = dto.getMemeUrl();
                int idx = maybeFilename.lastIndexOf('/');
                if (idx >= 0) maybeFilename = maybeFilename.substring(idx + 1);
                meme = memeRepository.findByUrl(maybeFilename).orElse(null);
            }
        }

        if (meme == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Meme not found");
        }

        Label label = new Label();
        label.setMeme(meme);
        label.setUserId(dto.getUserId());
        label.setEmotion(dto.getEmotion());
        label.setSentiment(dto.getSentiment());

        Label saved = labelRepository.save(label);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
