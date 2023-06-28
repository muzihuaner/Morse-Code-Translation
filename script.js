//定義需要用到的資料
var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----"

//後處理資料變成陣列應用
var morseList = morseCode.split("|")
for(var i=0;i<morseList.length;i++){
  morseList[i]=morseList[i].split(";")  
  //附加到右邊清單上面
  $("ul.translist").append("<li>"+morseList[i][0]+"  "+morseList[i][1]+"</li>")
}

//找到文字對應到的密碼
function findCode(letter){
  //全部找過一輪傳回對應密碼
  for(var i=0;i<morseList.length;i++){
    if (morseList[i][0]==letter){
      return morseList[i][1]
    }
  }
  
  //如果沒找到就回傳原始的字
  return letter;
}

//找到密碼對應到的文字
function findLetter(code){
  //全部找過一輪傳回對應文字
  for(var i=0;i<morseList.length;i++){
    if (morseList[i][1]==code){
      return morseList[i][0]
    }
  }
  //如果沒找到就回傳原始的密碼
  return code;
}


//翻譯整篇文字變成code
function translateToMorse(text){
  //轉大寫
  text=text.toUpperCase();
  var result = ""
  //找到對應密碼
  for(var i=0;i<text.length;i++){
    // console.log(text[i])
    result+=findCode(text[i])+" "
    // console.log(findCode(text[i]))
  }
  return result;
}

//翻譯整篇code變成文字
function translateToEng(text){
  //轉大寫
  text=text.split(" ");
  var result = ""
  //找到文字
  for(var i=0;i<text.length;i++){
    console.log(text[i])
    result+=findLetter(text[i])
    console.log(findLetter(text[i]))
  }
  return result;
}

// var originalText = "hello/world"
// var translateResult = translateToMorse(originalText)
// var translateBack = translateToEng(translateResult)

// console.log("原文:"+originalText)
// console.log("翻譯密碼:"+translateResult)
// console.log("翻譯回來:"+translateBack)

//轉換成密碼
$("#btnMorse").click(function(){
  var input = $("#input").val()
  $("#output").val(translateToMorse(input))
  ///動畫
  $("#output")
    .css({
    backgroundColor: "#292B73",
  }).animate({
    backgroundColor: "transparent",
  },500)
  $(".symbol").velocity({
    rotateZ: ["0deg","360deg"]
  })
})

//轉換成文字
$("#btnEng").click(function(){
  var input = $("#output").val()
  $("#input").val(translateToEng(input))
  ///動畫
  $("#input")
    .css({
    backgroundColor: "#292B73"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".symbol").velocity({
    rotateZ: ["0deg","360deg"]
  })
})

//如果鍵盤輸入按下去 就隨時轉大寫跟去除空白
$("#input").keyup(function(){
  let original = $("#input").val()
  let newtext = original.toUpperCase().split(" ").join("")
  $("#input").val(newtext)
})

function play(texts,nowindex){
  var word = texts[nowindex]
  //抓到字母播放聲音
  var lasttime =300
  if (word=="."){
      lasttime=300;
    $("audio.short")[0].play()
  }else if (word=="-"){
      lasttime=500;
    $("audio.long")[0].play()
  }else{
      lasttime=1000;
  }
  console.log(word,lasttime)
  
  //顯示當下播放的字母
  $(".playlist span").removeClass("playing")
  $(".playlist span")
    .eq(nowindex).addClass("playing")
  
  //如果當下位置<文字長度 繼續呼叫自己
  if (texts.length>nowindex){
    playerTimer=setTimeout(function(){
      play(texts,nowindex+1)
    },lasttime)
  }else{
    $(".playlist").html("")
  }
}


//設定音量
$("audio.short")[0].volume=0.3
$("audio.long")[0].volume=0.3

//播放聲音
$("#btnPlay").click(function(){

  //處理輸出
  var texts =  $("#output").val()
  $(".playlist").html("")
  
  //把文字變成span放進去（單獨上色）
  for(var i=0;i<texts.length;i++){
    $(".playlist").append("<span>"+texts[i]+"</span>")
  }
  play(texts,0)
 
})