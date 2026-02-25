package com.fyp.memeMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.memeMachine.model.Meme;

public interface MemeRepository extends JpaRepository<Meme, Long> {

}
