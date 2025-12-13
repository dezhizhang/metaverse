
#include <GLFW/glfw3.h>
#include <iostream>


// 声明且实现一个响应体窗品大小变化函数
void frameBufferSizeCallBack(GLFWwindow * window,int width,int height) {
    std::cerr << "窗体最新大小" << width << " " << height << std::endl;
    glViewport(0,0,width,height);
}

int main() {
    // 初始化glfr基本环境
    if (!glfwInit()) {
        std::cerr << "Failed to initialize GLFW" << std::endl;
        return -1;
    }

    // 设置主版本号和次版本号
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);

    // 创建窗体对像
    GLFWwindow* window = glfwCreateWindow(800, 600, "opengl", nullptr, nullptr);
    if (!window) {
        std::cerr << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return -1;
    }
    // 设置当前对像为opengl绘制
    glfwMakeContextCurrent(window);
    // 设置监听窗体大小变化
    glfwSetFramebufferSizeCallback(window, frameBufferSizeCallBack);

    // 设置opengl视口和清理颜色
    glViewport(0,0,800,600);
    glClearColor(0.2f,0.3f,0.3f,1.0f);

    // 执行窗体循环
    while(!glfwWindowShouldClose(window)) {
        // 接收并分发窗体消息
        glfwPollEvents();
        glClearColor(0.2f,0.3f,0.3f,1.0f);
        glClear(GL_COLOR_BUFFER_BIT);
        // 切换双缓存
        glfwSwapBuffers(window);
    }
    
    // 退出程序前清理
    glfwTerminate();
    
    return 0;
}

