const crypto = require('crypto');

function verify(token, secret){
  try{
    const [body,sig] = token.split('.');
    const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
    if(!sig || sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected))) return null;
    const data = JSON.parse(Buffer.from(body,'base64url').toString('utf8'));
    if(data.exp < Date.now() || data.scope !== 'vgf-registration') return null;
    return data;
  }catch{return null;}
}

function clean(v,max=160){ return String(v ?? '').trim().slice(0,max); }

module.exports = async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({message:'Method not allowed'});
  const secret = process.env.ROSE_AUTH_SECRET;
  const webhook = process.env.POWER_AUTOMATE_WEBHOOK_URL;
  if(!secret) return res.status(500).json({message:'Cấu hình bảo mật chưa hoàn tất.'});
  const auth = String(req.headers.authorization || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if(!verify(token,secret)) return res.status(401).json({message:'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'});

  const p = req.body || {};
  const required = ['fullName','birthDate','primaryPosition','shirtNumber','phone','email','joinYear'];
  for(const k of required) if(!clean(p[k])) return res.status(400).json({message:`Thiếu thông tin bắt buộc: ${k}`});
  if(!(p.projectConfirm && p.agreeVGF && p.agreeFoundation && p.agreeForward && p.truthConfirm && p.selectionConfirm))
    return res.status(400).json({message:'Cần hoàn tất toàn bộ phần xác nhận và điều lệ.'});
  if(!/^\S+@\S+\.\S+$/.test(clean(p.email,200))) return res.status(400).json({message:'Email không hợp lệ.'});

  const registrationId = `RFC-VGF-2026-${Date.now().toString().slice(-8)}`;
  const row = {
    registrationId,
    fullName: clean(p.fullName,120),
    birthDate: clean(p.birthDate,20),
    primaryPosition: clean(p.primaryPosition,10),
    secondaryPosition: clean(p.secondaryPosition,10),
    shirtNumber: clean(p.shirtNumber,3),
    phone: clean(p.phone,30),
    email: clean(p.email,200),
    joinYear: clean(p.joinYear,4),
    agreeVGF: true,
    vgfTermsVersion: clean(p.versions?.vgf || 'TBD',40),
    agreeFoundation: true,
    foundationVersion: clean(p.versions?.foundation || '1.0',40),
    agreeForward: true,
    forwardVersion: clean(p.versions?.forward || '1.0',40),
    submittedAt: new Date().toISOString(),
    status: 'Pending',
    adminNote: ''
  };

  if(!webhook) return res.status(503).json({message:'Chưa cấu hình Power Automate để ghi dữ liệu vào Excel.'});
  const r = await fetch(webhook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(row)});
  if(!r.ok) return res.status(502).json({message:'Excel chưa nhận được dữ liệu. Vui lòng thử lại hoặc liên hệ BQL.'});
  return res.status(200).json({ok:true,registrationId,status:'Pending'});
};
