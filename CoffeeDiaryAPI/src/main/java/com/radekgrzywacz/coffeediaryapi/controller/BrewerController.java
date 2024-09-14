package com.radekgrzywacz.coffeediaryapi.controller;

import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.Brewer;
import com.radekgrzywacz.coffeediaryapi.service.BrewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brewers")
public class BrewerController {

    @Autowired
    private BrewerService brewerService;

    @PostMapping
    public ResponseEntity<RequestResponse> createBrewer(@RequestBody Brewer brewer) {
        return brewerService.addBrewer(brewer);
    }

    @GetMapping
    public ResponseEntity<List<Brewer>> getBrewers() {
        return brewerService.getBrewers();
    }
}
