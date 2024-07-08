//package com.softparadigm.backend.controller;
//
//import com.softparadigm.backend.Config.CustomStompSessionHandler;
//import com.softparadigm.backend.service.WebsocketClientService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.socket.client.WebSocketConnectionManager;
//import org.springframework.web.socket.client.standard.StandardWebSocketClient;
//import org.springframework.web.socket.messaging.WebSocketStompClient;
//
//@RestController
//@CrossOrigin("*")
//@RequiredArgsConstructor
//public class WebsocketController {
//    @Autowired
//    private WebsocketClientService pythonServerService;
//
//
//
//
//
//
//
//    @PostMapping("/start")
//    public String startServer() {
//        pythonServerService.startServer();
//        return "Python server started.";
//    }
//    @PostMapping("/stop")
//    public void stopServer() {
//        pythonServerService.stopServer();
//
//
//    }
//
//
//
//
//
//}
