// ignore_for_file: prefer_typing_uninitialized_variables, prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/controllers/article/article_controller.dart';

class MentalPage2 extends StatelessWidget {
  final index2;
  final productController = Get.put(ArticleController());
  MentalPage2({Key? key, required this.index2}) : super(key: key);
  static const routeName = '/article2';

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      child: SingleChildScrollView(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                SizedBox(
                  height: 40,
                ),
                Text(
                  "${productController.productData[index2].title}",
                  style: TextStyle(
                      color: Colors.red,
                      fontSize: 30,
                      fontWeight: FontWeight.bold),
                  textAlign: TextAlign.justify,
                ),
                SizedBox(
                  height: 30,
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    "${productController.productData[index2].mainDes}",
                    style: TextStyle(fontSize: 25, fontWeight: FontWeight.w200),
                    textAlign: TextAlign.justify,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
