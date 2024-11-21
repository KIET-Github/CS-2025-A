// ignore_for_file: prefer_const_constructors, no_leading_underscores_for_local_identifiers

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/widgets/widgets.dart';

class QuizOverviewScreen extends GetView<QuizController> {
  const QuizOverviewScreen({Key? key}) : super(key: key);

  static const String routeName = '/quizeoverview';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      body: Column(
        children: [
          CustomAppBar(
            title: controller.completedQuiz,
          ),
          Expanded(
            child: ContentArea(
                child: Column(
              children: [
                Row(
                  children: [
                    CountdownTimer(
                      color: Colors.amber,
                      time: '',
                    ),
                    Obx(
                      () => Text('${controller.time} Remining',
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 20,
                              fontWeight: FontWeight.bold)),
                    )
                  ],
                ),
                const SizedBox(
                  height: 20,
                ),
                Expanded(
                    child: GridView.builder(
                        itemCount: controller.allQuestions.length,
                        shrinkWrap: true,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount:
                                UIParameters.getWidth(context) ~/ 75,
                            childAspectRatio: 1,
                            crossAxisSpacing: 8,
                            mainAxisSpacing: 8),
                        physics: const BouncingScrollPhysics(),
                        itemBuilder: (_, index) {
                          AnswerStatus? _answerStatus;
                          if (controller.allQuestions[index].selectedAnswer !=
                              null) {
                            _answerStatus = AnswerStatus.answered;
                          }
                          return QuizNumberCard(
                            index: index + 1,
                            status: _answerStatus,
                            onTap: () {
                              controller.jumpToQuestion(index);
                            },
                          );
                        }))
              ],
            )),
          ),
          ColoredBox(
            color: Theme.of(context).scaffoldBackgroundColor,
            child: Padding(
              padding: UIParameters.screenPadding,
              child: MainButton(
                color: Colors.amber,
                onTap: () {
                  controller.complete();
                },
                title: 'Complete',
              ),
            ),
          )
        ],
      ),
    );
  }
}
