// ignore_for_file: prefer_const_constructors, sort_child_properties_last, prefer_const_constructors_in_immutables, sized_box_for_whitespace, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/common/translator.dart';
import '../../controllers/controllers.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'home_screen.dart';

class ParentSettings extends StatefulWidget {
  ParentSettings({Key? key}) : super(key: key);

  @override
  State<ParentSettings> createState() => _ParentSettingsState();
}

class _ParentSettingsState extends State<ParentSettings> {
  final AuthController _auth = Get.find<AuthController>();
  final LanguageController _auth2 = Get.find<LanguageController>();
  late SharedPreferences _prefs;

  String name2 = "Enter Your Child Name";
  String childName = '';
  String langue = 'en';
  String newPass = "hello";
  String oldPass = '';
  String newPass2 = '';

  saveStringValue2(String name) async {
    _prefs = await SharedPreferences.getInstance();
    _prefs.setString('password', name);
  }

  // final controllerw = Get.put(ProfileController());
  saveStringValue(String name) async {
    _prefs = await SharedPreferences.getInstance();
    _prefs.setString('childname', name);
  }

  saveStringValue3(String name) async {
    _prefs = await SharedPreferences.getInstance();
    _prefs.setString('language', name);
  }

  retrieveStringValue() async {
    _prefs = await SharedPreferences.getInstance();
    String? value = _prefs.getString("childname");
    setState(() {
      childName = value as String;
    });
    Future.delayed(Duration(seconds: 1));
    setState(() {});
  }

  retrieveStringValue2() async {
    _prefs = await SharedPreferences.getInstance();
    String? value = _prefs.getString("language");
    setState(() {
      langue = value as String;
    });
    Future.delayed(Duration(seconds: 1));
    setState(() {});
  }

  // retrieveStringValue2() async {
  //   _prefs = await SharedPreferences.getInstance();
  //   String? value = _prefs.getString("password");
  //   setState(() {
  //     newPass = value as String;
  //   });
  //   print(newPass);
  //   Future.delayed(Duration(seconds: 1));
  //   setState(() {});
  // }

