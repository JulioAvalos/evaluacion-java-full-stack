package com.mitocode.service;

import com.mitocode.model.Rol;
import com.mitocode.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UsuarioService extends ICRUD<Usuario>{

    Page<Usuario> listarPageable(Pageable pageable);
}
