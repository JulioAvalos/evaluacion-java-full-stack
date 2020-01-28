package com.mitocode.controller;

import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.Rol;
import com.mitocode.service.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/roles")
public class RolController {

    @Autowired
    private IRolService service;

    @GetMapping
    public ResponseEntity<List<Rol>> listar(){
        List<Rol> lista = service.listar();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> listarPorId(@PathVariable("id") Integer id){
        Rol rol = service.leerPorId(id);
        if(rol.getIdRol() == null) {
            throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
        }
        return new ResponseEntity<>(rol, HttpStatus.OK);
    }

    @GetMapping("/pageable")
    public ResponseEntity<Page<Rol>> listarPageable(Pageable pageable) {
        Page<Rol> pacientes = service.listarPageable(pageable);
        return new ResponseEntity<>(pacientes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> registrar(@Valid @RequestBody Rol Rol) {
        Rol rol = service.registrar(Rol);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(rol.getIdRol()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping
    public ResponseEntity<Rol> modificar(@Valid @RequestBody Rol Rol) {
        Rol rol = service.modificar(Rol);
        return new ResponseEntity<>(rol, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminar(@PathVariable("id") Integer id){
        Rol rol = service.leerPorId(id);
        if(rol.getIdRol() == null) {
            throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
        }
        service.eliminar(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
