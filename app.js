$(function() {        
    let a= moment().format("YYYY-MM-DD");
    let ctrs = [];    
    $('#start').val(''+ a +'');
    $('#start').on('change', (e) => {   
        let date = $('#start').val();
        if( date=="" || date>a ){     
            date=a;
            $('#start').val(''+ a +'');
            console.log(a);
        }
           
            $.ajax({
                url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&date='+ moment(date).format("YYYYMMDD") +'',
                success: val => {
                    $('#search ').val('');
                    ctrs = val.map(el => {                    
                        return {
                            name: el.txt,
                            cc: el.cc,
                            rate: el.rate,
                            exchangedate :el.exchangedate
                        };
                    });
                renderCountries(ctrs);
                    
                   
                },
                error: err => {
                    console.log(err);
                }
            });
          
    }); 

    $('#search ').on('keyup', (e) => {
       
        let search = $(e.currentTarget).val() ;
        console.log(search);
        let result = ctrs.filter(el => {
            let name = el.name.toLowerCase();
            let lowerSearch = search.toLowerCase();
            return name.indexOf(lowerSearch) >= 0 ;
        });
        renderCountries(result);
    });

    let renderCountries = val => {
        let countriesHtml = '';
        let select='<option value="1">Выберите страну</option>';
        for(let item in val) {
            let coun = val[item];
            countriesHtml += '<tr><td>' + (+item+1) +
                '</td><td>' + coun.name + '</td>' +
                '</td><td>' + coun.cc + '</td>' +
                '</td><td>' + coun.rate +  '</td></tr>';         
        }
           
        $('#countries-table tbody').html(countriesHtml);
        $('#sel').html(select)
    };
 

 
    $.ajax({
        url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&date='+ moment().format("YYYYMMDD") +'',
        success: val => {
                    
            ctrs = val.map(el => {
                     
                return {
                    name: el.txt,
                    cc: el.cc,
                    rate: el.rate,
                    exchangedate :el.exchangedate
                };
            });

            let names = ctrs.map(el => el.name);
                        
            $("#search").autocomplete({
                source: names
            });
            renderCountries(ctrs);    
        },
        error: err => {
            console.log(err);
        }
    });
});