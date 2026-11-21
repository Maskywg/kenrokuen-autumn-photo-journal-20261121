const photos=[...document.querySelectorAll('.photo')],dialog=document.querySelector('dialog'),large=document.querySelector('#large');let current=0;
function show(i){current=(i+photos.length)%photos.length;const f=photos[current].closest('figure'),im=f.querySelector('img');large.src=im.src;large.alt=im.alt;document.querySelector('#lightbox-title').textContent=f.querySelector('h3').textContent;document.querySelector('#caption').textContent=f.querySelector('figcaption p').textContent+' ｜ '+f.querySelector('.capture-date').textContent;document.querySelector('#counter').textContent=`${current+1} / ${photos.length}`;}
photos.forEach((p,i)=>{p.setAttribute('aria-label',`放大：${p.closest('figure').querySelector('h3').textContent}`);p.onclick=()=>{show(i);dialog.showModal();};});
document.querySelector('#close').onclick=()=>dialog.close();document.querySelector('#prev').onclick=()=>show(current-1);document.querySelector('#next').onclick=()=>show(current+1);dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1)});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

const bgm=document.querySelector('#bgm'),musicToggle=document.querySelector('#music-toggle'),musicStatus=document.querySelector('#music-status'),musicVolume=document.querySelector('#music-volume');let musicManuallyPaused=false;
bgm.volume=0.35;
function syncMusic(){musicToggle.textContent=bgm.paused?'播放配樂':'暫停配樂';musicToggle.setAttribute('aria-label',bgm.paused?'播放背景音樂':'暫停背景音樂');musicStatus.textContent=bgm.paused?'點擊播放 · 循環配樂':'播放中 · 循環配樂';}
async function startMusic(){if(musicManuallyPaused)return;try{await bgm.play();}catch{musicStatus.textContent='點擊網頁開始播放';}syncMusic();}
musicToggle.addEventListener('click',()=>{if(bgm.paused){musicManuallyPaused=false;startMusic();}else{musicManuallyPaused=true;bgm.pause();syncMusic();}});
musicVolume.addEventListener('input',()=>{bgm.volume=Number(musicVolume.value);});
for(const evt of ['pointerdown','keydown'])document.addEventListener(evt,e=>{if(!e.target.closest('.music-player')&&bgm.paused&&!musicManuallyPaused)startMusic();},{once:true});
bgm.addEventListener('play',syncMusic);bgm.addEventListener('pause',syncMusic);bgm.addEventListener('error',()=>{musicStatus.textContent='配樂載入失敗，請稍後重試';});startMusic();
