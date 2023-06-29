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
import id.co.mii.clientapp.models.dto.request.ProjectRequest;

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

    public List<Project> getByManagerId() {
        return restTemplate.exchange(url.concat("/manager/"), HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Project>>() {
                }).getBody();
    }

    public List<Project> getByEmployeeId() {
        return restTemplate.exchange(url.concat("/employee/"), HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Project>>() {
                }).getBody();
    }

    public Project getById(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.GET, null,
                new ParameterizedTypeReference<Project>() {
                }).getBody();
    }

    public ProjectRequest create(ProjectRequest projectRequest) {
        return restTemplate.exchange(url, HttpMethod.POST, new HttpEntity(projectRequest),
                new ParameterizedTypeReference<ProjectRequest>() {
                }).getBody();
    }

    public ProjectRequest update(Integer id, ProjectRequest projectRequest) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.PUT, new HttpEntity(projectRequest),
                new ParameterizedTypeReference<ProjectRequest>() {
                }).getBody();
    }

    public Project delete(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.DELETE, null,
                new ParameterizedTypeReference<Project>() {
                }).getBody();
    }
}
