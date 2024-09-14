package com.radekgrzywacz.coffeediaryapi.service;

import com.radekgrzywacz.coffeediaryapi.dto.RequestResponse;
import com.radekgrzywacz.coffeediaryapi.entity.AppUser;
import com.radekgrzywacz.coffeediaryapi.entity.Brewer;
import com.radekgrzywacz.coffeediaryapi.repository.AppUserRepo;
import com.radekgrzywacz.coffeediaryapi.repository.BrewerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrewerService {

    @Autowired
    private BrewerRepo brewerRepo;

    @Autowired
    private AppUserRepo appUserRepo;

    public ResponseEntity<RequestResponse> addBrewer(Brewer brewer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AppUser user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        brewer.setUser(user);

        Brewer savedBrewer = brewerRepo.save(brewer);
        RequestResponse requestResponse = new RequestResponse();

        if (savedBrewer != null) {
            requestResponse.setResponse(savedBrewer.toString());
            return ResponseEntity.ok().body(requestResponse);
        } else {
            requestResponse.setError("Couldn't save brewer");
            return ResponseEntity.badRequest().body(requestResponse);
        }
    }

    public ResponseEntity<List<Brewer>> getBrewers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AppUser user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        List<Brewer> brewers = brewerRepo.findAllByUserId(user.getId());
        if(brewers != null && !brewers.isEmpty()) {
            return ResponseEntity.ok().body(brewers);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
