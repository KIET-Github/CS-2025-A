# ADIP Portal Website

## [Site is Live At](differently-abled-schemes.netlify.app/) : <br/> differently-abled-schemes.netlify.app/

## [Demo Video of Working of Project ADIP Portal](https://www.youtube.com/watch?v=98VgY5hn2Z4) : <br/> https://www.youtube.com/watch?v=98VgY5hn2Z4
## [ADIP Portal Project Idea Power Point Presentation](https://drive.google.com/file/d/1z6RZkAmJsehmTqQTQoJaaqCCsPigH3x5/view?usp=sharing) : <br/> https://drive.google.com/file/d/1z6RZkAmJsehmTqQTQoJaaqCCsPigH3x5/view?usp=sharing



## [Demo Video of Working of Portal](https://www.youtube.com/watch?v=wpZCTsZigBY) : <br/> https://www.youtube.com/watch?v=wpZCTsZigBY

## Pictures/ Screenshots Of UI
![alt text](https://cdn.discordapp.com/attachments/950668532155285508/962768547719819385/Screenshot_319.png)<br>
![alt text](https://cdn.discordapp.com/attachments/950668532155285508/962768547505897522/Screenshot_321.png)<br>
![alt text](https://cdn.discordapp.com/attachments/950668532155285508/962768547250053220/Screenshot_322.png)<br>
![alt text](https://cdn.discordapp.com/attachments/950668532155285508/962768548277682227/Screenshot_323.png)<br>
![alt text](https://cdn.discordapp.com/attachments/950668532155285508/962768547921150012/Screenshot_324.png)<br>


## Introduction </br>
There are about 2.6 crore people with different abilities in India and with the application of modern technology, a number of aids have emerged that can reduce the effects of disabilities and enhance the economic potential of the differently-abled.
It has been a constant endeavor of the Indian Government to provide differently-abled persons with aids/appliances, which are essential for their social, economic, and vocational rehabilitation.
One such scheme is the ADIP scheme -- Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances.


## Detailed Idea Explanation of Project ADIP Portal :  </br>
The main objective of this ADIP scheme is to assist the needy differently-abled persons in maintaining the modern standard aids and appliances with an aim to improve their independent functioning.  
All the pending applications are confirmed by the implementing agencies. The agencies are given all the financial assistance for the purchase and distribution of standard aids and appliances under the guidelines of the ADIP scheme. These implementing agencies take care of and make all the suitable arrangements for the aids and appliances distributed under this scheme.


## The Problems ADIP Portal Solves / Solutions Provided : </br>
A disabled-friendly App for registration of differently-abled persons under the ADIP Scheme with an easy-to-use and minimalistic user interface, acting as a bridge between the implementing agency & users.

Keeping in mind the difficulties faced by the differently-abled persons, we have come up with a prototype with the following features:

1) App for Direct Registration of differently-abled persons.
2) Multilingual App
3) Voice Assistance and Talk-Back features.
5) Chat-Bot for providing a guided-tour.
4) Minimalistic and easy-to-use interface.
6) Availing ADIP schemes and authentication through UDID/ Aadhar Card.
7) Online Document verification is done by the implementing agency before providing any aid/appliance, the same is reflected in the beneficiary's dashboard.
8) Separate portal for the implementing agencies for monitoring the number of aids issued across India.
9) Checks for replication and duplication based on UDID and scheme ID.
10) Real Time report generation for no. of aids generated/granted across India.
11) Provides complete transparency through SMS and Email updates.
12) Feedback/grievance form : In case of any injustice or discomfort faced by the user, he/she can directly appeal to the concerned authority by filling out this form.
13) Auto Data fill through OCR and image text recognition.

## What is the Need of ADIP Portal? : <br/>
1. To Reduce the Time and Effort of the people in need of Emergency Services.<br/>
2. To Cater to the needs of differently abled people in these harsh times of the pandemic.<br/>
3. To Impact a large section of the society through Technology.<br/>
               
