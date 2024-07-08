*** Settings ***
Library     SeleniumLibrary


*** Variables ***
${BROWSER}    chrome


*** Tasks ***


ROBOT CREATION TEST
	Input text	//input[@id='username']	maria
	Click Element	//input[@id='username']
	Input text	//input[@id='password']	thoushallnotpass
	Click Button	//div[@class='container']/div/div[1]/form/button
