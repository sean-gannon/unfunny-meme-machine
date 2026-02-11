package com.fyp.memeMachine.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fyp.memeMachine.model.Meme;
import com.fyp.memeMachine.repository.MemeRepository;

@RestController
@RequestMapping("/api/memes")
@CrossOrigin(origins = "http://localhost:3000")
public class MemeController {

    private final MemeRepository memeRepository;

    public MemeController(MemeRepository memeRepository) {
        this.memeRepository = memeRepository;
    }

    @GetMapping
    public List<Meme> listAll() {
        return memeRepository.findAll();
    }

    @GetMapping("/by-url")
    public ResponseEntity<Meme> getByUrl(@RequestParam("url") String url) {
        Optional<Meme> maybe = memeRepository.findByUrl(url);
        return maybe.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Meme> create(@RequestBody Meme meme) {
        Meme saved = memeRepository.save(meme);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
