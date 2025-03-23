# Google Sheets Competition Script

## Opis

Ten skrypt Apps Script dla Google Sheets umożliwia automatyzację zarządzania wynikami zawodów. Obsługuje różne tryby wyświetlania wyników, automatyczne formatowanie oraz ustawianie dat. Dzięki temu proces przeprowadzania zawodów staje się bardziej efektywny i mniej podatny na błędy.

---

## Konfiguracja

Przed rozpoczęciem pracy ze skryptem należy dostosować poniższe zmienne konfiguracyjne do własnych potrzeb.

### Zmienne konfiguracyjne

| Nazwa zmiennej | Rodzaj wartości | Przykładowa wartość | Opis |
|---------------|---------------|------------------|------|
| `FIRST_ROW` | int | `7` | Od którego wiersza zaczynają się wyniki zawodników. |
| `SHEET_QUEUE_NAME` | str | `"Kolejka"` | Nazwa arkusza, w którym znajdują się ręcznie wpisywane wyniki. |
| `SHEET_QUEUE_ROW_COLORS` | dict | `{8: "#ADBCE6", 9: "#00FF00", 10: "#808080"}` | Kolorowanie wierszy na podstawie wartości w określonych kolumnach. |
| `MODE_DISPLAY_RESULT` | `MODE_ALL_RESULTS`, `MODE_BEST_RESULT`, `MODE_BEST_RESULT_AND_COUNTER` | `MODE_BEST_RESULT_AND_COUNTER` | Tryb wyświetlania wyników. |
| `COLUMNS_REFRESH_RESULTS_SHEET` | list | `[2, 3, 5]` | Kolumny, których zmiana powoduje odświeżenie wyników. |
| `COLUMNS_SET_DATE` | [[int], int, bool] | `[[[2, 3], 8, false], [[4], 9, false], [[5], 10, false], [[1,2,3,4,5], 14, true]]` | Format: `[kolumny powodujące zmianę, gdzie zapisać datę, czy nadpisać istniejącą datę]`. |
| `QUEUE_ROW_WIDTH` | int | `14` | Liczba kolumn w wierszu kolejki, które należy pokolorować. |
| `COLUMNS_WITH_RESULTS` | [[int, bool, bool, bool]] | `[[2, true, false, true], [3, true, false, true], [5, false, 1, false]]` | `[numer kolumny, czy identyfikuje gracza, czy służy do porównania wyników, czy może być pusta]`. |
| `COLUMN_WITH_CATEGORY_OR_CATEGORY` | str \|\| int | `"Wyniki"`, `3` | Kolumna, w której znajduje się kategoria wyników lub jej nazwa. |


### Tryby wyświetlania wyników

| Nazwa zmiennej | Opis |
|---------------|------|
| `MODE_ALL_RESULTS` | Wypisywane są wszystkie wyniki graczy, nawet jeśli grali kilkukrotnie. |
| `MODE_BEST_RESULT` | Wypisywany jest tylko najlepszy wynik gracza. |
| `MODE_BEST_RESULT_AND_COUNTER` | Wypisywany jest tylko najlepszy wynik gracza oraz liczba jego podejść. |


---


## Instalacja

1. Otwórz Google Sheets i przejdź do **Rozszerzenia > Apps Script**.
2. Skopiuj kod skryptu i wklej go do edytora Apps Script.
3. Dostosuj zmienne konfiguracyjne do swoich potrzeb.
