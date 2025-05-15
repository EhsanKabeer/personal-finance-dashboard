package com.capitalone.dashboard.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AccountController {
    private final WebClient webClient;
    public AccountController(WebClient webClient) {
        this.webClient = webClient;
    }

    @GetMapping("/accounts")
    public Mono<JsonNode> getAccounts(
            OAuth2AuthenticationToken auth,
            @RegisteredOAuth2AuthorizedClient("capitalone") OAuth2AuthorizedClient client
    ) {
        return webClient.get()
                .uri("https://sandbox.capitalone.io/accounts")
                .attributes(ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient(client))
                .retrieve()
                .bodyToMono(JsonNode.class);
    }

    @GetMapping("/accounts/{id}/transactions")
    public Mono<JsonNode> getTransactions(
            OAuth2AuthenticationToken auth,
            @RegisteredOAuth2AuthorizedClient("capitalone") OAuth2AuthorizedClient client,
            @PathVariable("id") String accountId
    ) {
        return webClient.get()
                .uri("https://sandbox.capitalone.io/accounts/{id}/transactions", accountId)
                .attributes(ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient(client))
                .retrieve()
                .bodyToMono(JsonNode.class);
    }
}
