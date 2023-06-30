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

import id.co.mii.clientapp.models.Employee;
import id.co.mii.clientapp.services.EmployeeService;
import id.co.mii.clientapp.services.JobService;
import id.co.mii.clientapp.services.UserService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/employee")
public class RestEmployeeController {

    private EmployeeService employeeService;
    private JobService jobService;
    private UserService userService;

    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAll();
    }

    @GetMapping("/manager")
    public List<Employee> getAllByManagerId() {
        return employeeService.getByManagerId();
    }

    @GetMapping("/all-manager")
    public List<Employee> getManager() {
        return employeeService.getManager();
    }

    @GetMapping("/{id}")
    public Employee getById(@PathVariable Integer id) {
        return employeeService.getById(id);
    }

    @GetMapping("/id")
    public Employee getById() {
        return employeeService.getForProfile();
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return employeeService.create(employee);
    }

    @DeleteMapping("/{id}")
    public Employee delete(@PathVariable Integer id) {
        return employeeService.delete(id);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Integer id, @RequestBody Employee employee) {
        Employee emp = employeeService.getById(id);
        emp.setManager(employeeService.getById(employee.getManager().getId()));
        emp.setJob(jobService.getById(employee.getJob().getId()));
        return employeeService.update(id, emp);
    }
}
