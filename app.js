/* ================= NovaCRM demo =================
   Veri localStorage'da tutulur (demo amaçlı).
   Gerçek projede: PostgreSQL + API.
================================================== */

// ---------- yardımcılar ----------
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const TL = n => n.toLocaleString("tr-TR") + " ₺";
const AYLAR = ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];
const bugun = new Date();
const iso = d => d.toISOString().slice(0,10);
const gunOnce = n => { const d = new Date(); d.setDate(d.getDate()-n); return iso(d); };
const gunSonra = n => { const d = new Date(); d.setDate(d.getDate()+n); return iso(d); };
const trTarih = s => { const [y,m,g] = s.split("-"); return `${+g} ${AYLAR[+m-1]}`; };

// ---------- seed data ----------
function seed(){
  const musteriler = [
    {id:1, ad:"Ayşe Demir",   tel:"0532 111 22 33", kaynak:"Instagram",    not:"Cilt bakımı paketi ile ilgileniyor, DM'den yazdı."},
    {id:2, ad:"Mehmet Kaya",  tel:"0533 444 55 66", kaynak:"Google Forms", not:"Kurumsal danışmanlık talebi, form doldurdu."},
    {id:3, ad:"Zeynep Arslan",tel:"0505 777 88 99", kaynak:"Tavsiye",      not:"Ayşe Hanım'ın tavsiyesiyle geldi."},
    {id:4, ad:"Emre Yıldız",  tel:"0542 123 45 67", kaynak:"Instagram",    not:"Reels'ten ulaştı, fiyat sordu."},
    {id:5, ad:"Fatma Şahin",  tel:"0555 987 65 43", kaynak:"Manuel",       not:"Telefonla arayarak kayıt oldu."},
    {id:6, ad:"Burak Çelik",  tel:"0530 246 80 12", kaynak:"Google Forms", not:"Aylık abonelik paketi soruyor."},
    {id:7, ad:"Elif Koç",     tel:"0538 369 12 48", kaynak:"Instagram",    not:"Story'den yazdı, randevu istedi."},
    {id:8, ad:"Can Öztürk",   tel:"0544 159 75 30", kaynak:"Tavsiye",      not:"Mehmet Bey yönlendirdi."},
  ];
  const randevular = [
    {id:1, musteriId:1, tarih:iso(bugun), saat:"10:00", hizmet:"Cilt bakımı seansı",   durum:"bekliyor"},
    {id:2, musteriId:3, tarih:iso(bugun), saat:"13:30", hizmet:"Kontrol randevusu",     durum:"bekliyor"},
    {id:3, musteriId:5, tarih:iso(bugun), saat:"16:00", hizmet:"İlk görüşme",           durum:"bekliyor"},
    {id:4, musteriId:2, tarih:gunSonra(1), saat:"11:00", hizmet:"Danışmanlık seansı",   durum:"bekliyor"},
    {id:5, musteriId:7, tarih:gunSonra(2), saat:"14:00", hizmet:"Paket başlangıcı",     durum:"bekliyor"},
    {id:6, musteriId:4, tarih:gunSonra(4), saat:"15:30", hizmet:"Fiyat görüşmesi",      durum:"bekliyor"},
    {id:7, musteriId:6, tarih:gunOnce(2), saat:"12:00", hizmet:"Abonelik görüşmesi",    durum:"tamamlandi"},
    {id:8, musteriId:8, tarih:gunOnce(4), saat:"09:30", hizmet:"Tanışma seansı",        durum:"tamamlandi"},
    {id:9, musteriId:1, tarih:gunOnce(6), saat:"10:00", hizmet:"Cilt analizi",          durum:"tamamlandi"},
    {id:10,musteriId:5, tarih:gunOnce(1), saat:"17:00", hizmet:"Kontrol",               durum:"iptal"},
  ];
  const islemler = [
    {id:1, tur:"gelir", tarih:gunOnce(1),  aciklama:"Cilt bakımı paketi — Ayşe Demir", kategori:"Hizmet",   tutar:4500},
    {id:2, tur:"gelir", tarih:gunOnce(3),  aciklama:"Danışmanlık — Mehmet Kaya",       kategori:"Hizmet",   tutar:6000},
    {id:3, tur:"gider", tarih:gunOnce(4),  aciklama:"Malzeme alımı",                   kategori:"Malzeme",  tutar:2350},
    {id:4, tur:"gelir", tarih:gunOnce(7),  aciklama:"Aylık abonelik — Burak Çelik",    kategori:"Abonelik", tutar:2500},
    {id:5, tur:"gider", tarih:gunOnce(9),  aciklama:"Instagram reklam bütçesi",        kategori:"Pazarlama",tutar:1800},
    {id:6, tur:"gelir", tarih:gunOnce(11), aciklama:"Seans paketi — Elif Koç",         kategori:"Hizmet",   tutar:3750},
    {id:7, tur:"gider", tarih:gunOnce(13), aciklama:"Kira ödemesi",                    kategori:"Sabit",    tutar:9000},
    {id:8, tur:"gelir", tarih:gunOnce(15), aciklama:"Kontrol seansı — Zeynep Arslan",  kategori:"Hizmet",   tutar:1200},
    {id:9, tur:"gider", tarih:gunOnce(18), aciklama:"Muhasebe hizmeti",                kategori:"Sabit",    tutar:1500},
    {id:10,tur:"gelir", tarih:gunOnce(20), aciklama:"Paket satışı — Can Öztürk",       kategori:"Hizmet",   tutar:5200},
  ];
  const leadler = [
    {id:1, ad:"Selin Aydın",  kaynak:"Instagram",    mesaj:"Merhaba, fiyat listenizi alabilir miyim?",             zaman:"8 dk önce",  fresh:true},
    {id:2, ad:"Okan Doğan",   kaynak:"Google Forms", mesaj:"Kurumsal paketleriniz hakkında bilgi istiyorum.",       zaman:"42 dk önce", fresh:false},
    {id:3, ad:"Merve Kurt",   kaynak:"Instagram",    mesaj:"Hafta sonu randevu var mı acaba?",                      zaman:"2 sa önce",  fresh:false},
    {id:4, ad:"Ali Vural",    kaynak:"Google Forms", mesaj:"Formu doldurdum, dönüş bekliyorum.",                    zaman:"5 sa önce",  fresh:false},
    {id:5, ad:"Deniz Ateş",   kaynak:"Instagram",    mesaj:"Reels'te gördüm, detay alabilir miyim?",                zaman:"dün",        fresh:false},
  ];
  return {musteriler, randevular, islemler, leadler, sonId:100};
}

