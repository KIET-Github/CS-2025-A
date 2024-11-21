// ignore_for_file: prefer_const_constructors, sized_box_for_whitespace, no_leading_underscores_for_local_identifiers, sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/controllers/quiz_paper/quiz_papers_controller.dart';
import 'package:sih_2022/models/quiz_paper_model.dart';
import 'package:sih_2022/screens/screens.dart';

class LeaderBoardCard extends GetView<QuizPaperController> {
  const LeaderBoardCard({Key? key, required this.model}) : super(key: key);

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
            Get.toNamed(LeaderBoardScreen.routeName,
                arguments:
                    model); // controller.navigatoQuestions(paper: model);
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
                        ],
                      ))
                    ],
                  ),
                ],
              )),
        ),
      ),
    );
  }
}
