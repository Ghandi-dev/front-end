// package id.co.mii.clientapp.controllers;

// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;

// import groovyjarjarpicocli.CommandLine.Model;
// import id.co.mii.clientapp.services.ProjectService;
// import lombok.AllArgsConstructor;

// @Controller
// @AllArgsConstructor
// @RequestMapping("/project")
// public class ProjectController {
//     private ProjectService projectService;

//     @GetMapping
//     public String getAll(Model model) {
//         model.addAttribute("project", projectService.getAll());
//         model.addAttribute("isActive", "project");
//         return "manager/index";
//     }
// }
