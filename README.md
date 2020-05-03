# Secured-buffer

## Concept

The idea is to provide a secured buffer in order to share textual information across the internet. The user interface is a web page backed by a REST API.

## Security

A symmetrical encryption is implemented on the client side in order to provide :
1. Confidentiality
2. Authenticity
3. Integrity

Here are the encryption parameters:
* AES [GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode)
* Key-size: 128 bits
* Initial vector: 12 bits (regenerated for each call)
* Key export format: JWK format (see [RFC 7517](https://tools.ietf.org/html/rfc7517))

The app uses the [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) APIs; it will only work in secured context ([more details here](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)) so TLS is mandatory.

## Stack

Server-side:
* [Spring Boot](https://spring.io/projects/spring-boot) 2.2.6
* [Thymeleaf](https://www.thymeleaf.org/)
* [Lombok](https://projectlombok.org/)

Client-side:
* [Vue.js](https://vuejs.org)
* [Axios](https://github.com/axios/axios)

## Build

Maven is required to build and package the app:

```
mvn clean package
```

## Run

The minimum version of the Java Runtime Environment is 1.8:

```
java -jar app.jar
```

Or even better, create a service (depending on the OS)

## Use

Navigate to :

```
https://host:port/channels/<random uuid>
```

The random uuid allows to enter in a private channel (exchanged messages are indexed by channelUUID)

By default, the app generates an encryption key but the app supports the import of a custom key.

So in order to share the channel, you need to share:
* The channel UUID
* The encryption key

## To-do

* Implement an automated clean-up of the messages
