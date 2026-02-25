package com.fyp.memeMachine.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve files from the project-level `memeImages` directory at the path `/images/**`.
        // Example: a file `memeImages/foo.jpg` will be accessible at `/images/foo.jpg`.
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:./memeImages/");
    }
}

