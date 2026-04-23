package com.tracker.price_tracker.controller;

import com.tracker.price_tracker.model.Usuario;
import com.tracker.price_tracker.repository.UsuarioRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/perfil")
    public String verPerfil(@AuthenticationPrincipal OAuth2User principal) {
        String emailGoogle = principal.getAttribute("email");
        String nomeGoogle = principal.getAttribute("name");

        Usuario usuario = usuarioRepository.findByEmail(emailGoogle)
                .orElseGet(() -> {
                    System.out.println("Criando novo usuário no banco: " + nomeGoogle);
                    return usuarioRepository.save(new Usuario(nomeGoogle, emailGoogle));
                });

        return "Olá, " + usuario.getNome() + "! Você está registrado no nosso banco de dados com o ID: "
                + usuario.getId();
    }
}