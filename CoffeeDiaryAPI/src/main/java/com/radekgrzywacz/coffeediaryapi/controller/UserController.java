package com.radekgrzywacz.coffeediaryapi.controller;

import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RequestResponse> register(@RequestBody RequestResponse registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<RequestResponse> login(@RequestBody RequestResponse loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }


    @PostMapping("/refresh")
    public ResponseEntity<RequestResponse> refreshToken(@RequestBody RequestResponse refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }
}
