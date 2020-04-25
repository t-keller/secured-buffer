package fr.tkeller.securedbuffer.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
	@NonNull
	@NotNull
	private String content;

	@NonNull
	@NotNull
	private String iv;
}
