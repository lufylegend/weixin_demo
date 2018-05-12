var loadingData = [
    { name: "loading", path: "images/loading.png" }
];
var sound_jumpIndex = 0;
var imgData = [
    { name: "actor_1_n", path: "images/actor_1_n.png" },
    { name: "actor_1_s", path: "images/actor_1_s.png" },
    { name: "actor_2_n", path: "images/actor_2_n.png" },
    { name: "actor_2_s", path: "images/actor_2_s.png" },
    { name: "actor_3_n", path: "images/actor_3_n.png" },
    { name: "actor_3_s", path: "images/actor_3_s.png" },
    { name: "actor_4_n", path: "images/actor_4_n.png" },
    { name: "actor_4_s", path: "images/actor_4_s.png" },
    { name: "arc", path: "images/arc.png" },
    { name: "back_bt", path: "images/back_bt.png" },
    { name: "bg", path: "images/bg.jpg" },
    { name: "bg_1", path: "images/bg_1.jpg" },
    { name: "cloud", path: "images/cloud.png" },
    { name: "item_1", path: "images/item_1.png" },
    { name: "item_2", path: "images/item_2.png" },
    { name: "item_3", path: "images/item_3.png" },
    { name: "item_4", path: "images/item_4.png" },
    { name: "item_5", path: "images/item_5.jpg" },
    { name: "item_r_1", path: "images/item_r_1.png" },
    { name: "item_r_2", path: "images/item_r_2.png" },
    { name: "item_r_3", path: "images/item_r_3.png" },
    { name: "new", path: "images/new.png" },
    { name: "player_1_b", path: "images/player_1_b.png" },
    { name: "player_1_s", path: "images/player_1_s.png" },
    { name: "player_2_b", path: "images/player_2_b.png" },
    { name: "player_2_s", path: "images/player_2_s.png" },
    { name: "player_3_b", path: "images/player_3_b.png" },
    { name: "player_3_s", path: "images/player_3_s.png" },
    { name: "player_4_b", path: "images/player_4_b.png" },
    { name: "player_4_s", path: "images/player_4_s.png" },
    { name: "result", path: "images/result.png" },
    { name: "road", path: "images/road.jpg" },
    { name: "score", path: "images/score.png" },
    { name: "sel_bt", path: "images/sel_bt.png" },
    { name: "side", path: "images/side.png" },
    { name: "tips_1", path: "images/tips_1.png" },
    { name: "tips_2", path: "images/tips_2.png" },
    { name: "tips_3", path: "images/tips_3.png" },
    { name: "tips_4", path: "images/tips_4.png" },
    { name: "user_1", path: "images/user_1.png" },
    { name: "user_2", path: "images/user_2.png" },
    { name: "user_3", path: "images/user_3.png" },
    { name: "user_4", path: "images/user_4.png" },
    { name: "sound_bg", path: "sound/bg.mp3", type: "sound" },
    { name: "sound_get", path: "sound/get.mp3", type: "sound" },
    { name: "sound_jump", path: "sound/jump.mp3", type: "sound" },
    { name: "sound_start", path: "sound/start.mp3", type: "sound" },
    { name: "sound_lose", path: "sound/lose.mp3", type: "sound" }
];
var imglist;
var loadingLayer, tempLayer, middleLayer, topLayer, clickLayer;
var isLoadSound = false, isMute = false, isWebAudioEnabled = true;
var actor_nList = [], actor_sList = [], player_sList = [], player_bList = [];
var ltween1, ltween2;
var bgLBitmap1, bgLBitmap2, roadSprite1, roadSprite2, scoreTextField, tipsLBitmap, sideLBitmap;
var isStart = false;
var sp = 1;
var score = 0;
var playerSprite;
var isFirst = true;
var cCount = 0;
var vh = 0;
var rRoad1 = false;
var rRoad2 = false;

