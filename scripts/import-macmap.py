"""
MacMap Excel faylidan EU (Germaniya) MFN tarif bazasini chiqaradi.

Fayl tuzilishi: Effectively applied (by partner), Minimum rate, HS6, 2024.
Imtiyozsiz partnerlar (EI bilan preferensial kelishuvi yo'q) uchun
amaldagi stavka = MFN. Ikki mustaqil imtiyozsiz partner solishtirilib,
mos kelgan qiymatlar MFN deb olinadi. GSP+ qoidasi alohida qo'llaniladi
(O'zbekiston 2021-yildan EI GSP+ benefisiari — aksariyat agro mahsulotlar 0%).

Ishlatish: python scripts/import-macmap.py
Natija: src/data/tariffs-eu.json
"""

import json
from collections import defaultdict
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent
XLSX = ROOT / "data" / "macmap_tariffs.xlsx"
OUT = ROOT / "src" / "data" / "tariffs-eu.json"

# EI bilan preferensial shartnomasi YO'Q davlatlar (2024 holatiga):
# Australia — ECTA hali kuchda emas; American Samoa — AQSH hududi, imtiyozsiz.
# Ikkalasi mustaqil manba sifatida solishtiriladi.
NON_PREFERENCE_PARTNERS = {"Australia", "American Samoa"}

# O'zbekiston GSP+ doirasida imtiyoz BERILMAYDIGAN (sensitive/excluded)
# bo'limlar — quyidagilar tashqarisida barcha boblar imtiyozli deb qaraladi.
# GSP+ asosiy istisnolari: ayrim skeptic/boboq boblar (24 shakar nomidlari
# sezgir, 41-43 teri, 71-qimmat toshlar qismi, 87-89 transport).
GSP_PLUS_EXCLUDED_CHAPTERS = {"24", "41", "42", "43", "71", "87", "88", "89"}


def chapter_of(hs6: str) -> str:
    return hs6[:2]


def main() -> None:
    wb = openpyxl.load_workbook(XLSX, read_only=True)
    ws = wb["Data"]

    # partner -> {hs6: (rate, description)}
    by_partner: dict[str, dict[str, tuple[str, str]]] = defaultdict(dict)
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i == 0:
            continue
        reporter, partner, year, revision, code, desc, n_lines, ave = row
        if partner in NON_PREFERENCE_PARTNERS:
            by_partner[partner][str(code)] = (str(ave or "0"), str(desc or ""))

    partners_found = sorted(by_partner)
    if len(partners_found) < 2:
        raise SystemExit(
            f"Imtiyozsiz partner topilmadi (bor: {partners_found}). Fayl kesilgan bo'lishi mumkin."
        )

    a, b = (by_partner[p] for p in partners_found[:2])
    products = []
    mismatch = 0
    for hs6, (rate, desc) in sorted(a.items()):
        other = b.get(hs6)
        if other and other[0] != rate:
            mismatch += 1
            continue
        try:
            mfn = round(float(rate), 2)
        except ValueError:
            mfn = 0.0
        chap = chapter_of(hs6)
        products.append(
            {
                "hs6": hs6,
                "desc": desc.strip(),
                "chapter": chap,
                "euMfnPct": mfn,
                # GSP+ imtiyozli boblarda O'zbekiston uchun 0%, aks holda MFN
                "uzGspPct": 0.0 if chap not in GSP_PLUS_EXCLUDED_CHAPTERS else mfn,
            }
        )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps(
            {
                "source": "ITC MacMap, Germany applied tariffs (effectively applied, min rate), 2024, HS Rev.2022",
                "reporter": "Germany (EU TARIC)",
                "mfnpPartners": partners_found,
                "gspNote": "O'zbekiston EI GSP+ benefisiari (2021+); istisno boblar tashqarisida 0%. Rasmiy tasdiq: EU TARIC / Form A yoki REX.",
                "excludedChapters": sorted(GSP_PLUS_EXCLUDED_CHAPTERS),
                "products": products,
            },
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    print(f"Products: {len(products)} | rate mismatch dropped: {mismatch}")
    print(f"Partners used: {partners_found}")
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
