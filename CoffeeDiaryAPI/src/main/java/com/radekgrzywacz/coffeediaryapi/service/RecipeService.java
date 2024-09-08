package com.radekgrzywacz.coffeediaryapi.service;

import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.entity.Recipe;
import com.radekgrzywacz.coffeediaryapi.repository.AppUserRepo;
import com.radekgrzywacz.coffeediaryapi.repository.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepo recipeRepository;
    @Autowired
    private AppUserRepo userRepository;

    public ResponseEntity<RequestResponse> addRecipe(Recipe recipe, String username) {
        Optional<AppUser> appUser = userRepository.findByUsername(username);
        if (appUser.isPresent()) {
            // Set the associated user
            recipe.setAppUser(appUser.get());

            // Ensure that all steps in the recipe are properly linked to the recipe
            if (recipe.getSteps() != null) {
                recipe.getSteps().forEach(step -> step.setRecipe(recipe));
            }

            // Save the recipe (and the steps, thanks to CascadeType.ALL)
            Recipe savedRecipe = recipeRepository.save(recipe);
            RequestResponse requestResponse = new RequestResponse();

            // Handle successful save
            if (savedRecipe != null) {
                requestResponse.setResponse(savedRecipe.toString());
                return ResponseEntity.ok().body(requestResponse);
            }
        }

        // Handle error scenarios
        RequestResponse errorResponse = new RequestResponse();
        errorResponse.setError("Couldn't save recipe");
        return ResponseEntity.badRequest().body(errorResponse);
    }
}
