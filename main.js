const menu=document.querySelector('.menu-btn');
const links=document.querySelector('.navlinks');

if(menu&&links){
  menu.addEventListener('click',()=>links.classList.toggle('open'));
}

const path=location.pathname.split('/').pop()||'index.html';

document.querySelectorAll('.navlinks a').forEach(a=>{
  const href=a.getAttribute('href');
  if(href===path) a.classList.add('active');
});

/* TOPBAR CLEANUP */
const roseTopbar=document.querySelector('.topbar .container');

if(roseTopbar){
  const topbarItems=roseTopbar.querySelectorAll('span');

  if(topbarItems[0]){
    topbarItems[0].textContent='ROSE FOOTBALL CLUB · TP.HCM';
    topbarItems[0].style.whiteSpace='nowrap';
  }

  if(topbarItems[1]){
    topbarItems[1].textContent='@roseball_vn';
    topbarItems[1].style.whiteSpace='nowrap';
  }

  const syncRoseTopbar=()=>{
    if(window.innerWidth<=640){
      roseTopbar.style.display='flex';
      roseTopbar.style.alignItems='center';
      roseTopbar.style.justifyContent='center';
      roseTopbar.style.padding='7px 0';
      roseTopbar.style.minHeight='32px';

      if(topbarItems[0]){
        topbarItems[0].style.fontSize='11px';
        topbarItems[0].style.fontWeight='800';
        topbarItems[0].style.letterSpacing='.055em';
        topbarItems[0].style.textAlign='center';
      }

      if(topbarItems[1]) topbarItems[1].style.display='none';
    }else{
      roseTopbar.style.display='flex';
      roseTopbar.style.alignItems='center';
      roseTopbar.style.justifyContent='space-between';
      roseTopbar.style.padding='8px 0';
      roseTopbar.style.minHeight='auto';

      if(topbarItems[0]){
        topbarItems[0].style.fontSize='';
        topbarItems[0].style.fontWeight='';
        topbarItems[0].style.letterSpacing='';
        topbarItems[0].style.textAlign='';
      }

      if(topbarItems[1]) topbarItems[1].style.display='';
    }
  };

  syncRoseTopbar();
  window.addEventListener('resize',syncRoseTopbar);
}

