new gridjs.Grid({
    columns: ['ID','Name', 'CountryCode', 'District','Population'],
    server: {
      url: 'http://localhost:3002/city',
      then: data => data.map(city => 
        [city.ID,city.Name,city.CountryCode,city.District,city.Population]
      )
    } 
}).render(document.getElementById("wrapper"));