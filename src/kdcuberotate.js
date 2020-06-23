import './cubeRotate.css';
function KdCubeRotate(selector,option){
    if(!this instanceof KdCubeRotate)
        return new KdCubeRotate(selector,option);

    /*类的共有变量*/    
    this._target;
    this._option;
    this._imgList;
    this._index;
    this._timer;
    this._timeName;
    this._rotio;
    this._index;
    this._canOption;
    this._transitionEndNum;
    var that=this;

    if(typeof(selector)!=='string')
    {
        throw new Error("selector must be a String");
    }
    else{
        init();
    }
    
    /*私有方法*/
    function init(){
        that._index=0;
        that._timer=null;
        that._canOption=false;
        that._target=document.querySelector(selector);
        if(that._target===null)
           throw new Error("Specified dom not found");
        if(that._target.querySelector("ul")===null || that._target.querySelector("li")===null)
            throw new Error("The html content does not conform with the specifications");
        if(!that._target.className.match(/^box_rotate$|^box_rotate\s|\sbox_rotate$|\sbox_rotate\s/)){
            that._target.className+=" box_rotate";
        }
        var defaults={
			cubeNum:4,
			autoPlay:false,
			playTime:4000,
			direct:"v",
			cubeRandom:false,
			lowLevel:false,
			onReady:null,
			transitionComplete:null
		};
        //that._option=Object.assign(defaults,option);
        if(option!==undefined && Object.prototype.toString.call(option) === '[object Object]'){
            for(var key in defaults){
                if(option[key]!=undefined){
                    if(key=="direct"){
                        if(option[key]!="v" && option[key]!="h")
                            option[key]="v";
                    }
                    defaults[key]=option[key];
                }
                    
            }
        }
        
        that._option=defaults;
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            that._option.lowLevel=true;
        that._target.querySelector("ul").style.listStyle="none";
        for(var i=0;i<that._target.querySelectorAll("li").length;i++){
            that._target.querySelectorAll("li")[i].style.listStyle="none";
        }
        that._imgList=that._target.querySelectorAll("img");
        if(that._imgList.length>0){
            loadImg();
            that._timer=setInterval(loadImg2,500);
        }
        else{
            throw new Error("not find images");
        }
    }
    function loadImg(){
        var imgLoadedNum=0;
        var imgTotalNum=that._imgList.length;
        for(var i=0;i<imgTotalNum;i++){
            var img=that._imgList[i];
            img.onload=function(e){
                imgLoadedNum++;
                if(imgLoadedNum==imgTotalNum){
                    if(that._timer!=null)
				    {
					    clearInterval(that._timer);
					    that._timer=null;
                    } 
                    imgLoadedHandler();  
                }
            }
            
        }
    }
    function loadImg2(){
        var imgLoadedNum=0;
        var imgTotalNum=that._imgList.length;
		for(var i=0;i<imgTotalNum;i++)
		{
            var img=that._imgList[i];
			if(img.naturalWidth!=0 && img.naturalHeight!=0)
			{
				imgLoadedNum++;
				if(imgLoadedNum==imgTotalNum)
				{
					clearInterval(that._timer);
					that._timer=null;
					imgLoadedHandler();
				}
					
			}
			else
				break;
		}
    }
    function imgLoadedHandler(){
        setTargetHeight();
        var imgNum=that._imgList.length;
        var liList=that._target.querySelector("ul").querySelectorAll("li");
        for(var i=0;i<liList.length;i++){
            liList[i].style.visibility="visible";
            if(i!=that._index){
                liList[i].style.display="none";
            }
        }
        window.onresize=function(e){
            var sizeHeight=that._target.offsetWidth/that._rotio;
		    that._target.style.height=sizeHeight+"px";
        }
        if(imgNum>1)
		{
			that._canOption=true;
			
			if(that._option.autoPlay==true)
			{
				that._timeName=setInterval(autoPlayFun,that._option.playTime); 
            }
            if(that._option.onReady && typeof that._option.onReady==="function")
                that._option.onReady();
		}
    }
    function setTargetHeight(){
        var imgList=that._imgList;
		var minHeight=imgList[0].offsetHeight;
        for(var i=0;i<imgList.length;i++){
            if(minHeight>imgList[i].offsetHeight)
                minHeight=imgList[i].offsetHeight;
        }
        that._target.style.height=minHeight+"px";
		that._rotio=that._target.offsetWidth/minHeight;
    }
    function autoPlayFun(){
        that.next();
    }
}
KdCubeRotate.prototype.constructor=KdCubeRotate
KdCubeRotate.prototype.onEndTransitionFn=function(that,e){
    e.stopPropagation();
    e.currentTarget.removeEventListener('transitionend', this.onEndTransitionFn);
    that._transitionEndNum++;
    that._option;
    if(that._transitionEndNum==that._option.cubeNum)
    {
        that._target.querySelector(".cubeContainer").parentNode.removeChild(that._target.querySelector(".cubeContainer"));
        var imgList=that._target.querySelector("ul").querySelectorAll("li");
        if(that._option.lowLevel){
            for(var i=0;i<imgList.length;i++){
                if(imgList[i].style.display==="block"){
                    imgList[i].style.display="none";
                    break;
                }
            }
        }
        imgList[that._index].style.display="block";
        if(that._option.autoPlay==true)
        {
            that._timeName=setInterval(function(){
                that.next();
            },that._option.playTime);
        }
        that._canOption=true;
        if(that._option.transitionComplete && typeof that._option.transitionComplete==="function")
            that._option.transitionComplete(that._index);
    }
        
}
KdCubeRotate.prototype.rotateVerticalCube=function(){
    var cubeNum=this._option.cubeNum;
    var cubeContainer=this._target.querySelector(".cubeContainer");
    var cubeList=cubeContainer.querySelectorAll(".cube");
    var cubeHeight=cubeContainer.offsetHeight;
    var cubeWidth=cubeContainer.offsetWidth/cubeNum;
    var cubeZ=cubeHeight/2;
    var currentAngle=-90;
    this._transitionEndNum=0;
    for(var i=0;i<cubeNum;i++)
    {
        var tp=i*cubeWidth;
        cubeList[i].style.transition="transform 0.3s ease "+i/6+"s";
        cubeList[i].style.transform="translate3d(0,0,-"+cubeZ+"px) rotateX("+currentAngle+"deg)";
    }
}
KdCubeRotate.prototype.rotateHorizontalCube=function(){
    var cubeNum=this._option.cubeNum;
    var cubeContainer=this._target.querySelector(".cubeContainer");
    var cubeList=cubeContainer.querySelectorAll(".cube");
	var cubeHeight=cubeContainer.offsetHeight/cubeNum;
	var cubeWidth=cubeContainer.offsetWidth;
	var cubeZ=cubeWidth/2;
	var currentAngle=90;
	this._transitionEndNum=0;
	for(var i=0;i<cubeNum;i++)
	{
            var tp=i*cubeWidth;
            cubeList[i].style.transition="transform 0.3s ease "+i/6+"s";
            cubeList[i].style.transform="translate3d(0,0,-"+cubeZ+"px) rotateY("+currentAngle+"deg)";
	}
}
KdCubeRotate.prototype.moveCube=function(){
    var cubeNum=this._option.cubeNum;
    var cubeContainer=this._target.querySelector(".cubeContainer");
    var cubeList=cubeContainer.querySelectorAll(".cube");
    this._transitionEndNum=0;
    for(var i=0;i<cubeNum;i++){
        cubeList[i].style.transition="all 0.3s ease "+i/6+"s";
        if(this._option.direct==="v"){
            cubeList[i].style.transform="translateY(0)";
        }
        else if(this._option.direct==="h"){
            cubeList[i].style.transform="translateX(0)";
        }
    }
}
KdCubeRotate.prototype.createVerticalCube=function(prevIndex){
    var prevImg=this._imgList[prevIndex].getAttribute("src");
    var currentImg=this._imgList[this._index].getAttribute("src");
    this._target.querySelector("ul").querySelectorAll("li")[prevIndex].style.display="none";
    var cubeNum=this._option.cubeNum;
    var cubeContainer=document.createElement("div");
    cubeContainer.className="cubeContainer";
    this._target.appendChild(cubeContainer);
	var cubeHeight=cubeContainer.offsetHeight;
	var cubeWidth=cubeContainer.offsetWidth/cubeNum;
	var cubeZ=cubeHeight/2;
	var leftX=-cubeHeight/2;
	var rightX=(cubeWidth-cubeHeight)+cubeHeight/2;
    var containerWidth=this._target.offsetWidth;
    var cubeHtml='';
    for(var i=0;i<cubeNum;i++)
	{
        var tp=i*cubeWidth;
        var z_index=100+i;
        var imgPosition="-"+tp+"px 0";
        var imgSize=containerWidth+"px auto";
        if(i>cubeNum/2)
			z_index=-z_index;
        var cube='<div class="cube" style="width:'+cubeWidth+'px;height:'+cubeHeight+'px;left:'+tp+'px;transform:translate3d(0,0,-'+cubeZ+'px);z-index:'+z_index+';">';
        var font='<div class="cubeFont cubeDiv" style="transform:translate3d(0px,0px,'+cubeZ+'px);background-image:url('+prevImg+');background-size:'+imgSize+';background-position:'+imgPosition+'"></div>';
        cube=cube+font;
        var top='<div class="cubeTop cubeDiv" style="transform:translate3d(0px,-'+cubeZ+'px,0px) rotateX(90deg);background-image:url('+currentImg+');background-size:'+imgSize+';background-position:'+imgPosition+'"></div>';
        cube=cube+top;
        var back='<div class="cubeBack cubeDiv" style="transform:translate3d(0px,0px,-'+cubeZ+'px) rotateX(180deg);"></div>';
        cube=cube+back;
        var bottom='<div class="cubeBottom cubeDiv" style="transform:translate3d(0px,'+cubeZ+'px,0px) rotateX(-90deg);"></div>';
        cube=cube+bottom;
        var leftCube='<div class="cubeLeft cubeDiv" style="width:'+cubeHeight+'px;height:'+cubeHeight+'px;transform:translate3d('+leftX+'px,0px,0px) rotateY(-90deg);"></div>';
        cube=cube+leftCube;
        var rightCube='<div class="cubeRight cubeDiv" style="width:'+cubeHeight+'px;height:'+cubeHeight+'px;transform:translate3d('+rightX+'px,0px,0px) rotateY(90deg);"></div>';
        cube=cube+rightCube;
        cube=cube+'</div>';
        cubeHtml+=cube;
    }
    cubeContainer.innerHTML=cubeHtml;
    var that=this;
    var cubeList=cubeContainer.querySelectorAll(".cube");
    for(var j=0;j<cubeList.length;j++){
        cubeList[j].addEventListener('transitionend', this.onEndTransitionFn.bind(this,that),false);
    }
    this.rotateVerticalCube();
}
KdCubeRotate.prototype.createHorizontalCube=function(prevIndex){
    var prevImg=this._imgList[prevIndex].getAttribute("src");
    var currentImg=this._imgList[this._index].getAttribute("src");
    this._target.querySelector("ul").querySelectorAll("li")[prevIndex].style.display="none";
	var cubeNum=this._option.cubeNum;
    var cubeContainer=document.createElement("div");
    cubeContainer.className="cubeContainer";
    this._target.appendChild(cubeContainer);
	var cubeHeight=cubeContainer.offsetHeight/cubeNum;
	var cubeWidth=cubeContainer.offsetWidth;
	var cubeZ=cubeWidth/2;
	var leftX=-cubeWidth/2;
	var rightX=cubeWidth/2;
    var containerWidth=this._target.offsetWidth;
    var cubeHtml='';
	for(var i=0;i<cubeNum;i++)
	{
        var tp=i*cubeHeight;
        var z_index=100+i;
        var imgPosition="0 -"+tp+"px";
        var imgSize=containerWidth+"px auto";
		if(i>cubeNum/2)
		{
            z_index=-z_index;
			
        }
        var cube='<div class="cube" style="width:'+cubeWidth+'px;height:'+cubeHeight+'px;top:'+tp+'px;transform:translate3d(0,0,-'+cubeZ+'px);z-index:'+z_index+';">';
        var font='<div class="cubeFont cubeDiv" style="transform:translate3d(0px,0px,'+cubeZ+'px);background-image:url('+prevImg+');background-size:'+imgSize+';background-position:'+imgPosition+'"></div>';
        cube=cube+font;
        var top='<div class="cubeTop cubeDiv" style="transform:translate3d(0px,-'+cubeZ+'px,0px) rotateX(90deg);width:'+cubeWidth+'px;height:'+cubeHeight+'px;"></div>';
        cube=cube+top;
        var back='<div class="cubeBack cubeDiv" style="transform:translate3d(0px,0px,-'+cubeZ+'px) rotateX(180deg);"></div>';
        cube=cube+back;
        var bottom='<div class="cubeBottom cubeDiv" style="transform:translate3d(0px,'+cubeZ+'px,0px) rotateX(-90deg);width:'+cubeWidth+'px;height:'+cubeWidth+'px;"></div>';
        cube=cube+bottom;
        var leftCube='<div class="cubeLeft cubeDiv" style="transform:translate3d('+leftX+'px,0px,0px) rotateY(-90deg);background-image:url('+currentImg+');background-size:'+imgSize+';background-position:'+imgPosition+'"></div>';
        cube=cube+leftCube;
        var rightCube='<div class="cubeRight cubeDiv" style="transform:translate3d('+rightX+'px,0px,0px) rotateY(90deg);"></div>';
        cube=cube+rightCube;
        cube=cube+'</div>';
        cubeHtml+=cube;
		
    }
	cubeContainer.innerHTML=cubeHtml;
    var that=this;
    var cubeList=cubeContainer.querySelectorAll(".cube");
    for(var j=0;j<cubeList.length;j++){
        cubeList[j].addEventListener('transitionend', this.onEndTransitionFn.bind(this,that),false);
    }	
	this.rotateHorizontalCube();
}
KdCubeRotate.prototype.createLowLevelEffect=function(prevIndex){
    var prevImg=this._imgList[prevIndex].getAttribute("src");
    var currentImg=this._imgList[this._index].getAttribute("src");
    var cubeNum=this._option.cubeNum;
    var cubeContainer=document.createElement("div");
    cubeContainer.className="cubeContainer";
    this._target.appendChild(cubeContainer);
    var cubeHeight;
    var cubeWidth;
    var tp;
    if(this._option.direct==="v"){
        cubeHeight=cubeContainer.offsetHeight;
        cubeWidth=cubeContainer.offsetWidth/cubeNum;
    }
    else if(this._option.direct==="h"){
        cubeHeight=cubeContainer.offsetHeight/cubeNum;
        cubeWidth=cubeContainer.offsetWidth;
    }
    var cubeHtml="";
    var containerWidth=this._target.offsetWidth;
    for(var i=0;i<cubeNum;i++){
        var cube="";
        var imgPosition="-"+tp+"px 0";
        var imgSize=containerWidth+"px auto";
        if(this._option.direct==="v"){
            tp=i*cubeWidth;
            imgPosition="-"+tp+"px 0";
            imgSize=containerWidth+"px auto";
            //cube='<div class="cube" style="width:'+cubeWidth+'px;height:'+cubeHeight+'px;left:'+tp+'px;top:-'+cubeHeight+'px;background-image:url('+currentImg+');background-size:'+imgSize+';background-position:'+imgPosition+'"></div>';
            cube='<div class="cube" style="width:'+cubeWidth+'px;height:'+cubeHeight+'px;left:'+tp+'px;transform:translateY(-'+cubeHeight+'px);background-image:url('+currentImg+');background-size:'+imgSize+';background-position:'+imgPosition+'"></div>';
        }
        else if(this._option.direct==="h"){
            tp=i*cubeHeight;
            imgPosition="0 -"+tp+"px";
            imgSize=containerWidth+"px auto";
            //cube='<div class="cube" style="width:'+cubeWidth+'px;height:'+cubeHeight+'px;left:'+tp+'px;top:-'+cubeHeight+'px;background-image:url('+currentImg+');background-size:'+imgSize+';background-position:'+imgPosition+'"></div>';
            cube='<div class="cube" style="width:'+cubeWidth+'px;height:'+cubeHeight+'px;top:'+tp+'px;transform:translateX(-'+cubeWidth+'px);background-image:url('+currentImg+');background-size:'+imgSize+';background-position:'+imgPosition+'"></div>';
        }
        cubeHtml+=cube;
    }
    cubeContainer.innerHTML=cubeHtml;
    var cubeList=cubeContainer.querySelectorAll(".cube");
    var that=this;
    for(var j=0;j<cubeList.length;j++){
        cubeList[j].addEventListener('transitionend', this.onEndTransitionFn.bind(this,that),false);
    }
    setTimeout(function(){
        that.moveCube();
    },50);

}
KdCubeRotate.prototype.rotateBefore=function(prevIndex){
    if(this._timeName!=null && this._timeName!=undefined)
        clearInterval(this._timeName);
    if(this._option.cubeRandom==true)
    {
        var maxNum=7;
        var randomNum=parseInt(Math.random()*maxNum);
        if(randomNum==0)
        {
            this._option.path="h";
        }
        else if(randomNum==6)
        {
            this._option.path="v";
        }
        else
        {
            this._option.cubeNum=randomNum;
        }                
    }
    if(this._option.lowLevel){
        this.createLowLevelEffect(prevIndex);
    }
    else{
        if(this._option.direct=="h")
            this.createHorizontalCube(prevIndex);
        else
            this.createVerticalCube(prevIndex);
    }
}
KdCubeRotate.prototype.next=function(){
        if(this._canOption){
            this._canOption=false;
            var prevIndex=this._index;
			this._index++;
			if(this._index>=this._imgList.length)
				this._index=0;
			this.rotateBefore(prevIndex);
        }
    }
    
    KdCubeRotate.prototype.prev=function(){
        if(this._canOption){
            this._canOption=false;
            var prevIndex=this._index;
			this._index--;
			if(this._index<0)
				this._index=this._imgList.length-1;
			this.rotateBefore(prevIndex);
        }
    }
    KdCubeRotate.prototype.setIndex=function(imgIndex){
        if(this._canOption && imgIndex!==this._index){
            this._canOption=false;
            var prevIndex=this._index;
			this._index=imgIndex;
			this.rotateBefore(prevIndex);
        }
    }
    KdCubeRotate.prototype.setCubeNum=function(num){
		this._option.cubeNum=num;
	}
	
	KdCubeRotate.prototype.setCubeDirect=function(direct){
        if(direct=="h" || direct=="v")
            this._option.direct=direct;
        else{
            throw new Error("direct need h or v");
        }
    }
    KdCubeRotate.prototype.getIndex=function(){
        var index=this._index;
        return index;
    }
export default KdCubeRotate;