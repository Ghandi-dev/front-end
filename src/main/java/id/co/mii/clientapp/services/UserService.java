package id.co.mii.clientapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import id.co.mii.clientapp.models.User;
import id.co.mii.clientapp.models.dto.request.UserRequest;

@Service
public class UserService {
    @Value("${server.base.url}/user")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<User> getAll() {
        return restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<User>>() {
                }).getBody();
    }

    public User getById(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.GET, null,
                new ParameterizedTypeReference<User>() {
                }).getBody();
    }

    public User getUsernameOrEmail(String username, String email) {
        return restTemplate.exchange(url.concat("/?username=" + username + "&email=" + email), HttpMethod.GET, null,
                new ParameterizedTypeReference<User>() {
                }).getBody();
    }

    public UserRequest create(UserRequest userRequest) {
        return restTemplate.exchange(url, HttpMethod.POST, new HttpEntity(userRequest),
                new ParameterizedTypeReference<UserRequest>() {
                }).getBody();
    }

    public UserRequest update(UserRequest userRequest) {
        return restTemplate.exchange(url, HttpMethod.PUT, new HttpEntity(userRequest),
                new ParameterizedTypeReference<UserRequest>() {
                }).getBody();
    }

    public User delete(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.DELETE, null,
                new ParameterizedTypeReference<User>() {
                }).getBody();
    }
}
