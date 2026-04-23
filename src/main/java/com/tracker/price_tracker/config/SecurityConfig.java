package com.tracker.price_tracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Desliga o bloqueio de POST (CSRF) para APIs e testes no Bruno
                .csrf(csrf -> csrf.disable())

                // 2. Regras de Autorização de Rotas
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/alertas").permitAll() // <-- LIBERAMOS O /alertas AQUI!
                        .anyRequest().authenticated()
                )
                // 3. Tipo de Login
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/perfil", true)
                );

        return http.build();
    }
}
