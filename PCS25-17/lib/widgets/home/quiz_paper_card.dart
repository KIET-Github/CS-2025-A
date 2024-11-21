// ignore_for_file: prefer_const_constructors, sized_box_for_whitespace, no_leading_underscores_for_local_identifiers, sort_child_properties_last

import 'package:easy_separator/easy_separator.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/controllers/quiz_paper/quiz_papers_controller.dart';
import 'package:sih_2022/models/quiz_paper_model.dart';
import 'package:sih_2022/screens/child/description_page.dart';
import 'package:sih_2022/screens/screens.dart';
import 'package:sih_2022/widgets/widgets.dart';

class QuizPaperCard extends GetView<QuizPaperController> {
  const QuizPaperCard({Key? key, required this.model}) : super(key: key);

  final QuizPaperModel model;

  @override
  Widget build(BuildContext context) {
    const double _padding = 10.0;
    return SizedBox(
      height: 120,
      child: Ink(
        decoration: BoxDecoration(
          border: Border.all(color: Colors.black),
          borderRadius: UIParameters.cardBorderRadius,
          color: Colors.white,
        ),
        child: InkWell(
          borderRadius: UIParameters.cardBorderRadius,
          onTap: () {
            Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => DescriptionPage(
                      model: model,
                    )));
            // controller.navigatoQuestions(paper: model);
          },
          child: Padding(
              padding: const EdgeInsets.all(_padding),
              child: Stack(
                clipBehavior: Clip.none,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      ClipRRect(
                        borderRadius: UIParameters.cardBorderRadius,
                        child: ColoredBox(
                            color:
                                Theme.of(context).primaryColor.withOpacity(0.1),
                            child: SizedBox(
                              width: 65,
                              height: 65,
                              child: model.imageUrl == null ||
                                      model.imageUrl!.isEmpty
                                  ? null
                                  : Image.network(model.imageUrl!),
                            )),
                      ),
                      const SizedBox(
                        width: 12,
                      ),
                      Expanded(
                          child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            model.title,
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 25,
                                fontWeight: FontWeight.bold),
                          ),
                          FittedBox(
                            fit: BoxFit.scaleDown,
                            child: EasySeparatedRow(
                              separatorBuilder:
                                  (BuildContext context, int index) {
                                return const SizedBox(width: 15);
                              },
                              children: [
                                Icon(Icons.help_outline_sharp,
                                    color: Colors.blue[700]),
                                Text(
                                  '${model.questionsCount} quizzes',
                                  style: TextStyle(
                                      color: Colors.grey,
                                      fontSize: 15,
                                      fontWeight: FontWeight.bold),
                                ),
                                IconWithText(
                                    icon: const Icon(Icons.timer,
                                        color: Colors.blueGrey),
                                    text: Text(
                                      model.timeInMinits(),
                                      style: TextStyle(
                                          color: Colors.grey,
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold),
                                    )),
                              ],
                            ),
                          )
                        ],
                      ))
                    ],
                  ),
                  // Positioned(
                  //     bottom: -_padding,
                  //     right: -_padding,
                  //     child: Container(
                  //       width: 30,
                  //       height: 30,
                  //       child: GestureDetector(
                  //         behavior: HitTestBehavior.translucent,
                  //         onTap: () {
                  //           Get.toNamed(LeaderBoardScreen.routeName,
                  //               arguments: model);
                  //         },
                  //         child: Ink(
                  //           child: Icon(
                  //             AppIcons.trophyoutline,
                  //             size: 20,
                  //             color: Colors.white,
                  //           ),
                  //           decoration: BoxDecoration(
                  //               borderRadius: const BorderRadius.only(
                  //                   topLeft: Radius.circular(10),
                  //                   bottomRight:
                  //                       Radius.circular(kCardBorderrRadius)),
                  //               color: Theme.of(context).primaryColor),
                  //         ),
                  //       ),
                  //     ))
                ],
              )),
        ),
      ),
    );
  }
}
