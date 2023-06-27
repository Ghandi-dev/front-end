package id.co.mii.clientapp.controllers.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.models.Employee;
import id.co.mii.clientapp.models.Project;
import id.co.mii.clientapp.services.EmployeeService;
import id.co.mii.clientapp.services.ProjectService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/project")
public class RestProjectController {

    private ProjectService projectService;

    @GetMapping
    public List<Project> getAll() {
        return projectService.getAll();
    }

    @GetMapping("/{id}")
    public Project getById(@PathVariable Integer id) {
        return projectService.getById(id);
    }

    @PostMapping
    public Project create(@RequestBody Project project ) {
        return projectService.create(project);
    }

    @DeleteMapping("/{id}")
    public Project delete(@PathVariable Integer id) {
        return projectService.delete(id);
    }

    @PutMapping("/{id}")
    public Project update(@PathVariable Integer id, @RequestBody Project project) {
        return projectService.update(id, project);
    }
}
