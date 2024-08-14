package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmailAndPasswordAndRole(String email, String password, String role);
    Optional<User> findByEmail(String email);  // Add this method
    boolean existsByEmail(String email);
}
