package id.co.mii.clientapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.models.History;

@Service
public class HistoryService {
    @Value("${server.base.url}/history")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<History> getAll() {
        return restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<History>>() {
                }).getBody();
    }

    public List<History> getNews() {
        return restTemplate.exchange(url.concat("/news"), HttpMethod.GET, null,
                new ParameterizedTypeReference<List<History>>() {
                }).getBody();
    }

    public List<History> getByEmployee() {
        return restTemplate.exchange(url.concat("/employee"), HttpMethod.GET, null,
                new ParameterizedTypeReference<List<History>>() {
                }).getBody();
    }

    public List<History> getByManager() {
        return restTemplate.exchange(url.concat("/manager"), HttpMethod.GET, null,
                new ParameterizedTypeReference<List<History>>() {
                }).getBody();
    }

    public History getById(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.GET, null,
                new ParameterizedTypeReference<History>() {
                }).getBody();
    }

    public History create(History history) {
        return restTemplate.exchange(url, HttpMethod.POST, new HttpEntity(history),
                new ParameterizedTypeReference<History>() {
                }).getBody();
    }

    public History update(Integer id, History history) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.PUT, new HttpEntity(history),
                new ParameterizedTypeReference<History>() {
                }).getBody();
    }

    public History delete(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.DELETE, null,
                new ParameterizedTypeReference<History>() {
                }).getBody();
    }
}
