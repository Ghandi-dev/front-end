package id.co.mii.clientapp.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import id.co.mii.clientapp.services.EmployeeService;
import id.co.mii.clientapp.services.JobService;
import id.co.mii.clientapp.services.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.ui.Model;

@Controller
@AllArgsConstructor
@RequestMapping("/hr")
public class HrController {
    private EmployeeService employeeService;
    private JobService jobService;
    private ProjectService projectService;

    @GetMapping
    public String index(Model model, Authentication authentication) {
        String username = authentication.getName();
        model.addAttribute("username", username);
        model.addAttribute("isActive", "dashboard");
        return "hr/index";
    }
}
