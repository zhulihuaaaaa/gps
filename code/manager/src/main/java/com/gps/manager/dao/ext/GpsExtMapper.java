package com.gps.manager.dao.ext;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.gps.manager.entity.dto.GpsDto;
import com.gps.manager.entity.vo.GpsVo;

public interface GpsExtMapper {
    List<GpsVo> findPage(@Param("dto") GpsDto dto);
}