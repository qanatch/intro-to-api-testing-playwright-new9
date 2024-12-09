
Calculate risk.

|POST|Scenario|Data|
|---|---|---|
|1|Verifying a response code with correct data|income>0,debt> 0, age >16, employed = true, loanAmount >0, loanPeriod = 3,6,9,12,18,24,30,36|
|2|Verifying a response code with incorrect data|income=0, debt<0,age<16,employed =false, loanAmount <=0, loanPeriod= 60|
|3|Verifying a response code with empty data|
|4|Testing of risk level "High Risk"|loanPeriod = 3,6|
|5|Testing of risk level "Medium Risk"|loanPeriod = 6,9,12|
|6|Testing of risk level "Low Risk"|loanPeriod=12,18,24,30,36|
=======
|GET| Scanario                                        | Test data |
|---|-------------------------------------------------|-----------|
1| request with correct data username and password | ---       |
2| request with empty data                         | ---       |

|PUT| Scenario                                   |Test data|
|---|--------------------------------------------|---|
1| update order with correct data and api_key |orderId={1.10},api_key='1234567890123456'|
2| update order with incorrect api_key        |16<api_key<16 digits(for example'1234567890123'|
3| update order with incorrect data           |10<orderId<1,symbol, no value|
4| update order with empty mandatory fields   |---|
5| update order with empty orderID            |---|

|DELETE|Scenario|Test data|
|---|---|---|
1|deleting an order with correct oredrId and api_key|orderId={1.10},api_key='1234567890123456'|
2|deleting an order with incorrect orderId and api_key|16<api_key<16 digits(for example'1234567890123')|
3|deleting an order with incorrect orderId|10<orderId<1,symbol, no value|
4|deleting an order with incorrect api_key|api_key< 16 simbol, api_key> 16 simbol(for example '123456789012345')|
|

