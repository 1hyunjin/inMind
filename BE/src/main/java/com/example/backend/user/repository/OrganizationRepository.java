package com.example.backend.user.repository;

import com.example.backend.user.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    @Query("SELECT o FROM Organization o WHERE o.addr LIKE %:keyword%")
    List<Organization> findByAddr(@Param("keyword") String keyword);

    @Query("SELECT o FROM Organization o WHERE o.name LIKE %:keyword%")
    List<Organization> findByName(@Param("keyword") String keyword);
}
