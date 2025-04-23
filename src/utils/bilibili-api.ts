import axios from 'axios'

interface RoomInfo {
  roomId: number
  title: string
  anchorName: string
  onlineCount: number
}

interface DanmakuMessage {
  uid: number
  username: string
  content: string
  timestamp: number
}

class BilibiliAPI {
  private static instance: BilibiliAPI
  private baseURL = 'https://api.live.bilibili.com'
  private roomId: number = 0
  private ws: WebSocket | null = null
  private danmakuCallback: ((message: DanmakuMessage) => void) | null = null

  private constructor() {}

  public static getInstance(): BilibiliAPI {
    if (!BilibiliAPI.instance) {
      BilibiliAPI.instance = new BilibiliAPI()
    }
    return BilibiliAPI.instance
  }

  // 设置房间ID
  public setRoomId(roomId: number) {
    this.roomId = roomId
  }

  // 获取直播间信息
  public async getRoomInfo(): Promise<RoomInfo> {
    try {
      const response = await axios.get(`${this.baseURL}/room/v1/Room/get_info`, {
        params: {
          room_id: this.roomId
        }
      })
      return response.data.data
    } catch (error) {
      console.error('获取直播间信息失败:', error)
      throw error
    }
  }

  // 连接弹幕服务器
  public connectDanmaku(callback: (message: DanmakuMessage) => void) {
    this.danmakuCallback = callback
    const wsUrl = `wss://broadcastlv.chat.bilibili.com:2245/sub`
    
    this.ws = new WebSocket(wsUrl)
    
    this.ws.onopen = () => {
      console.log('弹幕服务器连接成功')
      // 发送加入房间的包
      const joinRoomPacket = this.createJoinRoomPacket()
      this.ws?.send(joinRoomPacket)
    }

    this.ws.onmessage = (event) => {
      const message = this.parseDanmakuMessage(event.data)
      if (message && this.danmakuCallback) {
        this.danmakuCallback(message)
      }
    }

    this.ws.onerror = (error) => {
      console.error('弹幕服务器连接错误:', error)
    }

    this.ws.onclose = () => {
      console.log('弹幕服务器连接关闭')
      // 可以在这里添加重连逻辑
    }
  }

  // 断开弹幕连接
  public disconnectDanmaku() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  // 创建加入房间的包
  private createJoinRoomPacket(): ArrayBuffer {
    const roomId = this.roomId
    const packet = new Uint8Array(16)
    const view = new DataView(packet.buffer)
    
    // 包长度
    view.setUint32(0, 16, true)
    // 包类型
    view.setUint16(4, 7, true)
    // 房间ID
    view.setUint32(8, roomId, true)
    
    return packet.buffer
  }

  // 解析弹幕消息
  private parseDanmakuMessage(data: any): DanmakuMessage | null {
    try {
      // 这里需要根据B站弹幕协议进行解析
      // 简化版本，实际实现需要更复杂的解析逻辑
      const message = JSON.parse(data)
      return {
        uid: message.uid,
        username: message.uname,
        content: message.msg,
        timestamp: Date.now()
      }
    } catch (error) {
      console.error('解析弹幕消息失败:', error)
      return null
    }
  }
}

export default BilibiliAPI 