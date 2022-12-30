package com.social.app.user;

import com.social.app.user.series.Series;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Series> series;

    public User() { }

    public User(String firstName, String lastName, String email, String password, List<Series> series) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.series = series;
    }

    public User(Long id, String firstName, String lastName, String email, String password, List<Series> series) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.series = series;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public List<Series> getSeries() {
        return series;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSeries(List<Series> series) {
        if (this.series == null) {
            this.series = series;
        } else {
            this.series.retainAll(series);
            this.series.addAll(series);
        }
    }

    public void addSeries(Series seriesToAdd) {
        this.series.add(seriesToAdd);
    }

    public void updateSeries(Long id, Series series){
        for(int i=0; i<this.series.size(); i++) {
            if(this.series.get(i).getId() == id) {
                this.series.get(i).setSeriesName(series.getSeriesName());
                this.series.get(i).setEpisodes(series.getEpisodes());
                this.series.get(i).setImageUrl(series.getImageUrl());
                this.series.get(i).setRating(series.getRating());
                this.series.get(i).setComments(series.getComments());
            }
        }
    }

    public void deleteSeries(Long id) {
        for(int i=0; i<this.series.size(); i++) {
            if(series.get(i).getId() == id) {
                this.series.remove(i);
            }
        }
    }
}
