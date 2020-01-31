package com.mitocode.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.mitocode.model.Rol;
import com.mitocode.repo.IRolRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mitocode.model.Menu;
import com.mitocode.repo.IMenuRepo;
import com.mitocode.service.IMenuService;

@Service
public class MenuServiceImpl implements IMenuService {

	@Autowired
	private IMenuRepo repo;

	@Override
	public Menu registrar(Menu menu) {
		return repo.save(menu);
	}

	@Override
	public Menu modificar(Menu menu) {
		Optional<Menu> op = repo.findById(menu.getIdMenu());
		Menu menuAnterior = op.orElseGet(Menu::new);
		if(!menu.getNombre().equals(menuAnterior.getNombre()) ||
				!menu.getIcono().equals(menuAnterior.getIcono()) || !menu.getUrl().equals(menuAnterior.getUrl())){
			menu.setRoles(menuAnterior.getRoles());
		}
		return repo.save(menu);
	}

	@Override
	public boolean eliminar(Integer idMenu) {
		repo.deleteById(idMenu);
		return true;
	}

	@Override
	public Menu leerPorId(Integer idMenu) {
		Optional<Menu> op = repo.findById(idMenu);
		return op.isPresent() ? op.get() : new Menu();
	}

	@Override
	public List<Menu> listar() {
		return repo.findAll();
	}


	@Override
	public Page<Menu> listarPageable(Pageable pageable) {
		return repo.findAll(pageable);
	}

	@Override
	public List<Menu> listarMenuPorUsuario(String nombre) {		
		List<Menu> menus = new ArrayList<>();
		repo.listarMenuPorUsuario(nombre).forEach( x -> {
			Menu m = new Menu();
			m.setIdMenu((Integer.parseInt(String.valueOf(x[0]))));
			m.setIcono(String.valueOf(x[1]));
			m.setNombre(String.valueOf(x[2]));
			m.setUrl(String.valueOf(x[3]));		
	
			menus.add(m);
		});
		return menus;			
	}

}
