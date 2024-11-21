// ignore_for_file: prefer_const_constructors_in_immutables, prefer_const_constructors, sized_box_for_whitespace

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:liquid_pull_to_refresh/liquid_pull_to_refresh.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sih_2022/screens/child/avatars.dart';
import 'package:sih_2022/screens/child/home.dart';
import 'package:sih_2022/screens/home/home_screen.dart';

import '../../controllers/avatars/avatar_controller.dart';

class SettingsPage extends StatefulWidget {
  SettingsPage({Key? key}) : super(key: key);

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  final productController = Get.put(AvatarController());
  late SharedPreferences _prefs;
  String password = '';
  String newvalue = '';

  retrieveStringValue() async {
    _prefs = await SharedPreferences.getInstance();
    String? value = _prefs.getString("password");
    setState(() {
      password = value as String;
    });

    Future.delayed(Duration(seconds: 1));
    setState(() {});
  }

  String avatar = '';
  retrieveStringValue2() async {
    _prefs = await SharedPreferences.getInstance();
    String? value = _prefs.getString("avatar");
    setState(() {
      if (value == null) {
      } else {
        avatar = value as String;
      }
    });

    Future.delayed(Duration(seconds: 1));
    setState(() {});
  }

  saveStringValue2(String name) async {
    _prefs = await SharedPreferences.getInstance();
    _prefs.setString('avatar', name);
  }

  @override
  void initState() {
    retrieveStringValue();
    retrieveStringValue2();
    setState(() {});
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () async {
          Get.offAllNamed(HomeScreen1.routeName);
          return Future.delayed(Duration(microseconds: 0));
        },
        child: Material(
          color: Colors.grey[200],
          child: SingleChildScrollView(
            child: Column(
              children: [
                SizedBox(
                  height: 40,
                ),
                // AvatarPage(),
                //
                Text(
                  "Settings",
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                ),
                SizedBox(
                  height: 30,
                ),
                Container(
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(25)),
                  height: 280,
                  width: MediaQuery.of(context).size.width,
                  child: Column(
                    children: [
                      SizedBox(
                        height: 10,
                      ),
                      Row(
                        children: [
                          Padding(
                            padding: const EdgeInsets.fromLTRB(15, 0, 0, 0),
                            child: Container(
                              width: MediaQuery.of(context).size.width / 1.64,
                              child: Text(
                                "Choose Your Avatar!",
                                style: TextStyle(
                                    fontSize: 26, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                          SizedBox(
                            width: 20,
                          ),
                          Container(
                            // color: Colors.redAccent,
                            width: 100,
                            height: 100,
                            decoration: BoxDecoration(
                                color: Colors.grey,
                                borderRadius: BorderRadius.circular(45)),
                            child: Column(
                              children: [
                                avatar == ''
                                    ? Container()
                                    : Image(
                                        height: 90,
                                        width: 90,
                                        image: NetworkImage(avatar)),
                                SizedBox(
                                  height: 5,
                                )
                              ],
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 50,
                      ),
                      Expanded(
                        // flex: 1,
                        child:
                            GetBuilder<AvatarController>(builder: (controller) {
                          return ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemBuilder: (context, index) {
                              return Padding(
                                padding:
                                    const EdgeInsets.fromLTRB(10, 4, 10, 4),
                                child: Align(
                                  alignment: Alignment.topLeft,
                                  child: InkWell(
                                    onTap: () {
                                      setState(() {
                                        saveStringValue2(productController
                                            .productData[index]
                                            .imageUrl as String);
                                        retrieveStringValue2();
                                      });
                                    },
                                    child: Image(
                                        height: 80,
                                        width: 80,
                                        image: NetworkImage(productController
                                            .productData[index]
                                            .imageUrl as String)),
                                  ),
                                ),
                              );
                            },
                            itemCount: productController.productData.length,
                          );
                        }),
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                Container(
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(25)),
                  height: 60,
                  width: MediaQuery.of(context).size.width,
                  child: Center(
                    child: Text(
                      "Enter Your NickName",
                      style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey),
                    ),
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                Container(
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(25)),
                  height: 60,
                  width: MediaQuery.of(context).size.width,
                  child: Center(
                    child: Text(
                      "View LeaderBoard",
                      style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey),
                    ),
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                Center(
                    child: InkWell(
                        onTap: () => showDialog<String>(
                              context: context,
                              builder: (BuildContext context) => AlertDialog(
                                title: const Text(
                                    "Enter the Password To Enter Child Mode"),
                                actionsPadding: EdgeInsets.all(20),
                                actions: <Widget>[
                                  Container(
                                    width:
                                        MediaQuery.of(context).size.width / 2.5,
                                    height: 80,
                                    child: TextFormField(
                                      decoration: InputDecoration(
                                        labelText: 'Enter the Password ',
                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.all(
                                            Radius.circular(5),
                                          ),
                                        ),
                                      ),
                                      onChanged: (value) {
                                        setState(() {
                                          newvalue = value;
                                        });
                                      },
                                    ),
                                  ),
                                  ElevatedButton(
                                      onPressed: () {
                                        setState(() {});
                                        password == newvalue
                                            ? Get.offAllNamed(
                                                HomeScreen.routeName)
                                            : ScaffoldMessenger.of(context)
                                                .showSnackBar(const SnackBar(
                                                    duration:
                                                        Duration(seconds: 2),
                                                    content: Text(
                                                        'Wrong Password')));
                                      },
                                      child: Text("Login")),
                                ],
                              ),
                            ),
                        child: Container(
                          // color: Colors.red[400],
                          decoration: BoxDecoration(
                              color: Colors.redAccent,
                              borderRadius: BorderRadius.circular(25)),
                          height: 80,
                          width: MediaQuery.of(context).size.width,
                          child: Center(
                              child: Text(
                            "Back To Parent Mode",
                            style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 25),
                          )),
                        ))),
              ],
            ),
          ),
        ));
  }
}
