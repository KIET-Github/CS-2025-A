// ignore_for_file: prefer_const_constructors, non_constant_identifier_names, prefer_const_literals_to_create_immutables, no_leading_underscores_for_local_identifiers

import 'package:flutter/material.dart';

// import 'package:transliteration/response/transliteration_response.dart';
// import 'package:transliteration/transliteration.dart';

TextStyle st(Color colors) {
  return TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: colors);
}

class TimeLinePage extends StatefulWidget {
  TimeLinePage({Key? key}) : super(key: key);
  static const routeName = "/timeline";

  @override
  State<TimeLinePage> createState() => _TimeLinePageState();
}

class _TimeLinePageState extends State<TimeLinePage> {
  @override
  Widget build(BuildContext context) {
    return Material(
      child: Image(image: AssetImage('assets/images/Group 4652.png')),
    );
    //     color: Colors.white,
    //     child: Column(
    //       children: [
    //         Card(
    //           elevation: 0,
    //           child: Container(
    //             color: Color.fromARGB(255, 255, 255, 255),
    //             width: MediaQuery.of(context).size.width,
    //             child: Padding(
    //               padding: EdgeInsets.fromLTRB(0, 5, 0, 20),
    //               child: Column(
    //                 children: [
    //                   SizedBox(
    //                     height: 50,
    //                   ),
    //                   Text(

    //                     style: TextStyle(
    //                         fontSize: 30,
    //                         fontWeight: FontWeight.bold,
    //                         fontFamily: 'Nunito',
    //                         color: Colors.black),
    //                   ),
    //                   // new TextField(controller: inputTextController),
    //                   // new SizedBox(height: 10),
    //                   // new ElevatedButton(
    //                   //     child: new Text("Translate",
    //                   //         style: TextStyle(color: Colors.white)),
    //                   //     onPressed: onPressed),
    //                 ],
    //               ),
    //             ),
    //           ),
    //         ),
    //         Expanded(
    //           child: LiquidPullToRefresh(
    //             color: Colors.redAccent,
    //             onRefresh: () async {
    //               Future.delayed(Duration(milliseconds: 1));
    //               Controller.getAllData(lan);
    //             },
    //             animSpeedFactor: 3,
    //             child: GetBuilder<TimeLineController>(builder: (controller) {
    //               return ListView.builder(
    //                 itemBuilder: (context, index) {
    //                   return TimelineTile(
    //                     mainAxisExtent: 150,
    //                     oppositeContents: index % 2 == 0
    //                         ? Padding(
    //                             padding: const EdgeInsets.all(8.0),
    //                             child: Column(
    //                               mainAxisAlignment: MainAxisAlignment.center,
    //                               crossAxisAlignment: CrossAxisAlignment.end,
    //                               children: [
    //                                 Text(
    //                                   '${Controller.productData[index].title}',
    //                                   style: TextStyle(
    //                                       fontSize: 20,
    //                                       fontWeight: FontWeight.bold,
    //                                       color: Colors.blueAccent),
    //                                   textAlign: TextAlign.right,
    //                                 ),
    //                                 SizedBox(
    //                                   height: 7,
    //                                 ),
    //                                 Text(
    //                                   '${Controller.productData[index].timeline}',
    //                                   style: TextStyle(
    //                                       fontSize: 16,
    //                                       color: Colors.orange[700]),
    //                                 ),
    //                               ],
    //                             ),
    //                           )
    //                         : null,
    //                     contents: index % 2 != 0
    //                         ? Container(
    //                             padding: EdgeInsets.all(8.0),
    //                             child: Column(
    //                               mainAxisAlignment: MainAxisAlignment.center,
    //                               crossAxisAlignment: CrossAxisAlignment.start,
    //                               children: [
    //                                 Text(
    //                                   '${Controller.productData[index].title}',
    //                                   style: TextStyle(
    //                                       fontSize: 20,
    //                                       color: Colors.red,
    //                                       fontWeight: FontWeight.bold),
    //                                 ),
    //                                 SizedBox(
    //                                   height: 7,
    //                                 ),
    //                                 Text(
    //                                   '${Controller.productData[index].timeline}',
    //                                   style: TextStyle(
    //                                       fontSize: 16, color: Colors.green[600]),
    //                                 ),
    //                               ],
    //                             ),
    //                           )
    //                         : null,
    //                     node: TimelineNode(
    //                         indicator: DotIndicator(
    //                           color: Colors.blue,
    //                           size: 30,
    //                         ),
    //                         startConnector: SolidLineConnector(
    //                           thickness: 7,
    //                           color: Colors.green,
    //                         ),
    //                         endConnector: VerticalDivider(
    //                           color: Colors.red,
    //                           thickness: 7,
    //                         )),
    //                   );
    //                   // return Container(
    //                   //   child: Text("Hello world"),
    //                   // );
    //                 },
    //                 itemCount: Controller.productData.length,
    //               );
    //             }),
    //           ),
    //         )
    //       ],
    //     ),
    //   );
    // }
  }
}