let DB;
try { DB = JSON.parse(localStorage.getItem("novacrm")) || seed(); }
catch { DB = seed(); }
const save = () => { try { localStorage.setItem("novacrm", JSON.stringify(DB)); } catch {} };
const yeniId = () => ++DB.sonId;
const musteriAd = id => (DB.musteriler.find(m => m.id === id) || {ad:"—"}).ad;

// ---------- routing ----------
const BASLIKLAR = {dashboard:"Panel", randevular:"Randevular", cari:"Gelir / Gider", musteriler:"Müşteriler", leadler:"Lead Akışı"};
function route(){
  const v = (location.hash || "#dashboard").slice(1);
  const view = BASLIKLAR[v] ? v : "dashboard";
  $$(".view").forEach(el => el.hidden = el.id !== "view-"+view);
  $$(".nav-item").forEach(a => a.classList.toggle("active", a.dataset.view === view));
  $("#viewTitle").textContent = BASLIKLAR[view];
  if (view === "leadler") $("#leadDot").classList.remove("on");
  render(view);
}
window.addEventListener("hashchange", route);

// ---------- render ----------
function render(view){
  if (view === "dashboard") renderDashboard();
  if (view === "randevular") renderRandevular();
  if (view === "cari") renderCari();
  if (view === "musteriler") renderMusteriler();
  if (view === "leadler") renderLeadler();
}

