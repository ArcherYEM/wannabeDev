package com.dev.wannabe.global.config;

import nz.net.ultraq.thymeleaf.layoutdialect.LayoutDialect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.dialect.SpringStandardDialect;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;

@Configuration
@EnableWebMvc
public class ThymeleafConfig {

    // Set template resolver
    @Bean
    public SpringResourceTemplateResolver templateResolver() {
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();

        resolver.setPrefix("/WEB-INF/views/");  // 템플릿 경로
        resolver.setSuffix(".html");            // 템플릿 파일 확장자
        resolver.setTemplateMode("HTML");
        resolver.setCharacterEncoding("UTF-8");
        resolver.setCacheable(false);           // 개발 시 캐시 비활성화.

        return resolver;
    }

    // Set template engine
    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine engine = new SpringTemplateEngine();

        engine.setTemplateResolver(templateResolver());
        engine.setEnableSpringELCompiler(true);
        engine.addDialect(new LayoutDialect());         // 레이아웃 다이얼렉트

        return engine;
    }

    // set view resolver
    @Bean
    public ThymeleafViewResolver viewResolver() {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();

        viewResolver.setTemplateEngine(templateEngine()); // 위에서 정의한 템플릿 엔진 사용
        viewResolver.setCharacterEncoding("UTF-8");      // 인코딩 설정
        viewResolver.setOrder(1);                        // View Resolver 우선순위

        return viewResolver;
    }
}
