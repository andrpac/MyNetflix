package com.social.app;

import com.social.app.user.UserRepository;
import com.social.app.user.User;
import com.social.app.user.series.Series;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {

    @Autowired
    private final UserRepository userRepository;

    public AppService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> displayUsers() {
        return userRepository.findAll();
    }

    public User displayUser(String email) {
        return userRepository.getUserByEmail(email).orElse(null);
    }

    public void createUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(Long id, User user) {
        User userToUpdate = userRepository.findById(id).orElseThrow(()
                -> new IllegalStateException("User does not exist!"));

        userToUpdate.setFirstName(user.getFirstName());
        userToUpdate.setLastName(user.getLastName());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setSeries(user.getSeries());
        userRepository.save(userToUpdate);
    }

    public void addUserSeries(Long id, Series series) {
        User userToUpdate = userRepository.findById(id).orElseThrow(()
                -> new IllegalStateException("User does not exist!"));

        userToUpdate.addSeries(series);
        userRepository.save(userToUpdate);
    }

    public void deleteUser(Long id) {
        User userToDelete = userRepository.findById(id).orElseThrow(()
            -> new IllegalStateException(("User does not exist!")));

        userRepository.deleteById(id);
    }

    public void deleteUserSeries(Long id, Long seriesId) {
        User userToUpdate = userRepository.findById(id).orElseThrow(()
                -> new IllegalStateException(("User does not exist!")));

        userToUpdate.deleteSeries(seriesId);
        userRepository.save(userToUpdate);
    }
}
