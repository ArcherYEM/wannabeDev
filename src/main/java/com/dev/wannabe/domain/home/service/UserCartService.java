package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.UserCartMapper;
import com.dev.wannabe.domain.home.model.dto.UserCartBgmDTO;
import com.dev.wannabe.domain.home.model.dto.UserCartProductDTO;
import com.dev.wannabe.domain.home.model.vo.UserCart;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserCartService {

    private final UserCartMapper userCartMapper;
    public List<UserCartBgmDTO> getUserCartBgmList(HttpServletRequest request) {
        SessionUserDTO userData = getSessionUserDTO(request);
        if (userData == null) {
            return null;
        }
        List<UserCartBgmDTO> userCartBgmList = userCartMapper.getUserCartBgmList(userData.getUserId(),"M");
        return userCartBgmList;
    }
    public List<UserCartProductDTO> getUserCartProductList(HttpServletRequest request){
        SessionUserDTO userData = getSessionUserDTO(request);
        if(userData == null){
            return null;
        }
        List<UserCartProductDTO> userCartList = userCartMapper.getUserCartList(userData.getUserId(),"P");
        for (UserCartProductDTO userCartProductDTO : userCartList) {
            if(userCartProductDTO.getCategory().equals("10")){
                userCartProductDTO.setCategory("미니홈피_스킨");
            } else if (userCartProductDTO.getCategory().equals("01")) {
                userCartProductDTO.setCategory("미니미");
            } else if (userCartProductDTO.getCategory().equals("02")) {
                userCartProductDTO.setCategory("미니룸");
            } else if (userCartProductDTO.getCategory().equals("11")) {
                userCartProductDTO.setCategory("메뉴스킨");
            } else{
                userCartProductDTO.setCategory("글자스킨");
            }
        }
        return userCartList;
    }
    @Transactional
    public Boolean addCart(List<UserCartProductDTO> userCartList, HttpServletRequest request){
        SessionUserDTO userData = getSessionUserDTO(request);
        if (userData == null) {
            return false;
        }

        for (UserCartProductDTO userCartDTO : userCartList) {
            UserCart userCart = UserCart.builder()
                    .userId(userData.getUserId())
                    .itemId(userCartDTO.getItemId())
                    .availDay(userCartDTO.getAvailDay())
                    .insertUserId(userData.getUserId())
                    .insertDt(LocalDateTime.now())
                    .itemType(userCartDTO.getItemType())
                    .build();

            userCartMapper.saveUserCart(userCart);
        }
        return true;
    }
    public Integer getItemPrice(Long itemId,String itemType, Integer availDay){
        if(itemType.equals("P")){
            Integer itemPrice = userCartMapper.getItemPrice(itemId ,availDay);
            return itemPrice;
        }
        Integer itemBgmPrice = userCartMapper.getItemBgmPrice(itemId);
        return itemBgmPrice;
    }
    private static SessionUserDTO getSessionUserDTO(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session == null){
            return null;
        }
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        return userData;
    }

}
