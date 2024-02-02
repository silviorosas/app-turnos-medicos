package com.tutorial.crud.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.tutorial.crud.entity.Medico;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
}
