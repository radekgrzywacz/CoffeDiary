package com.radekgrzywacz.coffeediaryapi.service;

import com.radekgrzywacz.coffeediaryapi.dto.RecipeNamesResponse;
import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.entity.Recipe;
import com.radekgrzywacz.coffeediaryapi.repository.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepo recipeRepository;

    public ResponseEntity<RequestResponse> addRecipe(Recipe recipe) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AppUser user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        recipe.setUser(user);

        if (recipe.getSteps() != null) {
            recipe.getSteps().forEach(step -> step.setRecipe(recipe));
        }

        Recipe savedRecipe = recipeRepository.save(recipe);
        RequestResponse requestResponse = new RequestResponse();

        if (savedRecipe != null) {
            requestResponse.setResponse(savedRecipe.toString());
            return ResponseEntity.ok().body(requestResponse);
        } else {
            requestResponse.setError("Couldn't save recipe");
            return ResponseEntity.badRequest().body(requestResponse);
        }
    }

    public ResponseEntity<List<RecipeNamesResponse>> getRecipesTitlesForBrewer(String brewer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AppUser)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        AppUser user = (AppUser) authentication.getPrincipal();
        if (user != null) {
            int id = user.getId();

            List<RecipeNamesResponse> recipes = recipeRepository.findRecipesByAppUserIdAndBrewer(id, brewer);

            if (recipes != null) {
                return ResponseEntity.ok().body(recipes);
            }
        }

        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Recipe> getRecipe(int id) {
        Recipe recipe = recipeRepository.findById(id).get();

        if (recipe != null) {
            return ResponseEntity.ok().body(recipe);
        }

        return ResponseEntity.notFound().build();
    }
}
