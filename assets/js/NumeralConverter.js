let input = $("#numberInput").val(),
    nums = Number(input),
    myAnswer = convert(nums),
    count = 0;

$(".jumbotron").fadeIn(1300);
$("h1").fadeIn(1300);

function getHeight() {
  let height = $(".jumbotron").css("height");
  return height;
}

function convert(num) {
  let number = String(num),
      roman1 = "", 
      roman2 = "", 
      roman3 = "", 
      roman4 = "";

  function singleFigure(num) {
    roman1 = "";
    if(num === 0){
      roman1 = "";
    }
    else if(num > 0 && num <= 3){
      for(let i = 0; i < num; i++){
        roman1 = roman1 + "I"
      }
    }
    else if(num === 4 ){
      roman1 = "IV"
    }
    else if(num > 4 && num <= 8){
      roman1 = "V"
      for(let i = 0; i < num - 5; i++){
        roman1 = roman1 + "I"
      }
    }
    else if(num === 9 ){
      roman1 = "IX"
    }
  }

  function twoFigure(num){
    roman2 = "";
    let number2 = String(num),
        firstFigure2 = Number(number2[0]),
        secondFigure2 = Number(number2[1]);
    if(num >= 10 && num <= 39){
      roman2 = "X";
      for(let i = 0; i < firstFigure2 - 1; i++){
        roman2 = roman2 + "X";
      }
      singleFigure(secondFigure2);
      roman2 = roman2 + roman1; 
    }
    else if(num >= 40 && num < 50){
      roman2 = "XL";
      singleFigure(secondFigure2);
      roman2 = roman2 + roman1;
    }
    else if(num >= 50 && num <= 89){
      roman2 = "L";
      for(let i = 0; i < firstFigure2 - 5; i++){
        roman2 = roman2 + "X";
      }
    singleFigure(secondFigure2);
    roman2 = roman2 + roman1;
    }
    else if(num >= 90 && num < 100){
      roman2 = "XC";
      singleFigure(secondFigure2);
      roman2 = roman2 + roman1;
    }
  }

  function threeFigure(num) {
    roman3 = "";
    let number3 = String(num),
        firstFigure3 = Number(number3[0]),
        thirdFigure3 = Number(number3.slice(1));    
    if(num >= 100 && num <= 399){
      roman3 = "C";
      for(let i = 0; i < firstFigure3 - 1; i++){
        roman3 = roman3 + "C";
      }
      twoFigure(thirdFigure3);
      singleFigure(thirdFigure3);
      roman3 = roman3 + roman2 + roman1; 
    }
    else if(num >= 400 && num < 500){
      roman3 = "CD";
      twoFigure(thirdFigure3);
      singleFigure(thirdFigure3);
      roman3 = roman3 + roman2 + roman1; 
    }
    else if(num >= 500 && num <= 899){
      roman3 = "D";
      for(let i = 0; i < firstFigure3 - 5; i++){
        roman3 = roman3 + "C";
      }
    twoFigure(thirdFigure3);
    singleFigure(thirdFigure3);
    roman3 = roman3 + roman2 + roman1; 
    }
    else if(num >= 900 && num < 1000){
      roman3 = "CM";
      twoFigure(thirdFigure3);
      singleFigure(thirdFigure3);
      roman3 = roman3 + roman2 + roman1; 
    }
  }

  function fourFigure(num) {
    let number4 = String(num),
        firstFigure4 = Number(number4[0]),
        thirdFigure4 = Number(number4.slice(1));
    if(num >= 1000 && num < 5000){
      roman4 = "M";
      for(let i = 0; i < firstFigure4 - 1; i++){
        roman4 = roman4 + "M";
      }
      threeFigure(thirdFigure4);
      twoFigure(thirdFigure4);
      singleFigure(thirdFigure4);
      roman4 = roman4 + roman3 + roman2 + roman1; 
    }
    else if(num >= 5000 && num <= 8999){
      roman4 = "(V)";
      for(let i = 0; i < firstFigure4 - 5; i++){
        roman4 = roman4 + "M";
      }
      threeFigure(thirdFigure4);
      twoFigure(thirdFigure4);
      singleFigure(thirdFigure4);
      roman4 = roman4 + roman3 + roman2 + roman1;  
    }
    else if(num >= 9000 && num <= 9999){
      roman4 = "M(X)";
      threeFigure(thirdFigure4);
      twoFigure(thirdFigure4);
      singleFigure(thirdFigure4);
      roman4 = roman4 + roman3 + roman2 + roman1;
    }
  }

  if(number.length === 1){
    singleFigure(num);
    return roman1;
  }
  else if(number.length === 2){
    twoFigure(num);
    return roman2;
  }
  else if(number.length === 3){
    threeFigure(num);
    return roman3;
  }
  else if(number.length === 4){
    fourFigure(num);
    return roman4;
  }
}
    

$("#button").on("click", function() {
  ++count;
  let currentHeight = getHeight();
  $(".jumbotron").css("height", currentHeight);
  currentHeight = currentHeight.replace("px", "");
  let computeHeight = Number(currentHeight) + 159;
  let nextHeight = String(computeHeight) + "px";
  if(count === 1){
    $(".jumbotron").animate({height: nextHeight}, 1000, function(){
      $(this).css("height", "auto");
    })
  }
  else{
    $(".jumbotron").css("height", "auto");
  }
  $(".answer").fadeOut(300, function(){
    input = $("#numberInput").val();
    nums = Number(input);
    myAnswer = convert(nums);
    let accept = "1234567890";
    for(let i = 0; i < input.length; i++){
      if(accept.indexOf(input[i]) === -1){
        $("#input").text("");
        $("#answer").text("");
        $("#is").text("Please enter a number.");
        $(".answer").fadeIn(1400);
        return;
      }
    }
    if(input.length === 0){
      $("#input").text("");
      $("#answer").text("");
      $("#is").text("Please enter a number.");
      $(".answer").fadeIn(1400);
      return;
    }
    $("#input").text(input);
    $("#answer").text(myAnswer);
    $("#is").text("is");
    $(".answer").fadeIn(1400);
    return;
  });
});

$("#reset").on("click", function() {
    count = 0;
    let currentHeight = getHeight();
    $(".jumbotron").css("height", currentHeight);
    currentHeight = currentHeight.replace("px", "");
    let computeHeight = Number(currentHeight) - 159;
    let nextHeight = String(computeHeight) + "px";
      $(".jumbotron").animate({height: nextHeight}, 1000, function(){
        $(this).css("height", "auto");
      })
    $(".answer").fadeOut(600);
    $("#numberInput").val("");
  });

$("#numberInput").on("focus", function() {
  $(this).attr("placeholder", "");
});

$("#numberInput").on("blur", function() {
  $(this).attr("placeholder", "Enter a number between 1 and 9999");
});