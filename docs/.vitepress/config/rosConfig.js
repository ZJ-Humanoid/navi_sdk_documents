/**
 * ROS 连接配置文件
 * 用于管理 ROSBridge 连接参数
 */

// 默认配置
// 默认配置
const defaultConfig = {
  // 在构建时使用默认ws协议，在客户端运行时根据页面协议动态调整
  url: 'ws://172.16.11.238:9090',
  reconnectInterval: 3000, // 重连间隔时间(毫秒)
  maxReconnectAttempts: 10, // 最大重连尝试次数
  timeout: 5000, // 连接超时时间(毫秒),

  // 动态获取URL的方法，在客户端调用
  getDynamicUrl: function() {
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      return `${protocol}//172.16.11.238:9090${protocol === 'wss:' ? '/wss' : ''}`;
    }
    return this.url; // 服务器端返回默认URL
  }
};

// 可以根据环境变量或外部配置覆盖默认配置
const config = {
  ...defaultConfig,
  // 如果有环境变量，可以在这里覆盖默认值
  // url: import.meta.env.VITE_ROS_BRIDGE_URL || defaultConfig.url,
};

export default config;
