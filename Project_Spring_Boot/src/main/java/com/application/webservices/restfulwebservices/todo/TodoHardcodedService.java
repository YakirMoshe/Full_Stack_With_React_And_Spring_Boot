package com.application.webservices.restfulwebservices.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardcodedService {

    private static final List<Todo> todos = new ArrayList<>();
    private static long idCounter = 0;

    static {
        todos.add(new Todo(++idCounter, "React", "Learn about React", new Date(), false));
        todos.add(new Todo(++idCounter, "HTML", "Learn about HTML", new Date(), true));
        todos.add(new Todo(++idCounter, "JavaScript", "Learn about JS", new Date(), false));
    }

    public List<Todo> findAll() {
        return todos;
    }

    public Todo save(Todo todo) {
        if(todo.getId()==-1 || todo.getId()==0) {
            todo.setId(++idCounter);
            todos.add(todo);
        } else {
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }

    public Todo deleteById(long id) {
        Todo todo = findById(id);
        if (todo == null) return null;
        if (todos.remove(todo)) {
            return todo;
         }
        return null;
    }

    public Todo findById(long id) {
        for (Todo todo:todos) {
            if (todo.getId() == id) {
                return todo;
            }
        }
        return null;
    }

}
