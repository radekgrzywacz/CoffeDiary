package com.radekgrzywacz.coffeediaryapi.service;

import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.repository.AppUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

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

    public RequestResponse signUp(RequestResponse registrationRequest) {
        RequestResponse resp = new RequestResponse();
        try {
            AppUser appUser = new AppUser();
            appUser.setUsername(registrationRequest.getUsername());
            appUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            appUser.setName(registrationRequest.getName());
            appUser.setEmail(registrationRequest.getEmail());
            appUser.setRole(registrationRequest.getRole());
            AppUser appUserResult = appUserRepo.save(appUser);
            if (appUserResult != null && appUserResult.getId() > 0 ) {
                resp.setAppUser(appUserResult);
                resp.setMessage("User Saved Succesfully");
                resp.setStatusCode(200);
            }
        } catch (Exception ex) {
            resp.setStatusCode(500);
            resp.setError(ex.getMessage());
        }

        return resp;
    }

    public RequestResponse signIn(RequestResponse signinRequest) {
        RequestResponse response = new RequestResponse();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getUsername(), signinRequest.getPassword()));
            var user = appUserRepo.findByUsername(signinRequest.getUsername()).orElseThrow();
            System.out.println("User is: " + user);
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully logged in");


        } catch (Exception ex ){
            response.setStatusCode(500);
            response.setError(ex.getMessage());
        }

        return response;
    }

    public RequestResponse refreshToken(RequestResponse refreshTokenRequest) {
        RequestResponse response = new RequestResponse();
        String appUserUsername = jwtUtils.extractUsername(refreshTokenRequest.getToken());
        AppUser user = appUserRepo.findByUsername(appUserUsername).orElseThrow();

        if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user)) {
            var jwt = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRequest.getRefreshToken());
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully refreshed token");
        } else {
            response.setStatusCode(500);
        }

        return response;
    }

}
