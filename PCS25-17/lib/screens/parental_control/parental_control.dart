import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:sih_2022/screens/home/home_screen.dart';
import 'package:timelines/timelines.dart';

class ParentalControlPage extends StatefulWidget {
  ParentalControlPage({Key? key}) : super(key: key);

  @override
  State<ParentalControlPage> createState() => _ParentalControlPageState();
}

class _ParentalControlPageState extends State<ParentalControlPage> {
  late SharedPreferences _prefs;
  String childName = '';
  List<String> time2 = ['20', '30', '40', '50', '60', '70'];

  int id2 = 0;
  bool isSwitched = false;
  bool isSwitched2 = false;

  retrieveBoolValue() async {
    _prefs = await SharedPreferences.getInstance();
    bool? value = _prefs.getBool("specialyabled");
    if (value == null) {
      isSwitched2 = true;
    } else {
      isSwitched2 = value;
    }

    Future.delayed(Duration(seconds: 1));
  }

  saveStringValue(bool name) async {
    _prefs = await SharedPreferences.getInstance();
    _prefs.setBool('specialyabled', name);
    if (isSwitched2 == false) {
      setState(() {
        isSwitched2 = true;
      });
    } else {
      setState(() {
        isSwitched2 = false;
      });
    }
    await Future.delayed(Duration(seconds: 1));
    // await Restart.restartApp(webOrigin: HomeScreen.routeName);
  }

  void toggleSwitch(bool value) {
    if (isSwitched == false) {
      setState(() {
        isSwitched = true;
      });
    } else {
      setState(() {
        isSwitched = false;
      });
    }
  }

  retrieveStringValue2() async {
    _prefs = await SharedPreferences.getInstance();
    String? value = _prefs.getString("childname");

    if (value == null) {
      childName = 'q2a2';
    } else {
      childName = value;
    }

    await Future.delayed(Duration(seconds: 1));

    setState(() {});
  }

