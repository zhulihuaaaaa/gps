package com.gps.manager.service;

import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.springframework.web.multipart.MultipartFile;

import com.gps.manager.entity.vo.AttachVo;

public interface BaseService {
	
	public AttachVo uploadFile(MultipartFile multipartfile);
	
	public Map<String, Long> handleFile(HSSFSheet sheet, AttachVo attachVo);
	
	public Boolean judgeRepetition(String dev_sno, Long dev_id);
	
}
