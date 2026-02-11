package com.fyp.memeMachine.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.memeMachine.model.Meme;

public interface MemeRepository extends JpaRepository<Meme, Long> {

	Optional<Meme> findByUrl(String url);

}
