package id.co.mii.clientapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.models.DataCount;

@Service
public class DataCountService {

    @Value("${server.base.url}/data")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public DataCount getDataCount() {
        return restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<DataCount>() {
                }).getBody();
    }
}
