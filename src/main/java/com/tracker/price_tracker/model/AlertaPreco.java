package com.tracker.price_tracker.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AlertaPreco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String urlProduto;

    private BigDecimal ultimoPreco;

    private String status;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public AlertaPreco(String urlProduto, Usuario usuario) {
        this.urlProduto = urlProduto;
        this.status = "ATIVO";
        this.usuario = usuario;
        this.ultimoPreco = null;
    }
}
