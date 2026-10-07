const defaultData = {
  name: "Enter your name",
  role: "Enter your job title",
  email: "Enter your email",
  phone: "Enter your phone number",
  location: "Enter your location",
  website: "Enter your website",
  linkedin: "Enter your LinkedIn",
  github: "Enter your GitHub",

  summary:
    "Write a short professional summary about yourself...",

  photo: "",

  experience: [
    {
      company: "Enter company name",
      role: "Enter your role",
      start: "Start year",
      end: "End year",
      desc:
        "Describe your responsibilities and achievements..."
    }
  ],

  education: [
    {
      school: "Enter school / college name",
      degree: "Enter your degree",
      start: "Start year",
      end: "End year",
      score: "Enter score / percentage"
    }
  ],

  skills: [
    "Enter skill 1",
    "Enter skill 2",
    "Enter skill 3"
  ],

  projects: [
    {
      name: "Enter project name",
      tech: "HTML · CSS · JavaScript",
      link: "Enter project link",
      desc:
        "Describe your project and its main features..."
    }
  ],

  certifications: [
    {
      name: "Enter certification name",
      org: "Enter organization",
      year: "Year"
    }
  ],

  languages: [
    {
      name: "Enter language",
      level: "Enter proficiency level"
    }
  ],

  template: "modern",
  accent: "#5b5ff5"
};
let data=JSON.parse(localStorage.getItem("frankResume")||"null")||structuredClone(defaultData);
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function save(){localStorage.setItem("frankResume",JSON.stringify(data));$("#saveStatus").textContent="● Saved locally";render();strength()}
function toast(t){let x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1600)}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function bindBasics(){ $$("[data-key]").forEach(el=>{el.value=data[el.dataset.key]||"";el.oninput=()=>{data[el.dataset.key]=el.value;save()}});$("#accent").value=data.accent;$("#colorValue").textContent=data.accent.toUpperCase();$("#template").value=data.template}
function itemEditor(type,item,i){
 let fields=type==="experience"?`
<label>Company<input value="${esc(item.company)}" data-arr="${type}" data-i="${i}" data-f="company"></label><div class="grid two"><label>Role<input value="${esc(item.role)}" data-arr="${type}" data-i="${i}" data-f="role"></label><label>Dates<input value="${esc(item.start)}" data-arr="${type}" data-i="${i}" data-f="start" placeholder="2025 — Present"></label></div><label>Description<textarea rows="3" data-arr="${type}" data-i="${i}" data-f="desc">${esc(item.desc)}</textarea>`
:type==="education"?`<label>College / University<input value="${esc(item.school)}" data-arr="${type}" data-i="${i}" data-f="school"></label><label>Degree<input value="${esc(item.degree)}" data-arr="${type}" data-i="${i}" data-f="degree"></label><div class="grid two"><label>Start<input value="${esc(item.start)}" data-arr="${type}" data-i="${i}" data-f="start"></label><label>End<input value="${esc(item.end)}" data-arr="${type}" data-i="${i}" data-f="end"></label></div><label>CGPA / Score<input value="${esc(item.score)}" data-arr="${type}" data-i="${i}" data-f="score"></label>`
:type==="projects"?`<label>Project name<input value="${esc(item.name)}" data-arr="${type}" data-i="${i}" data-f="name"></label><label>Technologies<input value="${esc(item.tech)}" data-arr="${type}" data-i="${i}" data-f="tech"></label><label>GitHub / Live link<input value="${esc(item.link)}" data-arr="${type}" data-i="${i}" data-f="link"></label><label>Description<textarea rows="3" data-arr="${type}" data-i="${i}" data-f="desc">${esc(item.desc)}</textarea>`
:type==="certifications"?`<label>Certificate<input value="${esc(item.name)}" data-arr="${type}" data-i="${i}" data-f="name"></label><div class="grid two"><label>Organization<input value="${esc(item.org)}" data-arr="${type}" data-i="${i}" data-f="org"></label><label>Year<input value="${esc(item.year)}" data-arr="${type}" data-i="${i}" data-f="year"></label></div>`:
`<div class="grid two"><label>Language<input value="${esc(item.name)}" data-arr="${type}" data-i="${i}" data-f="name"></label><label>Level<input value="${esc(item.level)}" data-arr="${type}" data-i="${i}" data-f="level"></label></div>`;
 return `<div class="item-card">${fields}<button class="remove" data-remove="${type}" data-i="${i}">×</button></div>`
}
function renderEditors(){
 $("#experienceList").innerHTML=data.experience.map((x,i)=>itemEditor("experience",x,i)).join("")+`<button class="add-btn" data-add="experience">＋ Add experience</button>`;
 $("#educationList").innerHTML=data.education.map((x,i)=>itemEditor("education",x,i)).join("")+`<button class="add-btn" data-add="education">＋ Add education</button>`;
 $("#projectList").innerHTML=data.projects.map((x,i)=>itemEditor("projects",x,i)).join("")+`<button class="add-btn" data-add="projects">＋ Add project</button>`;
 $("#certList").innerHTML=data.certifications.map((x,i)=>itemEditor("certifications",x,i)).join("")+`<button class="add-btn" data-add="certifications">＋ Add certification</button>`;
 $("#languageList").innerHTML=data.languages.map((x,i)=>itemEditor("languages",x,i)).join("");
 $("#skillTags").innerHTML=data.skills.map((x,i)=>`<span class="tag">${esc(x)} <button data-skill-remove="${i}">×</button></span>`).join("");
}
function resumeHTML(){
 const contact=[data.email,data.phone,data.location,data.website,data.linkedin,data.github].filter(Boolean).map(esc).join("  •  ");
 const photo=data.photo?`<img class="photo-resume" src="${data.photo}">`:"";
 const exp=data.experience.filter(x=>x.company||x.role).map(x=>`<div class="entry"><div class="entry-head"><h3>${esc(x.role||"Role")}</h3><span class="date">${esc(x.start)}${x.end?` — ${esc(x.end)}`:""}</span></div><div class="sub">${esc(x.company)}</div><div class="desc">${esc(x.desc)}</div></div>`).join("");
 const edu=data.education.filter(x=>x.school||x.degree).map(x=>`<div class="entry"><div class="entry-head"><h3>${esc(x.degree)}</h3><span class="date">${esc(x.start)}${x.end?` — ${esc(x.end)}`:""}</span></div><div class="sub">${esc(x.school)}</div>${x.score?`<div class="desc">Score: ${esc(x.score)}</div>`:""}</div>`).join("");
 const projects=data.projects.filter(x=>x.name).map(x=>`<div class="entry"><h3>${esc(x.name)}</h3><div class="sub">${esc(x.tech)}</div><div class="desc">${esc(x.desc)}</div>${x.link?`<div class="desc">${esc(x.link)}</div>`:""}</div>`).join("");
 const cert=data.certifications.filter(x=>x.name).map(x=>`<div class="entry"><h3>${esc(x.name)}</h3><div class="sub">${esc(x.org)}${x.year?" · "+esc(x.year):""}</div></div>`).join("");
 const langs=data.languages.filter(x=>x.name).map(x=>`<div class="entry"><h3>${esc(x.name)}</h3><div class="desc">${esc(x.level)}</div></div>`).join("");
 return `<header>${photo}<h1>${esc(data.name||"Your Name")}</h1><div class="r-role">${esc(data.role||"Professional Title")}</div><div class="contact">${contact||"email@example.com  •  +91 00000 00000"}</div></header>
 <div class="summary">${esc(data.summary||"Add a professional summary from the editor.")}</div>
 <div class="r-grid"><div>
 ${exp?`<section class="r-section"><div class="r-title">Experience</div>${exp}</section>`:""}
 ${projects?`<section class="r-section"><div class="r-title">Selected Projects</div>${projects}</section>`:""}
 ${edu?`<section class="r-section"><div class="r-title">Education</div>${edu}</section>`:""}
 ${cert?`<section class="r-section"><div class="r-title">Certifications</div>${cert}</section>`:""}
 </div><aside>
 ${data.skills.length?`<section class="r-section"><div class="r-title">Skills</div><div class="skills">${data.skills.map(s=>`<span class="skill">${esc(s)}</span>`).join("")}</div></section>`:""}
 ${langs?`<section class="r-section"><div class="r-title">Languages</div>${langs}</section>`:""}
 <section class="r-section links"><div class="r-title">Links</div>${data.website?`<a><b>Portfolio</b><br>${esc(data.website)}</a>`:""}${data.linkedin?`<a><b>LinkedIn</b><br>${esc(data.linkedin)}</a>`:""}${data.github?`<a><b>GitHub</b><br>${esc(data.github)}</a>`:""}</section>
 </aside></div>`
}
function render(){const r=$("#resume");r.className="resume "+data.template;r.innerHTML=resumeHTML();document.documentElement.style.setProperty("--accent",data.accent)}
function strength(){let checks=["name","role","email","phone","location","summary","skills","education","projects"];let score=checks.reduce((n,k)=>n+(k==="skills"?data.skills.length>0:k==="education"?data.education.length>0:k==="projects"?data.projects.length>0:!!data[k]),0);let pct=Math.round(score/checks.length*100);$("#strength").textContent=pct+"%";$("#strengthBar").style.width=pct+"%";$("#strengthText").textContent=pct<45?"Start adding your details.":pct<80?"Good progress — keep going.":"Great! Your resume is looking strong."}
function init(){bindBasics();renderEditors();render();strength()}
document.addEventListener("input",e=>{
 const el=e.target;if(el.dataset.arr){data[el.dataset.arr][+el.dataset.i][el.dataset.f]=el.value;save()}
});
document.addEventListener("click",e=>{
 const toggle=e.target.closest(".section-toggle");if(toggle)toggle.parentElement.classList.toggle("open");
 const add=e.target.closest("[data-add]");if(add){let t=add.dataset.add;let obj=t==="experience"?{company:"",role:"",start:"",end:"Present",desc:""}:t==="education"?{school:"",degree:"",start:"",end:"",score:""}:t==="projects"?{name:"",tech:"",link:"",desc:""}:t==="certifications"?{name:"",org:"",year:""}:null;if(obj){data[t].push(obj);save();renderEditors()}}
 const rem=e.target.closest("[data-remove]");if(rem){data[rem.dataset.remove].splice(+rem.dataset.i,1);save();renderEditors()}
 const sr=e.target.closest("[data-skill-remove]");if(sr){data.skills.splice(+sr.dataset.skillRemove,1);save()}
});
$("#addSkill").onclick=()=>{let x=$("#skillInput").value.trim();if(x&&!data.skills.includes(x)){data.skills.push(x);$("#skillInput").value="";save()}};
$("#skillInput").onkeydown=e=>{if(e.key==="Enter")$("#addSkill").click()};
$("#accent").oninput=e=>{data.accent=e.target.value;$("#colorValue").textContent=e.target.value.toUpperCase();save()};
$("#template").onchange=e=>{data.template=e.target.value;save();toast("Template changed")};
$("#downloadBtn").onclick=()=>window.print();
$("#resetBtn").onclick=()=>{if(confirm("Reset your resume to the starter content?")){data=structuredClone(defaultData);save();renderEditors();bindBasics();toast("Resume reset")}};
$("#photoBtn").onclick=()=>$("#photoInput").click();
$("#photoInput").onchange=e=>{let f=e.target.files[0];if(!f)return;let reader=new FileReader();reader.onload=()=>{data.photo=reader.result;$("#photoPreview").style.backgroundImage=`url(${reader.result})`;$("#photoPreview").textContent="";save()};reader.readAsDataURL(f)};
$("#mobilePreview").onclick=()=>{$(".preview-area").classList.toggle("mobile-show");window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})};
$$(".scale").forEach(b=>b.onclick=()=>{let s=parseFloat(getComputedStyle($("#resume")).transform.match(/matrix\(([^,]+)/)?.[1]||"1");s*=parseFloat(b.dataset.scale);s=Math.min(1.2,Math.max(.6,s));$("#resume").style.transform=`scale(${s})`;$("#zoom").textContent=Math.round(s*100)+"%"});
init();
