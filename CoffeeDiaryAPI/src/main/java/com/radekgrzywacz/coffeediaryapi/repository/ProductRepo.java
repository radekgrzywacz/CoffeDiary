package com.radekgrzywacz.coffeediaryapi.repository;

import com.radekgrzywacz.coffeediaryapi.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Integer> {

}
