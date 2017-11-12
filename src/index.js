$(document).ready(function () {

    //-----------------------------------------定义和初始化变量----------------------------------------
    var loadBox = $('aside.loadBox');
    var articleBox = $('article');
    var windowScale = window.innerWidth / 750;

    //load
    var pageLoad = $('aside.pageLoad');
    var loadPer = pageLoad.find('.per span');

    //----------------------------------------页面初始化----------------------------------------
    icom.init(init);//初始化
    icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

    function init() {
        requestAnimationFrame(function () {
            iuser.init(userGetted);
            //			load_handler();
        });
    }//edn func

    //----------------------------------------微信用户登录验证----------------------------------------	
    function userGetted(data) {
        console.log('用户头像：' + data.headimage);
        console.log('用户昵称：' + data.nickname);
        load_handler();
        sound_handler();
        //重新设置默认微信分享内容
        var share = {};
        share.link = ishare.url + '?jd=' + jingdong;
        ishare.reset(share);
    }//end func
    
    //----------------------------------------加载声音及处理----------------------------------------
    var soundList;
    
    function sound_handler(){
		if(os.weixin) {
			try {
				WeixinJSBridge.invoke("getNetworkType", {}, sound_creat);
			}//end try
			catch(e) {
				wx.ready(sound_creat);
			}//edn catch
		}//edn if
		else sound_creat();
	}//edn func
    
    function sound_creat(){
		console.log('sound_creat')
		ibgm.init({ src: 'images/bgm.mp3' });
        soundList = iaudio.on([{ src: 'images/ding.mp3' }]);
	}//end func

    //----------------------------------------加载页面图片----------------------------------------
    function load_handler() {
        var loader = new PxLoader();
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/common/turn.png');
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/load/circle.png');
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/common/bg.jpg');

        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/index/cloud1.png');
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/index/cloud2.png');
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/index/cloud3.png');
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/index/cloud4.png');
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/index/man.png');
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/index/text.png');
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/index/btn.png');
        loader.addImage('http://img.cdn.be-xx.com/lenovo_face/images/index/btnbg.png');


        //实际加载进度
        loader.addProgressListener(function (e) {
            var per = Math.round(e.completedCount / e.totalCount * 25);
            loadPer.html(per + '%');
        });

        loader.addCompletionListener(function () {
            init_handler();
            //			load_timer(25);//模拟加载进度
            loader = null;
        });
        loader.start();
    }//end func

    //模拟加载进度
    function load_timer(per) {
        per = per || 0;
        per += imath.randomRange(1, 3);
        per = per > 100 ? 100 : per;
        loadPer.html(per + '%');
        if (per == 100) setTimeout(init_handler, 200);
        else setTimeout(load_timer, 40, per);
    }//edn func

    //----------------------------------------页面逻辑代码----------------------------------------
    function init_handler() {
        console.log('init handler');
        icom.fadeOut(pageLoad, 750, function () {
            pageLoad.remove();
        });
        monitor_handler();
        index_handler();
        //		menu_handler();
        //		camera_handler();
        //		combin_handler();
    }//end func


    //---------------------------------------------------index------------------------------------
    var indexBox = $('section.index');
    var indexClouds = indexBox.children('.clouds');
    var indexCloud = indexClouds.children();
    var indexBody = indexBox.children('.body');
    var btnStart = indexBody.find('a.btnStart');
    

    function index_handler() {
        console.log('index_handler');
        indexBox.show();
        indexClouds.css({ opacity: 0 }).show().transition({ opacity: 1, delay: 0 }, 1200);
        indexBody.css({ opacity: 0 }).show().transition({ opacity: 1, delay: 500 }, 1400);
        indexCloud.each(function (i, n) {
            if (i < 2) $(n).transition({ x: -$(n).width(), delay: 750 }, 2000);
            else $(n).transition({ x: $(n).width(), delay: 750 }, 2000, function () {
                if (i == indexCloud.length - 1) indexClouds.remove();
            });
        });
        btnStart.one('touchend', btnStart_click);
    }//edn func
	
	function btnStart_click(e) {
        menu_handler();
        imonitor.add({ label: 'Yes,I do' });
    }//edn func
	
    //---------------------------------------------------menu-----------------------------------
    var menuBox = $('section.menu');
    var menuBody = menuBox.children('.body');
    var thumbShell = menuBox.find('.thumbs'), thumbBox, thumbId = 0;
    var thumbList = ['极速者', '治愈师', '行空侠', '奏诗者', '绘梦师', 'Pink Angel'];
    var thumbMax = thumbList.length;

    function menu_handler() {
        console.log('menu_handler');
        menu_reset();
        icom.fadeOut(indexBox, 500, function () {
            indexBox.remove();
        })
    }//edn func

    function menu_reset() {
        thumbShell.empty();
        for (var i = 0; i < thumbMax; i++) {
            var li = $('<li><p>' + thumbList[i] + '</p></li>').appendTo(thumbShell);
        }//edn for
        thumbBox = thumbShell.children();
        thumbBox.one('touchend', thumbBox_click);
        icom.fadeIn(menuBox, 750);
    }//edn func

    function thumbBox_click(e) {
        thumbId = $(this).index();
        thumbBox.off().addClass('unable');
        var x = $(this).position().left;
        var y = $(this).position().top;
        console.log('size:' + thumbBox.outerWidth() + '/' + thumbBox.outerHeight());
        console.log('x:' + x);
        console.log('y:' + y);
        var xTar = thumbShell.outerWidth() * 0.5;
        var yTar = thumbBox.outerHeight() * 0.55;
        console.log('xTar:' + xTar);
        console.log('yTar:' + yTar);
        if (thumbId == 0) offset = thumbBox.outerWidth() * 0.14;
        else if (thumbId == 1) offset = 0;
        else if (thumbId == 2) offset = -thumbBox.outerWidth() * 0.14;
        else if (thumbId == 3) offset = thumbBox.outerWidth() * 0.06;
        else if (thumbId == 4) offset = -thumbBox.outerWidth() * 0.06;
        else if (thumbId == 5) offset = -thumbBox.outerWidth() * 0.14;
        var offsetX = xTar - x - thumbBox.outerWidth() * 0.55 - offset;
        var offsetY = yTar - y;
        console.log('offsetX:' + offsetX);
        console.log('offsetY:' + offsetY);
        $(this).css({ zIndex: 1 }).addClass('active').transition({ scale: 1.15, x: offsetX, y: offsetY }, 750);
        $(this).siblings().transition({ scale: 0.7, opacity: 0 }, 750);
        setTimeout(function () {
            console.log('thumbId:' + thumbId);
            camera_handler();
        }, 500)
    }//edn func

    //---------------------------------------------------camera------------------------------------
    var cameraBox = $('section.camera');
    var btnCamera = cameraBox.find('a.btnCamera');
    var btnSubmit = cameraBox.find('a.btnSubmit');
    var btnReload = cameraBox.find('a.btnReload');
    var cameraFrame = cameraBox.find('.camera');
    var cameraFace = cameraFrame.children('.face');

    var imgShell = cameraFrame.children('.shell');
    var imgCanvas, imgLayer;
    var imgScaleMin = 0.1, imgScaleMax = 5, imgScaleTimer;
    var fileInput;
    var jcanvasScale = 2;//canvas实际放大倍数
    var cameraSrc = 'images/combin/p' + (thumbId + 1) + '.jpg';

    var ulseeBox = cameraBox.find('.ulsee');

    function camera_handler() {
        indexBox.remove();
        icom.fadeOut(menuBox, 750);
        icom.fadeIn(cameraBox, 750);
        if (fileInput) fileInput.off().remove();
        fileInput = $('<input type="file" accept="image/*" name="imageInput" />').appendTo('body');
        fileInput.off().on('change', file_select);
        imgShell.empty();
        imgCanvas = $('<canvas></canvas>').attr({ width: imgShell.width() * jcanvasScale, height: imgShell.height() * jcanvasScale, jcanvasScale: jcanvasScale }).css({ scale: 1 / jcanvasScale }).prependTo(imgShell);
        imgCanvas[0].getContext("2d").imageSmoothingEnabled = true;
        cameraFace.hide();
        btnCamera.show().off().on('touchend', btnCamera_click);
        btnReload.hide().off().on('touchend', btnCamera_click);
        btnSubmit.hide().off().on('touchend', btnSubmit_click);
        ulseeBox.show();
    }//edn func

    //拍照或打开本地图片
    function file_select(e) {
        console.log('file_select');
        var file = this.files[0];
        if (file) {
            loadBox.show();
            ireader.read({
                file: file, callback: function (resp, wd, ht) {
                    if (resp) img_creat(resp, wd, ht);
                    else loadBox.hide();
                }
            });
        }//end if
    }//end select

    //复制图片至canvas
    function img_creat(src, wd, ht) {
        loadBox.hide();
        btnCamera.hide();
        btnSubmit.css({ display: 'inline-block' });
        btnReload.css({ display: 'inline-block' });
        cameraFace.show();
        var size = imath.autoSize([wd, ht], [imgCanvas.width(), imgCanvas.height()], 1);
        imgCanvas.removeLayers()
            .drawImage({
                layer: true,
                source: src,
                width: size[0], height: size[1],
                x: imgCanvas.width() * 0.5, y: imgCanvas.height() * 0.5,
                scale: 1,
                fromCenter: true
            }).drawLayers();
        var layer = imgCanvas.getLayer(-1);
        img_addEvent(imgShell, imgCanvas, layer);
    }//end func


    //添加图片编辑事件
    function img_addEvent(shell, canvas, layer) {
        shell.off().on('pinch', { layer: layer, canvas: canvas }, img_pinch).on('pinchmove', { layer: layer }, img_pinchmove).on('pinchscale', { layer: layer }, img_pinchscale).on('pinchrotate', { layer: layer }, img_pinchrotate);
    }//end func

    //单指双指触控
    function img_pinchmove(e, xOffset, yOffset) {
        var layer = e.data.layer;
        layer.x += xOffset;
        layer.y += yOffset;
    }//end func

    function img_pinchscale(e, scaleOffset) {
        var layer = e.data.layer;
        layer.scale += scaleOffset * 0.5;
        layer.scale = layer.scale <= imgScaleMin ? imgScaleMin : layer.scale;
        layer.scale = layer.scale >= imgScaleMax ? imgScaleMax : layer.scale;
    }//end func

    function img_pinchrotate(e, rotateOffset) {
        var layer = e.data.layer;
        layer.rotate += rotateOffset;
        // 		layer.rotate=layer.rotate>360?layer.rotate%360:layer.rotate;
        // 		layer.rotate=layer.rotate<-360?-layer.rotate%360:layer.rotate;
    }//end func

    function img_pinch(e) {
        var canvas = e.data.canvas;
        canvas.drawLayers();
    }//end func


    //---------------------------------------------------拍照事件
    function btnCamera_click(e) {
        fileInput.click();
        imonitor.add({ label: '上传照片' });
    }//edn func

    //图片确定按钮，图片编辑步骤控制
    function btnSubmit_click(e) {
        loadBox.show();
        var data = imgCanvas.getCanvasImage('jpeg', 1);
        console.log(data.length);
        //			icom.canvas_send(imgCanvas[0],image_combine_complete,'social_touch_Lenovo');

        //模拟ajax
        //		setTimeout(image_send_complete,500);

        //ajax写这里
        image_send(data, thumbId + 1, image_send_complete);


        imonitor.add({ label: '邂逅不同' });
    }//end func

    function image_send(bs64, tid, callback) {
        switch (tid) {
            case 1:
                tid = 112;
                break;
            case 2:
                tid = 109;
                break;
            case 3:
                tid = 110;
                break;
            case 4:
                tid = 111;
                break;
            case 5:
                tid = 113;
                break;
            case 6:
                tid = 568;
                break;
        }
        $.ajax({
            type: "POST",
            async: true,
            url: "http://qt.dev.be-xx.com/handle/interface.ashx",
            data: { mod: 'Photo', bs64: bs64.split(',')[1], tmpid: tid },
            dataType: "text",
            success: function (res) {
                if (res.length > 2) {
                    callback(res);
                }
                else if (res == '-2') {
                    loadBox.hide();
                    icom.alert("脸型不正");
                }
            },
            error: function (msg) {
                loadBox.hide();
                icom.alert(msg);
            }
        });
    }//end func


    function image_send_complete(src) {
        //		cameraSrc=src||'images/combin/p'+(thumbId+1)+'.jpg';
        cameraSrc = src ? 'data:image/png;base64,' + src : 'images/combin/p' + (thumbId + 1) + '.jpg';
        console.log(src.length);
        combin_handler();
    }//end func

    //---------------------------------------------------combin------------------------------------
    var combinBox = $('section.combin');
    var combinText = [];
    combinText.push('哇塞，居然是<b>极速赛车手</b><br/>老司机很给力嘛~喜欢你的新人生吗？');
    combinText.push('哇塞，原来是<b>治愈系医生</b><br/>白大褂也穿得这么拉风！喜欢你的新人生吗？');
    combinText.push('哇塞，这不是<b>酷炫飞行员</b><br/>带我离开地表拽上天！喜欢你的新人生吗？');
    combinText.push('哇塞，这不是<b>奏诗音乐家</b><br/>有兴趣做我的演唱会嘉宾吗？喜欢你的新人生吗？');
    combinText.push('哇塞，竟然是<b>绘梦设计师</b><br/>你的超级秀场可要带上我！喜欢你的新人生吗？');
    combinText.push('哇塞，原来是神秘的<b>Pink Angel</b><br/>T台上的你光芒四射！喜欢你的新人生吗？');

    var combinShell = combinBox.children('.shell');
    var combinCanvas;
    var btnReplay = combinBox.find('a.btnReplay');
    var btnFind = combinBox.find('a.btnFind');

    var jingdong = parseInt(icom.getQueryString('fr'));
    jingdong = jingdong || 0;
    console.log('京东:' + jingdong);

    function combin_handler() {
        indexBox.remove();
        menuBox.hide();
        combinShell.empty();
        icom.fadeOut(cameraBox, 750);
        icom.fadeIn(combinBox, 750);
        var list = [];
        list.push(cameraSrc);
        list.push('images/combin/logo.png');
        list.push('images/combin/banner.png');
        list.push('images/combin/qrcode.png');
        icom.imageLoad(list, combin_creat);
    }//edn func


    function combin_creat() {
        var title = combinBox.children('h4').html(combinText[thumbId]);
        var scale = 2;
        var size = [combinShell.width() * scale, combinShell.height() * scale];
        console.log('size:' + size);
        combinCanvas = $('<canvas></canvas>').attr({ width: size[0], height: size[1] });
        //		combinCanvas.appendTo(combinShell);

        // 虚拟按键机型，二维码拼合位置适配
        var _x, _y;
        if (window.innerWidth == 360 && window.innerHeight < 560) {
            _x = 455 * windowScale * 2;
            _y = 710 * windowScale * 2;
        } else {
            _x = 490 * windowScale * 2;
            _y = 772 * windowScale * 2;
        }

        combinCanvas
            .drawImage({
                layer: true,
                source: cameraSrc,
                width: size[0], height: size[1],
                x: 0, y: 0,
                fromCenter: false
            })
            //		.drawImage({
            //		  layer: true,
            //		  source: 'images/combin/logo.png',
            //		  width:102*windowScale*scale,height:78*windowScale*scale,
            //		  x: 25*windowScale*scale, y: 25*windowScale*scale,
            //		  fromCenter: false
            //		})
            //		.drawImage({
            //		  layer: true,
            //		  source: 'images/combin/banner.png',
            //		  width:size[0],height:244*windowScale*scale,
            //		  x: 0, y: size[1]-244*windowScale*scale,
            //		  fromCenter: false
            //		})
            .drawImage({
                layer: true,
                source: 'images/combin/qrcode.png',
                width: 90 * windowScale * scale, height: 90 * windowScale * scale,
                x: _x, y: _y,
                fromCenter: false
            })
            .drawLayers();

        icom.canvas_send(combinCanvas[0], image_combine_complete, 'social_touch_Lenovo');
    }//edn func

    function image_combine_complete(src) {
        console.log('combin src:' + src);
        icom.imageLoad(src, image_combine_creat);
        combinCanvas = null;
    }//end func

    function image_combine_creat(src) {
        icom.fadeOut(loadBox, 350);
        combinShell.empty();
        $('<img>').attr({ src: src }).css({ opacity: 0 }).appendTo(combinShell).transition({ opacity: 1 }, 1500);
        $('<i></i>').appendTo(combinShell);
        btnReplay.off().one('touchend', btnReplay_click);
        btnFind.off().on('touchend', btnFind_click);

        //重新设置默认微信分享内容
        var share = {};
        share.link = ishare.url + 'share.html?thumb=' + thumbId + '&pic=' + src;
        share.image = src;
        //		share.friend=share.timeline='史上最难月相达人挑战赛，我已打败的选手，等你来超越！';
        ishare.reset(share);

        // 合成图片添加配音
        soundList.ding.play();

        requestAnimationFrame(function () {
            loadBox.hide();
        });

    }//edn func

    function btnReplay_click(e) {
        icom.fadeOut(combinBox, 750);
        menu_reset();
        imonitor.add({ label: '再次邂逅' });
    }//edn func

    function btnFind_click(e) {
        var url = jingdong ? 'http://dwz.cn/6pLOVY' : 'http://dwz.cn/6pLQ12';
        setTimeout(function () {
            location.href = url;
        }, 200);
        imonitor.add({ label: jingdong ? '去京东' : '去官网' });
    }//edn func

    //----------------------------------------页面监测代码----------------------------------------
    function monitor_handler() {
        //		imonitor.add({obj:$('a.btnTest'),action:'touchstart',index:'',category:'',label:'测试按钮'});
    }//end func

});//end ready
