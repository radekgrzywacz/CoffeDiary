package com.radekgrzywacz.coffeediaryapi.dto;

import lombok.AllArgsConstructor;


public class RecipeNamesResponse {
    private String name;
    private int id;

    public RecipeNamesResponse(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
