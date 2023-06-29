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
@RequestMapping("/manager")
@PreAuthorize("hasRole('MANAGER')")
public class ManagerController {
    private UserService userService;

    @GetMapping
    public String index(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "dashboard");
        return "manager/index";
    }

    @GetMapping("/project")
    public String project(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "project");
        return "manager/project";
    }

    @GetMapping("/overtime")
    public String overtime(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "overtime");
        return "manager/overtime";
    }
}
