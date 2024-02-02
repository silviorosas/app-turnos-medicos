package com.tutorial.crud.errores;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class ErrorHandler {
    @ExceptionHandler(PacienteNotFoundException.class)
    public ResponseEntity<?> errorHandlerValidIntegridad(Exception e){
        return  ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(FechaExistenteException.class)
    public ResponseEntity<?> errorHandlerValidFecha(Exception e){
        return  ResponseEntity.badRequest().body(e.getMessage());
    }
}
