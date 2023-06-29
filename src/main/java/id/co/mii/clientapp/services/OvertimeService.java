package id.co.mii.clientapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.models.Overtime;

@Service
public class OvertimeService {
    @Value("${server.base.url}/overtime")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<Overtime> getAll() {
        return restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Overtime>>() {
                }).getBody();
    }

    public List<Overtime> getAllForHr() {
        return restTemplate.exchange(url.concat("/hr"), HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Overtime>>() {
                }).getBody();
    }

    public List<Overtime> getByEmployeeId() {
        return restTemplate.exchange(url.concat("/employee/"), HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Overtime>>() {
                }).getBody();
    }

    public List<Overtime> getByManagerId() {
        return restTemplate.exchange(url.concat("/manager/"), HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Overtime>>() {
                }).getBody();
    }

    public Overtime getById(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.GET, null,
                new ParameterizedTypeReference<Overtime>() {
                }).getBody();
    }

    public Overtime create(Overtime overtime) {
        return restTemplate.exchange(url, HttpMethod.POST, new HttpEntity(overtime),
                new ParameterizedTypeReference<Overtime>() {
                }).getBody();
    }

    public Overtime update(Integer id, Overtime overtime) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.PUT, new HttpEntity(overtime),
                new ParameterizedTypeReference<Overtime>() {
                }).getBody();
    }

    public Overtime delete(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.DELETE, null,
                new ParameterizedTypeReference<Overtime>() {
                }).getBody();
    }

    public Overtime approveOvertime(Integer id) {
        return restTemplate.exchange(url.concat("/approve/" + id), HttpMethod.PUT, null,
                new ParameterizedTypeReference<Overtime>() {
                }).getBody();
    }

    public Overtime rejectOvertime(Integer id) {
        return restTemplate.exchange(url.concat("/reject/" + id), HttpMethod.PUT, null,
                new ParameterizedTypeReference<Overtime>() {
                }).getBody();
    }
}
