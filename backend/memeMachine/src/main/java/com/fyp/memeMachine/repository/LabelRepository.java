// ...existing code...
package com.fyp.memeMachine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.memeMachine.model.Label;

public interface LabelRepository extends JpaRepository<Label, Long> {
    List<Label> findByMeme_Id(Long memeId);
}
// ...existing code...

