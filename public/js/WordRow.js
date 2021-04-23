// If you write any code do comment 
// write the purpose why you add line

var temp_arr =["match","introduce","phone","satisfy","plan","admire","punish","lock","stamp","frame","question","desert","flood","identify","label","pine","polish","measure","tour","carve","touch","tow","challenge","handle","talk","melt","play","look","shop","reach","scare","stuff","disappear","switch","book","sniff","prefer","confuse","relax","clap","taste","marry","launch","telephone","point","grab","pull","license","concern","rain","clear","reduce","name","muddle","bathe","double","rinse","comb","stay","applaud","chop","influence","subtract","guess","trace","yell","occur","carry","suit","fasten","return","film","wait","squeeze","compare","precede","rule","squeak","complete","fill","remember","intend","thank","obtain","nail","skip","spill","guide","wash","rot","hop","excite","whirl","multiply","fancy","analyze","reflect","decide","interfere","float","push","scrub","plug","support","reign","excuse","unite","shave","escape","worry","stretch","screw","laugh","offend","scrape","remove","mine","pray","branch","battle","pick","enter","train","decay","boil","knock","bubble","miss","imagine","crush","start","time","wink","produce","possess","appreciate","regret","beam","milk","replace","grip","succeed","count","check","communicate","interest","shock","step","connect","trot","heal","back","destroy","smile","slap","injure","last","educate","box","listen","record","join","spray","hate","scribble","trick","sip","flow","sprout","scream","tick","cure","drop","blush","reproduce","fry","queue","impress","raise","type","chew","overflow","deliver","kiss","suspend","inform","dam","separate","flower","employ","amuse","strengthen","tug","receive","seal","cross","grease","memorize","slow","improve","close","bruise","trouble","agree","manage","apologise","terrify","sneeze","fit","surprise","punch","print","pop","bleach","disagree","command","harm","explode","transport","encourage","invite","attach","warm","crack","instruct","spell","store","brake","camp","own","bat","peck","tire","confess","long","smell","expect","report","jog","jail","mug","mate","decorate","tease","scorch","suspect","blot","include","tie","surround","roll","knit","obey","rock","bump","allow","wriggle","live","tip","risk","moan","sound","squeal","puncture","change","repair","fetch","cycle","water","contain","cause","thaw","place","arrange","annoy","gaze","hammer","bake","dress","lie","hover","race","lick","greet","interrupt","rhyme","mourn","collect","reply","visit","drip","heat","knot","dislike","prick","disarm","smoke","mend","advise","tap","deceive","travel","increase","paint","calculate","need","lighten","suffer","face","murder","ruin","undress","soak","exercise","doubt","dance","hope","beg","attend","suppose","learn","accept","tame","program","guard","found","object","remain","serve","man","add","consist","burn","earn","divide","shrug","flap","cover","dust","refuse","rejoice","trust","walk","welcome","chase","sparkle","hum","delay","judge","pack","warn","wreck","please","correct","choke","stir","wobble","kneel","mess","up","tumble","pinch","ignore","realize","recognise","juggle","ask","inject","peep","land","tempt","prepare","hurry","wipe","unfasten","nest","sigh","joke","wail","sin","exist","fear","whip","stitch","sign","steer","tremble","hang","whine","cry","blink","mix","spare","notice","slip","pour","crawl","meddle","claim","spark"]


// random array for typing leason

// var firstButton = document.querySelector('.one')
var secondButton = document.querySelector('.two')

if (1)
{
    var arr = "";

    for (var i=0;i<25 ;i++)
    {
        var x = Math.floor(Math.random()*400);
        arr += temp_arr[x];
        if (i!=34)
        arr += '␣'
    }

    // firstButton.classList.add('active')
    secondButton.classList.remove('active')

    insertTheText(arr)
}
function shuffle()
{
    var readyBox = document.querySelector('.ready')
    readyBox.classList.remove("hiding")

    var myobj = document.querySelector(".typing-leason");

    while (myobj.lastElementChild) 
    {
        myobj.removeChild(myobj.lastElementChild);
    }

    var arr = "";

    for (var i=0;i<25 ;i++)
    {
        var x = Math.floor(Math.random()*400);
        arr += temp_arr[x];
        if (i!=34)
        arr += '␣'
    }
    // firstButton.classList.remove('active')
    secondButton.classList.add('active')
    insertTheText(arr);
}


