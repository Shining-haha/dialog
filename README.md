# dialog

结构：弹框分为 头部(header) & 内容(body) & 底部(footer);
		header: 标题(title)、关闭(close)
		header: 取消(cancel)、确定(save)
数据：
<div class="content"></div>
$(".content").init();
var options = {
	'title':'我的弹框', //弹框头部标题
	'buttons':[
			{'label':'按钮一','class':'btn-cancel',
				onCancel:function(){
					console.log('按钮一');
				}
			}, //按钮文本，按钮样式，按钮回调方式
			{'label':'按钮二','class':'btn-save',
				onSave:function(){
					console.log('按钮二');
				}
			},
			{'label':'按钮三','class':'样式名',
				onClick:function(){
					console.log('按钮三');
				}
			},
		], //默认有取消和确定两个按钮
	'visible':'boolean', //默认弹框是否打开
	'haveheader':'boolean', //是否需要头部,默认true
	'closable':'boolean', //头部关闭按钮是否显示,默认true
	'maskClosable':'boolean', //是否允许点击蒙层关闭弹框,默认true
	'style':{'width':'','height':'','top':'','left':''}, //设置弹框的宽度、高度、上间距、左间距
	'footerstyle':'', //底部按钮显示位置，默认居右  left:居左  center:剧中
	'dragdrop': false //是否允许弹框拖拽 默认false
};
	
功能：
1、'右上角关闭'、'蒙层'、'btn-cancel'点击关闭对话框并回调onCancel()方法;
2、button点击回调各自方法;



提供样式类：
md-btn-highlight:底部按钮背景色高亮