var sound_bg = new LSound();
var sound_get = new LSound();
sound_jumpIndex = 0;
var sound_jumps = [new LSound(), new LSound(), new LSound()];
var sound_start = new LSound();
var sound_lose = new LSound();

init(1000 / 50, "legend", 640, 1139, main);

function main() {
if (LGlobal.mobile) {
    LGlobal.width = 640;
    LGlobal.height = 640 * window.innerHeight / window.innerWidth;
    LGlobal.canvasObj.width = LGlobal.width;
    LGlobal.canvasObj.height = LGlobal.height;
}
LGlobal.align = LStageAlign.TOP_MIDDLE;
LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
LSystem.screen(LStage.FULL_SCREEN);

LLoadManage.load(loadingData,
    function (progress) {
    }, loadingImg);
}

function loadingImg(result) {
loadingLayer = new LoadingSample4(LGlobal.height * 0.5, "#fff", "#cc0000", result);
addChild(loadingLayer);
LLoadManage.load(imgData,
    function (progress) {
        loadingLayer.setProgress(progress);
    }, gameInit);
}

function gameInit(result) {
imglist = result;
removeChild(loadingLayer);
loadingLayer = null;

tempLayer = new LSprite();
addChild(tempLayer);

topLayer = new LSprite();
addChild(topLayer);

middleLayer = new LSprite();
addChild(middleLayer);

clickLayer = new LSprite();
addChild(clickLayer);

isWebAudioEnabled = LSound.webAudioEnabled;

//LGlobal.setDebug(true);
//addChild(new FPS());
clickLayer.addEventListener(LEvent.ENTER_FRAME, onframe);

loadSound();
sound_bg.play(0, 9999);

pageStart();
//game();
//gameOver();
}

function gameOver() {
isStart = false;

playerSprite.setAction(2, 0, 1);

LTweenLite.remove(ltween1);
LTweenLite.remove(ltween2);

LTweenLite.to(topLayer, 0.02, { x: topLayer.x + 5, y: topLayer.y - 5 }).to(topLayer, 0.04, { x: topLayer.x - 5, y: topLayer.y + 5 }).to(topLayer, 0.04, { x: topLayer.x + 5, y: topLayer.y - 5 }).to(topLayer, 0.04, { x: topLayer.x - 5, y: topLayer.y + 5 }).to(topLayer, 0.04, { x: topLayer.x + 5, y: topLayer.y - 5 }).to(topLayer, 0.02, { x: topLayer.x, y: topLayer.y });

LTweenLite.to(playerSprite, 0.5, { delay: 0.5, y: 1236, onComplete: function () {
    var resultSprite = new LSprite();
    resultSprite.alpha = 0;
    clickLayer.addChild(resultSprite);
    LTweenLite.to(resultSprite, 0.5, { alpha: 1 });

    var blackMaskSprite = new LSprite();
    blackMaskSprite.graphics.drawRect(0, "#ff0000", [0, 0, 640, 1236], true, "#000");
    blackMaskSprite.alpha = 0.8;
    resultSprite.addChild(blackMaskSprite);

    blackMaskSprite.addEventListener(LMouseEvent.MOUSE_DOWN, function () { });

    var resultBgSprite = new LSprite();
    resultBgSprite.x = 46;
    resultBgSprite.y = (LGlobal.height - 604) / 2;
    resultSprite.addChild(resultBgSprite);

    var resultLBitmap = new LBitmap(new LBitmapData(imglist["result"]));
    resultBgSprite.addChild(resultLBitmap);

    var record = 0;
    if (window.localStorage["record"] != null) {
        record = parseInt(window.localStorage["record"]);
    }

    if (score > record) {
        var newLBitmap = new LBitmap(new LBitmapData(imglist["new"]));
        newLBitmap.x = 121;
        newLBitmap.y = 189;
        resultBgSprite.addChild(newLBitmap);

        record = score;
        window.localStorage["record"] = record;
    }

    var scoreRTextField = new LTextField();
    scoreRTextField.color = "#ffffff";
    scoreRTextField.size = 38;
    scoreRTextField.textAlign = "center";
    scoreRTextField.x = 176;
    scoreRTextField.y = 212;
    scoreRTextField.weight = "bolder";
    scoreRTextField.font = "微软雅黑";
    scoreRTextField.text = score;
    resultBgSprite.addChild(scoreRTextField);

    var scoreHTextField = new LTextField();
    scoreHTextField.color = "#fbd777";
    scoreHTextField.size = 38;
    scoreHTextField.textAlign = "center";
    scoreHTextField.x = 368;
    scoreHTextField.y = 212;
    scoreHTextField.weight = "bolder";
    scoreHTextField.font = "微软雅黑";
    scoreHTextField.text = record;
    resultBgSprite.addChild(scoreHTextField);

    var selectSprite = new LSprite();
    selectSprite.graphics.drawRect(0, "#ff0000", [72, 394, 148, 84]);
    resultBgSprite.addChild(selectSprite);

    selectSprite.addEventListener(LMouseEvent.MOUSE_DOWN, function () {
        tempLayer.removeAllChild();
        middleLayer.removeAllChild();
        topLayer.removeAllChild();
        clickLayer.removeAllChild();
        tempLayer.removeEventListener(LMouseEvent.MOUSE_DOWN);
        pageStart();

        sound_bg.play(0, 9999);
    });

    var restartSprite = new LSprite();
    restartSprite.graphics.drawRect(0, "#ff0000", [224, 394, 255, 84]);
    resultBgSprite.addChild(restartSprite);

    restartSprite.addEventListener(LMouseEvent.MOUSE_DOWN, function () {
        tempLayer.removeAllChild();
        middleLayer.removeAllChild();
        topLayer.removeAllChild();
        clickLayer.removeAllChild();
        tempLayer.removeEventListener(LMouseEvent.MOUSE_DOWN);
        game();

        sound_bg.play(0, 9999);
    });
}
});

sound_bg.stop();
sound_lose.play();
}

