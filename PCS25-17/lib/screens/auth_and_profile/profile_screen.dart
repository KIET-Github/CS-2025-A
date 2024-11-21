// ignore_for_file: prefer_const_constructors, avoid_unnecessary_containers, curly_braces_in_flow_control_structures, prefer_const_constructors_in_immutables, prefer_const_literals_to_create_immutables, no_leading_underscores_for_local_identifiers, sized_box_for_whitespace

import 'dart:async';

// import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pie_chart/pie_chart.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/controllers/article/piechart_controller.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/screens/screens.dart';
import 'package:sih_2022/widgets/widgets.dart';

import '../../controllers/common/translator.dart';
import 'line_chart.dart';
// import '../physical_health/lib/data/line_titles.dart';

//

class ProfileScreen extends StatefulWidget {
  ProfileScreen({Key? key}) : super(key: key);
  static const String routeName = '/profile';

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen>
    with TickerProviderStateMixin {
  ScrollController scrollController = ScrollController(
    initialScrollOffset: 10, // or whatever offset you wish
    keepScrollOffset: true,
  );
  bool loading = true;
  final contro = Get.put(PieChartController());
  late SharedPreferences _prefs;
  String childName = '';
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

  retrieveStringValue() async {
    _prefs = await SharedPreferences.getInstance();
    String? value = _prefs.getString("childname");
    setState(() {
      if (value == null) {
        childName = '';
      } else {
        childName = value;
      }
    });
    setState(() {});
    await Future.delayed(Duration(seconds: 1));
  }

  @override
  void initState() {
    Future.delayed(Duration(seconds: 10));
    retrieveStringValue();
    retrieveStringValue2();
    setState(() {
      contro.getAllData();
    });

    setState(() {});
    super.initState();
  }

  List<Color> colorList = [
    Color.fromRGBO(82, 98, 255, 1),
    Color.fromRGBO(252, 91, 57, 1),
    Color.fromRGBO(255, 171, 67, 1),
    Color.fromRGBO(46, 198, 255, 1),
    Color.fromRGBO(123, 201, 82, 1),
    Color.fromRGBO(139, 135, 130, 1),
    Color.fromARGB(199, 127, 89, 229),
  ];

  // List<FlSpot> data2 = [
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  // ];
  // List<FlSpot> data3 = [
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  // ];
  // List<FlSpot> data4 = [
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  //   FlSpot(24, 0),
  // ];
  // void addData() {
  //   int i = 0;
  //   Get.lazyPut(() => ProfileController());
  //   final controllerw = Get.put(ProfileController());
  //   for (i - 0; i < controllerw.allRecentTest.length; i = i + 1) {
  //     if (controllerw.allRecentTest[i].papername == "Brain Test" ||
  //         controllerw.allRecentTest[i].papername == "Brain Booster" ||
  //         controllerw.allRecentTest[i].papername == "Brain Blaster") {
  //       data2[i] = FlSpot(
  //         (controllerw.allRecentTest[i].savedtime as double),
  //         (controllerw.allRecentTest[i].points as double),
  //       );
  //     } else {
  //       continue;
  //     }
  //     setState(() {});
  //   }
  // }

  // void addData2() {
  //   int i = 0;
  //   Get.lazyPut(() => ProfileController());
  //   final controllerw = Get.put(ProfileController());
  //   for (i - 0; i < controllerw.allRecentTest.length; i = i + 1) {
  //     if (controllerw.allRecentTest[i].papername == "Emotion Test") {
  //       data3[i] = FlSpot(
  //         (controllerw.allRecentTest[i].time as double),
  //         (controllerw.allRecentTest[i].points as double),
  //       );
  //     } else {
  //       continue;
  //     }
  //     setState(() {});
  //   }
  // }

  // void addData3() {
  //   int i = 0;
  //   Get.lazyPut(() => ProfileController());
  //   final controllerw = Get.put(ProfileController());
  //   for (i - 0; i < controllerw.allRecentTest.length; i = i + 1) {
  //     if (controllerw.allRecentTest[i].papername == "Emotion Test") {
  //       data4[i] = FlSpot(
  //         (controllerw.allRecentTest[i].savedtime as double),
  //         (controllerw.allRecentTest[i].points as double),
  //       );
  //     } else {
  //       continue;
  //     }
  //     setState(() {});
  //   }
  // }

  // Widget bottomTitleWidgets(double value, TitleMeta meta) {
  //   const style = TextStyle(
  //     color: Color(0xff68737d),
  //     fontWeight: FontWeight.bold,
  //     fontSize: 16,
  //   );
  //   Widget text;
  //   switch (value.toInt()) {
  //     case 0:
  //       text = const Text('26', style: style);
  //       break;
  //     case 1:
  //       text = const Text('27', style: style);
  //       break;
  //     case 2:
  //       text = const Text('28', style: style);
  //       break;
  //     case 3:
  //       text = const Text('30', style: style);
  //       break;
  //     case 4:
  //       text = const Text('31', style: style);
  //       break;
  //     case 5:
  //       text = const Text('01', style: style);
  //       break;
  //     case 6:
  //       text = const Text('02', style: style);
  //       break;
  //     case 7:
  //       text = const Text('03', style: style);
  //       break;
  //     default:
  //       text = const Text('', style: style);
  //       break;
  //   }

  //   return SideTitleWidget(
  //     axisSide: meta.axisSide,
  //     space: 8.0,
  //     child: text,
  //   );
  // }

  // List<Color> gradientColors = [
  //   const Color(0xff23b6e6),
  //   const Color(0xff02d39a),
  // ];

  // Widget leftTitleWidgets(double value, TitleMeta meta) {
  //   const style = TextStyle(
  //     color: Color(0xff67727d),
  //     fontWeight: FontWeight.bold,
  //     fontSize: 15,
  //   );
  //   String text;
  //   switch (value.toInt()) {
  //     case 1:
  //       text = '100';
  //       break;
  //     case 3:
  //       text = '200';
  //       break;
  //     case 5:
  //       text = '300';
  //       break;
  //     default:
  //       return Container();
  //   }

  //   return Text(text, style: style, textAlign: TextAlign.left);
  // }
  Widget pieChartExampleOne() {
    return PieChart(
      key: ValueKey(0),
      dataMap: contro.catMap,
      initialAngleInDegree: 5,
      animationDuration: Duration(milliseconds: 2000),
      chartType: ChartType.ring,
      chartRadius: 200,
      ringStrokeWidth: 35,
      colorList: colorList,
      chartLegendSpacing: 32,
      chartValuesOptions: ChartValuesOptions(
          showChartValuesOutside: true,
          showChartValuesInPercentage: true,
          showChartValueBackground: true,
          showChartValues: true,
          chartValueStyle:
              TextStyle(fontWeight: FontWeight.bold, color: Colors.black)),
      centerText: 'Test Results',
      legendOptions: LegendOptions(
          showLegendsInRow: true,
          showLegends: true,
          legendShape: BoxShape.circle,
          legendPosition: LegendPosition.top,
          legendTextStyle: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 20,
            color: Colors.black,
          )),
    );
  }

