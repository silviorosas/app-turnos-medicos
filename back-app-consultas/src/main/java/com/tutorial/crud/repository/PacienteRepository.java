package com.tutorial.crud.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tutorial.crud.entity.Paciente;



public interface PacienteRepository extends JpaRepository<Paciente,Long> {
    
    @Query("SELECT p.id FROM Paciente p WHERE p.dni = :dni")
    Long findIdByDni(String dni);

    @Query("SELECT c.descripcion FROM Consulta c WHERE c.paciente.dni = :dni")
    List<String> findDescripcionConsultaByDni(@Param("dni") String dni);

    boolean existsByDni(String dni); 
}
   

