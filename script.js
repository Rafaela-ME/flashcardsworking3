// ================================
// AGROFLASH ACADEMY
// ================================

const questions = [
{
    question:"Qual é o principal objetivo da agricultura sustentável?",
    answers:[
        "Produzir alimentos preservando os recursos naturais.",
        "Produzir o máximo possível sem considerar o meio ambiente.",
        "Eliminar totalmente a vegetação nativa.",
        "Utilizar apenas fertilizantes químicos."
    ],
    correct:0,
    explanation:"A agricultura sustentável busca produzir alimentos preservando o solo, a água e a biodiversidade."
},
{
    question:"O plantio direto reduz principalmente:",
    answers:[
        "A erosão do solo.",
        "A quantidade de chuva.",
        "A biodiversidade.",
        "A fotossíntese."
    ],
    correct:0,
    explanation:"O plantio direto mantém a cobertura vegetal protegendo o solo da erosão."
},
{
    question:"A rotação de culturas serve para:",
    answers:[
        "Empobrecer o solo.",
        "Melhorar a fertilidade e reduzir pragas.",
        "Aumentar queimadas.",
        "Eliminar matéria orgânica."
    ],
    correct:1,
    explanation:"Alternar culturas melhora a saúde do solo e reduz naturalmente pragas e doenças."
},
{
    question:"A compostagem produz:",
    answers:[
        "Plástico.",
        "Adubo orgânico.",
        "Combustível.",
        "Concreto."
    ],
    correct:1,
    explanation:"A compostagem transforma resíduos orgânicos em adubo rico em nutrientes."
},
{
    question:"Uma fonte de energia renovável é:",
    answers:[
        "Petróleo",
        "Diesel",
        "Energia Solar",
        "Carvão"
    ],
    correct:2,
    explanation:"A energia solar é limpa, renovável e reduz impactos ambientais."
}
];

// ================================

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");

const next = document.getElementById("next");

const progress = document.getElementById("progressBar");

const counter = document.getElementById("counter");

const xp = document.getElementById("xp");

const hits = document.getElementById("hits");

// ================================

let current = 0;
let score = 0;
let correctAnswers = 0;
let answered = false;

// ================================

function renderQuestion(){

    answered = false;

    feedback.className = "";
    feedback.innerHTML = "";

    next.disabled = true;

    const q = questions[current];

    question.innerHTML = q.question;

    counter.innerHTML = `Questão ${current+1} de ${questions.length}`;

    progress.style.width =
        ((current+1)/questions.length)*100+"%";

    answers.innerHTML="";

    q.answers.forEach((text,index)=>{

        const button=document.createElement("button");

        button.className="answer";

        button.innerHTML=`
        <div class="answerLetter">
            ${String.fromCharCode(65+index)}
        </div>

        <span>${text}</span>
        `;

        button.onclick=()=>checkAnswer(button,index);

        answers.appendChild(button);

    });

}

renderQuestion();

// ================================

function checkAnswer(button,index){

    if(answered) return;

    answered=true;

    const q=questions[current];

    const buttons=document.querySelectorAll(".answer");

    buttons.forEach(btn=>{

        btn.classList.add("disabled");

    });

    if(index===q.correct){

        button.classList.add("correct");

        feedback.className="show success";

        feedback.innerHTML=`
        <strong>✔ Excelente!</strong><br><br>

        +100 XP<br><br>

        ${q.explanation}
        `;

        score+=100;

        correctAnswers++;

    }else{

        button.classList.add("wrong");

        buttons[q.correct].classList.add("correct");

        feedback.className="show error";

        feedback.innerHTML=`
        <strong>❌ Resposta incorreta</strong><br><br>

        ${q.explanation}
        `;

    }

    xp.innerHTML=score;

    hits.innerHTML=correctAnswers;

    next.disabled=false;

}

// ================================

next.onclick=()=>{

    current++;

    if(current<questions.length){

        renderQuestion();

    }else{

        finish();

    }

}

// ================================

function finish(){

    const percent=Math.round(
        (correctAnswers/questions.length)*100
    );

    document.querySelector(".quizCard").innerHTML=`

        <div style="text-align:center;">

        <h1 style="font-size:70px;">🏆</h1>

        <h2 style="margin:20px 0;">
            Curso Finalizado
        </h2>

        <h1 style="font-size:60px;color:#2E7D32;">
            ${percent}%
        </h1>

        <p style="margin:25px 0;font-size:20px;">
            Você acertou
            <strong>${correctAnswers}</strong>
            de
            <strong>${questions.length}</strong>
            perguntas.
        </p>

        <h3 style="margin-bottom:30px;">
            ⭐ XP Total: ${score}
        </h3>

        <button
        onclick="location.reload()"
        style="
        width:100%;
        padding:18px;
        border:none;
        border-radius:15px;
        background:#2E7D32;
        color:white;
        font-size:18px;
        cursor:pointer;
        ">
        Refazer Curso
        </button>

        </div>

    `;

}