package id.co.mii.clientapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import id.co.mii.clientapp.models.dto.request.LoginRequest;
import id.co.mii.clientapp.services.LoginService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class LoginController {

    private LoginService loginService;

    @GetMapping("/login")
    public String loginPage(Model model, LoginRequest loginRequest) {
        return "auth/login";
    }

    @PostMapping("/login")
    public String login(LoginRequest loginRequest) {
        loginService.login(loginRequest);
        if (loginService.login(loginRequest) == null) {
            return "redirect:/login?error=true";
        } else if (loginService.login(loginRequest).getAuthorities().get(0).equalsIgnoreCase("ROLE_HR")) {
            return "redirect:/hr";
        } else if (loginService.login(loginRequest).getAuthorities().get(0).equalsIgnoreCase("ROLE_MANAGER")) {
            return "redirect:/manager";
        } else {
            return "redirect:/employee";
        }
    }
}
