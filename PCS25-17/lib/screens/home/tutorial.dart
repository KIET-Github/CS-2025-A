// import 'package:flutter/material.dart';
// import 'package:tutorial/tutorial.dart';

// class Tutorial extends StatefulWidget {
//   @override
//   State<Tutorial> createState() => _TutorialState();
// }

// class _TutorialState extends State<Tutorial> {
//   List list = [
//     {"url": "assets/images/meditate.png", "x": 2, "y": 2},
//     {"url": "assets/images/meditate.png", "x": 1, "y": 1},
//     {"url": "assets/images/meditate.png", "x": 3, "y": 3}
//   ];

// //Crie suas global keys e adicione aos componentes que deverão ser
//   var keyMenu = GlobalKey();

//   var keyContainer = GlobalKey();

//   var keyChat = GlobalKey();

//   List<TutorialItem> itens = [];

//   @override
//   void initState() {
//     itens.addAll({
//       TutorialItem(
//           globalKey: keyMenu,
//           touchScreen: true,
//           top: 200,
//           left: 50,
//           children: [
//             Text(
//               "xfxfbdfhdfhfghfgjfgj",
//               style: TextStyle(color: Colors.white, fontSize: 20),
//             ),
//             SizedBox(
//               height: 100,
//             )
//           ],
//           widgetNext: Text(
//             "Next",
//             style: TextStyle(
//               color: Colors.purple,
//               fontWeight: FontWeight.bold,
//             ),
//           ),
//           shapeFocus: ShapeFocus.oval),
//       TutorialItem(
//         globalKey: keyChat,
//         touchScreen: true,
//         top: 200,
//         left: 50,
//         children: [
//           Text(
//             "cxcbfcfndgncgnvn",
//             style: TextStyle(color: Colors.white, fontSize: 20),
//           ),
//           SizedBox(
//             height: 100,
//           )
//         ],
//         widgetNext: Text(
//           "Next",
//           style: TextStyle(
//             color: Colors.purple,
//             fontWeight: FontWeight.bold,
//           ),
//         ),
//         shapeFocus: ShapeFocus.oval,
//       ),
//       TutorialItem(
//         globalKey: keyContainer,
//         touchScreen: true,
//         bottom: 50,
//         left: 50,
//         children: [
//           Text(
//             "3",
//             style: TextStyle(color: Colors.white, fontSize: 20),
//           ),
//           SizedBox(
//             height: 10,
//           )
//         ],
//         widgetNext: Text(
//           "Next",
//           style: TextStyle(
//             color: Colors.purple,
//             fontWeight: FontWeight.bold,
//           ),
//         ),
//         shapeFocus: ShapeFocus.square,
//       ),
//     });

//     ///FUNÇÃO QUE EXIBE O TUTORIAL.
//     Future.delayed(Duration(microseconds: 200)).then((value) {
//       // Tutorial.showTutorial(context, itens);
//     });

//     super.initState();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Container();
//   }
// }
