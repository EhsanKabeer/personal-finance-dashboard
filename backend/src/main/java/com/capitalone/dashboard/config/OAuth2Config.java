package com.capitalone.dashboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class OAuth2Config {
    @Bean
    public ServletOAuth2AuthorizedClientExchangeFilterFunction oauth2Config(
            ClientRegistrationRepository clients,
            OAuth2AuthorizedClientRepository authClients
    ) {
        var oauth2 = new ServletOAuth2AuthorizedClientExchangeFilterFunction(clients, authClients);
        oauth2.setDefaultClientRegistrationId("capitalone");
        return oauth2;
    }

    @Bean
    public WebClient webClient(ServletOAuth2AuthorizedClientExchangeFilterFunction oauth2) {
        return WebClient.builder()
                .apply(oauth2.oauth2Configuration())
                .build();
    }
}
