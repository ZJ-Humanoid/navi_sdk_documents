import{_ as e,c as o,o as r,ae as n}from"./chunks/framework.BA3lb9wp.js";const t="/navi_sdk_documents/assets/boot_seq.zjYkwGn2.png",i="/navi_sdk_documents/assets/device_port.mNpA3bAQ.png",d="/navi_sdk_documents/assets/device_port_wa.CBNJzh_q.png",b=JSON.parse('{"title":"Navi机器人SDK开发指南","description":"","frontmatter":{},"headers":[],"relativePath":"index.md","filePath":"index.md"}'),s={name:"index.md"};function h(c,a,l,_,p,u){return r(),o("div",null,[...a[0]||(a[0]=[n(`<h1 id="navi机器人sdk开发指南" tabindex="-1">Navi机器人SDK开发指南 <a class="header-anchor" href="#navi机器人sdk开发指南" aria-label="Permalink to &quot;Navi机器人SDK开发指南&quot;">​</a></h1><p>这是浙江人形机器人Navi系列的SDK和编程指引文档站点。</p><h2 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-label="Permalink to &quot;快速开始&quot;">​</a></h2><h3 id="_1-开机" tabindex="-1">1. 开机 <a class="header-anchor" href="#_1-开机" aria-label="Permalink to &quot;1. 开机&quot;">​</a></h3><h4 id="_1-1-开机键" tabindex="-1">1.1 开机键 <a class="header-anchor" href="#_1-1-开机键" aria-label="Permalink to &quot;1.1 开机键&quot;">​</a></h4><pre><code>机器人没有单独的开关机按键，给机器上电后，机器人进入开机状态；
  - 对于双足全身型（i2）的机器人而言，打开机器人背后的电池包上的电源开关即可；
  - 对于半身型机器人（），将底盘引出的插头插入220V电源插板即可；
  - 对于轮臂型机器人（wa1），需要长按轮式底盘上的电源开关；
</code></pre><h4 id="_1-2-开机状态指示" tabindex="-1">1.2 开机状态指示 <a class="header-anchor" href="#_1-2-开机状态指示" aria-label="Permalink to &quot;1.2 开机状态指示&quot;">​</a></h4><pre><code>启动开机流程后，首先机器人内部的控制器将进入系统的boot状态，开始启动大小脑的Linux系统；
机器人开机后，将通过语音和面部显示器指示当前机器人的启动状态；
启动时序如下(以全身型机器人为例)：
  机器人上电后，内部的SDK开始自主bringup，全身关节会处于归位过程，并处于僵直状态，此时机器人无法自主保持站立，因此确保上电后机器人仍处于安全状态；
  小脑SDK启动完成后，需在确保机器人脚掌触地状态下，可通过语音，遥控等方式命令机器人站立后执行后续指令（轮臂款机器人无此限制）；
  SDK启动时序（时间未准确标定）：
</code></pre><p><img src="`+t+`" alt="开机时序"></p><h3 id="_2-网络与连接" tabindex="-1">2. 网络与连接 <a class="header-anchor" href="#_2-网络与连接" aria-label="Permalink to &quot;2. 网络与连接&quot;">​</a></h3><pre><code>在新的环境中，初次启动机器人，需要确定机器是否已经联网，在没有联网的状态下，部分机器人的功能将无法使用；
</code></pre><h4 id="_2-1-使用显示器和键鼠" tabindex="-1">2.1 使用显示器和键鼠 <a class="header-anchor" href="#_2-1-使用显示器和键鼠" aria-label="Permalink to &quot;2.1 使用显示器和键鼠&quot;">​</a></h4><pre><code>使用USB键鼠和HDMI线连到机器人orin大脑之后，按照Ubuntu系统的方式使机器人连上用户的wifi；
</code></pre><h5 id="全身-半身型外设接口" tabindex="-1">全身/半身型外设接口 <a class="header-anchor" href="#全身-半身型外设接口" aria-label="Permalink to &quot;全身/半身型外设接口&quot;">​</a></h5><p><img src="`+i+'" alt="全身外设接口"></p><h5 id="轮臂型外设接口" tabindex="-1">轮臂型外设接口 <a class="header-anchor" href="#轮臂型外设接口" aria-label="Permalink to &quot;轮臂型外设接口&quot;">​</a></h5><p><img src="'+d+`" alt="轮臂外设接口"></p><h4 id="_2-2-使用机器人ap热点" tabindex="-1">2.2 使用机器人AP热点 <a class="header-anchor" href="#_2-2-使用机器人ap热点" aria-label="Permalink to &quot;2.2 使用机器人AP热点&quot;">​</a></h4><pre><code>对于不方便接USB键鼠和HDMI屏幕的场景，也可以通过连接机器人自身的AP热点来配置机器人的网络；
机器人大脑默认的AP名称前缀为nav01ap的Wi-Fi，此Wi-Fi就是机器人大脑的AP热点，密码为88888888。
</code></pre><h4 id="_2-3-终端连接" tabindex="-1">2.3 终端连接 <a class="header-anchor" href="#_2-3-终端连接" aria-label="Permalink to &quot;2.3 终端连接&quot;">​</a></h4><pre><code>完成机器人的网络配置之后，对于开发者而言，可能还需要使用终端登入大脑系统，支持如下方式登入：
  - Linux系统内终端：如果已经使用USB和HDMI登入orin，可以直接使用Linux系统终端登入；
  - 外部终端登入Linux：通过标准ssh协议登入orin Linux系统，ssh端口是22；
  - 登入到demos容器：
    - 在Linux终端内，支持使用docker exec -it navi_project-demos-1 bash
    - 外部终端，可通过ssh协议登入demos，指令：ssh root@ip -p 2222，密码：naviai@2025
</code></pre><h3 id="_3-开发" tabindex="-1">3. 开发 <a class="header-anchor" href="#_3-开发" aria-label="Permalink to &quot;3. 开发&quot;">​</a></h3><pre><code>对于开发者，需要机器人完成更复杂任务时，我们提供了ROS开发以及基于ROS API的HOS图形化编程； ROS API列表参考下一章节；
</code></pre><h4 id="_3-1-ros-python-c" tabindex="-1">3.1 ROS Python/C++ <a class="header-anchor" href="#_3-1-ros-python-c" aria-label="Permalink to &quot;3.1 ROS Python/C++&quot;">​</a></h4><pre><code>我们提供了标准的ROS编程环境，帮助开发者快速的启动开发；
</code></pre><h4 id="_3-2-hos开发" tabindex="-1">3.2 HOS开发 <a class="header-anchor" href="#_3-2-hos开发" aria-label="Permalink to &quot;3.2 HOS开发&quot;">​</a></h4><pre><code>我们提供了HOS的图形化编程界面，帮助开发者更便捷的调用机器人的API接口，更便捷调试部署等工具，使得开发者可以专注于自身的逻辑开发；
</code></pre>`,27)])])}const q=e(s,[["render",h]]);export{b as __pageData,q as default};
