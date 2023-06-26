package id.co.mii.clientapp.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.clientapp.models.Employee;
import id.co.mii.clientapp.models.Project;
import id.co.mii.clientapp.services.EmployeeService;
import id.co.mii.clientapp.services.ProjectService;
import id.co.mii.clientapp.services.UserService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/employee")
// @PreAuthorize("hasRole('ADMIN')")
public class EmployeeController {
    private EmployeeService employeeService;
    private ProjectService projectService;

    @GetMapping
    public String index(Model model, Authentication authentication) {
        String username = authentication.getName();
        model.addAttribute("username", username);
        model.addAttribute("isActive", "dashboard");
        return "employee/index";
    }

    @GetMapping("/project")
    public String project(Model model, Authentication authentication) {
        model.addAttribute("projects", projectService.getAll());
        return "employee/project";
    }
}