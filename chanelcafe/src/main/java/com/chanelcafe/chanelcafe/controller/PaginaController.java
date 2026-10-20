package com.chanelcafe.chanelcafe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaginaController {

    @GetMapping("/")
    public String inicio() {
        return "index";
    }

    @GetMapping("/produtos")
    public String produtos() {
        return "produtos";
    }
}