  @override
  void initState() {
    retrieveStringValue2();
    retrieveBoolValue();
    setState(() {});
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        return await Get.offAndToNamed(HomeScreen.routeName);
      },
      child: Material(
        color: Colors.grey[200],
        child: SingleChildScrollView(
          child: Column(children: [
            SizedBox(
              height: 40,
              width: MediaQuery.of(context).size.width,
            ),
            Text(
              "Parental Control",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 30),
            ),
            SizedBox(
              height: 30,
            ),
            Container(
                width: MediaQuery.of(context).size.width,
                height: 45,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    color: Colors.white),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                  child: Center(
                    child: Text(
                      childName,
                      style: TextStyle(color: Colors.grey, fontSize: 35),
                    ),
                  ),
                )),
            SizedBox(
              height: 30,
            ),
            Container(
                width: MediaQuery.of(context).size.width,
                height: 180,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    color: Colors.white),
                child: Center(
                  child: Column(
                    children: [
                      SizedBox(
                        height: 10,
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Padding(
                          padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                          child: Text(
                            'Set Daily PlayTime',
                            style: TextStyle(
                                fontSize: 25, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      Expanded(
                          child: ListView.builder(
                              shrinkWrap: true,
                              scrollDirection: Axis.horizontal,
                              itemCount: time2.length,
                              itemBuilder: (BuildContext context, int index) =>
                                  Container(
                                    width: 80,
                                    child: TimelineTile(
                                      mainAxisExtent: 150,
                                      direction: Axis.horizontal,
                                      contents: Column(
                                        children: [
                                          SizedBox(
                                            height: 2,
                                          ),
                                          InkWell(
                                              onTap: () {
                                                setState(() {
                                                  id2 = index;
                                                });
                                              },
                                              child:
                                                  Text('${time2[index]} min'))
                                        ],
                                      ),
                                      oppositeContents: id2 == index
                                          ? Column(
                                              children: [
                                                SizedBox(
                                                  height: 25,
                                                ),
                                                Container(
                                                  height: 30,
                                                  width: 50,
                                                  // color: Colors.redAccent,
                                                  decoration: BoxDecoration(
                                                      color: Colors.redAccent,
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                              5)),
                                                  child: Center(
                                                      child: Text(
                                                    '${time2[index]}',
                                                    style: TextStyle(
                                                        color: Colors.white,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        fontSize: 20),
                                                  )),
                                                ),
                                                SizedBox(
                                                  height: 5,
                                                ),
                                              ],
                                            )
                                          : null,
                                      node: TimelineNode(
                                          indicator: InkWell(
                                            onTap: () {
                                              setState(() {
                                                id2 = index;
                                              });
                                            },
                                            child: DotIndicator(
                                              color: Colors.redAccent,
                                              size: 15,
                                            ),
                                          ),
                                          startConnector: SolidLineConnector(
                                            thickness: 2,
                                            color: Colors.grey,
                                          ),
                                          endConnector: SolidLineConnector(
                                            color: Colors.grey,
                                            thickness: 2,
                                          )),
                                    ),
                                  ))),
                    ],
                  ),
                )),
            SizedBox(
              height: 30,
            ),
            Container(
              height: 170,
              width: MediaQuery.of(context).size.width,
              decoration: BoxDecoration(
                  color: Colors.white, borderRadius: BorderRadius.circular(20)),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 0, 0),
                child: Column(
                  // mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Activity",
                      style:
                          TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    Row(
                      children: [
                        Column(
                          children: [
                            Container(
                              height: 50,
                              width: 50,
                              decoration: BoxDecoration(
                                  color: Colors.redAccent,
                                  borderRadius: BorderRadius.circular(15)),
                            ),
                            SizedBox(
                              height: 5,
                            ),
                            Container(
                                width: 60,
                                child: Text(
                                  "Game A",
                                  textAlign: TextAlign.center,
                                )),
                          ],
                        ),
                        Column(
                          children: [
                            Container(
                              height: 50,
                              width: 50,
                              decoration: BoxDecoration(
                                  color: Colors.grey[300],
                                  borderRadius: BorderRadius.circular(15)),
                            ),
                            SizedBox(
                              height: 5,
                            ),
                            Container(
                                width: 60,
                                child: Text(
                                  "Game A",
                                  textAlign: TextAlign.center,
                                )),
                          ],
                        ),
                        Column(
                          children: [
                            Container(
                              height: 50,
                              width: 50,
                              decoration: BoxDecoration(
                                  color: Colors.grey,
                                  borderRadius: BorderRadius.circular(15)),
                            ),
                            SizedBox(
                              height: 5,
                            ),
                            Container(
                                width: 60,
                                child: Text(
                                  "Game A",
                                  textAlign: TextAlign.center,
                                )),
                          ],
                        )
                      ],
                    )
                  ],
                ),
              ),
            ),
            SizedBox(
              height: 30,
            ),
            Container(
                width: MediaQuery.of(context).size.width,
                height: 250,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    color: Colors.white),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 20, 0, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Allowed Content",
                        style: TextStyle(
                            fontSize: 25,
                            // fontWeight: FontWeight.bold,
                            color: Colors.black,
                            fontWeight: FontWeight.bold),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 0, 20, 0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Games',
                              style: TextStyle(color: Colors.grey),
                            ),
                            Transform.scale(
                                scale: 1.5,
                                child: Switch(
                                  onChanged: toggleSwitch,
                                  value: isSwitched,
                                  activeColor: Colors.red,
                                  activeTrackColor: Colors.grey,
                                  inactiveThumbColor: Colors.red,
                                  inactiveTrackColor: Colors.grey,
                                )),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 0, 20, 0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Tests',
                              style: TextStyle(color: Colors.grey),
                            ),
                            Transform.scale(
                                scale: 1.5,
                                child: Switch(
                                  onChanged: toggleSwitch,
                                  value: isSwitched,
                                  activeColor: Colors.red,
                                  activeTrackColor: Colors.grey,
                                  inactiveThumbColor: Colors.red,
                                  inactiveTrackColor: Colors.grey,
                                )),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 0, 20, 0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Articles',
                              style: TextStyle(color: Colors.grey),
                            ),
                            Transform.scale(
                                scale: 1.5,
                                child: Switch(
                                  onChanged: toggleSwitch,
                                  value: false,
                                  activeColor: Colors.red,
                                  activeTrackColor: Colors.grey,
                                  inactiveThumbColor: Colors.red,
                                  inactiveTrackColor: Colors.grey,
                                )),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 0, 20, 0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Text(
                                  'For Specially Abled',
                                  style: TextStyle(color: Colors.grey),
                                ),
                                Text(
                                  '(The App Will Restart)',
                                  style: TextStyle(color: Colors.red),
                                )
                              ],
                            ),
                            Transform.scale(
                                scale: 1.5,
                                child: Switch(
                                  onChanged: saveStringValue,
                                  value: isSwitched2,
                                  activeColor: Colors.red,
                                  activeTrackColor: Colors.grey,
                                  inactiveThumbColor: Colors.white,
                                  inactiveTrackColor: Colors.grey,
                                )),
                          ],
                        ),
                      ),
                    ],
                  ),
                )),
            SizedBox(
              height: 5,
            ),
          ]),
        ),
      ),
    );
  }
}
