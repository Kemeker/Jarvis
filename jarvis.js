// selecionando o HTML
const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


// funçao falar
function falar(text){
    const texto_falar = new SpeechSynthesisUtterance(text)

    texto_falar.rate = 1
    texto_falar.volume = 1
    texto_falar.pitch = 1

    window.speechSynthesis.speak(texto_falar)
}

// criando wish user
function wishMe() {
    var dia = new Date()
    var hora = dia.getHours()

    if (hora >= 0 && hora < 12){
        speak("Bom dia Chefe...")
    }else if(hora >= 12 && hora <17){
        speak("Boa tarde Chefe...")
    }else{
        speak("Boa noite Chefe...")
    }
}

window.addEventListener('load', ()=>{
    speak("Inicializando ANABEATRIZ")
    wishMe()
})

// comandos usuarios

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    content.textContent = "Ouvindo..."
    recognition.start()
})

// funçao pegar comando 

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}