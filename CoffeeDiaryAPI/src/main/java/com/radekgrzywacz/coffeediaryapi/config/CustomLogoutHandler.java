package com.radekgrzywacz.coffeediaryapi.config;


import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.entity.Token;
import com.radekgrzywacz.coffeediaryapi.repository.AppUserRepo;
import com.radekgrzywacz.coffeediaryapi.repository.TokenRepo;
import com.radekgrzywacz.coffeediaryapi.service.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import java.util.List;

@Configuration
public class CustomLogoutHandler implements LogoutHandler {

    private final TokenRepo tokenRepository;
    private final AppUserRepo appUserRepo;
    private final JWTUtils jwtUtils;

    public CustomLogoutHandler(TokenRepo tokenRepository, AppUserRepo appUserRepo, JWTUtils jwtUtils) {
        this.tokenRepository = tokenRepository;
        this.appUserRepo = appUserRepo;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        String token = authHeader.substring(7);
        String username = jwtUtils.extractUsername(token);
        AppUser user = appUserRepo.findByUsername(username).orElseThrow();

        List<Token> storedToken = tokenRepository.findAllTokensByUser(user);


        if(!storedToken.isEmpty()) {
            tokenRepository.deleteAll(storedToken);
        }
    }
}
