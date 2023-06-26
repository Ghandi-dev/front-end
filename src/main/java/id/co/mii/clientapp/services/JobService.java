package id.co.mii.clientapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.models.Job;

@Service
public class JobService {
    @Value("${server.base.url}/job")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<Job> getAll() {
        return restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Job>>() {
                }).getBody();
    }

    public Job getById(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.GET, null,
                new ParameterizedTypeReference<Job>() {
                }).getBody();
    }

    public Job create(Job job) {
        return restTemplate.exchange(url, HttpMethod.POST, new HttpEntity(job),
                new ParameterizedTypeReference<Job>() {
                }).getBody();
    }

    public Job update(Integer id, Job job) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.PUT, new HttpEntity(job),
                new ParameterizedTypeReference<Job>() {
                }).getBody();
    }

    public Job delete(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.DELETE, null,
                new ParameterizedTypeReference<Job>() {
                }).getBody();
    }
}