function renderDashboard(){
  const bugunStr = iso(bugun);
  const bugunku = DB.randevular.filter(r => r.tarih === bugunStr && r.durum === "bekliyor");
  $("#statRandevu").textContent = bugunku.length;
  $("#statRandevuSub").textContent = bugunku.length ? "ilki " + bugunku.map(r=>r.saat).sort()[0] : "randevu yok";

  const ay = bugun.getMonth();
  const buAy = DB.islemler.filter(i => new Date(i.tarih).getMonth() === ay);
  const gelir = buAy.filter(i=>i.tur==="gelir").reduce((s,i)=>s+i.tutar,0);
  const gider = buAy.filter(i=>i.tur==="gider").reduce((s,i)=>s+i.tutar,0);
  $("#statGelir").textContent = TL(gelir);
  $("#statGider").textContent = TL(gider);

  $("#statLead").textContent = DB.leadler.length;
  const ig = DB.leadler.filter(l=>l.kaynak==="Instagram").length;
  $("#statLeadSub").textContent = `${ig} Instagram · ${DB.leadler.length-ig} Forms`;

  // grafik: son 6 ay (demo verisi + gerçek ay)
  const demoAylar = [[38000,21000],[42500,19500],[35000,23000],[47000,20500],[51500,24000]];
  const chart = $("#barChart"); chart.innerHTML = "";
  const max = 55000;
  const seri = [...demoAylar, [Math.max(gelir,8000), Math.max(gider,6000)]];
  seri.forEach((d,i)=>{
    const mi = (ay - 5 + i + 12) % 12;
    chart.insertAdjacentHTML("beforeend", `
      <div class="bar-group">
        <div class="bars">
          <div class="bar pos" style="height:${d[0]/max*100}%"></div>
          <div class="bar neg" style="height:${d[1]/max*100}%"></div>
        </div>
        <span class="bar-label">${AYLAR[mi]}</span>
      </div>`);
  });

  const yaklasan = DB.randevular.filter(r=>r.durum==="bekliyor" && r.tarih>=bugunStr)
    .sort((a,b)=>(a.tarih+a.saat).localeCompare(b.tarih+b.saat)).slice(0,5);
  $("#dashRandevular").innerHTML = yaklasan.map(r=>`
    <li><div><div class="t">${musteriAd(r.musteriId)}</div><div class="s">${r.hizmet}</div></div>
    <div class="s">${trTarih(r.tarih)} · ${r.saat}</div></li>`).join("") || "<li class='s'>Yaklaşan randevu yok.</li>";

  $("#dashLeadler").innerHTML = DB.leadler.slice(0,4).map(l=>`
    <li><div><div class="t">${l.ad}</div><div class="s">${l.mesaj}</div></div>
    <span class="src ${srcClass(l.kaynak)}">${l.kaynak}</span></li>`).join("");
}

let randevuFiltre = "hepsi";
function renderRandevular(){
  const rows = DB.randevular
    .filter(r => randevuFiltre==="hepsi" || r.durum===randevuFiltre)
    .sort((a,b)=>(b.tarih+b.saat).localeCompare(a.tarih+a.saat));
  $("#randevuTable").innerHTML = rows.map(r=>`
    <tr>
      <td>${trTarih(r.tarih)}</td><td>${r.saat}</td>
      <td><strong>${musteriAd(r.musteriId)}</strong></td>
      <td>${r.hizmet}</td>
      <td><span class="badge ${r.durum}">${{bekliyor:"Bekliyor",tamamlandi:"Tamamlandı",iptal:"İptal"}[r.durum]}</span></td>
      <td class="ta-r">${r.durum==="bekliyor" ? `
        <button class="row-btn" onclick="durum(${r.id},'tamamlandi')">Tamamla</button>
        <button class="row-btn danger" onclick="durum(${r.id},'iptal')">İptal</button>` : ""}
      </td>
    </tr>`).join("") || `<tr><td colspan="6" class="muted">Kayıt yok.</td></tr>`;
}
window.durum = (id, d) => { const r = DB.randevular.find(r=>r.id===id); if(r){ r.durum=d; save(); renderRandevular(); toast(d==="tamamlandi"?"Randevu tamamlandı ✓":"Randevu iptal edildi"); } };

