package com.social.app.user.series;

import jakarta.persistence.*;

@Entity
@Table(name = "series")
public class Series {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String seriesName;
    private Integer episodes;

    private String imageUrl;

    public Series() { }

    public  Series(String seriesName, Integer episodes, String imageUrl) {
        this.seriesName = seriesName;
        this.episodes = episodes;
        this.imageUrl = imageUrl;
    }

    public Series(Long id, String seriesName, Integer episodes, String imageUrl) {
        this.id = id;
        this.seriesName = seriesName;
        this.episodes = episodes;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public String getSeriesName() {
        return seriesName;
    }

    public Integer getEpisodes() {
        return episodes;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSeriesName(String seriesName) {
        this.seriesName = seriesName;
    }

    public void setEpisodes(Integer episodes) {
        this.episodes = episodes;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
