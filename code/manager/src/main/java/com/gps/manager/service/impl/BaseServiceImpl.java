package com.gps.manager.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.gps.manager.dao.GpsMapper;
import com.gps.manager.entity.GpsExample;
import com.gps.manager.entity.vo.AttachVo;
import com.gps.manager.service.BaseService;

@Service("BaseService")
public class BaseServiceImpl implements BaseService {

	@Autowired
	private GpsMapper gpsMapper;
	
	public AttachVo uploadFile(MultipartFile multipartfile){
		InputStream is = null;
		HSSFWorkbook wb = null;
		AttachVo attachVo = new AttachVo();
		try {
			String filePath = "";
			attachVo.setFileName(multipartfile.getOriginalFilename());
			attachVo.setFilePath(filePath);
			attachVo.setCreateTime(new Date());
			File directory = new File(".");
			String tomcatUrl = System.getProperty("user.dir");

			File tempFile = new File(tomcatUrl.substring(0,tomcatUrl.length()-4)+"/uploadExcel/gps_" + new Date().getTime() + ".xls");
			multipartfile.transferTo(tempFile);
			is = new FileInputStream(tempFile);
			int index = 0;
			wb = new HSSFWorkbook(is);
			HSSFSheet sheet = wb.getSheetAt(index);
			Map<String, Long> map = handleFile(sheet,attachVo);
			if(map != null) {
				attachVo.setMap(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
					wb.close();
				} catch (IOException e) {
					is = null;
					e.printStackTrace();
				}
			}
		}
		return attachVo;
	}
	
	/**
	 * 解析excel
	 */
	public Map<String, Long> handleFile(HSSFSheet sheet,AttachVo attachVo) {
		Map<String, Long> map = new HashMap<String, Long>();
		Map<String, Long> map_error = new HashMap<String, Long>();
		for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
			HSSFRow row = sheet.getRow(i);
			if(!StringUtils.isEmpty(row.getCell(0)) && !StringUtils.isEmpty(row.getCell(1))) {
				String dev_sno = row.getCell(0).toString();
				DecimalFormat df = new DecimalFormat("0");
				String dev_id_temp = df.format(row.getCell(1).getNumericCellValue()).trim();
				Long dev_id = Long.parseLong(dev_id_temp);
				Boolean isError = judgeRepetition(dev_sno,dev_id);
				if(isError == false) {
					map.put(dev_sno, dev_id);
				}else {
					map_error.put(dev_sno, dev_id);
				}
			}
			else {
				return null;
			}
		}
		if(map_error==null || map_error.size()<1 && map !=null || map.size()>0) {
			attachVo.setErrorFlag("ok");
			return map;
		}
		else{
			attachVo.setErrorFlag("error");
			return map_error;
		}
		
		
	}
	/**
	 * 判断重复 
	 */
	public Boolean judgeRepetition(String dev_sno,Long dev_id) {
		GpsExample example = new GpsExample();
		GpsExample.Criteria criteria = example.createCriteria();
		criteria.andDevIdEqualTo(dev_id);
		GpsExample example1 = new GpsExample();
		GpsExample.Criteria criteria1 = example1.createCriteria();
		criteria1.andDevSnoEqualTo(dev_sno);
		if(gpsMapper.selectByExample(example).size() > 0 || gpsMapper.selectByExample(example1).size() > 0) {
			return true;
		}
		return false;
	}
	
}
