## Awal Permainan
Game MatiMurup Square dimainkan oleh 1 player. Awal permainan memunculkan halaman
Setup Permainan seperti tampak pada gambar 1 dibawah ini. Pemain diharuskan memasukkan
nama pemain serta tingkat kesulitan yang terdiri dari tiga yakni:

● Tingkat kesulitan Gampang. Pemain harus menghapalkan sekuens / urutan kotak yang
menyala sebanyak 5 buah.

● Tingkat kesulitan Sedang. Pemain harus menghapalkan sekuens / urutan kotak yang
menyala sebanyak 8 buah.

● Tingkat kesulitan Susah. Pemain harus menghapalkan sekuens / urutan kotak yang
menyala sebanyak 12 buah.

Selanjutnya pada halaman ini pemain dapat menekan tombol Mulai untuk memulai ronde
pertama.

## Gameplay
Game MatiMurup Square dimulai dari ronde pertama dengan pemain pertama yang mendapat
giliran duluan. Layar permainan menampilkan informasi pemain, perintah “Hapalkan Polanya”, dan
tingkat kesulitan di bagian bawah, serta 9 buah kotak (button) yang tersusun dalam bentuk grid
3x3.
![game matimurup react native](https://github.com/daviddprtma/Game-Mati-Murup-React-Native/assets/76859181/008573b0-570f-4a44-b700-69253e231c90)

Kemudian game akan menampilkan animasi kotak menyala - matisecara bergantian. Tugas
pemain adalah menghapalkan urutan kotak mana saja yang menyala.Urutan kotakmenyala
diacak dan jumlah rangkaiannya tergantung dari level yang dipilih oleh pemain di halaman setup
permainan. Sebagai contoh pada tingkat kesulitan gampang akan terdapat 5 buah kotak pada
sekuens yang dimunculkan.
Animasi untuk menampilkan sekuens kotak menyala dan mati dapat dibuat dengan
memperhatikan urutan proses berikut:
1. Matikan interaksi/listener untuk semua 9 kotak (button). Agar pemain tidak dapat
mengklik kotak manapun.
2. Random urutan kotak yang akan menyala (pemain tidak boleh tahu urutan ini). Sebagai
contoh pada tingkat kesulitan sedang, terdapat 8 kotak dengan hasil random sebagai
berikut: kotak 4 - 9 - 1 - 3 - 3 - 1 - 7 - 9
3. Kotak nomer 4 menyala selama 500 ms (millisecond). Gunakan warna cerah seperti
tampak pada gambar 2b.
4. Kotak nomer 4 Kembalikan ke warna default kotak.
5. Kembali ke nomer 3 dengan kotak berikutnya sesuai urutan di nomer 2. Jika sudah habis,
maka tampilan berubah seperti pada gambar 2c. Tampilkan perintah “Tekan Tombol Sesuai
Urutan”
6. Hidupkan interaksi/listener untuk semua 9 kotak (button), agar pemain mulai dapat
menekan kotak sesuai urutan dan menyelesaikan ronde ini.
7. Pemain menekan salah satu kotak untuk memulai input urutan. Dalam kasus ini pemain
harus menekan tombol sesuai urutan: kotak 5 - 9 - 1 - 3 - 3 - 1 - 7 - 9
8. Jika pemain salah menekan urutan kotak, maka permainan berakhir dan masuk ke
menu High Score.

High Score
Apabila nilai pemain lebih dari highscore yang tersimpan, maka masukkan nama pemain dan score nya ke
shared preference. Di halaman ini terdapat tombol untuk main kembali.
