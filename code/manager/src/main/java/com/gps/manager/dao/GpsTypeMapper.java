package com.gps.manager.dao;

import com.gps.manager.entity.GpsType;
import com.gps.manager.entity.GpsTypeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface GpsTypeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    int countByExample(GpsTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    int deleteByExample(GpsTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer typeId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    int insert(GpsType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    int insertSelective(GpsType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    List<GpsType> selectByExample(GpsTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    GpsType selectByPrimaryKey(Integer typeId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") GpsType record, @Param("example") GpsTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") GpsType record, @Param("example") GpsTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(GpsType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table gps_type
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(GpsType record);
}