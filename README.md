# 开发流程
打开Terminal(cmd.exe)，进入工程根目录，然后按照下面流程进行准备

## npm初始化

    `npm init`(WINDOWS环境下为`npm init -y`)

## 安装webpack和babel

    npm install --save-dev fs-extra

## 游戏开发
将游戏工程的整个文件夹放入本工程文件夹下，例如本工程下的`RunningGirl`

## 游戏发布
游戏开发完成之后，执行下面命令可以生成微信工程代码

    npm run build RunningGirl

上面是以`RunningGirl`工程为例子，生成的微信工程在`build`文件夹下

## 游戏设置
打开`build/RunningGirl/game.json`设置游戏横竖屏等

## 游戏素材
微信工程发布完成后，需要将游戏素材，如图片，音效等文件手动拷贝到`build/RunningGirl`文件夹下

## 游戏测试
直接用微信开发工具打开`build/RunningGirl`即可进行测试
    