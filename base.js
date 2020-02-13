function getPostTop(i,j){
    return 20+120*i;
}

function getPostLeft(i,j){
    return 20+120*j;
}
//关键-返回颜色值
function getBackgroundColor(value){
    switch(value){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
        default:return"balck"; break;//其他返回黑色？为什么是黑色
    }     
}
function getColor(value){
    if(value<=4)
     return "#776e65";
    else
     return "white";
}

//判断是否有空余位置,有参数
function nospace(board){
    for(var i=0;i<4;i++)
     for(var j=0;j<4;j++){
        if(board[i][j]!=0)
          return true;
        else
          return false;
     }
} 
//运行不流畅！！！！
 /* //判断向左移动
  function canMoveLeft(board){
    for(var i=0;i<4;i++)
            for(var j=1;j<4;j++)
                if(board[i][j]!=0) //左边为空，或者左边==右边
                    if(board[i][j-1]==0 || board[i][j-1]==board[i][j])
                      return true;
                    else
                      return false;
}

function canMoveUp(board){
    for(var j=0;j<4;j++)
            for(var i=1;i<4;i++)
                if(board[i][j]!=0)
                    if(board[i-1][j]==0 || board[i-1][j]==board[i][j])
                      return true;
                    else
                     return false;
}
function canMoveRight(board){
    for(var i=0;i<4;i++)
            for(var j=2;j>=0;j--)
                if(board[i][j]!=0)
                    if(board[i][j+1]==0 || board[i][j+1]==board[i][j])
                      return true;
                    else
                      return false;
}

function canMoveDown(board){
    for(var j=0;j<4;j++)
            for(var i=2;i>=0;i--)
                if(board[i][j]!=0)
                    if(board[i+1][j]==0 || board[i+1][j]==board[i][j])
                      return true;
                    else
                     return false;
}  */
//判断水平位置是否可以移动
/* function noblockHorizontal(row,col1,col2,board){
  for(var j=col1+1; j<col2; j++)
    if(board[row][j]==0)//里面没有i!!!,此时是row
      return true;//无障碍物
    else
      return false;
}  
function noblockVertical(col,row1,row2,board){
    for(var i=row1+1; i<row2; i++)
      if(board[i][col]==0)
        return true;//无障碍物
      else
        return false;
  }  
function nomove(){
 if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) ||canMoveDown(board))
 return false;
 else
  return true;
}  */

 function canMoveRight( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j >= 0 ; j -- )
            if( board[i][j] != 0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                    return true;

    return false;
}
function canMoveLeft( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;

    return false;
}

function canMoveUp( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
}

function canMoveDown( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
} 

function noblockHorizontal( row , col1 , col2 , board ){
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
}

function noblockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}

function nomove( board ){
    if( canMoveLeft( board ) ||
        canMoveRight( board ) ||
        canMoveUp( board ) ||
        canMoveDown( board ) )
        return false;

    return true;
}
 
