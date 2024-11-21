// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:liquid_pull_to_refresh/liquid_pull_to_refresh.dart';
import 'package:sih_2022/controllers/article/article_controller.dart';

import '../../controllers/avatars/avatar_controller.dart';

TextStyle st(Color colors) {
  return TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: colors);
}

class AvatarPage extends StatefulWidget {
  const AvatarPage({Key? key}) : super(key: key);
  // static const routeName = "/article";

  @override
  State<AvatarPage> createState() => _AvatarPageState();
}

class _AvatarPageState extends State<AvatarPage> {
  final productController = Get.put(AvatarController());
  @override
  Widget build(BuildContext context) {
    return Material(
        child: Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [
          SizedBox(
            height: 50,
          ),
          Text(
            "Mental Health Check",
            style: TextStyle(
                fontSize: 30, fontWeight: FontWeight.bold, color: Colors.red),
          ),
          Text("Pull Down To Refresh"),
          Expanded(
            // flex: 1,
            child: LiquidPullToRefresh(
              color: Colors.redAccent,
              onRefresh: () async {
                Future.delayed(Duration(milliseconds: 1));
                productController.getAllData();
              },
              animSpeedFactor: 3,
              child: GetBuilder<AvatarController>(builder: (controller) {
                return ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.fromLTRB(10, 4, 10, 4),
                      child: InkWell(
                        onTap: () {
                          // Navigator.of(context).push(MaterialPageRoute(
                          //     builder: (context) => MentalPage2(
                          //           index2: index,
                          //         )));
                        },
                        child: Align(
                          alignment: Alignment.topLeft,
                          child: Image(
                              height: 50,
                              width: 50,
                              image: NetworkImage(productController
                                  .productData[index].imageUrl as String)),
                        ),
                      ),
                    );
                  },
                  itemCount: productController.productData.length,
                );
              }),
            ),
          ),
          Text("hello")
        ],
      ),
    ));
  }
}
