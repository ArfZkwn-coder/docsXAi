---
title: "Cara Setup Chatbot AI di Wabot"
description: "Panduan langkah demi langkah menyediakan chatbot AI di Wabot untuk WhatsApp: system prompt, model, knowledge base, pindah ke staf, tools, ujian di Playground dan go-live."
sidebar_position: 5
---

# Cara Setup Chatbot AI di Wabot

Chatbot AI Wabot boleh menjawab pelanggan di WhatsApp anda 24 jam: menjawab soalan produk, memberi harga, mengambil tempahan dan memindahkan perbualan kepada staf bila perlu. Tutorial ini membawa anda dari chatbot kosong sehingga chatbot yang diuji dan sedia digunakan.

Contoh dalam tutorial ini ialah **Kedai Contoh**, sebuah kedai online fiksyen yang menjual tumbler. Gantikan butirannya dengan perniagaan anda sendiri.

**Masa:** kira-kira 45 minit  
**Tahap:** mudah hingga sederhana

Pada akhir tutorial ini anda akan ada:

1. System prompt yang jelas untuk chatbot anda
2. Model dan tetapan jawapan yang sesuai
3. Knowledge base yang dibaca chatbot sebelum menjawab
4. Peraturan untuk memindahkan pelanggan kepada staf
5. Chatbot yang sudah diuji dan dihidupkan

## Sebelum mula

Pastikan anda ada:

- Akaun Wabot dengan satu nombor WhatsApp yang sudah tersambung. Nombor ini dipanggil **instance** dalam Wabot, dan boleh jenis tidak rasmi atau Official API.
- Pelan yang membenarkan Chatbot AI, dan baki AI credit yang mencukupi.
- Maklumat perniagaan yang lengkap: senarai produk, harga, polisi (pos, pemulangan, bayaran), waktu operasi dan soalan lazim.

:::note
Setiap jawapan chatbot AI menggunakan AI credit pada model Wabot-managed. Model premium dan prompt yang sangat panjang menggunakan lebih banyak credit bagi setiap jawapan. Jika anda menggunakan kunci AI sendiri (BYOK), kos dikira pada kunci itu.
:::

## Gambaran proses

Chatbot AI Wabot membina jawapan daripada beberapa lapisan. Fahami ini dahulu supaya anda tahu di mana hendak membetulkan masalah kemudian.

| Lapisan | Fungsi |
| --- | --- |
| System prompt | Peranan, gaya bahasa dan peraturan chatbot |
| Model dan tetapan | Otak AI, kreativiti jawapan dan panjang ingatan perbualan |
| Knowledge | Dokumen atau halaman web yang dirujuk chatbot |
| Tools | Tindakan seperti baca Google Sheet, tempah kalendar atau hantar lead kepada staf |
| Pindah ke staf | Bila chatbot berhenti dan staf manusia mengambil alih |

## Langkah 1: Kumpulkan maklumat perniagaan

Chatbot hanya sebaik maklumat yang anda beri. Sebelum menulis apa-apa, sediakan nota ringkas yang menjawab:

- Apa yang anda jual, dan siapa pelanggan anda?
- Apa harga, pakej atau variasi utama?
- Bagaimana pelanggan membuat tempahan dan membayar?
- Apa polisi pos, pemulangan dan waranti?
- Bila waktu operasi staf?
- Apa soalan yang paling kerap ditanya pelanggan?

:::tip
Buka sembang WhatsApp lama anda dan salin 10 soalan pelanggan yang paling kerap. Soalan sebenar lebih berguna daripada soalan yang anda agak.
:::

## Langkah 2: Tetapkan mod AI dan tulis system prompt

1. Buka chatbot untuk nombor WhatsApp anda di dashboard Wabot.
2. Tetapkan **Chatbot Mode** kepada **AI**. Pilihan lain ialah Keyword, iaitu chatbot yang menjawab berdasarkan kata kunci tetap.
3. Isi **system prompt** (persona dan peraturan chatbot).

### Struktur prompt yang disyorkan

Bahagikan prompt kepada seksyen pendek dengan tajuk yang jelas:

1. **Peranan**: siapa chatbot dan apa tugasnya
2. **Gaya bahasa**: formal atau santai, panjang jawapan, penggunaan emoji
3. **Maklumat perniagaan**: produk, harga, polisi, waktu operasi
4. **Aliran perbualan**: langkah dari sapaan hingga tempahan
5. **Peraturan**: apa yang tidak boleh dibuat dan bila perlu pindah kepada staf

### Contoh prompt

