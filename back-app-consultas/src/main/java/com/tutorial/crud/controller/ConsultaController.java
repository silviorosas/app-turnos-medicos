package com.tutorial.crud.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tutorial.crud.dto.Mensaje;
import com.tutorial.crud.entity.Consulta;
import com.tutorial.crud.service.ConsultaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/consultas")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ConsultaController {
    @Autowired
    private ConsultaService consultaService;

    @GetMapping
    public List<Consulta> getAllConsultas() {
        return consultaService.getAllConsultas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Consulta>> getConsultaById(@PathVariable Long id) {
        if(!consultaService.existeById(id))
            return new ResponseEntity(new Mensaje("No existe consulta con id= "+id),HttpStatus.NOT_FOUND);
       var res= consultaService.getConsultaById(id);
        return new ResponseEntity(res, HttpStatus.OK);
    }

    @PostMapping
    public Consulta addConsulta(@RequestBody Consulta consulta) {
        return consultaService.createConsulta(consulta);
    }

    @PutMapping("/{id}")
    public Consulta updateConsulta(@PathVariable Long id, @RequestBody Consulta consultaDetails) {
        return consultaService.updateConsulta(id, consultaDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteConsulta(@PathVariable Long id) {
        consultaService.deleteConsulta(id);
    }
}

