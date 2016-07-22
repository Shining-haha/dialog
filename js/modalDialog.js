/**
 * Created by xiaailin on 16/06/14.
 */
+function ($){
    var ModalDialog = function(element,options){
        this.$element = $(element);
        this.options = $.extend({},ModalDialog.DEFAULTS,options);
        this.init();
    };

    /*模态弹出框默认属性*/
    ModalDialog.DEFAULTS = {
        'visible':true, //默认弹框是否打开
        'haveheader':true, //是否需要头部,默认true
        'closable':true, //头部关闭按钮是否显示,默认true
        'maskClosable':true, //是否允许点击蒙层关闭弹框,默认true
        'dragdrop': false //是否允许弹框拖拽
    };

    /*模态弹出框初始化*/
    ModalDialog.prototype.init = function() {
        /*生成最基本的DOM*/
        this.createDom();

        /*数据初始化*/
        this.data(this.options);

        /*事件初始化*/
        this.initEvent();
    };
    /*DOM化*/
    ModalDialog.prototype.createDom = function() {
        var html = '<div class="md-modaldialog">'+
                        '<div class="md-overlay"></div>'+
                        '<div class="md-dialog">'+
                            '<div class="md-dialog-content">'+
                                this.$element.html()+
                            '</div>'+
                            '<div class="md-dialog-footer"></div>'+
                        '</div>'+
                    '</div>';
        this.$element.html(html);
    };
    /*数据初始化*/
    ModalDialog.prototype.data = function(options) {
        var footerhtml = '',
            $content = this.$element.find(".md-dialog-content"),
            $footer = this.$element.find(".md-dialog-footer");
        if(options.haveheader){
            var html = '<div class="md-dialog-header">'+
                            '<p class="md-title">'+options.title+'</p>';
            html += options.closable ? '<span class="iconfont icon-close md-close"></span>' : ''; //显示头部关闭按钮
            html += '</div>';
            $content.before(html); //显示头部
        }
        if(options.buttons){
            for(var i = 0, len = options.buttons.length; i < len; i+=1) {
                var obj = options.buttons[i];
                footerhtml += '<button class="md-btn '+obj.class+' ">'+obj.label+'</button>';
            }
        }else{
            footerhtml = '<button class="md-btn">取消</button>'+
                         '<button class="md-btn md-btn-highlight">确定</button>';
        }
        $footer.html(footerhtml); //显示底部按钮
        if(options.footerstyle === 'left'){ //设置底部按钮居左显示
            $footer.css('text-align','left');
        }else if(options.footerstyle === 'center'){ //设置底部按钮居中显示
            $footer.css('text-align','center');
        }
        options.style && $(".md-dialog").css(options.style); //设置弹框样式
        $content.height($(".md-dialog").height()-($footer.height()+$(".md-dialog-header").height()+2+30)); //设置内容部分的高度；//2：边框的高度；30：margin的上下间距
        !options.visible && this.$element.find(".md-modaldialog").parent().hide();
    };
    /*事件初始化*/
    ModalDialog.prototype.initEvent = function() {
        var self = this,
            $dialog = this.$element.find(".md-modaldialog").parent();
        this.$element.on('click', '.md-close', function(){ //点击弹框头部关闭按钮
            $dialog.hide(); //隐藏弹框
            self.options.onClose.call(self);
        });
        this.$element.on('click', '.md-btn', function(){
            $dialog.hide();
            var $buttons = self.options.buttons;
            for(var i=0,len=$buttons.length;i<len;i+=1){
                var $obj = $buttons[i];
                if($(this).text()==$obj.label){
                    $obj.onClick.call(self);
                }
            }
        });
        this.$element.on('click', '.md-overlay', function(){
            if(self.options.maskClosable){
                $dialog.hide();
            }
        });

        //是否允许弹框拖拽
        if(this.options.dragdrop) { 
            var z,x,y,lt,tp; //声明全局变量
            var $mddialog = this.$element.find(".md-dialog"); //弹框对象
            $mddialog.on('mousedown', function(e){//鼠标按下
                e = e || window.event;
                x = parseInt(e.clientX),
                y = parseInt(e.clientY),
                lt = parseInt($(this).css('left')),
                tp = parseInt($(this).css('top')),
                z = true;
            });
            $mddialog.on('mousemove', function(e){//鼠标移动
                var e = e || window.event,
                    m = parseInt(e.clientX),
                    n = parseInt(e.clientY);
                    if(z){
                        var l = lt + (m - x),
                            t = tp + (n - y);
                        $mddialog.css({'left':l,'top':t}); //将移动后的坐标赋给相应的位移
                    }
            });
            $mddialog.on('mouseup', function(){ //鼠标松开
                z = false;
            });
        }

    };
    function Plugin(option){
        var args = Array.prototype.slice.call(arguments, 1);
        var returnValue = this;
        this.each(function(){
            var $this = $(this),
                data = $this.data('mg.modaldialog'),
                options = typeof option === 'object' && option;

            if(!data){
                $this.data('mg.modaldialog',(data = new ModalDialog(this,options)));
            }

            if(typeof option === 'string'){
                returnValue = data[option].apply(data, args) || returnValue;
            }
        });
        return returnValue;
    }

    var old = $.fn.modaldialog;

    $.fn.modaldialog = Plugin;
    $.fn.modaldialog.Constructor = ModalDialog;

    $.fn.modaldialog.noConflict = function(){
        $.fn.modaldialog = old;
        return this;
    }
}(jQuery);