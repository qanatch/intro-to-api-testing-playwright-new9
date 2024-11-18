Calculate risk.

|POST|Scenario|Data|
|---|---|---|
|1|Verifying a response code with correct data|income>0,debt> 0, age >16, employed = true, loanAmount >0, loanPeriod = 3,6,9,12,18,24,30,36|
|2|Verifying a response code with incorrect data|income=0, debt<0,age<16,employed =false, loanAmount <=0, loanPeriod= 60|
|3|Verifying a response code with empty data|
|4|Testing of risk level "High Risk"|loanPeriod = 3,6|
|5|Testing of risk level "Medium Risk"|loanPeriod = 6,9,12|
|6|Testing of risk level "Low Risk"|loanPeriod=12,18,24,30,36|