let cariFiltre = "hepsi";
function renderCari(){
  const gelir = DB.islemler.filter(i=>i.tur==="gelir").reduce((s,i)=>s+i.tutar,0);
  const gider = DB.islemler.filter(i=>i.tur==="gider").reduce((s,i)=>s+i.tutar,0);
  $("#cariSummary").innerHTML = `
    <div class="stat-grid" style="margin-bottom:16px">
      <div class="stat-card"><span class="stat-label">Toplam Gelir</span><span class="stat-value pos">${TL(gelir)}</span></div>
      <div class="stat-card"><span class="stat-label">Toplam Gider</span><span class="stat-value neg">${TL(gider)}</span></div>
      <div class="stat-card"><span class="stat-label">Net</span><span class="stat-value">${TL(gelir-gider)}</span></div>
      <div class="stat-card"><span class="stat-label">İşlem Sayısı</span><span class="stat-value">${DB.islemler.length}</span></div>
    </div>`;
  const rows = DB.islemler
    .filter(i => cariFiltre==="hepsi" || i.tur===cariFiltre)
    .sort((a,b)=>b.tarih.localeCompare(a.tarih));
  $("#cariTable").innerHTML = rows.map(i=>`
    <tr>
      <td>${trTarih(i.tarih)}</td>
      <td><strong>${i.aciklama}</strong></td>
      <td><span class="src">${i.kategori}</span></td>
      <td class="ta-r"><span class="amount ${i.tur==="gelir"?"pos":"neg"}">${i.tur==="gelir"?"+":"−"}${TL(i.tutar)}</span></td>
      <td class="ta-r"><button class="row-btn danger" onclick="silIslem(${i.id})">Sil</button></td>
    </tr>`).join("") || `<tr><td colspan="5" class="muted">Kayıt yok.</td></tr>`;
}
window.silIslem = id => { DB.islemler = DB.islemler.filter(i=>i.id!==id); save(); renderCari(); toast("İşlem silindi"); };

const srcClass = k => k==="Instagram" ? "instagram" : k==="Google Forms" ? "forms" : "";
function renderMusteriler(){
  const q = ($("#musteriSearch").value || "").toLowerCase();
  const list = DB.musteriler.filter(m => m.ad.toLowerCase().includes(q) || m.tel.includes(q));
  $("#musteriGrid").innerHTML = list.map(m=>`
    <div class="cust-card">
      <div class="cust-top">
        <div class="avatar">${m.ad.split(" ").map(p=>p[0]).join("").slice(0,2)}</div>
        <div><div class="cust-name">${m.ad}</div><div class="cust-tel">${m.tel}</div></div>
      </div>
      <span class="src ${srcClass(m.kaynak)}">${m.kaynak}</span>
      <p class="cust-note">${m.not || ""}</p>
    </div>`).join("") || `<p class="muted">Sonuç bulunamadı.</p>`;
}

function renderLeadler(){
  $("#leadFeed").innerHTML = DB.leadler.map(l=>`
    <li class="lead-item ${l.fresh?"fresh":""}">
      <span class="src ${srcClass(l.kaynak)}">${l.kaynak}</span>
      <div class="lead-body">
        <div class="lead-name">${l.ad}</div>
        <div class="lead-msg">${l.mesaj}</div>
      </div>
      <span class="lead-time">${l.zaman}</span>
      <button class="btn btn-sm btn-primary" onclick="leadDonustur(${l.id})">Müşteriye dönüştür</button>
    </li>`).join("");
}
window.leadDonustur = id => {
  const l = DB.leadler.find(x=>x.id===id); if(!l) return;
  DB.musteriler.unshift({id:yeniId(), ad:l.ad, tel:"—", kaynak:l.kaynak, not:l.mesaj});
  DB.leadler = DB.leadler.filter(x=>x.id!==id);
  save(); renderLeadler(); toast(`${l.ad} müşteri listesine eklendi ✓`);
};

// ---------- canlı lead simülasyonu ----------
const SIM_LEADS = [
  {ad:"Gizem Polat", kaynak:"Instagram",    mesaj:"Story'nizi gördüm, randevu almak istiyorum 🙌"},
  {ad:"Tolga Erden", kaynak:"Google Forms", mesaj:"İletişim formunu doldurdum, bilgi rica ederim."},
  {ad:"Nazlı Güneş", kaynak:"Instagram",    mesaj:"Fiyatlar hakkında DM atabilir misiniz?"},
  {ad:"Kerem Uslu",  kaynak:"Google Forms", mesaj:"Kurumsal işbirliği için görüşmek isteriz."},
];
let simIndex = 0;
function simuleLead(){
  if (simIndex >= SIM_LEADS.length) return;
  const s = SIM_LEADS[simIndex++];
  DB.leadler.forEach(l => l.fresh = false);
  DB.leadler.unshift({id:yeniId(), ...s, zaman:"az önce", fresh:true});
  save();
  $("#leadDot").classList.add("on");
  toast(`<span class="src ${srcClass(s.kaynak)}">${s.kaynak}</span> Yeni lead: <strong>${s.ad}</strong>`);
  const aktif = (location.hash||"#dashboard").slice(1);
  render(aktif);
}
setTimeout(simuleLead, 12000);
setInterval(simuleLead, 45000);

