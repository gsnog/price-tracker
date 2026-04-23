package com.tracker.price_tracker.controller;

import com.tracker.price_tracker.integracao.AlertaRequestDTO;
import com.tracker.price_tracker.model.AlertaPreco;
import com.tracker.price_tracker.model.Usuario;
import com.tracker.price_tracker.repository.AlertaPrecoRepository;
import com.tracker.price_tracker.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alertas")
public class AlertaController {

    private final AlertaPrecoRepository alertaRepository;
    private final UsuarioRepository usuarioRepository;

    public AlertaController(AlertaPrecoRepository alertaRepository, UsuarioRepository usuarioRepository) {
        this.alertaRepository = alertaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public ResponseEntity<List<AlertaPreco>> listarAlertas(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        List<AlertaPreco> alertas = alertaRepository.findAllByUsuario(usuario);
        return ResponseEntity.ok(alertas);
    }

    @PostMapping
    public ResponseEntity<String> criarAlerta(
            @AuthenticationPrincipal OAuth2User principal,
            @RequestBody AlertaRequestDTO dto) {

        String email = principal.getAttribute("email");
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        AlertaPreco novoAlerta = new AlertaPreco(dto.getUrlProduto(), usuario);
        alertaRepository.save(novoAlerta);

        return ResponseEntity.ok("Alerta criado com sucesso!");
    }
}