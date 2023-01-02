package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	@GetMapping("/hello")
	public String sayHello()
	{
		return "hello,world!";
	}
	@Test
	public void testMySQL() {
	// Create a MySQL container and start it
	MySQLContainer mysql = new MySQLContainer("mysql:8.0.21")
		.withDatabaseName("my_database")
		.withUsername("user")
		.withPassword("password");
	mysql.start();

	// Connect to the database using JDBC
	try (Connection conn = DriverManager.getConnection(mysql.getJdbcUrl(), mysql.getUsername(), mysql.getPassword())) {
		// Perform database operations
	}
	}


}
