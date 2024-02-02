package com.tutorial.crud.service;


import org.springframework.stereotype.Service;

import com.tutorial.crud.entity.Medico;
import com.tutorial.crud.repository.MedicoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoService {
    private final MedicoRepository medicoRepository;

    public MedicoService(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    public List<Medico> obtenerTodosLosMedicos() {
        return medicoRepository.findAll();
    }

    public Optional<Medico> obtenerMedicoPorId(Long id) {
        return medicoRepository.findById(id);
    }

    public Medico crearMedico(Medico medico) {
        return medicoRepository.save(medico);
    }

    public void eliminarMedico(Long id) {
        medicoRepository.deleteById(id);
    }

    public Medico actualizarMedico(Medico medicoActualizado) {
        return medicoRepository.save(medicoActualizado);
    }
}

