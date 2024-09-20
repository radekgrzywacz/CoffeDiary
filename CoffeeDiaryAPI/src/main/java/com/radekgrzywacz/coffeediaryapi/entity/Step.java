package com.radekgrzywacz.coffeediaryapi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Step {

    @Override
    public String toString() {
        return "Step{" +
                "time=" + time +
                ", id=" + id +
                ", description='" + description + '\'' +
                ", recipe=" + recipe.getId() +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String description;
    private int time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    @JsonBackReference
    private Recipe recipe;
}