function game() {
bgLBitmap1 = new LBitmap(new LBitmapData(imglist["bg"]));
tempLayer.addChild(bgLBitmap1);

bgLBitmap2 = new LBitmap(new LBitmapData(imglist["bg"]));
bgLBitmap2.x = bgLBitmap1.x + 2030;
tempLayer.addChild(bgLBitmap2);

var cloud_1LBitmap = new LBitmap(new LBitmapData(imglist["cloud"]));
cloud_1LBitmap.x = 640;
cloud_1LBitmap.y = 80;
cloud_1LBitmap.alpha = 0.6;
tempLayer.addChild(cloud_1LBitmap);

ltween1 = LTweenLite.to(cloud_1LBitmap, 8, { x: -160, loop: true, playStyle: LTweenLite.PlayStyle.Init });

var cloud_2LBitmap = new LBitmap(new LBitmapData(imglist["cloud"]));
cloud_2LBitmap.x = 640;
cloud_2LBitmap.y = 150;
cloud_2LBitmap.alpha = 0.6;
tempLayer.addChild(cloud_2LBitmap);

ltween2 = LTweenLite.to(cloud_2LBitmap, 7, { delay: 3, x: -160, loop: true, playStyle: LTweenLite.PlayStyle.Init });

roadSprite1 = new LSprite();
roadSprite1.addChild(new LBitmap(new LBitmapData(imglist["road"])));
roadSprite1.y = 750;
roadSprite1.addShape(LShape.RECT, [0, 10, 674, 1]);
tempLayer.addChild(roadSprite1);

roadSprite2 = new LSprite();
roadSprite2.addChild(new LBitmap(new LBitmapData(imglist["road"])));
roadSprite2.y = 750;
roadSprite2.addShape(LShape.RECT, [0, 10, 674, 1]);
tempLayer.addChild(roadSprite2);

tempLayer.addEventListener(LMouseEvent.MOUSE_DOWN, clickFun);

var back_btSprite = new LSprite();
back_btSprite.addChild(new LBitmap(new LBitmapData(imglist["back_bt"], 107 * sp, 0, 107, 93)));
back_btSprite.x = 47;
back_btSprite.y = 27;
clickLayer.addChild(back_btSprite);

back_btSprite.addEventListener(LMouseEvent.MOUSE_DOWN, function () {
    isStart = false;
    tempLayer.removeAllChild();
    middleLayer.removeAllChild();
    topLayer.removeAllChild();
    clickLayer.removeAllChild();
    tempLayer.removeEventListener(LMouseEvent.MOUSE_DOWN);
    pageStart();
});

var scoreLBitmap = new LBitmap(new LBitmapData(imglist["score"]));
scoreLBitmap.x = 511;
scoreLBitmap.y = 27;
clickLayer.addChild(scoreLBitmap);

scoreTextField = new LTextField();
scoreTextField.color = "#59301a";
scoreTextField.size = 36;
scoreTextField.textAlign = "center";
scoreTextField.x = 565;
scoreTextField.y = 54;
scoreTextField.weight = "bolder";
scoreTextField.font = "微软雅黑";
scoreTextField.text = "0";
clickLayer.addChild(scoreTextField);

var userlist = LGlobal.divideCoordinate(432, 150, 1, 4);
var userdata = new LBitmapData(imglist["user_" + (sp + 1)], 0, 0, 108, 150);
playerSprite = new LAnimationTimeline(userdata, [
        [userlist[0][0], userlist[0][1]],
        [userlist[0][2]],
        [userlist[0][3]]
    ]);
playerSprite.speed = 5;
playerSprite.x = 60;
playerSprite.y = 633;
playerSprite.addShape(LShape.VERTICES, [[45, 14], [33, 33], [33, 126], [71, 126], [71, 27]]);
middleLayer.addChild(playerSprite);

tipsLBitmap = new LBitmap(new LBitmapData(imglist["tips_" + (sp + 1)]));
tipsLBitmap.alpha = 0.5;
tipsLBitmap.x = 105;
tipsLBitmap.y = 224;
middleLayer.addChild(tipsLBitmap);

isStart = true;
isFirst = true;
rRoad1 = false;
rRoad2 = false;
score = 0;
cCount = 0;
vh = 0;
}

