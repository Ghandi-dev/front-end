package id.co.mii.clientapp.models.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String photo;
    private String username;
    private String password;
    private Integer managerId;
    private Integer jobId;
}