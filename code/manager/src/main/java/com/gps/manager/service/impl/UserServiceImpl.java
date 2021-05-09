package com.gps.manager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.gps.manager.dao.UserMapper;
import com.gps.manager.entity.User;
import com.gps.manager.entity.UserExample;
import com.gps.manager.service.UserService;

@Service("UserService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper UserMapper;
	
	public boolean loginValid(User user) {
		UserExample example = new UserExample();
		UserExample.Criteria criteria = example.createCriteria();
		if(!StringUtils.isEmpty(user.getUsername())) {
			criteria.andUsernameEqualTo(user.getUsername());
		}
		if(!StringUtils.isEmpty(user.getUserpass())) {
			criteria.andUserpassEqualTo(user.getUserpass());
		}
		List<User> list = UserMapper.selectByExample(example);
		if(list == null||list.size() == 0) {
			return false;
		}
		return true;
	}
	

//	
//	public List<Gps> selectAll() {
//		GpsExample example = new GpsExample();
//		return gpsMapper.selectByExample(example);
//	}
}
