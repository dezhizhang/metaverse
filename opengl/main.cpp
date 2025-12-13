
#include <GLFW/glfw3.h>
#include <iostream>

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

    // 执行窗体循环
    while(!glfwWindowShouldClose(window)) {
        // 接收并分发窗体消息
        glfwPollEvents();
        glClearColor(0.2f, 0.6f, 0.7f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);
        glfwSwapBuffers(window);
    }
    
    // 退出程序前清理
    glfwTerminate();
    
    return 0;
}

