'use strict';
// Content stays visible without JavaScript or when reduced motion is preferred.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
   }
  });
 }, { threshold: .12 });
 document.querySelectorAll('.section-heading, .interest-layout, .project, .playground, .about-photo, .about-copy, .contact-copy, .contact-form').forEach(element => {
  element.classList.add('scroll-reveal');
  revealObserver.observe(element);
 });
}
const interests = {
 code: ['CODE','Python got me into this.','I took some Python classes during my gap year in 2020. Before that, I wasn’t sure what I wanted to study. I ended up really enjoying programming, and that helped me choose computer science. Here are a few things I’ve worked on since.','Check out my projects','#projects','⌘'],
 music: ['MUSIC','I’ve been playing since I was a kid.','I started performing at church events when I was five. Since then I’ve learned saxophone, piano, acoustic guitar, and drums. I’d love to learn cello and violin too. For now, you can try making a tune on this page!','Try the loop machine','#play-title','♫'],
 sports: ['FOOTBALL','Barcelona and Manchester United.','Football is my favorite sport. I support Barcelona and Manchester United, and I like playing with friends whenever I get the chance. I also played intramural football at university. My hot take? There was never really a GOAT debate. There is only one...','Let’s talk football','#contact','⚽'],
 worship: ['MINISTRY & WORSHIP','Music is part of my worship too.','Ministry and worship are some of my other interests, alongside sports, music, and code. My favorite verse is John 15:13.','Send me a message','#contact','✝']
};
const tabs = [...document.querySelectorAll('[data-interest]')];
const panel = document.querySelector('#interest-panel');
const interestPhotos = {
 music: { src: 'Assets/photos/phin-childhood-drums.webp', alt: 'Phin as a child playing a blue drum kit at church', caption: 'young Phin on the drums', width: 720, height: 540 },
 sports: { src: 'Assets/photos/phin-playing-football.webp', alt: 'Phin playing football on a grass pitch', caption: 'Better with the ball at my feet.', width: 799, height: 1200 },
 worship: { src: 'Assets/photos/phin-worship.webp', alt: 'Phin singing into a microphone during worship, with a cross behind him', caption: '“Thus will I bless thee while I live: I will lift up my hands in thy name.” Psalm 63:4 (KJV)', width: 1200, height: 800 }
};
function selectInterest(key, focus = false) {
 const item = interests[key]; if (!item) return;
 tabs.forEach(tab => { const selected = tab.dataset.interest === key; tab.setAttribute('aria-selected',String(selected)); tab.tabIndex = selected ? 0 : -1; if (selected && focus) tab.focus(); });
 panel.setAttribute('aria-labelledby',`tab-${key}`);
 const photo = interestPhotos[key];
 panel.classList.toggle('panel-with-photo', Boolean(photo));
 const art = photo
   ? `<figure class="interest-photo ${key}-photo"><img src="${photo.src}" alt="${photo.alt}" width="${photo.width}" height="${photo.height}" decoding="async"><figcaption>${photo.caption}</figcaption></figure>`
   : '<div class="panel-art code-art" aria-hidden="true"><span>phin.py</span><code><i>while</i> curious:<br>&nbsp; learn()<br>&nbsp; make_something()<br>&nbsp; keep_going()</code></div>';
 panel.innerHTML = `<p class="panel-kicker">${item[0]}</p><h3>${item[1]}</h3><p>${item[2]}</p><a class="text-link" href="${item[4]}">${item[3]} ↗</a>${art}`;
}
tabs.forEach((tab,index) => {
 tab.addEventListener('click',() => selectInterest(tab.dataset.interest));
 tab.addEventListener('keydown',event => { let next; if (['ArrowDown','ArrowRight'].includes(event.key)) next=(index+1)%tabs.length; if (['ArrowUp','ArrowLeft'].includes(event.key)) next=(index+tabs.length-1)%tabs.length; if(event.key==='Home') next=0; if(event.key==='End') next=tabs.length-1; if(next!==undefined){event.preventDefault();selectInterest(tabs[next].dataset.interest,true);} });
});
document.querySelectorAll('[data-room]').forEach(object => object.addEventListener('click', event => {
 event.preventDefault();
 selectInterest(object.dataset.room);
 document.querySelector('#explore').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 panel.focus({preventScroll:true});
}));
const lightSwitch=document.querySelector('#light-switch');
lightSwitch.addEventListener('click',() => {
 const dim = document.body.classList.toggle('lights-dim');
 lightSwitch.setAttribute('aria-pressed', String(dim));
 lightSwitch.textContent = dim ? '☀ Warm the room' : '☾ Dim the lights';
});
document.querySelector('#year').textContent=new Date().getFullYear();
// A four-note palette. All sound is synthesized in the visitor's browser.
const names=['C5','A4','G4','E4'], frequencies=[523.25,440,392,329.63];
const pattern=Array.from({length:4},()=>Array(8).fill(false));
[[3,0],[2,2],[1,4],[0,6],[2,7]].forEach(([r,c])=>pattern[r][c]=true);
const grid=document.querySelector('#note-grid'),cells=[];
for(let row=0;row<4;row++){const label=document.createElement('span');label.className='note-label';label.textContent=names[row].slice(0,-1);label.setAttribute('aria-hidden','true');grid.append(label);cells[row]=[];for(let col=0;col<8;col++){const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`${names[row]}, step ${col+1}`);button.setAttribute('aria-pressed',String(pattern[row][col]));button.addEventListener('click',()=>{pattern[row][col]=!pattern[row][col];button.setAttribute('aria-pressed',String(pattern[row][col]));});grid.append(button);cells[row][col]=button;}}
let audioContext,timer,playing=false,step=0;
const playButton=document.querySelector('#play-melody'),status=document.querySelector('#audio-status');
function stopMelody(){playing=false;clearInterval(timer);playButton.textContent='▶ Play melody';playButton.setAttribute('aria-pressed','false');cells.flat().forEach(cell=>cell.classList.remove('current'));status.textContent='Paused. Your notes are still here.';}
function tick(){cells.flat().forEach(cell=>cell.classList.remove('current'));cells.forEach(row=>row[step].classList.add('current'));const now=audioContext.currentTime;frequencies.forEach((frequency,row)=>{if(!pattern[row][step])return;const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.055,now+.015);gain.gain.exponentialRampToValueAtTime(.001,now+.48);osc.connect(gain);gain.connect(audioContext.destination);osc.start(now);osc.stop(now+.5);osc.onended=()=>{osc.disconnect();gain.disconnect();};});step=(step+1)%8;}
playButton.addEventListener('click',async()=>{if(playing){stopMelody();return;}try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('Audio unavailable');audioContext ||= new Audio();await audioContext.resume();playing=true;step=0;playButton.textContent='Ⅱ Pause melody';playButton.setAttribute('aria-pressed','true');status.textContent='Playing your loop. Change notes as it plays.';tick();timer=setInterval(tick,300);}catch{status.textContent='Audio isn’t available in this browser. Try Chrome, Edge, Firefox, or Safari.';}});
document.querySelector('#clear-melody').addEventListener('click',()=>{pattern.forEach(row=>row.fill(false));cells.flat().forEach(cell=>cell.setAttribute('aria-pressed','false'));status.textContent='Notes cleared. Pick a few to make a new melody.';});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)stopMelody();});window.addEventListener('pagehide',stopMelody);

const contactForm = document.querySelector('#contact-form');
const sendButton = document.querySelector('#contact-send');
const contactStatus = document.querySelector('#contact-status');
const contactEndpoint = window.PHIN_CONTACT?.endpoint || '';
const contactReady = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(contactEndpoint);
if (contactReady) {
  contactForm.action = contactEndpoint;
  sendButton.disabled = false;
  contactStatus.textContent = 'I’ll reply to the email address you leave here.';
}
contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!contactReady || sendButton.disabled || !contactForm.reportValidity()) return;
  sendButton.disabled = true;
  sendButton.textContent = 'Sending...';
  contactForm.setAttribute('aria-busy', 'true');
  contactStatus.textContent = 'Sending your message...';
  try {
    const response = await fetch(contactEndpoint, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(20000)
    });
    if (!response.ok) throw new Error('Message not accepted');
    contactForm.reset();
    contactStatus.textContent = 'Got it! Thanks for writing to me :)';
  } catch {
    contactStatus.textContent = 'That didn’t go through. Your message is still here. Try again, or find me on GitHub.';
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = 'Send message ↗';
    contactForm.removeAttribute('aria-busy');
  }
});
