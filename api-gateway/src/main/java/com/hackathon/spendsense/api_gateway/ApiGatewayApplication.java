package com.hackathon.spendsense.api_gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("ledger-service", r -> r.path("/ledger/**")
						.uri("http://localhost:8084"))
				.route("budget-service", r -> r.path("/budget/**")
						.uri("http://localhost:8083"))
				.route("user-service", r -> r.path("/users/**")
						.uri("http://localhost:8082"))
				.build();
	}
}
