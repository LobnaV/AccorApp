package com.viggo.accor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String username;


	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetails(Long id, String username, String password,
	                   Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.authorities = authorities;
	}

	public static UserDetails build(User user){
		List<GrantedAuthority> authorities = user.getRoles().stream()
			.map(role -> new SimpleGrantedAuthority(role.getName().name()))
			.collect(Collectors.toList());

		return new UserDetails(
			user.getId(),
			user.getUsername(),
			user.getPassword(),
			authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities(){
		return authorities;
	}

	public Long getId() {
		return id;
	}

	public String getPassword() {
		return password;
	}

	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o){
		if (this == o)
			return true;
		if (o == null || getClass() !=o.getClass())
			return false;
		UserDetails user = (UserDetails) o;
		return Objects.equals(id,user.id);
	}


}
