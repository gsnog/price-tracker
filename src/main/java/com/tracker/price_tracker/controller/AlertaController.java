package com.tracker.price_tracker.controller;

import com.tracker.price_tracker.integracao.AlertaRequestDTO;
import com.tracker.price_tracker.model.AlertaPreco;
import com.tracker.price_tracker.model.Usuario;
import com.tracker.price_tracker.repository.AlertaPrecoRepository;
import com.tracker.price_tracker.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alertas")
public class AlertaController {

    private final AlertaPrecoRepository alertaRepository;
    private final UsuarioRepository usuarioRepository;

    public AlertaController(AlertaPrecoRepository alertaRepository, UsuarioRepository usuarioRepository) {
        this.alertaRepository = alertaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<String> criarAlerta(
            @RequestHeader("X-Usuario-Email") String email,
            @RequestBody AlertaRequestDTO dto) {

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não logado!"));

        AlertaPreco novoAlerta = new AlertaPreco(dto.getUrlProduto(), usuario);
        alertaRepository.save(novoAlerta);

        return ResponseEntity.ok("Alerta criado! Vamos avisar no Telegram quando o preço mudar.");
    }
}