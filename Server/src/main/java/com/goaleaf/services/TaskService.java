package com.goaleaf.services;

import com.goaleaf.entities.DTO.TaskDTO;
import com.goaleaf.entities.Task;
import com.goaleaf.entities.viewModels.TaskViewModel;
import org.springframework.stereotype.Service;

@Service
public interface TaskService {

    Iterable<TaskViewModel> getAllTasks();

    Iterable<TaskViewModel> getAllByCreatorID(Integer creatorID);

    Iterable<TaskViewModel> getAllByHabitID(Integer habitID);

    Iterable<TaskViewModel> getAllByCreatorIDAndHabitID(Integer creatorID, Integer habitID);

    Integer countUserTasks(Integer userID);

    Integer countHabitTasks(Integer habitID);

    TaskViewModel saveTask(TaskDTO newTask);

    TaskViewModel getTaskByID(Integer taskID);

}