  @override
  Widget build(BuildContext context) {
    final AuthController _auth = Get.find<AuthController>();
    TabController tabcontoller = TabController(length: 4, vsync: this);
    final controllerw = Get.put(ProfileController());
    return WillPopScope(
      onWillPop: () async {
        Get.put(LanguageController());
        Get.offAllNamed(HomeScreen.routeName);
        return Future.delayed(Duration(microseconds: 0));
      },
      child: Material(
        child: Scaffold(
          body: Container(
            color: Colors.grey[200],
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    height: 40,
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(30, 10, 30, 0),
                    child: Container(
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          color: Colors.white),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                            height: 20,
                          ),
                          Container(
                            width: MediaQuery.of(context).size.width,
                            height: 80,
                            child: Row(
                              children: [
                                SizedBox(
                                  width: 40,
                                ),
                                CircleAvatar(
                                  radius: 30,
                                  foregroundImage: _auth.getUser() == null
                                      ? null
                                      : avatar == ''
                                          ? NetworkImage(
                                              _auth.getUser()!.photoURL!)
                                          : NetworkImage(avatar),
                                  backgroundColor: Colors.grey,
                                ),
                                const SizedBox(
                                  width: 20,
                                ),
                                Text(
                                  _auth.getUser() == null
                                      ? "Hello Mate"
                                      : childName,
                                  style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold),
                                )
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(30, 5, 30, 5),
                    child: Container(
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          color: Colors.white),
                      height: 150,
                      width: MediaQuery.of(context).size.width,
                      child: Column(
                        children: [
                          Align(
                            alignment: Alignment.centerLeft,
                            child: Padding(
                              padding: const EdgeInsets.fromLTRB(20, 5, 0, 0),
                              child: Text(
                                "Badges",
                                style: TextStyle(
                                    fontSize: 24, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                          SizedBox(
                            height: 5,
                          ),
                          Padding(
                            padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                            child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceAround,
                                children: [
                                  Container(
                                    child: Column(children: [
                                      CircleAvatar(
                                          radius: 30,
                                          backgroundColor: Colors.white,
                                          child: Image.asset(
                                              'assets/images/badge4.png')),
                                      Text("5 Star"),
                                    ]),
                                  ),
                                  SizedBox(
                                    width: 15,
                                  ),
                                  Container(
                                    child: Column(children: [
                                      CircleAvatar(
                                          radius: 30,
                                          backgroundColor: Colors.white,
                                          child: Image.asset(
                                              'assets/images/badge3.png')),
                                      Text("10 Star"),
                                    ]),
                                  ),
                                  SizedBox(
                                    width: 15,
                                  ),
                                  Container(
                                    child: Column(children: [
                                      CircleAvatar(
                                          radius: 30,
                                          backgroundColor: Colors.white,
                                          child: Image.asset(
                                              'assets/images/badge1.png')),
                                      Text("Expert"),
                                    ]),
                                  ),
                                  SizedBox(
                                    width: 15,
                                  ),
                                  Container(
                                    child: Column(children: [
                                      CircleAvatar(
                                          radius: 30,
                                          backgroundColor: Colors.white,
                                          child: Image.asset(
                                              'assets/images/badge2.png')),
                                      Text("Champion"),
                                    ]),
                                  )
                                ]),
                          ),
                        ],
                      ),
                    ),
                  ),

                  Padding(
                    padding: const EdgeInsets.fromLTRB(30, 10, 30, 0),
                    child: Container(
                      decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20)),
                      child: Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.fromLTRB(20, 10, 0, 0),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Stats",
                                  style: TextStyle(
                                      fontSize: 30,
                                      fontWeight: FontWeight.bold),
                                ),
                                Container(
                                  child: TabBar(
                                      unselectedLabelColor: Colors.black,
                                      indicatorSize: TabBarIndicatorSize.label,
                                      labelColor: Colors.black,
                                      controller: tabcontoller,
                                      indicator: BoxDecoration(
                                        border: Border(
                                            bottom: BorderSide(width: 1)),
                                      ),
                                      isScrollable: true,
                                      // labelPadding: const EdgeInsets.all(10),
                                      labelPadding: const EdgeInsets.symmetric(
                                          horizontal: 5),
                                      automaticIndicatorColorAdjustment: true,
                                      tabs: [
                                        Tab(
                                          child: Container(
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(25),
                                            ),
                                            child: const Padding(
                                              padding: EdgeInsets.all(9.0),
                                              child: Align(
                                                alignment: Alignment.center,
                                                child: Text("Daily"),
                                              ),
                                            ),
                                          ),
                                        ),
                                        Tab(
                                          child: Container(
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(25),
                                            ),
                                            child: const Padding(
                                              padding: EdgeInsets.all(9.0),
                                              child: Align(
                                                alignment: Alignment.center,
                                                child: Text("Weekly"),
                                              ),
                                            ),
                                          ),
                                        ),
                                        Tab(
                                          child: Container(
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(25),
                                            ),
                                            child: const Padding(
                                              padding: EdgeInsets.all(10.0),
                                              child: Align(
                                                alignment: Alignment.center,
                                                child: Text("All Time"),
                                              ),
                                            ),
                                          ),
                                        ),
                                        Tab(
                                          child: Container(
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(25),
                                            ),
                                            child: const Padding(
                                              padding: EdgeInsets.all(9.0),
                                              child: Align(
                                                alignment: Alignment.center,
                                                child: Text("Recent Tests"),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ]),
                                ),
                              ],
                            ),
                          ),
                          Container(
                            height: 680,
                            child: Expanded(
                              child: TabBarView(
                                  controller: tabcontoller,
                                  children: [
                                    Container(
                                      height: 100,
                                      width: MediaQuery.of(context).size.width,
                                      child: Center(
                                          child: Column(
                                        children: [
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceEvenly,
                                            children: [
                                              Column(
                                                children: [
                                                  SizedBox(
                                                    height: 50,
                                                  ),
                                                  Container(
                                                    width: 120,
                                                    height: 120,
                                                    child: Image.asset(
                                                        'assets/images/abcd.png'),
                                                  ),
                                                  SizedBox(
                                                    height: 5,
                                                  ),
                                                  Row(
                                                    children: [
                                                      Text('5 ',
                                                          style: TextStyle(
                                                              fontSize: 30,
                                                              color: Colors
                                                                  .redAccent)),
                                                      Text(
                                                        "Tests",
                                                        style: TextStyle(
                                                            fontSize: 25),
                                                      ),
                                                    ],
                                                  ),
                                                ],
                                              ),
                                              Column(
                                                children: [
                                                  SizedBox(
                                                    height: 50,
                                                  ),
                                                  Container(
                                                    width: 120,
                                                    height: 120,
                                                    child: Image.asset(
                                                        'assets/images/abcde.png'),
                                                  ),
                                                  SizedBox(
                                                    height: 5,
                                                  ),
                                                  Row(
                                                    children: [
                                                      Text('2 ',
                                                          style: TextStyle(
                                                              fontSize: 30,
                                                              color: Colors
                                                                  .redAccent)),
                                                      Text(
                                                        "Games",
                                                        style: TextStyle(
                                                            fontSize: 25),
                                                      ),
                                                    ],
                                                  )
                                                ],
                                              )
                                            ],
                                          ),
                                          SizedBox(
                                            height: 30,
                                          ),
                                          Divider(
                                            thickness: 2,
                                          ),
                                          // Padding(
                                          //   padding: const EdgeInsets.fromLTRB(
                                          //       4, 5, 30, 0),
                                          //   child: Container(
                                          //     width: MediaQuery.of(context)
                                          //         .size
                                          //         .width,
                                          //     height: 200,
                                          //     child: LineChart(
                                          //       LineChartData(
                                          //         backgroundColor: Colors.black,
                                          //         gridData: FlGridData(
                                          //           show: true,
                                          //           drawVerticalLine: true,
                                          //           horizontalInterval: 1,
                                          //           verticalInterval: 1,
                                          //           getDrawingHorizontalLine:
                                          //               (value) {
                                          //             return FlLine(
                                          //               color: const Color(
                                          //                   0xff37434d),
                                          //               strokeWidth: 0.1,
                                          //             );
                                          //           },
                                          //           getDrawingVerticalLine:
                                          //               (value) {
                                          //             return FlLine(
                                          //               color: const Color(
                                          //                   0xff37434d),
                                          //               strokeWidth: 0.1,
                                          //             );
                                          //           },
                                          //         ),
                                          //         titlesData: FlTitlesData(
                                          //           show: true,
                                          //           rightTitles: AxisTitles(
                                          //             sideTitles: SideTitles(
                                          //                 showTitles: false),
                                          //           ),
                                          //           topTitles: AxisTitles(
                                          //             sideTitles: SideTitles(
                                          //                 showTitles: false),
                                          //           ),
                                          //           bottomTitles: AxisTitles(
                                          //             sideTitles: SideTitles(
                                          //               showTitles: true,
                                          //               reservedSize: 30,
                                          //               interval: 1,
                                          //               getTitlesWidget:
                                          //                   bottomTitleWidgets,
                                          //             ),
                                          //           ),
                                          //           leftTitles: AxisTitles(
                                          //             sideTitles: SideTitles(
                                          //               showTitles: true,
                                          //               interval: 1,
                                          //               getTitlesWidget:
                                          //                   leftTitleWidgets,
                                          //               reservedSize: 42,
                                          //             ),
                                          //           ),
                                          //         ),
                                          //         borderData: FlBorderData(
                                          //             show: true,
                                          //             border: Border.all(
                                          //                 color: const Color(
                                          //                     0xff37434d),
                                          //                 width: 1)),
                                          //         minX: 0,
                                          //         maxX: 11,
                                          //         minY: 0,
                                          //         maxY: 6,
                                          //         lineBarsData: [
                                          //           LineChartBarData(
                                          //             spots: const [
                                          //               FlSpot(0, 3),
                                          //               FlSpot(2.6, 2),
                                          //               FlSpot(4.9, 5),
                                          //               FlSpot(6.8, 3.1),
                                          //               FlSpot(8, 4),
                                          //               FlSpot(9.5, 3),
                                          //               FlSpot(11, 4),
                                          //             ],
                                          //             isCurved: true,
                                          //             gradient: LinearGradient(
                                          //               colors: gradientColors,
                                          //               begin: Alignment
                                          //                   .centerLeft,
                                          //               end: Alignment
                                          //                   .centerRight,
                                          //             ),
                                          //             barWidth: 5,
                                          //             isStrokeCapRound: true,
                                          //             dotData: FlDotData(
                                          //               show: false,
                                          //             ),
                                          //             belowBarData: BarAreaData(
                                          //               show: true,
                                          //               gradient:
                                          //                   LinearGradient(
                                          //                 colors: gradientColors
                                          //                     .map((color) => color
                                          //                         .withOpacity(
                                          //                             0.3))
                                          //                     .toList(),
                                          //                 begin: Alignment
                                          //                     .centerLeft,
                                          //                 end: Alignment
                                          //                     .centerRight,
                                          //               ),
                                          //             ),
                                          //           ),
                                          //         ],
                                          //       ),
                                          //     ),
                                          //   ),
                                          // ),
                                          FutureBuilder(
                                              future: Future.delayed(
                                                  Duration(seconds: 10)),
                                              builder: (context, snapshot) {
                                                if (snapshot.connectionState ==
                                                    ConnectionState.done) {
                                                  contro.getAllData();
                                                  return Container(
                                                      height: 400,
                                                      decoration: BoxDecoration(
                                                        borderRadius:
                                                            BorderRadius.only(
                                                                topLeft: Radius
                                                                    .circular(
                                                                        20),
                                                                topRight: Radius
                                                                    .circular(
                                                                        20)),
                                                        color: Colors.white,
                                                      ),
                                                      child: Column(
                                                        children: [
                                                          pieChartExampleOne(),
                                                          SizedBox(
                                                            height: 20,
                                                          ),
                                                        ],
                                                      ));
                                                } else
                                                  return Center(
                                                      child: Column(
                                                    children: [
                                                      SizedBox(
                                                        height: 5,
                                                      ),
                                                      CircularProgressIndicator(),
                                                    ],
                                                  )); // Return empty container to avoid build errors
                                              }),
                                        ],
                                      )),
                                    ),
                                    Container(
                                      height: 100,
                                      child: Center(child: Text("hello World")),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.fromLTRB(
                                          2, 200, 2, 0),
                                      child: Container(
                                          height: 50, child: LineChart2()),
                                    ),
                                    Container(
                                      height: 100,
                                      child: Container(
                                        height: 600,
                                        child: Expanded(
                                          child: Obx(
                                            () => ContentArea(
                                              decor: BoxDecoration(
                                                  border: Border.all(
                                                      color: Colors.white),
                                                  color: Colors.pink[50]),
                                              addPadding: false,
                                              child: ListView.separated(
                                                padding:
                                                    UIParameters.screenPadding,
                                                itemCount: controllerw
                                                    .allRecentTest.length,
                                                physics: ScrollPhysics(),
                                                separatorBuilder:
                                                    (BuildContext context,
                                                        int index) {
                                                  return const SizedBox(
                                                    height: 15,
                                                  );
                                                },
                                                itemBuilder:
                                                    (BuildContext context,
                                                        int index) {
                                                  return RecentQuizCard(
                                                      recentTest: controllerw
                                                              .allRecentTest[
                                                          index]);
                                                },
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    )
                                  ]),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  // SizedBox(
                  //   height: 10,
                  // ),
                  // Text("Coginitive Devlopment Chart"),
                  // SizedBox(
                  //   height: 10,
                  // ),
                  // Padding(
                  //   padding: const EdgeInsets.fromLTRB(2, 0, 20, 0),
                  //   child: Container(
                  //     width: MediaQuery.of(context).size.width,
                  //     height: 200,
                  //     child: LineChart(
                  //       LineChartData(
                  //         gridData: FlGridData(
                  //           // show: true,
                  //           // drawVerticalLine: true,
                  //           horizontalInterval: 200,
                  //           verticalInterval: 1,
                  //           getDrawingHorizontalLine: (value) {
                  //             return FlLine(
                  //               color: const Color(0xff37434d),
                  //               strokeWidth: 1,
                  //             );
                  //           },
                  //           getDrawingVerticalLine: (value) {
                  //             return FlLine(
                  //               color: const Color(0xff37434d),
                  //               strokeWidth: 1,
                  //             );
                  //           },
                  //         ),
                  //         titlesData: FlTitlesData(
                  //           show: true,
                  //           rightTitles: AxisTitles(
                  //             sideTitles: SideTitles(showTitles: false),
                  //           ),
                  //           topTitles: AxisTitles(
                  //             sideTitles: SideTitles(showTitles: false),
                  //           ),
                  //           bottomTitles: AxisTitles(
                  //             sideTitles: SideTitles(
                  //               showTitles: true,
                  //               reservedSize: 30,
                  //               interval: 1,
                  //               getTitlesWidget: bottomTitleWidgets,
                  //             ),
                  //           ),
                  //           leftTitles: AxisTitles(
                  //             sideTitles: SideTitles(
                  //               showTitles: true,
                  //               interval: 1,
                  //               getTitlesWidget: leftTitleWidgets,
                  //               reservedSize: 30,
                  //             ),
                  //           ),
                  //         ),
                  //         borderData: FlBorderData(
                  //             show: true,
                  //             border: Border.all(
                  //                 color: const Color(0xff37434d), width: 1)),
                  //         minX: 24,
                  //         maxX: 34,
                  //         minY: 0,
                  //         maxY: 2000,
                  //         lineBarsData: [
                  //           LineChartBarData(
                  //             spots: data3,
                  //             // isCurved: true,

                  //             gradient: LinearGradient(
                  //               colors: gradientColors,
                  //               begin: Alignment.centerLeft,
                  //               end: Alignment.centerRight,
                  //             ),
                  //             barWidth: 5,
                  //             // isStrokeCapRound: true,
                  //             dotData: FlDotData(
                  //               show: true,
                  //             ),
                  //             belowBarData: BarAreaData(
                  //               show: true,
                  //               gradient: LinearGradient(
                  //                 colors: gradientColors
                  //                     .map((color) => color.withOpacity(0.3))
                  //                     .toList(),
                  //                 begin: Alignment.centerLeft,
                  //                 end: Alignment.centerRight,
                  //               ),
                  //             ),
                  //           ),
                  //         ],
                  //       ),
                  //     ),
                  //   ),
                  // ),
                  // SizedBox(
                  //   height: 20,
                  // ),
                  // Padding(
                  //   padding: const EdgeInsets.fromLTRB(2, 0, 20, 0),
                  //   child: Container(
                  //     width: MediaQuery.of(context).size.width,
                  //     height: 200,
                  //     child: LineChart(
                  //       LineChartData(
                  //         gridData: FlGridData(
                  //           // show: true,
                  //           // drawVerticalLine: true,
                  //           horizontalInterval: 200,
                  //           verticalInterval: 1,
                  //           getDrawingHorizontalLine: (value) {
                  //             return FlLine(
                  //               color: const Color(0xff37434d),
                  //               strokeWidth: 1,
                  //             );
                  //           },
                  //           getDrawingVerticalLine: (value) {
                  //             return FlLine(
                  //               color: const Color(0xff37434d),
                  //               strokeWidth: 1,
                  //             );
                  //           },
                  //         ),
                  //         titlesData: FlTitlesData(
                  //           show: true,
                  //           rightTitles: AxisTitles(
                  //             sideTitles: SideTitles(showTitles: false),
                  //           ),
                  //           topTitles: AxisTitles(
                  //             sideTitles: SideTitles(showTitles: false),
                  //           ),
                  //           bottomTitles: AxisTitles(
                  //             sideTitles: SideTitles(
                  //               showTitles: true,
                  //               reservedSize: 30,
                  //               interval: 1,
                  //               getTitlesWidget: bottomTitleWidgets,
                  //             ),
                  //           ),
                  //           leftTitles: AxisTitles(
                  //             sideTitles: SideTitles(
                  //               showTitles: true,
                  //               interval: 1,
                  //               getTitlesWidget: leftTitleWidgets,
                  //               reservedSize: 30,
                  //             ),
                  //           ),
                  //         ),
                  //         borderData: FlBorderData(
                  //             show: true,
                  //             border: Border.all(
                  //                 color: const Color(0xff37434d), width: 1)),
                  //         minX: 24,
                  //         maxX: 34,
                  //         minY: 0,
                  //         maxY: 2000,
                  //         lineBarsData: [
                  //           LineChartBarData(
                  //             spots: data3,
                  //             // isCurved: true,

                  //             gradient: LinearGradient(
                  //               colors: gradientColors,
                  //               begin: Alignment.centerLeft,
                  //               end: Alignment.centerRight,
                  //             ),
                  //             barWidth: 5,
                  //             // isStrokeCapRound: true,
                  //             dotData: FlDotData(
                  //               show: true,
                  //             ),
                  //             belowBarData: BarAreaData(
                  //               show: true,
                  //               gradient: LinearGradient(
                  //                 colors: gradientColors
                  //                     .map((color) => color.withOpacity(0.3))
                  //                     .toList(),
                  //                 begin: Alignment.centerLeft,
                  //                 end: Alignment.centerRight,
                  //               ),
                  //             ),
                  //           ),
                  //         ],
                  //       ),
                  //     ),
                  //   ),
                  // ),

                  // SizedBox(
                  //   height: 20,
                  // ),

                  // SizedBox(
                  //   height: 20,
                  // )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
