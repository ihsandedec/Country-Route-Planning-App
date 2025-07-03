# Ülke Rota Uygulaması

Bu uygulama, iki veya daha fazla ülke kodu girerek bu ülkeler arasında harita üzerinde rota çizmenizi sağlar.

## Kurulum ve Çalıştırma

1. **Gereksinimler:**
   - Ruby 3.x
   - Rails 7.x
   - PostgreSQL veya SQLite (varsayılan)

2. **Bağımlılıkları yükleyin:**
   ```sh
   bundle install
   ```

3. **Veritabanını oluşturun ve seed verilerini yükleyin:**
   ```sh
   rails db:setup
   # veya ayrı ayrı:
   rails db:create
   rails db:migrate
   rails db:seed
   ```

4. **Sunucuyu başlatın:**
   ```sh
   rails server
   ```

5. **Uygulamayı açın:**
   Tarayıcınızda `http://localhost:3000` adresine gidin.

## Kullanım

- Ana sayfada, ülke kodlarını tire ile ayırarak girin (örn: `TR-BG-RS`).
- "Rota Göster" butonuna tıklayınca, harita üzerinde bu ülkeler arasında bir rota çizilir.
- Haritanın altında, kullanılabilir ülke kodları ve isimleri otomatik olarak listelenir.
- Ülke kodları ve isimleri, veritabanındaki Country tablosundan dinamik olarak alınır. Yeni ülke eklediğinizde otomatik olarak burada görünür.

## API

- `POST /api/routes` : Girilen ülke kodlarına göre rota verisi döner.
- `GET /api/routes/countries` : Tüm ülke kodu ve isimlerini JSON olarak döner.

## Notlar
- Google Maps API anahtarınızı `public/index.html` dosyasındaki ilgili yere eklemelisiniz.
- Frontend dosyaları doğrudan `public/` klasöründedir.
- Ülke kodları ve isimleri için manuel güncelleme gerekmez, seed veya admin panel ile ekleyebilirsiniz.

## Örnek Ülke Kodları
| Kod | Ülke        |
|-----|-------------|
| TR  | Türkiye     |
| BG  | Bulgaristan |
| RS  | Sırbistan   |
| HR  | Hırvatistan |
| SI  | Slovenya    |
| AT  | Avusturya   |
| DE  | Almanya     |

## Uygulamadan Görüntüler

- [Ana Sayfa](/app/assets/img/homepage1.png)
- [Ana Sayfa](/app/assets/img/homepage2.png)
