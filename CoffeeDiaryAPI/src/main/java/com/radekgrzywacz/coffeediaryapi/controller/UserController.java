package com.radekgrzywacz.coffeediaryapi.controller;

import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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
    public ResponseEntity<RequestResponse> register(@Valid @RequestBody RequestResponse registerRequest, BindingResult bindingResult) {
        StringBuilder errors = new StringBuilder();
        boolean canSave = true;
        if (bindingResult.hasErrors()) {
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                errors.append(fieldError.getDefaultMessage()).append("\n");
            }

            canSave = false;
//            RequestResponse errorResponse = new RequestResponse();
//            errorResponse.setMessage(errors.toString().trim());
//            errorResponse.setStatusCode(400);
//
//            return ResponseEntity.badRequest().body(errorResponse);
        }


        RequestResponse response = authService.register(registerRequest, canSave);
        if (response.getStatusCode() != 200 || !errors.isEmpty()) {
            errors.append(response.getMessage() + "\n");
            response.setMessage(errors.toString());
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<RequestResponse> login(@RequestBody RequestResponse loginRequest) {
        RequestResponse response = authService.login(loginRequest);
        if (response.getStatusCode() != 200) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }


    @PostMapping("/refresh")
    public ResponseEntity<RequestResponse> refreshToken(@Valid @RequestBody RequestResponse refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }
}
