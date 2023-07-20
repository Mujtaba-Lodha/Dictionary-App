let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey ='ba3edf97-7575-407a-a1b2-478429ddbe03';
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading')

searchBtn.addEventListener('click', function(e){
    e.preventDefault();   
    // preventDefault :- no use behaviour je page refresh tay chhe tene rokva mate .

    // clar data
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';

    // get input data
    let word = input.value;

    // call api get data
    if(word === '') {
        alert('word is required');
        return;
    }
     getData (word);
})

 async function getData(word) {
    loading.style.display = 'block';
    // ajax call
   const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

 //    convert the this data json file 
   const data = await response.json();
 // if empty result
    if(!data.length) {
        loading.style.display = 'none';
        notFound.innerText = 'No result found'
        return;
    }

    // if result is suggestions
    if(typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggetion = document.createElement('span');
            suggetion.classList.add('suggested');
            suggetion.innerText = element;
            notFound.appendChild(suggetion);
        })
        return;
    }

    // reuslt found
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;

    //sound
    const soundName = data[0].hwi.prs[0].sound.audio;
        if(soundName) {
            // true sound file
            renderSound(soundName);
        }
   console.log(data);
}

function renderSound(soundName){ 
    //https://media.merriam-webster.com/soundc11

     let subfolder = soundName.charAt(0);
     let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

     let aud =document.createElement('audio');
     aud.src = soundSrc;
     aud.controls = true;
     audioBox.appendChild(aud);
}
