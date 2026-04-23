package com.tracker.price_tracker.repository;

import com.tracker.price_tracker.model.AlertaPreco;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertaPrecoRepository extends JpaRepository<AlertaPreco, Long> {
    List<AlertaPreco> findAllByStatus(String status);
    List<AlertaPreco> findAllByUsuario(com.tracker.price_tracker.model.Usuario usuario);
}
