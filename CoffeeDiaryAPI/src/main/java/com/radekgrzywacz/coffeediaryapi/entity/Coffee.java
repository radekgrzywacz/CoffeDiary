package com.radekgrzywacz.coffeediaryapi.entity;

import java.util.Date;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Coffee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String Name;
    private String Roastery;
    private String Country;
    private String Region;
    private String Processing;
    private String RoastLevel;
    private Date RoastDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private AppUser user;

    @Override
    public String toString() {
        return "Coffee [id=" + id + ", Name=" + Name + ", Roastery=" + Roastery + ", Country=" + Country + ", Region="
                + Region + ", Processing=" + Processing + ", RoastLevel=" + RoastLevel + ", RoastDate=" + RoastDate +
                ", userId=" + (user != null ? user.getId() : "null") +
                '}';
    }

}