function clickFun() {
if (isFirst) {
    isFirst = false;
    middleLayer.removeChild(tipsLBitmap);

    sideLBitmap = new LBitmap(new LBitmapData(imglist["side"]));
    sideLBitmap.x = 674;
    if (roadSprite1.x > roadSprite2.x) {
        roadSprite1.x = 0;
        roadSprite2.x = roadSprite1.x - 674;
        roadSprite1.addChild(sideLBitmap);
    } else {
        roadSprite2.x = 0;
        roadSprite1.x = roadSprite2.x - 674;
        roadSprite2.addChild(sideLBitmap);
    }

    var lastX = [];
    var lastXNO = [];
    for (var i = 0; i < 3; i++) {
        var ran = Math.floor(Math.random() * 5) + 1;
        var ranD = 1;
        if (ran == 1) {
            ranD = 1;
        } else if (ran == 2 || ran == 3) {
            ranD = 2;
        } else if (ran == 4 || ran == 5) {
            ranD = 3;
        }
        var rlong = Math.floor(Math.random() * 100) + 250;
        var rheight = Math.floor(Math.random() * 20);
        var radj = Math.floor(Math.random() * 200);

        var itemUpSprite1 = new ItemUp(ran);
        itemUpSprite1.y = -100 - rheight - radj;
        topLayer.addChild(itemUpSprite1);

        var itemDownSprite1 = new ItemDown(ranD);
        itemDownSprite1.y = 750 - radj;
        topLayer.addChild(itemDownSprite1);

        if (i == 0) {
            if (roadSprite1.x > roadSprite2.x) {
                itemUpSprite1.x = roadSprite1.x + 674 + rlong;
                itemDownSprite1.x = itemUpSprite1.x;
            } else {
                itemUpSprite1.x = roadSprite2.x + 674 + rlong;
                itemDownSprite1.x = itemUpSprite1.x;
            }
            lastX.push(itemUpSprite1.x);
            lastXNO.push(ranD);
        } else {
            itemUpSprite1.x = lastX[lastX.length - 1] + getLong(lastXNO[lastXNO.length - 1]) + rlong;
            itemDownSprite1.x = itemUpSprite1.x;
            lastX.push(itemUpSprite1.x);
            lastXNO.push(ranD);
        }
    }
}

cCount++;
if (cCount <= 2) {
    if (playerSprite.getAction()[0] == 0) {
        playerSprite.setAction(1, 0, 1);
    }

    vh = 30;
    
    sound_jumps[sound_jumpIndex++].play();
    if(sound_jumpIndex > sound_jumps.length - 1){
        sound_jumpIndex = 0;
    }
    //sound_jump.play();
}
}

