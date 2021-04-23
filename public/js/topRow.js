// If you write any code do comment 
// write the purpose why you add line

// random array for typing leason

var firstButton = document.querySelector('.one')
var secondButton = document.querySelector('.two')
var arr = "qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy qwert poiuy"
let origin = 0
let suff = 0
if (1)
{
    origin = 1;
    suff = 0 ;
    var readyBox = document.querySelector('.ready')
    readyBox.classList.remove("hiding")
    firstButton.classList.add('active')
    secondButton.classList.remove('active')
    insertTheText(arr)
}

function original()
{

    origin = 1;
    suff = 0;
    var readyBox = document.querySelector('.ready')
    readyBox.classList.remove("hiding")
    var myobj = document.querySelector(".typing-leason");

    while (myobj.lastElementChild) 
    {
        myobj.removeChild(myobj.lastElementChild);
    }
    firstButton.classList.add('active')
    secondButton.classList.remove('active')
    insertTheText(arr)
}

function shuffle()
{
    suff = 1;
    origin = 0;
    var readyBox = document.querySelector('.ready')
    readyBox.classList.remove("hiding")

    var myobj = document.querySelector(".typing-leason");

    while (myobj.lastElementChild) 
    {
        myobj.removeChild(myobj.lastElementChild);
    }


    var arr = "";
    var temp_arr =['q' , 'w' , 'e' , 'r' , 't' , 'p', 'o' , 'i' , 'u' ,'y' , 'p']


    for (var i=0;i<100 ;i++)
    {
        if (i%4 === 0 && i!=0)
        arr+= '␣';
        var x = Math.floor(Math.random()*10);
        arr += temp_arr[x];
    }
    firstButton.classList.remove('active')
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
                if (suff === 1)
                shuffle()
                else
                original()
                // window.location.reload()
            }
        })
    
    }
}




// recentChar.classList.add("wrong")