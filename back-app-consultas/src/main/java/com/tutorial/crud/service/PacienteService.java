package com.tutorial.crud.service;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tutorial.crud.dto.DtoPacienteListar;
import com.tutorial.crud.dto.DtoPacienteRegistrar;
import com.tutorial.crud.entity.Paciente;
import com.tutorial.crud.errores.PacienteNotFoundException;
import com.tutorial.crud.repository.PacienteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    @Autowired
    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<DtoPacienteListar> getAllPacientes() {
        return pacienteRepository.findAll().stream().map(DtoPacienteListar::new).toList();
    }

    public Optional<DtoPacienteListar> getPacientePorId(Long id) {
        if(!pacienteRepository.existsById(id)){
            throw new PacienteNotFoundException("El paciente con ID: " + id + " no existe");
        } 
        return pacienteRepository.findById(id).stream().map(DtoPacienteListar::new).findAny();
    }

    public void createPaciente(DtoPacienteRegistrar datos) {
        Paciente paciente = new Paciente();
        paciente.setNombre(datos.nombre());
        paciente.setApellido(datos.apellido());
        paciente.setAlias(datos.alias());
        paciente.setDni(datos.dni());
        paciente.setFechaNacimiento(datos.fechaNacimiento());
        
        pacienteRepository.save(paciente);
    }

    public void deletePaciente(Long id) {
        pacienteRepository.deleteById(id);
    }

    public Paciente updatePaciente(Paciente pacienteActualizado) {
        return pacienteRepository.save(pacienteActualizado);
    }


    public Paciente updatePaciente2(Long pacienteId, DtoPacienteRegistrar pacienteDto) {            

        Paciente pacienteExistente = pacienteRepository.findById(pacienteId)
        .orElseThrow(() -> new PacienteNotFoundException("El paciente con ID " + pacienteId + " no existe"));             
      
        pacienteExistente.setNombre(pacienteDto.nombre());
        pacienteExistente.setApellido(pacienteDto.apellido());
        pacienteExistente.setAlias(pacienteDto.alias());
        pacienteExistente.setDni(pacienteDto.dni());
        pacienteExistente.setFechaNacimiento(pacienteDto.fechaNacimiento());

        // Guardamos el paciente actualizado en la base de datos
        return pacienteRepository.save(pacienteExistente);
    }

    public Long obtenerIdPacientePorDni(String dni) {          
        if(!pacienteRepository.existsByDni(dni)){
            throw new PacienteNotFoundException("No existe paciente con DNI: "+dni);
            
        }            
        return pacienteRepository.findIdByDni(dni);
    }
    
    public List<String> buscarDescripcionPorDni(String dni) {
        return pacienteRepository.findDescripcionConsultaByDni(dni);
    }
}

