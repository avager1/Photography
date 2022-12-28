//容器
const container =document.querySelector('.container');
let img_width=220;

//加入图片元素
function createImgs(){
    for (let i = 1; i <=30;i++){
        let src='./images/人像/'+i+'.jpg';
        let img=document.createElement('img');
        img.src=src;
        img.width=img_width;
        //每一张图片加载完就设置位置
        img.onload=setPositions;
        //将图片添加到容器中
        container.appendChild(img);
    }
}

createImgs();
// 加入多一组图片
// createImgs();


//计算一共多少列，以及每一列之间的间隙
function cal(){
    //容器的宽度
    let container_width=container.clientWidth;
    //计算列的数量
    let colums=Math.floor(container_width/img_width);
    //计算间隙
    let space_number=colums+1;//间隙的数量
    let left_space =container_width-colums*img_width;//计算剩余的空间
    let space=left_space/space_number;//每个间隙的空间
    return {
        space: space,
        colums:colums
    };   
}

//设置每张图的位置
function setPositions(){
    //获取列数和间隙
    let info =cal();
    //该数组的长度为列数，每一项表示该列的下一个图片的纵坐标
    let next_tops =new Array(info.colums);
    //将数组的每一项填充为0
    next_tops.fill(0);
    for(let i=0;i<container.children.length;i++){
        let img=container.children[i];
        //找到next_tops中的最小值作为当前图片的纵坐标
        let min_top=Math.min.apply(null,next_tops);
        img.style.top=min_top + 'px';
        //重新设置数组这一项的下一个top值
        let index =next_tops.indexOf(min_top);//得到使用的是第几列的top值
        next_tops[index]+=img.height+info.space;
        //计算横坐标
        let left=(index+1)*info.space+index*img_width;
        img.style.left = left + 'px';
    }
    //得到next_tops中的最大值
    let max=Math.max.apply(null,next_tops);
    //设置容器的高度
    container.style.height = max + 'px';
}

//window.onload=setPositions;
let timer=null;
window.onresize=function() {
    if(timer){
        clearTimeout(timer);
    }
    timer=setTimeout(setPositions,100);
}