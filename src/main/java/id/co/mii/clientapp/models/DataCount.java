package id.co.mii.clientapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataCount {
    private Integer countProjectByEmployee;
    private Integer countProjectByManager;
    private Integer countAllProject;
    private Integer countOvertimeByEmployee;
    private Integer countOvertimeByManager;
    private Integer countAllOvertime;
    private Integer countAllEmployee;
}
