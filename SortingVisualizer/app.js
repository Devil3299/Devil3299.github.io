  let animation = [],
  step = 0,
  SI = 0,
  delay = 1000,
  Bars = [],
  prev_i = -1,
  prev_j = -1;


  function animationStep(){
    if(step < animation.length){
      var action = animation[step]
      
        if(prev_i > -1){
          change(prev_i,"rgba("+ [66, 134, 244, 0.8].join(',')+")")
          change(prev_j,"rgba("+ [66, 134, 244, 0.8].join(',')+")")  
        }
        
        switch(action[0]){
          case "compare_true":{
            let i = action[1];
            let j = action[2];
            let p = action[3]; 

            prev_i = i;
            prev_j = j;

            if(i > -1)
            change(i,"lightgreen")
            change(j,"lightgreen")
            
            change(p,"yellow")

            swapBars(Bars,i,j);
            
            break;           
          }
          case "compare_false":{
            let i = action[1],
                j = action[2],
                p = action[3];

                
            if(i > -1)
            change(i,"red")
            change(j,"red")
                
            change(p,"yellow")

            prev_i = i;
            prev_j = j;

            break; 
          }
          case "fixed":{
            let i = action[1]
            let j = action[2]


            prev_i = -1;
            prev_j = -1;


            swapBars(Bars,i,j);
            /*
            let t = Bars[i].style.height,
            t1 = Bars[i].innerHTML;
            Bars[i].style.height = Bars[j].style.height;
            Bars[i].innerHTML = Bars[j].innerHTML;
            Bars[j].style.height = t;
            Bars[j].innerHTML = t1
            */
            
            change(i,"rgba("+ [169, 92, 232, 0.8].join(',')+")");
            change(j,"rgba("+ [66, 134, 244, 0.8].join(',')+")");
            
            break;
          }
        }
        step++;
      }
  
    else{
      clearInterval(SI);  
      console.log("finished");
      for(let i = 0; i < Bars.length; i++){
        fill(i);
      }
    }
  }


function swapBars(Bars,i,j){
  setTimeout(function(){
    let t = Bars[i].style.height,
    t1 = Bars[i].innerHTML;
    Bars[i].style.height = Bars[j].style.height;
    Bars[i].innerHTML = Bars[j].innerHTML;
    Bars[j].style.height = t;
    Bars[j].innerHTML = t1
  },200); 
}


function change(i,color){
  setTimeout(function(){
    Bars[i].style.background = color;
  },200);
}

function fill(i){
  setTimeout(function(){
    change(i,"rgba("+ [169, 92, 232, 0.8].join(',')+")");
  }, 30*i);
}

function swap(arr,a,b){
  let t = arr[a];
  arr[a] = arr[b]
  arr[b] = t;
}
function quickSort(arr, left, right) {
  if(left < right){
      let p = partition(arr,left,right);
      quickSort(arr, left, p - 1);
      quickSort(arr,p + 1, right);
  }    
}
  
function partition(arr, left, right) {
  let pivot = arr[right];  
  let i = left - 1;
  
  for(let j = left; j <= right-1; j++){
      if(arr[j] < pivot){
          i++;
          swap(arr,i,j);
          animation.push(["compare_true",i,j,right])
      }
      else{
        animation.push(["compare_false",i,j,right]);
      }
  }
  swap(arr,i+1,right);
  animation.push(["fixed",i+1,right])
  return i + 1;
}


function generateArray(){
      array = [];
      let str = "";
      
      for(let i = 0; i < 20; i++){
          let t = Math.ceil(Math.random() * 250 + 50);
          array.push(t);
          str += `<div class="arrayelement" style="height:${t}px">${t}</div>`
      }
      document.getElementById("array").innerHTML = str;
  }


  function startquickSort(){
    Bars = document.getElementsByClassName("arrayelement");  
    quickSort(array, 0, array.length - 1);
    animate();
  }

  function animate(){
    SI = setInterval(animationStep, delay)
  }