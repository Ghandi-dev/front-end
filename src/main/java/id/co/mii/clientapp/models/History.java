package id.co.mii.clientapp.models;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class History {
    private Integer id;
    private String status;
    private Date createAt;
    private Overtime overtime;
}
