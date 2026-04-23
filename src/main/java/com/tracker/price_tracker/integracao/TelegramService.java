package com.tracker.price_tracker.integracao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class TelegramService {
    @Value("${telegram.bot.token}")
    private String botToken;
    @Value("${telegram.bot.chat-id}")
    private String chatId;

    public void enviarMensagem(String texto){
        String url = "https://api.telegram.org/bot" + botToken + "/sendMessage";
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> body = Map.of(
                "chat_id", chatId,
                "text", texto
        );

        try{
            restTemplate.postForObject(url, body, String.class);
            System.out.println("Mensagem disparada com sucesso para Telegram");
        }catch (Exception e){
            System.out.println("Erro ao enviar mensagem" + e.getMessage());
        }
    }
}
