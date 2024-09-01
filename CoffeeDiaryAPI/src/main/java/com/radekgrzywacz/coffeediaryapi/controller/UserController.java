package com.radekgrzywacz.coffeediaryapi.controller;

import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.entity.AuthenticationResponse;
import com.radekgrzywacz.coffeediaryapi.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody AppUser request, BindingResult bindingResult) {
        return authService.register(request, bindingResult);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AppUser request) {
        return authService.login(request);
    }

    @PostMapping("/refresh_token")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        return authService.refreshToken(request, response);
    }

//    @PostMapping("/login")
//    public ResponseEntity<RequestResponse> login(@RequestBody RequestResponse loginRequest) {
//        RequestResponse response = authService.login(loginRequest);
//        if (response.getStatusCode() != 200) {
//            return ResponseEntity.badRequest().body(response);
//        }
//
//        return ResponseEntity.ok(response);
//    }
//
//
//    @PostMapping("/refresh")
//    public ResponseEntity<RequestResponse> refreshToken(@Valid @RequestBody RequestResponse refreshTokenRequest) {
//        try {
//            return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
//        } catch (Exception e) {
//            log.warn(e.getMessage());
//            return ResponseEntity.badRequest().body(refreshTokenRequest);
//        }
//
//    }
}