```text
# Peranan
Kamu ialah Aina, pembantu jualan Kedai Contoh yang menjual tumbler
stainless steel. Tugas kamu ialah menjawab soalan pelanggan di WhatsApp,
mencadangkan produk dan membantu pelanggan membuat tempahan.

# Gaya bahasa
- Guna Bahasa Melayu santai tetapi sopan. Balas dalam bahasa pelanggan.
- Jawapan pendek: maksimum 3 ayat setiap mesej.
- Emoji secara sederhana, maksimum satu setiap mesej.
- Tanya satu soalan sahaja pada satu masa.

# Maklumat kedai (contoh)
- Produk: Tumbler 500ml (RM39), Tumbler 750ml (RM49), Set Hadiah (RM89)
- Pos: RM8 Semenanjung, RM12 Sabah dan Sarawak. Percuma untuk pembelian RM100 ke atas.
- Hantar dalam 2 hingga 3 hari bekerja selepas bayaran diterima.
- Pemulangan: dalam 7 hari jika produk rosak.
- Waktu staf: Isnin hingga Jumaat, 9 pagi hingga 6 petang.

# Aliran tempahan
1. Sapa pelanggan dan tanya apa yang mereka cari.
2. Cadangkan produk yang sesuai.
3. Bila pelanggan setuju, minta nama, alamat dan nombor telefon.
4. Rumuskan tempahan dan jumlah, kemudian beritahu staf akan sahkan bayaran.

# Peraturan
- Jawab berdasarkan maklumat di atas dan knowledge sahaja. Jika tidak pasti,
  katakan "Saya semak dengan staf dulu ya" dan jangan reka jawapan.
- Jangan janji diskaun atau harga yang tiada dalam maklumat.
- Jangan minta kata laluan atau nombor kad bank.
```

:::caution
Jangan letak kata laluan, kunci API atau token dalam system prompt. Prompt yang mengandungi teks seperti rahsia boleh disekat atau disembunyikan daripada paparan.
:::

### Pilihan: tingkatkan prompt secara automatik

Wabot ada ciri **prompt enhancement** dengan beberapa jenis:

- **Simplify Prompt**: memendekkan prompt yang terlalu panjang
- **Format & Structure**: menyusun prompt dengan tajuk dan senarai
- **Generate Sections**: menjana seksyen yang masih kurang
- **Custom Improvement**: anda tulis sendiri apa yang hendak diperbaiki

Semak hasilnya sebelum menyimpan, sebab AI boleh mengubah peraturan yang anda tulis dengan teliti.

## Langkah 3: Pilih model dan tetapan jawapan

Tetapan utama yang perlu anda semak:

| Tetapan | Cadangan permulaan | Penjelasan |
| --- | --- | --- |
| Model | Model sederhana | Model premium lebih bijak tetapi menggunakan lebih banyak credit bagi setiap jawapan |
| Temperature | 0.3 hingga 0.5 | Lebih rendah memberi jawapan lebih konsisten. Lebih tinggi memberi jawapan lebih kreatif. Julat 0 hingga 2 |
| History length | 20 hingga 50 | Bilangan mesej terdahulu yang diingati dalam satu perbualan. Wabot-managed AI menyimpan maksimum 50 |
| Thinking Level | Auto | Light, Balanced atau Deep untuk model yang menyokongnya. Deep mungkin membalas lebih perlahan |
| Reply format | Smart Reply atau Formatted V3 | Smart Reply hanya untuk akaun Official API. Pilihan lain ialah Multi Message dan Raw |
| Default reply | Ayat sopan | Dihantar bila chatbot gagal menjana jawapan |
| Kata kunci reset | contoh: reset | Kata kunci yang membersihkan sejarah perbualan |

:::tip
Mulakan dengan model sederhana. Naik ke model yang lebih besar hanya jika anda dapati jawapan masih lemah selepas prompt dan knowledge diperbaiki.
:::

### Contoh default reply

```text
Maaf, boleh ulang soalan tu? Saya boleh bantu untuk info produk,
harga atau tempahan. 😊
```

### Reply Steering (pilihan)

Pelanggan sering menghantar beberapa mesej pendek berturut-turut. **Reply Steering** membuat chatbot menunggu seketika (1 hingga 30 saat) untuk mesej lewat sebelum membalas, supaya jawapan tidak terputus-putus. Ciri ini mungkin menggunakan AI credit.

## Langkah 4: Tambah knowledge

**AI Knowledge** (RAG) membolehkan chatbot mencari jawapan daripada dokumen anda sebelum menjawab. Ini lebih baik daripada memasukkan semua maklumat ke dalam prompt, kerana prompt kekal pendek.

1. Buka bahagian Knowledge untuk chatbot anda.
2. Tambah sumber. Anda boleh menambah halaman web melalui URL, dan fail seperti PDF melalui muat naik di dashboard.
3. Tunggu status sumber menjadi **completed**. Chatbot hanya boleh merujuk sumber yang selesai diindeks.
4. Pastikan **AI Knowledge** dihidupkan untuk chatbot.

