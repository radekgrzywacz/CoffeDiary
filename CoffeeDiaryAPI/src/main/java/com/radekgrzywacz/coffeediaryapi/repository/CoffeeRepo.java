package com.radekgrzywacz.coffeediaryapi.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.radekgrzywacz.coffeediaryapi.entity.Coffee;

public interface CoffeeRepo extends JpaRepository<Coffee, Integer> {

    List<Coffee> findAllByUserId(int id);

}
