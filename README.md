# Google Sheets Competition Script

## Opis

Ten skrypt Apps Script dla Google Sheets umożliwia automatyzację zarządzania wynikami zawodów. Obsługuje różne tryby wyświetlania wyników, automatyczne formatowanie oraz ustawianie dat. Dzięki temu proces przeprowadzania zawodów staje się bardziej efektywny i mniej podatny na błędy.

---

## Konfiguracja

Przed rozpoczęciem pracy ze skryptem należy dostosować poniższe zmienne konfiguracyjne do własnych potrzeb.

### Zmienne konfiguracyjne

| Nazwa zmiennej | Rodzaj wartości | Opis | Przykładowa wartość |
|---------------|---------------|------|------------------|
| `FIRST_ROW` | int | Od którego wiersza zaczynają się wyniki zawodników. | `7` |
| `SHEET_QUEUE_NAME` | str | Nazwa arkusza, w którym znajdują się ręcznie wpisywane wyniki. | `"Kolejka"` |
| `SHEET_QUEUE_ROW_COLORS` | dict | Kolorowanie wierszy na podstawie wartości w określonych kolumnach. | `{8: "#ADBCE6", 9: "#00FF00", 10: "#808080"}` |
| `MODE_DISPLAY_RESULT` | `ALL_RESULTS`, `BEST_RESULT`, `BEST_RESULT_AND_COUNTER` | Tryb wyświetlania wyników. | `ALL_RESULTS` |
| `REFRESHING_COLUMNS` | list | Kolumny, których zmiana powoduje odświeżenie wyników. | `[2, 3, 5]` |
| `COLUMNS_SET_DATE` | [[int], int, bool] | Format: `[kolumny powodujące zmianę, gdzie zapisać datę, czy nadpisać istniejącą datę]`. | `[[[2, 3], 8, false], [[4], 9, false], [[5], 10, false], [[1,2,3,4,5], 14, true]]` |
| `QUEUE_ROW_WIDTH` | int | Liczba kolumn w wierszu kolejki, które należy pokolorować. | `14` |
| `COLUMNS_WITH_RESULTS` | [[int, bool, bool, bool]] | `[numer kolumny, czy identyfikuje gracza, czy służy do porównania wyników, czy może być pusta]`. | `[[2, true, false, true], [3, true, false, true], [5, false, 1, false]]` |
| `CATEGORIES` | str \|\| int | Kolumna, w której znajduje się kategoria wyników (int) lub jak jest jedna kategoria to jej nazwa (str). | `"Wyniki"`, `3` |


### Tryby wyświetlania wyników

| Nazwa zmiennej | Opis |
|---------------|------|
| `ALL_RESULTS` | Wypisywane są wszystkie wyniki graczy, nawet jeśli grali kilkukrotnie. |
| `BEST_RESULT` | Wypisywany jest tylko najlepszy wynik gracza. |
| `BEST_RESULT_AND_COUNTER` | Wypisywany jest tylko najlepszy wynik gracza oraz liczba jego podejść. |


---


## Instalacja

1. Otwórz Google Sheets i przejdź do **Rozszerzenia > Apps Script**.
2. Skopiuj kod skryptu i wklej go do edytora Apps Script.
3. Dostosuj zmienne konfiguracyjne do swoich potrzeb.


---

## Przykładowe arkusze:  

Aby wypróbować, należy zaimportować plik `.ods` w Google Sheets, a następnie w zakładce **Rozszerzenia > Apps Script** dodać skrypt z pliku `script.js`.  

| Nazwa przykładu | Opis |
|----------------|------|
| [`1_Two_categories`](examples/1_Two_categories) | 2 kategorie do wyboru i kolumna "Imię i nazwisko"; pokazywany jest tylko najlepszy wynik gracza (`BEST_RESULT_AND_COUNTER`) oraz liczba rozegranych gier. |
