package com.radekgrzywacz.coffeediaryapi.service;

import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.repository.TokenRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Component
public class JWTUtils {

    private final TokenRepo tokenRepo;
    private SecretKey key;

    @Value("${application.security.jwt.secret-key}")
    private String secretString;

    @Value("${application.security.jwt.access-token-expiration}")
    private long accessTokenExpiration;

    @Value("${application.security.jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    public JWTUtils(TokenRepo tokenRepo) {
        this.tokenRepo = tokenRepo;
    }

    @PostConstruct
    private void init() {
        byte[] keyBytes = secretString.getBytes(StandardCharsets.UTF_8);
        this.key = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(userDetails, accessTokenExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails, refreshTokenExpiration);
    }

    public String generateToken(UserDetails userDetails, long expireTime) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(key)
                .compact();
    }


    //    public String extractUsername(String token) {
//        return extractClaims(token, Claims::getSubject);
//    }
//
//    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) throws ExpiredJwtException {
//        try {
//            return claimsTFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
//        } catch (ExpiredJwtException e) {
//            return claimsTFunction.apply(e.getClaims());
//        }
//    }
//
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);

        //boolean isValidToken = tokenRepo.findByToken(token).isPresent();

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean isValidRefreshToken(String token, AppUser user) {
        final String username = extractUsername(token);

        boolean isValidToken = tokenRepo.findByToken(token).isPresent();

        return (username.equals(user.getUsername()) && !isTokenExpired(token) && isValidToken);
    }
}
