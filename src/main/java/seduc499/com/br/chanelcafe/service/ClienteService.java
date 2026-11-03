package seduc499.com.br.chanelcafe.service;

import seduc499.com.br.chanelcafe.Cliente;
import seduc499.com.br.chanelcafe.repository.ClienteRepository;

import org.springframework.stereotype.Service;

import seduc499.com.br.chanelcafe.Cliente;
import seduc499.com.br.chanelcafe.repository.ClienteRepository;

import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Cadastrar cliente
    public Cliente cadastrarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // Buscar cliente pelo e-mail
    public Cliente buscarPorEmail(String email) {
        return clienteRepository.findByEmail(email).orElse(null);
    }

}