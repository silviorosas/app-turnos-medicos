package com.tutorial.crud.dto;

import com.tutorial.crud.entity.Paciente;

public record DtoPacienteFindById(Long id,String nombre,String apellido) {
     public DtoPacienteFindById(Paciente paciente){
       this(paciente.getId(),paciente.getNombre(), paciente.getApellido());
    }
    
}
