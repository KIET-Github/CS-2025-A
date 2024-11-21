// // ignore_for_file: prefer_const_constructors

// import 'package:flutter/material.dart';
// import 'package:get/get.dart';
// import 'package:liquid_pull_to_refresh/liquid_pull_to_refresh.dart';
// import 'package:sih_2022/controllers/article/article_controller.dart';
// import 'package:sih_2022/screens/home/article_screen.dart/article_page2.dart';

// import 'package:sih_2022/screens/screens.dart';

// TextStyle st(Color colors) {
//   return TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: colors);
// }

// class ArticlePage extends StatefulWidget {
//   const ArticlePage({Key? key}) : super(key: key);
//   static const routeName = "/article";

//   @override
//   State<ArticlePage> createState() => _ArticlePageState();
// }

// class _ArticlePageState extends State<ArticlePage> {
//   final productController = Get.put(ArticleController());
//   @override
//   Widget build(BuildContext context) {
//     return WillPopScope(
//       onWillPop: () async {
//         Get.offAllNamed(HomeScreen.routeName);
//         return Future.delayed(Duration(microseconds: 0));
//       },
//       child: Material(
//           child: Scaffold(
//         backgroundColor: Colors.white,
//         body: Column(
//           children: [
//             SizedBox(
//               height: 50,
//             ),
//             Text(
//               "Article  Section",
//               style: TextStyle(
//                   fontSize: 30, fontWeight: FontWeight.bold, color: Colors.red),
//             ),
//             Text("Pull Down To Refresh"),
//             Expanded(
//               child: LiquidPullToRefresh(
//                 color: Colors.redAccent,
//                 onRefresh: () async {
//                   Future.delayed(Duration(milliseconds: 1));
//                   productController.getAllData();
//                 },
//                 animSpeedFactor: 3,
//                 child: GetBuilder<ArticleController>(builder: (controller) {
//                   return ListView.builder(
//                     itemBuilder: (context, index) {
//                       return Padding(
//                         padding: const EdgeInsets.fromLTRB(10, 4, 10, 4),
//                         child: InkWell(
//                           onTap: () {
//                             Navigator.of(context).push(MaterialPageRoute(
//                                 builder: (context) => ArticlePage2(
//                                       index2: index,
//                                     )));
//                           },
//                           child: Card(
//                             color: Colors.white,
//                             elevation: 3,
//                             child: Padding(
//                               padding: const EdgeInsets.all(8.0),
//                               child: Column(
//                                 crossAxisAlignment: CrossAxisAlignment.start,
//                                 children: [
//                                   Text(
//                                     "${productController.productData[index].title}",
//                                     style: st(Color.fromARGB(255, 0, 0, 0)),
//                                   ),
//                                   Text(
//                                       "${productController.productData[index].description}",
//                                       style: TextStyle(
//                                           color: Colors.grey, fontSize: 20)),
//                                 ],
//                               ),
//                             ),
//                           ),
//                         ),
//                       );
//                     },
//                     itemCount: productController.productData.length,
//                   );
//                 }),
//               ),
//             )
//           ],
//         ),
//       )),
//     );
//   }
// }
