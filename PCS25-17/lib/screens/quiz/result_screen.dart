// ignore_for_file: prefer_const_constructors, no_leading_underscores_for_local_identifiers

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/models/quiz_paper_model.dart';
import 'package:sih_2022/screens/screens.dart';
import 'package:sih_2022/widgets/widgets.dart';

import 'answer_check_screen.dart';

class Resultcreen extends GetView<QuizController> {
  // final
  const Resultcreen({Key? key}) : super(key: key);
  // final productController = Get.put(QuizPaperController());
  static const String routeName = '/resultscreen';
  @override
  @override
  Widget build(BuildContext context) {
    const Color _textColor = Colors.green;
    return WillPopScope(
      onWillPop: () async {
        return false;
      },
      child: Material(
        color: Colors.pink[50],
        child: Column(
          children: [
            SizedBox(
              height: 20,
            ),
            CustomAppBar(
              leading: const SizedBox(
                height: 40,
              ),
              title: controller.correctAnsweredQuestions,
            ),
            Expanded(
              child: ContentArea(
                  child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                      height: 350,
                      width: 400,
                      child: Image.network(
                          'https://firebasestorage.googleapis.com/v0/b/quizx-fb763.appspot.com/o/images%2Ftrophy-removebg-preview.png?alt=media&token=727d8f06-d3f8-400f-a5c7-16ac1635366b')),
                  Text(
                    'You have got ${controller.points} Points',
                    style: TextStyle(color: _textColor),
                  ),
                  controller.correctQuestionCount < 3
                      ? Text(" Hello World")
                      : controller.correctQuestionCount < 5
                          ? Text("Nice ")
                          : Text("Ayush"),
                  const SizedBox(
                    height: 25,
                  ),
                  const Text(
                    'Tap below question numbers to view correct answers',
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  Expanded(
                      child: GridView.builder(
                          itemCount: controller.allQuestions.length,
                          shrinkWrap: true,
                          gridDelegate:
                              SliverGridDelegateWithFixedCrossAxisCount(
                                  crossAxisCount:
                                      UIParameters.getWidth(context) ~/ 75,
                                  childAspectRatio: 1,
                                  crossAxisSpacing: 8,
                                  mainAxisSpacing: 8),
                          physics: const BouncingScrollPhysics(),
                          itemBuilder: (_, index) {
                            final _question = controller.allQuestions[index];

                            AnswerStatus _status = AnswerStatus.notanswered;

                            final _selectedAnswer = _question.selectedAnswer;
                            final _correctAnswer = _question.correctAnswer;

                            if (_selectedAnswer == _correctAnswer) {
                              _status = AnswerStatus.correct;
                            } else if (_question.selectedAnswer == null) {
                              _status = AnswerStatus.wrong;
                            } else {
                              _status = AnswerStatus.wrong;
                            }

                            return QuizNumberCard(
                              index: index + 1,
                              status: _status,
                              onTap: () {
                                controller.jumpToQuestion(index,
                                    isGoBack: false);
                                Get.toNamed(AnswersCheckScreen.routeName);
                              },
                            );
                          }))
                ],
              )),
            ),
            ColoredBox(
              color: Color.fromRGBO(255, 255, 255, 0),
              child: Padding(
                  padding: UIParameters.screenPadding,
                  child: Row(
                    children: [
                      Expanded(
                          child: MainButton(
                        color: Colors.red,
                        onTap: () {
                          controller.tryAgain();
                        },
                        title: 'Try Again',
                      )),
                      const SizedBox(
                        width: 5,
                      ),
                      Expanded(
                          child: MainButton(
                        color: Colors.green[400],
                        onTap: () {
                          controller.saveQuizResults();
                        },
                        title: 'Go to home',
                      ))
                    ],
                  )),
            )
          ],
        ),
      ),
    );
  }
}
