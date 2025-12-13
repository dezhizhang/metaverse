#define GL_SILENCE_DEPRECATION
#include <GLFW/glfw3.h>
#include <glad/glad.h>  
#include <iostream>

// 声明且实现一个响应体窗品大小变化函数
void frameBufferSizeCallBack(GLFWwindow * window,int width,int height) {
    std::cerr << "窗体最新大小" << width << " " << height << std::endl;
}

// 声明且实现一个键盘消息回调函数
void keyCallBack(GLFWwindow *window,int key,int scancode,int action,int mode) {
    if(key == GLFW_KEY_W) {
        std::cerr << "按下" << key << "键" << std::endl;
    }
    if(action == GLFW_PRESS) {
        std::cerr << "按下" << key << "键" << std::endl;
    }
}

int main() {
    // 初始化glfw基本环境
    if(!glfwInit()) {
        std::cerr << "Failed to initialize GLFW" << std::endl;
        return -1;
    }
    // 设置主版本号和次版本号
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);

    // 创建窗体对像
    GLFWwindow * window = glfwCreateWindow(800,600,"opengl",nullptr,nullptr);
    if(!window) {
        std::cerr << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return -1;
    }

    // 设置当前对像为opengl绘制
    glfwMakeContextCurrent(window);
    // 设置监听窗体大小变化
    glfwSetFramebufferSizeCallback(window, frameBufferSizeCallBack);
    // 设置监听键盘消息
    glfwSetKeyCallback(window, keyCallBack);


    while(!glfwWindowShouldClose(window)) {
        glfwPollEvents();
        glClearColor(0.2f, 0.6f, 0.7f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);
        glfwSwapBuffers(window);
    }

    // 程序退出前清理
    glfwTerminate();
    return 0;
}