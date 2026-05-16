import { textbooks } from '../data/textbooks'
import { universities } from '../data/universities'

const BOOK_COUNT = textbooks.length
const CITATION_COUNT = textbooks.reduce((s, b) => s + (b.usedAt?.length || 0), 0)
const UNI_COUNT = universities.length

export default function About() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">📘 Yöntem ve Hakkında</h1>
        <p className="page-subtitle">
          Bu sayfa siteyi okuyanlara verinin nasıl toplandığını, neyin kanıtlandığını ve neyin
          kanıtlanmadığını açıkça anlatır.
        </p>
      </div>

      <div className="about-body">
        <section className="about-section">
          <h2>Motivasyon</h2>
          <p>
            Yapay zeka çağında bir kitabın değeri "sadece okumak" için evet azaldı — artık her şeyi
            zaten on saniyede özetleyen modeller var. Ama iyi bir ders kitabının kurduğu çatı, yani
            konuyu tecrübe ışığında damıtılmış bir hiyerarşi içinde sunması, bu çağda daha da
            kritik hale geldi. Çünkü modelden doğru cevap almak için önce doğru soruları sorabilen
            zihinsel bir çerçeve gerekli; bu çerçeveyi de klasik bir ders kitabından daha iyi veren
            bir araç henüz yok.
          </p>
        </section>

        <section className="about-section">
          <h2>Site ne anlatıyor?</h2>
          <p>
            Bu site, dünyanın ve Türkiye'nin önde gelen <strong>{UNI_COUNT}</strong> Bilgisayar
            Mühendisliği / Bilgisayar Bilimleri lisans programının <strong>açık kaynaklı ders programlarında</strong>{' '}
            ismen geçen <strong>{BOOK_COUNT}</strong> klasik ders kitabını listeler. Her kitap için
            o kitabın hangi üniversitenin hangi dersinin syllabus'unda <em>açıkça isim olarak</em>{' '}
            geçtiğine dair toplam <strong>{CITATION_COUNT}</strong> doğrulanmış kanıt linki vardır.
          </p>
          <p>
            Site, kitap önerisi listesi değildir; akademik bir kaynak da değildir. Amacı, "bu kitabı
            okumak değer mi?" sorusuna cevap ararken "hangi büyük programlar bu kitabı resmi olarak
            kullanıyor?" sorusunu kolay görünür kılmak.
          </p>
        </section>

        <section className="about-section">
          <h2>"Doğrulanmış kanıt" ne demek?</h2>
          <p>
            Bir üniversitenin bir kitabı "kullandığı" sayılması için yalnızca tek bir koşul vardır:
          </p>
          <blockquote>
            O bölümün <strong>kamuya açık</strong> bir ders programında (syllabus, ders ana sayfası)
            kitap <strong>o dersin zorunlu / birincil ders kitabı</strong> olarak ismen belirtilmiş
            olmalıdır.
          </blockquote>
          <p>
            Aşağıdakiler kabul edilir:
          </p>
          <ul>
            <li>"Textbook: <em>Introduction to Algorithms</em> by Cormen et al."</li>
            <li>"Required textbook: …"</li>
            <li>"Ders kitabı: …"</li>
            <li>"Primary textbook: …"</li>
          </ul>
          <p>
            Aşağıdakiler <strong>kabul edilmez</strong> (bu, sitemizin önceki bir yorumundan
            farklıdır — bir kullanıcı katkısıyla kuralı sıkılaştırdık):
          </p>
          <ul>
            <li>"Recommended reading" / "Suggested reading" / "Optional"</li>
            <li>"Supplementary readings" / "Reference book"</li>
            <li>"Background reading" / "Further reading"</li>
            <li>Müfredat genel kategorisi (örn. "Algoritmalar dersi var" → CLRS kullanıldığı anlamına gelmez)</li>
            <li>Akademisyenin kişisel CV'sinde geçen bir referans</li>
            <li>Üçüncü taraf sayfalar (Goodreads, Amazon, Wikipedia)</li>
            <li>Login gerektiren / kamuya kapalı LMS içerikleri</li>
          </ul>
          <p>
            Niyet: bir programın o kitabı <em>üstüne kurduğu</em> dersleri yakalamak; "okumak
            isteyenler için ek kaynak" tarzı yumuşak değinmeleri değil.
          </p>
          <p>
            Her kanıt linki, tespit anında ulaşılabilir olduğu doğrulandıktan sonra eklenmiştir.
            Bağlantılar zaman içinde taşınabilir veya silinebilir; bu nedenle her linkin yanında bir{' '}
            <strong>📦 Wayback Machine yedeği</strong> vardır.
          </p>
        </section>

        <section className="about-section">
          <h2>Üniversite seçimi nasıl yapıldı?</h2>
          <p>
            Site, dünya tarafında <strong>QS Computer Science Subject Ranking 2025</strong>'in ilk
            30'unu temel alır. Sıralama numarası (#1–30) bu kaynaktan gelir.
          </p>
          <p>
            Türkiye tarafında ise bilinen 30 Bilgisayar Mühendisliği programı dahil edilmiştir.{' '}
            <strong>QS subject ranking'de yalnızca bir avuç Türk üniversitesi yer aldığı için TR
            tarafında numaralı sıralama gösterilmez.</strong> Bunun yerine üniversiteler doğrulanmış
            kanıt sayısına ya da alfabetik olarak sıralanır.
          </p>
        </section>

        <section className="about-section">
          <h2>Kitaplar nasıl seçildi?</h2>
          <p>
            Bilgisayar mühendisliği lisans/yüksek lisans seviyesinde geniş kullanım gören 40+
            klasik kitap manuel olarak belirlendi (CLRS, SICP, OSTEP, Sipser, Dragon Book, Bishop
            PRML, Goodfellow Deep Learning, Russell-Norvig vb.). Her biri için yukarıdaki kurala
            uygun en az bir kanıt bulunabilenler listede kaldı; bulunamayanlar siteden çıkarıldı.
          </p>
          <p>
            Aklımıza gelen ama listede olmayan bir klasik varsa, yeni bir kanıtla birlikte
            önerebilirsiniz (aşağıda iletişim).
          </p>
        </section>

        <section className="about-section">
          <h2>Sıralama</h2>
          <ul>
            <li>
              <strong>Kitaplar</strong> sayfasında varsayılan sıralama: doğrulanmış kanıt sayısı (azalan),
              eşitlikte alfabetik.
            </li>
            <li>
              <strong>Üniversiteler</strong> sayfasında varsayılan sıralama: o üniversitenin syllabus'unda
              ismen geçen kitap sayısı (azalan), eşitlikte QS sıralaması (dünya) ya da isim (TR).
              "🏆 QS sıralamasına göre" / "🔤 İsim alfabetik" alternatifine geçilebilir.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Yapmadıklarımız</h2>
          <ul>
            <li>
              <strong>Müfredat listelemiyoruz.</strong> Bölümlerin gerçek 2025–2026 müfredatlarını
              tek tek doğrulayabilecek altyapımız yok; o yüzden müfredat bölümünü tamamen kaldırdık.
              Her üniversite kartında resmi bölüm sayfasına bağlantı sağlıyoruz, doğrusu oradan
              kontrol edilmeli.
            </li>
            <li>
              <strong>Kitap önerisi sıralaması yapmıyoruz.</strong> Sıralama tamamen "kaç doğrulanmış
              syllabus kanıtı var" sayısına dayalıdır; akademik kalite ya da popülerlik değerlendirmesi değildir.
            </li>
            <li>
              <strong>Kapanmış sayfalardan veri toplamıyoruz.</strong> Login gerektiren LMS içerikleri,
              kişisel arşivler ve PDF dökümanlar — bunlar kapsamımız dışındadır.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Katkı ve hata bildirimi</h2>
          <p>
            Eksik bir kitap, bozulmuş bir link, yeni bir syllabus kanıtı, yanlış kategorize edilmiş
            bir kayıt: <a href="mailto:bicakcikemal@gmail.com?subject=cs-universiteler%20katk%C4%B1">bicakcikemal@gmail.com</a>{' '}
            adresine yazın.
          </p>
          <p>
            Site açık kaynak; kod ve veri{' '}
            <a href="https://github.com/kemalbicakci/cs-universiteler" target="_blank" rel="noopener noreferrer">
              github.com/kemalbicakci/cs-universiteler
            </a>{' '}
            üzerinden incelenebilir, pull request gönderilebilir.
          </p>
        </section>
      </div>
    </div>
  )
}
