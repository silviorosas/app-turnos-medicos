package com.tutorial.crud.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import java.util.HashSet;

import java.util.Set;



@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Paciente  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;      
    private String nombre;
    private String apellido;
    private String alias;
    private String dni;
    private LocalDate fechaNacimiento;     
    

    @JsonIgnore
    @OneToMany(mappedBy = "paciente",fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.REMOVE, CascadeType.MERGE})
    private Set<Consulta> consulta = new HashSet<>();

   

}
