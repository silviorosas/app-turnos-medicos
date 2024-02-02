package com.tutorial.crud.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tutorial.crud.dto.DtoPacienteListar;
import com.tutorial.crud.dto.DtoPacienteRegistrar;
import com.tutorial.crud.entity.Paciente;
import com.tutorial.crud.service.PacienteService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/pacientes")
@CrossOrigin(origins = {"http://localhost:4200"})
public class PacienteController {
    
    @Autowired
    private PacienteService pacienteService;

    @GetMapping
    public ResponseEntity<List<DtoPacienteListar>> getAllPacientes() {
        return ResponseEntity.ok(pacienteService.getAllPacientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<DtoPacienteListar>> getPacienteById(@PathVariable Long id) {
        
        return ResponseEntity.ok(pacienteService.getPacientePorId(id));
    }

    @PostMapping
    public ResponseEntity<?> createPaciente(@RequestBody DtoPacienteRegistrar paciente) {
         pacienteService.createPaciente(paciente);
        return new ResponseEntity<>("Paciente add con éxito",HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> updatePaciente(@PathVariable Long id, @RequestBody DtoPacienteRegistrar paciente) {
        Paciente updatedPaciente = pacienteService.updatePaciente2(id, paciente);
        if (updatedPaciente != null) {
            return ResponseEntity.ok(updatedPaciente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaciente(@PathVariable Long id) {
        pacienteService.deletePaciente(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/obtener-id/{dni}")
    public Long obtenerIdPacientePorDni(@PathVariable String dni) {
        return pacienteService.obtenerIdPacientePorDni(dni);
    }

    @GetMapping("/buscar-descripcion")
    public ResponseEntity<List<String>> buscarDescripcionPorDni(@RequestParam String dni) {
        List<String> descripciones = pacienteService.buscarDescripcionPorDni(dni);
        return ResponseEntity.ok(descripciones);
    }
}
