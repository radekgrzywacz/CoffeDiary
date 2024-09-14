package com.radekgrzywacz.coffeediaryapi.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "refresh_token")
@Data
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "refresh_token")
    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @Override
    public String toString() {
        return "Token{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", userID=" + (user != null ? user.getId() : " null ") +
                '}';
    }
}
