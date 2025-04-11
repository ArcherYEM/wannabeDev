package com.dev.wannabe.domain.home.mapper;

import com.dev.wannabe.domain.home.model.dto.UserCartBgmDTO;
import com.dev.wannabe.domain.home.model.dto.UserCartProductDTO;
import com.dev.wannabe.domain.home.model.vo.UserCart;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserCartMapper {

    Integer saveUserCart(UserCart userCart);
    List<UserCartProductDTO> getUserCartList(@Param("userId") Long userId,@Param("itemType") String itemType);
    List<UserCartBgmDTO> getUserCartBgmList(@Param("userId") Long userId,@Param("itemType") String itemType);
    Integer getItemPrice(@Param("itemId")Long itemId,@Param("availDay")Integer availDay);
    Integer getItemBgmPrice(Long itemId);

}
