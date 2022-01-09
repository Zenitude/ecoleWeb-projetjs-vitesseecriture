// Variables
let secondes = 60;
let intervalChrono = setInterval(chrono, 1000);
let result = 0;
const api = 'http://api.quotable.io/random';
let phraseScore = 0;

// Sélection du body
const body = document.body;

    // Création du container principal
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    body.appendChild(container);

        // Création de la section Chrono
        const sectionChrono = document.createElement('section');
        sectionChrono.setAttribute('class', 'sectionChrono');
        container.appendChild(sectionChrono);

            /* Création de la partie "Temps : " */
            const txtChrono = document.createElement('span');
            txtChrono.innerHTML = 'Temps : ';
            sectionChrono.appendChild(txtChrono);

            /* Création de la partie Chrono */
            const timerChrono = document.createElement('span');
            timerChrono.innerHTML = secondes;
            sectionChrono.appendChild(timerChrono);

        // Création de la section Score
        const sectionScore = document.createElement('section');
        sectionScore.setAttribute('class', 'sectionScore');
        container.appendChild(sectionScore);

            /* Création de la partie "Score : " */
            const txtScore = document.createElement('span');
            txtScore.innerHTML = 'Score : ';
            sectionScore.appendChild(txtScore);

            /* Création de la partie Chrono */
            const score = document.createElement('span');
            score.innerHTML = result;
            sectionScore.appendChild(score);

        // Création de la section écriture
        const sectionEcriture = document.createElement('section');
        sectionEcriture.setAttribute('class', 'sectionEcriture');
        container.appendChild(sectionEcriture);

            /* Création de la partie comportant la phrase à écrire */
            const phrase = document.createElement('p');
            phrase.innerText = 'blablablablaldqfjqklfdjfqqjfmlqfm';
            sectionEcriture.appendChild(phrase);

            /* Création de la partie saisie des phrases */
            const saisie = document.createElement('textarea');
            saisie.setAttribute('cols', 30);
            saisie.setAttribute('rows', '3');
            saisie.setAttribute('autofocus', true);
            saisie.addEventListener('input', verifPhrase)
            sectionEcriture.appendChild(saisie);



// Construction du jeu
function typingGame()
{
    genererPhrase();
    verifPhrase();   
    
}

typingGame();

// Fonctions
function chrono()
{   
    secondes--;
    timerChrono.innerHTML = secondes;
    score.innerHTML = result;     
    
    if(secondes === 0)
    {
        clearInterval(intervalChrono);
    }
}

function verifPhrase()
{
    const tabPhrase = phrase.querySelectorAll('span');
    const tabSaisie = saisie.value.split('');

    let correct = true;

    tabPhrase.forEach((caractereSpan, index) => 
    {
        const caractere = tabSaisie[index];

        if(caractere == null)
        {
            caractereSpan.classList.remove('incorrect');
            caractereSpan.classList.remove('correct');
            correct = false;
        }
        else if(caractere === caractereSpan.innerText)
        {
            caractereSpan.classList.add('correct');
            caractereSpan.classList.remove('incorrect');
        }
        else
        {
            caractereSpan.classList.remove('correct');
            caractereSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if(correct === true)
    {
        genererPhrase();
        result += phraseScore;
    }
    
}

async function genererPhrase()
{
    const appelAPI = await fetch(api);
    const donnees = await appelAPI.json();
    const phraseTrouvee = donnees.content;

    phrase.innerText = '';
    
    phraseTrouvee.split('').forEach(caractere => 
    {
        const caractereSpan = document.createElement('span');
        caractereSpan.innerText = caractere;
        phrase.appendChild(caractereSpan);    
    });

    phraseScore = phraseTrouvee.length;
    saisie.value = null;

}