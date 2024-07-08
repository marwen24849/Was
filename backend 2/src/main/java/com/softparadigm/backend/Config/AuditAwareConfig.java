package com.softparadigm.backend.Config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.http.HttpHeaders;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

@Configuration
public class AuditAwareConfig {

    @Bean
    public AuditorAware<String> auditorProvider() {
        // Replace with the actual logic to fetch the current user
        return () -> Optional.ofNullable("current_user"); // For testing, replace with actual user logic
    }


}
