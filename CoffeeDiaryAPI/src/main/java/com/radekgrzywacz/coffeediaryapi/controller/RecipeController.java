package com.radekgrzywacz.coffeediaryapi.controller;

import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.Recipe;
import com.radekgrzywacz.coffeediaryapi.service.JWTUtils;
import com.radekgrzywacz.coffeediaryapi.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;
    @Autowired
    private JWTUtils jwtUtils;

    @PostMapping
    public ResponseEntity<RequestResponse> addRecipe(@RequestHeader("Authorization") String token, @RequestBody Recipe recipe) {
        token = token.substring(7);
        String username = jwtUtils.extractUsername(token);
        return recipeService.addRecipe(recipe, username);
    }
}