Apa yang sesuai dijadikan knowledge:

- Katalog produk dan senarai harga
- Soalan lazim (FAQ)
- Polisi pos, pemulangan dan waranti
- Panduan penggunaan produk

:::note
Menghidupkan AI Knowledge dan mengindeks dokumen boleh menggunakan AI credit. Matikan sumber yang tidak lagi relevan supaya jawapan tidak bercampur dengan maklumat lama.
:::

:::tip
Tulis dokumen knowledge dalam bentuk soalan dan jawapan yang pendek. Contohnya, "Berapa lama masa penghantaran?" diikuti jawapan satu dua ayat. Ini memudahkan chatbot mencari jawapan yang tepat.
:::

## Langkah 5: Tetapkan peraturan pindah ke staf

Chatbot tidak patut menyelesaikan semua perkara. Tetapkan bila ia mesti menyerahkan perbualan kepada manusia.

1. Masukkan nombor WhatsApp staf dalam senarai **human agent**.
2. Tulis **Human Agent Transfer conditions**, iaitu satu syarat pendek bagi setiap baris. Setiap syarat maksimum 160 aksara dan tidak mengandungi koma atau pemisah baris.
3. Tetapkan sama ada chatbot dimatikan sementara selepas pindah (**disable chatbot on transfer**) dan berapa lama.

Contoh syarat yang baik:

- Pelanggan meminta bercakap dengan staf
- Pelanggan membuat aduan atau mahu tuntutan pemulangan
- Pelanggan mahu membuat tempahan pukal
- Pelanggan marah atau tidak berpuas hati

Contoh syarat yang kurang baik:

- "Pelanggan tanya tentang pemulangan, semak polisi, kemudian minta bukti" (terlalu panjang dan menggabungkan beberapa syarat. Pecahkan kepada syarat berasingan)

Anda juga boleh menghantar notifikasi pindahan ke Telegram jika staf lebih mudah dihubungi di sana.

## Langkah 6: Tambah tools (pilihan)

**Tools** membolehkan chatbot melakukan tindakan sebenar, bukan sekadar berbual. Jenis tool yang ada:

| Jenis tool | Contoh kegunaan |
| --- | --- |
| Sheet | Baca stok atau senarai harga, dan simpan tempahan ke Google Sheet |
| Calendar | Semak slot kosong dan buat atau batal temujanji di Google Calendar |
| Website | Baca maklumat terkini daripada satu halaman web |
| Leads Forwarder | Hantar lead yang layak kepada staf melalui WhatsApp atau Telegram |
| Assign and Notify | Tugaskan perbualan kepada ahli pasukan dan maklumkan mereka |
| Update Custom Field | Simpan maklumat pelanggan ke medan tersuai |
| Contact Group Rules | Masukkan pelanggan ke kumpulan atau label secara automatik |
| WooCommerce Order | Cipta tempahan dalam kedai WooCommerce anda |
| Custom | Panggil API anda sendiri melalui HTTP |

Untuk Kedai Contoh, satu tool **Sheet** yang menyimpan tempahan sudah mencukupi untuk bermula:

1. Sambungkan akaun Google anda.
2. Pilih Google Sheet dan tab yang betul.
3. Petakan lajur, contohnya Nama, Nombor, Produk dan Alamat.
4. Beri tool nama dan penerangan yang jelas, supaya AI tahu bila hendak menggunakannya.

:::caution
Tool yang menulis data (seperti tempah kalendar atau simpan ke Sheet) bertindak pada data sebenar bila chatbot sudah live. Uji dahulu dengan data contoh.
:::

## Langkah 7: Ciri tambahan (pilihan)

Hidupkan hanya yang anda perlukan, kerana sesetengahnya menggunakan AI credit:

- **AI Memory**: chatbot mengingati maklumat berguna tentang pelanggan, seperti nama, pilihan dan bajet, merentasi perbualan. Anda boleh menetapkan apa yang diingati dan apa yang diabaikan, dan data sensitif seperti kata laluan atau nombor kad patut diabaikan.
- **Image recognition**: chatbot boleh membaca gambar yang dihantar pelanggan, contohnya resit atau gambar produk.
- **Audio transcription**: chatbot memahami mesej suara.
- **Text-to-speech**: chatbot membalas dengan suara melalui ElevenLabs.
- **Lead Scoring**: memberi skor kepada pelanggan (cold, warm, hot) berdasarkan perbualan. Enjin Smart Scoring percuma sehingga had harian pasukan, manakala enjin AI model menggunakan credit pada setiap pemarkahan.

## Langkah 8: Uji di Playground

