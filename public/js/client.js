
console.log("Start client code");
let showInfo = document.getElementById('personalInfo');
let search = document.getElementById('search');

$(function(){
  var t = [];
  var insititution = ["QEH","QMH","TWH","TWH","ABC","TYH","OPH"];
  var date = ["2019-04-05","2019-04-17","2019-05-01","2019-05-02","2019-05-03","2019-05-04","2019-05-06"];
  for(let i =0;i<6;i++){
    t.push([
      insititution[i] ,
      date[i],
      insititution[i] + ".pdf",
      Math.floor((Math.random() * 100) + 1).toFixed(2),
      Math.floor((Math.random() * 100) + 1).toFixed(2),
      Math.floor((Math.random() * 100) + 1).toFixed(2),
      Math.floor((Math.random() * 100) + 1).toFixed(2),
      Math.floor((Math.random() * 100) + 1).toFixed(2)
    ]);

  }

  $('#table_id').DataTable( {
    data: t,
    columns: [
        { title: "Insititution" },
        { title: "Date" },
        { title: "Report" },
        { title: "Sodium" },
        { title: "Potassium" },
        { title: "Urea" },
        { title: "Creatinine" },
        { title: "Protein" }
    ]
} );

  showInfo.addEventListener('click',function(){
      var parameters = "Testing";
      $.get( '/searching',parameters, function(data) {
        console.log(data);
        $('#example').DataTable( {
          columns: [
              { title: "Name" },
              { title: "Position" },
              { title: "Office" },
              { title: "Extn." },
              { title: "Start date" },
              { title: "Salary" }
          ]
      } );
    });
  });

  search.addEventListener('click',function(){
    console.log("Get ID: " + document.getElementById("patientId").value);
    console.log("Get Name: " + document.getElementById("patientName").value);
    var parameters = {patientId:document.getElementById("patientId").value,patientName:document.getElementById("patientName").value};
    console.log(parameters);
    $.get( '/searching',parameters, function(data) {
      console.log("Received from server: " + data);
        var t = [];
        $('#table_id').DataTable( {
          retrieve: true,
          data: t
      } );
  });
});

  $('.search').on('keyup', function(e){
    if(e.keyCode === 13) {
      var parameters = { search: $(this).val() };
        $.get( '/searching',parameters, function(data) {
          console.log(data);
          var div = document.getElementById('result');
          div.innerHTML += "<h2>"+ data.name + "</h2>";
          div.innerHTML += "<div style='font-size:3px;'><i>"+ data.title + "</i></div>";
          div.innerHTML += "<div>"+ data.email + "</div>";
          div.innerHTML += "<div>"+ data.org + "</div>";
      });
     };
  });
 });