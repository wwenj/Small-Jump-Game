$(function () {
	/*记录跳瓶初始位置*/
	var pingTop = 70;
	var pingLeft = 15;

	var timer;	//记录按压时间的计时器
	var clickTime=0; //初始按压跳转距离为0

	//鼠标按下&&记录按压数
	$(".face-top").mousedown(clickDwon);
	$(".ping").mousedown(clickDwon);

	//鼠标抬起&&执行跳跃
	$('.face-top').mouseup(clickUp);
	$('.ping').mouseup(clickUp);



	/************************************************************************ */
	//鼠标按下
	function clickDwon(){ //鼠标按压记录值
		timer=setInterval(function(){
			clickTime++
		},40)
	}

	//鼠标抬起
	function clickUp(){	//鼠标抬起进行跳跃
		clearInterval(timer)//停止计时
		console.log('up')
		console.log(clickTime)

		pingTop = pingTop - clickTime; //点击跳跃，改变位置，新位置为旧位置减去计时器记录时间
		pingLeft = pingLeft + clickTime;

		$('.ping').animate({ //改变跳瓶位置
			top: pingTop + '%',
			left: pingLeft + '%'
		}, 500);

		//改变跳瓶位置后移动去掉跳跃后的跳块
		setTimeout(function () {	
			for (let i = 0; i < 4; i++) {
				/*获取每个跳块的定位像素转化为百分比，*/
				var ulTop = $(".ulbox").eq(i).css('top').slice(0, 3) / 570 * 100
				var ulTeft = $(".ulbox").eq(i).css('left');
				ulTeft = ulTeft.substring(0, ulTeft.length - 2) / 570 * 100;

				if (ulTop > 90) {
					ulTop = 20; //跳块超过边界返回最上方，更新坐标位置
					ulTeft = 70;

					$(".ulbox").eq(i).css({
						top: '20%',
						left: '70%'
					}, 500);
				}
				/*把每个跳块向后移一个*/
				$(".ulbox").eq(i).animate({
					top: ulTop + 20 + '%',
					left: ulTeft - 20 + '%'
				}, 500);
			};
			/*跳瓶也向下滑动一个*/
			pingTop = pingTop + 20; //跳跃之后返回，更新当前跳瓶位置
			pingLeft = pingLeft - 20
			$('.ping').animate({
				top: pingTop + '%',
				left: pingLeft + '%'
			}, 500);
		}, 600);

		clickTime=0 //跳跃完成后初始化按压记录值
	}






})