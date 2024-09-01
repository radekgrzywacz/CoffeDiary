package com.radekgrzywacz.coffeediaryapi.repository;

import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token, Integer> {

    List<Token> findAllTokensByUser(AppUser user);

    Optional<Token> findByToken(String token);
}

