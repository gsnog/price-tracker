package com.tracker.price_tracker.controller;

import com.tracker.price_tracker.model.Usuario;
import com.tracker.price_tracker.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class PerfilController {

    private final UsuarioRepository usuarioRepository;

    public PerfilController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/")
    public String home() {
        return "🤖 Bem-vindo ao Motor de Buscas! Acesse http://localhost:8080/perfil para logar.";
    }

    @GetMapping("/api/user/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = principal.getAttribute("email");
        String nome = principal.getAttribute("name");

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseGet(() -> usuarioRepository.save(new Usuario(nome, email)));

        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/api/user/telegram")
    public ResponseEntity<?> updateTelegramChatId(@AuthenticationPrincipal OAuth2User principal, @RequestBody Map<String, String> body) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = principal.getAttribute("email");
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String chatId = body.get("telegramChatId");
        usuario.setTelegramChatId(chatId);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok(usuario);
    }
}