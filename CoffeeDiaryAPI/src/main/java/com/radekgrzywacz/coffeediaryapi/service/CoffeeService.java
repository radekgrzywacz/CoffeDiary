package com.radekgrzywacz.coffeediaryapi.service;

import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.entity.Coffee;
import com.radekgrzywacz.coffeediaryapi.repository.AppUserRepo;
import com.radekgrzywacz.coffeediaryapi.repository.CoffeeRepo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CoffeeService {

    @Autowired
    private CoffeeRepo coffeeRepo;
    @Autowired
    private AppUserRepo userRepo;

    public ResponseEntity<RequestResponse> addCoffee(Coffee coffee) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AppUser user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        coffee.setUser(user);

        Coffee savedCoffee = coffeeRepo.save(coffee);
        RequestResponse requestResponse = new RequestResponse();

        if (savedCoffee != null) {
            requestResponse.setResponse(savedCoffee.toString());
            return ResponseEntity.ok().body(requestResponse);
        } else {
            requestResponse.setError("Couldn't save coffee");
            return ResponseEntity.badRequest().body(requestResponse);
        }
    }

    public ResponseEntity<List<Coffee>> getCoffees() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AppUser user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<Coffee> coffees = coffeeRepo.findAllByUserId(user.getId());
        if (coffees != null && !coffees.isEmpty()) {
            return ResponseEntity.ok().body(coffees);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
