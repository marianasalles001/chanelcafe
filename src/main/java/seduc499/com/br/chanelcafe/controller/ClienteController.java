package seduc499.com.br.chanelcafe.controller;

import seduc499.com.br.chanelcafe.Cliente;
import seduc499.com.br.chanelcafe.service.ClienteService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/cadastro")
    public String cadastro() {
        return "cadastro";
    }

    @PostMapping("/cadastro")
    public String cadastrar(
            @RequestParam String nome,
            @RequestParam String email,
            @RequestParam String senha,
            @RequestParam String confirmarSenha,
            RedirectAttributes redirectAttributes) {

        if (!senha.equals(confirmarSenha)) {
            redirectAttributes.addFlashAttribute(
                    "erro", "As senhas não são iguais."
            );
            return "redirect:/cadastro";
        }

        Cliente cliente = new Cliente(nome, email, senha);
        clienteService.cadastrarCliente(cliente);

        redirectAttributes.addFlashAttribute(
                "sucesso", "Cadastro realizado com sucesso!"
        );

        return "redirect:/login";
    }
}