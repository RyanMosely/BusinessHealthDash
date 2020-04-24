google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var container = document.getElementById('timeline');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Project' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows([
    [ 'McNeilus Truck & Manufacturing', new Date(2017, 1, 15), new Date(2017, 3, 9) ],
    [ 'Test: Catalog3',                 new Date(2017, 1, 7),  new Date(2017, 5, 23) ],
    [ 'Test: 3D Model Viewer',          new Date(2017, 4, 11),  new Date(2017, 7, 29) ],
    [ 'Focal Point',                    new Date(2017, 3, 4), new Date(2017, 8, 21) ],
    [ 'Data Team',                      new Date(2017, 5, 23), new Date(2017, 9, 17) ],
    [ 'Quotes',                         new Date(2017, 2, 12),  new Date(2017, 9, 27) ],
    [ 'RhinoAg',                        new Date(2017, 6, 1),  new Date(2017, 8, 23) ],
    [ 'Rexnord Maintenance',            new Date(2017, 4, 26), new Date(2017, 8, 9) ],
    [ 'IGS',                            new Date(2017, 8, 24), new Date(2017, 9, 18) ]]);

  chart.draw(dataTable);
}

