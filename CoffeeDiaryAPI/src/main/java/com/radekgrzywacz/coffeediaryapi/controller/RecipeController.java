package com.radekgrzywacz.coffeediaryapi.controller;

import com.radekgrzywacz.coffeediaryapi.dto.RecipeNamesResponse;
import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.Recipe;
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

    @PostMapping
    public ResponseEntity<RequestResponse> addRecipe(@RequestBody Recipe recipe) {
        return recipeService.addRecipe(recipe);
    }

    @GetMapping("/brewer/{brewer}")
    public ResponseEntity<List<RecipeNamesResponse>> getRecipesTitlesForBrewer(@PathVariable String brewer) {
        return recipeService.getRecipesTitlesForBrewer(brewer);
    }

    // Get a specific recipe by ID
    @GetMapping("/id/{id}")
    public ResponseEntity<Recipe> getRecipe(@PathVariable Integer id) {
        if (id == null) {
            return ResponseEntity.badRequest().build(); // Return 400 if ID is null
        }
        return recipeService.getRecipe(id);
    }
}
