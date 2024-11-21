// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:liquid_pull_to_refresh/liquid_pull_to_refresh.dart';
import 'package:sih_2022/controllers/article/article_controller.dart';
import 'mental_page_main.dart';

TextStyle st(Color colors) {
  return TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: colors);
}

class MentalHealthPage extends StatefulWidget {
  const MentalHealthPage({Key? key}) : super(key: key);
  static const routeName = "/article";

  @override
  State<MentalHealthPage> createState() => _MentalHealthPageState();
}

class _MentalHealthPageState extends State<MentalHealthPage> {
  final productController = Get.put(ArticleController());
  @override
  Widget build(BuildContext context) {
    return Material(
        child: Scaffold(
      backgroundColor: Colors.grey[200],
      body: Column(
        children: [
          SizedBox(
            height: 50,
          ),
          Text(
            "Mental Health Check",
            style: TextStyle(
                fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black),
          ),
          Expanded(
            child: LiquidPullToRefresh(
              color: Colors.redAccent,
              onRefresh: () async {
                Future.delayed(Duration(milliseconds: 1));
                productController.getAllData();
              },
              animSpeedFactor: 3,
              child: GetBuilder<ArticleController>(builder: (controller) {
                return ListView.builder(
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.fromLTRB(10, 4, 10, 4),
                      child: InkWell(
                        onTap: () {
                          Navigator.of(context).push(MaterialPageRoute(
                              builder: (context) => MentalPage2(
                                    index2: index,
                                  )));
                        },
                        child: Container(
                          height: 120,
                          child: Center(
                            child: Card(
                              color: Colors.white,
                              elevation: 3,
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      " ${productController.productData[index].title}",
                                      style: st(Colors.black),
                                      textAlign: TextAlign.justify,
                                    ),
                                    Text(
                                      "${productController.productData[index].description}",
                                      style: TextStyle(
                                        color: Color.fromRGBO(255, 100, 100, 1),
                                        fontSize: 15,
                                      ),
                                      textAlign: TextAlign.justify,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                  itemCount: productController.productData.length,
                );
              }),
            ),
          )
        ],
      ),
    ));
  }
}
