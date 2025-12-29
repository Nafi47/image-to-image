// Buton etkileşimleri
document.addEventListener('DOMContentLoaded', function() {
    
    // Upload Image butonu
    const uploadBtn = document.querySelector('.btn-upload');
    uploadBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async function(e) {
            const file = e.target.files[0];
            if (file) {
                // Önce önizleme göster
                const reader = new FileReader();
                reader.onload = async function(event) {
                    const base64Image = event.target.result;
                    
                    // Önizlemeyi göster
                    const secondCard = document.querySelector('.card-2');
                    secondCard.innerHTML = `<img src="${base64Image}" style="width: 100%; height: 100%; object-fit: cover;">`;
                    
                    // API'ye gönder
                    await sendImageToAPI(base64Image);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });

    // Kart hover animasyonları
    const cards = document.querySelectorAll('.image-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Sayfa yüklenme animasyonu
    const leftSection = document.querySelector('.left-section');
    const rightSection = document.querySelector('.right-section');
    
    setTimeout(() => {
        leftSection.style.opacity = '1';
        leftSection.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        rightSection.style.opacity = '1';
        rightSection.style.transform = 'translateX(0)';
    }, 300);
});

// API'ye görsel gönderme fonksiyonu
async function sendImageToAPI(base64Image) {
    try {
        // Yükleniyor mesajı
        const secondCard = document.querySelector('.card-2');
        const loadingHTML = secondCard.innerHTML;
        secondCard.innerHTML += '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); color: white; padding: 20px; border-radius: 10px;">İşleniyor...</div>';
        
        const payload = {
            init_image: [
                base64Image,
                "https://www.medya90.com/resimler/2024-4/1/104223519896903.webp"
            ],
            prompt: "A full-length formal photograph, based on the scene in image_5.png, showing Turkish President Recep Tayyip Erdoğan standing on the left, wearing his dark suit and red tie as depicted. To his right, add the person from the second input image (e.g., Vladimir Putin from image_4.png) standing alongside him. The added person should be scaled correctly and pose naturally, wearing their own suit and tie from their respective image. Crucially, the lighting, shadows, and overall professional photo studio atmosphere from image_5.png must be perfectly replicated on the added person, ensuring they look naturally integrated into the scene. The background remains the grey wall with the large Turkish flag on the left and the gold Presidential Seal (Cumhurbaşkanlığı forsu) on the right, exactly as seen in image_5.png..",
            model_id: "seedream-4.5-i2i",
            "aspect-ratio": "1:1",
            key: "HtOpTiM6BxG5U7YrZjRRqnLbPNh8bHD9mfBGqhxo4cVwi8tMn0OG5TosUTeJ"
        };
        
        // API endpoint'inizi buraya yazın
        const response = await fetch('https://modelslab.com/api/v7/images/image-to-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        console.log('Full result object:', JSON.stringify(result, null, 2));
        
        // Önce proxy_links kullan, yoksa output kullan
        let imageUrl = null;
        
        if (result.proxy_links && result.proxy_links.length > 0) {
            imageUrl = result.proxy_links[0];
        } else if (result.output && Array.isArray(result.output)) {
            imageUrl = result.output[0];
        } else if (result.output) {
            imageUrl = result.output;
        } else if (result.image_url) {
            imageUrl = result.image_url;
        }
        
        console.log('Image URL:', imageUrl);
        
        if (imageUrl) {
            // Küçük önizlemeyi göster
            secondCard.innerHTML = `<img src="${imageUrl}" alt="Generated" style="width: 100%; height: 100%; object-fit: cover;">`;
            
            // Popup ile büyük görseli göster
            showImagePopup(imageUrl);
        } else {
            console.error('Tam API yanıtı:', result);
            throw new Error('API yanıtında görsel bulunamadı. Konsolu kontrol edin.');
        }
        
    } catch (error) {
        console.error('API Error:', error);
        alert('Görsel işlenirken bir hata oluştu: ' + error.message + '\n\nKonsolu (F12) kontrol edin.');
        // Yükleme mesajını kaldır
        const secondCard = document.querySelector('.card-2');
        secondCard.innerHTML = '<div class="placeholder">Hata oluştu</div>';
    }
}

// Popup ile görseli göster
function showImagePopup(imageUrl) {
    // Modal oluştur
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Modal içeriği
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: #1a2520;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    // Görsel
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.cssText = `
        max-width: 800px;
        max-height: 600px;
        width: 100%;
        height: auto;
        border-radius: 10px;
        display: block;
    `;
    
    // Buton container
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = `
        display: flex;
        gap: 15px;
        margin-top: 20px;
        justify-content: center;
    `;
    
    // İndirme butonu
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'İndir';
    downloadBtn.style.cssText = `
        background: #c4ff00;
        color: #0a0f0d;
        border: none;
        padding: 12px 30px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    downloadBtn.onmouseover = () => downloadBtn.style.background = '#d4ff20';
    downloadBtn.onmouseout = () => downloadBtn.style.background = '#c4ff00';
    downloadBtn.onclick = () => downloadImage(imageUrl);
    
    // Kapat butonu
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Kapat';
    closeBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 12px 30px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    closeBtn.onclick = () => modal.remove();
    
    // X butonu (sağ üst)
    const xBtn = document.createElement('button');
    xBtn.innerHTML = '×';
    xBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        font-size: 30px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    xBtn.onmouseover = () => xBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    xBtn.onmouseout = () => xBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    xBtn.onclick = () => modal.remove();
    
    // Elemanları birleştir
    btnContainer.appendChild(downloadBtn);
    btnContainer.appendChild(closeBtn);
    modalContent.appendChild(xBtn);
    modalContent.appendChild(img);
    modalContent.appendChild(btnContainer);
    modal.appendChild(modalContent);
    
    // Modal'ı sayfaya ekle
    document.body.appendChild(modal);
    
    // Backdrop'a tıklanınca kapat
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
    
    // ESC tuşu ile kapat
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Görseli indir
async function downloadImage(imageUrl) {
    try {
        // CORS sorunlarını aşmak için fetch ile blob olarak indir
        const response = await fetch(imageUrl, {
            mode: 'cors',
            cache: 'no-cache'
        });
        
        if (!response.ok) {
            throw new Error('İndirme başarısız');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `ai-generated-image-${Date.now()}.png`;
        
        // DOM'a ekle, tıkla ve kaldır
        document.body.appendChild(a);
        a.click();
        
        // Temizlik
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
        
        // Kullanıcıya geri bildirim
        alert('Görsel başarıyla indirildi!');
        
    } catch (error) {
        console.error('İndirme hatası:', error);
        
        // Fallback 1: Doğrudan link ile dene
        try {
            const a = document.createElement('a');
            a.href = imageUrl;
            a.download = `ai-generated-image-${Date.now()}.png`;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (fallbackError) {
            // Fallback 2: Yeni sekmede aç
            window.open(imageUrl, '_blank');
            alert('Otomatik indirme başarısız oldu. Görsele sağ tıklayıp "Resmi farklı kaydet" seçeneğini kullanabilirsiniz.');
        }
    }
}

// Başlangıç animasyonları için CSS
document.querySelector('.left-section').style.cssText = `
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s ease;
`;

document.querySelector('.right-section').style.cssText = `
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s ease;
`;
