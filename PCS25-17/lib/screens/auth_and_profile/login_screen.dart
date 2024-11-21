// ignore_for_file: prefer_const_constructors, prefer_const_constructors_in_immutables, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/controllers/auth_controller.dart';
import 'package:sih_2022/screens/auth_and_profile/singin_page.dart';
import 'package:sih_2022/screens/home/home_screen.dart';

class LoginScreen extends StatefulWidget {
  LoginScreen({Key? key}) : super(key: key);
  static String routeName = '/login';

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final controller = Get.put(AuthController());
  bool onchanged = true;
  late Widget login = childLogin();

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        // showDialog(context: context, builder: )
        Get.offAllNamed(HomeScreen.routeName);
        return Future.delayed(Duration(microseconds: 2));
      },
      child: Material(
        child: Container(
            constraints: const BoxConstraints(maxWidth: kTabletChangePoint),
            padding: const EdgeInsets.symmetric(horizontal: 20),
            alignment: Alignment.center,
            decoration: BoxDecoration(color: Colors.white),
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    height: 60,
                  ),
                  Text(
                    "Login Account",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0, 4, 0, 2),
                    child: Text(
                      "Hello , Welcome Back to your Account",
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                          color: Colors.grey),
                    ),
                  ),
                  SizedBox(
                    height: 50,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      InkWell(
                        onTap: () {
                          setState(() {
                            login = childLogin();
                            onchanged = true;
                          });
                        },
                        child: Container(
                          decoration: BoxDecoration(
                              boxShadow: [
                                BoxShadow(
                                    color: Colors.grey,
                                    blurRadius: 2.0,
                                    offset: Offset(2.0, 2.0))
                              ],
                              borderRadius: BorderRadius.only(
                                  topLeft: Radius.circular(8),
                                  bottomLeft: Radius.circular(8)),
                              border: Border.all(color: Colors.black38),
                              color: onchanged ? Colors.red : Colors.white),
                          width: MediaQuery.of(context).size.width / 2.3,
                          height: 60,
                          // color: Colors.red,
                          child: Center(
                              child: Text(
                            "Child Login",
                            style: TextStyle(
                                color: onchanged ? Colors.white : Colors.black,
                                fontSize: 18,
                                fontWeight: FontWeight.bold),
                          )),
                        ),
                      ),
                      InkWell(
                        onTap: () {
                          setState(() {
                            onchanged = false;
                            login = parentLogin();
                          });
                          setState(() {});
                        },
                        child: Container(
                          width: MediaQuery.of(context).size.width / 2.3,
                          height: 60,
                          decoration: BoxDecoration(
                              boxShadow: [
                                BoxShadow(
                                    color: Colors.grey,
                                    blurRadius: 2.0,
                                    offset: Offset(2.0, 2.0))
                              ],
                              borderRadius: BorderRadius.only(
                                  topRight: Radius.circular(8),
                                  bottomRight: Radius.circular(8)),
                              border: Border.all(color: Colors.black38),
                              color: onchanged ? Colors.white : Colors.red),
                          // color: Colors.red,
                          child: Center(
                              child: Text(
                            "Parent Login",
                            style: TextStyle(
                                color: onchanged ? Colors.black : Colors.white,
                                fontSize: 18,
                                fontWeight: FontWeight.bold),
                          )),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 60,
                  ),
                  login,

                  SizedBox(
                    height: 10,
                  ),
                  ElevatedButton(
                      style: TextButton.styleFrom(
                          minimumSize: Size(360, 60),
                          backgroundColor: Colors.red),
                      onPressed: () {
                        setState(() {});
                      },
                      child: Icon(
                        Icons.home,
                        color: Colors.white,
                      )),
                  SizedBox(
                    height: 80,
                  ),
                  // Center(
                  // child: Text("________________Or Sign In With________________")),
                  // SizedBox(height: 30,),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Not Registered Yet ?",
                      ),
                      InkWell(
                          onTap: () {
                            setState(() {
                              Get.offAllNamed(SigninPage.routeName);
                            });
                          },
                          child: Text(
                            "Create Account",
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ))
                    ],
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Container(
                    height: 40,
                    width: 120,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white),
                      onPressed: () {
                        controller.siginInWithGoogle();
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          SvgPicture.asset(
                            'assets/icons/google.svg',
                            height: 30,
                            width: 30,
                          ),
                          Text(
                            '  Google',
                            style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  )
                ],
              ),
            )),
      ),
    );
  }
}

Widget childLogin() {
  return Column(
    children: [
      TextFormField(
        decoration: InputDecoration(
          labelText: 'Roll Number',
          border: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.red),
            borderRadius: BorderRadius.all(
              Radius.circular(15),
            ),
          ),
        ),
        onChanged: (value) {},
      ),
      SizedBox(
        height: 15,
      ),
      TextFormField(
        keyboardType:
            TextInputType.numberWithOptions(signed: true, decimal: true),
        decoration: InputDecoration(
          labelText: 'Password',
          border: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.red),
            borderRadius: BorderRadius.all(
              Radius.circular(15),
            ),
          ),
        ),
        onChanged: (value) {},
      ),
    ],
  );
}

Widget parentLogin() {
  return Column(
    children: [
      TextFormField(
        decoration: InputDecoration(
          labelText: 'Email Address',
          border: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.red),
            borderRadius: BorderRadius.all(
              Radius.circular(15),
            ),
          ),
        ),
        onChanged: (value) {},
      ),
      SizedBox(
        height: 15,
      ),
      TextFormField(
        keyboardType:
            TextInputType.numberWithOptions(signed: true, decimal: true),
        decoration: InputDecoration(
          labelText: 'Password',
          border: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.red),
            borderRadius: BorderRadius.all(
              Radius.circular(15),
            ),
          ),
        ),
        onChanged: (value) {},
      ),
    ],
  );
}
