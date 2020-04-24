package fr.tkeller.securedbuffer.controllers;

import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class WebAppController {

	@GetMapping(value = "channels/{channelUUID}")
	public String home(Model model, @PathVariable UUID channelUUID) {
		model.addAttribute("channelUUID", channelUUID);
		return "home";
	}
}
