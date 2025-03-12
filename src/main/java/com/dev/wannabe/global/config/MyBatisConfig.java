package com.dev.wannabe.global.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;
import java.io.IOException;

@Configuration
@MapperScan(basePackages = "com.dev.wannabe")
public class MyBatisConfig {

    @Value("${wannabe.datasource.driver-class}")
    private String driverClass;

    @Value("${wannabe.datasource.url}")
    private String dbUrl;

    @Value("${wannabe.datasource.username}")
    private String dbUsername;

    @Value("${wannabe.datasource.password}")
    private String dbPassword;

    @Value("${wannabe.datasource.wallet-path}")
    private String walletPath;

    @Value("${wannabe.datasource.wallet-path-mac}")
    private String walletPathMac;

    @Bean
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();

        config.setDriverClassName(driverClass);
        /* window */
        config.setJdbcUrl(dbUrl+walletPath);
        /* mac */
        config.setJdbcUrl(dbUrl+walletPathMac);
        config.setUsername(dbUsername);
        config.setPassword(dbPassword);

        config.setMaximumPoolSize(10);
        config.setMinimumIdle(5);
        config.setValidationTimeout(5000);
        config.setIdleTimeout(60000);
        config.setIdleTimeout(200000);
        config.setAutoCommit(false);

        return new HikariDataSource(config);
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        factoryBean.setConfigLocation(new ClassPathResource("/META-INF/mybatis/sql-mapper-config.xml"));
        factoryBean.setMapperLocations(new PathMatchingResourcePatternResolver()
                .getResources("classpath:/META-INF/mybatis/sql/**/*.xml"));
        return factoryBean.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
