package com.tutorial.crud.dto;

import java.util.Set;

import com.tutorial.crud.entity.Consulta;
import com.tutorial.crud.entity.Paciente;



public record DtoPacienteListar(Long id,String nombre,String apellido,String alias,String dni, Set<Consulta> consulta) {

    public DtoPacienteListar(Paciente paciente){
       this(paciente.getId(),paciente.getNombre(), paciente.getApellido(), paciente.getAlias(),paciente.getDni() ,paciente.getConsulta());
    }
}