Jangan terus hidupkan chatbot. Uji dahulu di **Playground** dalam dashboard.

1. Hantar mesej seperti pelanggan sebenar.
2. Uji sekurang-kurangnya senario ini:
   - Soalan harga dan produk
   - Soalan yang tiada dalam maklumat anda (chatbot patut mengaku tidak pasti)
   - Aliran tempahan penuh sehingga rumusan
   - Pelanggan marah atau meminta staf (patut dipindahkan)
   - Soalan di luar topik
   - Mesej dalam bahasa Inggeris
3. Simpan perbualan ujian. Playground menyimpan sejarah ujian yang boleh anda muat semula daripada **Load History**.

:::note
Ujian di Playground tetap memanggil model AI dan menggunakan credit. Jangan jalankan ujian berulang-ulang tanpa perlu.
:::

Dalam mod ujian **dry run**, tool yang hanya membaca (seperti baca Google Sheet atau senarai kalendar) berjalan sebenar, tetapi tindakan yang menukar data (hantar mesej, tulis ke Sheet, buat atau padam acara kalendar) hanya disimulasikan. Mod **live** boleh melakukan tindakan sebenar, termasuk menghantar mesej kepada staf, jadi gunakan hanya bila anda mahu ujian penuh.

## Langkah 9: Simpan versi dan go-live

1. Cipta **versi** konfigurasi sebelum anda menghidupkan chatbot, contohnya "v1 sebelum live". Versi ialah snapshot konfigurasi yang boleh anda pulihkan jika perubahan kemudian merosakkan jawapan.
2. Pastikan **Chatbot Mode** ialah **AI**.
3. Tukar status **Running** kepada **Running** untuk menghidupkan chatbot.
4. Hantar mesej dari nombor lain ke nombor WhatsApp anda dan sahkan chatbot membalas.

:::caution
**Chatbot Mode** (AI atau Keyword) dan status **Running** (Running atau Stopped) ialah dua tetapan berbeza. Chatbot dalam mod AI tetapi berstatus Stopped tidak akan membalas pelanggan.
:::

## Selepas live: pantau dan baiki

- Semak perbualan sebenar setiap hari pada minggu pertama.
- Bila jawapan salah, tentukan puncanya dahulu: maklumat tiada dalam prompt atau knowledge, arahan prompt yang kabur, atau tetapan model.
- Buat satu perubahan pada satu masa, uji, kemudian simpan versi baharu.
- Gunakan kata kunci reset (contoh `reset`) bila menguji supaya sejarah lama tidak mengganggu.

## Penyelesaian masalah

| Masalah | Kemungkinan punca | Penyelesaian |
| --- | --- | --- |
| Chatbot tidak membalas langsung | Status Running ialah Stopped, atau mod bukan AI | Semak kedua-dua Chatbot Mode dan status Running |
| Chatbot membalas dengan jawapan default | Model gagal menjana jawapan atau mesej tidak dikenali | Semak prompt dan model, dan uji mesej yang sama di Playground |
| Jawapan salah atau direka | Maklumat tiada atau bercanggah | Tambah maklumat dalam knowledge, dan tambah peraturan "jangan reka jawapan" dalam prompt |
| Jawapan terlalu panjang | Gaya bahasa tidak ditetapkan | Tambah had ayat dalam bahagian Gaya bahasa |
| Kos AI credit tinggi | Prompt terlalu panjang atau model premium | Pendekkan prompt, pindahkan maklumat ke knowledge, dan gunakan model lebih kecil |
| Chatbot tidak memindahkan kepada staf | Syarat pindah terlalu kabur atau tiada nombor staf | Tulis syarat pendek dan jelas, dan semak senarai human agent |
| Jawapan masih guna maklumat lama | Sumber knowledge lama masih aktif | Matikan atau padam sumber lama |
| Tool tidak digunakan | Penerangan tool tidak jelas | Tulis penerangan yang menyatakan bila tool itu patut digunakan |

## Amalan terbaik

- Mulakan dengan prompt pendek dan jelas, kemudian tambah peraturan bila perlu.
- Letak maklumat yang kerap berubah (harga, stok) dalam knowledge atau Sheet, bukan dalam prompt.
- Sentiasa sediakan jalan keluar kepada staf manusia.
- Simpan versi sebelum setiap perubahan besar.
- Jangan simpan atau minta data sensitif seperti kata laluan atau nombor kad bank.

## Langkah seterusnya

- Tambah tool Calendar jika perniagaan anda menerima temujanji.
- Hidupkan Lead Scoring untuk mengenal pasti pelanggan yang paling bersedia membeli.
- Tulis semula prompt apabila anda menambah produk atau polisi baharu, dan uji semula di Playground sebelum live.
