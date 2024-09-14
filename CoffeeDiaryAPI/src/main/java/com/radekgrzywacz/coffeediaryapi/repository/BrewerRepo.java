package com.radekgrzywacz.coffeediaryapi.repository;

import com.radekgrzywacz.coffeediaryapi.entity.Brewer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BrewerRepo extends JpaRepository<Brewer, Integer> {

    List<Brewer> findAllByUserId(int id);
}
