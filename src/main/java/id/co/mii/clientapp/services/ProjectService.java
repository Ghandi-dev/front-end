package id.co.mii.clientapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.models.Project;

@Service
public class ProjectService {
    @Value("${server.base.url}/project")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<Project> getAll() {
        return restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Project>>() {
                }).getBody();
    }

    public Project getById(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.GET, null,
                new ParameterizedTypeReference<Project>() {
                }).getBody();
    }

    public Project create(Project Project) {
        return restTemplate.exchange(url, HttpMethod.POST, new HttpEntity(Project),
                new ParameterizedTypeReference<Project>() {
                }).getBody();
    }

    public Project update(Integer id, Project Project) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.PUT, new HttpEntity(Project),
                new ParameterizedTypeReference<Project>() {
                }).getBody();
    }

    public Project delete(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.DELETE, null,
                new ParameterizedTypeReference<Project>() {
                }).getBody();
    }
}
