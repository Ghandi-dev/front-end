package id.co.mii.clientapp.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    private Integer id;
    private String name;
    private String client;
    private String description;
    private String date_start;
    private String date_end;
    private Integer budget;
    private Employee manager;
    private List<Employee> employees;
}
