package id.co.mii.clientapp.controllers.rest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import id.co.mii.clientapp.models.Employee;
import id.co.mii.clientapp.models.User;
import id.co.mii.clientapp.services.StorageService;
import id.co.mii.clientapp.services.UserService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class RestUserController {
    private StorageService storageService;
    private UserService userService;

    @GetMapping("/photo/{filename}")
    public ResponseEntity<FileSystemResource> getPhoto(@PathVariable String filename) throws IOException {
        return storageService.getPhoto(filename);
    }

    @DeleteMapping("/{id}")
    public User delete(@PathVariable Integer id) {
        return userService.delete(id);
    }
}
