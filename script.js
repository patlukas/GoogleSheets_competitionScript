const ONLY_BEST_RESULT = 1
const COUNTER = 2

//Modes
const MODE_ALL_RESULTS = 0
const MODE_BEST_RESULT = ONLY_BEST_RESULT
const MODE_BEST_RESULT_AND_COUNTER = ONLY_BEST_RESULT | COUNTER

const FIRST_ROW = 7
const SHEET_QUEUE_NAME = "Kolejka"
const SHEET_QUEUE_ROW_COLORS = {8: "#ADBCE6", 9: "#00FF00", 10: "#808080"}
const MODE_DISPLAY_RESULT = MODE_BEST_RESULT_AND_COUNTER;
const COLUMNS_REFRESH_RESULTS_SHEET = [2, 3, 5]
const COLUMNS_SET_DATE = [[[2, 3], 8, false], [[4], 9, false], [[5], 10, false], [[1,2,3,4,5], 14, true]] // [W jakiej kolumnie musi być zmiana, gdize będzie zapisana data, czy nadpisać już zapisaną datę]
const QUEUE_ROW_WIDTH = 14
const COLUMNS_WITH_RESULTS = [[2, true, false, true], [3, true, false, true], [5, false, 1, false]] //Numer kolumny w której jest resultat, czy kolumna identyfikuje gracza, czy kolumna służy do porówniania wyników jak nie to false jak tak to cyfra od 1 w górę im wyższa tym ważniejsza kolumna), czy może być pusta komórka
const COLUMN_WITH_CATEGORY_OR_CATEGORY = "Wyniki" //numer kolumny w której jest kategoria lub kategoria


function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var sheetName = sheet.getName();

  if (sheetName === SHEET_QUEUE_NAME) {
    onEditQueue(e)
  }
}

function onEditQueue(e) {
  var range = e.range;
  var row = range.getRow();
  var column = range.getColumn(); 
  if(row < FIRST_ROW) return;
  for(const [list_col, date_col, always_replace] of COLUMNS_SET_DATE) {
    if(!list_col.includes(column)) continue;
    onEditQueue_setDate(e, date_col, list_col, always_replace)
  }
  if(COLUMNS_REFRESH_RESULTS_SHEET.includes(column)) {
    onEditQueue_addResultToSheet(e)
  }

  onEditQueue_setColor(e)
}

function onEditQueue_setDate(e, column, changedColumn, always_replace) {
  var sheet = e.source.getActiveSheet();
  var row = e.range.getRow();
  var cell = sheet.getRange(row, column)
  var value = cell.getValue();
  var removeDate = true;
  changedColumn.forEach(function(c) {
    if(sheet.getRange(row, c).getValue() !== "") {
      removeDate = false;
    }
  })

  if(removeDate) {
    cell.setValue("")
    return
  }
  if(!always_replace && value !== "") return
  var date = new Date();
  cell.setValue(date);
}

function onEditQueue_setColor(e) {
  var sheet = e.source.getActiveSheet();
  var row = e.range.getRow();

  var column = -1
  var color = "#FFFFFF"
  for(const [dict_column, dict_color] of Object.entries(SHEET_QUEUE_ROW_COLORS)) {
    if(sheet.getRange(row, dict_column).getValue() === "") continue;
    if(parseInt(dict_column) > column) {
      column = parseInt(dict_column);
      color = dict_color;
    }
  }

  var range = sheet.getRange(row, 1, 1, QUEUE_ROW_WIDTH)
  range.setBackground(color)
}

function onEditQueue_addResultToSheet(e) {
  var queueSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_QUEUE_NAME);
  var range = queueSheet.getRange(FIRST_ROW, 1, queueSheet.getMaxRows() - FIRST_ROW, QUEUE_ROW_WIDTH);
  var data = range.getValues();

  var results = {}

  data.forEach(function(row, index) {
    for(const c of COLUMNS_WITH_RESULTS) {
      if(!c[3] && row[c[0]-1] === "") return;
    }

    var category = COLUMN_WITH_CATEGORY_OR_CATEGORY
    if(Number.isInteger(COLUMN_WITH_CATEGORY_OR_CATEGORY)) {
      category = row[COLUMN_WITH_CATEGORY_OR_CATEGORY-1]
    }

    if(!(category in results)) {
      results[category] = [];
    }

    var newRow = true; 
    if(MODE_DISPLAY_RESULT & ONLY_BEST_RESULT) {
      results[category].forEach(function(result_list, index) {
        for(var i=0; i<COLUMNS_WITH_RESULTS.length; i++) {
          if(COLUMNS_WITH_RESULTS[i][1] && result_list[i] !== row[COLUMNS_WITH_RESULTS[i][0]-1]) {
            return;
          }
        }
        newRow = false
        result_list[COLUMNS_WITH_RESULTS.length]++;

        var compare = [0, 0]
        for(var i=0; i<COLUMNS_WITH_RESULTS.length; i++) {
          if(COLUMNS_WITH_RESULTS[i][2] !== false) {
            if(Number.isInteger(result_list[i])) {
              compare[0] += result_list[i] * Math.pow(10, 3 * COLUMNS_WITH_RESULTS[i][2])
            }
            if(Number.isInteger(row[COLUMNS_WITH_RESULTS[i][0]-1])) {
              compare[1] += row[COLUMNS_WITH_RESULTS[i][0]-1] * Math.pow(10, 3 * COLUMNS_WITH_RESULTS[i][2])
            }
          }
        }
        if(compare[1] > compare[0]) {
          for(var j=0; j<COLUMNS_WITH_RESULTS.length; j++) {
            result_list[j] = row[COLUMNS_WITH_RESULTS[j][0]-1]; 
          }
          
          results[category].splice(index, 1); 
          results[category].push(result_list); 
        }
      });
    }
    if(newRow) {
      var newResult = []
      for(var i=0; i<COLUMNS_WITH_RESULTS.length; i++) {
        newResult.push(row[COLUMNS_WITH_RESULTS[i][0]-1])
      }
      newResult.push(1)
      results[category].push(newResult)
    }
  });
    Logger.log(results);

  for (const [results_category, results_in_category] of Object.entries(results)) {
    addResultToSheet(results_category, results_in_category)
  }
}

function addResultToSheet(sheetName, results) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if(sheet === null) return;
  sheet.getRange(FIRST_ROW, 2, sheet.getMaxRows() - FIRST_ROW, COLUMNS_WITH_RESULTS.length+1).clearContent();
  if(results.length === 0) return;
  results.sort(
    function(a, b){
      var compare = [0, 0]
      for(var i=0; i<COLUMNS_WITH_RESULTS.length; i++) {
        if(COLUMNS_WITH_RESULTS[i][2] !== false) {
          if(Number.isInteger(a[i])) {
            compare[0] += a[i] * Math.pow(10, 3 * COLUMNS_WITH_RESULTS[i][2])
          }
          if(Number.isInteger(b[i])) {
            compare[1] += b[i] * Math.pow(10, 3 * COLUMNS_WITH_RESULTS[i][2])
          }
        }
      }
      return compare[1] - compare[0]
    }
  )
  sheet.getRange(FIRST_ROW, 2, results.length, COLUMNS_WITH_RESULTS.length+1).setValues(results);
  if(!(MODE_DISPLAY_RESULT & COUNTER)) {
    sheet.getRange(FIRST_ROW, COLUMNS_WITH_RESULTS.length+1, sheet.getMaxRows() - FIRST_ROW, 1).clearContent();
  }
}
