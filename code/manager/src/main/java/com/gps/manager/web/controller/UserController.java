package com.gps.manager.web.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gps.manager.entity.User;
import com.gps.manager.service.UserService;
import com.gps.manager.web.util.AjaxResult;
import com.gps.manager.web.util.MessageCode;

@Controller
@RequestMapping(value="/user")
public class UserController {
    @Autowired
    private UserService userService;
	
    @RequestMapping(value="/loginValid")
    @ResponseBody
    public AjaxResult loginValid(HttpServletRequest request,@RequestBody User user){
    		try {
    			return AjaxResult.createSuccessResult(userService.loginValid(user));
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
    		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);
    }
}
