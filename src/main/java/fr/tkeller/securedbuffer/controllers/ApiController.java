package fr.tkeller.securedbuffer.controllers;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fr.tkeller.securedbuffer.dto.Message;

@RestController
@RequestMapping(value = "api/channels/{channelUUID}/messages")
@CrossOrigin
public class ApiController {

	@Autowired
	Map<UUID, LinkedList<Message>> messageStore;

	@GetMapping
	public List<Message> getMessages(@PathVariable UUID channelUUID) {
		if (messageStore.containsKey(channelUUID)) {
			return messageStore.get(channelUUID);
		} else {
			return Collections.emptyList();
		}
	}

	@PostMapping
	public Message addMessage(@RequestBody @Valid Message message, @PathVariable UUID channelUUID) {
		if (messageStore.containsKey(channelUUID)) {
			messageStore.get(channelUUID).addFirst(message);
		} else {
			LinkedList<Message> messages = new LinkedList<>();
			messages.addFirst(message);
			messageStore.put(channelUUID, messages);
		}
		return message;
	}

	@DeleteMapping
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void purgeMessages(@PathVariable UUID channelUUID) {
		if (messageStore.containsKey(channelUUID)) {
			messageStore.remove(channelUUID);
		}
	}
}