/* JOIN FORM */
const joinForm=document.querySelector('#joinForm');
if(joinForm){
  joinForm.addEventListener('submit',e=>{
    e.preventDefault();
    const f=new FormData(joinForm);
    const subject=encodeURIComponent('Ứng tuyển Rose FC - '+(f.get('name')||''));
    const body=encodeURIComponent(`Họ tên: ${f.get('name')}
Năm sinh: ${f.get('birth')}
Vị trí: ${f.get('position')}
SĐT/Zalo: ${f.get('contact')}
Facebook/Instagram: ${f.get('social')}
Kinh nghiệm: ${f.get('experience')}
Lý do muốn tham gia Rose FC: ${f.get('reason')}`);
    location.href=`mailto:rosefootballclub2025@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* GLOBAL SPONSOR SECTION */
document.querySelectorAll('.footer').forEach(footer=>{
  if(document.querySelector('.sponsor-section')) return;
  const sponsor=document.createElement('section');
  sponsor.className='sponsor-section';
  sponsor.innerHTML=`
    <div class="container">
      <div class="sponsor-label">OFFICIAL PARTNER</div>
      <div class="sponsor-logo-wrap"><img src="roseball-foundation.png" alt="Roseball Foundation"></div>
      <div class="sponsor-name">Roseball Foundation</div>
      <div class="sponsor-sub">Official Partner of Rose Football Club</div>
    </div>`;
  footer.parentNode.insertBefore(sponsor,footer);
});

/* SOCIAL LINKS */
document.querySelectorAll('.footer a').forEach(link=>{
  const text=(link.textContent||'').trim();
  if(text.includes('Facebook: Rose Football Club')){
    link.href='https://www.facebook.com/share/1EfpB9r8fY/?mibextid=wwXIfr';
    link.target='_blank';
    link.rel='noopener noreferrer';
  }
  if(text.includes('Instagram: @roseball_vn')){
    link.href='https://www.instagram.com/roseball_vn/';
    link.target='_blank';
    link.rel='noopener noreferrer';
  }
});

/* FOOTER VENUE INFO */
document.querySelectorAll('.footer').forEach(footer=>{
  const contact=footer.querySelector('.footer-grid > div:last-child');
  if(contact&&!contact.querySelector('.footer-venue')){
    const venue=document.createElement('div');
    venue.className='footer-venue';
    venue.style.cssText='margin-top:18px;padding-top:14px;border-top:1px solid #2b2b2f';
    venue.innerHTML=`
      <strong style="display:block;margin-bottom:6px;font-size:13px;color:#fff">Sân sinh hoạt</strong>
      <span style="display:block;color:#c9c9ce;font-size:14px">Sân bóng đá NOK</span>
      <a href="https://www.google.com/maps/search/?api=1&query=Sân+bóng+đá+NOK+Phạm+Hùng+Chánh+Hưng+TPHCM" target="_blank" rel="noopener">Hẻm C4 Phạm Hùng, P. Chánh Hưng, TP.HCM</a>`;
    contact.appendChild(venue);
  }
});

/* CURRENT ROSE FC SQUAD */
const roseCurrentSquad=[
  {number:'01',name:'Lưu Gia Bảo',position:'GK'},
  {number:'03',name:'Trần Sĩ Cao Thắng',position:'RW'},
  {number:'04',name:'Trịnh Tùng Lâm',position:'CB'},
  {number:'08',name:'Nguyễn Hưng',position:'GK'},
  {number:'12',name:'Trương Đức Huy Hoàng',position:'CB'},
  {number:'15',name:'Nguyễn Hoàng Duy',position:'ST'},
  {number:'17',name:'Nguyễn Chí Hiếu',position:'RW'},
  {number:'18',name:'Phạm Minh Phúc',position:'LW'},
  {number:'20',name:'Trương Anh Khoa',position:'CF'},
  {number:'21',name:'Nguyễn Minh Hoàng',position:'CM'},
  {number:'27',name:'Trần Ngọc Bảo',position:'CB'},
  {number:'28',name:'Phùng Gia Bảo',position:'CF'},
  {number:'31',name:'Hoàng Anh',position:'CB'},
  {number:'33',name:'Lê Gia Huy',position:'ST'},
  {number:'46',name:'Lê Thế Duy',position:'ST'},
  {number:'89',name:'Lê Nguyễn Phước Thiện',position:'CM'}
];

function rosePlayerCard(player){
  return `<div class="player"><div class="num">${player.number}</div><h3>${player.name}</h3><span class="badge">${player.position}</span></div>`;
}

if(path==='team.html'){
  const squadGrid=document.querySelector('.player-grid');
  if(squadGrid) squadGrid.innerHTML=roseCurrentSquad.map(rosePlayerCard).join('');
}

if(path==='index.html'){
  const homeGrid=document.querySelector('.player-grid');
  if(homeGrid){
    const featuredNumbers=['01','04','18','28'];
    const featuredPlayers=roseCurrentSquad.filter(player=>featuredNumbers.includes(player.number));
    homeGrid.innerHTML=featuredPlayers.map(rosePlayerCard).join('');
  }
}

/* WEEKLY SCHEDULE · 04–05.09.2026 */
if(path==='index.html'){
  const matchSection=[...document.querySelectorAll('section.section')].find(section=>{
    const kicker=section.querySelector('.section-head .kicker');
    return kicker&&kicker.textContent.trim()==='Match Centre';
  });

  if(matchSection){
    const heading=matchSection.querySelector('.section-head h2');
    if(heading) heading.textContent='Lịch hoạt động tuần này';

    const matchCentre=matchSection.querySelector('.match-centre');
    if(matchCentre){
      matchCentre.innerHTML=`
        <div class="match-card red">
          <div class="league">THỨ 6 · 04.09.2026 · SÂN NOK</div>
          <div style="padding:22px 8px 8px">
            <div class="kicker">SINH HOẠT GIAO LƯU HÀNG TUẦN</div>
            <h3 style="font-size:52px;line-height:1;margin:9px 0 12px">18:00</h3>
            <p style="margin:0 0 18px;opacity:.88">Sinh hoạt và giao lưu bóng đá định kỳ của Rose FC.</p>
            <div class="datebox">* Giờ trên là giờ có mặt</div>
          </div>
        </div>
        <div class="match-card">
          <div class="league">THỨ 7 · 05.09.2026 · SÂN NOK</div>
          <div style="padding:22px 8px 8px">
            <div class="kicker">TẬP LUYỆN NỘI BỘ</div>
            <h3 style="font-size:46px;line-height:1;margin:9px 0 16px;letter-spacing:-.035em">CANCELLED</h3>
            <p style="margin:0 0 18px;color:#bdbdc2">Ngày khai giảng ảnh hưởng tới nhiều cầu thủ, buổi sinh hoạt bù sẽ được thông báo sau.</p>
          </div>
        </div>`;
    }
  }
}

if(path==='matches.html'){
  const upcomingBox=document.querySelector('.next');
  if(upcomingBox){
    upcomingBox.innerHTML=`
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px">
        <div style="padding:18px;border-radius:14px;background:#fff5f6;border:1px solid #ffd7db">
          <div style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#d90416">THỨ 6 · 04.09.2026 · SÂN NOK</div>
          <div style="font-size:34px;font-weight:950;letter-spacing:-.04em;color:#111;margin:5px 0">18:00</div>
          <strong style="display:block;color:#222">Sinh hoạt giao lưu hàng tuần</strong>
        </div>
        <div style="padding:18px;border-radius:14px;background:#f7f7f8;border:1px solid #e5e5e7">
          <div style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#777">THỨ 7 · 05.09.2026 · SÂN NOK</div>
          <div style="font-size:30px;font-weight:950;letter-spacing:-.04em;color:#d90416;margin:5px 0">CXL</div>
          <strong style="display:block;color:#222">Ngày khai giảng ảnh hưởng tới nhiều cầu thủ, buổi sinh hoạt bù sẽ được thông báo sau.</strong>
        </div>
      </div>
      <div style="margin-top:13px;font-size:12px;color:#8a8480">* Giờ trên là giờ có mặt đối với buổi Thứ 6.</div>`;

    const upcomingHead=upcomingBox.previousElementSibling;
    const upcomingHeading=upcomingHead?upcomingHead.querySelector('h2'):null;
    if(upcomingHeading) upcomingHeading.textContent='Lịch hoạt động tuần này';
  }
}

/* NEW ARTICLE · 02.09.2026 */
const roseGrassrootsArticle={
  href:'news-grassroots-youth-sustainability-02092026.html',
  image:'rose-student-football.webp',
  meta:'02.09.2026 · OPINION',
  title:'Các đội bóng đá phong trào trẻ ở Việt Nam có thật sự bền vững?',
  desc:'Gọi cầu, tham vọng chuyên nghiệp, cái tôi cầu thủ và bài toán tồn tại lâu dài của một CLB trẻ.'
};

/* HOME LATEST · NEWEST FIRST */
if(path==='index.html'){
  const latestSection=[...document.querySelectorAll('section.section.alt')].find(section=>{
    const kicker=section.querySelector('.section-head .kicker');
    return kicker&&kicker.textContent.trim()==='Latest';
  });
  const cards=latestSection?latestSection.querySelector('.cards'):null;

  if(cards&&!cards.querySelector(`a[href="${roseGrassrootsArticle.href}"]`)){
    const item=document.createElement('a');
    item.href=roseGrassrootsArticle.href;
    item.style.cssText='text-decoration:none;color:inherit';
    item.innerHTML=`
      <article class="card">
        <img class="card-img" src="${roseGrassrootsArticle.image}" alt="Bóng đá phong trào trẻ Việt Nam">
        <div class="card-body">
          <div class="meta">${roseGrassrootsArticle.meta}</div>
          <h3>${roseGrassrootsArticle.title}</h3>
          <p class="muted">${roseGrassrootsArticle.desc}</p>
        </div>
      </article>`;
    cards.prepend(item);
    while(cards.children.length>3) cards.lastElementChild.remove();
  }
}

/* NEWSROOM LATEST · FEATURED MATCH REPORT REMAINS PINNED */
if(path==='news.html'){
  const grid=document.querySelector('.news-grid');
  if(grid&&!grid.querySelector(`a[href="${roseGrassrootsArticle.href}"]`)){
    const item=document.createElement('a');
    item.className='news-card';
    item.href=roseGrassrootsArticle.href;
    item.innerHTML=`
      <img src="${roseGrassrootsArticle.image}" alt="Bóng đá phong trào trẻ Việt Nam">
      <div class="news-copy">
        <div class="news-meta">${roseGrassrootsArticle.meta}</div>
        <h3>${roseGrassrootsArticle.title}</h3>
        <p>${roseGrassrootsArticle.desc}</p>
      </div>`;
    grid.prepend(item);
  }
}
