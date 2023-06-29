package id.co.mii.clientapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Overtime {
    private Integer id;
    private String jobTask;
    private String date;
    private String end;
    private String start;
    private Integer overtimePay;
    private String message;
    private String status;
    private Employee employee;
    private Project project;
}
