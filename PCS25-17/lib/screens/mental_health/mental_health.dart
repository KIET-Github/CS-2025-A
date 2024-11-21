// ignore_for_file: prefer_const_constructors, prefer_const_constructors_in_immutables, prefer_const_literals_to_create_immutables, duplicate_ignore

import 'package:flutter/material.dart';
import 'package:sih_2022/screens/mental_health/mental_health_check_page.dart';
import 'package:sih_2022/screens/music/music_page.dart';

import '../community_forum2/doctors_homepage.dart';
import '../community_forum2/medidate.dart';

class HealthPage extends StatefulWidget {
  HealthPage({Key? key}) : super(key: key);

  @override
  State<HealthPage> createState() => _HealthPageState();
}

class _HealthPageState extends State<HealthPage> {
  @override
  Widget build(BuildContext context) {
    return Material(
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Column(
            // mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            // ignore: prefer_const_literals_to_create_immutables
            children: [
              SizedBox(
                height: 60,
              ),
              Center(
                child: Text(
                  "Mental Health 🧘🏻‍♂️",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 30,
                  ),
                ),
              ),
              SizedBox(
                height: 30,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Card(
                    margin: EdgeInsets.fromLTRB(0, 20, 0, 0),
                    elevation: 5.00,
                    shadowColor: Colors.grey,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30)),
                    color: Color.fromRGBO(252, 248, 232, 1),
                    child: InkWell(
                      onTap: () {
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => MusicPage()));
                      },
                      child: SizedBox(
                        height: 220,
                        width: MediaQuery.of(context).size.width / 2.2,
                        child: Container(
                          width: 400 / 2.5,
                          margin: EdgeInsets.fromLTRB(15, 0, 10, 0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Image(image: AssetImage('assets/images/c.png')),
                              SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Your Daily   Meditation Sessions",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15),
                              ),
                              SizedBox(
                                height: 10,
                              ),
                              Padding(
                                padding: const EdgeInsets.all(5.0),
                                child: Text(
                                  "Feel the peace for 10 Minutes Today",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      color: Color.fromARGB(182, 46, 46, 46),
                                      fontSize: 15),
                                ),
                              ),
                              SizedBox(
                                height: 10,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Card(
                    margin: EdgeInsets.fromLTRB(0, 20, 0, 0),
                    elevation: 5.00,
                    shadowColor: Colors.grey,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30)),
                    color: Color.fromRGBO(212, 246, 204, 1),
                    child: InkWell(
                      onTap: () {
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => MentalHealthPage()));
                      },
                      child: SizedBox(
                        height: 220,
                        width: MediaQuery.of(context).size.width / 2.2,
                        child: Container(
                          width: 400 / 2.5,
                          margin: EdgeInsets.fromLTRB(15, 10, 10, 0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Image(image: AssetImage('assets/images/b.png')),
                              SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Mental Health Check",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15),
                              ),
                              SizedBox(
                                height: 10,
                              ),
                              Padding(
                                padding: const EdgeInsets.all(5.0),
                                child: Text(
                                  "Monitor your child’s Mental Health by asking these simple questions",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      color: Color.fromARGB(182, 46, 46, 46),
                                      fontSize: 15),
                                ),
                              ),
                              SizedBox(
                                height: 10,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Card(
                    margin: EdgeInsets.fromLTRB(0, 20, 0, 0),
                    elevation: 5.00,
                    shadowColor: Colors.grey,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30)),
                    color: Color.fromRGBO(200, 182, 226, 1),
                    child: InkWell(
                      onTap: () {
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => Meditate()));
                      },
                      child: SizedBox(
                        height: 220,
                        width: MediaQuery.of(context).size.width / 2.2,
                        child: Container(
                          width: 400 / 2.5,
                          margin: EdgeInsets.fromLTRB(15, 10, 10, 0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Image(image: AssetImage('assets/images/a.png')),
                              SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Learn how to meditate",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15),
                              ),
                              SizedBox(
                                height: 10,
                              ),
                              Padding(
                                padding: const EdgeInsets.all(2.0),
                                child: Text(
                                  "Enhance your meditation knowledge",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      color: Color.fromARGB(182, 46, 46, 46),
                                      fontSize: 15),
                                ),
                              ),
                              SizedBox(
                                height: 10,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Card(
                    margin: EdgeInsets.fromLTRB(0, 20, 0, 0),
                    elevation: 5.00,
                    shadowColor: Colors.grey,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30)),
                    color: Color.fromRGBO(154, 182, 193, 1),
                    child: InkWell(
                      onTap: () {
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => MentalHealthPage()));
                      },
                      child: SizedBox(
                        height: 220,
                        width: MediaQuery.of(context).size.width / 2.2,
                        child: Container(
                          width: 400 / 2.5,
                          margin: EdgeInsets.fromLTRB(15, 10, 10, 0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Image(
                                  image:
                                      AssetImage('assets/images/search.png')),
                              SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Mental Health Check",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15),
                              ),
                              SizedBox(
                                height: 10,
                              ),
                              Padding(
                                padding: const EdgeInsets.all(7.0),
                                child: Text(
                                  "Check what experts have to say about mental health",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      color: Color.fromARGB(182, 46, 46, 46),
                                      fontSize: 15),
                                ),
                              ),
                              SizedBox(
                                height: 10,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              InkWell(
                onTap: () {
                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => DoctorHomePage()));
                },
                child: Card(
                  margin: EdgeInsets.fromLTRB(0, 20, 0, 0),
                  elevation: 5.00,
                  shadowColor: Colors.grey,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30)),
                  color: Color.fromRGBO(226, 182, 182, 1),
                  child: SizedBox(
                    height: 220,
                    width: MediaQuery.of(context).size.width / 2.2,
                    child: Padding(
                      padding: const EdgeInsets.all(4.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Image(
                              image: NetworkImage(
                                  'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2Fimage-removebg-preview%20(9)%201.png?alt=media&token=f5fbd289-5782-4318-b72c-00cf3a764bb3')),
                          SizedBox(
                            height: 10,
                          ),
                          Text(
                            "Contact Child Specialists",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 15),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Padding(
                            padding: const EdgeInsets.all(2.0),
                            child: Text(
                              "Contact List of Child Specialists based on your location.",
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  color: Color.fromARGB(182, 46, 46, 46),
                                  fontSize: 15),
                            ),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(
                width: 10,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
