var NDL = 0;
var NL = 0;
var NSL = 0;
var GDL = 0;
var GL = 0;
var GSL = 0;
var LDL = 0;
var LL = 0;
var LSL = 0;


nMessage = "Dislikes: " + NDL + " Likes: " + NL + " Strong Likes: " + NSL;
document.getElementById("nikeValues").innerHTML = nMessage;

function calcVote(){
  if(document.getElementById("NDL"))
    NDL += 1;
  if(document.getElementById("NL"))
    NL += 1;
  if(document.getElementById("NSL"))
    NSL += 1;
  if(document.getElementById("GDL"))
    GDL += 1;
  if(document.getElementById("GL"))
    GL += 1;
  if(document.getElementById("GSL"))
    GSL += 1;
  if(document.getElementById("LDL"))
    LDL += 1;
  if(document.getElementById("LL"))
    LL += 1;
  if(document.getElementById("LSL"))
    LSL += 1;
}