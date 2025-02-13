# Restaurant Menu API

Bu API, restoran menü yönetimi için geliştirilmiş bir backend servisidir. Menü öğeleri, kategoriler, siparişler ve kullanıcı yönetimi gibi temel özellikleri içerir.

## 🚀 Başlangıç

### Gereksinimler
- Node.js
- MongoDB
- npm veya yarn


## 🔑 API Endpoints

### Kimlik Doğrulama (Auth)
| Method | Endpoint | Açıklama |
|--------|----------|-----------|
| POST | `/api/auth/signup` | Yeni kullanıcı kaydı |
| POST | `/api/auth/login` | Kullanıcı girişi |
| POST | `/api/auth/change-password` | Şifre değiştirme |

### Kategoriler
| Method | Endpoint | Açıklama |
|--------|----------|-----------|
| GET | `/api/categories` | Tüm kategorileri listele |
| POST | `/api/categories` | Yeni kategori oluştur |
| PUT | `/api/categories/:id` | Kategori güncelle |
| DELETE | `/api/categories/:id` | Kategori sil |

### Menü Öğeleri
| Method | Endpoint | Açıklama |
|--------|----------|-----------|
| GET | `/api/menu-items` | Tüm menü öğelerini listele |
| POST | `/api/menu-items` | Yeni menü öğesi oluştur |
| PUT | `/api/menu-items/:id` | Menü öğesi güncelle |
| DELETE | `/api/menu-items/:id` | Menü öğesi sil |

### Siparişler
| Method | Endpoint | Açıklama |
|--------|----------|-----------|
| GET | `/api/orders` | Tüm siparişleri listele |
| POST | `/api/orders` | Yeni sipariş oluştur |
| PUT | `/api/orders/:id` | Sipariş durumunu güncelle |


## 🔐 Güvenlik
- JWT tabanlı kimlik doğrulama
- Şifrelenmiş kullanıcı şifreleri (bcrypt)
- Protected routes için middleware kontrolü

## 🛠 Teknolojiler
- Express.js
- MongoDB & Mongoose
- JWT
- Bcrypt
- CORS
- Morgan (logging)
- Nodemon (development)

## 📝 Özellikler
- Kullanıcı bazlı menü ve kategori yönetimi
- Fiyat değişiklik geçmişi takibi
- Sipariş yönetimi ve durumu takibi
- Soft-delete özelliği
- Otomatik timestamp kaydı
