// Global bir flag (bayrak) değişkeni ile hangi content öğesinin basılı tutulduğunu takip ederiz
let longPressTriggered = false;
let longPressTimer;
const namecontent = document.getElementById('name-content');
const urlcontent = document.getElementById('url-content');
const imgcontent = document.getElementById('img-content');
const addsavecontent = document.getElementById('add-save-content');

addsavecontent.addEventListener('click', function () {
  const name = namecontent.value || null; // İsim boşsa null olacak
  const url = urlcontent.value || null;   // URL boşsa null olacak
  const imageFile = imgcontent.files[0]; // Resim dosyasını al
  const imagePath = imageFile ? URL.createObjectURL(imageFile) : null;

  // Console'a veriyi yazdırma
  console.log(`İsim: ${name}`);
  console.log(`URL: ${url}`);
  console.log(`Resim: ${imagePath}`);

  // Girişleri sıfırlama
  namecontent.value = '';
  urlcontent.value = '';
  imgcontent.value = '';
});
// ".content" öğelerine basılı tutma olayını dinleriz

document.querySelectorAll('.content').forEach(function (contentElement) {
  contentElement.addEventListener('mousedown', function () {
    console.log("tıklandı süre başlıyor");

    // Eğer uzun basma daha önce tetiklenmediyse (ilk kez basılma)
    if (!longPressTriggered) {
      // 5 saniye boyunca basılı tutulmasını bekleyecek bir zamanlayıcı başlatılır
      longPressTimer = setTimeout(() => {
        console.log("başladı animasyon");

        // Tüm content öğelerine aynı anda animasyonu uygula
        document.querySelectorAll('.content').forEach(function (el) {
          el.classList.add('move-left-right');
        });

        // Submit butonunu görünür yap
        document.querySelectorAll('.submit-content').forEach(function (submitBtn) {
          submitBtn.style.display = 'block';
        });

        // longPressTriggered bayrağını true yaparak animasyonun sadece bir kere tetiklenmesini sağlarız
        longPressTriggered = true;
      }, 5000); // 5000 ms = 5 saniye
    }
  });

  // ".content" öğesinden basma işlemi bırakıldığında (mouseup)
  contentElement.addEventListener('mouseup', function () {
    // Zamanlayıcıyı temizle (uzun basma işlemi iptal edilirse)
    clearTimeout(longPressTimer);
  });

  // Eğer mouse dışarıya çıkarsa da zamanlayıcıyı temizle
  contentElement.addEventListener('mouseleave', function () {
    // Zamanlayıcıyı temizle (uzun basma işlemi iptal edilirse)
    clearTimeout(longPressTimer);
  });
});

// ".submit-content" öğesine tıklanıldığında animasyonu durdurma
document.querySelectorAll('.submit-content').forEach(function (submitButton) {
  submitButton.addEventListener('click', function () {
    // "content" sınıfına sahip tüm öğeleri seçer (content div'leri)
    const contentDivs = document.querySelectorAll('.content');

    // Her bir content div'inden "move-left-right" sınıfını kaldırarak sallanma animasyonunu durdurur
    contentDivs.forEach(div => {
      div.classList.remove('move-left-right'); // div'e uygulanan animasyonu kaldırır
    });

    // Submit butonunu gizle
    this.style.display = 'none';
  });
});
