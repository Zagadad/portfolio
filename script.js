// ===== EMAILJS CONFIG =====
const EMAILJS_PUBLIC_KEY = "-Lzf7rdFSOBPGxHPq";
const EMAILJS_SERVICE_ID = "service_7zx2tst";
const EMAILJS_TEMPLATE_ID = "template_wdzlo1y";
const darkToggle = document.getElementById("darkToggle");
const emailConfigured = ![
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID
].some(value => value.startsWith("YOUR_"));

if(emailConfigured){
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });
}

if(typeof emailjs === "undefined"){
    console.error("EmailJS library failed to load.");
}


// ===== DARK MODE =====
function setDarkToggleIcon(){
    darkToggle.innerText = document.body.classList.contains("dark") ? "☀" : "🌙";
}

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}
setDarkToggleIcon();

darkToggle.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    setDarkToggleIcon();
});


// ===== HAMBURGER MENU =====
function toggleMenu(){
    document.getElementById("nav").classList.toggle("show");
}

document.querySelectorAll(".nav-link").forEach(link=>{
    link.addEventListener("click", ()=>{
        document.getElementById("nav").classList.remove("show");
    });
});


// ===== TYPING EFFECT =====
const text = "Hi, I'm Yewoh Stephen, a Full-Stack Developer and Computer Engineer.";
let i = 0;

function typing(){
    if(i < text.length){
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 70);
    }
}
typing();


// ===== SCROLL REVEAL =====
function revealSections(){
    document.querySelectorAll(".reveal").forEach(el=>{
        if(el.getBoundingClientRect().top < window.innerHeight - 100){
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);


// ===== ACTIVE NAV =====
function setActiveNavLink(){
    let sections = document.querySelectorAll("section");
    let links = document.querySelectorAll("nav a");

    sections.forEach((sec,i)=>{
        let top = sec.offsetTop;
        let height = sec.offsetHeight;

        if(window.scrollY >= top && window.scrollY < top + height){
            links.forEach(l=>l.classList.remove("active"));
            links[i].classList.add("active");
        }
    });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);


// ===== FILTER PROJECTS =====
function filterProjects(type, button){
    document.querySelectorAll(".project-card").forEach(card=>{
        if(type === "all" || card.classList.contains(type)){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    if(button){
        document.querySelectorAll(".filters button").forEach(filter=>filter.classList.remove("active"));
        button.classList.add("active");
    }
}


// ===== MODAL =====
function openModal(title,text,image){
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalText").innerText = text;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalImage").alt = title + " screenshot";
    document.getElementById("modal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(){
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = "";
}

document.getElementById("modal").addEventListener("click", (e)=>{
    if(e.target.id === "modal"){
        closeModal();
    }
});

document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape"){
        closeModal();
    }
});


// ===== CONTACT FORM (EMAILJS) =====
document.getElementById("contactForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const submitBtn = this.querySelector("button");
    const msg = document.getElementById("msg");

    let params = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    if(!params.name || !params.email || !params.message){
        msg.innerHTML = "❌ Please fill in all fields.";
        return;
    }

    if(!emailConfigured){
        msg.innerHTML = "❌ EmailJS is not configured correctly.";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    msg.innerHTML = "";

    try{

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            params
        );

        console.log("SUCCESS:", response);

        msg.innerHTML = "✅ Message sent successfully!";
        this.reset();

    }catch(error){

        console.error("EmailJS Error:", error);

        msg.innerHTML =
            `❌ Failed: ${error?.text || error?.message || "Unknown Error"}`;

    }finally{

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";

    }

});


// ===== PARTICLES =====
const canvas = document.createElement("canvas");
const particlesContainer = document.getElementById("particles");
particlesContainer.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = particlesContainer.offsetWidth;
    canvas.height = particlesContainer.offsetHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

for(let i=0;i<40;i++){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:2,
        dx:(Math.random()-0.5)*0.5,
        dy:(Math.random()-0.5)*0.5
    });
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.x += p.dx;
        p.y += p.dy;

        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="cyan";
        ctx.fill();
    });

    requestAnimationFrame(animate);
}
// ===== BACK TO TOP =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 300){
        backToTop.classList.add("show");
    }else{
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", ()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});
animate();