function onframe() {
if (isStart) {
    //背景
    if (bgLBitmap1.x < bgLBitmap2.x) {
        bgLBitmap1.x = bgLBitmap1.x - 4;
        bgLBitmap2.x = bgLBitmap1.x + 2030;
        if (bgLBitmap1.x < -2040) {
            bgLBitmap1.x = bgLBitmap2.x + 2030;
        }
    } else {
        bgLBitmap2.x = bgLBitmap2.x - 4;
        bgLBitmap1.x = bgLBitmap2.x + 2030;
        if (bgLBitmap2.x < -2040) {
            bgLBitmap2.x = bgLBitmap1.x + 2030;
        }
    }

    //开始时默认道路
    if (roadSprite1.x < roadSprite2.x) {
        roadSprite1.x = roadSprite1.x - 8;
        roadSprite2.x = roadSprite1.x + 674;
        if (isFirst && roadSprite1.x < -688) {
            roadSprite1.x = roadSprite2.x + 674;
        }
    } else {
        roadSprite2.x = roadSprite2.x - 8;
        roadSprite1.x = roadSprite2.x + 674;
        if (isFirst && roadSprite2.x < -688) {
            roadSprite2.x = roadSprite1.x + 674;
        }
    }

    //开始后清楚道路
    if (!isFirst && (!rRoad1 || !rRoad2)) {
        if (!rRoad1 && roadSprite1.x < -688) {
            rRoad1 = true;
            tempLayer.removeChild(roadSprite1);
        }
        if (!rRoad2 && roadSprite2.x >= -696 && roadSprite2.x < -688) {
            rRoad2 = true;
            tempLayer.removeChild(roadSprite2);
        }
    }

    playerSprite.y -= vh;

    if ((!rRoad1 || !rRoad2) && (playerSprite.hitTestObject(roadSprite1) || playerSprite.hitTestObject(roadSprite2))) {
        playerSprite.y = roadSprite1.y - 117;
        if (playerSprite.getAction()[0] == 1) {
            playerSprite.setAction(0, 0, 1);
            cCount = 0;
        }
        vh = 0;
    } else {
        vh -= 2.5;
        if (vh < -30) {
            vh = -30;
        }
    }

    var removeList = [];
    for (var key in topLayer.childList) {
        if (topLayer.childList[key].hitTestObject(playerSprite)) {
            if (topLayer.childList[key].arrow == "up") {
                gameOver();
            } else {
                if (topLayer.childList[key].y - playerSprite.y > 77) {
                    playerSprite.y = topLayer.childList[key].y - 117;
                    if (playerSprite.getAction()[0] == 1) {
                        playerSprite.setAction(0, 0, 1);
                        cCount = 0;
                    }
                    vh = 0;
                } else {
                    gameOver();
                }
            }
        }

        topLayer.childList[key].x -= 8;
        if (topLayer.childList[key].x < -300) {
            removeList.push(topLayer.childList[key]);
        }

        //得分
        if (topLayer.childList[key].arrow == "down" && !topLayer.childList[key].getScore && topLayer.childList[key].x < 50) {
            topLayer.childList[key].getScore = true;
            score++;
            scoreTextField.text = score;

            sound_get.play();
        }
    }

    for (var r = 0; r < removeList.length; r++) {
        if (removeList[r].arrow == "down") {
            var lastX = topLayer.childList[topLayer.childList.length - 1].x + getLong(topLayer.childList[topLayer.childList.length - 1].itemno);

            var ran = Math.floor(Math.random() * 5) + 1;
            var ranD = 1;
            if (ran == 1) {
                ranD = 1;
            } else if (ran == 2 || ran == 3) {
                ranD = 2;
            } else if (ran == 4 || ran == 5) {
                ranD = 3;
            }
            var rlong = Math.floor(Math.random() * 100) + 250;
            var rheight = Math.floor(Math.random() * 20);
            var radj = Math.floor(Math.random() * 200);

            var itemUpSprite1 = new ItemUp(ran);
            itemUpSprite1.y = -100 - rheight - radj;
            itemUpSprite1.x = lastX + rlong;
            topLayer.addChild(itemUpSprite1);

            var itemDownSprite1 = new ItemDown(ranD);
            itemDownSprite1.y = 750 - radj;
            itemDownSprite1.x = lastX + rlong;
            topLayer.addChild(itemDownSprite1);
        }
        topLayer.removeChild(removeList[r]);
    }

    if (playerSprite.y > 1236) {
        gameOver();
    }
}
}

