package com.mitocode.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mitocode.model.Menu;
import com.mitocode.service.IMenuService;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

@RestController
@RequestMapping("/menus")
public class MenuController {
	
	@Autowired
	private IMenuService service;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Menu>> listar() {
		List<Menu> menues = service.listar();
		return new ResponseEntity<>(menues, HttpStatus.OK);
	}
	
	@PostMapping(value = "/usuario", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Menu>> listar(@RequestBody String nombre) {
		List<Menu> menus = service.listarMenuPorUsuario(nombre);
		return new ResponseEntity<>(menus, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Menu> listarPorId(@PathVariable("id") Integer id){
		Menu menu = service.leerPorId(id);
		if(menu.getIdMenu() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		return new ResponseEntity<>(menu, HttpStatus.OK);
	}

	@GetMapping("/pageable")
	public ResponseEntity<Page<Menu>> listarPageable(Pageable pageable) {
		Page<Menu> pacientes = service.listarPageable(pageable);
		return new ResponseEntity<>(pacientes, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Menu Menu) {
		Menu menu = service.registrar(Menu);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(menu.getIdMenu()).toUri();
		return ResponseEntity.created(location).build();
	}

	@PutMapping
	public ResponseEntity<Menu> modificar(@Valid @RequestBody Menu Menu) {
		Menu menu = service.modificar(Menu);
][]		return new ResponseEntity<>(menu, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> eliminar(@PathVariable("id") Integer id){
		Menu menu = service.leerPorId(id);
		if(menu.getIdMenu() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		service.eliminar(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
}
