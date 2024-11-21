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
4|deleting an order with incorrect api_key|api_key< 16 цифр, api_key> 16 цифр(например '123456789012345')|
|