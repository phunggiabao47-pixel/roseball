const menu=document.querySelector('.menu-btn');const links=document.querySelector('.navlinks');if(menu&&links){menu.addEventListener('click',()=>links.classList.toggle('open'));}
const path=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.navlinks a').forEach(a=>{const href=a.getAttribute('href');if(href===path)a.classList.add('active');});
const joinForm=document.querySelector('#joinForm');if(joinForm){joinForm.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(joinForm);const subject=encodeURIComponent('Ứng tuyển Rose FC - '+(f.get('name')||''));const body=encodeURIComponent(`Họ tên: ${f.get('name')}\nNăm sinh: ${f.get('birth')}\nVị trí: ${f.get('position')}\nSĐT/Zalo: ${f.get('contact')}\nFacebook/Instagram: ${f.get('social')}\nKinh nghiệm: ${f.get('experience')}\nLý do muốn tham gia Rose FC: ${f.get('reason')}`);location.href=`mailto:rosefootballclub2025@gmail.com?subject=${subject}&body=${body}`;});}

/* GLOBAL SPONSOR SECTION */
document.querySelectorAll('.footer').forEach(footer=>{
  if(document.querySelector('.sponsor-section')) return;
  const sponsor=document.createElement('section');
  sponsor.className='sponsor-section';
  sponsor.innerHTML=`
    <div class="container">
      <div class="sponsor-label">OFFICIAL PARTNER</div>
      <div class="sponsor-logo-wrap">
        <img src="roseball-foundation.png" alt="Roseball Foundation">
      </div>
      <div class="sponsor-name">Roseball Foundation</div>
      <div class="sponsor-sub">Official Partner of Rose Football Club</div>
    </div>
  `;
  footer.parentNode.insertBefore(sponsor,footer);
});
