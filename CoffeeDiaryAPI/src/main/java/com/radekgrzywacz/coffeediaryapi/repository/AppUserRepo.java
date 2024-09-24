package com.radekgrzywacz.coffeediaryapi.repository;

import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.entity.Coffee;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppUserRepo extends JpaRepository<AppUser, Integer> {

    Optional<AppUser> findByUsername(String username);

    Optional<AppUser> findByEmail(String username);
}