## How ADIP Portal Works? / Idea / Solution / Prototype
: <br/> 
A Web-Portal to cater the demands of Persons with Disabilities (PWDs) through Voice-Assistance & Talk-Back Functionalities to monitor the applications issues throughout India, thus, acting as an interface between the PWDs and the Govt. .

As a first step, the UDID No. and personal details of the user will be required for self-registration. If the user doesn't have a UDID issued yet, then the user will be redirected to the UDID Application Portal.

After successful registration, the user will be shown all the available schemes in his/her respective category of disability. A scheme-specific form will then be displayed for a particular chosen scheme by the user for uploading the necessary documents. This data will be used afterwards for online document verification. 

Document Verification : The gathered data will be forwarded to the nearest implementing agency for verification. (Continuous SMS updates will be sent to the users regarding current Application Status. (Database will be updated after successful document verification by the implementing agency).

A grievance-addressal & feedback portal along with continuous updations/availability of newly introduced ADIP schemes will be shown to both current & new registered users.


## Real-Time Usage of ADIP Portal : <br/> 
Persons with Disabilities (PWDs) can avail direct benefits from ADIP Schemes.
The project is flexible it can be used to facilitate other government projects / Scheme.
The dataset can be used to monitor unclassified clusters.
The dataset can be used for planning future schemes for PWD’s


## Uniqueness of ADIP Portal : </br>
The document Verification from government agencies can take a bit long time.
The process starts with UDID verification, absence of which user may not be able to avail ADIP scheme until a valid UDID is issued.
Despite of Automated and talkback feature, In some scenario the disabled user may need a guardian to access the application. 



## Tech Stack Used : <br/> 
ML / AI : Alan Voice AI Assistant , Machine Learning
Front-End : HTML , CSS , JavaScript , Bootstrap , ReactJS
Back-End : Python , Django , Express JS , Node JS
Data-Base : FireBase , MongoDB
APIs : Twilio (SMS Service API) , Automation




## Step-By-Step Procedure to Run this ADIP Portal Project on Your Local Machine : <br/> 
Step 1 : Fork or Clone this Repository onto your local machine.<br/>
Step 2 : Install Node.js & npm on your local machine. (Skip this step if installed already)
Step 4 : Install node and some NPM Libraries such as puppeteer, request and require modules for Web Scraping and Automation. To Run the Real-Time Chat Application,  
Step 3 : Run the commands in following manner :<br/> 
### For Running Web-Scraping & Automation Part-<br/>
Open ADIP Portal_Automation folder in VSCode Integrated Terminal and Write npm install in it. (Puppeteer, Request & Require np Modules will be installed)</br>
Run dataWebScrappingDonor.js File. It will scrap, collect and store data of Donor people in a donor.json File.<br/> 
Run dataWebScrappingNeedy.js File. It will scrap, collect and store data o Needy people in a needy.json File.<br/> 
Run automation.js File. It will Automate Twitter and will Tweet an Automated Message from Our Personal Twitter Account to Evey Donor and Needy Person, containing the Hosted Link of ADIP Portal Website.<br/> 
Run htmlUpdate.js File. It will Display a List of All the Donor and Needy People Twitter UserIDs. It will also show the Tweet Delivery Status for Each Person.<br/> Through our Real-Time Chat Application Link, the user can join and connect with each other from our Real-Time Chat Application, where there is a Helping Community to assist you regarding any emergency requirements related to Covid Resources.<br/>
### For Running ADIP Portal Real-Time Chat Application-<br/> 
Open the ADIP Portal_ChatApp folder in VSCode Integrated Terminal and Write npm install in it.</br>
Also Install the required React npm modules & libraries by writing the following command in VSCode Integrated Terminal :<br/>
        npm i create-react-app react-router-dom react-scrollable-feed react-emoji socket.io-client query-string<br/>
Now write npm start for both Client and Server folders to start/run the ADIP Portal Chat Application.<br/>
### For Running ADIP Portal Website-<br/> 
Open the ADIP Portal_Website folder in VSCode Integrated Terminal and Write npm install in it.</br>
Now write node App.js to start/run the ADIP Portal Website.<br/><br/>
