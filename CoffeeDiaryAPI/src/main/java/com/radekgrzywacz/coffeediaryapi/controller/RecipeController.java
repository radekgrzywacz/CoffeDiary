package com.radekgrzywacz.coffeediaryapi.controller;

import com.radekgrzywacz.coffeediaryapi.dto.RecipeNamesRequest;
import com.radekgrzywacz.coffeediaryapi.dto.RecipeNamesResponse;
import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.Recipe;
import com.radekgrzywacz.coffeediaryapi.service.JWTUtils;
import com.radekgrzywacz.coffeediaryapi.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;
    @Autowired
    private JWTUtils jwtUtils;

    @PostMapping
    public ResponseEntity<RequestResponse> addRecipe(@RequestBody Recipe recipe) {
        return recipeService.addRecipe(recipe);
    }

    @GetMapping("/{brewer}")
    public ResponseEntity<List<RecipeNamesResponse>> getRecipesTitlesForBrewer(@PathVariable String brewer) {
        return recipeService.getRecipesTitlesForBrewer(brewer);
    }
}
