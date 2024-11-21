// ignore_for_file: prefer_const_constructors, prefer_const_constructors_in_immutables, avoid_unnecessary_containers, prefer_const_literals_to_create_immutables, depend_on_referenced_packages

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';

import 'package:intl/intl.dart';
import 'package:sih_2022/controllers/auth_controller.dart';
import 'package:sih_2022/screens/screens.dart';

class SigninPage extends StatefulWidget {
  SigninPage({Key? key}) : super(key: key);
  static String routeName = '/signin';

  @override
  State<SigninPage> createState() => _SigninPageState();
}

class _SigninPageState extends State<SigninPage> {
  var demo = '';
  int pass = 0;
  final controller = Get.put(AuthController());

  TextEditingController dateinput = TextEditingController();

  @override
  void initState() {
    dateinput.text = ""; //set the initial value of text field
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        Get.offAllNamed(LoginScreen.routeName);
        return Future.delayed(Duration(microseconds: 2));
      },
      child: Material(
        color: Colors.white,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                SizedBox(
                  height: 35,
                ),
                Text(
                  "Sign up !",
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 4, 0, 2),
                  child: Text("Create Account by Filling the form below .",
                      style: TextStyle(fontSize: 13, color: Colors.grey)),
                ),
                SizedBox(
                  height: 30,
                ),
                TextFormField(
                  decoration: InputDecoration(
                    icon: Icon(Icons.person_outline_outlined, size: 30),
                    labelText: 'Enter Name of the child',
                  ),
                ),
                TextFormField(
                  decoration: InputDecoration(
                    icon: Icon(
                      Icons.person_outline_outlined,
                      size: 30,
                    ),
                    labelText: 'Enter Name of the Parent',
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                TextField(
                  controller: dateinput,
                  decoration: InputDecoration(
                      icon: Icon(
                        Icons.calendar_today,
                        size: 30,
                      ),
                      labelText: "Enter D.O.B Of the Child"),
                  readOnly: true,
                  onTap: () async {
                    DateTime? pickedDate = await showDatePicker(
                        context: context,
                        initialDate: DateTime.now(),
                        firstDate: DateTime(1990),
                        lastDate: DateTime.now());

                    if (pickedDate != null) {
                      String formattedDate =
                          DateFormat('yyyy-MM-dd').format(pickedDate);

                      setState(() {
                        dateinput.text = formattedDate;
                      });
                    } else {}
                  },
                ),
                TextFormField(
                    decoration: InputDecoration(
                        icon: Icon(
                          Icons.call_outlined,
                          size: 30,
                        ),
                        labelText: 'Enter Phone Number of the parent'),
                    keyboardType: TextInputType.number,
                    inputFormatters: <TextInputFormatter>[
                      FilteringTextInputFormatter.digitsOnly
                    ],
                    onChanged: (value) {}),
                TextFormField(
                  decoration: InputDecoration(
                      icon: Icon(
                        Icons.email_outlined,
                        size: 30,
                      ),
                      labelText: 'Enter Email-Id Of the Parent',
                      hintText: 'example@gmail.com'),
                ),
                TextFormField(
                    decoration: InputDecoration(
                        icon: Icon(
                          Icons.document_scanner_outlined,
                          size: 30,
                        ),
                        labelText: 'Enter Adhaar Number of the Child'),
                    keyboardType: TextInputType.number,
                    inputFormatters: <TextInputFormatter>[
                      FilteringTextInputFormatter.digitsOnly
                    ],
                    onChanged: (value) {}),
                SizedBox(
                  height: 50,
                ),
                Center(
                  child: ElevatedButton(
                    style: TextButton.styleFrom(
                        shadowColor: Colors.red,
                        backgroundColor: Colors.red,
                        minimumSize: Size(360, 60)),
                    onPressed: () {
                      Get.offAllNamed(HomeScreen.routeName);
                    },
                    child: Text("Next"),
                  ),
                ),
                SizedBox(
                  height: 40,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Do You already have account ?"),
                    InkWell(
                        onTap: () {
                          setState(() {
                            Get.offAllNamed(LoginScreen.routeName);
                          });
                        },
                        child: Text(
                          "LOGIN",
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ))
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
