const form=document.querySelector('form');
const resultDiv=document.querySelector('.result');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    //dont want to page reload,query re-run,save from form/page to auto-submit when we submit form.
    getWordInfo(form.elements[0].value); 
    //func runs when form is submited.
   //0th childrens value of form element.
});

const getWordInfo = async (word)=>{
    // alert("your word is--->"+word);
    try {
    resultDiv.innerHTML="fetching data....."
    const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data=await response.json();

    let definitions=data[0].meanings[0].definitions[0];
    resultDiv.innerHTML=`
    <h2><strong>Word:</strong>${data[0].word}</h2>
    <p class="pos"><i>${data[0].meanings[0].partOfSpeech}</i></p>
    <p><strong>Meaning:</strong>${definitions.definition===undefined?"NOT FOUND......":definitions.definition}</p>
    <p><strong>Eg:</strong>${definitions.example=== undefined?"NOT FOUND.......":definitions.example}</p>
    <p><strong>Antonyms:</strong></p>
    `;

    //for fecthing Antonyms.........
    if(definitions.antonyms.length===0){
        resultDiv.innerHTML+=`<span>Not Found....</span>`
    }

    for(let i=0;i<definitions.antonyms.length;i++){
        resultDiv.innerHTML+=`<li >${definitions.antonyms[i]}</li>`
    }

     resultDiv.innerHTML+=`<a href="${data[0].sourceUrls}" target="_blank" class="ant"><br><br>Read More</a>`;
    } catch (error) {
        resultDiv.innerHTML=`<h3>Sorry,the given word could not be found.</h3>`
    }

    // console.log(data);
}