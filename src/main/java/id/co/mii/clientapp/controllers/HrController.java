package id.co.mii.clientapp.controllers;

import java.io.IOException;
import java.security.Principal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import id.co.mii.clientapp.models.dto.request.UserRequest;
import id.co.mii.clientapp.services.StorageService;
import id.co.mii.clientapp.services.UserService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/hr")
@PreAuthorize("hasRole('HR')")
public class HrController {
    private UserService userService;
    private StorageService storageService;

    @GetMapping
    public String index(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "dashboard");
        return "hr/index";
    }

    @GetMapping("/employee")
    public String employee(Model model, Principal principal) {
        UserRequest userRequest = new UserRequest();
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("userRequest", userRequest);
        model.addAttribute("isActive", "employee");
        return "hr/employee";
    }

    @GetMapping("/job")
    public String job(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "job");
        return "hr/job";
    }

    @GetMapping("/overtime")
    public String overtime(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "overtime");
        return "hr/overtime";
    }

    @PostMapping("/register")
    public String registrasi(UserRequest userRequest, MultipartFile file)
            throws IOException {
        String image = storageService.uploadImageToFileSystem(file);
        userRequest.setPhoto(image.replaceAll("\\s", ""));
        userService.create(userRequest);
        return "redirect:/hr/employee";
    }

    @PutMapping("/update")
    public String update(UserRequest userRequest) {
        return "redirect:/hr/employee";
    }

    @GetMapping("/project")
    public String project(Model model, Principal principal) {
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "project");
        return "hr/project";
    }

}
