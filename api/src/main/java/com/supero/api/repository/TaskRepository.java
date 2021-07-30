package com.supero.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supero.api.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Task findById(long id);
}
