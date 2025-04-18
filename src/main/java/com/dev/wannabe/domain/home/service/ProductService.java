package com.dev.wannabe.domain.home.service;

import com.dev.wannabe.domain.home.mapper.AttachFileManageMapper;
import com.dev.wannabe.domain.home.model.dto.InsertProductDTO;
import com.dev.wannabe.domain.home.model.dto.ProductDTO;
import com.dev.wannabe.domain.home.mapper.ProductMapper;
import com.dev.wannabe.domain.home.model.dto.ProductPriceDTO;
import com.dev.wannabe.domain.home.model.vo.AttachFileManage;
import com.dev.wannabe.domain.home.model.vo.Product;
import com.dev.wannabe.domain.home.model.vo.ProductPrice;
import com.dev.wannabe.global.model.SessionUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductMapper productMapper;
    private final AttachFileManageMapper fileMapper;

    // 상품 분류별 최신 3개 상품 조회
    public List<ProductDTO> getTop6ProductsByType(String productType) {
        // 디버깅 가능하도록 변수로 받아 리턴하는 방식으로 수정
        List<ProductDTO> result = productMapper.selectTop6ByProductTypeSortedByInsertDt(productType);
        return result;
    }

    @Transactional
    public Boolean addProductItem(InsertProductDTO insertProductDTO, HttpServletRequest request){
        SessionUserDTO sessionUserDTO = getSessionUserDTO(request);
        if(sessionUserDTO == null){
            return false;
        }

        if(sessionUserDTO.getRole().equals("03")){
            return false;
        }

        insertProductDTO.setUserId(sessionUserDTO.getUserId());

        MultipartFile uploadFile = insertProductDTO.getUploadFile();
        String originalFilename = uploadFile.getOriginalFilename();
        String storeFileName = getStoreName(originalFilename);

        try {
            String uploadDir = System.getProperty("user.dir") + "/uploads/images/product/";
            File folder = new File(uploadDir);

            if (!folder.exists()) {
                folder.mkdirs();
            }
            File dest = new File(folder, storeFileName);
            uploadFile.transferTo(dest);

            String filePath = "/images/product/" + storeFileName;

            AttachFileManage attachFileManage = AttachFileManage.builder()
                    .fileOriginName(originalFilename)
                    .filePath(filePath)
                    .fileExtension(getExtension(originalFilename))
                    .fileSize(uploadFile.getSize())
                    .build();

            fileMapper.addAttachFileManage(attachFileManage);

            Product product = Product.builder()
                    .productName(insertProductDTO.getProductName())
                    .productDesc(insertProductDTO.getProductDesc())
                    .productAuthor(insertProductDTO.getProductAuthor())
                    .attachFileId(attachFileManage.getAttachFileId())
                    .insertUserId(sessionUserDTO.getUserId())
                    .productType(insertProductDTO.getProductType())
                    .build();

            productMapper.addProductItem(product);

            List<ProductPriceDTO> productPrices = new ArrayList<>();
            for (Integer price : insertProductDTO.getPrices()) {
                ProductPriceDTO productPrice = ProductPriceDTO.builder()
                        .productId(product.getProductId())
                        .price(BigDecimal.valueOf(price))
                        .insertUserId(sessionUserDTO.getUserId())
                        .build();
                productPrices.add(productPrice);
            }

            List<Integer> days = insertProductDTO.getAvailDays();
            for (int i = 0; i < days.size(); i++) {
                productPrices.get(i).setAvailDay(days.get(i));
            }
            productMapper.addProductPrice(productPrices);
            return true;
        }
        catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    private static SessionUserDTO getSessionUserDTO(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session == null){
            return null;
        }
        SessionUserDTO userData = (SessionUserDTO) session.getAttribute("userData");
        return userData;
    }

    private static String getStoreName(String originalFileName){
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
        String extension = getExtension(originalFileName);
        return FilenameUtils.getBaseName(originalFileName) + LocalDateTime.now().format(fmt) + "." + extension;
    }
    private static String getExtension(String originalFileName) {
        int pos = originalFileName.lastIndexOf(".");
        return originalFileName.substring(pos + 1);
    }
}