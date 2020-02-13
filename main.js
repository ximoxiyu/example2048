var board = new Array();
var score = 0;
var noCash =new Array();//解决撞击问题

$(document).ready(function(){
    newgame();
});
//事件触发,与位置无关！！！！已验证！！
$(document).keydown(function (e) { 
    switch (e.keyCode) {//keyCode,注意大小写！！！
        case 37://向左移
        if(moveLeft()){//moveLeft()没有参数！！！
            setTimeout('generateOneNumber()',210);
            setTimeout('isGameOver()',300);
        }
            break;
        case 38:
            if(moveUp()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 39:
            if(moveRight()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 40:
            if(moveDown()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        default:
            break;
    }
});
function isGameOver(){
    if(nospace(board) && nomove(board))
    alert('游戏结束');
} 
function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();
}
 function init(){
     //格子设置
     for( var i=0; i<4; i++)
       for(var j=0;j<4;j++){
          var gridCell=$('#grid-cell-'+i + "-" +j);//选择器格式！//为什么只出现了第一列
          gridCell.css('top',getPostTop(i,j));
          gridCell.css('left',getPostLeft(i,j));//属性要小写!!!!，left代替Left
      } 
      //二维数组
       for(var i=0; i<4;i++){
        board[i]= new Array();
        noCash[i]=new Array();
          for(var j=0; j<4;j++)
               board[i][j]=0;
               noCash[i][j]=false;//值为true和false
      } 
      updateBoardView(); //没有参数
      score=0;
    }
    function updateBoardView(){
        //由board值传入前端
        $('.numberCell').remove();
        for( var i=0; i<4; i++)//遍历生成
         for( var j=0;j<4; j++){
           // $("#grid-container").append( '<div class="numberCell" id="number-cell-'+i+'-'+j+'"></div>' );//id地址的正确书写！！！
            $("#grid-container").append( '<div class="numberCell" id="number-cell-'+i+'-'+j+'"></div>'  );//为什么j后面还有一个＋？
           // $("#grid-container").append("<div class='numberCell' id='number-cell-' +i+ '-' +j></div>");
            var TheNumberCell=$('#number-cell-'+i+ '-' +j);//选择器的#勿忘！！！
            if(board[i][j]==0){
                TheNumberCell.css('height','0px');
                TheNumberCell.css('width','0px');
                TheNumberCell.css('top',getPostTop(i,j)+50);
                TheNumberCell.css('left',getPostLeft(i,j)+50);
            }
            else{    
                 TheNumberCell.css('height','100px');
                 TheNumberCell.css('width','100px');
                 TheNumberCell.css('top',getPostTop(i,j));
                 TheNumberCell.css('left',getPostLeft(i,j));
                 TheNumberCell.css('background-color',getBackgroundColor(board[i][j]));//属性正确书写！！background-color
                 TheNumberCell.css('color',getColor(board[i][j]));
                 TheNumberCell.text(board[i][j]);//直接显示文字
                }
                noCash[i][j]=false;//更新
            }
    } 

//生成新数字
 function generateOneNumber(){
     //是否有空位置
     if(nospace(board))
      return false;
      else{
          //随机生成空位置
          var randx=parseInt(Math.floor(Math.random()*4));//注意var
           var randy=parseInt(Math.floor(Math.random()*4));
          var times=0;
          while(times < 50){
                if(board[randx][randy]==0)
                  break;
                else {
                        randx=parseInt(Math.floor(Math.random()*4));
                        randy=parseInt(Math.floor(Math.random()*4)); 
                    }
                
                times ++;//加一
          }
          //if(board[randx][randy]!=0)
          if(times==50){
              for(var i=0;i<4;i++)
                for(var j=0;j<4;j++){
                    if(board[i][j]==0){
                        randx=i;
                        rsndy=j;
                    }
                }
          }
          //随机生成一个数
          var randNumber=Math.random()<0.5 ? 2:4;
          //赋值给后端，并且用动画在前端显示
          board[randx][randy]=randNumber;
          showNumberImg(randx,randy,randNumber);
          return true;
      }     
 } 

 //向左移动,没有参数！！！
 function moveLeft(){
     if(!canMoveLeft(board))
     return false;
     else{
          for(var i=0;i<4;i++)
            for(var j=1;j<4;j++)//第一列不用判断！！！
                if(board[i][j]!=0){
                    //找左侧的落脚点
                     for(var k=0;k<j;k++)//k小写！！
                       if(board[i][k]==0  && noblockHorizontal(i,k,j,board)){//笔误
                           //显示，叠加
                           showMoveNumberImg(i,j,i,k);//位置移动
                           board[i][k]=board[i][j];
                           board[i][j]=0;
                           continue;//不能忘！！！！
                       }
                       else if(board[i][k]==board[i][j]  && noblockHorizontal(i,k,j,board) && !noCash[i][k]){//且未发生过碰撞
                           //显示，叠加
                           showMoveNumberImg(i,j,i,k);//位置移动
                           board[i][k]=board[i][j]*2;
                           board[i][j]=0;
                           score+=board[i][k];
                           showScore(score);
                           noCash[i][k]=true;//碰撞了
                           continue;//不能忘！！！！
                       }
                }
         setTimeout('updateBoardView()',200);//刷新数据
         return true;//先执行后返回！！！
     }
 }
 //向上
 function moveUp(){
    if(!canMoveUp(board))
    return false;
    else{
         for(var j=0;j<4;j++)
           for(var i=1;i<4;i++)//第一列不用判断！！！
               if(board[i][j]!=0){
                   //找左侧的落脚点
                    for(var k=0;k<i;k++)//k小写！！
                      if(board[k][j]==0  && noblockVertical(j,k,i,board)){//笔误
                          //显示，叠加
                          showMoveNumberImg(i,j,k,j);//位置移动
                          board[k][j]=board[i][j];
                          board[i][j]=0;
                          continue;//不能忘！！！！
                      }
                      else if(board[k][j]==board[i][j]  && noblockVertical(j,k,i,board) && !noCash[k][j]){
                          //显示，叠加
                          showMoveNumberImg(i,j,k,j);//位置移动
                          board[k][j]=board[i][j]*2;
                          board[i][j]=0;
                          score+=board[k][j];
                          showScore(score);
                          noCash[k][j]=true;//碰撞了
                          continue;//不能忘！！！！
                      }
               }
        setTimeout('updateBoardView()',200);//刷新数据
        return true;//先执行后返回！！！
    }
}
//向左移动,没有参数！！！
function moveRight(){
    if(!canMoveRight(board))
    return false;
    else{
         for(var i=0;i<4;i++)
           for(var j=2;j>=0;j--)//第一列不用判断！！！
               if(board[i][j]!=0){
                   //找左侧的落脚点
                    for(var k=3;k>j;k--)//k小写！！
                      if(board[i][k]==0  && noblockHorizontal(i,j,k,board)){//笔误
                          //显示，叠加
                          showMoveNumberImg(i,j,i,k);//位置移动
                          board[i][k]=board[i][j];
                          board[i][j]=0;
                          continue;//不能忘！！！！
                      }
                      else if(board[i][k]==board[i][j]  && noblockHorizontal(i,j,k,board) && !noCash[i][k]){
                          //显示，叠加
                          showMoveNumberImg(i,j,i,k);//位置移动
                          board[i][k]=board[i][j]*2;
                          board[i][j]=0;
                          score+=board[i][k];
                          showScore(score);
                          noCash[i][k]=true;//碰撞了
                          continue;//不能忘！！！！
                      }
               }
        setTimeout('updateBoardView()',200);//刷新数据
        return true;//先执行后返回！！！
    }
}
function moveDown(){
    if(!canMoveDown(board))
    return false;
    else{
         for(var j=0;j<4;j++)
           for(var i=2;i>=0;i--)//第一列不用判断！！！
               if(board[i][j]!=0){
                   //找左侧的落脚点
                    for(var k=3;k>i;k--)//k小写！！
                      if(board[k][j]==0  && noblockVertical(j,i,k,board)){//笔误
                          //显示，叠加
                          showMoveNumberImg(i,j,k,j);//位置移动
                          board[k][j]=board[i][j];
                          board[i][j]=0;
                          continue;//不能忘！！！！
                      }
                      else if(board[k][j]==board[i][j]  && noblockVertical(j,i,k,board) && !noCash[k][j]){
                          //显示，叠加
                          showMoveNumberImg(i,j,k,j);//位置移动
                          board[k][j]=board[i][j]*2;
                          board[i][j]=0;
                          score+=board[k][j];
                          showScore(score);
                          noCash[k][j]=true;//碰撞了
                          continue;//不能忘！！！！
                      }
               }
        setTimeout('updateBoardView()',200);//刷新数据
        return true;//先执行后返回！！！
    }
}