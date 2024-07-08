*** Settings ***
Library     SeleniumLibrary


*** Variables ***
${BROWSER}    chrome


*** Tasks ***


TESTFOR RESULTS
	Open Browser	https://robotsparebinindustries.com/	chrome
	Input text	//input[@id='username']	wassef
	Input text	//input[@id='password']	chebbi
	Click Button	//div[@class='container']/div/div[1]/form/button
