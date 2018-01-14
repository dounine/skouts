import './Properties'
export const PRE_DOMAIN = "http://iyou.dounine.com";
export default {
    //翻译接口
    TRANSLATE:"http://translate.dounine.com/translate",
    //IOS发送消息
    IOS_SEND_MESSAGE:PRE_DOMAIN+"/api/1/chats/${userId}/send",
    //IOS查看聊天列表
    IOS_CHATS:PRE_DOMAIN+"/api/1/chats?api_version=52&limit=${limit}&message_version=500&since_message=${since_message}",
    //IOS查看聊天请求
    IOS_CHAT_REQUESTS:PRE_DOMAIN+"/api/1/chats/requests?since_message=${since_message}&rand_token=${rand_token}&application_code=${application_code}&limit=${limit}",
    //IOS聊天未读信息
    IOS_GET_NEW_MESSAGES:PRE_DOMAIN+"/api/1/chats/get_new_messages?application_code=${application_code}&rand_token=${rand_token}",
    //查看某人是否有消息发送给我[有bug,结果一直是true]
    IOS_HAS_SENT_MESSAGE_TO_ME:PRE_DOMAIN+"/api/1/chats/${userId}/has_sent_message_to_me",
    //消息阅读
    IOS_MARK_AS_READ:PRE_DOMAIN+"/api/1/chats/${userId}/mark-as-read",
    //查看聊天消息列表
    IOS_CHATS_FOR_NEWS:PRE_DOMAIN+"/api/1/chats/${userId}?application_code=7REWTEKA7WB49VR6ESIW&cursor_type=message&limit=${limit}&message_version=500&rand_token=1602357524",
    //查看用户信息
    IOS_USER_INFO:PRE_DOMAIN+"/api/1/users/${userId}",
    //发送正在输入中状态,让对方知道
    IOS_SEND_TYPING:PRE_DOMAIN+"/api/1/chats/${userId}/send/typing",
    //重置聊天超时时间
    IOS_RESET_CHAT_TIMEOUT:PRE_DOMAIN+"/api/1/push/reset_chat_timeout",
    //查看个人信息
    IOS_ME_INFO:PRE_DOMAIN+"/api/1/me",
    //登录
    IOS_LOGIN:PRE_DOMAIN+"/services/ServerService/GCLoginUserSignedNewUDID",
    //不断读取信息
    IOS_SERVICE_GCG:PRE_DOMAIN+"/services/ServerService/GCGetUpdateInfoWithTimestamp50",
    //
    IOS_SERVICE_GC_GET_FEATURE_PLANS:PRE_DOMAIN+"/services/ServerService/GCGetFeaturePlans",
    //发送消息
    IOS_DEL_CHAT:PRE_DOMAIN+"/api/1/chats/${userId}/delete",
    //同意聊天请求
    IOS_REQUEST_ACCEPT:PRE_DOMAIN+"/api/1/chats/${userId}/accept",
    //拒绝聊天请求
    IOS_REQUEST_REJECT:PRE_DOMAIN+"/api/1/chats/${userId}/notinterested",
    //用户信息保存
    IOS_USER_INFO_SAVE:PRE_DOMAIN+"/api/1/me/update",
    //查看FeatureMe用户
    IOS_FEATURE_ME:PRE_DOMAIN+"/api/1/lookatme?start=0&area=world&limit=100",
    //查看世界排行
    IOS_MUTUAL_USERS:PRE_DOMAIN+"/services/ServerService/GCGetMutualUsers44",
    //查看用户资料
    IOS_READ_PROFILE:PRE_DOMAIN+"/api/1/data/send",
    //查看用户照片 http://ios.skoutapis.com
    IOS_USER_IMAGES:PRE_DOMAIN+"/api/1/users/${userId}/images",
    //查看用户动态 http://ios.skoutapis.com
    IOS_USER_BUZZES:PRE_DOMAIN+"/api/1/users/${userId}/buzzes",
}
