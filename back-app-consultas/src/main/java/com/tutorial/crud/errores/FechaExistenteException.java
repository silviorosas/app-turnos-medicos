package com.tutorial.crud.errores;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class FechaExistenteException extends RuntimeException {

    public FechaExistenteException(String message) {
        super(message);
    }
    public FechaExistenteException(String message, Throwable cause) {
        super(message, cause);
    }
}