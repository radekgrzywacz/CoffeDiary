package com.radekgrzywacz.coffeediaryapi.repository;

import com.radekgrzywacz.coffeediaryapi.dto.RecipeNamesResponse;
import com.radekgrzywacz.coffeediaryapi.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RecipeRepo extends JpaRepository<Recipe, Integer> {

    List<Recipe> findAllByUserId(int appUserId);

    @Query("SELECT new com.radekgrzywacz.coffeediaryapi.dto.RecipeNamesResponse(r.id, r.name) FROM Recipe r WHERE r.user.id = ?1 AND r.brewer = ?2")
    List<RecipeNamesResponse> findRecipesByAppUserIdAndBrewer(Integer appUserId, String brewer);

    Optional<Recipe> findById(int id);
}
