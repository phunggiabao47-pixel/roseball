const crypto = require('crypto');

function sign(payload, secret){
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

module.exports = async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({message:'Method not allowed'});
  const expected = process.env.ROSE_MEMBER_CODE;
  const secret = process.env.ROSE_AUTH_SECRET;
  if(!expected || !secret) return res.status(500).json({message:'Cấu hình bảo mật chưa hoàn tất.'});
  const code = String(req.body?.code || '');
  const a = Buffer.from(code); const b = Buffer.from(expected);
  const ok = a.length === b.length && crypto.timingSafeEqual(a,b);
  if(!ok) return res.status(401).json({message:'Mã truy cập không chính xác. Vui lòng kiểm tra lại.'});
  const token = sign({scope:'vgf-registration',exp:Date.now()+2*60*60*1000}, secret);
  return res.status(200).json({token,expiresIn:7200});
};
