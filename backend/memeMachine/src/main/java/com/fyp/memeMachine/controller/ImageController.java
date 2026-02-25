package com.fyp.memeMachine.controller;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private static final String MEME_DIR = "./memeImages";

    @GetMapping
    public List<String> listImages() {
        File dir = new File(MEME_DIR);
        if (!dir.exists() || !dir.isDirectory()) return List.of();

        File[] files = dir.listFiles((d, name) -> {
            String nl = name.toLowerCase();
            return nl.endsWith(".jpg") || nl.endsWith(".jpeg") || nl.endsWith(".png") || nl.endsWith(".gif");
        });

        if (files == null || files.length == 0) return List.of();

        return Arrays.stream(files)
                .map(File::getName)
                .collect(Collectors.toList());
    }
}
