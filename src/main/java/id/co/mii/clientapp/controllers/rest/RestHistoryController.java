package id.co.mii.clientapp.controllers.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.models.History;
import id.co.mii.clientapp.services.HistoryService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/history")
@AllArgsConstructor
public class RestHistoryController {
    private HistoryService historyService;

    @GetMapping
    public List<History> getAll() {
        return historyService.getAll();
    }

    @GetMapping("/news")
    public List<History> getNews() {
        return historyService.getNews();
    }

    @GetMapping("/employee")
    public List<History> getByEmployee() {
        return historyService.getByEmployee();
    }

    @GetMapping("/manager")
    public List<History> getByManager() {
        return historyService.getByManager();
    }

    @GetMapping("/{id}")
    public History getById(@PathVariable Integer id) {
        return historyService.getById(id);
    }

    @PostMapping
    public History create(@RequestBody History history) {
        return historyService.create(history);
    }

    @PutMapping("/{id}")
    public History update(
            @PathVariable Integer id,
            @RequestBody History history) {
        return historyService.update(id, history);
    }

    @DeleteMapping("/{id}")
    public History delete(@PathVariable Integer id) {
        return historyService.delete(id);
    }
}
