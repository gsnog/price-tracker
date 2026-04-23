package com.tracker.price_tracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.beans.factory.annotation.Value;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${FRONTEND_URL:http://localhost:3000}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Desliga o bloqueio de POST (CSRF) para APIs e testes no Bruno
                .csrf(csrf -> csrf.disable())

                // 2. Regras de Autorização de Rotas
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/").permitAll() // /alertas agora exige autenticação
                        .anyRequest().authenticated()
                )
                // 3. Tipo de Login
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl(frontendUrl, true)
                );

        return http.build();
    }
}
