package com.mitocode.service.impl;

import com.mitocode.model.Rol;
import com.mitocode.repo.IRolRepo;
import com.mitocode.service.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolServiceImpl  implements IRolService {

    @Autowired
    private IRolRepo repo;

    @Override
    public Rol registrar(Rol rol) {
        return repo.save(rol);
    }

    @Override
    public Rol modificar(Rol rol) {
        return repo.save(rol);
    }

    @Override
    public List<Rol> listar() {
        return repo.findAll();
    }

    @Override
    public Page<Rol> listarPageable(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public Rol leerPorId(Integer id) {
        Optional<Rol> op = repo.findById(id);
        return op.isPresent() ? op.get() : new Rol();
    }

    @Override
    public boolean eliminar(Integer id) {
        repo.deleteById(id);
        return true;
    }
}