// ---------- modal ----------
let acikModal = null;
function modalAc(id){
  acikModal = $("#"+id);
  $("#backdrop").hidden = false;
  acikModal.hidden = false;
  if (id === "modalRandevu"){
    $("#rMusteri").innerHTML = DB.musteriler.map(m=>`<option value="${m.id}">${m.ad}</option>`).join("");
    $("#rTarih").value = iso(bugun);
  }
}
function modalKapat(){
  if (acikModal) acikModal.hidden = true;
  $("#backdrop").hidden = true;
  acikModal = null;
}
$$("[data-open]").forEach(b => b.addEventListener("click", ()=>modalAc(b.dataset.open)));
$$("[data-close]").forEach(b => b.addEventListener("click", modalKapat));
$("#backdrop").addEventListener("click", modalKapat);
document.addEventListener("keydown", e => { if(e.key==="Escape") modalKapat(); });

$("#quickAddBtn").addEventListener("click", ()=>{
  const v = (location.hash||"#dashboard").slice(1);
  modalAc(v==="cari" ? "modalCari" : v==="musteriler" ? "modalMusteri" : "modalRandevu");
});

$("#rKaydet").addEventListener("click", ()=>{
  const hizmet = $("#rHizmet").value.trim();
  if(!$("#rTarih").value || !hizmet) return toast("Tarih ve hizmet alanlarını doldurun");
  DB.randevular.push({id:yeniId(), musteriId:+$("#rMusteri").value, tarih:$("#rTarih").value, saat:$("#rSaat").value, hizmet, durum:"bekliyor"});
  save(); modalKapat(); $("#rHizmet").value="";
  location.hash="#randevular"; renderRandevular(); toast("Randevu oluşturuldu ✓");
});

$("#cKaydet").addEventListener("click", ()=>{
  const tutar = +$("#cTutar").value, aciklama = $("#cAciklama").value.trim();
  if(!tutar || !aciklama) return toast("Açıklama ve tutar girin");
  DB.islemler.push({id:yeniId(), tur:$("#cTur").value, tarih:iso(bugun), aciklama, kategori:$("#cKategori").value.trim()||"Genel", tutar});
  save(); modalKapat(); $("#cAciklama").value=""; $("#cTutar").value=""; $("#cKategori").value="";
  location.hash="#cari"; renderCari(); toast("İşlem kaydedildi ✓");
});

$("#mKaydet").addEventListener("click", ()=>{
  const ad = $("#mAd").value.trim();
  if(!ad) return toast("Ad soyad girin");
  DB.musteriler.unshift({id:yeniId(), ad, tel:$("#mTel").value.trim()||"—", kaynak:$("#mKaynak").value, not:$("#mNot").value.trim()});
  save(); modalKapat(); $("#mAd").value=""; $("#mTel").value=""; $("#mNot").value="";
  location.hash="#musteriler"; renderMusteriler(); toast("Müşteri eklendi ✓");
});

// ---------- filtreler / arama / toast ----------
$("#randevuFilters").addEventListener("click", e=>{
  if(!e.target.dataset.f) return;
  randevuFiltre = e.target.dataset.f;
  $$("#randevuFilters .chip").forEach(c=>c.classList.toggle("active", c===e.target));
  renderRandevular();
});
$("#cariFilters").addEventListener("click", e=>{
  if(!e.target.dataset.f) return;
  cariFiltre = e.target.dataset.f;
  $$("#cariFilters .chip").forEach(c=>c.classList.toggle("active", c===e.target));
  renderCari();
});
$("#musteriSearch").addEventListener("input", renderMusteriler);

let toastTimer;
function toast(html){
  const t = $("#toast");
  t.innerHTML = html; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.hidden = true, 3200);
}

// ---------- başlat ----------
$("#todayLabel").textContent = bugun.toLocaleDateString("tr-TR", {weekday:"long", day:"numeric", month:"long", year:"numeric"});
route();
