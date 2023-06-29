package id.co.mii.clientapp.controllers;

import java.security.Principal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import id.co.mii.clientapp.services.UserService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/employee")
@PreAuthorize("hasRole('EMPLOYEE')")
public class EmployeeController {
    private UserService userService;

    @GetMapping
    public String index(Model model, Principal principal) {
        model.addAttribute("username", principal.getName());
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "dashboard");
        return "employee/index";
    }

    @GetMapping("/project")
    public String project(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "project");
        return "employee/project";
    }

    @GetMapping("/overtime")
    public String overtime(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "overtime");
        return "employee/overtime";
    }

    @GetMapping("/history")
    public String history(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "history");
        return "employee/history";
    }
}