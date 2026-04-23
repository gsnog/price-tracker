package com.tracker.price_tracker.integracao;

import com.tracker.price_tracker.model.AlertaPreco;
import com.tracker.price_tracker.repository.AlertaPrecoRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class MonitoramentoService {

    private final AlertaPrecoRepository alertaRepository;
    private final TelegramService telegramService;

    public MonitoramentoService(AlertaPrecoRepository alertaRepository, TelegramService telegramService) {
        this.alertaRepository = alertaRepository;
        this.telegramService = telegramService;
    }

    @Scheduled(fixedRate = 30000)
    public void verificarPrecos() {
        List<AlertaPreco> alertasAtivos = alertaRepository.findAllByStatus("ATIVO");

        for (AlertaPreco alerta : alertasAtivos) {

            BigDecimal precoRaspadoSite = buscarPrecoReal(alerta.getUrlProduto());

            if (precoRaspadoSite == null) {
                System.out.println("⚠️ Pulando verificação devido a erro de leitura no link: " + alerta.getUrlProduto());
                continue;
            }

            if (alerta.getUltimoPreco() == null) {
                System.out.println("🤖 Primeira leitura de " + alerta.getUrlProduto() + ". Registrando preço base: R$ " + precoRaspadoSite);
                alerta.setUltimoPreco(precoRaspadoSite);
                alertaRepository.save(alerta);
                continue;
            }

            if (precoRaspadoSite.compareTo(alerta.getUltimoPreco()) < 0) {
                telegramService.enviarMensagem("📉 QUEDA DE PREÇO! O produto " + alerta.getUrlProduto() +
                        " caiu de R$ " + alerta.getUltimoPreco() + " para R$ " + precoRaspadoSite + "! Aproveita!");
            }

            if (precoRaspadoSite.compareTo(alerta.getUltimoPreco()) != 0) {
                alerta.setUltimoPreco(precoRaspadoSite);
                alertaRepository.save(alerta);
            }
        }
    }

    private BigDecimal buscarPrecoReal(String url) {
        try {
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .get();

            Element precoElement = doc.selectFirst(".andes-money-amount__fraction");

            if (precoElement != null) {
                String precoTexto = precoElement.text();
                System.out.println("Lido do HTML bruto: " + precoTexto);
                return limparEConverterPreco(precoTexto);
            } else {
                System.out.println("❌ Não encontrei a tag de preço na página!");
            }

        } catch (Exception e) {
            System.out.println("❌ Erro ao acessar o site: " + e.getMessage());
        }
        return null;
    }

    private BigDecimal limparEConverterPreco(String precoSujo) {
        String precoLimpo = precoSujo.replace("R$", "")
                .replace(".", "")
                .trim();
        return new BigDecimal(precoLimpo);
    }
}