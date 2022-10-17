

const API_URL="https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";
// !!!!  ; is important !!!

(async ()=>{
    const frequencyMap={}
    const req = await fetch(API_URL);
    const res = await req.text();
    const numbers=res.trim().split("\n").map(Number);
    console.log('numbers',numbers);
    numbers.forEach((number)=>{
        if(frequencyMap[number]){
            frequencyMap[number]++;
        }else{
            frequencyMap[number]=1;
        }
    })
    console.log('frequencyMap',frequencyMap)
    const graphEl =document.querySelector(".graph");
    const keys=Object.keys(frequencyMap);
    const maxY=Math.max(...Object.values(frequencyMap));
    const minX =Math.min(...keys);
    const maxX= Math.max(...keys);

    for(let x=minX;x<=maxX;x++){
        const frequency=frequencyMap[x]||0;
        const heightPercentage=(frequency/maxY)*100;
        const column=document.createElement("div");
        column.className="column";
        column.style.height=`${heightPercentage}%`;
        graphEl.appendChild(column)
        const numberLabelEl = document.createElement("div");
        numberLabelEl.className = "number-label";
        numberLabelEl.textContent = x;
        // !!!??? why not innetText?
        column.appendChild(numberLabelEl);
    }

      // 5. output the y axis
  for (let yValue = 0; yValue < maxY; yValue += 10) {
    const yLabelEl = document.createElement("div");
    yLabelEl.className = "y-label";
    yLabelEl.textContent = yValue;
    const percentageBottom = (yValue / maxY) * 100;
    yLabelEl.style.bottom = `${percentageBottom}%`;
    graphEl.appendChild(yLabelEl);
  }
    console.log({keys,maxY})
    // !!! Good!
 
})();
