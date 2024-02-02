package com.tutorial.crud.service;


import org.springframework.stereotype.Service;

import com.tutorial.crud.entity.Consulta;
import com.tutorial.crud.entity.Medico;
import com.tutorial.crud.errores.FechaExistenteException;
import com.tutorial.crud.repository.ConsultaRepository;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ConsultaService {
    private final ConsultaRepository consultaRepository;

    public ConsultaService(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    public List<Consulta> getAllConsultas() {
        return consultaRepository.findAll();
    }

    public Optional<Consulta> getConsultaById(Long id) {

        return consultaRepository.findById(id);
    }




    
    public void validarDiayHoraParaConsulta(Consulta consulta) {
        LocalDateTime fechaAgendarTurno = consulta.getFechaAgendarTurno();       
        DayOfWeek diaSemana = fechaAgendarTurno.getDayOfWeek();
        LocalTime hora = fechaAgendarTurno.toLocalTime();

        if ((diaSemana != DayOfWeek.SATURDAY && diaSemana != DayOfWeek.SUNDAY) &&
            (hora.isAfter(LocalTime.of(7, 59)) && hora.isBefore(LocalTime.of(18, 0)))) {
            
        } else {
            throw new FechaExistenteException("Las consultas deben ser de lunes a viernes, de 8:00 a 18:00.");
        }
    }

    

    public Consulta createConsulta(Consulta consulta) {
        validarDiayHoraParaConsulta(consulta);
    
        LocalDateTime fechaAgendarTurno = consulta.getFechaAgendarTurno();
    
        // Verifica si la fecha ya está registrada en la base de datos
        boolean fechaExistente = consultaRepository.existsByFechaAgendarTurno(fechaAgendarTurno);
    
        LocalDateTime fechaActual = LocalDateTime.now();
        
        if (fechaAgendarTurno.isBefore(fechaActual)) {
            throw new FechaExistenteException("No se puede agendar un turno en el pasado.");
        }        
    
        if (fechaExistente) {
            throw new FechaExistenteException("La fecha de consulta ya está registrada.");
        } else {
            validarIntervaloDeTiempo2(consulta);
            return consultaRepository.save(consulta);
        }
    }
    
   /*  private void validarIntervaloDeTiempo(Consulta consulta) {
        LocalDateTime fechaAgendarTurno = consulta.getFechaAgendarTurno();
    
        // Definir el rango de tiempo: 30 minutos antes y después de la fecha de la consulta
        LocalDateTime rangoInicio = fechaAgendarTurno.minusMinutes(29);
        LocalDateTime rangoFin = fechaAgendarTurno.plusMinutes(29);
    
        // Verificar si hay consultas dentro del rango de tiempo definido
        boolean consultaEnIntervalo = consultaRepository.existsByFechaAgendarTurnoBetween(rangoInicio, rangoFin);
    
        if (consultaEnIntervalo) {
            throw new FechaExistenteException("La consulta debe ser en intervalos de 30 minutos.");
        }
    } */


    private void validarIntervaloDeTiempo2(Consulta consulta) {
        LocalDateTime fechaAgendarTurno = consulta.getFechaAgendarTurno();       
        LocalDateTime rangoInicio = fechaAgendarTurno.minusMinutes(24);
        LocalDateTime rangoFin = fechaAgendarTurno.plusMinutes(24);
       
        Medico medico = consulta.getMedico();
        boolean consultaEnIntervalo = !consultaRepository.findConsultasByMedicoAndIntervaloDeTiempo(medico, rangoInicio, rangoFin).isEmpty();

        if (consultaEnIntervalo) {
            throw new FechaExistenteException("El médico tiene una consulta cada 30 minutos.");
        }
    }
    
    



    

    public void deleteConsulta(Long id) {
        consultaRepository.deleteById(id);
    }

    public Consulta updateConsulta(Long id, Consulta consultaActualizada) {
        consultaActualizada.setId(id);
        return consultaRepository.save(consultaActualizada);
    }

    public boolean existeById(Long id) {
       return consultaRepository.existsById(id);
    }
}

