
var NDL = 0;
var NL = 0;
var NSL = 0;
var GDL = 0;
var GL = 0;
var GSL = 0;
var LDL = 0;
var LL = 0;
var LSL = 0;


var nMessage = "Dislikes: " + NDL + " | Likes: " + NL + " | Strong Likes: " + NSL;
document.getElementById("nikeValues").innerHTML = nMessage;
var gMessage = "Dislikes: " + GDL + " | Likes: " + GL + " | Strong Likes: " + GSL;
document.getElementById("gapValues").innerHTML = gMessage;
var lMessage = "Dislikes: " + LDL + " | Likes: " + LL + " | Strong Likes: " + LSL;
document.getElementById("leviValues").innerHTML = lMessage;

function calcVote(){
  var n1 = document.getElementById("NDL");
  if(n1.checked == true){
    NDL += 1;
  }
  var n2 = document.getElementById("NL");
  if(n2.checked == true){
    NL += 1;
  }
  var n3 = document.getElementById("NSL");
  if(n3.checked == true){
    NSL += 1;
  }
  var g1 = document.getElementById("GDL");
  if(g1.checked == true){
    GDL += 1;
  }
  var g2 = document.getElementById("GL");
  if(g2.checked == true){
    GL += 1;
  }
  var g3 = document.getElementById("GSL");
  if(g3.checked == true){
    GSL += 1;
  }
  var l1 = document.getElementById("LDL");
  if(l1.checked == true){
    LDL += 1;
  }
  var l2 = document.getElementById("LL");
  if(l2.checked == true){
    LL += 1;
  }
  var l3 = document.getElementById("LSL");
  if(l3.checked == true){
    LSL += 1;
  }
  nMessage = "Dislikes: " + NDL + " | Likes: " + NL + " | Strong Likes: " + NSL;
  document.getElementById("nikeValues").innerHTML = nMessage;
  gMessage = "Dislikes: " + GDL + " | Likes: " + GL + " | Strong Likes: " + GSL;
  document.getElementById("gapValues").innerHTML = gMessage;
  lMessage = "Dislikes: " + LDL + " | Likes: " + LL + " | Strong Likes: " + LSL;
  document.getElementById("leviValues").innerHTML = lMessage;
}