function ItemUp(n) {
base(this, LSprite, []);
var self = this;
self.arrow = "up";
var itemLBitmap = new LBitmap(new LBitmapData(imglist["item_" + n]));
self.addChild(itemLBitmap);

if (n == 1) {
    itemLBitmap.x = 8;
    self.addShape(LShape.VERTICES, [[itemLBitmap.x + 7, 311], [itemLBitmap.x + 18, 355], [itemLBitmap.x + 24, 494], [itemLBitmap.x + 30, 536], [itemLBitmap.x + 48, 600], [itemLBitmap.x + 66, 536], [itemLBitmap.x + 72, 494]]);
} else if (n == 2) {
    itemLBitmap.x = 18;
    self.addShape(LShape.VERTICES, [[itemLBitmap.x + 78, 301], [itemLBitmap.x + 85, 345], [itemLBitmap.x + 74, 497], [itemLBitmap.x + 0, 583], [itemLBitmap.x + 42, 596], [itemLBitmap.x + 124, 600], [itemLBitmap.x + 206, 596], [itemLBitmap.x + 248, 583]]);
} else if (n == 3) {
    itemLBitmap.x = 0;
    self.addShape(LShape.VERTICES, [[itemLBitmap.x + 51, 389], [itemLBitmap.x + 23, 401], [itemLBitmap.x + 0, 440], [itemLBitmap.x + 0, 552], [itemLBitmap.x + 35, 600], [itemLBitmap.x + 253, 600], [itemLBitmap.x + 287, 555]]);
} else if (n == 4) {
    itemLBitmap.x = 8;
    self.addShape(LShape.VERTICES, [[itemLBitmap.x + 3, 350], [itemLBitmap.x + 3, 552], [itemLBitmap.x + 0, 557], [itemLBitmap.x + 17, 584], [itemLBitmap.x + 11, 591], [itemLBitmap.x + 15, 600], [itemLBitmap.x + 24, 593], [itemLBitmap.x + 184, 593], [itemLBitmap.x + 192, 600], [itemLBitmap.x + 206, 556]]);
} else if (n == 5) {
    itemLBitmap.x = 21;
}
}

