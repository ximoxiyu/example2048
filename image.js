function showNumberImg(i,j,randNumber){
    var TheNumberCell=$('#number-cell-'+i+"-"+j);
    TheNumberCell.css('background-color',getBackgroundColor(randNumber));//属性正确书写！！background-color
    TheNumberCell.css('color',getColor(randNumber));
    TheNumberCell.text(randNumber);//直接显示文字
    TheNumberCell.animate({
       //此处没有函数
       height:"100px",//用逗号隔开！！！
       width:"100px",
       top:getPostTop(i,j),
       left:getPostLeft(i,j)
    },50);
} 
//移动位置的动画，只动画改变位置即可！！！！
function  showMoveNumberImg(fromx,fromy,tox,toy){
  var TheNumberCell=$('#number-cell-'+fromx+"-"+fromy);
  TheNumberCell.animate({
    top:getPostTop(tox,toy),
    left:getPostLeft(tox,toy)
 },200);//不弄太快
}


//显示分数!!!
function showScore(score){
    $("#score").text(score);//利用id选择器进行选择！！！
}
