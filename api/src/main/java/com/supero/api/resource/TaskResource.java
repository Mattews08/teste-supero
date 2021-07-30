package com.supero.api.resource;


import java.util.List;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.supero.api.repository.TaskRepository;
import com.supero.api.models.Task;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
@RestController
@Api(value = "API REST TaskList")
@RequestMapping(value = "/api")
public class TaskResource {

    @Autowired
    TaskRepository taskRepository;

    @ApiOperation(value = "Return all tasks in the list")
    @GetMapping("tasks")
    public List<Task> taskList() {
        return taskRepository.findAll();
    }

    @ApiOperation(value = "Return a single task")
    @GetMapping("tasks/{id}")
    public Task singleTask(@PathVariable(value = "id") long id) {
        return taskRepository.findById(id);
    }

    @ApiOperation(value = "Save a task")
    @PostMapping("task")
    public Task saveTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @ApiOperation(value = "Delete task")
    @DeleteMapping("task/{id}")
    public void daleteTask(@PathVariable(value = "id") long id) {
        taskRepository.deleteById(id);
    }

    @ApiOperation(value = "Edit task")
    @PutMapping("task/{id}")
    public Task editTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @ApiOperation(value = "Status task")
    @PutMapping("taskstatus/{id}")
    public void statusTask(@PathVariable(value = "id") long id) {
        Task task = taskRepository.findById(id);
        task.setStatus("FINALIZADO");
        taskRepository.save(task);
    }

}