function insertTheText(arr)
{
    var array = [] ;
    for (var i=0;i<arr.length;i++)
    {
        if (arr[i] === " ")
        array[i]="␣"
        else
        array.push(arr[i])
    }
    finalized(array)
}

function finalized(array)
{
    // select the typing box
    var typingBox = document.querySelector('.typing-leason')
    // Ready button section
    var readyBox = document.querySelector('.ready')
    // Selecting the body
    var bodyMain = document.querySelector('body')
    // initialize the color to false , because initially we don't know the user typed the key is correct or wrong 
    let color = false
    var space = 0

    var resultBox = document.querySelector('.results')
    var startTime , endTime;

    // This is for the user, which key is typed by the user
    var typedString = ""
    var allTypedChar = ""


    // Putting every char of our array in span tag
    for (var i=0;i<array.length ;i++)
    {
        var htmlPart = `<span>${array[i]}</span>`
        typingBox.innerHTML += htmlPart;
    }
    // Selection of all the span tag
    var selectElement = document.querySelectorAll('span')

    // This is for , adding blinker to the first char 
    selectElement[typedString.length].classList.add('blinker')

    // This is for , Initially when the user not clicked on Ready button by using this all the char are shown in grey color
    var flag = true;
    if (flag)
    {
        typingBox.classList.add("inactive-leason")
    }

    // adding the event on ready button 
    readyBox.addEventListener('click' , ()=>{
        removeBox()
    })

    var f=0;
    function removeBox()
    {
        // adding the hiding class on the ready button
        readyBox.classList.add("hiding")
        // removing class from the typing leason
        typingBox.classList.remove("inactive-leason")

        // adding the event class when the user click any keys
        bodyMain.addEventListener('keypress', (event)=>{
            // it gives the ASCII value of key
            var x = event.keyCode;  
            // it gives the char
            var y = String.fromCharCode(x);

            typedString += y

            if (x === 32)
            {
                allTypedChar += '␣'
            }
            else
            {
                allTypedChar += y;
            }
            

            // Timer start from , when the user press the first key
            if (allTypedChar.length === 1)
            {
                // Initialize the time 
                startTime=new Date()
            }

            // Recent char which is pressed by the user
            let recentChar = selectElement[typedString.length-1]
            // Char which is present on typing leason
            let originalString = selectElement[typedString.length-1].innerText
            
            if (originalString==='␣')
            space ++

            // comparing the char , does it equal or not
            if (y === originalString || x == 32 && originalString==='␣')
            {
                if (color)
                {
                    selectElement[typedString.length-1].classList.add("wrong")
                    f=f+1;
                    color = false
                }
                else
                {
                    recentChar.classList.add("right")
                }
                // removing the blinker from the previous 
                selectElement[typedString.length-1].classList.remove('blinker')
                // adding the blinker to the next one
                if (typedString.length != array.length)
                selectElement[typedString.length].classList.add('blinker')
            }
            else
            {
                color=true
                // removing the last char which was added to the typedString 
                typedString = typedString.substring(0, typedString.length - 1);
            }

            if (typedString.length === array.length)
            {

                endTime=new Date()
                var time = ((endTime.getTime() - startTime.getTime()) / 1000)/60

                // Minute;
                var Mistake = (allTypedChar.length-array.length)
                var speed =  ((typedString.length - Mistake)/5)/time
                var accuracy = (array.length/allTypedChar.length)*100
                // console.log(time.toFixed(2), Mistake , speed.toFixed(2) , accuracy.toFixed(2))
                var temp = `
                        <div class="result">
                            <div class="wpm">
                            <h2>${speed.toFixed(2)}</h2>
                            <p>Words / min.</p>
                            </div>
                            <div class="accuracy">
                                <h2>${accuracy.toFixed(2)}%</h2>
                                <p>Accuracy rate</p>
                            </div>
                            <div class="mistake">
                                <h2>${Mistake}</h2>
                                <p>Miss Typed</p>
                            </div>
                            <div class="minutes">
                                <h2>${time.toFixed(2)}</h2>
                                <p>Minutes</p>
                            </div> 
                        </div>`
                // resultBox.removeChild(resultBox.childNodes[0])
                resultBox.innerHTML = temp
                // resultBox.removeChild(resultBox.childNodes[0])
                // setTimeout(()=>{
                //     window.location.reload();
                // },5000)
                // window.location.reload()
                shuffle()
            }
        })
    
    }
}




// recentChar.classList.add("wrong")