function ItemDown(n) {
base(this, LSprite, []);
var self = this;
self.arrow = "down";
self.getScore = false;
self.itemno = n;
var itemLBitmap = new LBitmap(new LBitmapData(imglist["item_r_" + n]));
self.addChild(itemLBitmap);

if (n == 1) {
    self.addShape(LShape.RECT, [10, 10, 94, 1]);
    self.addShape(LShape.RECT, [8, 15, 1, 900]);
} else if (n == 2) {
    self.addShape(LShape.RECT, [10, 10, 264, 1]);
    self.addShape(LShape.RECT, [8, 15, 1, 900]);
} else if (n == 3) {
    self.addShape(LShape.RECT, [10, 10, 203, 1]);
    self.addShape(LShape.RECT, [8, 15, 1, 900]);
}
}

function getLong(n) {
if (n == 1) {
    return 114;
} else if (n == 2) {
    return 284;
} else if (n == 3) {
    return 223;
} else {
    return 0;
}
}

function pageStart() {
actor_nList = [];
actor_sList = [];
player_sList = [];
player_bList = [];
var bg_1LBitmap = new LBitmap(new LBitmapData(imglist["bg_1"]));
middleLayer.addChild(bg_1LBitmap);

var sel_btSprite = new LSprite();
sel_btSprite.addChild(new LBitmap(new LBitmapData(imglist["sel_bt"])));
sel_btSprite.x = 197;
sel_btSprite.y = 189;
middleLayer.addChild(sel_btSprite);

sel_btSprite.addEventListener(LMouseEvent.MOUSE_DOWN, function () {
    middleLayer.removeAllChild();
    middleLayer.removeEventListener(LMouseEvent.MOUSE_DOWN);
    game();

    sound_start.play();
});

var arcLBitmap = new MiddleBitmap(new LBitmapData(imglist["arc"]));
arcLBitmap.x = 318;
arcLBitmap.y = 307;
middleLayer.addChild(arcLBitmap);

LTweenLite.to(arcLBitmap, 5, { rotate: 360, loop: true, playStyle: LTweenLite.PlayStyle.Init });

for (var c = 0; c < 4; c++) {
    var player_sLBitmap = new LBitmap(new LBitmapData(imglist["player_" + (c + 1) + "_s"]));
    if (c == 0) {
        player_sLBitmap.x = 0;
        player_sLBitmap.y = 721;
    } else if (c == 1) {
        player_sLBitmap.x = 73;
        player_sLBitmap.y = 720;
    } else if (c == 2) {
        player_sLBitmap.x = 148;
        player_sLBitmap.y = 705;
    } else if (c == 3) {
        player_sLBitmap.x = 434;
        player_sLBitmap.y = 645;
    }
    player_sLBitmap.visible = false;
    middleLayer.addChild(player_sLBitmap);

    player_sList.push(player_sLBitmap);
}

for (var d = 0; d < 4; d++) {
    var player_bLBitmap = new LBitmap(new LBitmapData(imglist["player_" + (d + 1) + "_b"]));
    if (d == 0) {
        player_bLBitmap.x = 0;
        player_bLBitmap.y = 649;
    } else if (d == 1) {
        player_bLBitmap.x = 29;
        player_bLBitmap.y = 658;
    } else if (d == 2) {
        player_bLBitmap.x = 102;
        player_bLBitmap.y = 651;
    } else if (d == 3) {
        player_bLBitmap.x = 376;
        player_bLBitmap.y = 574;
    }
    player_bLBitmap.visible = false;
    middleLayer.addChild(player_bLBitmap);

    player_bList.push(player_bLBitmap);
}

for (var a = 0; a < 4; a++) {
    var actor_nLBitmap = new LBitmap(new LBitmapData(imglist["actor_" + (a + 1) + "_n"]));
    actor_nLBitmap.x = 62 + a * 150;
    actor_nLBitmap.y = 436;
    actor_nLBitmap.visible = false;
    middleLayer.addChild(actor_nLBitmap);

    actor_nList.push(actor_nLBitmap);
}

for (var b = 0; b < 4; b++) {
    var actor_sLBitmap = new LBitmap(new LBitmapData(imglist["actor_" + (b + 1) + "_s"]));
    actor_sLBitmap.x = 56 + b * 150;
    actor_sLBitmap.y = 412;
    actor_sLBitmap.visible = false;
    middleLayer.addChild(actor_sLBitmap);

    actor_sList.push(actor_sLBitmap);
}

selPlayer(sp);

middleLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function (event) {
    if (event.offsetY > 443) {
        if (event.offsetX < 160) {
            selPlayer(0);
            sound_get.play();
        } else if (event.offsetX >= 160 && event.offsetX < 320) {
            selPlayer(1);
            sound_get.play();
        } else if (event.offsetX >= 320 && event.offsetX < 480) {
            selPlayer(2);
            sound_get.play();
        } else if (event.offsetX >= 480) {
            selPlayer(3);
            sound_get.play();
        }
    }
});
}

