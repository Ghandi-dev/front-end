package id.co.mii.clientapp.controllers;

import java.io.IOException;
import java.security.Principal;

import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoProperties.Storage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import id.co.mii.clientapp.models.Employee;
import id.co.mii.clientapp.models.User;
import id.co.mii.clientapp.services.EmployeeService;
import id.co.mii.clientapp.services.StorageService;
import id.co.mii.clientapp.services.UserService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/profile")
public class ProfileController {
    private EmployeeService employeeService;
    private UserService userService;
    private StorageService storageService;

    @GetMapping
    public String index(Model model, Principal principal) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loginUser = userService.getUsernameOrEmail(authentication.getName(), null);
        Employee employee = new Employee();
        model.addAttribute("employee", employee);
        model.addAttribute("User", userService.getUsernameOrEmail(principal.getName(), null));
        model.addAttribute("isActive", "");
        if (loginUser.getRoles().get(0).getName().equalsIgnoreCase("hr")) {
            return "hr/profile-hr";
        } else if (loginUser.getRoles().get(0).getName().equalsIgnoreCase("manager")) {
            return "manager/profile-manager";
        } else {
            return "employee/profile-employee";
        }
    }

    @PutMapping
    public String update(Employee employee, MultipartFile file) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loginUser = userService.getUsernameOrEmail(authentication.getName(), null);
        Employee emp = employeeService.getById(loginUser.getId());
        String image = storageService.uploadImageToFileSystem(file);
        storageService.deleteImage(loginUser.getEmployee().getPhoto());
        emp.setPhoto(image.replaceAll("\\s", ""));
        emp.setName(employee.getName());
        emp.setPhone(employee.getPhone());
        emp.setEmail(employee.getEmail());
        employeeService.update(loginUser.getId(), emp);
        return "redirect:/profile";
    }

}
