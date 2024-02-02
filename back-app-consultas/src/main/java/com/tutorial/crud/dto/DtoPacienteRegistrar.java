package com.tutorial.crud.dto;

import java.time.LocalDate;

public record DtoPacienteRegistrar(
     String nombre,
     String apellido,
     String alias,
     String dni,
     LocalDate fechaNacimiento) {

   
}
