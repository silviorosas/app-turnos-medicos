package com.tutorial.crud.controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import com.tutorial.crud.entity.Medico;
import com.tutorial.crud.service.MedicoService;

import java.util.List;


import java.util.Optional;

@RestController
@RequestMapping("/api/v1/medicos")
@CrossOrigin(origins = {"http://localhost:4200"})
public class MedicoController {
    @Autowired
    private MedicoService service;

    @GetMapping
    public List<Medico> getAllMedicos() {
        return service.obtenerTodosLosMedicos();
    }

    @GetMapping("/{id}")
    public Optional<Medico> getMedicoById(@PathVariable Long id) {
        return service.obtenerMedicoPorId(id);
    }


   // @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Medico addMedico(@RequestBody Medico medico) {
        return service.crearMedico(medico);
    }

    @PutMapping("/{id}")
    public Medico updateMedico(@RequestBody Medico medico) {
        return service.actualizarMedico(medico);
    }

    @DeleteMapping("/{id}")
    public void deleteMedico(@PathVariable Long id) {
        service.eliminarMedico(id);
    }
}