function loadSound() {
if (!isLoadSound) {
    isLoadSound = true;
    sound_bg.load(imglist["sound_bg"]);
    sound_get.load(imglist["sound_get"]);
    sound_jumps.forEach(element => {
        element.load(imglist["sound_jump"]);
    });
    sound_start.load(imglist["sound_start"]);
    sound_lose.load(imglist["sound_lose"]);
}
}

function selPlayer(n) {
sp = n;
for (var a = 0; a < 4; a++) {
    if (a == n) {
        actor_nList[a].visible = false;
        actor_sList[a].visible = true;
        player_sList[a].visible = false;
        player_bList[a].visible = true;
    } else {
        actor_nList[a].visible = true;
        actor_sList[a].visible = false;
        player_sList[a].visible = true;
        player_bList[a].visible = false;
    }
}
}

function MiddleBitmap(bitmapData) {
var self = this;
base(self, LSprite, []);
self.bitmapTitle = new LBitmap(bitmapData);
self.bitmapTitle.x = -self.bitmapTitle.getWidth() * 0.5;
self.bitmapTitle.y = -self.bitmapTitle.getHeight() * 0.5;
self.addChild(self.bitmapTitle);
}

function TopRightBitmap(bitmapData) {
var self = this;
base(self, LSprite, []);
self.bitmapTitle = new LBitmap(bitmapData);
self.bitmapTitle.x = -self.bitmapTitle.getWidth();
self.bitmapTitle.y = 0;
self.addChild(self.bitmapTitle);
}

function BottomBitmap(bitmapData) {
var self = this;
base(self, LSprite, []);
self.bitmapTitle = new LBitmap(bitmapData);
self.bitmapTitle.x = -self.bitmapTitle.getWidth() * 0.5;
self.bitmapTitle.y = -self.bitmapTitle.getHeight();
self.addChild(self.bitmapTitle);
}

function LoadingSample4(height, background, color, loadimg) {
base(this, LSprite, []);
var s = this,
    c = LGlobal.canvas;
s.backgroundColor = background == null ? "#000000" : background;
s.graphics.drawRect(1, s.backgroundColor, [0, 0, LGlobal.width, LGlobal.height], true, s.backgroundColor);
if (color == null) color = "#FFFFFF";

var loadingLBitmap = new LBitmap(new LBitmapData(loadimg["loading"]));
loadingLBitmap.x = LGlobal.width * 0.5 - 35;
loadingLBitmap.y = height - 120;
s.addChild(loadingLBitmap);

s.progress = 0;
s.label = new LTextField();
s.label.color = color;
s.label.size = 30;
s.label.x = LGlobal.width * 0.5;
s.label.y = height - s.label.getHeight() * 0.5 + 40;
s.addChild(s.label);

s.setProgress(s.progress);
}
LoadingSample4.prototype.setProgress = function (value) {
var s = this;
if (value > 100) value = 100;
value = Math.floor(value);
s.progress = value;
s.label.text = value + "%";
s.label.x = LGlobal.width * 0.5 - s.label.getWidth() * 0.5;
};