package com.gps.manager.web.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
	
	@RequestMapping("/index")
	public ModelAndView main() {
		ModelAndView modelAndView = new ModelAndView("/user/login");
		return modelAndView;
	}
	
}
