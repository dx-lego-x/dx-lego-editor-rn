## 重要case记录

### 一、antdesgin/icon不生效
```
1. react-native link with dependency.assets has been removed after RN >= 0.69, so if anyone still wants to keep using new RN, u should use react-native-asset instead
refer: https://stackoverflow.com/questions/41825276/how-to-add-custom-font-in-react-native-android

2. npm i react-native-asset

3. config react-native.config.js like this
module.exports = {
   assets: ["node_modules/@ant-design/icons-react-native/fonts"]
};

4. if using metro add this into app.json
"packagerOpts": {
   "config": "metro.config.js"
}

5.npx react-native-asset -> this will copy assets into platform specific path

```

### 二、缺少RNCPicker
```
RN新版已经移除了Picker这个组件
需要使用@react-native-picker/picker

npm i @react-native-picker/picker
npx pod install
```

### 三、传感器
```
https://react-native-sensors.github.io/docs/Installation.html
```
只支持指南针和加速传感器，距离和光线的自己实现

### 四、人脸与指纹识别
```
https://github.com/hieuvp/react-native-fingerprint-scanner
```

### 五、audio
```
https://github.com/hyochan/react-native-audio-recorder-player
```
这个库不支持切换播放设备，已弃用，各端重新实现AudioRecorderPlayer

### 六、camera
```
https://github.com/mrousavy/react-native-vision-camera

```

### 七、扫码
基于react-native-vision-camera实现
https://github.com/rodgomesc/vision-camera-code-scanner

大坑：
在安装和配置react-native-reanimated后，注意这个库要pod install，依然会报错。是reanimate这个库的版本问题，快速处理的话使用下面的方式
```
1、go to node_modules->react-native-vision-camera->src->hooks->useFrameProcessor.ts
2、comment the code _setGlobalConsole(console);
3、restart the metro with reset cache. react-native start --reset-cache
```
注意要确认下vision-camera的版本是否有这个代码

大坑plus:
还是会报错，最后使用react-native-reanimated的2.14.4版本解决

### 八、oss
```
https://help.aliyun.com/zh/oss/developer-reference/installation-8?spm=a2c4g.11186623.0.0.1f4d99c7rGPuAc
```
阿里云oss sdk接入文档
https://newgw.95fenapp.com/api/v1/app/v4/services/jiuwu-blackapi/new_black/aliyun/getToken
获取sdk调用的token接口