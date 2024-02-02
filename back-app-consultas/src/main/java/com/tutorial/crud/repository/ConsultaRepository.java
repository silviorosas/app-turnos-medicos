package com.tutorial.crud.repository;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tutorial.crud.entity.Consulta;
import com.tutorial.crud.entity.Medico;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    
    boolean existsByFechaAgendarTurno(LocalDateTime fechaAgendarTurno);

    boolean existsByFechaAgendarTurnoBetween(LocalDateTime rangoInicio, LocalDateTime rangoFin);

     @Query("SELECT c FROM Consulta c WHERE c.medico = :medico " +
            "AND c.fechaAgendarTurno BETWEEN :startDate AND :endDate")
    List<Consulta> findConsultasByMedicoAndIntervaloDeTiempo(
            @Param("medico") Medico medico,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
