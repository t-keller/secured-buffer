package fr.tkeller.securedbuffer;

import java.util.LinkedList;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import fr.tkeller.securedbuffer.dto.Message;

@SpringBootApplication
public class SecuredBufferApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecuredBufferApplication.class, args);
	}

	@Bean
	public Map<UUID, LinkedList<Message>> getMessageStore() {
		return new ConcurrentHashMap<UUID, LinkedList<Message>>();
	}
}
