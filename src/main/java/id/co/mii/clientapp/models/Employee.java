package id.co.mii.clientapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private Integer id;
    private String name;
    private String phone;
    private String email;
    private String photo;
    private Employee manager;
    private Job job;
    private User user;
}