  final List<String> _mesaures = [
    'en',
    'hi',
    'ar',
    'pa',
    'ja',
  ];

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        Get.put(LanguageController());
        Get.offAllNamed(HomeScreen.routeName);
        return Future.delayed(Duration(microseconds: 0));
      },
      child: Material(
        color: Colors.grey[200],
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                      height: 10, width: MediaQuery.of(context).size.width),
                  Text(
                    trans2[26],
                    style: TextStyle(fontSize: 35, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size(MediaQuery.of(context).size.width, 50),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30.0),
                      ),
                      backgroundColor: Colors.white,
                      elevation: 0,
                    ),
                    onPressed: () => showDialog<String>(
                      context: context,
                      builder: (BuildContext context) => AlertDialog(
                        title: Text(trans2[28]),
                        actionsPadding: EdgeInsets.all(20),
                        actions: <Widget>[
                          Container(
                            width: MediaQuery.of(context).size.width / 2.5,
                            height: 80,
                            child: TextFormField(
                              decoration: InputDecoration(
                                labelText: trans2[29],
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(5),
                                  ),
                                ),
                              ),
                              onChanged: (value) {
                                setState(() {
                                  name2 = value;
                                });
                              },
                            ),
                          ),
                          ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.red),
                              onPressed: () {
                                setState(() {
                                  saveStringValue(name2);
                                });
                                setState(() {
                                  retrieveStringValue();
                                  Navigator.pop(context, 'Cancel');
                                });
                              },
                              child: Text("Submit")),
                        ],
                      ),
                    ),
                    child: Text(
                      trans2[28],
                      style: TextStyle(color: Colors.grey, fontSize: 25),
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Container(
                    height: 140,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(30),
                      color: Colors.white,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                          child: Text(
                            'Set Your Prefered Language',
                            style: TextStyle(color: Colors.grey, fontSize: 20),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.fromLTRB(40, 0, 0, 0),
                          child: Align(
                            alignment: Alignment.topLeft,
                            child: Container(
                              decoration: BoxDecoration(
                                  border: Border.all(width: 0.5),
                                  borderRadius: BorderRadius.circular(40)),
                              child: DropdownButton(
                                items: _mesaures
                                    .map((String value) =>
                                        DropdownMenuItem<String>(
                                          child: Row(
                                            children: [
                                              SizedBox(
                                                width: 30.00,
                                              ),
                                              Text(value,
                                                  style: TextStyle(
                                                      fontSize: 20.00,
                                                      color: Colors.black)),
                                              SizedBox(
                                                width: 10.00,
                                              ),
                                            ],
                                          ),
                                          value: value,
                                        ))
                                    .toList(),
                                iconSize: 15,
                                elevation: 16,
                                icon: Icon(
                                  Icons.arrow_drop_down_sharp,
                                  size: 40,
                                ),
                                underline: Container(
                                  decoration: BoxDecoration(),
                                ),
                                onChanged: (value) {
                                  setState(() {
                                    langue = value as String;
                                    saveStringValue3(langue);
                                    setState(() {});
                                    // Get.put(LanguageController());
                                    // Get.offAllNamed(HomeScreen.routeName);
                                    _auth2.retrieveStringValue2();

                                    setState(() {});
                                  });
                                },
                                value: langue,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Container(
                    width: MediaQuery.of(context).size.width,
                    height: 200,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(30),
                        color: Colors.white),
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                            height: 10,
                          ),
                          Text(
                            trans2[30],
                            style: TextStyle(color: Colors.grey, fontSize: 20),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Container(
                            width: MediaQuery.of(context).size.width / 1.6,
                            height: 45,
                            child: TextFormField(
                              decoration: InputDecoration(
                                labelText: trans2[31],
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(15),
                                  ),
                                ),
                              ),
                              onChanged: (value) {
                                setState(() {
                                  oldPass = value;
                                });
                              },
                            ),
                          ),
                          SizedBox(
                            height: 5,
                          ),
                          Container(
                            width: MediaQuery.of(context).size.width / 1.6,
                            height: 45,
                            child: TextFormField(
                              decoration: InputDecoration(
                                labelText: trans2[32],
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(15),
                                  ),
                                ),
                              ),
                              onChanged: (value) {
                                setState(() {
                                  newPass2 = value;
                                });
                              },
                            ),
                          ),
                          ElevatedButton(
                            onPressed: () {
                              saveStringValue2(oldPass);
                              // retrieveStringValue2();
                              setState(() {});
                              oldPass.toString() == 'hello'
                                  ? showDialog<String>(
                                      context: context,
                                      builder: (BuildContext context) =>
                                          AlertDialog(
                                        title: const Text("Change Kid's Name"),
                                        actionsPadding: EdgeInsets.all(20),
                                        actions: <Widget>[
                                          Text("Password Changed Successfully"),
                                        ],
                                      ),
                                    )
                                  : showDialog<String>(
                                      context: context,
                                      builder: (BuildContext context) =>
                                          AlertDialog(
                                            title: Text(trans2[28]),
                                            actionsPadding: EdgeInsets.all(20),
                                            actions: <Widget>[
                                              Text(trans2[33]),
                                            ],
                                          ));
                            },
                            child: Text(
                              "Set",
                            ),
                            style: ElevatedButton.styleFrom(
                                shape: RoundedRectangleBorder(
                                  side: BorderSide(width: 0.5),
                                  borderRadius: BorderRadius.circular(10.0),
                                ),
                                elevation: 0,
                                backgroundColor: Colors.red),
                          )
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  Container(
                    height: 60,
                    width: MediaQuery.of(context).size.width,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: Colors.white,
                    ),
                    child: Center(
                        child: Text(
                      trans2[34],
                      style: TextStyle(fontSize: 20),
                    )),
                  ),
                  ElevatedButton(
                      style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white),
                      onPressed: () {
                        _auth.getUser() == null
                            ? Get.find<AuthController>().navigateToLogin()
                            : Get.find<AuthController>().signOut();
                      },
                      child: Text(
                          _auth.getUser() == null ? "Sign In" : "Sign Out",
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 15,
                              fontWeight: FontWeight.bold))),
                  SizedBox(
                    height: 20,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
