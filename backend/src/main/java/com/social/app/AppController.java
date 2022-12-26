package com.social.app;

import com.social.app.user.User;
import com.social.app.user.series.Series;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AppController {
    @Autowired
    private final AppService appService;

    public AppController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping(path = "/")
    private List<User> getUsers() {
        return appService.displayUsers();
    }

    @GetMapping(path = "/query/{email}")
    private User getUser(@PathVariable String email) {
        return appService.displayUser(email);
    }

    @PostMapping(path = "/")
    private User postUser(@RequestBody User user) {
        return appService.createUser(user);
    }

    @PostMapping(path = "/{id}/series")
    private void postUserSeries(@PathVariable Long id, @RequestBody Series series) {
        appService.addUserSeries(id, series);
    }

    @PutMapping(path = "/{id}")
    private void put(@PathVariable Long id, @RequestBody User user) {
        appService.updateUser(id, user);
    }

    @DeleteMapping(path = "/{id}")
    private void deleteUser(@PathVariable Long id) {
        appService.deleteUser(id);
    }

    @DeleteMapping(path = "/{id}/series/{seriesId}")
    private void deleteUserSeries(@PathVariable Long id, @PathVariable Long seriesId) {
        appService.deleteUserSeries(id, seriesId);
    }
}
