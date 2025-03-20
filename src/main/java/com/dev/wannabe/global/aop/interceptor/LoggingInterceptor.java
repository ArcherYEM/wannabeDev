package com.dev.wannabe.global.aop.interceptor;

import com.google.common.base.Joiner;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Slf4j
public class LoggingInterceptor implements HandlerInterceptor {

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        if (ex != null) {
            log.error("예외 발생: {}", ex.getMessage(), ex);
            log.error("================= EXCEPTION END =================");
        }
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        log.debug("===================== BEGIN =====================");
        log.info("Request URI --> {}", getRequestUri(request));

        logRequest(request);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
        log.debug("====================== END ======================");
    }

    private void logRequest(HttpServletRequest request) {
        final boolean traceEnabled = log.isTraceEnabled();

        String params;

        if (isEnableLoggingRequestDetails()) {
            Set<Map.Entry<String, String[]>> paramMapSet = request.getParameterMap().entrySet();

            List<String> mappingParams = new ArrayList<>();

            for (Map.Entry<String, String[]> paramMap : paramMapSet) {
                String value = paramMap.getKey() + ":" + Arrays.toString(paramMap.getValue());
                mappingParams.add(value);
            }
            params = Joiner.on(", ").join(mappingParams);

        } else {
            params = request.getParameterMap().isEmpty() ? "" : "masked";
        }

        String queryString = request.getQueryString();
        String queryClause = (StringUtils.hasLength(queryString) ? "?" + queryString : "");
        String message = request.getMethod() + " \"" + getRequestUri(request) + queryClause + "\", query string ={" + params + "}";

        // Trace logging mode
        if (traceEnabled) {
            List<String> mappingHeaders = new ArrayList<>();
            List<String> values = Collections.list(request.getHeaderNames());

            for (String name : values) {
                String value = name + ":" + Collections.list(request.getHeaders(name));
                mappingHeaders.add(value);
            }

            String headers = Joiner.on(", ").join(mappingHeaders);

            log.trace("{}, \nheaders={} \nin DispatherServlet '{}'", new String[] {message, headers, getServletName(request)});
        } else {
            log.debug(message);
        }
    }

    private boolean isEnableLoggingRequestDetails() {
        return log.isDebugEnabled() || log.isTraceEnabled();
    }

    private static String getRequestUri(HttpServletRequest request) {
        String uri = (String) request.getAttribute(WebUtils.INCLUDE_REQUEST_URI_ATTRIBUTE);
        if (uri == null) {
            uri = request.getRequestURI();
        }
        return uri;
    }

    private static String getServletName(HttpServletRequest request) {
        String result;
        try {
            result = request.getServletContext().getServletContextName();
        } catch (NoSuchMethodError e) {
            result = Objects.requireNonNull(WebApplicationContextUtils.getWebApplicationContext(request.getServletContext())).getDisplayName();
        }
        return result;
    }
}
