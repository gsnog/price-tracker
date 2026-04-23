package com.tracker.price_tracker;

import com.tracker.price_tracker.integracao.TelegramService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PriceTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PriceTrackerApplication.class, args);
	}

	@Bean
	public CommandLineRunner testarTelegram(TelegramService telegramService) {
		return args -> {
			System.out.println("====== INICIANDO TESTE DO TELEGRAM ======");
			telegramService.enviarMensagem("Olá, chefe! 🤖 O motor de buscas está online e pronto para o trabalho! 🚀");
			System.out.println("=========================================");
		};
	}

}
