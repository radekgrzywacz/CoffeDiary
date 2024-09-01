package com.radekgrzywacz.coffeediaryapi.service;

import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.entity.AuthenticationResponse;
import com.radekgrzywacz.coffeediaryapi.entity.Token;
import com.radekgrzywacz.coffeediaryapi.repository.AppUserRepo;
import com.radekgrzywacz.coffeediaryapi.repository.TokenRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;

@Slf4j
@Service
public class AuthService {

    @Autowired
    private AppUserRepo appUserRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenRepo tokenRepo;


    public ResponseEntity<AuthenticationResponse> register(AppUser request, BindingResult bindingResult) {
        StringBuilder errors = new StringBuilder();
        if(bindingResult.hasErrors()) {
           for(FieldError error : bindingResult.getFieldErrors()) {
               errors.append(error.getDefaultMessage() + "\n");
           }
        }

        AppUser userExistanceCheck = appUserRepo.findByUsername(request.getUsername()).orElse(null);
        if(userExistanceCheck != null) {
            errors.append("Username already exists!\n");
        }

        userExistanceCheck = null;

        userExistanceCheck = appUserRepo.findByEmail(request.getEmail()).orElse(null);
        if(userExistanceCheck != null) {
            errors.append("Email already exists!\n");
        }

        if(errors.length() > 0) {
            return ResponseEntity.badRequest().body(new AuthenticationResponse(errors.toString()));
        }



        AppUser user = new AppUser();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        user = appUserRepo.save(user);

        String accessToken = jwtUtils.generateAccessToken(user);
        String refreshToken = jwtUtils.generateRefreshToken(user);

        saveUserToken(refreshToken, user);

        return ResponseEntity.ok().body(new AuthenticationResponse(accessToken, refreshToken));
    }


    public AuthenticationResponse login(AppUser request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        AppUser user = appUserRepo.findByUsername(request.getUsername()).orElseThrow();
        String accessToken = jwtUtils.generateAccessToken(user);
        String refreshToken = jwtUtils.generateRefreshToken(user);
        deleteUserToken(user);
        saveUserToken(refreshToken, user);

        return new AuthenticationResponse(accessToken, refreshToken);
    }

    private void saveUserToken(String jwt, AppUser user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setUser(user);
        tokenRepo.save(token);
    }

    private void deleteUserToken(AppUser user) {
        List<Token> tokens = tokenRepo.findAllTokensByUser(user);
        tokenRepo.deleteAll(tokens);

    }

    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(authHeader != null && !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);

        String username = jwtUtils.extractUsername(token);

        AppUser user = appUserRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user found"));

        if(jwtUtils.isValidRefreshToken(token, user)){
            String accessToken = jwtUtils.generateAccessToken(user);
            String refreshToken = jwtUtils.generateRefreshToken(user);
            deleteUserToken(user);
            saveUserToken(refreshToken, user);

            return new ResponseEntity(new AuthenticationResponse(accessToken, refreshToken), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

//
//    public RequestResponse login(@Valid RequestResponse signinRequest) {
//        RequestResponse response = new RequestResponse();
//
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getUsername(), signinRequest.getPassword()));
//            var user = appUserRepo.findByUsername(signinRequest.getUsername()).orElseThrow();
//            System.out.println("User is: " + user);
//            var jwt = jwtUtils.generateAccessToken(user);
//            var refreshToken = jwtUtils.generateRefreshToken(user);
//            response.setStatusCode(200);
//            response.setToken(jwt);
//            response.setRefreshToken(refreshToken);
//            response.setExpirationTime("24Hr");
//            response.setMessage("Successfully logged in");
//
//
//        } catch (InternalAuthenticationServiceException ex) {
//            response.setStatusCode(401);
//            response.setError("Invalid username or password");
//        } catch (Exception ex) {
//            response.setStatusCode(500);
//            response.setMessage(ex.getMessage());
//        }
//
//        return response;
//    }
//
////    public RequestResponse refreshToken(RequestResponse refreshTokenRequest) {
////        RequestResponse response = new RequestResponse();
////        String appUserUsername = null;
////
////        try {
////            appUserUsername = jwtUtils.extractUsername(refreshTokenRequest.getToken());
////        } catch (ExpiredJwtException e) {
////            appUserUsername = e.getClaims().getSubject();
////        }
////
////        if (appUserUsername != null) {
////            AppUser user = appUserRepo.findByUsername(appUserUsername).orElseThrow();
////
////            if (jwtUtils.isTokenValid(refreshTokenRequest.getRefreshToken(), user)) {
////                var jwt = jwtUtils.generateToken(user);
////                response.setStatusCode(200);
////                response.setToken(jwt);
////                response.setRefreshToken(refreshTokenRequest.getRefreshToken());
////                response.setExpirationTime("30min");
////                response.setMessage("Successfully refreshed token");
////            } else {
////                response.setStatusCode(500);
////                response.setError("Invalid refresh token.");
////            }
////        } else {
////            response.setStatusCode(400);
////            response.setError("Invalid or expired token.");
////        }
////
////        return response;
////    }
//
//    public RequestResponse refreshToken(RequestResponse refreshTokenRequest) {
//        RequestResponse response = new RequestResponse();
//        try {
//            // Extract username from the token
//            String appUserUsername = jwtUtils.extractUsername(refreshTokenRequest.getToken());
//
//            // If username extraction fails, handle the case
//            if (appUserUsername == null) {
//                response.setStatusCode(400);
//                response.setError("Invalid or expired token.");
//                return response;
//            }
//
//            // Fetch the user from the database
//            AppUser user = appUserRepo.findByUsername(appUserUsername)
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//
//            // Validate the refresh token
//            if (jwtUtils.isTokenValid(refreshTokenRequest.getRefreshToken(), user)) {
//                // Generate new JWT token
//                String jwt = jwtUtils.generateAccessToken(user);
//                response.setStatusCode(200);
//                response.setToken(jwt);
//                response.setRefreshToken(refreshTokenRequest.getRefreshToken());
//                response.setExpirationTime("30min");
//                response.setMessage("Successfully refreshed token");
//            } else {
//                response.setStatusCode(400);
//                response.setError("Invalid refresh token.");
//            }
//        } catch (ExpiredJwtException e) {
//            // Handle expired JWT exceptions separately
//            response.setStatusCode(400);
//            response.setError("Refresh token expired.");
//            log.error("Refresh token expired", e);
//        } catch (Exception e) {
//            // General error handling
//            response.setStatusCode(500);
//            response.setError("An error occurred while refreshing token.");
//            log.error("Error refreshing token", e);
//        }
//
//        return response;
//    }

}
