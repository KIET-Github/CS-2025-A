// ignore_for_file: prefer_const_constructors, sized_box_for_whitespace

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/controllers/quiz_paper/quiz_papers_controller.dart';
import 'package:sih_2022/models/quiz_paper_model.dart';

class DescriptionPage extends GetView<QuizPaperController> {
  const DescriptionPage({Key? key, required this.model}) : super(key: key);

  final QuizPaperModel model;

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Padding(
        padding: const EdgeInsets.all(25.0),
        child: Column(
          // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              height: 80,
            ),
            Text(
              "It is a 5 minutes test with 5 questions ",
              style: TextStyle(fontSize: 25),
            ),
            SizedBox(
              height: 20,
            ),
            Text(
              "Every question has four options.",
              style: TextStyle(fontSize: 25),
            ),
            SizedBox(
              height: 20,
            ),
            Text(
              "You have to select the correct one",
              style: TextStyle(fontSize: 25),
            ),
            SizedBox(
              height: 20,
            ),
            Text(
              "Don't Worry about negative marks for wrong answer",
              style: TextStyle(fontSize: 25),
            ),
            SizedBox(
              height: 20,
            ),
            Text(
              "Be Fast and Accurate to get top on the leaderboard",
              style: TextStyle(fontSize: 25),
            ),
            SizedBox(
              height: 20,
            ),
            Align(
              alignment: Alignment.center,
              child: ElevatedButton(
                child: Text(
                  "Give Test",
                  style: TextStyle(fontSize: 30),
                ),
                style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.redAccent,
                    fixedSize: Size(200, 50)),
                onPressed: () {
                  controller.navigatoQuestions(paper: model);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
