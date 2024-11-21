// ignore_for_file: prefer_const_constructors, sized_box_for_whitespace, sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/firebase/loading_status.dart';
import 'package:sih_2022/screens/quiz/quiz_overview_screen.dart';
import 'package:sih_2022/widgets/widgets.dart';

class QuizeScreen extends GetView<QuizController> {
  const QuizeScreen({Key? key}) : super(key: key);

  static const String routeName = '/quizescreen';

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: controller.onExitOfQuiz,
        child: Scaffold(
          backgroundColor: Colors.white,
          extendBodyBehindAppBar: true,
          body: Column(
            children: [
              CustomAppBar(
                leading: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  child: Obx(
                    () => CountdownTimer(
                      time: controller.time.value,
                      color: Colors.red,
                    ),
                  ),
                  decoration: const ShapeDecoration(
                    shape: StadiumBorder(
                        side: BorderSide(color: Colors.red, width: 2)),
                  ),
                ),
                showActionIcon: true,
                titleWidget: Obx(() => Text(
                      'Q. ${(controller.questionIndex.value + 1).toString().padLeft(2, '0')}',
                      style: TextStyle(
                          color: Colors.grey,
                          fontSize: 20,
                          fontWeight: FontWeight.bold),
                    )),
              ),
              Container(
                height: MediaQuery.of(context).size.height * (57 / 64),
                child: Obx(
                  () => Column(
                    children: [
                      if (controller.loadingStatus.value ==
                          LoadingStatus.loading)
                        const Expanded(
                            child: ContentArea(child: QuizScreenPlaceHolder())),
                      if (controller.loadingStatus.value ==
                          LoadingStatus.completed)
                        Expanded(
                          child: ContentArea(
                            child: SingleChildScrollView(
                              padding: const EdgeInsets.only(top: 20),
                              child: Column(
                                children: [
                                  Text(
                                    controller.currentQuestion.value!.question,
                                    style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  GetBuilder<QuizController>(
                                      id: 'answers_list',
                                      builder: (context) {
                                        return ListView.separated(
                                          itemCount: controller.currentQuestion
                                              .value!.answers.length,
                                          shrinkWrap: true,
                                          padding:
                                              const EdgeInsets.only(top: 25),
                                          physics:
                                              const NeverScrollableScrollPhysics(),
                                          separatorBuilder:
                                              (BuildContext context,
                                                  int index) {
                                            return const SizedBox(
                                              height: 10,
                                            );
                                          },
                                          itemBuilder: (BuildContext context,
                                              int index) {
                                            final answer = controller
                                                .currentQuestion
                                                .value!
                                                .answers[index];
                                            return AnswerCard(
                                              isSelected: answer.identifier ==
                                                  controller.currentQuestion
                                                      .value!.selectedAnswer,
                                              onTap: () {
                                                controller.selectAnswer(
                                                    answer.identifier);
                                              },
                                              answer:
                                                  '${answer.identifier}. ${answer.answer}',
                                            );
                                          },
                                        );
                                      }),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ColoredBox(
                        color: Theme.of(context).scaffoldBackgroundColor,
                        child: Padding(
                          padding: UIParameters.screenPadding,
                          child: Row(
                            children: [
                              Visibility(
                                visible: controller.isFirstQuestion,
                                child: Padding(
                                  padding: const EdgeInsets.only(right: 5.0),
                                  child: SizedBox(
                                    height: 55,
                                    width: 55,
                                    child: MainButton(
                                      color: Color.fromRGBO(255, 100, 100, 1),
                                      onTap: () {
                                        controller.prevQuestion();
                                      },
                                      child: const Icon(
                                        Icons.arrow_back_ios_new,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Obx(
                                  () => Visibility(
                                    visible: controller.loadingStatus.value ==
                                        LoadingStatus.completed,
                                    child: MainButton(
                                      color: Color.fromRGBO(255, 100, 100, 1),
                                      onTap: () {
                                        controller.islastQuestion
                                            ? Get.toNamed(
                                                QuizOverviewScreen.routeName)
                                            : controller.nextQuestion();
                                      },
                                      title: controller.islastQuestion
                                          ? 'Complete'
                                          : 'Next',
                                    ),
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ],
          ),
        ));
  }
}
