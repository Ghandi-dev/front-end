package id.co.mii.clientapp.controllers.rest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.models.DataCount;
import id.co.mii.clientapp.services.DataCountService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/data")
public class RestDataCountController {

    private DataCountService dataCountService;

    @GetMapping
    public DataCount getById() {
        return dataCountService.getDataCount();
    }

}
